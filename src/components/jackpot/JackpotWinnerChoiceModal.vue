<template>
  <div
    class="relative flex h-[766px] w-[534px] max-w-full shrink-0 flex-col overflow-hidden rounded-lg border border-[#530000] bg-[radial-gradient(ellipse_36.32%_58.01%_at_50%_0%,rgba(255,216,9,0.3)_0%,#530000_100%)] backdrop-blur-[32px]"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
      <img src="../../assets/img/congratulations.png" alt="" class="w-full h-full object-cover w-[534px] h-[296px]">
    </div>

    <button
      type="button"
      class="absolute top-3 right-3 z-10 p-1 rounded-sm text-white/85 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Close"
      @click="closeModal()"
    >
      <XMarkIcon class="w-6 h-6 stroke-2" />
    </button>

    <div
      class="relative z-[1] flex min-h-0 flex-1 flex-col px-3 pt-9 pb-5 sm:px-2 sm:pb-6"
    >
      <div class="flex h-[296px] shrink-0 flex-col items-center justify-center text-center">
        <div class="relative shrink-0">
          <img
            src="../../assets/img/Union.png"
            alt=""
            class="pointer-events-none absolute bottom-full left-1/2  mb-[-12px] h-[52px] w-auto max-w-[120px] -translate-x-1/2 object-contain select-none"
            aria-hidden="true"
          />
          <div
            class="h-[124px] w-[124px] relative z-10 shrink-0 rounded-full bg-[#1a0101] ring-2 ring-amber-500/60 ring-offset-2 ring-offset-[#530000] bg-cover bg-center shadow-inner brightness-125"
            :style="{ backgroundImage: `url(${displayAvatar})` }"
          />
        </div>
        <h2
          class="mt-4 flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0 font-Rubik font-black uppercase tracking-wide text-white text-lg sm:text-xl leading-tight"
        >
          <span class="text-white font-bold font-Rubik text-[35px]">You've won</span>
          <span class="text-[#4ade80] tabular-nums font-bold font-Rubik text-[35px]">${{ formattedPot }}</span>
        </h2>
      </div>

      <div class="relative mt-5 flex min-h-0 flex-1 flex-col">
        <div
          class="grid-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5"
          :class="{ 'pb-1': displayItems.length > 8 }"
        >
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div
              v-for="(it, idx) in displayItems"
              :key="idx"
              class="aspect-square w-full min-w-0 flex flex-col rounded bg-[#690405] border border-[#5c1212]/80 p-1.5 text-center"
            >
              <div
                class="mx-auto h-[46px] w-[46px] shrink-0 rounded-sm bg-cover bg-center sm:h-[52px] sm:w-[52px]"
                :style="{ backgroundImage: it.image ? `url(${it.image})` : undefined }"
              />
              <div class="mt-1 flex min-h-0 flex-1 flex-col justify-end gap-0.5">
                <p
                  class="min-w-0 truncate px-0.5 text-[16px] sm:text-[16px] font-semibold font-Rubik text-[#e8d4d4] uppercase leading-tight"
                  :title="it.name"
                >
                  {{ it.name }}
                </p>
                <p class="shrink-0 text-white font-bold font-Rubik text-[16px] tabular-nums leading-none">
                  ${{ formatPrice(it.price) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="displayItems.length > 8"
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#530000] to-transparent rounded-b-sm"
          aria-hidden="true"
        />
      </div>

      <div class="mt-auto grid shrink-0 grid-cols-1 gap-2 pt-5 sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          class="flex w-full min-w-0 items-center justify-center min-h-[48px] px-3 rounded-none bg-[#f15840] hover:opacity-95 active:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!hasWinningsRequestPayload || isSubmittingAction"
          @click="onDoubleDown"
        >
          <span class="font-Rubik font-extrabold text-white text-[16px] uppercase tracking-wider">
            Double Down ({{ safeCountdownLabel }}s)
          </span>
        </button>
        <button
          type="button"
          class="flex w-full min-w-0 min-h-[48px] items-center justify-center gap-3 px-3 py-2.5 rounded-none bg-[#04AB53] hover:opacity-95 active:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(4,171,83,0.35)] disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!hasWinningsRequestPayload || isSubmittingAction"
          @click="onAcceptTrade"
        >
          <span
            class="flex h-9 w-6 shrink-0 items-center justify-center rounded-full"
            aria-hidden="true"
          >
            <img
              src="../../assets/img/loginIcon.png"
              alt=""
              class="h-6 w-6 object-contain"
            />
          </span>
          <span
            class="font-Rubik font-extrabold text-white text-[16px] uppercase tracking-wider whitespace-nowrap"
          >
            Claim winnings ({{ safeCountdownLabel }}s)
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { closeModal } from '@/modalStore'
import { claimJackpotWinnings, wagerJackpotWinnings } from '@/services/jackpotClient'

export default {
  name: 'JackpotWinnerChoiceModal',
  components: { XMarkIcon },
  props: {
    tradeOfferUrl: { type: String, default: '' },
    potValue: { type: Number, default: 0 },
    potId: { type: Number, default: 1 },
    gameId: { type: Number, default: null },
    steamid: { type: String, default: '' },
    loadInventory: { type: Function, default: null },
    deposit: { type: Function, default: null },
    avatar: { type: String, default: '/img/user/userImage.png' },
    items: { type: Array, default: () => [] },
    decisionSeconds: { type: Number, default: 20 }
  },
  data() {
    return {
      countdown: 20,
      countdownTimer: null,
      isSubmittingClaim: false,
      isSubmittingWager: false
    }
  },
  computed: {
    displayAvatar() {
      const s = typeof this.avatar === 'string' ? this.avatar.trim() : ''
      return s || '/img/user/userImage.png'
    },
    formattedPot() {
      return Number(this.potValue).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    },
    displayItems() {
      return Array.isArray(this.items) ? this.items : []
    },
    hasTradeUrl() {
      const s = typeof this.tradeOfferUrl === 'string' ? this.tradeOfferUrl.trim() : ''
      return /^https?:\/\//i.test(s)
    },
    hasWinningsRequestPayload() {
      return (
        typeof this.steamid === 'string' &&
        this.steamid.trim().length > 0 &&
        this.gameId != null &&
        this.potId != null
      )
    },
    safeCountdownLabel() {
      return Math.max(0, Number(this.countdown) || 0)
    },
    isSubmittingAction() {
      return this.isSubmittingClaim || this.isSubmittingWager
    }
  },
  methods: {
    formatPrice(n) {
      return Number(n ?? 0).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    },
    closeModal() {
      this.stopDecisionCountdown()
      closeModal()
    },
    startDecisionCountdown() {
      this.stopDecisionCountdown()
      const initial = Number(this.decisionSeconds)
      this.countdown = Number.isFinite(initial) && initial > 0 ? Math.floor(initial) : 20
      this.countdownTimer = setInterval(() => {
        if (this.countdown <= 0) {
          this.stopDecisionCountdown()
          return
        }
        this.countdown -= 1
      }, 1000)
    },
    stopDecisionCountdown() {
      if (!this.countdownTimer) return
      clearInterval(this.countdownTimer)
      this.countdownTimer = null
    },
    showErrorMessage(error, fallbackMessage) {
      const msg =
        error?.error_message ||
        error?.message ||
        (typeof fallbackMessage === 'string' ? fallbackMessage : 'Request failed')
      this.$toaster?.error?.(String(msg))
    },
    showSuccessMessage(response, fallbackMessage) {
      const msg =
        response?.message ||
        (typeof fallbackMessage === 'string' ? fallbackMessage : 'Action completed.')
      this.$toaster?.success?.(String(msg))
    },
    async onDoubleDown() {
      if (!this.hasWinningsRequestPayload || this.isSubmittingAction) return
      this.isSubmittingWager = true
      try {
        const response = await wagerJackpotWinnings({
          steamid: this.steamid.trim(),
          gameid: this.gameId,
          potid: this.potId
        })
        this.showSuccessMessage(response, 'You have successfully re-wagered your winnings.')
        this.closeModal()
      } catch (error) {
        this.showErrorMessage(error, 'Could not re-wager winnings.')
        console.error('Failed to wager jackpot winnings:', error)
      } finally {
        this.isSubmittingWager = false
      }
    },
    async onAcceptTrade() {
      if (!this.hasWinningsRequestPayload || this.isSubmittingAction) return
      this.isSubmittingClaim = true
      try {
        const response = await claimJackpotWinnings({
          steamid: this.steamid.trim(),
          gameid: this.gameId,
          potid: this.potId
        })
        this.showSuccessMessage(response, 'Winnings claimed successfully.')
        this.closeModal()
      } catch (error) {
        this.showErrorMessage(error, 'Could not claim winnings.')
        console.error('Failed to claim jackpot winnings:', error)
      } finally {
        this.isSubmittingClaim = false
      }
    }
  },
  mounted() {
    this.startDecisionCountdown()
  },
  beforeUnmount() {
    this.stopDecisionCountdown()
  }
}
</script>

<style scoped>
.grid-scroll {
  scrollbar-width: thin;
  scrollbar-color: #870000 transparent;
}
.confetti {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 1px;
  opacity: 0.85;
}
.confetti-a {
  top: 10%;
  left: 8%;
  background: #2dd4bf;
  transform: rotate(18deg);
}
.confetti-b {
  top: 6%;
  right: 12%;
  background: #fb923c;
  transform: rotate(-24deg);
}
.confetti-c {
  top: 22%;
  left: 18%;
  background: #f87171;
  transform: rotate(42deg);
}
.confetti-d {
  bottom: 28%;
  right: 10%;
  background: #2dd4bf;
  transform: rotate(-12deg);
}
.confetti-e {
  bottom: 18%;
  left: 14%;
  background: #fb923c;
  transform: rotate(33deg);
}
.streamer {
  position: absolute;
  top: 4%;
  right: 4%;
  width: 120px;
  height: 6px;
  background: linear-gradient(90deg, transparent, #f472b6, transparent);
  opacity: 0.55;
  transform: rotate(-18deg);
  border-radius: 3px;
}
</style>
