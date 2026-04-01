import { createRouter, createWebHistory } from 'vue-router'
import { tryCompleteOAuthFromSearch } from '@/auth/oauthComplete'

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
      path: '/login',
      redirect: '/'
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

router.beforeEach(async (to) => {
  if (typeof window === 'undefined') return true
  const search = to.fullPath.includes('?') ? to.fullPath.slice(to.fullPath.indexOf('?')) : ''
  const oauthNav = await tryCompleteOAuthFromSearch(search)
  if (oauthNav) {
    // Sync Vue Router with a clean "/" (history.replaceState alone can leave the router out of sync).
    return router.replace({ path: '/', query: {} }).catch(() => true)
  }
  return true
})

export default router
