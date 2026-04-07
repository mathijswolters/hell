<template>
  <div class="bg-[#430101] w-full p-5 flex flex-col items-center gap-4">
    <TotalStats />
    <div class="flex flex-col gap-4 w-full">
      <h2 class="text-[18px] font-[800] font-[rubik] text-white text-center">Graph</h2>
      <div class="graph-container">
        <div
          class="flex md:flex-row flex-col-reverse gap-2 justify-between items-center mb-6"
        >
          <div class="relative">
            <div
              @click="showTypeDropdown = !showTypeDropdown"
              class="dropdown-mock md:p-4 p-2 bg-[#FF3435] flex items-center gap-2"
            >
              {{ activeType }}
              <svg
                :class="{ 'rotate-180': showTypeDropdown }"
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

            <div v-if="showTypeDropdown" class="dropdown-list-container">
              <div
                v-for="type in statTypes"
                :key="type.label"
                class="dropdown-item flex gap-2"
                @click="selectType(type.label)"
              >
                <img v-if="type.icon" :src="type.icon" alt="icon" width="16" />
                <span>{{ type.label }}</span>
              </div>
            </div>
          </div>

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
                @click="showTimeDropdown = !showTimeDropdown"
                class="dropdown-mock active md:p-2 p-1"
                :class="{ active: showTimeDropdown }"
              >
                {{ activeTimeframe }}
                <svg
                  :class="{ 'rotate-180': showTimeDropdown }"
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

              <div v-if="showTimeDropdown" class="dropdown-list-container right-0">
                <div
                  v-for="time in timeframes"
                  :key="time"
                  @click="selectTime(time)"
                  class="dropdown-item"
                >
                  {{ time }}
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

        <GraphChart :timeframe="activeTimeframe" :type="activeType" />
      </div>
    </div>
    <RecentWithdraws />

    <UserTransactions />

    <BotTransactions />

    <TopUsers />

    <ToggleOptions />
  </div>
</template>
<script>
import GraphChart from "@/components/dashboard/GraphChart.vue";
import TotalStats from "@/components/dashboard/TotalStats.vue";
import RecentWithdraws from "@/components/dashboard/RecentWithdraws.vue";
import UserTransactions from "@/components/dashboard/UserTransactions.vue";
import TopUsers from "@/components/dashboard/TopUsers.vue";
import ToggleOptions from "@/components/dashboard/ToggleOptions.vue";
import BotTransactions from "@/components/dashboard/BotTransactions.vue";
import { CalendarIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";
import DatePicker from "@/components/DatePicker.vue";

export default {
  components: {
    GraphChart,
    TotalStats,
    RecentWithdraws,
    UserTransactions,
    TopUsers,
    ToggleOptions,
    BotTransactions,
    ChevronDownIcon,
    CalendarIcon,
    DatePicker,
  },
  data() {
    return {
      active_dropdown: null,

      showTypeDropdown: false,
      showTimeDropdown: false,
      activeType: "TOTAL WAGERED",
      activeTimeframe: "6 MONTHS",
      timeframes: ["24 HOURS", "7 DAYS", "1 MONTH", "6 MONTHS", "1 YEAR"],
      statTypes: [
        { label: "TOTAL WAGERED", icon: null },
        { label: "Coinflip", icon: null },
        { label: "Jackpot", icon: null },
        { label: "Tournament", icon: null },
        { label: "TOTAL RAKED", icon: null },
        { label: "TOTAL GAMES", icon: null },
        { label: "UNTAXED GAMES", icon: null },
        { label: "AVERAGE % TAX", icon: null },
        { label: "AFFILIATE EARNINGS", icon: null },
        { label: "REWARD EARNINGS", icon: null },
        { label: "TOTAL WITHDRAW ($)", icon: null },
        { label: "TOTAL WITHDRAW (N)", icon: null },
        { label: "PROMO PAID", icon: null },
        { label: "FAUCED PAID", icon: null },
        { label: "GIFTS", icon: null },
        { label: "LEVEL CASE PAYOUT", icon: null },
      ],
    };
  },
  methods: {
    selectType(type) {
      this.activeType = type;
      this.showTypeDropdown = false;
    },
    selectTime(time) {
      this.activeTimeframe = time;
      this.showTimeDropdown = false;
    },
  },
  mounted() {
    window.addEventListener("click", (e) => {
      if (!this.$el.contains(e.target)) {
        this.showTypeDropdown = false;
        this.showTimeDropdown = false;
      }
    });
  },
};
</script>

<style scoped>
.graph-container {
  background-color: #310000;
  border: 1px solid #ff3435;
  padding: 11px 16px;
  border-radius: 2px;
  width: 100%;
  margin-bottom: 20px;
  font-family: "rubik";
}
</style>
