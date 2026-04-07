<template>
  <div class="table-wrapper">
    <div
      class="w-full flex 2xl:flex-row flex-col-reverse 2xl:flex-nowrap flex-wrap justify-between items-start gap-2"
    >
      <TableFilters
        :search="{ value: searchQuery, placeholder: 'SEARCH GAME...' }"
        :filters="filterOptions"
        @search="searchQuery = $event"
        @update-filter="updateFilter"
      />
      <div
        class="w-full text-[14px] flex xl:flex-nowrap flex-wrap lg:justify-end items-center gap-1"
      >
        <button class="theme-btn">All</button>
        <button class="theme-btn active">JP</button>
        <button class="theme-btn">CF</button>
        <button class="theme-btn">TM</button>
        <button class="theme-btn">Store</button>
        <button class="theme-btn">Trades</button>
        <button class="theme-btn">Rewards</button>
        <button class="theme-btn">AF</button>
        <button class="theme-btn active">Adm</button>
        <button class="theme-btn">Warnings</button>
        <button class="theme-btn">Misc</button>
        <button class="theme-btn yellow">(UN)SELECT</button>
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
              <span class="username">{{ item.hash }}</span>
            </div>
            <span v-else class="username">-</span>
          </td>

          <td>{{ item.time }}</td>
        </tr>
      </tbody>
    </table>

    <!-- PAGINATION -->
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
      page: 1,
      rows: 10,
      filterOptions: {
        filter_by: {
          label: "FILTER",
          selected: "NAME",
          items: ["NAME", "STEAM ID", "FILTER #3"],
        },
      },
      searchQuery: "",
      isModalOpen: false,
      modalType: "",
      selectedItem: null,
      logs: Array.from({ length: 20 }, (_, i) => ({
        id: `LOG-${1000 + i}`,
        name: i % 2 === 0 ? "DeanCortez" : "Idontlike",
        avatar: i % 2 === 0 ? "/img/icons/clever-boy.png" : "/img/icons/clever-girl.png",
        rank: "/img/icons/clever-rank.png",
        is_admin: i % 4 === 0,
        hash: "76xxx3680",
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
