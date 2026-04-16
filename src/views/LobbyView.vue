<script setup>
import { onMounted, watch } from 'vue';
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
  // If we refreshed on the lobby URL without an active subscription, re-subscribe.
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

    <div class="actions">
      <button v-if="store.isHost" class="start-btn" @click="start">Start Game</button>
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

.header {
  text-align: center;
}

.hint {
  color: #c9d4ff;
  font-style: italic;
  font-weight: normal;
  margin: 0 0 0.5rem;
}

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

.players-panel {
  background: rgba(8, 18, 52, 0.85);
  border: 2px solid var(--jeopardy-gold);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  min-width: 320px;
  max-width: 600px;
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

.start-btn:hover {
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
