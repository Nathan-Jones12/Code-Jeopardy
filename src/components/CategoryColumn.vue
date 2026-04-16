<script setup>
import ClueTile from './ClueTile.vue';

defineProps({
  column: { type: Object, required: true },
  colIndex: { type: Number, required: true },
  canPick: { type: Boolean, default: false }
});

const emit = defineEmits(['tile']);
</script>

<template>
  <div class="col">
    <div class="header">{{ column.category }}</div>
    <ClueTile
      v-for="(clue, ri) in column.clues"
      :key="ri"
      :value="clue.value"
      :played="clue.played"
      :can-pick="canPick"
      @click="$emit('tile', ri)"
    />
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.header {
  background: var(--jeopardy-blue);
  color: #fff;
  padding: 0.8rem 0.4rem;
  text-align: center;
  font-family: var(--serif);
  font-weight: bold;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: 2px solid #000;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.15;
}

@media (max-width: 900px) {
  .col { gap: 3px; }
  .header {
    font-size: 0.7rem;
    padding: 0.4rem 0.2rem;
    min-height: 54px;
  }
}
</style>
