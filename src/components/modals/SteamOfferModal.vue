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
      <h2 class="text-center text-white font-Rubik font-bold text-lg sm:text-xl leading-tight pr-8 pl-8">
        Deposit offer is ready
      </h2>
      <p class="mt-4 text-center text-[#d7b7b7] text-sm font-Rubik">
        Please accept the Steam trade offer to complete your jackpot deposit.
      </p>

      <button
        type="button"
        class="mt-8 w-full flex items-center justify-center gap-2 min-h-[52px] px-4 rounded-sm bg-[#04AB53] hover:opacity-95 active:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(4,171,83,0.35)]"
        @click="openOffer"
      >
        <img src="../../assets/img/loginIcon.png" alt="" class="h-5 w-5 object-contain" aria-hidden="true" />
        <span class="font-Rubik font-extrabold text-white text-sm sm:text-base uppercase tracking-wide">
          Open Steam Offer
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { closeModal as closeGlobalModal } from '@/modalStore'

export default {
  name: 'SteamOfferModal',
  components: { XMarkIcon },
  props: {
    offerUrl: { type: String, default: '' }
  },
  methods: {
    closeModal() {
      closeGlobalModal()
    },
    openOffer() {
      if (!this.offerUrl) return
      window.open(this.offerUrl, '_blank', 'noopener,noreferrer')
      this.closeModal()
    }
  }
}
</script>
