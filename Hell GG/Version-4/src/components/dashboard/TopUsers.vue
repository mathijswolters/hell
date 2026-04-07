<template>
  <div class="table-container relative">
    <h2 class="table-title">Top Users</h2>

    <div class="table-wrapper">
      <div
        class="w-full flex md:flex-row flex-col justify-between items-center gap-1 mb-4"
      >
        <div class="w-full flex text-[10px] items-center gap-1 mb-4">
          <button class="theme-btn active">Wagered</button>
          <button class="theme-btn">Raked</button>
          <button class="theme-btn">Aff Reward</button>
          <button class="theme-btn">Reward</button>
          <button class="theme-btn">Withdrawn</button>
        </div>
        <div class="w-full flex md:justify-end items-center gap-1 mb-4">
          <button class="theme-btn text-[10px] active">Day</button>
          <button class="theme-btn text-[10px]">Week</button>
          <button class="theme-btn text-[10px]">Month</button>
          <button class="theme-btn text-[10px]">All Time</button>
          <div
            class="flex items-center justify-center w-[50px] md:h-9 h-8 relative"
            ref="dropdownContainer"
          >
            <button
              class="h-full w-full text-center bg-[rgba(254,189,17,1)] text-white rounded-sm font-Rubik font-bold text-base flex items-center justify-center gap-x-1 outline-none"
              @click="
                active_dropdown == 'date'
                  ? (active_dropdown = null)
                  : (active_dropdown = 'date')
              "
            >
              <CalendarIcon class="w-[20px] stroke-white transition-all" />
              <ChevronDownIcon
                class="w-3 stroke-white transition-all"
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

      <table class="theme-table">
        <thead>
          <tr>
            <th>
              <div class="sorting-icon-wrap">
                <span>Name</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Reward</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Wagered</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Raked</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Affiliates Reward</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Withdrawn</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedTableData" :key="index">
            <td>
              <div class="img-cell">
                <img width="20" height="20" :src="item.avatar" alt="avatar" />
                <img width="20" height="20" :src="item.rank" alt="icon" />
                <span class="username">{{ item.name }}</span>
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" alt="coin" width="14" height="14" />
                {{ item.amount }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" alt="coin" width="14" height="14" />
                {{ item.amount }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" alt="coin" width="14" height="14" />
                {{ item.amount }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" alt="coin" width="14" height="14" />
                {{ item.amount }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" alt="coin" width="14" height="14" />
                {{ item.amount }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <TablePagination :total-items="users.length" @page-changed="onPageChanged" />
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3 class="uppercase font-bold text-white mb-4">
          {{ modalType === "skins" ? "Skins for " : "Cancel Withdraw: " }}
          {{ selectedItem?.name }}
        </h3>
        <p class="text-gray-400 mb-6">
          Are you sure you want to proceed with this action?
        </p>
        <div class="flex gap-4 justify-end">
          <button @click="closeModal" class="px-4 py-2 bg-gray-700 rounded text-white">
            Close
          </button>
          <button class="px-4 py-2 bg-[#ff3435] rounded text-white font-bold">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";
import { CalendarIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";
import DatePicker from "@/components/DatePicker.vue";
export default {
  name: "TopUsers",
  components: {
    TablePagination,
    ChevronUpDownIcon,
    ChevronDownIcon,
    CalendarIcon,
    DatePicker,
  },
  data() {
    return {
      active_dropdown: null,
      page: 1,
      rows: 10,
      isModalOpen: false,
      modalType: "", // 'skins' or 'cancel'
      selectedItem: null,
      users: Array(15).fill({
        name: "Sleepydexter",
        avatar: "/img/icons/clever-girl.png",
        rank: "/img/icons/clever-rank.png",
        amount: "17,857.69",
      }),
    };
  },
  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.users.slice(start, start + this.rows);
    },
  },
};
</script>
