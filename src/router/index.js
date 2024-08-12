import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import AdminView from '@/views/AdminView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/admin', component: AdminView }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;