<template>
  <div class="table-container">
    <div class="table-wrapper">
      <div
        class="w-full flex lg:flex-row flex-col-reverse xl:flex-nowrap flex-wrap justify-between items-center gap-1 mb-4"
      >
        <div class="filters-wrap">
          <div class="search-input-group">
            <input
              type="text"
              placeholder="SEARCH USERNAME/STEAMID..."
              v-model="searchQuery"
            />
            <button>FIND</button>
          </div>
        </div>
        <div class="w-full text-[14px] flex lg:justify-end items-center gap-1">
          <button class="theme-btn">All</button>
          <button class="theme-btn active">Jackpot</button>
          <button class="theme-btn">Coinflip</button>
          <button class="theme-btn">Tournamnets</button>
          <button class="theme-btn">Store</button>
          <button class="theme-btn">Trades</button>
          <button class="theme-btn">Rewards</button>
          <button class="theme-btn">Affiliate</button>
          <button class="theme-btn active">Admin</button>
          <button class="theme-btn">Warnings</button>
          <button class="theme-btn">Misc</button>
          <button class="theme-btn yellow">(UN)SELECT ALL</button>
        </div>
      </div>

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
                <span>Other User</span>
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
                <img width="20" height="20" :src="item.rank" alt="rank" />
                <span class="username">{{ item.name }}</span>

                <template v-if="item.is_admin">
                  <div class="badge red ml-1">ADMIN</div>
                </template>
                <template v-else>
                  <span class="username"> | </span>
                </template>

                <span class="username">{{ item.hash }}</span>
              </div>
            </td>

            <td>{{ item.log }}</td>
            <td>{{ item.association }}</td>

            <td>
              <div v-if="item.other_user" class="img-cell">
                <img width="20" height="20" :src="item.avatar" alt="avatar" />
                <img width="20" height="20" :src="item.rank" alt="rank" />
                <span class="username">{{ item.name }}</span>
                <div class="badge green ml-1">MOD</div>
              </div>
              <span v-else class="username">-</span>
            </td>

            <td>{{ item.time }}</td>
          </tr>
        </tbody>
      </table>

      <TablePagination :total-items="logs.length" @page-changed="onPageChanged" />
    </div>
  </div>
</template>
<script>
import TablePagination from "@/components/table/TablePagination.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "Lobby_Page",
  components: {
    TablePagination,
    ChevronUpDownIcon,
  },
  data() {
    return {
      page: 1,
      rows: 10,
      isModalOpen: false,
      modalType: "",
      searchQuery: "",
      selectedItem: null,
      logs: Array.from({ length: 20 }, (_, i) => ({
        id: `${123456789 + i}`,
        name: i % 2 === 0 ? "DeanCortez" : "Idontlike",
        avatar: i % 2 === 0 ? "/img/icons/clever-boy.png" : "/img/icons/clever-girl.png",
        rank: "/img/icons/clever-rank.png",
        is_admin: i % 2 === 0,
        hash: `76xxx${3680 + i}`,
        log:
          i % 2 === 0
            ? "DeanCortez has lost $12 on Jackpot #12"
            : "Idontlike has been muted.",
        association: i % 2 === 0 ? "Jackpot #12" : "-",
        other_user: i % 2 === 0,
        time: i % 2 === 0 ? "19-11-2025 | 7:35" : "19-11-2025 | 10 minutes ago",
      })),
    };
  },
  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
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

<style scoped>
/* Filters */
.filters-wrap {
  font-family: "Rubik", sans-serif;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
}

.filters-wrap .search-input-group {
  display: flex;
  background: #620101;
  padding: 6px 12px;
  border-radius: 2px;
}

.filters-wrap .search-input-group input {
  background: transparent;
  border: none;
  color: white;
  padding: 0px 0px;
  outline: none;
  font-size: 16px;
  font-weight: 800;
  width: 300px;
}

.filters-wrap .search-input-group button {
  background: #ff3435;
  color: white;
  padding: 6px 8px;
  border-radius: 2px;
  font-weight: 900;
  font-size: 16px;
}

@media (max-width: 767px) {
  .filters-wrap .dropdown-menu li,
  .filters-wrap .dropdown-trigger span,
  .filters-wrap .search-input-group input,
  .filters-wrap .search-input-group button {
    font-size: 12px;
    max-width: 220px;
  }
  .custom-dropdown .dropdown-trigger {
    padding: 10px 12px;
  }
}
</style>
