<template>
  <div class="w-[40rem] max-w-[95vw] bg-[#5d0202] border border-[#9f2d2d] shadow-[0_6px_24px_rgba(0,0,0,0.35)]">
    <div class="h-[48px] px-4 border-b border-[rgba(255,255,255,0.18)] flex items-center justify-between">
      <span class="font-Rubik font-extrabold text-white text-base">STEAM TRADE URL</span>
      <button
        type="button"
        class="text-[#d7b7b7] hover:text-white text-xl leading-none"
        @click="closeModal"
      >
        ×
      </button>
    </div>

    <div class="px-4 py-5 flex flex-col gap-3">
      <span class="font-Rubik font-medium text-[13px] text-white/90">
        Your trade URL is required to send you items. You can find it
        <a
          href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
          target="_blank"
          rel="noopener noreferrer"
          class="underline text-[#ff5252]"
        >
          here.
        </a>
      </span>
      <div class="w-full flex items-center bg-[rgba(255,52,53,0.35)] h-[38px] px-2 gap-2">
        <input
          type="text"
          v-model="tradeUrlInput"
          placeholder="https://steamcommunity.com/..."
          autocomplete="off"
          class="flex-1 h-full bg-transparent outline-none font-Rubik text-sm text-white placeholder:text-white/60"
        />
        <span class="font-Rubik text-xs text-[#ff5252]">Required</span>
      </div>
      <div class="w-full flex justify-center pt-1">
        <button
          type="button"
          :disabled="saving"
          class="h-9 min-w-[110px] bg-[#04ab53] px-5 font-Rubik font-extrabold text-white disabled:opacity-60 disabled:cursor-not-allowed"
          @click="saveTradeUrl"
        >
          {{ saving ? 'SAVING...' : 'SAVE' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, getSteamId, mergeAuth } from '@/auth/session'
import { updateTradeURL } from '@/services/jackpotClient'

export default {
  name: 'TradeUrlRequiredModal',
  props: {
    onSaved: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      tradeUrlInput: '',
      saving: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    async saveTradeUrl() {
      const steamid = getSteamId()
      if (!steamid) {
        this.$toaster?.error?.('You must be logged in with Steam.')
        return
      }
      const trade_url = String(this.tradeUrlInput ?? '').trim()
      if (!trade_url) {
        this.$toaster?.error?.('Enter your Steam trade URL.')
        return
      }
      this.saving = true
      try {
        await updateTradeURL({ steamid, trade_url })
        mergeAuth({ trade_url })
        this.$toaster?.success?.('Trade URL saved.')
        this.closeModal()
        if (typeof this.onSaved === 'function') this.onSaved()
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Could not save trade URL.'
        this.$toaster?.error?.(msg)
      } finally {
        this.saving = false
      }
    }
  },
  mounted() {
    const auth = getAuth()
    if (auth?.trade_url) this.tradeUrlInput = String(auth.trade_url)
  }
}
</script>
