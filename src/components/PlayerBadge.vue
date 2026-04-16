<script setup>
defineProps({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
  isHost: { type: Boolean, default: false },
  isSelf: { type: Boolean, default: false },
  isBuzzed: { type: Boolean, default: false }
});
</script>

<template>
  <div class="badge" :class="{ self: isSelf, buzzed: isBuzzed }">
    <span class="name">
      {{ name }}
      <span v-if="isHost" class="tag">HOST</span>
      <span v-if="isSelf" class="tag you">YOU</span>
    </span>
    <span class="score" :class="{ neg: score < 0 }">${{ score }}</span>
  </div>
</template>

<style scoped>
.badge {
  background: var(--jeopardy-blue);
  border: 2px solid #000;
  border-radius: 6px;
  padding: 0.5rem 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  min-width: 130px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.badge.self {
  border-color: var(--jeopardy-gold);
}

.badge.buzzed {
  border-color: #ffcc00;
  box-shadow: 0 0 18px rgba(255, 204, 0, 0.8);
  animation: pulse 0.7s ease infinite alternate;
}

@keyframes pulse {
  from { box-shadow: 0 0 10px rgba(255, 204, 0, 0.5); }
  to   { box-shadow: 0 0 24px rgba(255, 204, 0, 1); }
}

.name {
  color: #fff;
  font-family: var(--serif);
  font-weight: bold;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  background: var(--jeopardy-gold);
  color: #000;
  font-size: 0.6rem;
  padding: 0.1rem 0.35rem;
  border-radius: 2px;
  letter-spacing: 0.08em;
}

.tag.you {
  background: #fff;
}

.score {
  color: var(--jeopardy-gold);
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow: 1px 1px 0 #000;
}

.score.neg {
  color: #ff7070;
}
</style>
