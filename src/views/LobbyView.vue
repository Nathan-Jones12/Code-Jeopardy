<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore.js';
import PlayerBadge from '../components/PlayerBadge.vue';

const props = defineProps({ roomCode: String });
const router = useRouter();
const store = useGameStore();

onMounted(() => {
  if (!store.playerId || !store.playerName) {
    router.replace({ name: 'home' });
    return;
  }
  if (!store.room || store.roomCode !== props.roomCode) {
    store.subscribe(props.roomCode);
  }
});

watch(
  () => store.status,
  s => {
    if (s === 'playing') {
      router.push({ name: 'game', params: { roomCode: props.roomCode } });
    } else if (s === 'finished') {
      router.push({ name: 'gameover', params: { roomCode: props.roomCode } });
    }
  }
);

const teamsMode = computed(() => store.teamsMode);
const teamCount = computed(() => store.teamCount);
const teams = computed(() => store.teams);
const lobbyPhase = computed(() => store.lobbyPhase);

const canStart = computed(() => {
  if (!store.isHost) return false;
  if (store.players.length < 2) return false;
  if (teamsMode.value) {
    return lobbyPhase.value === 'captains-chosen';
  }
  return true;
});

const canBalance = computed(() =>
  store.isHost
  && teamsMode.value
  && store.players.length >= teamCount.value
);

function toggleTeams(e) {
  store.setTeamsMode(e.target.checked);
}
function changeCount(n) {
  store.setTeamCount(n);
}
function balance() {
  store.autoBalanceTeams();
}
function pickCaptain(teamId, e) {
  const pid = e.target.value;
  if (pid) store.setCaptain(teamId, pid);
}

function playerName(id) {
  const p = store.players.find(pp => pp.id === id);
  return p ? p.name : id;
}

function start() {
  store.startGame();
}

function leave() {
  store.leaveRoom();
  router.push({ name: 'home' });
}

function copyCode() {
  navigator.clipboard?.writeText(props.roomCode);
}
</script>

<template>
  <div class="lobby">
    <div class="header">
      <h2 class="hint">Share this room code with your players:</h2>
      <div class="code-wrap">
        <span class="code" @click="copyCode" title="click to copy">{{ roomCode }}</span>
      </div>
    </div>

    <div class="players-panel">
      <h3>Players ({{ store.players.length }})</h3>
      <div class="players-list">
        <PlayerBadge
          v-for="p in store.players"
          :key="p.id"
          :name="p.name"
          :score="p.score"
          :is-host="store.room && store.room.hostId === p.id"
          :is-self="p.id === store.playerId"
        />
      </div>
      <p v-if="store.players.length < 2" class="waiting">
        Waiting for more players to join…
      </p>
    </div>

    <!-- TEAMS MODE CONTROLS -->
    <div class="teams-panel">
      <div class="teams-toggle">
        <label>
          <input
            type="checkbox"
            :checked="teamsMode"
            :disabled="!store.isHost"
            @change="toggleTeams"
          />
          Teams mode
        </label>
        <template v-if="teamsMode">
          <span class="count-label">Number of teams:</span>
          <span class="count-opts">
            <button
              v-for="n in [2, 3, 4]"
              :key="n"
              :class="{ active: teamCount === n }"
              :disabled="!store.isHost"
              @click="changeCount(n)"
            >{{ n }}</button>
          </span>
        </template>
      </div>

      <template v-if="teamsMode">
        <div v-if="lobbyPhase === 'players'" class="balance-row">
          <button
            class="secondary-btn"
            :disabled="!canBalance"
            @click="balance"
          >
            Auto-Balance Teams
          </button>
          <p v-if="!canBalance && store.isHost" class="hint small">
            Need at least {{ teamCount }} players to balance.
          </p>
        </div>

        <div v-else class="teams-grid">
          <div
            v-for="t in teams"
            :key="t.id"
            class="team-card"
            :style="{ borderColor: t.color }"
          >
            <div class="team-name" :style="{ color: t.color }">{{ t.name }}</div>
            <ul class="team-members">
              <li v-for="mid in t.memberIds" :key="mid" :class="{ captain: t.captainId === mid }">
                <span>{{ playerName(mid) }}</span>
                <span v-if="t.captainId === mid" class="cap-tag">CAPTAIN</span>
              </li>
            </ul>
            <div class="cap-row">
              <label class="small">Captain:</label>
              <select
                :disabled="!store.isHost"
                :value="t.captainId || ''"
                @change="pickCaptain(t.id, $event)"
              >
                <option value="" disabled>Pick captain…</option>
                <option v-for="mid in t.memberIds" :key="mid" :value="mid">
                  {{ playerName(mid) }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="lobbyPhase !== 'players'" class="balance-row">
          <button
            v-if="store.isHost"
            class="secondary-btn"
            @click="balance"
          >
            Re-Balance
          </button>
        </div>
      </template>
    </div>

    <div class="info">
      <p>Game includes <strong>3 rounds</strong>:</p>
      <p>Round 1 (Jeopardy) → Round 2 (Double Jeopardy) → Final Jeopardy</p>
      <p>The computer checks answers automatically and tracks turns.</p>
    </div>

    <div class="actions">
      <button
        v-if="store.isHost"
        class="start-btn"
        :disabled="!canStart"
        @click="start"
      >Start Game</button>
      <p v-else class="waiting">Waiting for host to start the game…</p>
      <button class="leave-btn" @click="leave">Leave</button>
    </div>
  </div>
</template>

<style scoped>
.lobby {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem;
  gap: 2rem;
  background: radial-gradient(ellipse at top, #10216e 0%, var(--jeopardy-bg) 70%);
}

.header { text-align: center; }

.hint {
  color: #c9d4ff;
  font-style: italic;
  font-weight: normal;
  margin: 0 0 0.5rem;
}

.hint.small { font-size: 0.8rem; margin: 0.3rem 0 0; }

.code-wrap {
  background: var(--jeopardy-blue);
  border: 4px solid var(--jeopardy-gold);
  border-radius: 8px;
  padding: 1rem 2rem;
  display: inline-block;
  box-shadow: 0 10px 40px var(--jeopardy-shadow);
}

.code {
  font-family: var(--serif);
  font-size: 5rem;
  color: var(--jeopardy-gold);
  letter-spacing: 0.25em;
  font-weight: bold;
  cursor: pointer;
  user-select: all;
  text-shadow: 2px 2px 0 #000;
}

.players-panel,
.teams-panel {
  background: rgba(8, 18, 52, 0.85);
  border: 2px solid var(--jeopardy-gold);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  min-width: 320px;
  max-width: 700px;
  width: 100%;
}

.players-panel h3 {
  margin: 0 0 1rem;
  color: var(--jeopardy-gold);
  font-family: var(--serif);
}

.players-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.teams-toggle {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  color: #fff;
}

.teams-toggle label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--serif);
  color: var(--jeopardy-gold);
  font-size: 1.05rem;
}

.count-label { color: #c9d4ff; }

.count-opts { display: flex; gap: 0.35rem; }
.count-opts button {
  background: transparent;
  color: #fff;
  border: 1px solid #c9d4ff;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  font-weight: bold;
}
.count-opts button.active {
  background: var(--jeopardy-gold);
  color: #000;
  border-color: var(--jeopardy-gold);
}

.balance-row {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
}

.secondary-btn {
  background: var(--jeopardy-gold);
  color: #000;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  font-family: var(--serif);
}
.secondary-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.teams-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.8rem;
}

.team-card {
  background: var(--jeopardy-blue);
  border: 3px solid #666;
  border-radius: 6px;
  padding: 0.8rem 1rem;
}

.team-name {
  font-family: var(--serif);
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.team-members {
  list-style: none;
  padding: 0;
  margin: 0 0 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.team-members li {
  color: #fff;
  font-size: 0.95rem;
  display: flex;
  justify-content: space-between;
  gap: 0.4rem;
}

.team-members li.captain {
  color: var(--jeopardy-gold);
  font-weight: bold;
}

.cap-tag {
  background: var(--jeopardy-gold);
  color: #000;
  font-size: 0.65rem;
  padding: 0.05rem 0.35rem;
  border-radius: 2px;
  letter-spacing: 0.08em;
}

.cap-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.3rem;
}
.small { font-size: 0.8rem; color: #c9d4ff; }

.cap-row select {
  flex: 1;
  padding: 0.3rem;
  border-radius: 4px;
  background: #fff;
  color: #000;
  border: 1px solid #000;
}

.info {
  text-align: center;
  color: #93a6d1;
  font-size: 0.9rem;
}

.info p { margin: 0.2rem 0; }

.waiting {
  margin: 1rem 0 0;
  color: #b9c7ff;
  font-style: italic;
  font-size: 0.95rem;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.start-btn {
  background: var(--jeopardy-gold);
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.3rem;
  font-weight: bold;
  font-family: var(--serif);
  border-radius: 4px;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.start-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.start-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.leave-btn {
  background: transparent;
  color: #c9d4ff;
  border: 1px solid #c9d4ff;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
}

@media (max-width: 900px) {
  .code { font-size: 3.5rem; letter-spacing: 0.18em; }
}
</style>
