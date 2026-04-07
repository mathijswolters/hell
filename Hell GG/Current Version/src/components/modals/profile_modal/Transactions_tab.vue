<template>
  <div class="relative w-full flex-col transform transition-all">
    <!-- Body Start -->
    <div class="flex items-center flex-col gap-2">
      <!-- controls start -->
      <div
        class="w-full flex items-center justify-center gap-4 lg:justify-between flex-wrap"
      >
        <!-- Left -->
        <div class="flex items-center justify-start gap-2 sm:gap-x-2 flex-wrap">
          <div class="relative h-full">
            <div
              class="h-11 w-[270px] flex items-center justify-between bg-[#620101] px-2 text-base font-Rubik font-bold text-[rgb(255,255,255,0.5)] cursor-pointer rounded-sm relative z-20"
              @click="
                active_dropdown == 'types'
                  ? (active_dropdown = null)
                  : (active_dropdown = 'types')
              "
            >
              <span
                class="flex items-center gap-x-1 text-base font-Rubik font-bold text-[rgb(255,255,255,0.5)]"
              >
                TYPE:<span
                  class="text-base font-Rubik font-bold text-[rgb(255,255,255,1)] uppercase truncate max-w-[11rem]"
                  >{{ selectedOption }}</span
                >
              </span>

              <ChevronDownIcon
                class="fill-white stroke-white w-5 transition-all"
                :class="{
                  '-rotate-180': active_dropdown == 'types',
                }"
              />
            </div>
            <div
              class="absolute w-full bg-[#620101] left-0 transition-all z-50 top-0 overflow-hidden rounded-b-sm search"
              :class="{
                ' h-0    mt-0 ': active_dropdown != 'types',
                'w-full h-56  mt-[44px]   ': active_dropdown == 'types',
              }"
            >
              <div class="h-full overflow-auto">
                <div
                  v-for="(item, index) in types"
                  :key="index"
                  class="mt-2 rounded-sm hover:bg-[#E82D2E] min-h-[46px] h-[46px] px-2 flex items-center cursor-pointer gap-x-2 capitalize text-white font-Rubik font-extrabold text-base"
                  @click="selectOption(item), (active_dropdown = null)"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <div class="relative flex items-center rounded-sm h-[46px] gap-2">
            <input
              type="text"
              class="h-full rounded-sm px-2 pr-2 w-full bg-[#620101] font-Rubik placeholder:font-Rubik placeholder:text-[rgb(255,255,255,0.5)] text-white placeholder:text-base text-base placeholder:font-bold focus:outline-none z-20"
              placeholder="SEARCH BY ID ..."
              v-model="searchQuery"
            />
            <button
              class="h-[32px] bg-[#FF3435] text-white rounded-sm px-1 font-Rubik font-bold text-base z-20"
            >
              FILTER
            </button>
          </div>
        </div>
        <!-- Right -->
        <div
          class="hidden md:flex items-center h-[32px] relative"
          ref="dropdownContainer"
        >
          <div class="w-full h-full flex items-center justify-start">
            <div
              class="flex gap-x-4 items-center text-[#d7b7b7] font-Rubik font-semibold text-sm sm:text-base bg-[rgba(98,1,1,1)] rounded-sm h-12 px-2"
            >
              NUMBER OF ROWS PER PAGE
              <span
                class="flex items-center rounded-sm w-12 h-8 bg-[rgba(255,52,53,1)] text-white font-Rubik font-semibold text-xs cursor-pointer fill-white stroke-white relative text-center justify-center"
                @click="rows_dropdown = !rows_dropdown"
              >
                {{ rows_per_page }} <ChevronUpDownIcon class="w-4" />
                <div
                  v-if="rows_dropdown"
                  class="w-full absolute left-0 mb-1 top-full bg-[#620101] z-20 flex flex-col"
                >
                  <div
                    v-for="(item, index) in rows_options"
                    :key="index"
                    @click="rows_per_page = item"
                    class="cursor-pointer py-1 hover:bg-[#E82D2E] w-full uppercase text-center justify-center"
                  >
                    {{ item }}
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- controls end -->
      <div class="flex w-full items-center flex-col pt-3 min-h-[6rem] h-full">
        <div class="w-full overflow-y-auto max-h-[95vw] overflow-x-auto">
          <div class="flex flex-col w-[1432px] items-start">
            <!-- title start -->
            <div
              class="grid grid-cols-[repeat(8,minmax(0,1fr))] items-start h-[28px] w-full border-b border-solid border-[#620101]"
            >
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">
                ID
              </div>
              <div class="text-start font-Rubik text-[#d7b7b7] text-sm font-semibold">
                TYPE
              </div>
              <div
                class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start bg-red"
              >
                STATUS
              </div>
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">
                AFFILIATE BALANCE
              </div>
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">
                AMOUNT
              </div>
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">
                CLOSING BALANCE
              </div>
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">
                DATE
              </div>
            </div>
            <!-- title end -->
            <!-- table start -->
            <div
              class="transition-all duration-200 overflow-auto w-full flex flex-col min-h-[20rem] max-h-[60vh] xl:max-h-[33rem] xl:h-[33rem]"
            >
              <div
                class="grid grid-cols-[repeat(8,minmax(0,1fr))] items-center min-h-[54px] h-[54px] w-full border-b border-solid border-[#620101]"
                v-for="item in paginatedData"
                :key="item._id"
              >
                <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">
                  #{{ item._id }}
                </div>
                <div
                  class="text-start font-Rubik text-[rgb(255,2558,255,0.5)] text-xs font-semibold flex items-center gap-x-1 uppercase"
                >
                  <img
                    v-if="item.type.includes('coinflip ')"
                    src="/img/icons/coinflip.svg"
                    class="w-[24px] h-[24px]"
                  />
                  <img
                    v-if="item.type.includes('jackpot')"
                    src="/img/icons/jackpot.svg"
                    class="w-[24px] h-[24px]"
                  />
                  {{ item.type }}
                </div>
                <div
                  class="font-Rubik text-xs font-semibold text-left bg-red uppercase"
                  :class="{
                    'text-[#04AA53]': item.state == 'completed',
                    'text-[#FF3435]': item.state == 'canceled',
                  }"
                >
                  {{ item.state == "in_progress" ? "" : item.state }}
                </div>

                <div
                  class="font-Rubik text-white text-base font-semibold text-left flex gap-x-2 items-center opacity-50"
                >
                  <span
                    class="font-semibold"
                    v-if="item.type == 'code payout' || item.type == 'skin deposit'"
                  >
                    $
                    {{
                      Number(item.affiliate_balance).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })
                    }}</span
                  >
                </div>
                <div
                  class="font-Rubik text-white text-base font-semibold text-left flex gap-x-2 items-center"
                >
                  <span
                    v-if="item.type !== 'skin deposit'"
                    class="font-Rubik font-semibold text-[#04AB53]"
                    :class="{ 'text-[rgba(255,52,53,1)]': item.amount < 0 }"
                    >$
                    {{
                      Number(item.amount).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      })
                    }}
                  </span>
                </div>
                <div
                  class="font-Rubik text-white text-base font-semibold text-left flex gap-x-2 items-center"
                >
                  <span class="font-Rubik font-semibold text-[#04AB53]">$</span>
                  {{
                    Number(item.closing_balance).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })
                  }}
                </div>
                <div
                  class="text-left font-Rubik text-[#d7b7b7] text-xs font-medium uppercase"
                >
                  {{ formatDateTime(item.date) }}
                </div>
                <div
                  class="text-end font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center justify-end"
                >
                  <button
                    class="h-8 bg-[#ff3435] px-4 text-white text-sm font-Rubik font-bold"
                  >
                    VIEW
                  </button>
                </div>
              </div>
            </div>

            <!-- table end -->
          </div>
        </div>
      </div>
    </div>
    <!-- Body End -->
    <!-- Footer Start -->
    <div class="flex h-16 items-center justify-center w-full relative">
      <!-- controls -->
      <div class="absolute flex items-center gap-x-2">
        <button
          :disabled="current_page === 1"
          @click="changePage(current_page - 1)"
          class="flex gap-x-2 items-center stroke-white text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ChevronDoubleLeftIcon class="w-4" /> Previous Page
        </button>
        <div class="flex items-center gap-x-2 w-28 justify-center">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="changePage(page)"
            class="text-[#D7B7B7] font-bold text-base transition-all duration-200 font-Rubik"
            :class="{
              'text-white transition-all duration-200': current_page === page,
            }"
          >
            {{ page }}
          </button>
        </div>

        <button
          :disabled="current_page === totalPages"
          @click="changePage(current_page + 1)"
          class="flex items-center stroke-white gap-x-2 text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60"
        >
          Next Page <ChevronDoubleRightIcon class="w-4" />
        </button>
      </div>
    </div>

    <!-- number of rows per page in mobile  -->
    <div class="flex md:hidden w-full items-center justify-center">
      <div class="flex items-center h-[32px] relative" ref="dropdownContainer">
        <div class="w-full h-full flex items-center justify-start">
          <div
            class="flex gap-x-1 items-center text-[#d7b7b7] font-Rubik font-normal text-xs rounded-sm h-12 px-2"
          >
            ROWS PER PAGE
            <span
              class="flex items-center rounded-sm w-12 h-8 text-white font-Rubik font-semibold text-xs cursor-pointer fill-white stroke-white relative text-center justify-center"
              @click="rows_dropdown = !rows_dropdown"
            >
              {{ rows_per_page }} <ChevronUpDownIcon class="w-4" />
              <div
                v-if="rows_dropdown"
                class="w-full absolute left-0 mb-1 bottom-full bg-[#620101] z-20 flex flex-col"
              >
                <div
                  v-for="(item, index) in rows_options"
                  :key="index"
                  @click="rows_per_page = item"
                  class="cursor-pointer py-1 hover:bg-[#E82D2E] w-full uppercase text-center justify-center"
                >
                  {{ item }}
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer End -->
  </div>
</template>

<script>
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid";

export default {
  data() {
    return {
      numb: 20,
      selectedOption: null,
      types: [
        "all",
        "affiliate code creation",
        "code credit",
        "code payout",
        "skin deposit",
        "withdrawal",
        "winnings",
      ],
      history: [
        {
          type: "coinflip creation",
          _id: 3,
          date: "2024-12-29T17:05",
          state: "in_progress",
          affiliate_balance: 20,
          amount: 10.85,
          closing_balance: 3265.1,
        },
        {
          type: "coinflip creation",
          _id: 32,
          affiliate_balance: 256,
          amount: 10.85,
          closing_balance: 3265.1,
          date: "2024-12-16T18:05",
          state: "completed",
        },
        {
          type: "coinflip creation",
          _id: 325,
          affiliate_balance: 20,
          amount: 10.85,
          closing_balance: 3265.1,
          date: "2024-12-16T18:28",
          state: "canceled",
        },
        {
          type: "code payout",
          _id: 6,
          affiliate_balance: 20,
          amount: 10.85,
          closing_balance: 3265.1,
          date: "2024-12-01T17:05",
          state: "completed",
        },
        {
          type: "withdrawal",
          _id: 7,
          affiliate_balance: 20,
          amount: 10.85,
          closing_balance: 3265.1,
          date: "2024-12-01T17:05",
          state: "completed",
        },
        {
          type: "jackpot",
          _id: 8,
          affiliate_balance: 20,
          amount: 10.85,
          closing_balance: 3265.1,
          date: "2024-12-01T17:05",
          state: "completed",
        },
        {
          type: "winnings",
          _id: 9,
          affiliate_balance: 20,
          amount: 10.85,
          closing_balance: 3265.1,
          date: "2024-12-01T17:05",
          state: "canceled",
        },
        {
          type: "code credit",
          _id: 10,
          affiliate_balance: 20,
          amount: 10.85,
          closing_balance: 3265.1,
          date: "2024-12-01T17:05",
          state: "canceled",
        },
        {
          type: "skin deposit",
          _id: 8,
          affiliate_balance: 20,
          amount: -10.85,
          closing_balance: 3265.1,
          date: "2024-12-01T17:05",
          state: "completed",
        },
        {
          type: "jackpot creation",
          _id: 9,
          affiliate_balance: 20,
          amount: 10.85,
          closing_balance: 3265.1,

          date: "2024-12-01T17:05",
          state: "canceled",
        },
        {
          type: "jackpot creation",
          _id: 10,
          affiliate_balance: 20,
          amount: 10.85,
          closing_balance: 3265.1,
          date: "2024-12-01T17:05",
          state: "completed",
        },
      ],
      searchQuery: "",
      dropdown: null,
      active_dropdown: null,
      rows_dropdown: false,
      rows_per_page: 10,
      current_page: 1,
      rows_options: [10, 20, 30],
      maxVisiblePages: 5,
      //   user_in_page: false
    };
  },
  methods: {
    selectOption(name) {
      this.selectedOption = name === "all" ? null : name;
    },
    searchedPlayer(item) {
      const query = this.searchQuery.toLowerCase();
      return (
        item.players.find((player) =>
          player.name.toLowerCase().includes(query.toLowerCase())
        ) || null
      );
    },
    closeModal() {
      this.$emit("close-modal");
    },

    toggleDropdown(name) {
      this.dropdown = this.dropdown === name ? null : name;
    },
    handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdownContainer;
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.dropdown = null;
      }
    },
    formatDateTime(dateString) {
      const now = new Date();
      const targetDate = new Date(dateString);
      const diffInSeconds = Math.floor((now - targetDate) / 1000);

      // Conditions for relative time
      if (diffInSeconds < 60) {
        return "a minute ago";
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
      } else if (diffInSeconds < 172800) {
        return "a day ago";
      }

      // Fallback: Format fixed date for older entries
      return targetDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.current_page = page;
      }
    },
    calculateTotal(players) {
      let value = 0;
      players.forEach((player) => {
        player.items.forEach((item) => {
          value += item.price;
        });
      });
      return value;
    },
    updatePagination() {
      this.current_page = 1;
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  },
  components: {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronUpDownIcon,
    ChevronDownIcon,
  },
  computed: {
    searchFilteredHistory() {
      if (!this.searchQuery && !this.selectedOption) return this.history;

      const query = this.searchQuery.toLowerCase();
      const typeQuery = this.selectedOption ? this.selectedOption.toLowerCase() : null;

      return this.history.filter((entry) => {
        const matchGameId = entry._id.toString().includes(query);
        const matchType = typeQuery ? entry.type.toLowerCase().includes(typeQuery) : true;
        return matchGameId && matchType;
      });
    },
    totalPages() {
      return Math.ceil(this.searchFilteredHistory.length / this.rows_per_page);
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.rows_per_page;
      const end = start + this.rows_per_page;
      return this.searchFilteredHistory.slice(start, end);
    },
    visiblePages() {
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = Math.max(1, this.current_page - half);
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

      // Adjust start if we're near the end
      if (end - start < this.maxVisiblePages - 1) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
  height: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #d10d0d;
  border-radius: 4px;
}

.radio input {
  position: absolute;
  opacity: 0; /* Hide the default radio button */
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 2px solid #ff3435;
}

.checkmark::after {
  content: "";
  position: absolute;
  /* display: none; */
  opacity: 0;
  left: 3px;
  top: -2px;
  height: 14px;
  width: 16px;
  /* width: 5px;
      height: 10px; */
  /* border: solid white; */
  /* border-width: 0 2px 2px 0;
      transform: rotate(45deg); */
  z-index: 2;
  background-image: url(../assets/img/tick.png);
  background-size: contain;
  transition: opacity ease-in-out 100ms;
}

.radio input:checked ~ .checkmark::after {
  /* display: block; */
  opacity: 1;
}
.search ::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
}
.search ::-webkit-scrollbar-track {
  background: #710101;
}
.search ::-webkit-scrollbar-thumb {
  /* width: 2rem; */

  background: #ff3435;
  border-radius: 4px;
}
</style>
