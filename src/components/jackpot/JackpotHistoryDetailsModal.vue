<template>
  <div
    class="jp-details-modal relative w-[min(100vw-1rem,50rem)] max-h-[min(90vh,44rem)] flex flex-col rounded-lg overflow-hidden border border-[#3d0000] shadow-[0_8px_32px_rgba(0,0,0,0.65)]"
  >
    <!-- Header -->
    <div
        class="relative flex justify-start items-center px-4 py-3 shrink-0 border-b border-[#6a1715] bg-[#4c0703]"
    >
      <span class="font-Rubik font-extrabold text-white text-base uppercase tracking-wide text-center">
        JACKPOT #{{ gameid }}
      </span>
      <XMarkIcon
        class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer hover:opacity-90 transition-opacity text-white"
        @click="closeModal"
      />
    </div>

    <div
      class="flex-1 overflow-y-auto px-4 py-4 min-h-[12rem] bg-[#4c0703] text-center"
    >
      <div
        v-if="loading"
        class="flex items-center justify-center py-16 text-[#c9a8a8] font-Rubik text-sm"
      >
        Loading…
      </div>
      <div
        v-else-if="loadError"
        class="text-center py-12 px-4 text-[#ff6b6b] font-Rubik text-sm"
      >
        {{ loadError }}
      </div>
      <template v-else-if="details">
        <!-- Winner summary bar -->
        <div
          class="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-2 gap-y-2 py-3 px-3 mb-4 rounded-md bg-[#4c0703]/90"
        >
          <div
            class="w-12 h-12 rounded-[4px] bg-cover bg-center shrink-0 border border-[#3d0000] mx-auto sm:mx-0"
            :style="{ backgroundImage: `url(${winnerAvatar})` }"
          />
          <p
            class="font-Rubik text-sm sm:text-[0.9375rem] leading-snug font-bold flex flex-wrap items-baseline justify-center gap-x-1 gap-y-1 max-w-full"
          >
            <span class="text-[#ffff00]">{{ winnerName }}</span>
            <span class="text-white">| WON</span>
            <span class="text-[#00ff00]">${{ formatMoney(winnerWinnings) }}</span>
            <span class="text-white">WITH</span>
            <span class="text-[#ff4d4d]">{{ formatChance(winnerChance) }}%</span>
            <span class="text-white">CHANCE | TICKET:</span>
            <span class="text-white font-semibold tabular-nums">{{ formatTicket(details.ticket) }}</span>
          </p>
        </div>

        <!-- Deposits -->
        <div class="flex flex-col gap-4 pb-2 items-center">
          <div
            v-for="(dep, idx) in depositsWithRanges"
            :key="dep.steamid + '-' + idx"
            class="rounded-lg border p-4 transition-shadow w-full max-w-full"
            :class="
              isWinnerDeposit(dep)
                ? 'bg-[#8a1715] border-[#ffff00] shadow-[0_0_0_1px_rgba(255,255,0,0.35)]'
                : 'bg-[#4c0703] border-[#a8322b]'
            "
          >
            <!-- Card header: avatar + single line stats + pie -->
            <div
              class="flex flex-col items-center gap-3 mb-4 sm:flex-row sm:flex-wrap sm:justify-center"
            >
              <div
                class="flex flex-col sm:flex-row items-center gap-3 min-w-0 w-full sm:w-auto justify-center"
              >
                <div
                  class="w-11 h-11 rounded-[4px] bg-cover bg-center shrink-0 border border-[#5c0000]"
                  :style="{ backgroundImage: `url(${dep.avatar || '/img/user/userImage.png'})` }"
                />
                <div class="min-w-0 max-w-full">
                  <p
                    class="font-Rubik font-bold text-sm sm:text-[0.9375rem] leading-tight text-white text-center"
                  >
                    <span class="text-white">{{ dep.name }}</span>
                    <span class="text-white"> ${{ formatMoney(dep.value) }}</span>
                    <span class="text-white"> | {{ formatChance(dep.chance) }}%</span>
                    &nbsp;&nbsp;
                    <span class="text-white/75 font-semibold text-xs sm:text-sm">
                      {{ dep.rangeLow.toFixed(2) }}% – {{ dep.rangeHigh.toFixed(2) }}%
                    </span>
                  </p>
                </div>
              </div>
              <div class="shrink-0 flex items-center justify-center w-full sm:w-auto">
                <svg
                  viewBox="-1 -1 2 2"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-10 h-10 rounded-full -rotate-90"
                  aria-hidden="true"
                >
                  <circle cx="0" cy="0" r="1" fill="rgba(92, 0, 0, 0.85)" />
                  <path :d="piePath(dep.rangeLow, dep.rangeHigh)" fill="#ffffff" />
                </svg>
              </div>
            </div>

            <!-- Items grid -->
            <div class="flex flex-wrap gap-2 justify-center">
              <div
                v-for="(skin, si) in dep.skins || []"
                :key="si + '-' + (skin.name || si)"
                class="w-[calc(50%-0.25rem)] sm:w-[118px] bg-[#5c0000] min-h-[112px] flex flex-col items-center justify-center px-2 py-3 rounded-md border border-[#6b1515]/60"
              >
                <img
                  :src="skinImageUrl(skin)"
                  class="max-w-[56px] max-h-[56px] object-contain"
                  alt=""
                />
                <span
                  class="w-full text-center truncate font-Rubik font-semibold text-white/90 text-[11px] sm:text-xs mt-2 leading-tight"
                  :title="skin.name"
                >
                  {{ skin.name }}
                </span>
                <span class="font-Rubik text-white text-sm font-bold mt-0.5 tabular-nums">
                  ${{ formatMoney(skin.value) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Fairness -->
        <div
          v-if="details.hash || details.block"
          class="mt-1 pt-4 border-t border-[#3d0000] text-xs font-Rubik text-[#a68381] space-y-1.5 pb-1 text-center [&_p]:break-words"
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
      return toNumber(this.details?.pot, 0)
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
.jp-details-modal {
  font-family: 'Rubik', ui-sans-serif, system-ui, sans-serif;
}

::-webkit-scrollbar {
  width: 0.35rem;
}
::-webkit-scrollbar-thumb {
  background: #5c0000;
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  background: #1a0000;
}
</style>
