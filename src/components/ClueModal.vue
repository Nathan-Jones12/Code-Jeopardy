<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { useGameStore } from '../stores/gameStore.js';

const store = useGameStore();
const answer = ref('');
const secondsLeft = ref(15);
let timerInterval = null;

const clue = computed(() => store.activeClue);
const phase = computed(() => clue.value?.phase || 'open');
const buzzedId = computed(() => store.buzzedPlayerId);
const iBuzzedIn = computed(() => buzzedId.value === store.playerId);
const failed = computed(() => store.failedPlayers);
const iAlreadyFailed = computed(() => failed.value.includes(store.playerId));
const canBuzz = computed(() =>
  phase.value === 'open' && !buzzedId.value && !iAlreadyFailed.value
);

const buzzedName = computed(() => {
  const id = buzzedId.value;
  if (!id) return '';
  const p = store.players.find(pl => pl.id === id);
  return p ? p.name : '';
});

const categoryName = computed(() => {
  if (!clue.value) return '';
  const col = store.board[clue.value.col];
  return col?.label || col?.category || '';
});

const promptText = computed(() => {
  if (!clue.value) return '';
  return clue.value.variant === 'scenarios'
    ? (clue.value.scenario || clue.value.definition)
    : clue.value.definition;
});

const clueValue = computed(() => {
  if (!clue.value) return 0;
  if (clue.value.dailyDouble && clue.value.wager) return clue.value.wager;
  return clue.value.value;
});

const isMyTurn = computed(() => store.isMyTurn);

// Daily Double wager
const wager = ref(200);
const myScore = computed(() => {
  if (store.teamsMode) {
    return store.myTeam?.score || 0;
  }
  const p = store.room?.players?.[store.playerId];
  return p ? p.score : 0;
});
const maxWager = computed(() => {
  const roundMax = store.round === 1 ? 1000 : 2000;
  return Math.max(roundMax, myScore.value);
});

// Timer
function startTimer(durationSeconds) {
  stopTimer();
  const openedAt = clue.value?.openedAt || Date.now();
  const elapsed = (Date.now() - openedAt) / 1000;
  secondsLeft.value = Math.max(0, Math.ceil(durationSeconds - elapsed));

  timerInterval = setInterval(() => {
    const now = Date.now();
    const e = (now - openedAt) / 1000;
    secondsLeft.value = Math.max(0, Math.ceil(durationSeconds - e));

    if (secondsLeft.value <= 0) {
      stopTimer();
      handleTimeout();
    }
  }, 250);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function handleTimeout() {
  // Any connected client can trigger timeout — first write wins
  if (store.activeClue) {
    store.timeoutClue();
  }
}

// Start/restart timer on phase changes
watch(
  () => [clue.value?.phase, clue.value?.openedAt],
  () => {
    answer.value = '';
    if (!clue.value) { stopTimer(); return; }
    if (clue.value.phase === 'open') startTimer(15);
    else if (clue.value.phase === 'dd_answer') startTimer(15);
    else stopTimer();
  },
  { immediate: true }
);

onUnmounted(() => stopTimer());

// Actions
function buzz() { store.buzzIn(); }

function submitAnswer() {
  const t = answer.value.trim();
  if (!t) return;
  store.submitAnswer(t);
}

function handleDDReveal() {
  store.startDailyDoubleWager();
}

function submitWager() {
  const w = Math.min(Math.max(5, wager.value), maxWager.value);
  store.submitDailyDoubleWager(w);
}

function submitDDAnswer() {
  const t = answer.value.trim();
  if (!t) return;
  store.submitDailyDoubleAnswer(t);
}
</script>

<template>
  <div v-if="clue" class="overlay">
    <div class="modal" :class="{ 'dd-modal': clue.dailyDouble }">

      <!-- DAILY DOUBLE REVEAL -->
      <template v-if="phase === 'dd_reveal'">
        <div class="dd-splash">
          <h1>DAILY DOUBLE!</h1>
          <p v-if="isMyTurn">It's your pick — you answer alone.</p>
          <p v-else>{{ store.currentTurnName }} found a Daily Double!</p>
          <button v-if="isMyTurn" class="gold-btn" @click="handleDDReveal">
            Set Wager
          </button>
        </div>
      </template>

      <!-- DAILY DOUBLE WAGER -->
      <template v-else-if="phase === 'dd_wager'">
        <div class="ribbon">
          <span class="cat">{{ categoryName }} — DAILY DOUBLE</span>
          <span class="value">${{ clueValue }}</span>
        </div>
        <div v-if="isMyTurn" class="dd-wager-panel">
          <p>Your score: <strong>${{ myScore }}</strong></p>
          <p>Wager up to <strong>${{ maxWager }}</strong></p>
          <div class="wager-row">
            <input
              v-model.number="wager"
              type="number"
              :min="5"
              :max="maxWager"
              @keyup.enter="submitWager"
            />
            <button class="gold-btn" @click="submitWager">Lock Wager</button>
          </div>
        </div>
        <p v-else class="waiting">{{ store.currentTurnName }} is setting their wager…</p>
      </template>

      <!-- DAILY DOUBLE ANSWER -->
      <template v-else-if="phase === 'dd_answer'">
        <div class="ribbon">
          <span class="cat">{{ categoryName }} — DAILY DOUBLE</span>
          <span class="value">${{ clueValue }}</span>
        </div>
        <div class="timer-bar">
          <div class="timer-fill" :style="{ width: (secondsLeft / 15 * 100) + '%' }"></div>
          <span class="timer-text">{{ secondsLeft }}s</span>
        </div>
        <div class="clue-text">{{ promptText }}</div>
        <div v-if="isMyTurn" class="answer-row">
          <input
            v-model="answer"
            placeholder="Type your answer…"
            @keyup.enter="submitDDAnswer"
            :disabled="store.isChecking"
            autofocus
          />
          <button class="submit-btn" :disabled="store.isChecking" @click="submitDDAnswer">
            {{ store.isChecking ? 'Checking…' : 'Submit' }}
          </button>
        </div>
        <p v-else class="waiting">{{ store.currentTurnName }} is answering…</p>
      </template>

      <!-- REGULAR CLUE -->
      <template v-else-if="phase === 'open'">
        <div class="ribbon">
          <span class="cat">{{ categoryName }}</span>
          <span class="value">${{ clue.value }}</span>
        </div>
        <div class="timer-bar">
          <div
            class="timer-fill"
            :class="{ danger: secondsLeft <= 5 }"
            :style="{ width: (secondsLeft / 15 * 100) + '%' }"
          ></div>
          <span class="timer-text">{{ secondsLeft }}s</span>
        </div>
        <div class="clue-text">{{ promptText }}</div>

        <div class="interact">
          <!-- Nobody buzzed yet -->
          <template v-if="!buzzedId">
            <button
              v-if="canBuzz"
              class="buzz-btn"
              @click="buzz"
            >BUZZ IN</button>
            <p v-else-if="iAlreadyFailed" class="hint">
              You already answered wrong. Wait for others.
            </p>
            <p v-else class="hint">Waiting for a player to buzz…</p>
          </template>

          <!-- Someone buzzed -->
          <template v-else>
            <p class="buzzed">
              <strong>{{ buzzedName }}</strong> buzzed in!
            </p>
            <div v-if="iBuzzedIn" class="answer-row">
              <input
                v-model="answer"
                placeholder="Type your answer…"
                @keyup.enter="submitAnswer"
                :disabled="store.isChecking"
                autofocus
              />
              <button class="submit-btn" :disabled="store.isChecking" @click="submitAnswer">
                {{ store.isChecking ? 'Checking…' : 'Submit' }}
              </button>
            </div>
            <p v-else-if="store.isChecking" class="hint">Checking answer…</p>
            <p v-else class="hint">Waiting for answer…</p>
          </template>
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
  animation: fadein 0.2s ease;
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  background: var(--jeopardy-blue);
  border: 4px solid var(--jeopardy-gold);
  border-radius: 8px;
  max-width: 820px;
  width: 100%;
  padding: 1.2rem 1.5rem 1.5rem;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.8);
  animation: popin 0.25s cubic-bezier(0.2, 0.9, 0.3, 1.3);
}

.dd-modal {
  border-color: #ff4444;
  box-shadow: 0 0 60px rgba(255, 68, 68, 0.5);
}

@keyframes popin {
  from { transform: scale(0.7) rotateX(-15deg); opacity: 0; }
  to { transform: scale(1) rotateX(0); opacity: 1; }
}

.ribbon {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--jeopardy-gold);
  padding-bottom: 0.6rem;
  margin-bottom: 0.8rem;
}

.cat {
  color: var(--jeopardy-gold);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.value {
  color: var(--jeopardy-gold);
  font-family: var(--serif);
  font-size: 1.5rem;
  font-weight: bold;
}

/* Timer */
.timer-bar {
  position: relative;
  height: 28px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.timer-fill {
  height: 100%;
  background: var(--jeopardy-gold);
  transition: width 0.25s linear;
  border-radius: 4px;
}

.timer-fill.danger {
  background: #ff4444;
}

.timer-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
}

.clue-text {
  color: #fff;
  font-family: var(--serif);
  font-size: 2rem;
  line-height: 1.3;
  text-align: center;
  padding: 1.5rem 0.5rem 2rem;
  min-height: 120px;
  text-shadow: 2px 2px 0 #000;
}

.interact {
  text-align: center;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
}

.buzz-btn {
  background: #d10000;
  color: #fff;
  border: 3px solid var(--jeopardy-gold);
  padding: 1rem 3rem;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  border-radius: 50px;
  font-family: var(--serif);
  text-shadow: 2px 2px 0 #000;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.buzz-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(255, 204, 0, 0.6);
}

.buzz-btn:active { transform: scale(0.95); }

.hint {
  margin: 0;
  color: #c9d4ff;
  font-style: italic;
}

.waiting {
  margin: 1rem 0;
  color: #b9c7ff;
  font-style: italic;
  text-align: center;
}

.buzzed {
  margin: 0;
  color: var(--jeopardy-gold);
  font-size: 1.3rem;
}

.answer-row {
  display: flex;
  gap: 0.6rem;
  width: 100%;
  max-width: 500px;
}

.answer-row input {
  flex: 1;
  padding: 0.7rem 0.9rem;
  border: 2px solid #000;
  border-radius: 4px;
  font-size: 1.1rem;
  background: #fff;
  color: #000;
  outline: none;
}

.submit-btn {
  background: var(--jeopardy-gold);
  color: #000;
  border: none;
  padding: 0 1.4rem;
  font-weight: bold;
  font-family: var(--serif);
  font-size: 1rem;
  border-radius: 4px;
}

/* Daily Double Splash */
.dd-splash {
  text-align: center;
  padding: 3rem 1rem;
}

.dd-splash h1 {
  font-family: var(--serif);
  font-size: 3.5rem;
  color: var(--jeopardy-gold);
  text-shadow: 3px 3px 0 #000, 0 0 40px rgba(255, 68, 68, 0.7);
  margin: 0 0 1rem;
  animation: ddpulse 0.8s ease infinite alternate;
}

@keyframes ddpulse {
  from { text-shadow: 3px 3px 0 #000, 0 0 20px rgba(255, 68, 68, 0.5); }
  to   { text-shadow: 3px 3px 0 #000, 0 0 50px rgba(255, 68, 68, 1); }
}

.dd-splash p {
  color: #fff;
  font-size: 1.1rem;
  margin: 0 0 1.5rem;
}

.gold-btn {
  background: var(--jeopardy-gold);
  color: #000;
  border: none;
  padding: 0.8rem 1.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: var(--serif);
  border-radius: 4px;
}

.gold-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.dd-wager-panel {
  text-align: center;
  padding: 1.5rem 0;
}

.dd-wager-panel p {
  margin: 0 0 0.7rem;
  color: #fff;
}

.wager-row {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 0.5rem;
}

.wager-row input {
  width: 120px;
  padding: 0.6rem 0.8rem;
  border: 2px solid #000;
  border-radius: 4px;
  font-size: 1.1rem;
  background: #fff;
  color: #000;
  text-align: center;
}

@media (max-width: 900px) {
  .clue-text { font-size: 1.3rem; padding: 1rem 0.3rem 1.5rem; }
  .buzz-btn { font-size: 1.2rem; padding: 0.8rem 1.8rem; }
  .dd-splash h1 { font-size: 2.5rem; }
}
</style>
