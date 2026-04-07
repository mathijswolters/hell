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
              <span>Affiliate Tier</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Code</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Current Balance</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Total Earned</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Earned</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Unique Users</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Games Earned</span>
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
          <td>{{ item.tier }}</td>
          <td>{{ item.code }}</td>

          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.balance }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.total_earned }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.earned }}
            </div>
          </td>

          <td>{{ item.users }}</td>
          <td>{{ item.games_earned }}</td>
        </tr>
      </tbody>
    </table>
    <TablePagination :total-items="affiliates.length" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import TableFilters from "@/components/table/TableFilters.vue";
import TablePagination from "@/components/table/TablePagination.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";
export default {
  name: "AffiliatesTable",
  components: {
    TableFilters,
    TablePagination,
    ChevronUpDownIcon,
  },
  data() {
    return {
      filterOptions: {
        filter_by: {
          label: "FILTER",
          selected: "NAME",
          items: ["NAME", "STEAM ID", "FILTER #3", "FILTER #4", "FILTER #5"],
        },
      },
      searchQuery: "",

      page: 1,
      rows: 10,
      isModalOpen: false,
      modalType: "",
      selectedItem: null,
      affiliates: Array(15).fill({
        name: "CleverBoy",
        avatar: "/img/icons/clever-boy.png",
        rank: "/img/icons/clever-rank.png",
        streamId: "76561198304682871",
        tier: "2",
        code: "DeanCortez",
        balance: "150.15",
        total_earned: "75.15",
        earned: "50.15",
        users: "10",
        games_earned: "5",
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
      return this.affiliates.slice(start, start + this.rows);
    },
  },
};
</script>
