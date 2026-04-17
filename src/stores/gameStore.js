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
import { checkAnswer } from '../utils/answerChecker.js';

const R1_VALUES = [200, 400, 600, 800, 1000];
const R2_VALUES = [400, 800, 1200, 1600, 2000];
const CLUE_TIMER = 15;
const FINAL_TIMER = 30;

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

function buildBoard(excludeCategories, dollarValues, dailyDoubleCount) {
  const byCat = {};
  for (const t of terms) {
    if (!byCat[t.category]) byCat[t.category] = [];
    byCat[t.category].push(t);
  }
  const eligible = Object.keys(byCat)
    .filter(c => byCat[c].length >= 5 && !excludeCategories.includes(c));
  const chosen = shuffle(eligible).slice(0, 6);
  const board = chosen.map(cat => {
    const picks = shuffle(byCat[cat]).slice(0, 5);
    const clues = picks.map((t, i) => ({
      value: dollarValues[i],
      term: t.term,
      definition: t.definition,
      played: false,
      dailyDouble: false
    }));
    return { category: cat, clues };
  });

  // Place daily doubles on random non-top-row tiles
  const ddPositions = [];
  while (ddPositions.length < dailyDoubleCount) {
    const col = Math.floor(Math.random() * 6);
    const row = 1 + Math.floor(Math.random() * 4); // rows 1-4 (skip $200/$400 row)
    const key = `${col}-${row}`;
    if (!ddPositions.includes(key)) {
      ddPositions.push(key);
      board[col].clues[row].dailyDouble = true;
    }
  }

  return board;
}

export const useGameStore = defineStore('game', {
  state: () => ({
    playerId: localStorage.getItem('jeop_playerId') || '',
    playerName: localStorage.getItem('jeop_playerName') || '',
    roomCode: '',
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
    round(state) {
      return state.room ? state.room.round || 1 : 1;
    },
    board(state) {
      return state.room && state.room.board ? state.room.board : [];
    },
    currentTurnId(state) {
      return state.room ? state.room.currentTurn : null;
    },
    isMyTurn(state) {
      return state.room && state.room.currentTurn === state.playerId;
    },
    currentTurnName(state) {
      if (!state.room || !state.room.currentTurn || !state.room.players) return '';
      const p = state.room.players[state.room.currentTurn];
      return p ? p.name : '';
    },
    turnOrder(state) {
      return state.room && state.room.turnOrder ? state.room.turnOrder : [];
    },
    activeClue(state) {
      if (!state.room || !state.room.activeClue) return null;
      const ac = state.room.activeClue;
      const clue = state.room.board?.[ac.col]?.clues?.[ac.row];
      if (!clue) return null;
      return { ...ac, ...clue };
    },
    buzzedPlayerId(state) {
      return state.room ? state.room.buzzedPlayer : null;
    },
    failedPlayers(state) {
      if (!state.room || !state.room.failedPlayers) return [];
      return Object.keys(state.room.failedPlayers);
    },
    lastResult(state) {
      return state.room ? state.room.lastResult : null;
    },
    finalState(state) {
      return state.room ? state.room.final : null;
    },
    allCluesPlayed(state) {
      if (!state.room || !state.room.board) return false;
      return state.room.board.every(col => col.clues.every(c => c.played));
    },
    r1Categories(state) {
      return state.room && state.room.r1Categories ? state.room.r1Categories : [];
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
      for (let tries = 0; tries < 5; tries++) {
        const snap = await get(dbRef(db, `rooms/${code}`));
        if (!snap.exists()) break;
        code = randomCode();
      }
      this.roomCode = code;
      const initial = {
        hostId: this.playerId,
        status: 'lobby',
        round: 0,
        players: {
          [this.playerId]: { name: this.playerName, score: 0 }
        },
        turnOrder: null,
        currentTurn: null,
        board: null,
        activeClue: null,
        buzzedPlayer: null,
        failedPlayers: null,
        lastResult: null,
        r1Categories: null,
        final: null,
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

      const playerRef = dbRef(db, `rooms/${code}/players/${this.playerId}`);
      onDisconnect(playerRef).remove();
    },

    // ─── ROUND START ───────────────────────────────
    async startGame() {
      if (!this.isHost) return;
      const playerIds = Object.keys(this.room.players);
      const order = shuffle(playerIds);
      const board = buildBoard([], R1_VALUES, 1);
      const r1Cats = board.map(c => c.category);

      await update(dbRef(db, `rooms/${this.roomCode}`), {
        board,
        status: 'playing',
        round: 1,
        turnOrder: order,
        currentTurn: order[0],
        activeClue: null,
        buzzedPlayer: null,
        failedPlayers: null,
        lastResult: null,
        r1Categories: r1Cats,
        final: null
      });
    },

    async startDoubleJeopardy() {
      const board = buildBoard(this.r1Categories, R2_VALUES, 2);
      const order = this.turnOrder;
      // Player with lowest score picks first in Double Jeopardy
      const sorted = this.players.slice().sort((a, b) => a.score - b.score);
      const firstTurn = sorted[0]?.id || order[0];

      await update(dbRef(db, `rooms/${this.roomCode}`), {
        board,
        round: 2,
        currentTurn: firstTurn,
        activeClue: null,
        buzzedPlayer: null,
        failedPlayers: null,
        lastResult: null
      });
    },

    async startFinalJeopardy() {
      const usedCats = [
        ...(this.r1Categories || []),
        ...(this.board.map(c => c.category))
      ];
      const byCat = {};
      for (const t of terms) {
        if (!byCat[t.category]) byCat[t.category] = [];
        byCat[t.category].push(t);
      }
      const available = Object.keys(byCat).filter(c => !usedCats.includes(c));
      const cat = available.length > 0
        ? shuffle(available)[0]
        : shuffle(Object.keys(byCat))[0];
      const clue = shuffle(byCat[cat])[0];

      await update(dbRef(db, `rooms/${this.roomCode}`), {
        round: 3,
        board: null,
        activeClue: null,
        final: {
          category: cat,
          term: clue.term,
          definition: clue.definition,
          phase: 'category',
          phaseStartedAt: Date.now(),
          wagers: {},
          answers: {},
          results: null
        }
      });
    },

    // ─── CLUE PICKING (turn-based) ─────────────────
    async pickClue(col, row) {
      if (!this.isMyTurn) return;
      if (this.activeClue) return;
      const clue = this.room?.board?.[col]?.clues?.[row];
      if (!clue || clue.played) return;

      const phase = clue.dailyDouble ? 'dd_reveal' : 'open';
      await update(dbRef(db, `rooms/${this.roomCode}`), {
        activeClue: { col, row, openedAt: Date.now(), phase },
        buzzedPlayer: null,
        failedPlayers: null,
        lastResult: null
      });
    },

    // ─── DAILY DOUBLE ──────────────────────────────
    async startDailyDoubleWager() {
      if (!this.isMyTurn) return;
      await update(dbRef(db, `rooms/${this.roomCode}/activeClue`), {
        phase: 'dd_wager'
      });
    },

    async submitDailyDoubleWager(amount) {
      if (!this.isMyTurn) return;
      await update(dbRef(db, `rooms/${this.roomCode}/activeClue`), {
        phase: 'dd_answer',
        wager: amount,
        openedAt: Date.now()
      });
    },

    async submitDailyDoubleAnswer(text) {
      if (!this.isMyTurn) return;
      const ac = this.activeClue;
      if (!ac) return;
      const correct = checkAnswer(text, ac.term);
      const wager = ac.wager || 0;
      const delta = correct ? wager : -wager;
      const currentScore = this.room?.players?.[this.playerId]?.score || 0;
      const { col, row } = ac;

      const updates = {};
      updates[`board/${col}/clues/${row}/played`] = true;
      updates[`players/${this.playerId}/score`] = currentScore + delta;
      updates['activeClue'] = null;
      updates['buzzedPlayer'] = null;
      updates['failedPlayers'] = null;
      updates['lastResult'] = {
        playerId: this.playerId,
        playerName: this.playerName,
        correct,
        answer: text,
        correctAnswer: ac.term,
        value: wager,
        dailyDouble: true,
        at: Date.now()
      };

      await update(dbRef(db, `rooms/${this.roomCode}`), updates);
      this._checkBoardComplete(col, row);
    },

    // ─── BUZZING ───────────────────────────────────
    async buzzIn() {
      if (!this.activeClue) return;
      if (this.activeClue.phase !== 'open') return;
      // can't buzz if already failed on this clue
      if (this.failedPlayers.includes(this.playerId)) return;
      const buzzRef = dbRef(db, `rooms/${this.roomCode}/buzzedPlayer`);
      await runTransaction(buzzRef, current => {
        if (current == null) return this.playerId;
        return; // abort — someone else won
      });
    },

    // ─── ANSWER SUBMIT (auto-checked) ──────────────
    async submitAnswer(text) {
      const ac = this.activeClue;
      if (!ac) return;
      if (this.buzzedPlayerId !== this.playerId) return;

      const correct = checkAnswer(text, ac.term);
      const value = ac.value;
      const currentScore = this.room?.players?.[this.playerId]?.score || 0;
      const { col, row } = ac;

      if (correct) {
        const updates = {};
        updates[`board/${col}/clues/${row}/played`] = true;
        updates['activeClue'] = null;
        updates['buzzedPlayer'] = null;
        updates['failedPlayers'] = null;
        updates['currentTurn'] = this.playerId;
        updates[`players/${this.playerId}/score`] = currentScore + value;
        updates['lastResult'] = {
          playerId: this.playerId,
          playerName: this.playerName,
          correct: true,
          answer: text,
          correctAnswer: ac.term,
          value,
          dailyDouble: false,
          at: Date.now()
        };
        await update(dbRef(db, `rooms/${this.roomCode}`), updates);
        this._checkBoardComplete(col, row);
      } else {
        // Wrong: deduct, add to failed, clear buzz so others can try
        const updates = {};
        updates['buzzedPlayer'] = null;
        updates[`players/${this.playerId}/score`] = currentScore - value;
        updates[`failedPlayers/${this.playerId}`] = true;
        updates['lastResult'] = {
          playerId: this.playerId,
          playerName: this.playerName,
          correct: false,
          answer: text,
          correctAnswer: ac.term,
          value,
          dailyDouble: false,
          at: Date.now()
        };
        await update(dbRef(db, `rooms/${this.roomCode}`), updates);
      }
    },

    // ─── TIMEOUT ───────────────────────────────────
    async timeoutClue() {
      const ac = this.activeClue;
      if (!ac) return;
      const { col, row } = ac;
      const updates = {};
      updates[`board/${col}/clues/${row}/played`] = true;
      updates['activeClue'] = null;
      updates['buzzedPlayer'] = null;
      updates['failedPlayers'] = null;
      updates['lastResult'] = {
        playerId: null,
        playerName: null,
        correct: false,
        answer: null,
        correctAnswer: ac.term,
        value: ac.value,
        dailyDouble: false,
        at: Date.now(),
        timeout: true
      };
      await update(dbRef(db, `rooms/${this.roomCode}`), updates);
      this._checkBoardComplete(col, row);
    },

    // ─── CHECK BOARD COMPLETION ────────────────────
    async _checkBoardComplete(justPlayedCol, justPlayedRow) {
      await new Promise(r => setTimeout(r, 300));
      const snap = await get(dbRef(db, `rooms/${this.roomCode}/board`));
      const board = snap.val();
      if (!board) return;
      const anyRemaining = board.some(col =>
        col.clues.some(cl => !cl.played)
      );
      if (anyRemaining) return;

      const round = this.round;
      if (round === 1) {
        await this.startDoubleJeopardy();
      } else if (round === 2) {
        await this.startFinalJeopardy();
      }
    },

    // ─── FINAL JEOPARDY ───────────────────────────
    async advanceFinalPhase(newPhase) {
      await update(dbRef(db, `rooms/${this.roomCode}/final`), {
        phase: newPhase,
        phaseStartedAt: Date.now()
      });
    },

    async submitFinalWager(amount) {
      await update(
        dbRef(db, `rooms/${this.roomCode}/final/wagers/${this.playerId}`),
        {}
      );
      await set(
        dbRef(db, `rooms/${this.roomCode}/final/wagers/${this.playerId}`),
        amount
      );
    },

    async submitFinalAnswer(text) {
      await set(
        dbRef(db, `rooms/${this.roomCode}/final/answers/${this.playerId}`),
        text
      );
    },

    async revealFinalResults() {
      const final = this.finalState;
      if (!final) return;
      const results = {};
      const scoreUpdates = {};

      for (const p of this.players) {
        const wager = final.wagers?.[p.id] ?? 0;
        const answer = final.answers?.[p.id] ?? '';
        const correct = answer ? checkAnswer(answer, final.term) : false;
        const delta = correct ? wager : -wager;
        results[p.id] = { correct, wager, answer, delta };
        scoreUpdates[`players/${p.id}/score`] = (p.score || 0) + delta;
      }

      const updates = {
        ...scoreUpdates,
        'final/results': results,
        'final/phase': 'reveal',
        status: 'finished'
      };
      await update(dbRef(db, `rooms/${this.roomCode}`), updates);
    },

    // ─── NEW GAME / LEAVE ──────────────────────────
    async newGame() {
      if (!this.isHost) return;
      const resetPlayers = {};
      for (const p of this.players) {
        resetPlayers[p.id] = { name: p.name, score: 0 };
      }
      await update(dbRef(db, `rooms/${this.roomCode}`), {
        board: null,
        status: 'lobby',
        round: 0,
        activeClue: null,
        buzzedPlayer: null,
        failedPlayers: null,
        lastResult: null,
        currentTurn: null,
        turnOrder: null,
        r1Categories: null,
        final: null,
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
