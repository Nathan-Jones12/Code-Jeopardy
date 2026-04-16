import { defineStore } from 'pinia';
import {
  ref as dbRef,
  set,
  get,
  update,
  onValue,
  onDisconnect,
  runTransaction,
  serverTimestamp,
  remove
} from 'firebase/database';
import { db } from '../firebase.js';
import { terms } from '../data/terms.js';

const DOLLAR_VALUES = [200, 400, 600, 800, 1000];

function randomCode() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let out = '';
  for (let i = 0; i < 4; i++) out += letters[Math.floor(Math.random() * letters.length)];
  return out;
}

function randomId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildBoard() {
  // Group terms by category
  const byCat = {};
  for (const t of terms) {
    if (!byCat[t.category]) byCat[t.category] = [];
    byCat[t.category].push(t);
  }
  const eligible = Object.keys(byCat).filter(c => byCat[c].length >= 5);
  const chosen = shuffle(eligible).slice(0, 6);
  const board = chosen.map(cat => {
    const picks = shuffle(byCat[cat]).slice(0, 5);
    const clues = picks.map((t, i) => ({
      value: DOLLAR_VALUES[i],
      term: t.term,
      definition: t.definition,
      played: false
    }));
    return { category: cat, clues };
  });
  return board;
}

export const useGameStore = defineStore('game', {
  state: () => ({
    // local identity
    playerId: localStorage.getItem('jeop_playerId') || '',
    playerName: localStorage.getItem('jeop_playerName') || '',
    roomCode: '',
    // live room state mirrored from firebase
    room: null,
    unsubscribe: null
  }),

  getters: {
    isHost(state) {
      return !!state.room && state.room.hostId === state.playerId;
    },
    players(state) {
      if (!state.room || !state.room.players) return [];
      return Object.entries(state.room.players).map(([id, p]) => ({ id, ...p }));
    },
    status(state) {
      return state.room ? state.room.status : null;
    },
    board(state) {
      return state.room && state.room.board ? state.room.board : [];
    },
    activeClue(state) {
      if (!state.room || !state.room.activeClue) return null;
      const { col, row } = state.room.activeClue;
      const clue = state.room.board?.[col]?.clues?.[row];
      if (!clue) return null;
      return { col, row, ...clue };
    },
    buzzedPlayerId(state) {
      return state.room ? state.room.buzzedPlayer : null;
    },
    allCluesPlayed(state) {
      if (!state.room || !state.room.board) return false;
      return state.room.board.every(col => col.clues.every(c => c.played));
    }
  },

  actions: {
    ensureIdentity(name) {
      if (!this.playerId) {
        this.playerId = randomId();
        localStorage.setItem('jeop_playerId', this.playerId);
      }
      if (name) {
        this.playerName = name;
        localStorage.setItem('jeop_playerName', name);
      }
    },

    async createRoom(name) {
      this.ensureIdentity(name);
      let code = randomCode();
      // ensure unique (unlikely collision, but check)
      for (let tries = 0; tries < 5; tries++) {
        const snap = await get(dbRef(db, `rooms/${code}`));
        if (!snap.exists()) break;
        code = randomCode();
      }
      this.roomCode = code;
      const initial = {
        hostId: this.playerId,
        status: 'lobby',
        players: {
          [this.playerId]: { name: this.playerName, score: 0 }
        },
        board: null,
        activeClue: null,
        buzzedPlayer: null,
        answerText: null,
        createdAt: serverTimestamp()
      };
      await set(dbRef(db, `rooms/${code}`), initial);
      this.subscribe(code);
      return code;
    },

    async joinRoom(code, name) {
      this.ensureIdentity(name);
      const roomRef = dbRef(db, `rooms/${code}`);
      const snap = await get(roomRef);
      if (!snap.exists()) throw new Error('Room not found');
      await update(dbRef(db, `rooms/${code}/players/${this.playerId}`), {
        name: this.playerName,
        score: 0
      });
      this.roomCode = code;
      this.subscribe(code);
      return code;
    },

    subscribe(code) {
      if (this.unsubscribe) this.unsubscribe();
      this.roomCode = code;
      const r = dbRef(db, `rooms/${code}`);
      const unsub = onValue(r, snap => {
        this.room = snap.val();
      });
      this.unsubscribe = unsub;

      // When the tab closes, remove this player (unless they are host).
      const playerRef = dbRef(db, `rooms/${code}/players/${this.playerId}`);
      onDisconnect(playerRef).remove();
    },

    async startGame() {
      if (!this.isHost) return;
      const board = buildBoard();
      await update(dbRef(db, `rooms/${this.roomCode}`), {
        board,
        status: 'playing',
        activeClue: null,
        buzzedPlayer: null,
        answerText: null
      });
    },

    async pickClue(col, row) {
      // host only can open a clue
      if (!this.isHost) return;
      if (this.activeClue) return;
      const clue = this.room?.board?.[col]?.clues?.[row];
      if (!clue || clue.played) return;
      await update(dbRef(db, `rooms/${this.roomCode}`), {
        activeClue: { col, row },
        buzzedPlayer: null,
        answerText: null
      });
    },

    async buzzIn() {
      if (!this.activeClue) return;
      // first write wins via transaction
      const buzzRef = dbRef(db, `rooms/${this.roomCode}/buzzedPlayer`);
      await runTransaction(buzzRef, current => {
        if (current == null) return this.playerId;
        return; // abort
      });
    },

    async submitAnswer(text) {
      if (!this.activeClue) return;
      if (this.buzzedPlayerId !== this.playerId) return;
      await update(dbRef(db, `rooms/${this.roomCode}`), {
        answerText: text
      });
    },

    async resolveClue(correct) {
      if (!this.isHost) return;
      if (!this.activeClue) return;
      const buzzed = this.buzzedPlayerId;
      const value = this.activeClue.value;
      const { col, row } = this.activeClue;

      const updates = {};
      updates[`board/${col}/clues/${row}/played`] = true;
      updates[`activeClue`] = null;
      updates[`buzzedPlayer`] = null;
      updates[`answerText`] = null;

      if (buzzed) {
        const delta = correct ? value : -value;
        const currentScore = this.room?.players?.[buzzed]?.score || 0;
        updates[`players/${buzzed}/score`] = currentScore + delta;
      }

      await update(dbRef(db, `rooms/${this.roomCode}`), updates);

      // Check for game over
      const anyRemaining = this.room.board.some((c, ci) =>
        c.clues.some((cl, ri) => {
          if (ci === col && ri === row) return false;
          return !cl.played;
        })
      );
      if (!anyRemaining) {
        await update(dbRef(db, `rooms/${this.roomCode}`), { status: 'finished' });
      }
    },

    async closeClueUnanswered() {
      if (!this.isHost) return;
      if (!this.activeClue) return;
      const { col, row } = this.activeClue;
      const updates = {};
      updates[`board/${col}/clues/${row}/played`] = true;
      updates[`activeClue`] = null;
      updates[`buzzedPlayer`] = null;
      updates[`answerText`] = null;
      await update(dbRef(db, `rooms/${this.roomCode}`), updates);

      const anyRemaining = this.room.board.some((c, ci) =>
        c.clues.some((cl, ri) => {
          if (ci === col && ri === row) return false;
          return !cl.played;
        })
      );
      if (!anyRemaining) {
        await update(dbRef(db, `rooms/${this.roomCode}`), { status: 'finished' });
      }
    },

    async newGame() {
      if (!this.isHost) return;
      const board = buildBoard();
      const resetPlayers = {};
      for (const p of this.players) {
        resetPlayers[p.id] = { name: p.name, score: 0 };
      }
      await update(dbRef(db, `rooms/${this.roomCode}`), {
        board: null,
        status: 'lobby',
        activeClue: null,
        buzzedPlayer: null,
        answerText: null,
        players: resetPlayers
      });
    },

    async leaveRoom() {
      if (this.unsubscribe) this.unsubscribe();
      this.unsubscribe = null;
      if (this.roomCode && this.playerId) {
        try {
          await remove(dbRef(db, `rooms/${this.roomCode}/players/${this.playerId}`));
        } catch (_) { /* ignore */ }
      }
      this.room = null;
      this.roomCode = '';
    }
  }
});
