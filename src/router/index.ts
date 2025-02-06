import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bio',
      name: 'bio',
      component: () => import('../components/Bio.vue'),
    },
    {
      path: '/teachings',
      name: 'teachings',
      component: () => import('../components/Teachings.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../components/Projects.vue'),
    }
  ],
})

export default router
