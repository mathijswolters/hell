import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'

const API_ORIGIN = 'http://116.202.242.165:2052'
const SOCKET_ORIGIN = 'https://116.202.242.165:2083'

export default defineConfig({
  plugins: [vue(), imagetools()],
  server: {
    host: true,
    strictPort: true,
    proxy: {
      '^/jackpot/(getRound|getHistory|getLuckiest|getDetails|getLastHistory|deposit)(\\?.*)?$': {
        target: API_ORIGIN,
        changeOrigin: true,
        secure: false
      },
      '^/inventory/load(\\?.*)?$': {
        target: API_ORIGIN,
        changeOrigin: true,
        secure: false
      },
      '^/stats/(getGraph|getGameHistory)(\\?.*)?$': {
        target: API_ORIGIN,
        changeOrigin: true,
        secure: false
      },
      '^/user/(updateTradeURL|getTransactions)(\\?.*)?$': {
        target: API_ORIGIN,
        changeOrigin: true,
        secure: false
      },
      // Socket.IO proxy (websocket + polling) — HTTPS :2083
      '^/socket\\.io(?:/.*)?$': {
        target: SOCKET_ORIGIN,
        changeOrigin: true,
        secure: false,
        ws: true
      },
      '^/steam-api': {
        target: 'https://api.steampowered.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/steam-api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})