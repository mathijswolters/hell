<template>
  <div class="table-container relative">
    <h2 class="table-title">Bot Transactions</h2>

    <div class="table-wrapper">
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
                <span>From Bot (Steam ID)</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>To Bot (Steam ID)</span>
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
                <span>Type</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Hash</span>
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
                <span>Date</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th class="!w-[48px]">Display</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedTableData" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.from }}</td>
            <td>{{ item.to }}</td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" alt="coin" width="14" height="14" />
                {{ item.value }}
              </div>
            </td>
            <td>
              <div class="img-cell uppercase">
                <img :src="item.typeIcon" alt="coin" width="14" height="14" />
                {{ item.type }} Joining
              </div>
            </td>
            <td>{{ item.hash }}</td>
            <td>
              <div :class="['status', getStatusColor(item.status)]">
                {{ item.status }}
              </div>
            </td>
            <td>{{ item.date }}</td>
            <td>
              <div class="flex w-[55px]">
                <button class="table-btn green" @click="openModal('show skins')">
                  SHOW SKINS
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <TablePagination :total-items="transactions.length" @page-changed="onPageChanged" />
    </div>
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import { openModal } from "@/modalStore";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "BotTransactions",
  components: {
    TablePagination,
    ChevronUpDownIcon,
  },
  data() {
    return {
      page: 1,
      rows: 10,
      isModalOpen: false,
      modalType: "", // 'skins' or 'cancel'
      selectedItem: null,
      transactions: Array.from({ length: 20 }, (_, i) => ({
        id: `EQYRNXKDHS${i}`,
        from: `7656119924980${169 + i}`,
        to: `7656119924980${169 + i}`,
        value: i % 3 === 0 ? "17,857.69" : i % 3 === 1 ? "1" : "1,500.92",
        type: i % 3 === 0 ? "Jackpot" : i % 3 === 1 ? "Coinflip" : "Jackpot",
        typeIcon:
          i % 3 === 0
            ? "/img/icons/jackpot.svg"
            : i % 3 === 1
            ? "/img/icons/coinflip.svg"
            : "/img/icons/jackpot.svg",
        hash: `0x5fb508c1450a51b257${i}...`,
        status: i % 3 === 0 ? "COMPLETED" : i % 3 === 1 ? "IN PROGRESS" : "CANCELED",
        date:
          i % 3 === 0
            ? "08-11-2025 | 1 hour ago"
            : i % 3 === 1
            ? "08-11-2025 | 10 mins ago"
            : "07-11-2025 | 1 day ago",
      })),
    };
  },
  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
    openModal(name, props) {
      openModal(name, props);
    },
    getStatusColor(status) {
      switch (status) {
        case "COMPLETED":
          return "green";
        case "CANCELED":
          return "red";
        case "IN PROGRESS":
          return "yellow";
        default:
          return "status default";
      }
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.transactions.slice(start, start + this.rows);
    },
  },
};
</script>
