<template>
  <div class="table-container">
    <div class="table-wrapper">
      <TableFilters
        :search="{ value: searchQuery, placeholder: 'SEARCH USERNAME/STEAMID...' }"
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
                <span>Admin</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Sponsor</span>
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
                <span>Aff Balance</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Aff Earned</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Rewards Earned</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Total Wagered</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Total Raked</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Total Withdrawn</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Promo Created</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th class="!w-[90px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedTableData" :key="index">
            <td>
              <div class="img-cell">
                <img width="20" height="20" :src="item.avatar" alt="avatar" />
                <img width="20" height="20" :src="item.rank" alt="icon" />
                <span class="username">{{ item.name }}</span>
                <div v-if="item.role" :class="['badge', getRoleClass(item.role)]">
                  {{ item.role }}
                </div>
              </div>
            </td>

            <td>{{ item.streamId }}</td>
            <td>{{ item.isAdmin }}</td>
            <td>{{ item.isSponsor }}</td>

            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" width="14" />{{ item.balance }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" width="14" />{{ item.affBalance }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" width="14" />{{ item.affEarned }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" width="14" />{{ item.rewardsEarned }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" width="14" />{{ item.totalWagered }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" width="14" />{{ item.totalRaked }}
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" width="14" />{{ item.totalWithdrawn }}
              </div>
            </td>

            <td>{{ item.promoCreated }}</td>

            <td>
              <router-link :to="{ name: 'MoreInfoProfile' }" class="table-btn green">
                <span>MORE INFO</span>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <TablePagination :total-items="users.length" @page-changed="onPageChanged" />
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
    const roles = ["admin", "mod", "sponsor", "bonus banned", null, "muted"];
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
      users: Array.from({ length: 20 }, (_, i) => ({
        name: i % 2 === 0 ? "CleverBoy" : "YourDad",
        avatar: i % 2 === 0 ? "/img/icons/clever-boy.png" : "/img/icons/clever-girl.png",
        rank: "/img/icons/clever-rank.png",
        role: roles[i % roles.length],
        streamId: `76561199133${i}`,
        isAdmin: 1,
        isSponsor: 1,
        balance: "1,250.00",
        affBalance: "45.10",
        affEarned: "120.00",
        rewardsEarned: "15.00",
        totalWagered: "50,000.00",
        totalRaked: "450.00",
        totalWithdrawn: "17,857.69",
        promoCreated: "08-11-2025",
      })),
    };
  },
  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
    getRoleClass(role) {
      if (!role) return "";

      const roleMap = {
        MOD: "green",
        ADMIN: "red",
        SPONSOR: "yellow",
      };
      return roleMap[role.toUpperCase()] || "gray";
    },
    updateFilter({ key, value }) {
      this.filterOptions[key].selected = value;
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.users.slice(start, start + this.rows);
    },
  },
};
</script>

<style scoped>
.filters-wrap .search-input-group input {
  width: 400px !important;
}
</style>
