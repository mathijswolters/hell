<template>
  <div
    class="rounded-lg p-4 transition-shadow w-full max-w-full text-center"
  >
    <!-- Match JackpotHistoryDetailsModal deposit header -->
    <div
      class="flex flex-col items-center gap-3 mb-4 sm:flex-row sm:flex-wrap sm:justify-center"
    >
      <div
        class="flex flex-col sm:flex-row items-center gap-3 min-w-0 w-full sm:w-auto justify-center"
      >
        <div
          class="w-11 h-11 rounded-[4px] bg-cover bg-center shrink-0 border border-[#5c0000]"
          :style="{ backgroundImage: `url(${user.avatar || '/img/user/userImage.png'})` }"
        />
        <div class="min-w-0 max-w-full">
          <p
            class="font-Rubik font-bold text-sm sm:text-[0.9375rem] leading-tight text-white text-center"
          >
            <span class="text-white">{{ user.name }}</span>
            <span class="text-white"> ${{ formatMoney(user.value) }}</span>
            <span class="text-white"> | {{ formatChance(user.chance) }}%</span>
            &nbsp;&nbsp;
            <span class="text-white/75 font-semibold text-xs sm:text-sm">
              {{ ticketDisplay.low }}% – {{ ticketDisplay.high }}%
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
          <path :d="piePath" fill="#ffffff" />
        </svg>
      </div>
    </div>

    <div v-if="skinList.length === 0" class="py-2 text-white/50 font-Rubik text-xs">
      No skins in this entry
    </div>
    <div v-else class="flex flex-wrap gap-2 justify-center">
      <div
        v-for="(skin, si) in skinList"
        :key="skinKey(skin, si)"
        class="w-[calc(50%-0.25rem)] sm:w-[118px] bg-[#5c0000] min-h-[112px] flex flex-col items-center justify-center px-2 py-3 rounded-md border border-[#6b1515]/60"
      >
        <img
          :src="skinImageUrl(skin)"
          class="max-w-[56px] max-h-[56px] object-contain"
          alt=""
        />
        <span
          class="w-full text-center truncate font-Rubik font-semibold text-white/90 text-[11px] sm:text-xs mt-2 leading-tight"
          :title="skinName(skin)"
        >
          {{ skinName(skin) }}
        </span>
        <span class="font-Rubik text-white text-sm font-bold mt-0.5 tabular-nums">
          ${{ formatMoney(skinPrice(skin)) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { normalizeSteamEconomyImageUrl, toNumber } from '@/services/jackpotClient'

export default {
  name: 'JackpotRow',
  props: {
    user: {
      type: Object,
      required: true
    },
    pot_value: Number
  },
  computed: {
    skinList() {
      const u = this.user || {}
      const raw = u.items ?? u.skins
      return Array.isArray(raw) ? raw : []
    },
    wheelBounds() {
      return this.readTicketWheelBounds(this.user || {})
    },
    /**
     * White slice = share of 0–100 wheel. Uses chance when API omits ticket % (0–0) or sends bogus 0–100.
     */
    pieRange() {
      const { low: lo, high: hi, chance: ch } = this.wheelBounds
      let low = lo
      let high = hi
      if (low > high) {
        const t = low
        low = high
        high = t
      }
      const span = high - low
      const c = Math.min(100, Math.max(0, ch))

      const missingOrZero = low <= 0 && high <= 0
      const tinySpan = span <= 1e-6
      // Backend sometimes sends 0–100 as placeholder; pie would look ~100% white while text shows ~25% chance
      const bogusFullWheel =
        c > 0 &&
        c < 99 &&
        span >= 99.5 &&
        low < 1 &&
        Math.abs(span - c) > 3

      if (c > 0 && (missingOrZero || tinySpan || bogusFullWheel)) {
        return { start: 0, end: c }
      }

      if (high <= low) {
        return { start: 0, end: c > 0 ? c : 0.01 }
      }

      return { start: low, end: high }
    },
    ticketDisplay() {
      const { low: lo, high: hi, chance: ch } = this.wheelBounds
      let low = lo
      let high = hi
      if (low > high) {
        const t = low
        low = high
        high = t
      }
      const span = high - low
      const c = Math.min(100, Math.max(0, ch))
      const fmt = (n) =>
        Number(n).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })

      const missingOrZero = low <= 0 && high <= 0
      const tinySpan = span <= 1e-6
      const bogusFullWheel =
        c > 0 &&
        c < 99 &&
        span >= 99.5 &&
        low < 1 &&
        Math.abs(span - c) > 3

      if (c > 0 && (missingOrZero || tinySpan || bogusFullWheel)) {
        return { low: fmt(0), high: fmt(c) }
      }

      return { low: fmt(low), high: fmt(high) }
    },
    piePath() {
      return this.calculatePath(this.pieRange.start, this.pieRange.end)
    }
  },
  methods: {
    readTicketWheelBounds(u) {
      let low = NaN
      let high = NaN

      const r = u.percentage_ticket_range || u.ticketRange
      if (r && typeof r === 'object' && !Array.isArray(r)) {
        low = toNumber(r.lowest ?? r.min ?? r.from, NaN)
        high = toNumber(r.highest ?? r.max ?? r.to, NaN)
      } else if (Array.isArray(r) && r.length >= 2) {
        low = toNumber(r[0], NaN)
        high = toNumber(r[1], NaN)
      }

      if (!Number.isFinite(low) || !Number.isFinite(high)) {
        if (Array.isArray(u.ticket_range) && u.ticket_range.length >= 2) {
          low = toNumber(u.ticket_range[0], 0)
          high = toNumber(u.ticket_range[1], 0)
        } else {
          low = toNumber(u.ticket_min ?? u.lowest ?? u.ticket_low, NaN)
          high = toNumber(u.ticket_max ?? u.highest ?? u.ticket_high, NaN)
        }
      }

      low = Number.isFinite(low) ? Math.max(0, low) : 0
      high = Number.isFinite(high) ? Math.max(0, high) : 0
      const chance = toNumber(u.chance ?? u.percentage, 0)

      return { low, high, chance }
    },
    skinKey(skin, si) {
      const id = skin?.id ?? skin?.assetid ?? skin?.offerid ?? skin?.name
      return `${si}-${id ?? si}`
    },
    skinName(skin) {
      return skin?.name ?? skin?.market_hash_name ?? 'Item'
    },
    skinPrice(skin) {
      const n = Number(skin?.price ?? skin?.value ?? skin?.amount ?? 0)
      return Number.isFinite(n) ? n : 0
    },
    skinImageUrl(skin) {
      const raw = skin?.image ?? skin?.icon_url ?? skin?.icon ?? ''
      return normalizeSteamEconomyImageUrl(raw) || raw
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
    percentageToRadians(percentage) {
      return (Math.min(100, Math.max(0, Number(percentage))) / 100) * 2 * Math.PI
    },
    calculatePath(lowest, highest) {
      let startAngle = this.percentageToRadians(lowest)
      let endAngle = this.percentageToRadians(highest)
      if (endAngle <= startAngle) endAngle = startAngle + 0.0001
      const delta = endAngle - startAngle
      const startX = Math.cos(startAngle)
      const startY = Math.sin(startAngle)
      const endX = Math.cos(endAngle)
      const endY = Math.sin(endAngle)
      const largeArcFlag = delta <= Math.PI ? 0 : 1
      return `M 0 0 L ${startX} ${startY} A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY} Z`
    }
  }
}
</script>
