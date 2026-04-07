<template>
  <div class="table-container">
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
        <div class="w-full text-[14px] flex lg:justify-end items-center gap-1">
          <router-link 
          :to="{ name: 'games_coinflip' }" active-class="active" class="theme-btn">Coinflip</router-link>
          <router-link 
          :to="{ name: 'games_jackpot' }" active-class="active" class="theme-btn">Jackpot</router-link>
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
          <tr v-for="(item, index) in paginatedTableData" :key="index">
            <td>{{ item.game_id }}</td>

            <td>
              <div class="img-cell">
                <img
                  width="20"
                  height="20"
                  :src="item.winner_avatar"
                  alt="winner_avatar"
                />
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
                <button class="table-btn red" @click="openModal('IGNORE BOT', item)">
                  IGNORE BOT
                </button>
                <button
                  class="table-btn blue"
                  @click="openModal('SHOW PARTICIPANTS', item)"
                >
                  SHOW PARTICIPANTS
                </button>
                <button class="table-btn green" @click="openModal('SHOW SKINS', item)">
                  SHOW SKINS
                </button>
                <button class="table-btn" @click="openModal('SENT SKINS', item)">
                  SENT SKINS
                </button>
                <button class="table-btn yellow" @click="openModal('RESEND', item)">
                  RESEND
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <TablePagination :total-items="jackpots.length" @page-changed="onPageChanged" />
    </div>
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import TableFilters from "@/components/table/TableFilters.vue";
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
      jackpots: Array.from({ length: 20 }, (_, i) => ({
        game_id: `251682${i}`,
        winner_name: `bot_${16928 + i}`,
        winner_avatar: "/img/icons/clever-boy.png",
        winner_rank: "/img/icons/clever-rank.png",
        winner_percentage: i % 2 === 0 ? "15%" : "2%",
        status: i % 2 === 0 ? "accepted" : "stored",
        value: i % 2 === 0 ? "236.98" : "9.13",
        bets: "1",
        participants: "1",
        skins: "15",
        rake: i % 2 === 0 ? "52.00" : "0.71",
        rake_percentage: "10%",
        ref_bonus: i % 2 === 0 ? "4.69" : "5.00",
        time: i % 2 === 0 ? "08-11-2025 | 16:35" : "08-11-2025 | 5 min ago",
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
    openModal(type, item) {
      this.modalType = type;
      this.selectedItem = JSON.parse(JSON.stringify(item));
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedItem = null;
      this.modalType = "";
    },
    updateFilter({ key, value }) {
      this.filterOptions[key].selected = value;
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.jackpots.slice(start, start + this.rows);
    },
  },
};
</script>

<style scoped>
.modal-content {
  background-color: #310000;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
}

.modal-content .input-wrapper input {
  border: 1px solid #e82d2e;
  background: #620101;
  padding: 11px;
  width: 100%;
  border-radius: 2px;
  outline: none;
}

.modal-content .input-wrapper input::placeholder {
  color: white;
  opacity: 0.5;
}
</style>
