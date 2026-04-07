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
              <span>Hash</span>
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
              <span>Time</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Status</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th style="width: 48px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedTableData" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.hash }}</td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              {{ item.value }}
            </div>
          </td>

          <td>
            <div class="status" :class="getStatusColor(item.status)">
              {{ item.status }}
            </div>
          </td>

          <td>{{ item.time }}</td>
          <td>
            <div class="flex items-center gap-1">
              <button
                @click="openModal('show skins')"
                class="p-[4px] rounded-[2px] bg-[#04AB53]"
              >
                <img src="/img/icons/view.svg" width="14" alt="img" />
              </button>
              <button class="p-[4px] rounded-[2px] bg-[#FEBD11]">
                <img src="/img/icons/refresh.svg" width="14" alt="img" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <TablePagination :total-items="withdraws.length" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import TableFilters from "@/components/table/TableFilters.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";
import { openModal } from "@/modalStore";

export default {
  name: "WithdrawTable",
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
      withdraws: Array.from({ length: 20 }, (_, i) => ({
        id: `EQYRNXKDHS${i}`,
        hash: `0x5fb508c1450a51b257${i}...`,
        value: "236.98",
        status: i % 3 === 0 ? "accepted" : i % 3 === 1 ? "rejected" : "pending",
        time: "08-11-2025 | 16:35",
      })),
    };
  },
  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
    openModal(name, props) {
      openModal(name, props);
    },
    getStatusColor(status) {
      switch (status) {
        case "accepted":
          return "green";
        case "rejected":
          return "red";
        case "pending":
          return "yellow";
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
      return this.withdraws.slice(start, start + this.rows);
    },
  },
};
</script>
