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
              <span>Wager</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Outcome</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Chance (%)</span>
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
              <span>Ref Data</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Ref Bonus</span>
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
              <img src="/img/icons/jackpot-green.svg" width="14" />
              {{ item.game }}
            </div>
          </td>
          <td>{{ item.game_id }}</td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              {{ item.wager }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              <span v-if="item.outcome <= 0" class="status red">
                {{ item.outcome }}
              </span>
              <span v-if="item.outcome > 0" class="status green">
                {{ item.outcome }}
              </span>
            </div>
          </td>
          <td>{{ item.chance }}</td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              {{ item.raked }} (
              <span class="status green">{{ item.rake_percentage }}</span> |
              <img src="/img/dollarCoin.png" width="14" />

              0.5 user )
            </div>
          </td>

          <td>
            <div class="img-cell">
              <img width="20" height="20" :src="item.avatar" alt="avatar" />
              <img width="20" height="20" :src="item.rank" alt="rank" />
              <span class="username">{{ item.name }}</span
              >|

              <div class="status green">{{ item.percentage }}</div>
            </div>
          </td>

          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              {{ item.ref_bonus }}
            </div>
          </td>

          <td>{{ item.time }}</td>
        </tr>
      </tbody>
    </table>

    <TablePagination :total-items="histories.length" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import TableFilters from "@/components/table/TableFilters.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "WagerHistoryTable",
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
      histories: Array.from({ length: 20 }, (_, i) => ({
        id: `EQYRNXKDHS${i}`,
        game: "JACKPOT HOSTING",
        game_id: `251682${i}`,
        wager: "236.98",
        outcome: i % 2 === 0 ? 206.98 : -206.98,
        chance: "15",
        raked: "52.00",
        rake_percentage: "10%",
        name: i % 2 === 0 ? "Sleepydexter" : "Sleepydexter",
        avatar: i % 2 === 0 ? "/img/icons/clever-boy.png" : "/img/icons/clever-girl.png",
        rank: "/img/icons/clever-rank.png",
        percentage: "15%",
        ref_bonus: "4.69",
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
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.histories.slice(start, start + this.rows);
    },
  },
};
</script>
