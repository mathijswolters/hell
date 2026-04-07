import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('../views/HomeView.vue')
    // },
    {
      path: '/jackpot',
      name: 'jackpot',
      component: () => import('../views/jackpot/Lobby_Page.vue')
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: () => import('../views/Leaderboard_Page.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Testing_page.vue')
    },
    {
      path: '/',
      name: 'Coinflip_Lobby',
      component: () => import('../views/coinflip/Lobby_Page.vue')
    },
    {
      path: '/coinflipbracket',
      name: 'Coinflip_Bracket',
      component: () => import('../views/BracketCoinflip.vue')
    }
  ],
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: 'smooth'
    }
  }
})

export default router
