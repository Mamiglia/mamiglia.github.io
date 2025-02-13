import { createRouter, createWebHashHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // Use hash mode
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bio',
      name: 'bio',
      component: () => import('../views/Bio.vue'),
    },
    {
      path: '/teachings',
      name: 'teachings',
      component: () => import('../views/Teachings.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects.vue'),
    }
  ],
})

export default router
