<template>
  <div
    class="relative w-full max-w-[440px] bg-[#420101] rounded-lg border border-solid border-[#5a0a0a] shadow-2xl overflow-hidden"
  >
    <button
      type="button"
      class="absolute top-3 right-3 z-10 p-1 rounded-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Close"
      @click="closeModal()"
    >
      <XMarkIcon class="w-6 h-6 stroke-2" />
    </button>

    <div class="px-8 pt-10 pb-8">
      <h2
        class="text-center text-white font-Rubik font-bold text-lg sm:text-xl leading-tight pr-8 pl-8"
      >
        Sign in to your account
      </h2>

      <div v-if="statusMessage" class="mt-6 text-center text-[#ff8a8a] text-sm font-Rubik">
        {{ statusMessage }}
      </div>

      <button
        type="button"
        class="mt-10 w-full flex items-center justify-center gap-3 min-h-[52px] px-4 rounded-sm bg-[#04AB53] hover:opacity-95 active:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(4,171,83,0.35)]"
        @click="steamOpenIdLogin"
      >
        <span class="flex h-7 w-7 shrink-0 items-center justify-center text-white" aria-hidden="true">
          <svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M11.979 0C7.742 0 3.989 3.75 3.989 8.002c0 .013.002.024.002.036L.146 15.396c-.276.53-.474 1.13-.474 1.768 0 1.668 1.354 3.022 3.022 3.022.636 0 1.216-.197 1.713-.53l.002.005 6.516-2.415c.88.244 1.804.38 2.764.38 4.237 0 7.99-3.75 7.99-8.002C21.99 3.75 18.237 0 14 0h-2.021zm.037 1.5h1.984c3.587 0 6.5 2.913 6.5 6.502 0 3.588-2.913 6.5-6.5 6.5-3.589 0-6.502-2.912-6.502-6.5 0-3.589 2.913-6.502 6.502-6.502z"
            />
          </svg>
        </span>
        <span
          class="font-Rubik font-extrabold text-white text-sm sm:text-base uppercase tracking-wide"
        >
          Sign in with Steam
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { closeModal as closeGlobalModal } from '@/modalStore'

const DEFAULT_STEAM_AUTH_URL = 'https://rstspcl.com/auth/steam/'

export default {
  name: 'LoginModal',
  components: { XMarkIcon },
  props: {
    /** Where to send the user after OAuth (path + query), e.g. `/jackpot`. */
    redirectTo: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {
      statusMessage: ''
    }
  },
  computed: {
    steamOAuthBaseUrl() {
      const u = import.meta.env.VITE_STEAM_OAUTH_URL || import.meta.env.VITE_STEAM_LOGIN_URL
      if (typeof u === 'string' && u.trim()) return u.trim()
      return DEFAULT_STEAM_AUTH_URL
    }
  },
  methods: {
    closeModal() {
      closeGlobalModal()
    },
    steamOpenIdLogin() {
      const loginUrl = this.steamOAuthBaseUrl
      const safeRedirect = typeof this.redirectTo === 'string' && this.redirectTo.startsWith('/')
        ? this.redirectTo
        : '/'
      const returnPage = `${window.location.origin}/?redirect=${encodeURIComponent(safeRedirect)}`
      const paramName = import.meta.env.VITE_STEAM_LOGIN_RETURN_PARAM || 'returnURL'
      const joiner = loginUrl.includes('?') ? '&' : '?'
      window.location.href = `${loginUrl}${joiner}${paramName}=${encodeURIComponent(returnPage)}`
    }
  }
}
</script>
