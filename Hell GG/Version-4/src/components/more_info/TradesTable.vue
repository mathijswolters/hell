<template>
  <div class="table-container">
  <div class="table-wrapper">
    <div
      class="w-full flex lg:flex-row flex-col-reverse justify-between items-center gap-1"
    >
      <TableFilters
        :search="{ value: searchQuery, placeholder: 'SEARCH GAME...' }"
        :filters="filterOptions"
        @search="searchQuery = $event"
        @update-filter="updateFilter"
      />
    </div>
<div class="w-full overflow-x-auto">
    <table class="theme-table w-full min-w-[900px]">
      <thead>
        <tr>
          <th> <div class="sorting-icon-wrap"><span>ID</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Sender</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Reciever</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Hash</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Game ID</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Offer ID</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Type</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Balance</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Value</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Time</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th> <div class="sorting-icon-wrap"><span>Status</span><ChevronUpDownIcon class="sorting-icon"/> </div> </th>
          <th style="width: 48px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedTableData" :key="index">
          <td>{{ item.id }}</td>
          <td>
            <div class="img-cell">
              <img width="20" height="20" :src="item.sender_avatar" alt="sender_avatar" />
              <span class="username">{{ item.sender_name }}</span>
              <div class="badge">{{ item.sender_badge }}</div>
              <span class="username">{{ item.sender_code }}</span>
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img
                width="20"
                height="20"
                :src="item.reciever_avatar"
                alt="reciever_avatar"
              />
              <span class="username">{{ item.reciever_name }}</span>
              <div class="badge">{{ item.reciever_badge }}</div>
              <span class="username">{{ item.reciever_code }}</span>
            </div>
          </td>
          <td>{{ item.hash }}</td>
          <td>{{ item.game_id }}</td>
          <td>{{ item.offer_id }}</td>
          <td>
            <div class="img-cell uppercase">
              <img v-if="item.type == 'coinflip'" src="/img/icons/coinflip.svg" width="14" />
              <img v-if="item.type == 'jackpot'" src="/img/icons/jackpot.svg" width="14" />
              {{ item.type }} hosting
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.balance }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.value }}
            </div>
          </td>

          <td>{{ item.time }}</td>

          <td>
            <div :class="['status', getStatusColor(item.status)]">
              {{ item.status }} ({{ item.status_count }})
            </div>
          </td>

          <td>
            <div class="flex items-center gap-1">
              <button class="p-[4px] rounded-[2px] bg-[#04AB53]">
                <img src="/img/icons/view.svg" width="14" alt="img" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
    <TablePagination :total-items="trades.length" @page-changed="onPageChanged" />
  </div>
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import TableFilters from "@/components/table/TableFilters.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "TradesTable",
  components: {
    TableFilters,
    TablePagination,
    ChevronUpDownIcon,
  },
  data() {
    return {
      searchQuery: "",
      filterOptions: {
        filter_by: {
          label: "FILTER",
          selected: "NAME",
          items: ["NAME", "SENDER STEAM ID", "FILTER #3", "FILTER #4", "FILTER #5"],
        },
        order_by: {
          label: "ORDER BY",
          selected: "ASC",
          items: ["ASC", "DESC"],
        },
      },
      page: 1,
      rows: 10,
      isModalOpen: false,
      modalType: "",
      selectedItem: null,
      trades: Array.from({ length: 20 }, (_, i) => ({
        id: `NVYRNXKDHS${i}`,
        sender_name: `bot_${16928 + i}`,
        sender_avatar:
          i % 2 === 0 ? "/img/icons/clever-boy.png" : "/img/icons/clever-girl.png",
        sender_badge: i % 2 === 0 ? "COINFLIP" : "JACKPOT",
        sender_code: `76xxx${3680 + i}`,
        reciever_name: `bot_${592832 + i}`,
        reciever_avatar:
          i % 2 === 0 ? "/img/icons/clever-girl.png" : "/img/icons/clever-boy.png",
        reciever_badge: i % 2 === 0 ? "JACKPOT" : "COINFLIP",
        reciever_code: `76xxx${3680 + i}`,
        hash: `0x5fb508c1450a51b257${i}...`,
        game_id: `251682${i}`,
        offer_id: `${8402806464 + i}`,
        type: i % 2 === 0 ? "coinflip" : "jackpot",
        balance: (i % 2 === 0 ? 500.25 : 245.1).toFixed(2),
        value: (i % 2 === 0 ? 236.98 : 45.1).toFixed(2),
        status: i % 2 === 0 ? "accepted" : "declined",
        status_count: i % 2 === 0 ? 3 : 6,
        time: i % 2 === 0 ? "08-11-2025 | 16:35" : "08-11-2025 | 5 min ago",
      })),
    };
  },
  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
    closesidebar(){
      this.isSidebarOpen = false;
    },
    getStatusColor(status) {
      switch (status) {
        case "accepted":
          return "green";
        case "declined":
          return "red";
        default:
          return " ";
      }
    },
    updateFilter({ key, value }) {
      this.filterOptions[key].selected = value;
    },
  },
  mounted() {
    this.closesidebar();
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.trades.slice(start, start + this.rows);
    },
  },
};
</script>
