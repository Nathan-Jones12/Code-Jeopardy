<script setup>
import { computed, ref, watch, onUnmounted } from 'vue';
import { useGameStore } from '../stores/gameStore.js';

const store = useGameStore();
const final = computed(() => store.finalState);
const phase = computed(() => final.value?.phase);
const secondsLeft = ref(30);
const wager = ref(0);
const answer = ref('');
const wagerLocked = ref(false);
const answerLocked = ref(false);

let timerInterval = null;

const teamsMode = computed(() => store.teamsMode);
const myTeam = computed(() => store.myTeam);
const isMyCaptain = computed(() => store.isMyCaptain);

const myScore = computed(() => {
  if (teamsMode.value) {
    return myTeam.value ? Math.max(0, myTeam.value.score || 0) : 0;
  }
  const p = store.room?.players?.[store.playerId];
  return p ? Math.max(0, p.score) : 0;
});

const canPlay = computed(() => {
  if (myScore.value <= 0) return false;
  if (teamsMode.value) return isMyCaptain.value;
  return true;
});

const promptText = computed(() => {
  if (!final.value) return '';
  return final.value.variant === 'scenarios'
    ? (final.value.scenario || final.value.definition)
    : final.value.definition;
});

const categoryLabel = computed(() => {
  if (!final.value) return '';
  return final.value.categoryLabel || final.value.category;
});

function startTimer(seconds) {
  stopTimer();
  const startedAt = final.value?.phaseStartedAt || Date.now();
  timerInterval = setInterval(() => {
    const elapsed = (Date.now() - startedAt) / 1000;
    secondsLeft.value = Math.max(0, Math.ceil(seconds - elapsed));

    if (secondsLeft.value <= 0) {
      stopTimer();
      handleTimerEnd();
    }
  }, 250);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function handleTimerEnd() {
  if (phase.value === 'wager' && !wagerLocked.value && canPlay.value) {
    submitWager();
  }
  if (phase.value === 'answer' && !answerLocked.value && canPlay.value) {
    submitAnswer();
  }
  if (store.isHost) {
    if (phase.value === 'wager') {
      setTimeout(() => store.advanceFinalPhase('answer'), 2000);
    } else if (phase.value === 'answer') {
      setTimeout(() => store.revealFinalResults(), 2000);
    }
  }
}

watch(phase, (p) => {
  if (p === 'category') {
    wagerLocked.value = false;
    answerLocked.value = false;
    wager.value = 0;
    answer.value = '';
    if (store.isHost) {
      setTimeout(() => {
        if (store.finalState?.phase === 'category') {
          store.advanceFinalPhase('wager');
        }
      }, 4000);
    }
  } else if (p === 'wager') {
    startTimer(30);
  } else if (p === 'answer') {
    startTimer(30);
  } else if (p === 'reveal') {
    stopTimer();
  }
}, { immediate: true });

onUnmounted(() => stopTimer());

function submitWager() {
  if (wagerLocked.value) return;
  const w = Math.min(Math.max(0, wager.value), myScore.value);
  store.submitFinalWager(w);
  wagerLocked.value = true;
}

function submitAnswer() {
  if (answerLocked.value) return;
  store.submitFinalAnswer(answer.value.trim() || '');
  answerLocked.value = true;
}

const results = computed(() => {
  if (!final.value?.results && !final.value?.teamResults) return [];
  if (teamsMode.value) {
    const tr = final.value.teamResults || {};
    return store.teams.map(t => ({
      id: t.id,
      name: t.name,
      color: t.color,
      finalScore: t.score || 0,
      ...(tr[t.id] || {})
    })).sort((a, b) => b.finalScore - a.finalScore);
  }
  return store.players.map(p => ({
    ...p,
    ...(final.value.results?.[p.id] || {}),
    finalScore: p.score
  })).sort((a, b) => b.finalScore - a.finalScore);
});

const waitingMsg = computed(() => {
  if (!teamsMode.value) return '';
  if (!myTeam.value) return 'No team assignment';
  if (isMyCaptain.value) return '';
  const capName = store.room?.players?.[myTeam.value.captainId]?.name || 'captain';
  return `Your captain (${capName}) is answering for ${myTeam.value.name}.`;
});
</script>

<template>
  <div class="final-wrap" v-if="final">
    <!-- CATEGORY REVEAL -->
    <template v-if="phase === 'category'">
      <div class="splash">
        <h1>FINAL JEOPARDY!</h1>
        <h2>The category is…</h2>
        <div class="final-cat">{{ categoryLabel }}</div>
      </div>
    </template>

    <!-- WAGER PHASE -->
    <template v-else-if="phase === 'wager'">
      <div class="panel">
        <h2>FINAL JEOPARDY</h2>
        <div class="final-cat">{{ categoryLabel }}</div>
        <div class="timer-bar">
          <div class="timer-fill" :class="{ danger: secondsLeft <= 10 }"
               :style="{ width: (secondsLeft / 30 * 100) + '%' }"></div>
          <span class="timer-text">{{ secondsLeft }}s to wager</span>
        </div>

        <div v-if="canPlay && !wagerLocked" class="wager-panel">
          <p v-if="teamsMode">Team: <strong :style="{ color: myTeam?.color }">{{ myTeam?.name }}</strong></p>
          <p>{{ teamsMode ? 'Team score' : 'Your score' }}: <strong>${{ myScore }}</strong></p>
          <p>Wager up to your full score:</p>
          <div class="wager-row">
            <input
              v-model.number="wager"
              type="number"
              :min="0"
              :max="myScore"
              @keyup.enter="submitWager"
            />
            <button class="gold-btn" @click="submitWager">Lock Wager</button>
          </div>
        </div>
        <p v-else-if="wagerLocked" class="locked">Wager locked! Waiting for others…</p>
        <p v-else-if="teamsMode && !isMyCaptain" class="locked">{{ waitingMsg }}</p>
        <p v-else class="locked">You have $0 or less — you cannot wager in Final Jeopardy.</p>
      </div>
    </template>

    <!-- ANSWER PHASE -->
    <template v-else-if="phase === 'answer'">
      <div class="panel">
        <h2>FINAL JEOPARDY — {{ categoryLabel }}</h2>
        <div class="timer-bar">
          <div class="timer-fill" :class="{ danger: secondsLeft <= 10 }"
               :style="{ width: (secondsLeft / 30 * 100) + '%' }"></div>
          <span class="timer-text">{{ secondsLeft }}s</span>
        </div>
        <div class="clue-text">{{ promptText }}</div>

        <div v-if="canPlay && !answerLocked" class="answer-row">
          <input
            v-model="answer"
            placeholder="Type your answer…"
            @keyup.enter="submitAnswer"
            autofocus
          />
          <button class="gold-btn" @click="submitAnswer">Lock Answer</button>
        </div>
        <p v-else-if="answerLocked" class="locked">Answer locked! Waiting for others…</p>
        <p v-else-if="teamsMode && !isMyCaptain" class="locked">{{ waitingMsg }}</p>
        <p v-else class="locked">You are not participating in Final Jeopardy.</p>
      </div>
    </template>

    <!-- REVEAL PHASE -->
    <template v-else-if="phase === 'reveal'">
      <div class="panel reveal">
        <h2>FINAL JEOPARDY — RESULTS</h2>
        <div class="results-list">
          <div
            v-for="(r, i) in results"
            :key="r.id"
            class="result-row"
            :class="{ winner: i === 0, correct: r.correct, wrong: !r.correct }"
          >
            <span class="rank">{{ i + 1 }}.</span>
            <span class="name" :style="teamsMode ? { color: r.color } : null">{{ r.name }}</span>
            <span class="r-answer">{{ r.answer || '(no answer)' }}</span>
            <span class="r-verdict">{{ r.correct ? 'Correct' : 'Wrong' }}</span>
            <span class="r-delta">{{ r.delta >= 0 ? '+' : '-' }}${{ Math.abs(r.delta || 0) }}</span>
            <span class="r-final">${{ r.finalScore }}</span>
          </div>
        </div>
        <p class="correct-answer">Correct answer: <strong>{{ final.term }}</strong></p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.final-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.splash { text-align: center; animation: fadein 0.5s ease; }

.splash h1 {
  font-family: var(--serif);
  font-size: 4rem;
  color: var(--jeopardy-gold);
  text-shadow: 3px 3px 0 #000, 0 0 40px rgba(255, 204, 0, 0.4);
  margin: 0 0 0.5rem;
}

.splash h2 {
  color: #c9d4ff;
  font-weight: normal;
  font-style: italic;
  margin: 0 0 1.5rem;
}

.final-cat {
  background: var(--jeopardy-blue);
  border: 3px solid var(--jeopardy-gold);
  border-radius: 8px;
  padding: 1.5rem 2.5rem;
  font-family: var(--serif);
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: inline-block;
  text-shadow: 2px 2px 0 #000;
  margin-bottom: 1.5rem;
}

.panel {
  background: var(--jeopardy-blue);
  border: 4px solid var(--jeopardy-gold);
  border-radius: 8px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.8);
  text-align: center;
}

.panel h2 {
  color: var(--jeopardy-gold);
  font-family: var(--serif);
  margin: 0 0 1rem;
}

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

.timer-fill.danger { background: #ff4444; }

.timer-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: bold;
  font-size: 0.9rem;
}

.clue-text {
  color: #fff;
  font-family: var(--serif);
  font-size: 2rem;
  line-height: 1.3;
  padding: 1.5rem 0.5rem 2rem;
  text-shadow: 2px 2px 0 #000;
}

.wager-panel p { color: #fff; margin: 0.3rem 0; }

.wager-row {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 0.7rem;
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

.answer-row {
  display: flex;
  gap: 0.6rem;
  max-width: 500px;
  margin: 0 auto;
}

.answer-row input {
  flex: 1;
  padding: 0.7rem 0.9rem;
  border: 2px solid #000;
  border-radius: 4px;
  font-size: 1.1rem;
  background: #fff;
  color: #000;
}

.gold-btn {
  background: var(--jeopardy-gold);
  color: #000;
  border: none;
  padding: 0.8rem 1.5rem;
  font-weight: bold;
  font-family: var(--serif);
  font-size: 1rem;
  border-radius: 4px;
}

.gold-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.locked {
  color: var(--jeopardy-gold);
  font-style: italic;
  margin: 1rem 0;
}

.results-list { margin: 1rem 0; }

.result-row {
  display: grid;
  grid-template-columns: 30px 1fr 1.5fr auto auto auto;
  gap: 0.6rem;
  align-items: center;
  padding: 0.7rem 0.8rem;
  border-bottom: 1px solid rgba(255, 204, 0, 0.25);
  text-align: left;
}

.result-row.winner {
  background: rgba(255, 204, 0, 0.15);
  border-radius: 4px;
}

.rank { color: #999; }
.name { color: #fff; font-weight: bold; }

.r-answer {
  color: #c9d4ff;
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.r-verdict {
  font-weight: bold;
  padding: 0.15rem 0.5rem;
  border-radius: 3px;
  font-size: 0.85rem;
}

.correct .r-verdict { color: #4cff7c; }
.wrong .r-verdict { color: #ff7070; }

.r-delta {
  font-family: var(--serif);
  font-weight: bold;
  color: var(--jeopardy-gold);
}

.r-final {
  font-family: var(--serif);
  font-weight: bold;
  color: #fff;
  font-size: 1.1rem;
}

.correct-answer {
  color: var(--jeopardy-gold);
  margin: 1rem 0 0;
}

@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 900px) {
  .splash h1 { font-size: 2.5rem; }
  .final-cat { font-size: 1.3rem; }
  .clue-text { font-size: 1.3rem; }
  .result-row {
    grid-template-columns: 25px 1fr auto auto;
    font-size: 0.9rem;
  }
  .r-answer { display: none; }
}
</style>
