<template>
  <div
    class="relative w-full max-w-[480px] rounded-lg border border-[#6b1515] bg-gradient-to-b from-[#3a0505] via-[#2e0101] to-[#1a0101] shadow-2xl overflow-hidden"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
      <div class="confetti confetti-a" />
      <div class="confetti confetti-b" />
      <div class="confetti confetti-c" />
      <div class="confetti confetti-d" />
      <div class="confetti confetti-e" />
      <div class="streamer" />
    </div>

    <button
      type="button"
      class="absolute top-3 right-3 z-10 p-1 rounded-sm text-white/85 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Close"
      @click="closeModal()"
    >
      <XMarkIcon class="w-6 h-6 stroke-2" />
    </button>

    <div class="relative px-3 pt-9 pb-5 sm:px-2 sm:pb-6">
      <div class="flex flex-col items-center text-center">
        <div
          class="h-[72px] w-[72px] shrink-0 rounded-full bg-[#1a0101] ring-2 ring-amber-500/60 ring-offset-2 ring-offset-[#2e0101] bg-cover bg-center shadow-inner"
          :style="{ backgroundImage: `url(${displayAvatar})` }"
        />
        <h2
          class="mt-4 flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0 font-Rubik font-black uppercase tracking-wide text-white text-lg sm:text-xl leading-tight"
        >
          <span class="text-white font-bold">You've won</span>
          <span class="text-[#4ade80] tabular-nums font-bold">${{ formattedPot }}</span>
        </h2>
      </div>

      <div class="relative mt-5">
        <div
          class="grid-scroll max-h-[min(42vh,260px)] overflow-y-auto overscroll-contain pr-0.5"
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
                  class="min-w-0 truncate px-0.5 text-[10px] sm:text-[11px] font-semibold font-Rubik text-[#e8d4d4] uppercase leading-tight"
                  :title="it.name"
                >
                  {{ it.name }}
                </p>
                <p class="shrink-0 text-white font-bold font-Rubik text-[10px] sm:text-xs tabular-nums leading-none">
                  ${{ formatPrice(it.price) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="displayItems.length > 8"
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-[#2e0101] to-transparent rounded-b-sm"
          aria-hidden="true"
        />
      </div>

      <div class="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          class="flex w-full min-w-0 items-center justify-center min-h-[48px] px-3 rounded-none bg-[#f15840] hover:opacity-95 active:opacity-90 transition-opacity"
          @click="onDoubleDown"
        >
          <span class="font-Rubik font-extrabold text-white text-xs sm:text-sm uppercase tracking-wider">
            Double Down
          </span>
        </button>
        <button
          type="button"
          class="flex w-full min-w-0 min-h-[48px] items-center justify-center gap-3 px-3 py-2.5 rounded-none bg-[#04AB53] hover:opacity-95 active:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(4,171,83,0.35)] disabled:opacity-40 disabled:cursor-not-allowed"
          :disabled="!hasTradeUrl"
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
            class="font-Rubik font-extrabold text-white text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap"
          >
            Accept trade offer
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { closeModal, openModal } from '@/modalStore'

export default {
  name: 'JackpotWinnerChoiceModal',
  components: { XMarkIcon },
  props: {
    tradeOfferUrl: { type: String, default: '' },
    potValue: { type: Number, default: 0 },
    potId: { type: Number, default: 1 },
    loadInventory: { type: Function, default: null },
    deposit: { type: Function, default: null },
    avatar: { type: String, default: '/img/user/userImage.png' },
    items: { type: Array, default: () => [] }
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
      closeModal()
    },
    onDoubleDown() {
      const potId = this.potId
      const loadInventory = this.loadInventory
      const deposit = this.deposit
      closeModal()
      if (typeof loadInventory === 'function' && typeof deposit === 'function') {
        openModal('jackpot deposit', {
          potId,
          loadInventory,
          deposit
        })
      }
    },
    onAcceptTrade() {
      if (!this.hasTradeUrl) return
      window.open(this.tradeOfferUrl.trim(), '_blank', 'noopener,noreferrer')
      closeModal()
    }
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
