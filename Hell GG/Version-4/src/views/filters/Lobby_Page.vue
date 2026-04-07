<template>
  <div class="table-container">
    <div class="table-wrapper">
      <div class="mb-4">
        <button
          class="py-[8px] px-[16px] bg-[#FF3435] text-[16px] font-[800] text-white"
          @click="openModal('add')"
        >
          Add Filter
        </button>
      </div>
      <table class="theme-table">
        <thead>
          <tr>
            <th>
              <div class="sorting-icon-wrap">
                <span>Phrase</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th>
              <div class="sorting-icon-wrap">
                <span>Auto Mute (In Minutes)</span>
                <ChevronUpDownIcon class="sorting-icon" />
              </div>
            </th>

            <th class="!w-[48px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedTableData" :key="index">
            <td>{{ item.phrase }}{{ index }}</td>
            <td>{{ item.mute }} minutes</td>
            <td>
              <button class="table-btn green" @click="openModal('remove', item)">
                REMOVE
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <TablePagination :total-items="filters.length" @page-changed="onPageChanged" />
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content !max-w-[500px] !p-0 overflow-hidden">
        <div class="flex justify-between items-center p-6 pb-2">
          <h3 class="text-white text-[18px] font-[800]">
            Admin: {{ modalType === "add" ? "Add Filter" : "Remove Filter" }}
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-white text-2xl">
            ✕
          </button>
        </div>

        <div class="p-6 pt-2 space-y-5">
          <div class="input-field-group">
            <label class="block text-white text-[14px] font-[400] mb-2">Phrase</label>
            <div class="input-wrapper">
              <input
                type="text"
                v-model="selectedItem.phrase"
                placeholder="Enter phrase..."
              />
            </div>
          </div>

          <div class="input-field-group">
            <label class="block text-white text-[14px] font-[400] mb-1">
              Auto Mute (In Minutes)
            </label>
            <div class="input-wrapper">
              <input type="number" v-model="selectedItem.mute" />
            </div>
          </div>

          <div class="flex justify-end pt-2">
            <button
              class="bg-[#FF3435] text-[16px] p-[12px] font-[800] text-white rounded-[2px]"
            >
              {{ modalType === "add" ? "Add Filter" : "Remove Filter" }}
            </button>
          </div>
        </div>
      </div>
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
      modalType: "add", // 'add' | 'remove'
      selectedItem: {
        phrase: "",
        mute: 0,
      },

      filters: Array.from({ length: 15 }, () => ({
        phrase: "test_",
        mute: 60,
      })),
    };
  },

  methods: {
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },

    openModal(type, item = null) {
      this.modalType = type;

      if (type === "add") {
        this.selectedItem = {
          phrase: "",
          mute: 0,
        };
      }

      if (type === "remove" && item) {
        this.selectedItem = item;
      }

      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
      this.selectedItem = { phrase: "", mute: 0 };
    },

    submitModal() {
      if (this.modalType === "add") {
        if (!this.selectedItem.phrase) return;

        this.filters.unshift({
          phrase: this.selectedItem.phrase,
          mute: this.selectedItem.mute,
        });
      }

      if (this.modalType === "remove") {
        this.filters = this.filters.filter((item) => item !== this.selectedItem);
      }

      this.closeModal();
    },
  },
  computed: {
    paginatedTableData() {
      const start = (this.page - 1) * this.rows;
      return this.filters.slice(start, start + this.rows);
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
