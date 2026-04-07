<template>
  <div class="table-wrapper w-full md:max-w-[90%] mx-auto">
    <TableFilters
      :search="{ value: searchQuery, placeholder: 'SEARCH CASE NAME...' }"
      @search="searchQuery = $event"
      :filters="filterOptions"
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
              <span>User Info</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Case Name</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Case Value</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Case Type</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Result</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>State</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Time</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th class="!w-[90px]">Actions</th>
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
              <span class="username">|</span>
              <span class="username">{{ item.hash }}</span>
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/icons/chest.png" width="20" />{{ item.case }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.value }}
            </div>
          </td>
          <td>{{ item.case_type }}</td>
          <td>
            <div class="img-cell">
              <img src="/img/icons/case.svg" width="20" />{{ item.skin }}
              <span class="text-[#D7B7B7] opacity-[65]">{{ item.skin_percentage }}%</span>
            </div>
          </td>
          <td>
            <span class="status red">{{ item.state }}</span>
          </td>
          <td>{{ item.time }}</td>
          <td>
            <button @click="openModal('view case')" class="table-btn green">
              VIEW CASE
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <TablePagination :total-items="rewards.length" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import TableFilters from "@/components/table/TableFilters.vue";
import { openModal } from "@/modalStore";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "StatsAllTable",
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
          selected: "FAUCET CASE",
          items: [
            "FAUCET CASE",
            "NAME",
            "STEAM ID",
            "FILTER #3",
            "FILTER #4",
            "FILTER #5",
          ],
        },
      },
      searchQuery: "",
      page: 1,
      rows: 10,
      isModalOpen: false,
      modalType: "",
      selectedItem: null,
      rewards: Array(15).fill({
        id: "NVYRNXKDHS",
        name: "CleverBoy",
        avatar: "/img/icons/clever-boy.png",
        rank: "/img/icons/clever-rank.png",
        hash: "76xxx3680",
        case: "Test_Case_1",
        value: "236.98",
        case_type: "FAUCET CASE",
        skin: "Test_Skin_1",
        skin_percentage: "25.8",
        faucet: "75.15",
        state: "ERROR",
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
    openModal(name, props) {
      openModal(name, props);
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.rewards.slice(start, start + this.rows);
    },
  },
};
</script>
