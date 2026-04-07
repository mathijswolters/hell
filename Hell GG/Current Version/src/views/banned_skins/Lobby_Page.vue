<template>
  <div class="table-container">
    <div class="table-wrapper">
      <div class="flex gap-3 items-center">
        <div class="flex w-[max-content]">
          <TableFilters
            :search="{ value: searchQuery, placeholder: 'SEARCH GAME...' }"
            :filters="filterOptions"
            @search="searchQuery = $event"
            @update-filter="updateFilter"
          />
        </div>
        <button
          @click="openModal('ban', item)"
          class="text-white w-[max-content] p-3 bg-[#FF3435] text-[16px] font-[800] uppercase"
        >
          Ban Item
        </button>
      </div>
      <table class="theme-table">
        <thead>
          <tr>
            <th>
              <div class="sorting-icon-wrap">
                <span>Name</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Image</span>
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
                <span>Volume</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Banned At</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Banned By</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th class="!w-[48px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedTableData" :key="index">
            <td>{{ item.name }}</td>

            <td>
              <div class="img-cell">
                <img src="/img/icons/gun.png" width="24" />
              </div>
            </td>
            <td>
              <div class="img-cell">
                <img src="/img/dollarCoin.png" width="14" />{{ item.value }}
              </div>
            </td>

            <td>{{ item.volume }}</td>
            <td>{{ item.banned_at }}</td>
            <td>
              <div class="img-cell">
                <img width="20" height="20" :src="item.avatar" alt="avatar" />
                <img width="20" height="20" :src="item.rank" alt="icon" />
                <span class="username">{{ item.banned_by }}</span>
                <div :class="['badge', getRoleClass(item.role)]">
                  {{ item.role }}
                </div>
              </div>
            </td>

            <td>
              <button class="table-btn green" @click="openModal('unban', item)">
                UNBAN ITEM
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <TablePagination :total-items="skins.length" @page-changed="onPageChanged" />
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content !max-w-[500px] !p-0 overflow-hidden">
        <div class="flex justify-between items-center p-6 pb-2">
          <h3 class="text-white text-[18px] font-[800]">
            Admin: {{ modalType === "ban" ? "Ban Item" : "Unban Item" }}
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-white text-2xl">
            ✕
          </button>
        </div>

        <div class="p-6 pt-2 space-y-5">
          <div class="input-field-group">
            <label class="block text-white text-[14px] font-[400] mb-2">Name</label>
            <div class="input-wrapper">
              <input
                type="text"
                v-model="selectedItem.name"
                placeholder="Enter item name..."
              />
            </div>
          </div>

          <div class="input-field-group">
            <label class="block text-white text-[14px] font-[400] mb-1"> Volume </label>
            <div class="input-wrapper">
              <input type="number" v-model="selectedItem.value" />
            </div>
          </div>

          <div class="flex justify-end pt-2">
            <button
              class="bg-[#FF3435] text-[16px] p-[12px] font-[800] text-white rounded-[2px]"
            >
              {{ modalType === "ban" ? "Ban Item" : "Unban Item" }}
            </button>
          </div>
        </div>
      </div>
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
      isModalOpen: false,
      modalType: "",
      selectedItem: null,
      skins: Array(15).fill({
        name: "AK47",
        image: "/img/icons/clever-boy.png",
        value: "44,783.90",
        volume: "500",
        banned_at: "08-11-2025 | 16:35",
        banned_by: "CleverBoy",
        avatar: "/img/icons/clever-boy.png",
        rank: "/img/icons/clever-rank.png",
        role: "admin",
      }),
    };
  },
  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
    openModal(type, item = null) {
      this.modalType = type;
      if (type === "ban") {
        this.selectedItem = { name: "", value: 0 };
      } else {
        this.selectedItem = JSON.parse(JSON.stringify(item));
      }
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedItem = null;
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
      return this.skins.slice(start, start + this.rows);
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
