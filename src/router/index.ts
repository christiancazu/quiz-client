import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue')
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/ResultsView.vue')
    }
  ]
})

export default router
