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
              <span>User</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Steam ID</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Total Rewarded</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Cases Rewarded</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Cases Opened</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Faucet Rewarded</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Faucet Claimed</span>
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

          <td>{{ item.streamId }}</td>

          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.total }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.total }}
            </div>
          </td>

          <td>{{ item.cases }}</td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.faucet }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.total }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <TablePagination :total-items="rewards.length" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import TableFilters from "@/components/table/TableFilters.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "RewardsTable",
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
      rewards: Array(15).fill({
        name: "CleverBoy",
        avatar: "/img/icons/clever-boy.png",
        rank: "/img/icons/clever-rank.png",
        streamId: "76561199133",
        total: "150.15",
        faucet: "75.15",
        cases: "2",
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
      return this.rewards.slice(start, start + this.rows);
    },
  },
};
</script>
