<script setup>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore.js';
import JeopardyBoard from '../components/JeopardyBoard.vue';
import ClueModal from '../components/ClueModal.vue';
import Scoreboard from '../components/Scoreboard.vue';

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
    if (s === 'finished') {
      router.push({ name: 'gameover', params: { roomCode: props.roomCode } });
    } else if (s === 'lobby') {
      router.push({ name: 'lobby', params: { roomCode: props.roomCode } });
    }
  }
);

function onPick({ col, row }) {
  store.pickClue(col, row);
}
</script>

<template>
  <div class="game">
    <div class="top-bar">
      <span class="room-code">Room {{ roomCode }}</span>
      <span class="hint" v-if="store.isHost">You are the host</span>
    </div>

    <div class="board-area" v-if="store.board.length">
      <JeopardyBoard :board="store.board" :can-pick="store.isHost && !store.activeClue" @pick="onPick" />
    </div>
    <div v-else class="loading">Setting up the board…</div>

    <Scoreboard
      :players="store.players"
      :host-id="store.room && store.room.hostId"
      :self-id="store.playerId"
      :buzzed-id="store.buzzedPlayerId"
    />

    <ClueModal v-if="store.activeClue" />
  </div>
</template>

<style scoped>
.game {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--jeopardy-bg);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1.2rem;
  background: var(--jeopardy-bg-2);
  border-bottom: 2px solid var(--jeopardy-gold);
}

.room-code {
  color: var(--jeopardy-gold);
  font-weight: bold;
  letter-spacing: 0.15em;
  font-size: 1.1rem;
}

.hint {
  color: #c9d4ff;
  font-style: italic;
  font-size: 0.95rem;
}

.board-area {
  flex: 1;
  padding: 1rem 1rem 0;
  display: flex;
  justify-content: center;
}

.loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c9d4ff;
}
</style>
