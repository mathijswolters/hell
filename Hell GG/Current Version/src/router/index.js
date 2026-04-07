import { createRouter, createWebHistory } from 'vue-router'
import modRoutes from '@/router/mod'

const routes = [
  ...modRoutes,
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/dashboard/Lobby_Page.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/users/Lobby_Page.vue')
  },
  {
    path: '/prices',
    name: 'prices',
    component: () => import('../views/prices/Lobby_Page.vue')
  },
  {
    path: '/bots',
    name: 'bots',
    component: () => import('../views/bots/Lobby_Page.vue')
  },
  {
    path: '/banned-skins',
    name: 'banned_skins',
    component: () => import('../views/banned_skins/Lobby_Page.vue')
  },
  {
    path: '/filters',
    name: 'filters',
    component: () => import('../views/filters/Lobby_Page.vue')
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import('../views/logs_page/Lobby_Page.vue')
  },
  {
    path: '/rewards',
    name: 'rewards',
    component: () => import('../views/rewards/Lobby_Page.vue')
  },
  {
    path: '/affiliates',
    name: 'affiliates',
    component: () => import('../views/affiliates/Lobby_Page.vue')
  },
  {
    path: '/trades',
    name: 'trades',
    component: () => import('../views/trades/Lobby_Page.vue')
  },
  {
    path: '/games-jackpot',
    name: 'games_jackpot',
    component: () => import('../views/games_jackpot/Lobby_Page.vue')
  },
  {
    path: '/games-coinflip',
    name: 'games_coinflip',
    component: () => import('../views/games_coinflip/Lobby_Page.vue')
  },
  {
    path: '/admin-shop',
    name: 'admin_shop',
    component: () => import('../views/admin_shop/Lobby_Page.vue')
  },
  {
    path: '/more-info-profile',
    name: 'MoreInfoProfile',
    component: () => import('../views/more_info/MoreInfoProfile.vue')
  },
  {
    path: '/game-history-coinflip',
    name: 'GameHistoryCoinflip',
    component: () => import('../views/more_info/GameHistoryCoinflip.vue')
  },
  {
    path: '/game-history-jackpot',
    name: 'GameHistoryJackpot',
    component: () => import('../views/more_info/GameHistoryJackpot.vue')
  },
  {
    path: '/wager-history',
    name: 'WagerHistory',
    component: () => import('../views/more_info/WagerHistory.vue')
  },
  {
    path: '/withdraws',
    name: 'MoreInfoWithdraw',
    component: () => import('../views/more_info/MoreInfoWithdraw.vue')
  },
  {
    path: '/more-info-trades',
    name: 'MoreInfoTrades',
    component: () => import('../views/more_info/MoreInfoTrades.vue'),
  },
  {
    path: '/banned-skins',
    name: 'BannedSkins',
    component: () => import('../views/more_info/BannedSkins.vue')
  },
  {
    path: '/moreinfo-affiliates',
    name: 'MoreInfoAffiliates',
    component: () => import('../views/more_info/MoreInfoAffiliates.vue')
  },
  {
    path: '/moreinfo-rewards',
    name: 'MoreInfoRewards',
    component: () => import('../views/more_info/MoreInfoRewards.vue')
  },
  {
    path: '/moreinfo-stats',
    name: 'MoreInfoStats',
    component: () => import('../views/more_info/MoreInfoStats.vue')
  },
  {
    path: '/moreinfo-logs',
    name: 'MoreInfoLogs',
    component: () => import('../views/more_info/MoreInfoLogs.vue')
  },
  {
    path: '/moreinfo-chats',
    name: 'MoreInfoChats',
    component: () => import('../views/more_info/MoreInfoChats.vue')
  },
  {
    path: '/moreinfo-transactions',
    name: 'MoreInfoTransaction',
    component: () => import('../views/more_info/MoreInfoTransaction.vue')
  },
  {
    path: '/case-creator-page',
    name: 'CaseCreator',
    component: () => import('../views/case/CaseCreator.vue')
  },
  {
    path: '/case-creator-edit-case',
    name: 'CaseEdit',
    component: () => import('../views/case/CaseEdit.vue')
  },
  {
    path: '/case-testing-tool-error',
    name: 'CaseTesting',
    component: () => import('../views/case/CaseTesting.vue')
  },
  {
    path: '/case-stats-all',
    name: 'CaseStatsAll',
    component: () => import('../views/case/CaseStatsAll.vue')
  },
  {
    path: '/support',
    name: 'SupportPanal',
    component: () => import('../views/support/Lobby_Page.vue')
  },
  {
    path: '/hof',
    name: 'HOF',
    component: () => import('../views/HOF/Lobby_Page.vue')
  },
  {
    path: '/chat-support',
    name: 'chatSupport',
    component: () => import('../views/support/chatSupport.vue')
  },
  
  // old routes
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
    path: '/coinflip',
    name: 'Coinflip_Lobby',
    component: () => import('../views/coinflip/Lobby_Page.vue')
  },
  {
    path: '/coinflipbracket',
    name: 'Coinflip_Bracket',
    component: () => import('../views/BracketCoinflip.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
