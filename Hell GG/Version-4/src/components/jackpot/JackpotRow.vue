<template>
  <div class="flex items-center flex-col justify-center gap-y-3">
    <div class="w-full justify-center relative flex flex-wrap items-center">
      <div class="flex items-center gap-x-2">
        <div
          class="w-[40px] h-[40px] rounded-[4px] bg-no-repeat bg-center bg-cover"
          :style="{
            backgroundImage: `url(${user.avatar})`
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
            Number(user.chance).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 0
            })
          }}%</span
        >
      </div>
      <div class="flex items-center gap-x-3 justify-center w-full sm:w-fit md:justify-end md:absolute right-2">
        <span class="text-white font-Rubik text-sm font-bold opacity-70"
          >{{
            Number(user.percentage_ticket_range.lowest).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })
          }}
          % -
          {{
            Number(user.percentage_ticket_range.highest).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })
          }}%</span
        >
        <svg
          viewBox="-1 -1 2 2"
          xmlns="http://www.w3.org/2000/svg"
          class="w-[40px] h-[40px] rounded-full -rotate-90"
        >
          <!-- Background circle (brown part) -->
          <circle cx="0" cy="0" r="1" fill="rgba(4, 171, 83, 0.2)" />
          <!-- White slice -->
          <path
            :d="
              calculatePath(
                user.percentage_ticket_range.lowest,
                user.percentage_ticket_range.highest
              )
            "
            fill="white"
          />
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
  computed: {},
  methods: {
    /**
     * Converts a percentage into radians.
     */
    percentageToRadians(percentage) {
      return (percentage / 100) * 2 * Math.PI
    },
    /**
     * Calculates the SVG path for the white slice of the pie.
     */
    calculatePath(lowest, highest) {
      const startAngle = this.percentageToRadians(lowest)
      const endAngle = this.percentageToRadians(highest)

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
