import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import AdminView from '@/views/AdminView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/admin', component: AdminView, meta: { requiresAdmin: true } }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Guard de navegação
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    const isAdmin = sessionStorage.getItem('admin') === 'true';
    if (!isAdmin) {
      alert('Acesso negado!');
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
