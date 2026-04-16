<script setup>
import PlayerBadge from './PlayerBadge.vue';

defineProps({
  players: { type: Array, required: true },
  hostId: { type: String, default: '' },
  selfId: { type: String, default: '' },
  buzzedId: { type: String, default: '' }
});
</script>

<template>
  <div class="scoreboard">
    <PlayerBadge
      v-for="p in players"
      :key="p.id"
      :name="p.name"
      :score="p.score"
      :is-host="p.id === hostId"
      :is-self="p.id === selfId"
      :is-buzzed="p.id === buzzedId"
    />
  </div>
</template>

<style scoped>
.scoreboard {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  background: var(--jeopardy-bg-2);
  border-top: 2px solid var(--jeopardy-gold);
  justify-content: center;
}
</style>
