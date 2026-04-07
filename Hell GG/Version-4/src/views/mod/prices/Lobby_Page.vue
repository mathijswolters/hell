<template>
  <div class="table-container">
    <div class="table-wrapper">
      <div class="flex gap-2 items-center">
        <div class="flex w-[max-content]">
          <TableFilters
            :search="{ value: searchQuery, placeholder: 'SEARCH GAME...' }"
            :filters="filterOptions"
            @search="searchQuery = $event"
            @update-filter="updateFilter"
          />
        </div>
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
                <span>Price</span>
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
                <span>Updated At</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Last Appearance</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

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
                <img src="/img/dollarCoin.png" width="14" />{{ item.price }}
              </div>
            </td>

            <td>{{ item.volume }}</td>
            <td>{{ item.updated_at }}</td>
            <td class="!w-[150px]">{{ item.last_appearence }}</td>
          </tr>
        </tbody>
      </table>
      <TablePagination :total-items="prices.length" @page-changed="onPageChanged" />
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content !max-w-[500px] !p-0 overflow-hidden">
        <div class="flex justify-between items-center p-6 pb-2">
          <h3 class="text-white text-[18px] font-[800]">
            Admin: {{ modalType === "create" ? "Create Item" : "Edit Item" }}
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
                class="text-white"
                v-model="selectedItem.name"
                placeholder="Enter item name..."
              />
            </div>
          </div>

          <div class="input-field-group">
            <label class="block text-white text-[14px] font-[400] mb-1">
              Price with no decimal (100 = $1)
            </label>
            <div class="input-wrapper">
              <input class="text-white" type="number" v-model="selectedItem.price" />
            </div>
          </div>

          <div class="flex justify-end pt-2">
            <button
              class="bg-[#FF3435] text-[16px] p-[12px] font-[800] text-white rounded-[2px]"
            >
              {{ modalType === "create" ? "Create Item" : "Edit Item" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TableFilters from "@/components/table/TableFilters.vue";
import TablePagination from "@/components/table/TablePagination.vue";
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
          items: ["A-Z", "Z-A"],
        },
      },
      page: 1,
      rows: 10,
      isModalOpen: false,
      modalType: "",
      selectedItem: null,
      prices: Array(15).fill({
        name: "AK47",
        image: "/img/icons/clever-boy.png",
        price: "44,783.90",
        volume: "500",
        updated_at: "08-11-2025 | 16:35",
        last_appearence: "13-11-2025 | 10:41",
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
      if (type === "create") {
        this.selectedItem = { name: "", price: 0 };
      } else {
        this.selectedItem = JSON.parse(JSON.stringify(item));
      }
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedItem = null;
    },
    updateFilter({ key, value }) {
      this.filterOptions[key].selected = value;
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.prices.slice(start, start + this.rows);
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
