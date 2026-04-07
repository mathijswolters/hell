<template>
  <div class="container-class">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:gap-5 gap-3 w-full">
      <div class="bg-[#620101] py-[35px] px-[10px] text-center text-white font-[700]">
        <h3 class="xl:text-[18px] text-md mb-3">Total Rewards Paid Out</h3>
        <h2 class="xl:text-[35px] text-xl font-[800]">
          <span class="text-[#04AB53] font-[800]">$</span>12,156.59
        </h2>
      </div>
      <div class="bg-[#620101] py-[35px] px-[10px] text-center text-white font-[700]">
        <h3 class="xl:text-[18px] text-md mb-3">Total Players Rewarded</h3>
        <h2 class="xl:text-[35px] text-xl font-[800]">10,000</h2>
      </div>
      <div class="bg-[#620101] py-[35px] px-[10px] text-center text-white font-[700]">
        <h3 class="xl:text-[18px] text-md mb-3">Level Cases Opened (and earned)</h3>
        <h2 class="xl:text-[35px] text-xl font-[800]">5</h2>
      </div>
      <div class="bg-[#620101] py-[35px] px-[10px] text-center text-white font-[700]">
        <h3 class="xl:text-[18px] text-md mb-3">Faucets Claimed (and earned)</h3>
        <h2 class="xl:text-[35px] text-xl font-[800]">12</h2>
      </div>
    </div>
    <div class="graph-container">
      <div class="flex md:flex-row flex-col-reverse gap-2 justify-end items-center py-6">
        <div
          class="flex items-center flex-wrap gap-x-4 rounded-[2px] bg-[#620101] md:p-2 p-1 px-2 relative"
        >
          <span
            class="text-white lg:text-[1rem] text-[12px] font-bold font-[rubik] uppercase"
          >
            Show Statistics For
          </span>

          <div class="relative">
            <div
              @click.stop="isOpen = !isOpen"
              class="dropdown-mock active md:p-2 p-1"
              :class="{ active: isOpen }"
            >
              {{ selectedTimeframe }}
              <svg
                :class="{ 'rotate-180': isOpen }"
                class="transition-transform duration-300"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div v-if="isOpen" class="dropdown-list-container">
              <div
                v-for="option in timeframeOptions"
                :key="option"
                @click.stop="selectOption(option)"
                class="dropdown-item"
                :class="{ 'selected-item': selectedTimeframe === option }"
              >
                {{ option }}
              </div>
            </div>
          </div>

          <div
              class="flex items-center justify-center h-11 relative"
              ref="dropdownContainer"
            >
              <button
                class="bg-[rgba(254,189,17,1)] text-white rounded-sm md:p-2 p-1 font-Rubik font-bold text-base flex items-center gap-x-2 outline-none"
                @click="
                  active_dropdown == 'date'
                    ? (active_dropdown = null)
                    : (active_dropdown = 'date')
                "
              >
                <CalendarIcon class="w-[25px] stroke-white transition-all" />
                <ChevronDownIcon
                  class="w-4 stroke-white transition-all"
                  :class="{
                    '-rotate-180': active_dropdown == 'date',
                    'z-20': active_dropdown != 'date',
                  }"
                />
              </button>
              <div
                class="absolute bg-[#420101] rounded-md border border-solid border-[#620101] right-0 transition-all flex items-center justify-center"
                :class="{
                  'w-0 h-0 opacity-0 top-0  mt-0 -z-10': active_dropdown != 'date',
                  'md:w-[387px] w-[300px] h-[345px] opacity-100 top-full mt-1.5 z-10':
                    active_dropdown == 'date',
                }"
              >
                <DatePicker
                  :class="{
                    'opacity-0': active_dropdown != 'date',
                    'opacity-100 transition-opacity duration-500':
                      active_dropdown == 'date',
                  }"
                />
              </div>
            </div>
        </div>
      </div>

      <div class="border-t border-[#620101]">
        <RewardsGraph :timeframe="selectedTimeframe" />
      </div>
    </div>
    <div
      class="grid grid-cols-2 gap-3 w-full border-b border-t border-[#620101] my-4 py-6"
    >
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap sm:flex-row flex-col sm:text-left text-center"
      >
        <h3 class="text-[16px] opacity-[0.5]">Total Rewarded</h3>
        <h2 class="text-[22px] font-[800]">
          <span class="text-[#04AB53] font-[800]">$</span>15,000.12
        </h2>
      </div>
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap sm:flex-row flex-col sm:text-left text-center"
      >
        <h3 class="text-[16px] opacity-[0.5]">Faucets Claimed</h3>
        <h2 class="text-[22px] font-[800]">
          <span class="text-[#04AB53] font-[800]">$</span>7,500.12
        </h2>
      </div>
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap sm:flex-row flex-col sm:text-left text-center"
      >
        <h3 class="text-[16px] opacity-[0.5]">Level Cases Opened</h3>
        <h2 class="text-[22px] font-[800]">10</h2>
      </div>
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap sm:flex-row flex-col sm:text-left text-center"
      >
        <h3 class="text-[16px] opacity-[0.5]">Faucet Rewarded</h3>
        <h2 class="text-[22px] font-[800]">2</h2>
      </div>
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap sm:flex-row flex-col sm:text-left text-center"
      >
        <h3 class="text-[16px] opacity-[0.5]">Level Cases Rewarded</h3>
        <h2 class="text-[22px] font-[800]">2</h2>
      </div>
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap sm:flex-row flex-col sm:text-left text-center"
      >
        <h3 class="text-[16px] opacity-[0.5]">Users Rewarded</h3>
        <h2 class="text-[22px] font-[800]">50</h2>
      </div>
    </div>
  </div>
</template>

<script>
import RewardsGraph from "@/components/rewards/RewardsGraph.vue";
import { CalendarIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";
import DatePicker from "@/components/DatePicker.vue";

export default {
  name: "StatsGraph",
  components: {
    RewardsGraph,
    ChevronDownIcon,
    CalendarIcon,
    DatePicker,
  },
  data() {
    return {
      active_dropdown: null,
      isOpen: false,
      selectedTimeframe: "1 YEAR",
      timeframeOptions: ["24 HOURS", "7 DAYS", "1 MONTH", "6 MONTHS", "1 YEAR"],
      bottomStats: [
        { label: "Total Rewarded", value: "15,000.12", isMoney: true },
        { label: "Faucets Claimed", value: "7,500.12", isMoney: true },
        { label: "Level Cases Opened", value: "10", isMoney: false },
        { label: "Faucet Rewarded", value: "2", isMoney: false },
        { label: "Level Cases Rewarded", value: "2", isMoney: false },
        { label: "Users Rewarded", value: "50", isMoney: false },
      ],
    };
  },
  methods: {
    selectOption(option) {
      this.selectedTimeframe = option;
      this.isOpen = false;
      this.$emit("timeframeChanged", option);
    },
    closeDropdown() {
      this.isOpen = false;
    },
  },
  mounted() {
    window.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<style scoped>
.graph-container {
  background-color: transparent;
  width: 100%;
  margin: 20px 0;
  font-family: "rubik";
}
</style>
