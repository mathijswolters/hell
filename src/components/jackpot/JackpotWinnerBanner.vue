<template>
  <div
    class="jackpot-winner-banner flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-4 w-full px-3 sm:px-5 py-10 rounded border border-[#ff3435] bg-[#4C0703] font-Rubik font-bold text-xs sm:text-sm md:text-base"
    role="status"
    aria-live="polite"
  >
    <div
      class="w-11 h-11 sm:w-[70px] sm:h-[70px] shrink-0 rounded-[4px] bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${avatar})` }"
    />
    <span class="text-[rgba(255,191,20,1)] font-Rubik text-xl font-bold"
      >{{ displayName }}
    </span>
    <span class="text-white/50 font-Rubik font-bold text-xl" aria-hidden="true">|</span>
    <span class="text-white font-Rubik font-bold text-xl"
      >WON
      <span class="text-[rgba(4,171,83,1)] font-Rubik font-bold text-xl">${{ formattedPot }}</span>
      WITH
      <span class="text-[rgba(255,52,53,1)] font-Rubik font-bold text-xl">{{ formattedChance }}%</span>
      CHANCE | TICKET: {{ ticket }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'JackpotWinnerBanner',
  props: {
    avatar: { type: String, default: '/img/user/userImage.png' },
    name: { type: String, default: '—' },
    potValue: { type: Number, default: 0 },
    chance: { type: Number, default: 0 },
    ticket: { type: String, default: '—' }
  },
  computed: {
    displayName() {
      return String(this.name || '—').toUpperCase()
    },
    formattedPot() {
      return Number(this.potValue).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    },
    formattedChance() {
      return Number(this.chance).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0
      })
    }
  }
}
</script>
