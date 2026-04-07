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
              <span>Loser</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Winning Coin</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th class="w-[90px]">
            <div class="sorting-icon-wrap">
              <span>Status</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th class="w-[50px]">
            <div class="sorting-icon-wrap">
              <span>Skins</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th class="w-[120px]">
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
        <tr v-for="(item, index) in paginatedTableData" :key="index">
          <td>{{ item.game_id }}</td>

          <td>
            <div class="img-cell">
              <img width="20" height="20" :src="item.winner_avatar" alt="winner_avatar" />
              <img width="20" height="20" :src="item.winner_rank" alt="winner_rank" />
              <span class="username">{{ item.winner_name }}</span
              >|
              <img width="14" height="14" src="/img/dollarCoin.png" alt="winner_rank" />
              <div class="status green">{{ item.winner_margin }}</div>
              |
              <span class="username">{{ item.winner_percentage }}</span>
            </div>
          </td>

          <td>
            <div class="img-cell">
              <img width="20" height="20" :src="item.loser_avatar" alt="loser_avatar" />
              <img width="20" height="20" :src="item.loser_rank" alt="loser_rank" />
              <span class="username">{{ item.loser_name }}</span
              >|
              <img width="14" height="14" src="/img/dollarCoin.png" alt="loser_rank" />
              <div class="status green">{{ item.loser_margin }}</div>
              |
              <span class="username">{{ item.loser_percentage }}</span>
            </div>
          </td>

          <td>
            <div class="img-cell">
              <img :src="item.coin" width="20" />
            </div>
          </td>

          <td>
            <div :class="['status', getStatusColor(item.status)]">
              {{ item.status.toUpperCase() }}
            </div>
          </td>

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

    <TablePagination :total-items="histories.length" @page-changed="onPageChanged" />
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
      histories: Array.from({ length: 20 }, (_, i) => ({
        game_id: `25168${i}`,
        winner_name: `bot_${16000 + i}`,
        winner_avatar:
          i % 2 === 0 ? "/img/icons/clever-boy.png" : "/img/icons/clever-girl.png",
        winner_rank: "/img/icons/clever-rank.png",
        winner_percentage: "99.99%",
        winner_margin: "100.00",

        loser_name: "ScubaJake",
        loser_avatar:
          i % 2 === 0 ? "/img/icons/clever-girl.png" : "/img/icons/clever-boy.png",
        loser_rank: "/img/icons/clever-rank.png",
        loser_percentage: "1.00%",
        loser_margin: "1.00",

        status: i % 2 === 0 ? "accepted" : "REHOSTED",
        coin: i % 2 === 0 ? "/img/coins/heaven.svg" : "/img/coins/hell.svg",

        skins: "15",
        rake: "52.00",
        rake_percentage: "10%",
        ref_bonus: i % 2 === 0 ? "4.69" : "1.29",
        time: i % 2 === 0 ? "08-11-2025 | 16:35" : "14-11-2025 | 13:35",
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
        case "REHOSTED":
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
      return this.histories.slice(start, start + this.rows);
    },
  },
};
</script>
