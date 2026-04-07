<template>
  <div class="table-container">
    <h2 class="table-title">Recent Withdraws</h2>

    <div class="table-wrapper">
      <table class="theme-table">
        <thead>
          <tr>
            <th>
              <div class="sorting-icon-wrap">
                <span>Name</span>
                <ChevronUpDownIcon class="sorting-icon" />
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Amount Withdrawn</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Trade URL</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th class="w-[108px]">Display</th>
            <th class="!w-[108px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedTableData" :key="index">
            <td>
              <div class="img-cell">
                <img width="20" height="20" :src="item.avatar" alt="avatar" />
                <img width="20" height="20" :src="item.rank" alt="icon" />
                <span class="username">{{ item.name }}</span>
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" alt="coin" width="14" height="14" />
                {{ item.amount }}
              </div>
            </td>
            <td>{{ item.tradeUrl }}</td>
            <td>
              <button class="table-btn green" @click="openModal('show skins')">
                SHOW SKINS
              </button>
            </td>
            <td>
              <div class="action-cell">
                <button class="table-btn red" @click="openInternalModal('cancel', item)">
                  CANCEL
                </button>
                <span class="timer">{{ item.timer }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <TablePagination :total-items="withdraws.length" @page-changed="onPageChanged" />
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h3 class="uppercase font-bold text-white mb-4">
          {{ modalType === "skins" ? "Skins for " : "Cancel Withdraw: " }}
          {{ selectedItem?.name }}
        </h3>
        <p class="text-gray-400 mb-6">
          Are you sure you want to proceed with this action?
        </p>
        <div class="flex gap-4 justify-end">
          <button @click="closeModal" class="px-4 py-2 bg-gray-700 rounded text-white">
            Close
          </button>
          <button class="px-4 py-2 bg-[#ff3435] rounded text-white font-bold">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TablePagination from "@/components/table/TablePagination.vue";
import { openModal } from "@/modalStore";
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "RecentWithdraws",
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
      withdraws: Array(15).fill({
        name: "CleverBoy",
        avatar: "/img/icons/clever-boy.png",
        rank: "/img/icons/clever-rank.png",
        amount: "17,857.69",
        tradeUrl: "76561199133749892",
        timer: "59",
      }),
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
    openInternalModal(type, item) {
      this.modalType = type;
      this.selectedItem = item;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedItem = null;
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.withdraws.slice(start, start + this.rows);
    },
  },
};
</script>
