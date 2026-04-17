<script setup>
import { onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore.js';
import JeopardyBoard from '../components/JeopardyBoard.vue';
import ClueModal from '../components/ClueModal.vue';
import Scoreboard from '../components/Scoreboard.vue';
import FinalJeopardy from '../components/FinalJeopardy.vue';

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

const roundLabel = computed(() => {
  if (store.round === 1) return 'Jeopardy! — Round 1';
  if (store.round === 2) return 'Double Jeopardy!';
  if (store.round === 3) return 'Final Jeopardy!';
  return '';
});

const canPick = computed(() => store.isMyTurn && !store.activeClue);

const lastResult = computed(() => store.lastResult);
const showResult = computed(() => {
  if (!lastResult.value) return false;
  return Date.now() - lastResult.value.at < 3000;
});

function onPick({ col, row }) {
  store.pickClue(col, row);
}
</script>

<template>
  <div class="game">
    <div class="top-bar">
      <span class="round-label">{{ roundLabel }}</span>
      <span class="room-code">Room {{ roomCode }}</span>
    </div>

    <div v-if="store.round < 3" class="turn-bar" :class="{ myturn: store.isMyTurn }">
      <template v-if="store.isMyTurn">
        Your turn — pick a clue!
      </template>
      <template v-else>
        {{ store.currentTurnName }}'s turn
      </template>
    </div>

    <!-- Result flash -->
    <transition name="flash">
      <div v-if="showResult && lastResult" class="result-flash" :class="lastResult.correct ? 'correct' : 'wrong'">
        <template v-if="lastResult.timeout">
          Time's up! Answer: <strong>{{ lastResult.correctAnswer }}</strong>
        </template>
        <template v-else-if="lastResult.correct">
          {{ lastResult.playerName }} got it!
          <strong>+${{ lastResult.value }}</strong>
          <template v-if="lastResult.dailyDouble"> (Daily Double)</template>
        </template>
        <template v-else>
          {{ lastResult.playerName }} was wrong.
          <strong>-${{ lastResult.value }}</strong>
          <span class="correct-ans">Answer: {{ lastResult.correctAnswer }}</span>
        </template>
      </div>
    </transition>

    <!-- Board rounds 1 & 2 -->
    <div v-if="store.round < 3 && store.board.length" class="board-area">
      <JeopardyBoard :board="store.board" :can-pick="canPick" @pick="onPick" />
    </div>

    <!-- Final Jeopardy -->
    <FinalJeopardy v-if="store.round === 3" />

    <div v-if="!store.board.length && store.round < 3" class="loading">Setting up the board…</div>

    <Scoreboard
      :players="store.players"
      :host-id="store.room && store.room.hostId"
      :self-id="store.playerId"
      :buzzed-id="store.buzzedPlayerId"
      :current-turn-id="store.currentTurnId"
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
  padding: 0.6rem 1.2rem;
  background: var(--jeopardy-bg-2);
  border-bottom: 2px solid var(--jeopardy-gold);
}

.round-label {
  color: var(--jeopardy-gold);
  font-weight: bold;
  font-family: var(--serif);
  font-size: 1.15rem;
  letter-spacing: 0.05em;
}

.room-code {
  color: #c9d4ff;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
}

.turn-bar {
  text-align: center;
  padding: 0.5rem 1rem;
  font-size: 1.05rem;
  color: #c9d4ff;
  background: rgba(0, 0, 0, 0.3);
  font-style: italic;
}

.turn-bar.myturn {
  color: var(--jeopardy-gold);
  font-weight: bold;
  font-style: normal;
  background: rgba(255, 204, 0, 0.12);
}

.result-flash {
  text-align: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  animation: slideIn 0.3s ease;
}

.result-flash.correct {
  background: rgba(26, 138, 58, 0.6);
  color: #fff;
}

.result-flash.wrong {
  background: rgba(176, 38, 29, 0.6);
  color: #fff;
}

.correct-ans {
  margin-left: 0.8rem;
  opacity: 0.85;
  font-weight: normal;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.flash-enter-active { animation: slideIn 0.3s ease; }
.flash-leave-active { animation: slideIn 0.3s ease reverse; }

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
