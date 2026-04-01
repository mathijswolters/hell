<template>
  <div
    class="relative w-[min(100vw-1rem,42rem)] max-h-[min(90vh,40rem)] flex flex-col bg-[linear-gradient(180deg,rgba(46,5,5,0.98)_0%,rgba(30,1,1,0.98)_100%)] backdrop-blur-xl border border-[#530000] rounded-lg shadow-[0_4px_24px_rgba(0,0,0,0.5)] overflow-hidden"
  >
    <div
      class="flex justify-between items-center px-4 py-3 border-b border-[rgba(98,1,1,1)] shrink-0 bg-[#2e0505]"
    >
      <span class="font-Rubik font-extrabold text-white text-base uppercase tracking-wide"
        >JACKPOT #{{ displayPotId }}</span
      >
      <XMarkIcon
        class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform fill-[#d7b7b7]"
        @click="closeModal"
      />
    </div>

    <div class="flex-1 overflow-y-auto px-3 py-3 min-h-[12rem]">
      <div v-if="loading" class="flex items-center justify-center py-16 text-[#d7b7b7] font-Rubik text-sm">
        Loading…
      </div>
      <div v-else-if="loadError" class="text-center py-12 px-4 text-[#ff6b6b] font-Rubik text-sm">
        {{ loadError }}
      </div>
      <template v-else-if="details">
        <!-- Winner summary -->
        <div
          class="flex flex-wrap items-center gap-x-2 gap-y-1 justify-center py-3 px-2 mb-3 rounded bg-[#5e0303]/80 border border-[#620101]"
        >
          <div
            class="w-11 h-11 rounded-[4px] bg-cover bg-center shrink-0"
            :style="{ backgroundImage: `url(${winnerAvatar})` }"
          />
          <p
            class="text-center font-Rubik text-sm sm:text-base leading-snug"
          >
            <span class="text-[rgba(255,191,20,1)] font-bold">{{ winnerName }}</span>
            <span class="text-white font-bold"> | WON </span>
            <span class="text-[rgba(4,171,83,1)] font-bold"
              >${{ formatMoney(winnerWinnings) }}</span
            >
            <span class="text-white font-bold"> WITH </span>
            <span class="text-[rgba(255,52,53,1)] font-bold">{{ formatChance(winnerChance) }}%</span>
            <span class="text-white font-bold"> CHANCE | TICKET:</span>
            <span class="text-white font-semibold">{{ formatTicket(details.ticket) }}</span>
          </p>
        </div>

        <!-- Deposits -->
        <div class="flex flex-col gap-3 pb-2">
          <div
            v-for="(dep, idx) in depositsWithRanges"
            :key="dep.steamid + '-' + idx"
            class="rounded border p-3 bg-[#4b0505]"
            :class="
              isWinnerDeposit(dep)
                ? 'border-[rgba(255,191,20,0.9)] ring-1 ring-[rgba(255,52,53,0.35)]'
                : 'border-[#620101]'
            "
          >
            <div class="flex flex-wrap items-center gap-2 justify-between mb-3">
              <div class="flex items-center gap-2 min-w-0">
                <div
                  class="w-10 h-10 rounded-[4px] bg-cover bg-center shrink-0"
                  :style="{ backgroundImage: `url(${dep.avatar || '/img/user/userImage.png'})` }"
                />
                <div class="min-w-0">
                  <div class="text-white font-Rubik font-bold text-sm truncate">{{ dep.name }}</div>
                  <div class="text-white font-Rubik text-xs font-bold">
                    ${{ formatMoney(dep.value) }} | {{ formatChance(dep.chance) }}%
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <span class="text-white/70 font-Rubik text-xs font-bold whitespace-nowrap">
                  {{ dep.rangeLow.toFixed(2) }}% - {{ dep.rangeHigh.toFixed(2) }}%
                </span>
                <svg
                  viewBox="-1 -1 2 2"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-9 h-9 rounded-full -rotate-90 shrink-0"
                >
                  <circle cx="0" cy="0" r="1" fill="rgba(4, 171, 83, 0.2)" />
                  <path :d="piePath(dep.rangeLow, dep.rangeHigh)" fill="white" />
                </svg>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              <div
                v-for="(skin, si) in dep.skins || []"
                :key="si + '-' + (skin.name || si)"
                class="w-[118px] bg-[rgba(95,3,3,1)] min-h-[120px] flex flex-col items-center justify-center px-2 py-2 rounded"
              >
                <img :src="skinImageUrl(skin)" class="max-w-[56px] max-h-[56px] object-contain" alt="" />
                <span
                  class="w-full text-center truncate font-Rubik font-semibold text-[#d7b7b7] text-xs mt-1"
                  >{{ skin.name }}</span
                >
                <span class="font-Rubik text-white text-sm font-semibold"
                  >${{ formatMoney(skin.value) }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Fairness -->
        <div
          v-if="details.hash || details.block"
          class="mt-2 pt-3 border-t border-[rgba(98,1,1,0.5)] text-xs font-Rubik text-[#a68381] space-y-1 pb-2"
        >
          <p v-if="details.hash">
            <span class="text-white font-extrabold">HASH</span>: {{ details.hash }}
          </p>
          <p v-if="details.block">
            <span class="text-white font-extrabold">BLOCK</span>: {{ details.block }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { getJackpotDetails, normalizeSteamEconomyImageUrl, toNumber } from '@/services/jackpotClient'

export default {
  name: 'JackpotHistoryDetailsModal',
  components: { XMarkIcon },
  props: {
    gameid: {
      type: [String, Number],
      required: true
    },
    potId: {
      type: [String, Number],
      default: 1
    }
  },
  emits: ['close-modal'],
  data() {
    return {
      loading: true,
      loadError: null,
      details: null
    }
  },
  computed: {
    displayPotId() {
      return this.details?.potid ?? this.potId
    },
    winnerName() {
      return this.details?.winner_data?.name ?? '—'
    },
    winnerAvatar() {
      return this.details?.winner_data?.avatar || '/img/user/userImage.png'
    },
    winnerWinnings() {
      return toNumber(
        this.details?.pot,
        0
      )
    },
    winnerChance() {
      return toNumber(this.details?.winner_data?.chance, 0)
    },
    depositsWithRanges() {
      const list = Array.isArray(this.details?.deposits) ? this.details.deposits : []
      let acc = 0
      return list.map((d) => {
        const chance = toNumber(d.chance, 0)
        const rangeLow = acc
        const rangeHigh = acc + chance
        acc = rangeHigh
        return { ...d, rangeLow, rangeHigh }
      })
    }
  },
  mounted() {
    this.fetchDetails()
  },
  watch: {
    gameid() {
      this.fetchDetails()
    },
    potId() {
      this.fetchDetails()
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    formatMoney(n) {
      return Number(n).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    },
    formatChance(n) {
      return Number(n).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    },
    formatTicket(t) {
      if (t == null || t === '') return '—'
      return Number(t).toLocaleString(undefined, {
        maximumFractionDigits: 8,
        minimumFractionDigits: 2
      })
    },
    skinImageUrl(skin) {
      const raw = skin?.image ?? ''
      return normalizeSteamEconomyImageUrl(raw) || raw
    },
    isWinnerDeposit(dep) {
      const ws = this.details?.winner_data?.steamid
      if (ws != null && dep?.steamid != null) return String(dep.steamid) === String(ws)
      return false
    },
    percentageToRadians(percentage) {
      return (percentage / 100) * 2 * Math.PI
    },
    piePath(lowest, highest) {
      const startAngle = this.percentageToRadians(lowest)
      const endAngle = this.percentageToRadians(highest)
      const startX = Math.cos(startAngle)
      const startY = Math.sin(startAngle)
      const endX = Math.cos(endAngle)
      const endY = Math.sin(endAngle)
      const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1
      return `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
    },
    async fetchDetails() {
      this.loading = true
      this.loadError = null
      this.details = null
      try {
        const d = await getJackpotDetails({
          gameid: this.gameid,
          potid: this.potId
        })
        this.details = d
      } catch (e) {
        this.loadError = e?.message || 'Failed to load game history.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0.35rem;
}
::-webkit-scrollbar-thumb {
  background: #710101;
  border-radius: 4px;
}
</style>
