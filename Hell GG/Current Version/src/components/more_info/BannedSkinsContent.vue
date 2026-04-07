<template>
  <div class="bg-[#430101] w-full flex flex-col items-center gap-4">
    <div class="w-full mb-2 border-b border-b-[#ff343580]">
      <TableFilters
        :search="{ value: searchQuery, placeholder: 'SEARCH GAME...' }"
        :filters="filterOptions"
        @search="searchQuery = $event"
        @update-filter="updateFilter"
      />
    </div>

    <div class="flex flex-wrap gap-2 justify-center w-full">
      <div
        v-for="item in items"
        :key="item.id"
        class="item-card cursor-pointer transition-all"
        :class="{
          active: selectedItems.includes(item.id),
          banned: item.is_banned,
        }"
        @click="toggleItemSelection(item.id)"
      >
        <input
          type="checkbox"
          class="hidden"
          :checked="selectedItems.includes(item.id)"
          :disabled="item.is_banned"
        />

        <div v-if="item.is_banned" class="time-text">13D - 23h - 59m - 59S</div>
        <img :src="item.image" width="64" height="64" class="max-w-[64px] mb-[5px]" />
        <span>{{ item.name }}</span>
        <h2>${{ Number(item.price).toFixed(2) }}</h2>
      </div>
    </div>

    <div class="w-full w-full flex flex-wrap justify-between items-center">
      <p class="text-[16px] max-w-[200px] text-[#FF3435] font-[500]">(27) BANNED SKINS</p>
      <div class="flex flex-wrap justify-end items-center gap-3">
        <div class="text-white text-[16px] font-[500]">
          ({{ selectedItems.length }})
          {{ selectedItems.length === 1 ? "skin" : "skins" }} selected
        </div>
        <button
          class="p-[12px] text-white text-[14px] bg-[#FEBD11] rounded-[2px] font-[600]"
        >
          UNBAN SKINS
        </button>
      </div>
    </div>

    <div class="w-full mt-2">
      <TablePagination :total-items="items.length" @page-changed="onPageChanged" />
    </div>
  </div>
</template>

<script>
import TableFilters from "@/components/table/TableFilters.vue";
import TablePagination from "@/components/table/TablePagination.vue";

export default {
  name: "BannedSkinsContent",
  components: {
    TableFilters,
    TablePagination,
  },
  data() {
    return {
      page: 1,
      rows: 10,
      searchQuery: "",
      filterOptions: {
        filter_by: {
          label: "FILTER",
          selected: "NAME",
          items: ["NAME", "SENDER STEAM ID", "FILTER #3", "FILTER #4", "FILTER #5"],
        },
        order_by: {
          label: "ORDER BY",
          selected: "ASC",
          items: ["ASC", "DESC"],
        },
      },
      selectedItems: [],
      items: Array.from({ length: 60 }, (_, index) => {
        const templates = [
          { name: "WEAPON B...", image: "/img/ranks/21-25.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/hell.svg", price: 44 },
          { name: "WEAPON B...", image: "/img/ranks/16-19.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/heaven.svg", price: 44 },
        ];

        const template = templates[index % templates.length];

        return {
          id: index + 1,
          ...template,
          is_banned: index % 2 === 0,
        };
      }),
    };
  },
  computed: {
    totalPrice() {
      return this.items
        .filter((item) => this.selectedItems.includes(item.id))
        .reduce((sum, item) => sum + Number(item.price), 0);
    },
  },
  methods: {
    updateFilter({ key, value }) {
      this.filterOptions[key].selected = value;
    },
    toggleItemSelection(itemId) {
      const item = this.items.find((i) => i.id === itemId);
      if (item.is_banned) return;

      const index = this.selectedItems.indexOf(itemId);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(itemId);
      }
    },
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
  },
};
</script>

<style scoped></style>
