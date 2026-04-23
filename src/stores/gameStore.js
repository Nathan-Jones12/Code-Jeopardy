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
import {
  generateCluesBatch,
  judgeAnswer,
  geminiEnabled,
  GeminiUnavailableError
} from '../utils/gemini.js';

const R1_VALUES = [200, 400, 600, 800, 1000];
const R2_VALUES = [400, 800, 1200, 1600, 2000];
const CLUE_TIMER = 15;
const FINAL_TIMER = 30;

const TEAM_COLORS = ['#e11d48', '#2563eb', '#16a34a', '#f59e0b'];
const TEAM_NAMES = ['Red Team', 'Blue Team', 'Green Team', 'Gold Team'];

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

function variantLabel(category, variant) {
  return (variant === 'scenarios' ? 'Scenarios: ' : 'Definitions: ') + category;
}

async function fetchCachedClues(termIds) {
  const out = {};
  await Promise.all(termIds.map(async id => {
    try {
      const snap = await get(dbRef(db, `cluesCache/${id}`));
      if (snap.exists()) out[id] = snap.val();
    } catch { /* ignore */ }
  }));
  return out;
}

async function writeCachedClues(map) {
  const updates = {};
  for (const [id, v] of Object.entries(map)) {
    updates[`cluesCache/${id}/definition`] = v.definition;
    updates[`cluesCache/${id}/scenario`] = v.scenario;
    updates[`cluesCache/${id}/generatedAt`] = Date.now();
  }
  if (Object.keys(updates).length) {
    try { await update(dbRef(db), updates); } catch { /* ignore */ }
  }
}

async function resolveClueContent(pickedTerms) {
  // pickedTerms: array of term objects. Returns map id -> { definition, scenario }.
  const ids = pickedTerms.map(t => t.id);
  const cached = await fetchCachedClues(ids);
  const missing = pickedTerms.filter(t => !cached[t.id]);

  let generated = {};
  if (missing.length && geminiEnabled()) {
    try {
      generated = await generateCluesBatch(
        missing.map(t => ({ id: t.id, term: t.term, category: t.category }))
      );
      if (Object.keys(generated).length) await writeCachedClues(generated);
    } catch (e) {
      // Swallow — fall back to static content
      generated = {};
    }
  }

  const result = {};
  for (const t of pickedTerms) {
    const c = cached[t.id] || generated[t.id];
    result[t.id] = {
      definition: c?.definition || t.definition,
      scenario: c?.scenario || t.scenario || t.definition
    };
  }
  return result;
}

async function buildBoard(excludeCategories, dollarValues, dailyDoubleCount) {
  const byCat = {};
  for (const t of terms) {
    if (!byCat[t.category]) byCat[t.category] = [];
    byCat[t.category].push(t);
  }
  const eligible = Object.keys(byCat)
    .filter(c => byCat[c].length >= 5 && !excludeCategories.includes(c));
  const chosen = shuffle(eligible).slice(0, 6);

  const picksPerCat = chosen.map(cat => shuffle(byCat[cat]).slice(0, 5));
  const allPicks = picksPerCat.flat();
  const content = await resolveClueContent(allPicks);

  const board = chosen.map((cat, ci) => {
    const variant = Math.random() < 0.5 ? 'scenarios' : 'definitions';
    const clues = picksPerCat[ci].map((t, i) => {
      const c = content[t.id];
      return {
        value: dollarValues[i],
        term: t.term,
        definition: c.definition,
        scenario: c.scenario,
        played: false,
        dailyDouble: false
      };
    });
    return {
      category: cat,
      variant,
      label: variantLabel(cat, variant),
      clues
    };
  });

  const ddPositions = [];
  while (ddPositions.length < dailyDoubleCount) {
    const col = Math.floor(Math.random() * 6);
    const row = 1 + Math.floor(Math.random() * 4);
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
    unsubscribe: null,
    isChecking: false
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
    teamsMode(state) {
      return !!(state.room && state.room.teamsMode);
    },
    teamCount(state) {
      return state.room?.teamCount || 2;
    },
    teams(state) {
      if (!state.room || !state.room.teams) return [];
      return Object.entries(state.room.teams).map(([id, t]) => ({
        id,
        ...t,
        memberIds: t.memberIds || []
      }));
    },
    lobbyPhase(state) {
      return state.room?.lobbyPhase || 'players';
    },
    myTeamId(state) {
      if (!state.room?.teamsMode) return null;
      const p = state.room.players?.[state.playerId];
      return p?.teamId || null;
    },
    myTeam() {
      const tid = this.myTeamId;
      if (!tid) return null;
      return this.teams.find(t => t.id === tid) || null;
    },
    isMyCaptain() {
      const t = this.myTeam;
      return !!t && t.captainId === this.playerId;
    },
    currentTurnId(state) {
      return state.room ? state.room.currentTurn : null;
    },
    currentTeamTurnId(state) {
      return state.room?.currentTeamTurn || null;
    },
    isMyTurn(state) {
      if (!state.room) return false;
      if (state.room.teamsMode) {
        const tid = state.room.players?.[state.playerId]?.teamId;
        const team = tid && state.room.teams ? state.room.teams[tid] : null;
        return !!team
          && state.room.currentTeamTurn === tid
          && team.captainId === state.playerId;
      }
      return state.room.currentTurn === state.playerId;
    },
    currentTurnName(state) {
      if (!state.room) return '';
      if (state.room.teamsMode) {
        const tid = state.room.currentTeamTurn;
        const team = tid && state.room.teams ? state.room.teams[tid] : null;
        if (!team) return '';
        const capName = team.captainId && state.room.players?.[team.captainId]?.name;
        return `${team.name}${capName ? ' (' + capName + ')' : ''}`;
      }
      if (!state.room.currentTurn || !state.room.players) return '';
      const p = state.room.players[state.room.currentTurn];
      return p ? p.name : '';
    },
    turnOrder(state) {
      return state.room && state.room.turnOrder ? state.room.turnOrder : [];
    },
    activeClue(state) {
      if (!state.room || !state.room.activeClue) return null;
      const ac = state.room.activeClue;
      const col = state.room.board?.[ac.col];
      const clue = col?.clues?.[ac.row];
      if (!clue) return null;
      return {
        ...ac,
        ...clue,
        variant: col.variant || 'definitions',
        categoryLabel: col.label || col.category
      };
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
        teamsMode: false,
        teamCount: 2,
        teams: null,
        teamOrder: null,
        currentTeamTurn: null,
        lobbyPhase: 'players',
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

    // ─── TEAMS MODE (lobby) ────────────────────────
    async setTeamsMode(on) {
      if (!this.isHost) return;
      const updates = {
        teamsMode: !!on,
        lobbyPhase: 'players',
        teams: null,
        teamOrder: null,
        currentTeamTurn: null
      };
      await update(dbRef(db, `rooms/${this.roomCode}`), updates);
    },

    async setTeamCount(n) {
      if (!this.isHost) return;
      const count = Math.max(2, Math.min(4, n | 0));
      await update(dbRef(db, `rooms/${this.roomCode}`), {
        teamCount: count,
        teams: null,
        lobbyPhase: 'players'
      });
    },

    async autoBalanceTeams() {
      if (!this.isHost) return;
      const count = this.teamCount;
      const playerIds = shuffle(Object.keys(this.room.players || {}));
      if (playerIds.length < count) return;
      const teams = {};
      for (let i = 0; i < count; i++) {
        const tid = `t${i + 1}`;
        teams[tid] = {
          name: TEAM_NAMES[i],
          color: TEAM_COLORS[i],
          score: 0,
          captainId: null,
          memberIds: []
        };
      }
      const teamIds = Object.keys(teams);
      playerIds.forEach((pid, idx) => {
        const tid = teamIds[idx % count];
        teams[tid].memberIds.push(pid);
      });
      await update(dbRef(db, `rooms/${this.roomCode}`), {
        teams,
        lobbyPhase: 'balanced'
      });
    },

    async setCaptain(teamId, playerId) {
      if (!this.isHost) return;
      const teams = this.room?.teams || {};
      const team = teams[teamId];
      if (!team) return;
      if (!(team.memberIds || []).includes(playerId)) return;
      await update(
        dbRef(db, `rooms/${this.roomCode}/teams/${teamId}`),
        { captainId: playerId }
      );
      // Check if all teams now have a captain
      const snap = await get(dbRef(db, `rooms/${this.roomCode}/teams`));
      const fresh = snap.val() || {};
      const allSet = Object.values(fresh).every(t => !!t.captainId);
      if (allSet) {
        await update(dbRef(db, `rooms/${this.roomCode}`), {
          lobbyPhase: 'captains-chosen'
        });
      } else {
        await update(dbRef(db, `rooms/${this.roomCode}`), {
          lobbyPhase: 'balanced'
        });
      }
    },

    // ─── ROUND START ───────────────────────────────
    async startGame() {
      if (!this.isHost) return;
      const board = await buildBoard([], R1_VALUES, 1);
      const r1Cats = board.map(c => c.category);
      const updates = {
        board,
        status: 'playing',
        round: 1,
        activeClue: null,
        buzzedPlayer: null,
        failedPlayers: null,
        lastResult: null,
        r1Categories: r1Cats,
        final: null
      };

      if (this.room?.teamsMode) {
        if (this.lobbyPhase !== 'captains-chosen') return;
        const teams = this.room.teams || {};
        const teamIds = shuffle(Object.keys(teams));
        updates.teamOrder = teamIds;
        updates.currentTeamTurn = teamIds[0];
        updates.turnOrder = null;
        updates.currentTurn = null;
        // Stamp teamId on each player
        for (const [tid, t] of Object.entries(teams)) {
          for (const pid of (t.memberIds || [])) {
            updates[`players/${pid}/teamId`] = tid;
            updates[`players/${pid}/score`] = 0;
          }
        }
      } else {
        const playerIds = Object.keys(this.room.players);
        const order = shuffle(playerIds);
        updates.turnOrder = order;
        updates.currentTurn = order[0];
      }

      await update(dbRef(db, `rooms/${this.roomCode}`), updates);
    },

    async startDoubleJeopardy() {
      const board = await buildBoard(this.r1Categories, R2_VALUES, 2);
      const updates = {
        board,
        round: 2,
        activeClue: null,
        buzzedPlayer: null,
        failedPlayers: null,
        lastResult: null
      };
      if (this.room?.teamsMode) {
        const sortedTeams = this.teams.slice().sort((a, b) => (a.score || 0) - (b.score || 0));
        updates.currentTeamTurn = sortedTeams[0]?.id || this.teams[0]?.id;
      } else {
        const sorted = this.players.slice().sort((a, b) => a.score - b.score);
        updates.currentTurn = sorted[0]?.id || this.turnOrder[0];
      }

      await update(dbRef(db, `rooms/${this.roomCode}`), updates);
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
      const variant = Math.random() < 0.5 ? 'scenarios' : 'definitions';
      const resolved = await resolveClueContent([clue]);
      const content = resolved[clue.id];

      await update(dbRef(db, `rooms/${this.roomCode}`), {
        round: 3,
        board: null,
        activeClue: null,
        final: {
          category: cat,
          categoryLabel: variantLabel(cat, variant),
          variant,
          term: clue.term,
          definition: content.definition,
          scenario: content.scenario,
          phase: 'category',
          phaseStartedAt: Date.now(),
          wagers: {},
          answers: {},
          teamWagers: {},
          teamAnswers: {},
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

    async _adjudicate(submitted, ac) {
      // Returns true if the submitted answer should be treated as correct.
      // Fast-path with local checker; fall back to Gemini for near-misses.
      if (!submitted) return false;
      if (checkAnswer(submitted, ac.term)) return true;
      if (submitted.trim().length < 3) return false;
      if (!geminiEnabled()) return false;
      const clueText = (ac.variant === 'scenarios')
        ? (ac.scenario || ac.definition)
        : ac.definition;
      this.isChecking = true;
      try {
        return await judgeAnswer({ submitted, term: ac.term, clueText });
      } catch (e) {
        return false;
      } finally {
        this.isChecking = false;
      }
    },

    _scoreDeltaUpdates(playerId, delta) {
      // Returns {[path]: newValue} flat updates for a score change.
      const updates = {};
      if (this.room?.teamsMode) {
        const p = this.room.players?.[playerId];
        const tid = p?.teamId;
        if (tid) {
          const current = this.room.teams?.[tid]?.score || 0;
          updates[`teams/${tid}/score`] = current + delta;
        }
      } else {
        const current = this.room?.players?.[playerId]?.score || 0;
        updates[`players/${playerId}/score`] = current + delta;
      }
      return updates;
    },

    async submitDailyDoubleAnswer(text) {
      if (!this.isMyTurn) return;
      const ac = this.activeClue;
      if (!ac) return;
      const correct = await this._adjudicate(text, ac);
      const wager = ac.wager || 0;
      const delta = correct ? wager : -wager;
      const { col, row } = ac;

      const updates = {
        [`board/${col}/clues/${row}/played`]: true,
        ...this._scoreDeltaUpdates(this.playerId, delta),
        activeClue: null,
        buzzedPlayer: null,
        failedPlayers: null,
        lastResult: {
          playerId: this.playerId,
          playerName: this.playerName,
          correct,
          answer: text,
          correctAnswer: ac.term,
          value: wager,
          dailyDouble: true,
          at: Date.now()
        }
      };

      await update(dbRef(db, `rooms/${this.roomCode}`), updates);
      this._checkBoardComplete(col, row);
    },

    // ─── BUZZING ───────────────────────────────────
    async buzzIn() {
      if (!this.activeClue) return;
      if (this.activeClue.phase !== 'open') return;
      if (this.failedPlayers.includes(this.playerId)) return;
      const buzzRef = dbRef(db, `rooms/${this.roomCode}/buzzedPlayer`);
      await runTransaction(buzzRef, current => {
        if (current == null) return this.playerId;
        return;
      });
    },

    // ─── ANSWER SUBMIT (auto-checked) ──────────────
    async submitAnswer(text) {
      const ac = this.activeClue;
      if (!ac) return;
      if (this.buzzedPlayerId !== this.playerId) return;

      const correct = await this._adjudicate(text, ac);
      const value = ac.value;
      const { col, row } = ac;

      if (correct) {
        const updates = {
          [`board/${col}/clues/${row}/played`]: true,
          activeClue: null,
          buzzedPlayer: null,
          failedPlayers: null,
          ...this._scoreDeltaUpdates(this.playerId, value),
          lastResult: {
            playerId: this.playerId,
            playerName: this.playerName,
            correct: true,
            answer: text,
            correctAnswer: ac.term,
            value,
            dailyDouble: false,
            at: Date.now()
          }
        };
        if (this.room?.teamsMode) {
          const winningTeam = this.room.players?.[this.playerId]?.teamId;
          if (winningTeam) updates.currentTeamTurn = winningTeam;
        } else {
          updates.currentTurn = this.playerId;
        }
        await update(dbRef(db, `rooms/${this.roomCode}`), updates);
        this._checkBoardComplete(col, row);
      } else {
        const updates = {
          buzzedPlayer: null,
          ...this._scoreDeltaUpdates(this.playerId, -value),
          [`failedPlayers/${this.playerId}`]: true,
          lastResult: {
            playerId: this.playerId,
            playerName: this.playerName,
            correct: false,
            answer: text,
            correctAnswer: ac.term,
            value,
            dailyDouble: false,
            at: Date.now()
          }
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
      if (this.room?.teamsMode) {
        const tid = this.myTeamId;
        if (!tid || !this.isMyCaptain) return;
        await set(
          dbRef(db, `rooms/${this.roomCode}/final/teamWagers/${tid}`),
          amount
        );
      } else {
        await set(
          dbRef(db, `rooms/${this.roomCode}/final/wagers/${this.playerId}`),
          amount
        );
      }
    },

    async submitFinalAnswer(text) {
      if (this.room?.teamsMode) {
        const tid = this.myTeamId;
        if (!tid || !this.isMyCaptain) return;
        await set(
          dbRef(db, `rooms/${this.roomCode}/final/teamAnswers/${tid}`),
          text
        );
      } else {
        await set(
          dbRef(db, `rooms/${this.roomCode}/final/answers/${this.playerId}`),
          text
        );
      }
    },

    async revealFinalResults() {
      const final = this.finalState;
      if (!final) return;
      const results = {};
      const teamResults = {};
      const scoreUpdates = {};

      const finalAc = {
        term: final.term,
        variant: final.variant,
        definition: final.definition,
        scenario: final.scenario
      };

      if (this.room?.teamsMode) {
        for (const t of this.teams) {
          const wager = final.teamWagers?.[t.id] ?? 0;
          const answer = final.teamAnswers?.[t.id] ?? '';
          const correct = answer ? await this._adjudicate(answer, finalAc) : false;
          const delta = correct ? wager : -wager;
          teamResults[t.id] = { correct, wager, answer, delta };
          scoreUpdates[`teams/${t.id}/score`] = (t.score || 0) + delta;
        }
      } else {
        for (const p of this.players) {
          const wager = final.wagers?.[p.id] ?? 0;
          const answer = final.answers?.[p.id] ?? '';
          const correct = answer ? await this._adjudicate(answer, finalAc) : false;
          const delta = correct ? wager : -wager;
          results[p.id] = { correct, wager, answer, delta };
          scoreUpdates[`players/${p.id}/score`] = (p.score || 0) + delta;
        }
      }

      const updates = {
        ...scoreUpdates,
        'final/results': results,
        'final/teamResults': teamResults,
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
        const reset = { name: p.name, score: 0 };
        if (this.room?.teamsMode && p.teamId) reset.teamId = p.teamId;
        resetPlayers[p.id] = reset;
      }

      const updates = {
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
      };

      if (this.room?.teamsMode && this.room.teams) {
        const teams = {};
        for (const [tid, t] of Object.entries(this.room.teams)) {
          teams[tid] = { ...t, score: 0 };
        }
        updates.teams = teams;
        updates.currentTeamTurn = null;
        updates.teamOrder = null;
      }

      await update(dbRef(db, `rooms/${this.roomCode}`), updates);
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
