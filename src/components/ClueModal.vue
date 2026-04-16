<script setup>
import { computed, ref, watch } from 'vue';
import { useGameStore } from '../stores/gameStore.js';

const store = useGameStore();
const answer = ref('');

const clue = computed(() => store.activeClue);
const buzzedId = computed(() => store.buzzedPlayerId);
const buzzedName = computed(() => {
  const id = buzzedId.value;
  if (!id) return '';
  const p = store.players.find(pl => pl.id === id);
  return p ? p.name : '';
});
const iBuzzedIn = computed(() => buzzedId.value === store.playerId);

const categoryName = computed(() => {
  if (!clue.value) return '';
  return store.board[clue.value.col]?.category || '';
});

function buzz() {
  store.buzzIn();
}

function submitAnswer() {
  const t = answer.value.trim();
  if (!t) return;
  store.submitAnswer(t);
}

function markCorrect() {
  store.resolveClue(true);
}
function markWrong() {
  store.resolveClue(false);
}
function skipClue() {
  store.closeClueUnanswered();
}

watch(clue, () => {
  answer.value = '';
});
</script>

<template>
  <div v-if="clue" class="overlay">
    <div class="modal">
      <div class="ribbon">
        <span class="cat">{{ categoryName }}</span>
        <span class="value">${{ clue.value }}</span>
      </div>

      <div class="clue-text">
        {{ clue.definition }}
      </div>

      <div class="interact">
        <!-- Nobody buzzed yet -->
        <template v-if="!buzzedId">
          <button class="buzz-btn" @click="buzz">BUZZ IN</button>
          <p class="hint">First to buzz gets to answer.</p>
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
              autofocus
            />
            <button class="submit-btn" @click="submitAnswer">Submit</button>
          </div>
          <p v-else-if="store.room && store.room.answerText" class="their-answer">
            Their answer: <em>{{ store.room.answerText }}</em>
          </p>
          <p v-else class="hint">Waiting for answer…</p>
        </template>
      </div>

      <div v-if="store.isHost" class="host-controls">
        <span class="host-label">HOST:</span>
        <button class="correct" :disabled="!buzzedId" @click="markCorrect">Mark Correct (+${{ clue.value }})</button>
        <button class="wrong" :disabled="!buzzedId" @click="markWrong">Mark Incorrect (-${{ clue.value }})</button>
        <button class="skip" @click="skipClue">Skip / No one got it</button>
        <p class="answer-reveal">Answer: <strong>{{ clue.term }}</strong></p>
      </div>
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

@keyframes popin {
  from { transform: scale(0.7) rotateX(-15deg); opacity: 0; }
  to { transform: scale(1) rotateX(0); opacity: 1; }
}

.ribbon {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid var(--jeopardy-gold);
  padding-bottom: 0.6rem;
  margin-bottom: 1.2rem;
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
  min-height: 120px;
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

.their-answer {
  color: #fff;
  margin: 0;
  font-size: 1.2rem;
}

.host-controls {
  border-top: 2px solid rgba(255, 204, 0, 0.35);
  margin-top: 1rem;
  padding-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.host-label {
  color: var(--jeopardy-gold);
  font-weight: bold;
  letter-spacing: 0.1em;
  font-size: 0.85rem;
  margin-right: 0.3rem;
}

.host-controls button {
  padding: 0.5rem 0.9rem;
  border: 2px solid #000;
  border-radius: 4px;
  font-weight: bold;
  font-family: var(--serif);
  font-size: 0.9rem;
}

.correct {
  background: #1a8a3a;
  color: #fff;
}
.wrong {
  background: #b0261d;
  color: #fff;
}
.skip {
  background: #555;
  color: #fff;
}
.host-controls button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.answer-reveal {
  flex-basis: 100%;
  margin: 0.3rem 0 0;
  color: var(--jeopardy-gold);
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .clue-text { font-size: 1.3rem; padding: 1rem 0.3rem 1.5rem; }
  .buzz-btn { font-size: 1.2rem; padding: 0.8rem 1.8rem; }
}
</style>
