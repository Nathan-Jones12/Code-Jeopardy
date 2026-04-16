<script setup>
import CategoryColumn from './CategoryColumn.vue';

defineProps({
  board: { type: Array, required: true },
  canPick: { type: Boolean, default: false }
});

const emit = defineEmits(['pick']);

function onTile(col, row) {
  emit('pick', { col, row });
}
</script>

<template>
  <div class="board">
    <CategoryColumn
      v-for="(col, ci) in board"
      :key="ci"
      :column="col"
      :col-index="ci"
      :can-pick="canPick"
      @tile="(row) => onTile(ci, row)"
    />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 6px;
  width: 100%;
  max-width: 1400px;
  padding-bottom: 1rem;
}

@media (max-width: 900px) {
  .board {
    gap: 3px;
  }
}
</style>
