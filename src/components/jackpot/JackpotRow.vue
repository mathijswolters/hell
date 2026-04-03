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
        <template v-if="showCumulativeRangeLabel">
            &nbsp;&nbsp;
            <span class="text-white/75 font-semibold text-xs sm:text-sm tabular-nums">
              {{ displayRangeLow.toFixed(2) }}% – {{ displayRangeHigh.toFixed(2) }}%
            </span>
          </template>
        <svg
          viewBox="-1 -1 2 2"
          xmlns="http://www.w3.org/2000/svg"
          class="w-[40px] h-[40px] rounded-full -rotate-90 shrink-0"
          aria-hidden="true"
        >
          <circle cx="0" cy="0" r="1" fill="rgba(92, 0, 0, 0.85)" />
          <circle v-if="pieFullCircle" cx="0" cy="0" r="1" fill="#ffffff" />
          <path v-else :d="calculatePath(pieSliceLow, pieSliceHigh)" fill="#ffffff" />
        </svg>
      </div>
    </div>
    <div class="w-full flex flex-wrap justify-center gap-1">
      <template v-if="depositItem">
        <div
          class="w-[127px] bg-[rgba(95,3,3,1)] h-[134px] flex flex-col items-center justify-center px-4"
        >
          <img :src="depositItem.image" class="max-w-[64px]" />
          <span class="w-full text-center truncate font-Rubik font-semibold text-[#d7b7b7] text-sm">{{
            depositItem.name
          }}</span>
          <span class="font-Rubik text-white text-base font-semibold"
            >${{
              Number(depositItem.price).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}</span
          >
        </div>
      </template>
      <template v-else>
        <div
          v-for="item in user.items || []"
          :key="item._id || item.id"
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
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JackpotRow',
  props: {
    user: Object,
    pot_value: Number,
    /** One skin/deposit row from lobby; omit for legacy whole-player row (e.g. results modal). */
    depositItem: { type: Object, default: null },
    /** Segment % for this deposit (from parent wheel). */
    chancePct: { type: Number, default: null },
    /** Cumulative wheel segment (0–100). */
    rangeLow: { type: Number, default: null },
    rangeHigh: { type: Number, default: null }
  },
  computed: {
    displayDollarValue() {
      if (this.depositItem) return Number(this.depositItem.price ?? 0)
      return Number(this.user?.value ?? 0)
    },
    /** 0–100 for labels; `chancePct` from parent (deposit) overrides user.chance. */
    chancePercentForPie() {
      if (this.chancePct != null && Number.isFinite(this.chancePct)) {
        return Math.min(100, Math.max(0, this.chancePct))
      }
      const u = this.user
      if (!u) return 0
      let c = Number(u.chance)
      if (!Number.isFinite(c)) c = 0
      if (c > 0 && c <= 1) c *= 100
      return Math.min(100, Math.max(0, c))
    },
    useCumulativeFromParent() {
      const lo = this.rangeLow
      const hi = this.rangeHigh
      return Number.isFinite(lo) && Number.isFinite(hi) && hi >= lo
    },
    showCumulativeRangeLabel() {
      return this.useCumulativeFromParent
    },
    displayRangeLow() {
      return this.useCumulativeFromParent ? this.rangeLow : this.ticketRangeLow
    },
    displayRangeHigh() {
      return this.useCumulativeFromParent ? this.rangeHigh : this.ticketRangeHigh
    },
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
    usePercentWheelFromApi() {
      if (this.useCumulativeFromParent) return false
      const lo = this.ticketRangeLow
      const hi = this.ticketRangeHigh
      if (!Number.isFinite(lo) || !Number.isFinite(hi)) return false
      if (hi <= lo) return false
      if (lo < 0 || hi > 100) return false
      return true
    },
    pieSliceLow() {
      if (this.useCumulativeFromParent) return this.rangeLow
      return this.usePercentWheelFromApi ? this.ticketRangeLow : 0
    },
    pieSliceHigh() {
      if (this.useCumulativeFromParent) return this.rangeHigh
      return this.usePercentWheelFromApi ? this.ticketRangeHigh : this.chancePercentForPie
    },
    pieFullCircle() {
      if (this.useCumulativeFromParent) {
        return this.rangeHigh - this.rangeLow >= 99.99
      }
      if (this.usePercentWheelFromApi) return this.ticketRangeSpan >= 99.99
      return this.chancePercentForPie >= 99.99
    }
  },
  methods: {
    percentageToRadians(percentage) {
      return (percentage / 100) * 2 * Math.PI
    },
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
  }
}
</script>
<style scoped>
.circle {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
</style>
