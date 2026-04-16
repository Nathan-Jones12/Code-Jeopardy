<script setup>
defineProps({
  value: { type: Number, required: true },
  played: { type: Boolean, default: false },
  canPick: { type: Boolean, default: false }
});
</script>

<template>
  <button
    class="tile"
    :class="{ played, 'can-pick': canPick && !played }"
    :disabled="played || !canPick"
  >
    <span v-if="!played">${{ value }}</span>
    <span v-else class="empty"></span>
  </button>
</template>

<style scoped>
.tile {
  background: var(--jeopardy-blue);
  color: var(--jeopardy-gold);
  border: 2px solid #000;
  font-family: var(--serif);
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 0 #000;
  aspect-ratio: 5 / 3;
  cursor: not-allowed;
  transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
}

.tile.can-pick {
  cursor: pointer;
}

.tile.can-pick:hover {
  transform: scale(1.04);
  box-shadow: 0 0 22px rgba(255, 204, 0, 0.55);
  z-index: 2;
}

.tile.can-pick:active {
  transform: scale(0.96);
}

.tile.played {
  background: #000;
  color: transparent;
  border-color: #111;
  text-shadow: none;
  cursor: default;
}

.empty {
  display: inline-block;
  width: 100%;
  height: 100%;
}

@media (max-width: 900px) {
  .tile {
    font-size: 1.1rem;
    aspect-ratio: 5 / 3;
  }
}
</style>
