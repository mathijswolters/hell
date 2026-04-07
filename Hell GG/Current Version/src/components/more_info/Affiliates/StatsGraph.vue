<template>
  <div class="graph-container max-w-[952px] !bg-[#310000] p-2 relative">
    <div class="flex md:flex-row flex-col-reverse gap-2 justify-end items-center pt-1 pb-3">
      <div class="flex items-center flex-wrap gap-x-4 rounded-[2px] bg-[#620101] md:p-2 p-1 px-2">
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
              xmlns="http://www.w3.org/2000/svg"
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
              v-for="option in options"
              :key="option"
              @click="selectOption(option)"
              class="dropdown-item"
              :class="{ 'bg-[#ff3435]': selectedTimeframe === option }"
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

    <div class="border-t border-[#ff343580]">
      <AffiliateHistoryGraph :timeframe="selectedTimeframe" />
    </div>
  </div>
</template>

<script>
import AffiliateHistoryGraph from "./AffiliateHistoryGraph.vue";
import { CalendarIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";
import DatePicker from "@/components/DatePicker.vue";

export default {
  name: "StatsGraph",
  components: {
    AffiliateHistoryGraph,
    ChevronDownIcon,
    CalendarIcon,
    DatePicker,
  },
  data() {
    return {
      active_dropdown: null,
      isOpen: false,
      selectedTimeframe: "1 YEAR",
      options: ["24 HOURS", "7 DAYS", "1 MONTH", "6 MONTHS", "1 YEAR"],
    };
  },
  methods: {
    selectOption(option) {
      this.selectedTimeframe = option;
      this.isOpen = false;

      this.$emit("timeframeChanged", option);
    },
    closeDropdown(e) {
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
  width: 100%;
  margin: 20px auto;
  font-family: "rubik";
}
</style>
