<template>
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

    <table class="theme-table">
      <thead>
        <tr>
          <th>
            <div class="sorting-icon-wrap">
              <span>ID</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Type</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Status</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Affialiate Balance</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Amount</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Closing Balance</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Time</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>
<th style="width: 48px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedTableData" :key="index">
          <td>{{ item.id }}</td>
          <td>
            <div class="img-cell">
              <img
                v-if="item.game == 'JACKPOT CREATION'"
                src="/img/icons/jackpot-green.svg"
                width="14"
              />
              {{ item.game }}
            </div>
          </td>
          <td>
            <div class="status" :class="getStatusColor(item.status)">
              {{ item.status }}
            </div>
          </td>

          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              {{ item.affialiate_balance }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              <span v-if="item.amount <= 0" class="status red">
                {{ item.amount }}
              </span>
              <span v-if="item.amount > 0" class="status green">
                {{ item.amount }}
              </span>
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              {{ item.closing_balance }}
            </div>
          </td>
          <td>{{ item.time }}</td>
          <td>
            <button class="table-btn red">VIEW</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- PAGINATION -->
    <TablePagination :total-items="transactions.length" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import TableFilters from "@/components/table/TableFilters.vue";
import TablePagination from "@/components/table/TablePagination.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";
export default {
  name: "TransactionHistoryTable",
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
      transactions: Array.from({ length: 20 }, (_, i) => ({
        id: `TX-${1000 + i}`,
        game: i % 3 === 0 ? "JACKPOT CREATION" : "CODE PAYOUT",
        status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "cancelled" : "pending",
        affialiate_balance: "236.98",
        amount: i % 3 === 1 ? "-236.98" : "236.98",
        closing_balance: "236.98",
        time: "08-11-2025 | 16:35",
      })),
    };
  },
  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
    updateFilter({ key, value }) {
      this.filterOptions[key].selected = value;
    },
    getStatusColor(status) {
      switch (status) {
        case "completed":
          return "green";
        case "cancelled":
          return "red";
        case "pending":
          return "yellow";
        default:
          return " ";
      }
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.transactions.slice(start, start + this.rows);
    },
  },
};
</script>
