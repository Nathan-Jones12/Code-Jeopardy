<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore.js';

const router = useRouter();
const store = useGameStore();

const mode = ref('menu');
const name = ref(store.playerName || '');
const code = ref('');
const error = ref('');
const busy = ref(false);

async function onCreate() {
  error.value = '';
  if (!name.value.trim()) { error.value = 'Enter your name first.'; return; }
  busy.value = true;
  try {
    const c = await store.createRoom(name.value.trim());
    router.push({ name: 'lobby', params: { roomCode: c } });
  } catch (e) {
    error.value = e.message || 'Could not create room.';
  } finally {
    busy.value = false;
  }
}

async function onJoin() {
  error.value = '';
  if (!name.value.trim()) { error.value = 'Enter your name first.'; return; }
  if (!/^[A-Za-z]{4}$/.test(code.value.trim())) {
    error.value = 'Room code must be 4 letters.';
    return;
  }
  busy.value = true;
  try {
    const c = code.value.trim().toUpperCase();
    await store.joinRoom(c, name.value.trim());
    router.push({ name: 'lobby', params: { roomCode: c } });
  } catch (e) {
    error.value = e.message || 'Could not join room.';
  } finally {
    busy.value = false;
  }
}
</script>

<template>
  <div class="home">
    <h1 class="title">JEOPARDY!</h1>
    <p class="subtitle">Computer Science Edition — 200 terms</p>

    <div class="card">
      <template v-if="mode === 'menu'">
        <button class="big-btn" @click="mode = 'create'">Create Room</button>
        <button class="big-btn" @click="mode = 'join'">Join Room</button>
      </template>

      <template v-if="mode === 'create'">
        <label>
          Your name
          <input v-model="name" maxlength="20" placeholder="e.g. Alex" @keyup.enter="onCreate" />
        </label>
        <button class="big-btn" :disabled="busy" @click="onCreate">Create Room</button>
        <button class="link" @click="mode = 'menu'">← back</button>
      </template>

      <template v-if="mode === 'join'">
        <label>
          Your name
          <input v-model="name" maxlength="20" placeholder="e.g. Jordan" />
        </label>
        <label>
          Room code
          <input
            v-model="code"
            maxlength="4"
            placeholder="ABCD"
            style="text-transform: uppercase; letter-spacing: 0.3em;"
            @keyup.enter="onJoin"
          />
        </label>
        <button class="big-btn" :disabled="busy" @click="onJoin">Join Room</button>
        <button class="link" @click="mode = 'menu'">← back</button>
      </template>

      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: radial-gradient(ellipse at top, #10216e 0%, var(--jeopardy-bg) 70%);
}

.title {
  font-family: var(--serif);
  font-size: 5rem;
  color: var(--jeopardy-gold);
  letter-spacing: 0.08em;
  margin: 0 0 0.2em;
  text-shadow: 3px 3px 0 #000, 0 0 30px rgba(255, 204, 0, 0.3);
  font-weight: bold;
}

.subtitle {
  color: #c9d4ff;
  margin: 0 0 2rem;
  font-size: 1.25rem;
  font-style: italic;
}

.card {
  background: var(--jeopardy-blue);
  border: 3px solid var(--jeopardy-gold);
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 320px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 10px 40px var(--jeopardy-shadow);
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
  font-size: 0.95rem;
  color: var(--jeopardy-gold);
  font-weight: bold;
}

input {
  padding: 0.7rem 0.9rem;
  border-radius: 4px;
  border: 2px solid #000;
  font-size: 1.1rem;
  background: #fff;
  color: #000;
  outline: none;
}

input:focus {
  border-color: var(--jeopardy-gold);
}

.big-btn {
  background: var(--jeopardy-gold);
  color: #000;
  border: none;
  padding: 0.9rem 1.2rem;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: var(--serif);
  border-radius: 4px;
  letter-spacing: 0.04em;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.big-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.big-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.link {
  background: transparent;
  border: none;
  color: #c9d4ff;
  text-decoration: underline;
  font-size: 0.95rem;
  padding: 0.3rem;
}

.error {
  color: #ffbaba;
  background: rgba(120, 0, 0, 0.4);
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .title { font-size: 3.5rem; }
}
</style>
