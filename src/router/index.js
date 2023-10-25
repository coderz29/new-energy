import { createRouter, createWebHistory } from 'vue-router'
import PowerView from '../views/power-view.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'power',
      component: () => import('../views/power-view.vue')
    }
  ]
})

export default router
