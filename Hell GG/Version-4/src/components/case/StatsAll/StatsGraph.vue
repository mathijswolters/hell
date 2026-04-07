<template>
  <div class="container-class">
    <div
      class="flex justify-between items-center w-full gap-2 flex-wrap md:py-[22px] pb-0"
    >
      <div class="flex gap-2 items-center">
        <router-link
          :to="{ name: 'CaseCreator' }"
          class="text-[16px] flex items-center font-[800] bg-[#FF3435] px-[16px] py-3 text-white"
        >
          <ChevronLeftIcon class="w-[20px] me-2" /> BACK TO CASES
        </router-link>
      </div>
      <div class="text-[14px] flex lg:justify-end items-center flex-wrap gap-2">
        
      </div>
    </div>

    <div
      class="md:max-w-[90%] mx-auto grid grid-cols-2 gap-3 w-full border-b border-t border-[#620101] my-4 py-6"
    >
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap"
      >
        <h3 class="text-[16px] opacity-[0.5]">Cases Opened</h3>
        <h2 class="text-[22px] font-[800]">23</h2>
      </div>
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap"
      >
        <h3 class="text-[16px] opacity-[0.5]">Profit</h3>
        <h2 class="text-[22px] font-[800]">
          <span class="text-[#04AB53] font-[800]">$7,500.12</span>
        </h2>
      </div>
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap"
      >
        <h3 class="text-[16px] opacity-[0.5]">Paid Out</h3>
        <h2 class="text-[22px] font-[800]">
          <span class="text-[#04AB53] font-[800]">$</span>25,156.16
        </h2>
      </div>
      <div
        class="bg-[#620101] py-[15px] px-[14px] text-white font-[800] flex items-center justify-between gap-3 flex-wrap"
      >
        <h3 class="text-[16px] opacity-[0.5]">People Opened Cases</h3>
        <h2 class="text-[22px] font-[800]">23</h2>
      </div>
    </div>

    <div class="graph-container md:max-w-[90%]">
      <div
        class="flex md:flex-row flex-col-reverse gap-2 flex-wrap justify-between items-center pb-6"
      >
        <div class="flex items-center gap-4 rounded-[2px] bg-[#180A0D] px-2 p-1">
          <span
            class="text-white lg:text-[1rem] text-[12px] font-bold font-[rubik] uppercase"
            >MOST POPULAR CASE:</span
          >
          <img src="/img/icons/case.svg" width="46" height="46" alt="case icon" />
          <span
            class="text-[#D7B7B7] lg:text-[1rem] text-[12px] font-bold font-[rubik] uppercase"
            >TEST_CASE_1</span
          >
        </div>

        <div
          class="flex items-center flex-wrap gap-x-4 rounded-[2px] bg-[#620101] md:p-2 p-1 px-2 relative"
        >
          <span
            class="text-white lg:text-[1rem] text-[12px] font-bold font-[rubik] uppercase"
            >Show Statistics For</span
          >

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
        <GraphChart :timeframe="selectedTimeframe" />
      </div>
    </div>
  </div>
</template>

<script>
import GraphChart from "@/components/case/StatsAll/GraphChart.vue";
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { CalendarIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";
import DatePicker from "@/components/DatePicker.vue";

export default {
  name: "StatsGraph",

  components: {
    GraphChart,
    ChevronLeftIcon,
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
      caseStats: [
        { label: "Cases Opened", value: "23", isMoney: false },
        { label: "Profit", value: "7,500.12", isMoney: true },
        { label: "Paid Out", value: "25,156.16", isMoney: true },
        { label: "People Opened Cases", value: "23", isMoney: false },
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
  margin: 20px auto;
  font-family: "rubik";
}
</style>
