<template>
  <div class="table-wrapper w-full">
    <TableFilters
      :search="{ value: searchQuery, placeholder: 'SEARCH GAME...' }"
      :filters="filterOptions"
      @search="searchQuery = $event"
      @update-filter="updateFilter"
    />
    <table class="theme-table">
      <thead>
        <tr>
          <th>
            <div class="sorting-icon-wrap">
              <span>Log ID</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>User</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Log</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Association</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Time</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in paginatedTableData" :key="index">
          <td>{{ item.logId }}</td>
          <td>
            <div class="img-cell">
              <img width="20" height="20" :src="item.avatar" alt="avatar" />
              <img width="20" height="20" :src="item.rank" alt="icon" />
              <span class="username">{{ item.name }}</span>
              <span class="username">|</span>
              <span class="username">{{ item.hash }}</span>
            </div>
          </td>
          <td v-if="item.log == true">
            <div class="img-cell">
              <span class="username">Opened a</span>
              <img width="20" height="20" src="/img/icons/gun.png" alt="img" />
              <span class="status red">Hell_GG_AK47</span>
              <span class="username">Worth</span>
              <img width="14" height="14" src="/img/dollarCoin.png" alt="img" />
              <span class="username">on</span>
              <img width="20" height="24" src="/img/icons/chest.png" alt="img" />
              <span class="status green capitalize">Test Case</span>
            </div>
          </td>
          <td>{{ item.association }}</td>
          <td>{{ item.time }}</td>
        </tr>
      </tbody>
    </table>
    <TablePagination :total-items="logs.length" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import TableFilters from "@/components/table/TableFilters.vue";
import TablePagination from "@/components/table/TablePagination.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "LogsTable",
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
          items: ["NAME", "STEAM ID", "FILTER #3", "FILTER #4", "FILTER #5"],
        },
        order_by: {
          label: "ORDER BY",
          selected: "ASC",
          items: ["ASC", "DESC"],
        },
        order_type: {
          label: "ORDER",
          selected: "DEFAULT",
          items: [
            "DEFAULT",
            "ID",
            "LEVEL",
            "BALANCE",
            "AFFILIATE BALANCE",
            "TOTAL WITHDRAWN",
            "AFFILIATE EARNED",
            "REWARD EARNED",
          ],
        },
      },
      page: 1,
      rows: 10,
      isModalOpen: false,
      modalType: "",
      selectedItem: null,
      logs: Array(15).fill({
        name: "CleverBoy",
        avatar: "/img/icons/clever-boy.png",
        rank: "/img/icons/clever-rank.png",
        hash: "76xxx3680",
        log: true,
        logId: "123456789",
        association: "Just a random text for now",
        time: "19-11-2025 | 7:35",
      }),
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
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.logs.slice(start, start + this.rows);
    },
  },
};
</script>
