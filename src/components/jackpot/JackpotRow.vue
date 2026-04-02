<template>
  <div class="flex items-center flex-col justify-center gap-y-3">
    <div class="w-full justify-center relative flex flex-wrap items-center">
      <div class="flex items-center gap-x-2">
        <div
          class="w-[40px] h-[40px] rounded-[4px] bg-no-repeat bg-center bg-cover"
          :style="{
            backgroundImage: `url(${user?.avatar ?? '/img/user/userImage.png'})`
          }"
        ></div>
        <span class="text-white font-Rubik text-xl font-bold">{{ user.name }} </span>
        <span class="text-white font-Rubik text-sm font-bold mt-1">
          ${{
            Number(user.value).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })
          }}
          |
          {{
            chancePercentForPie.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 0
            })
          }}%</span
        >
      </div>
      <div
        class="flex items-center gap-x-3 justify-center w-full sm:w-fit md:justify-end md:absolute right-2"
      >
        <span class="text-white font-Rubik text-sm font-bold opacity-70 shrink-0">
          {{
            chancePercentForPie.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 0
            })
          }}%
        </span>
        <svg
          viewBox="-1 -1 2 2"
          xmlns="http://www.w3.org/2000/svg"
          class="w-[40px] h-[40px] rounded-full -rotate-90 shrink-0"
          aria-hidden="true"
        >
          <!-- Background circle (same idea as history details modal) -->
          <circle cx="0" cy="0" r="1" fill="rgba(4, 171, 83, 0.2)" />
          <!-- White slice: API wheel % when valid; else arc 0 → chance% (ticket min/max are often raw numbers, not 0–100). -->
          <circle v-if="pieFullCircle" cx="0" cy="0" r="1" fill="white" />
          <path v-else :d="calculatePath(pieSliceLow, pieSliceHigh)" fill="white" />
        </svg>
      </div>
    </div>
    <div class="w-full flex flex-wrap justify-center gap-1">
      <div
        v-for="item in user.items"
        :key="item._id"
        class="w-[127px] bg-[rgba(95,3,3,1)] h-[134px] flex flex-col items-center justify-center px-4"
      >
        <img :src="item.image" class="max-w-[64px]" />
        <span class="w-full text-center truncate font-Rubik font-semibold text-[#d7b7b7] text-sm">{{
          item.name
        }}</span>
        <span class="font-Rubik text-white text-base font-semibold"
          >${{
            Number(item.price).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })
          }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Jackpot_Lobby',
  props: {
    user: Object,
    pot_value: Number
  },
  data() {
    return {}
  },
  created() {},
  computed: {
    /** 0–100 for labels; supports 0–1 fractional chance from some APIs. */
    chancePercentForPie() {
      const u = this.user
      if (!u) return 0
      let c = Number(u.chance)
      if (!Number.isFinite(c)) c = 0
      if (c > 0 && c <= 1) c *= 100
      return Math.min(100, Math.max(0, c))
    },
    /** 0–100 wheel segment from API `percentage_ticket_range`. */
    ticketRangeLow() {
      const u = this.user
      if (!u) return 0
      const v = u.percentage_ticket_range?.lowest
      const n = Number(v)
      if (!Number.isFinite(n)) return 0
      return Math.min(100, Math.max(0, n))
    },
    ticketRangeHigh() {
      const u = this.user
      if (!u) return 0
      const v = u.percentage_ticket_range?.highest
      const n = Number(v)
      const lo = this.ticketRangeLow
      if (!Number.isFinite(n)) return lo
      return Math.min(100, Math.max(lo, n))
    },
    ticketRangeSpan() {
      return Math.max(0, this.ticketRangeHigh - this.ticketRangeLow)
    },
    /**
     * True when `lowest`/`highest` are real 0–100 wheel positions (not raw ticket integers).
     */
    usePercentWheelFromApi() {
      const lo = this.ticketRangeLow
      const hi = this.ticketRangeHigh
      if (!Number.isFinite(lo) || !Number.isFinite(hi)) return false
      if (hi <= lo) return false
      if (lo < 0 || hi > 100) return false
      return true
    },
    pieSliceLow() {
      return this.usePercentWheelFromApi ? this.ticketRangeLow : 0
    },
    pieSliceHigh() {
      return this.usePercentWheelFromApi ? this.ticketRangeHigh : this.chancePercentForPie
    },
    pieFullCircle() {
      if (this.usePercentWheelFromApi) return this.ticketRangeSpan >= 99.99
      return this.chancePercentForPie >= 99.99
    }
  },
  methods: {
    /**
     * Converts a percentage into radians.
     */
    percentageToRadians(percentage) {
      return (percentage / 100) * 2 * Math.PI
    },
    /**
     * Slice from `lowest%` to `highest%` of a full turn (0–100).
     */
    calculatePath(lowest, highest) {
      const lo = Math.min(100, Math.max(0, Number(lowest) || 0))
      const hi = Math.min(100, Math.max(lo, Number(highest) || 0))
      const startAngle = this.percentageToRadians(lo)
      const endAngle = this.percentageToRadians(hi)

      const startX = Math.cos(startAngle)
      const startY = Math.sin(startAngle)
      const endX = Math.cos(endAngle)
      const endY = Math.sin(endAngle)

      const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1

      return `
        M 0 0
        L ${startX} ${startY}
        A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
      `
    }
  },
  mounted() {},
  beforeUnmount() {},
  watch: {}
}
</script>
<style scoped>
.circle {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg); /* Rotates to start at the top */
}
</style>
