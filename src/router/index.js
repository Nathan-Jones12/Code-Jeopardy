import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LobbyView from '../views/LobbyView.vue';
import GameView from '../views/GameView.vue';
import GameOverView from '../views/GameOverView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/lobby/:roomCode', name: 'lobby', component: LobbyView, props: true },
  { path: '/game/:roomCode', name: 'game', component: GameView, props: true },
  { path: '/gameover/:roomCode', name: 'gameover', component: GameOverView, props: true }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
