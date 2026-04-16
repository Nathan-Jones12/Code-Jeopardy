<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore.js';

const props = defineProps({ roomCode: String });
const router = useRouter();
const store = useGameStore();

onMounted(() => {
  if (!store.playerId) {
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
    if (s === 'lobby') router.push({ name: 'lobby', params: { roomCode: props.roomCode } });
    else if (s === 'playing') router.push({ name: 'game', params: { roomCode: props.roomCode } });
  }
);

const ranked = computed(() =>
  store.players.slice().sort((a, b) => b.score - a.score)
);

const winner = computed(() => ranked.value[0]);

function newGame() {
  store.newGame();
}

function leave() {
  store.leaveRoom();
  router.push({ name: 'home' });
}
</script>

<template>
  <div class="gameover">
    <h1 class="title">Game Over</h1>
    <p v-if="winner" class="winner">
      🏆 Winner: <span class="winner-name">{{ winner.name }}</span>
      with ${{ winner.score }}
    </p>

    <div class="panel">
      <h2>Final Scores</h2>
      <ol class="scores">
        <li
          v-for="(p, i) in ranked"
          :key="p.id"
          :class="{ winner: i === 0 }"
        >
          <span class="rank">{{ i + 1 }}.</span>
          <span class="name">{{ p.name }}</span>
          <span class="score">${{ p.score }}</span>
        </li>
      </ol>
    </div>

    <div class="actions">
      <button v-if="store.isHost" class="big-btn" @click="newGame">New Game</button>
      <p v-else class="waiting">Waiting for host to start a new game…</p>
      <button class="leave-btn" @click="leave">Leave</button>
    </div>
  </div>
</template>

<style scoped>
.gameover {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1.5rem;
  gap: 1.5rem;
  background: radial-gradient(ellipse at top, #10216e 0%, var(--jeopardy-bg) 70%);
}

.title {
  font-family: var(--serif);
  font-size: 4rem;
  color: var(--jeopardy-gold);
  margin: 0;
  letter-spacing: 0.05em;
  text-shadow: 3px 3px 0 #000;
}

.winner {
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
}

.winner-name {
  color: var(--jeopardy-gold);
  font-weight: bold;
}

.panel {
  background: var(--jeopardy-blue);
  border: 3px solid var(--jeopardy-gold);
  border-radius: 8px;
  padding: 1.5rem 2rem;
  min-width: 340px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px var(--jeopardy-shadow);
}

.panel h2 {
  margin: 0 0 1rem;
  color: var(--jeopardy-gold);
  text-align: center;
  font-family: var(--serif);
}

.scores {
  list-style: none;
  padding: 0;
  margin: 0;
}

.scores li {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.8rem;
  align-items: center;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid rgba(255, 204, 0, 0.25);
  font-size: 1.15rem;
}

.scores li:last-child { border-bottom: none; }

.scores li.winner {
  background: rgba(255, 204, 0, 0.15);
  border-radius: 4px;
  color: var(--jeopardy-gold);
  font-weight: bold;
}

.rank { opacity: 0.7; }

.score {
  font-family: var(--serif);
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.big-btn {
  background: var(--jeopardy-gold);
  color: #000;
  border: none;
  padding: 0.9rem 1.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: var(--serif);
  border-radius: 4px;
}

.big-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.leave-btn {
  background: transparent;
  color: #c9d4ff;
  border: 1px solid #c9d4ff;
  padding: 0.9rem 1.5rem;
  border-radius: 4px;
}

.waiting {
  margin: 0;
  color: #b9c7ff;
  font-style: italic;
}
</style>
