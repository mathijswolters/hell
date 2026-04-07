<template>
  <div class="table-wrapper">
    <div
      class="w-full flex lg:flex-row flex-col-reverse justify-between gap-1"
    >
      <!-- FILTERS -->
      <TableFilters
        :search="{ value: searchQuery, placeholder: 'SEARCH GAME...' }"
        :filters="filterOptions"
        @search="searchQuery = $event"
        @update-filter="updateFilter"
      />
      <div class="w-full text-[14px] flex lg:justify-end h-max gap-1">
        <router-link
          :to="{ name: 'GameHistoryCoinflip' }"
          class="theme-btn"
          active-class="active"
        >
          Coinflip
        </router-link>

        <router-link
          :to="{ name: 'GameHistoryJackpot' }"
          class="theme-btn"
          active-class="active"
        >
          Jackpot
        </router-link>

        <button class="theme-btn">Tournament</button>
      </div>
    </div>

    <table class="theme-table">
      <thead>
        <tr>
          <th>
            <div class="sorting-icon-wrap">
              <span>Game ID</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Winner</span>
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
              <span>Value</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Bets</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Participants</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Skins</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Rake</span>
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
<th style="width: 108px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in histories" :key="index">
          <td>{{ item.game_id }}</td>

          <td>
            <div class="img-cell">
              <img width="20" height="20" :src="item.winner_avatar" alt="winner_avatar" />
              <img width="20" height="20" :src="item.winner_rank" alt="winner_rank" />
              <span class="username">{{ item.winner_name }}</span
              >|

              <div class="status green">{{ item.winner_percentage }}</div>
            </div>
          </td>

          <td>
            <div :class="['status', getStatusColor(item.status)]">
              {{ item.status.toUpperCase() }}
            </div>
          </td>

          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              {{ item.value }}
            </div>
          </td>
          <td>{{ item.bets }}</td>
          <td>{{ item.participants }}</td>

          <td>{{ item.skins }}</td>

          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              {{ item.rake }} |
              <div class="status green">{{ item.rake_percentage }}</div>
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />
              {{ item.ref_bonus }}
            </div>
          </td>

          <td>{{ item.time }}</td>
          <td>
            <div class="flex items-center gap-1">
              <button class="p-[4px] rounded-[2px] bg-[#FF3435]">
                <img src="/img/icons/ban-user.svg" width="14" alt="img" />
              </button>
              <button class="p-[4px] rounded-[2px] bg-[#72B5FF]">
                <img src="/img/icons/people.svg" width="14" alt="img" />
              </button>
              <button class="p-[4px] rounded-[2px] bg-[#04AB53]">
                <img src="/img/icons/view.svg" width="14" alt="img" />
              </button>
              <button class="p-[4px] rounded-[2px] bg-[#310000]">
                <img src="/img/icons/tick.svg" width="14" alt="img" />
              </button>
              <button class="p-[4px] rounded-[2px] bg-[#FEBD11]">
                <img src="/img/icons/refresh.svg" width="14" alt="img" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table-pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      :rowsPerPage="rowsPerPage"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import TableFilters from "@/components/table/TableFilters.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "CoinflipHistory",
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
        game_id: `25168${i}`,
        winner_name: `bot_${16000 + i}`,
        winner_avatar:
          i % 2 === 0 ? "/img/icons/clever-boy.png" : "/img/icons/clever-girl.png",
        winner_rank: "/img/icons/clever-rank.png",
        winner_percentage: i % 3 === 0 ? "2%" : "15%",
        status: i % 2 === 0 ? "accepted" : "stored",
        value: i % 3 === 0 ? "9.13" : "236.98",
        bets: "1",
        participants: "1",
        skins: "15",
        rake: i % 3 === 0 ? "0.71" : "52.00",
        rake_percentage: "10%",
        ref_bonus: i % 3 === 0 ? "5.00" : "4.69",
        time: i % 3 === 0 ? "08-11-2025 | 5 min ago" : "08-11-2025 | 16:35",
      })),
    };
  },
  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
    getStatusColor(status) {
      switch (status) {
        case "accepted":
          return "green";
        case "declined":
          return "red";
        case "stored":
          return "yellow";
        default:
          return " ";
      }
    },
    updateFilter({ key, value }) {
      this.filterOptions[key].selected = value;
    },
  },
};
</script>
