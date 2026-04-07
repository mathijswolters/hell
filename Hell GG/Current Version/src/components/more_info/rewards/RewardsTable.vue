<template>
  <div class="table-wrapper w-full pt-5">
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
              <span>Reward Type</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Case</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Skin</span>
              <ChevronUpDownIcon class="sorting-icon" />
            </div>
          </th>

          <th>
            <div class="sorting-icon-wrap">
              <span>Payout</span>
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

          <td>{{ item.type }}</td>

          <td>
            <div class="img-cell">
              <img src="/img/icons/chest.png" width="24" />{{ item.case }}
            </div>
          </td>

          <td>
            <div class="img-cell">
              <img src="/img/icons/gun.png" width="24" />{{ item.skin }}
            </div>
          </td>
          <td>
            <div class="img-cell">
              <img src="/img/dollarCoin.png" width="14" />{{ item.payout }}
            </div>
          </td>

          <td>{{ item.time }}</td>
        </tr>
      </tbody>
    </table>
    <!-- PAGINATION -->
    <TablePagination :total-items="rewards.length" @page-changed="onPageChanged" />
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "RewardsTable",
  components: {
    TablePagination,
    ChevronUpDownIcon,
  },
  data() {
    return {
      filterOptions: {
        filter_by: {
          label: "FILTER",
          selected: "NAME",
          items: ["NAME", "STEAM ID", "FILTER #3", "FILTER #4", "FILTER #5"],
        },
      },
      page: 1,
      rows: 10,
      isModalOpen: false,
      modalType: "",
      selectedItem: null,
      rewards: Array(15).fill({
        id: "EQYRNXKDHS",
        type: "LEVEL CASE",
        case: "Test Case",
        skin: "Hell_GG_AK47",
        payout: "236.98",
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
      return this.rewards.slice(start, start + this.rows);
    },
  },
};
</script>
