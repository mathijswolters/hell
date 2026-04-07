export default [
    {
        path: '/mod',
        redirect: '/mod/support',
        children: [
            {
                path: 'support',
                name: 'mod_support',
                component: () => import('@/views/mod/support/Lobby_Page.vue')
            },
            {
                path: 'users',
                name: 'mod_users',
                component: () => import('@/views/mod/users/Lobby_Page.vue')
            },
            {
                path: 'games/coinflip',
                name: 'mod_games_coinflip',
                component: () => import('@/views/mod/games/CoinflipPage.vue')
            },
            {
                path: 'games/jackpot',
                name: 'mod_games_jackpot',
                component: () => import('@/views/mod/games/JackpotPage.vue')
            },
            {
                path: 'logs',
                name: 'mod_logs',
                component: () => import('@/views/mod/logs_page/Lobby_Page.vue')
            },
            {
                path: 'trades',
                name: 'mod_trades',
                component: () => import('@/views/mod/trades/Lobby_Page.vue')
            },
            {
                path: 'filters',
                name: 'mod_filters',
                component: () => import('@/views/mod/filters/Lobby_Page.vue')
            },
            {
                path: 'prices',
                name: 'mod_prices',
                component: () => import('@/views/mod/prices/Lobby_Page.vue')
            },
        ]
    }
]
