<template>
  <div class="table-container">
    <div class="table-wrapper">
      <div
        class="w-full flex lg:flex-row flex-col-reverse justify-between items-center gap-x-2"
      >
        <TableFilters
          :search="{ value: searchQuery, placeholder: 'SEARCH GAME...' }"
          :filters="filterOptions"
          @search="searchQuery = $event"
          @update-filter="updateFilter"
        />
        <div
          class="w-full text-[14px] flex lg:justify-end items-center md:flex-nowrap flex-wrap gap-2"
        >
          <button class="theme-btn active">All</button>
          <button class="theme-btn">Contact</button>
          <button class="theme-btn">Jackpot</button>
          <button class="theme-btn">Coinflip</button>
          <button class="theme-btn">Shop</button>
          <button class="theme-btn">Vault</button>
        </div>
      </div>

      <table class="theme-table">
        <thead>
          <tr>
            <th>
              <div class="sorting-icon-wrap">
                <span>Steam ID</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Value</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Items</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Status</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th style="width: 120px">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedTableData" :key="index">
            <td>
              <div class="img-cell">
                <img width="20" height="20" :src="item.avatar" alt="avatar" />
                <span class="username">{{ item.name }}</span>
                <div class="badge">{{ item.type }}</div>
                <span class="username">{{ item.hash }}</span>
              </div>
            </td>

            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" width="14" />{{ item.value }}
              </div>
            </td>

            <td>{{ item.items }}</td>
            <td>
              <div :class="['status', getStatusColor(item.status)]">
                {{ item.status }}
              </div>
            </td>

            <td>
              <button @click="openTradeModal(item.tradeUrl)" class="table-btn green me-1">
                TRADE
              </button>
              <button @click="openModal('popup inventory')" class="table-btn red">
                INVENTORY
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <TablePagination :total-items="bots.length" @page-changed="onPageChanged" />
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeTradeModal">
      <div class="modal-content" @click.stop>
        <h3 class="uppercase font-bold text-white mb-4">Trade URL</h3>
        <textarea
          :value="selectedTradeUrl"
          class="w-full bg-[transparent] border px-3 py-2 mb-3 outline-none rounded text-white"
          readonly
          name=""
          id=""
        >
        </textarea>
        <div class="flex gap-4 justify-end">
          <button
            @click="closeTradeModal"
            class="px-4 py-2 bg-gray-700 rounded text-white"
          >
            Close
          </button>
          <button
            @click="copyTradeUrl"
            class="px-4 py-2 flex items-center gap-2 bg-[#04ab53] rounded text-white font-semibold"
          >
            <img src="/img/icons/copy.svg" alt="icon" width="16" />
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import TableFilters from "@/components/table/TableFilters.vue";
import { openModal } from "@/modalStore";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "Lobby_Page",
  components: {
    TableFilters,
    TablePagination,
    ChevronUpDownIcon,
  },
  data() {
    return {
      searchQuery: "",
      selectedTradeUrl: "",
      filterOptions: {
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
      bots: Array.from({ length: 20 }, (_, i) => ({
        name: i % 2 === 0 ? "bot_592832" : "bot_16928",
        avatar: "/img/icons/clever-boy.png",
        type: i % 2 === 0 ? "shop" : "COINFLIP",
        hash: `76xxx${3680 + i}`,
        value: i % 2 === 0 ? "45.10" : "236.98",
        items: i % 2 === 0 ? "12" : "4",
        status: i % 2 === 0 ? "active" : "inactive",
        tradeUrl: `https://steamcommunity.com/tradeoffer/new/?partner=${
          1000 + i
        }&token=ABC${i}`,
      })),
    };
  },
  methods: {
    openTradeModal(url) {
      this.selectedTradeUrl = url;
      this.isModalOpen = true;
    },

    closeTradeModal() {
      this.isModalOpen = false;
      this.selectedTradeUrl = "";
    },

    copyTradeUrl() {
      navigator.clipboard.writeText(this.selectedTradeUrl);
      this.toaster.success("Trade URL copied!");
    },

    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
    openModal(name, props) {
      openModal(name, props);
    },
    getStatusColor(status) {
      switch (status) {
        case "active":
          return "green";
        case "inactive":
          return "red";
        default:
          return " ";
      }
    },
    updateFilter({ key, value }) {
      this.filterOptions[key].selected = value;
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.bots.slice(start, start + this.rows);
    },
  },
};
</script>
