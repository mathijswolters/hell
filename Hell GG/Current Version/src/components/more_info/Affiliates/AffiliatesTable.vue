<template>
  <div class="table-wrapper w-full pt-5">
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
              <span>ID</span>
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
              <span>Steam ID</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Game</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Game ID</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Game Value</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Game Raked</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Commission</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Balance</span>
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
          <td>{{ item.id }}</td>
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
              <img src="/img/icons/jackpot-green.svg" width="14" />{{ item.game }}
            </div>
          </td>
          <td>{{ item.game_id }}</td>

          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.value }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.raked }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.commission }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.balance }}
            </div>
          </td>

          <td>{{ item.time }}</td>
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
      searchQuery: "",
      filterOptions: {
        filter_by: {
          label: "FILTER",
          selected: "NAME",
          items: ["NAME", "STEAM ID", "FILTER #3"],
        },
      },
      page: 1,
      rows: 10,
      affiliates: Array(15).fill({
        id: "EQYRNXKDHS",
        name: "Sleepydexter",
        avatar: "/img/icons/clever-girl.png",
        rank: "/img/icons/clever-rank.png",
        streamId: "76561198304682871",
        game: "JACKPOT HOSTING",
        game_id: "2516828",
        value: "236.98",
        raked: "4.69",
        commission: "4.69",
        balance: "1000.00",
        time: "08-11-2025 | 16:35",
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
