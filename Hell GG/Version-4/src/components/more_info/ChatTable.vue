<template>
  <div class="table-wrapper">
    <div
      class="w-full flex lg:flex-row flex-col-reverse xl:flex-nowrap flex-wrap justify-between items-center gap-1 mb-4"
    >
      <TableFilters
        :search="{ value: searchQuery, placeholder: 'SEARCH GAME...' }"
        @search="searchQuery = $event"
      />
      <!-- :filters="filterOptions"
        @update-filter="updateFilter" -->
    </div>

    <table class="theme-table">
      <thead>
        <tr>
          <th>
            <div class="sorting-icon-wrap">
              <span>Chat ID</span>
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
              <span>Message</span>
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
              <span class="username">|</span>
              <span class="username">{{ item.hash }}</span>
            </div>
          </td>

          <td>{{ item.message }}</td>

          <td>{{ item.time }}</td>
        </tr>
      </tbody>
    </table>

    <!-- PAGINATION -->
    <TablePagination :total-items="chats.length" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import TableFilters from "@/components/table/TableFilters.vue";
import TablePagination from "@/components/table/TablePagination.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "ChatTable",
  components: {
    TableFilters,
    TablePagination,
    ChevronUpDownIcon,
  },
  data() {
    return {
      page: 1,
      rows: 10,
      searchQuery: "",
      isModalOpen: false,
      modalType: "",
      selectedItem: null,
      chats: Array.from({ length: 20 }, (_, i) => ({
        id: `CHAT-${1000 + i}`,
        name: "Idontlike",
        avatar: i % 2 === 0 ? "/img/icons/clever-girl.png" : "/img/icons/clever-boy.png",
        rank: "/img/icons/clever-rank.png",
        hash: "76xxx3680",
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
        time: "19-11-2025 | 10 minutes ago",
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
      return this.chats.slice(start, start + this.rows);
    },
  },
};
</script>
