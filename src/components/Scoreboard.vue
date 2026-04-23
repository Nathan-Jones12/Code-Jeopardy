<script setup>
import PlayerBadge from './PlayerBadge.vue';

const props = defineProps({
  players: { type: Array, required: true },
  hostId: { type: String, default: '' },
  selfId: { type: String, default: '' },
  buzzedId: { type: String, default: '' },
  currentTurnId: { type: String, default: '' },
  teamsMode: { type: Boolean, default: false },
  teams: { type: Array, default: () => [] },
  currentTeamId: { type: String, default: '' }
});

function playerById(id) {
  return props.players.find(p => p.id === id);
}
</script>

<template>
  <div class="scoreboard" v-if="!teamsMode">
    <PlayerBadge
      v-for="p in players"
      :key="p.id"
      :name="p.name"
      :score="p.score"
      :is-host="p.id === hostId"
      :is-self="p.id === selfId"
      :is-buzzed="p.id === buzzedId"
      :is-turn="p.id === currentTurnId"
    />
  </div>

  <div class="scoreboard teams" v-else>
    <div
      v-for="t in teams"
      :key="t.id"
      class="team-col"
      :class="{ active: t.id === currentTeamId }"
      :style="{ borderColor: t.color }"
    >
      <div class="team-head">
        <span class="team-name" :style="{ color: t.color }">{{ t.name }}</span>
        <span class="team-score" :class="{ neg: (t.score || 0) < 0 }">
          ${{ t.score || 0 }}
        </span>
      </div>
      <div class="team-members">
        <span
          v-for="mid in t.memberIds"
          :key="mid"
          class="member"
          :class="{
            captain: t.captainId === mid,
            self: mid === selfId,
            buzzed: mid === buzzedId
          }"
        >
          {{ playerById(mid)?.name || '?' }}
          <span v-if="t.captainId === mid" class="cap">★</span>
        </span>
      </div>
    </div>
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

.scoreboard.teams {
  gap: 0.8rem;
}

.team-col {
  background: var(--jeopardy-blue);
  border: 3px solid #666;
  border-radius: 6px;
  padding: 0.5rem 0.8rem;
  min-width: 180px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.team-col.active {
  box-shadow: 0 0 16px rgba(76, 255, 124, 0.6);
  transform: translateY(-2px);
}

.team-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.6rem;
  border-bottom: 1px solid rgba(255, 204, 0, 0.3);
  padding-bottom: 0.2rem;
  margin-bottom: 0.3rem;
}

.team-name {
  font-family: var(--serif);
  font-weight: bold;
  font-size: 1.1rem;
}

.team-score {
  font-family: var(--serif);
  font-weight: bold;
  color: var(--jeopardy-gold);
  font-size: 1.2rem;
}
.team-score.neg { color: #ff7070; }

.team-members {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.member {
  color: #c9d4ff;
  font-size: 0.85rem;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.06);
}

.member.self {
  color: #fff;
  background: rgba(255, 204, 0, 0.18);
}

.member.captain {
  color: var(--jeopardy-gold);
  font-weight: bold;
}

.member.buzzed {
  background: rgba(255, 204, 0, 0.4);
  color: #000;
}

.cap {
  margin-left: 0.15rem;
}
</style>
