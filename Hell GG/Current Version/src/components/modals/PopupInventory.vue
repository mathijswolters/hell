<template>
  <div
    class="relative max-w-[98vw] 2xl:max-w-[1466px] 2xl:w-[1466px] w-full flex-col transform transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[#530000] border max-h-[93vh] 2xl:max-h-full h-full"
  >
    <!-- Header Start -->
    <div class="flex w-full flex-wrap py-4 sm:py-0 sm:h-[50px] items-center px-4 border-b border-[hsl(0,98%,19%)] gap-x-4">
      <span class="font-Rubik font-bold text-white text-[16px] flex items-center gap-2 h-full">Inventory</span>
      <XMarkIcon
        class="w-6 h-6 absolute right-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
        @click="closeModal()"
      />
    </div>
    <!-- Header End -->

    <!-- Body Start -->
    <div class="flex items-center pt-4 flex-col gap-2 px-4">
      <h2 class="text-center text-white text-[18px] font-[800]">PLEASE SELECT SKINS</h2>

      <!-- Controls -->
      <div class="w-full flex items-center justify-center sm:justify-between flex-wrap gap-2">
        <div class="icon-input-wrap w-[280px]">
          <img src="/img/icons/search-icon.png" alt="icon" class="icon-img" />
          <input type="text" placeholder="Search for name..." v-model="searchQuery" />
        </div>

        <div v-for="(filter, key) in filterOptions" :key="key" class="custom-dropdown sm-dropdown">
          <div class="dropdown-trigger" @click="toggleDropdown(key)">
            <span class="label">{{ filter.label }}:</span>
            <span>{{ filter.selected }}</span>
            <span class="chevron">{{ activeDropdown === key ? "▲" : "▼" }}</span>
          </div>

          <ul v-if="activeDropdown === key" class="dropdown-menu">
            <li
              v-for="option in filter.items"
              :key="option"
              :class="{ 'active-item': filter.selected === option }"
              @click="selectOption(key, option)"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </div>
      <!-- Controls End -->

      <!-- Items -->
      <div class="flex w-full max-w-full items-center flex-col pt-4 min-h-[6rem] h-full overflow-x-auto">
        <div class="w-full overflow-y-auto max-h-[50vh] 2xl:max-h-[70vh] overflow-x-auto">
          <div class="flex flex-wrap gap-2 justify-center w-full">
            <div
              v-for="item in filteredItems"
              :key="item.id"
              class="item-card cursor-pointer transition-all"
              :class="{ active: selectedItems.includes(item.id) }"
              @click="toggleItemSelection(item.id)"
            >
              <input type="checkbox" class="hidden" :checked="selectedItems.includes(item.id)" />
              <img :src="item.image" width="64" height="64" class="max-w-[64px] mb-[5px]" />
              <span>{{ item.name }}</span>
              <h2>${{ Number(item.price).toFixed(2) }}</h2>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="w-full flex flex-wrap justify-between items-center gap-3 py-2 px-1">
        <div class="text-white text-[16px] font-[800]">Selected: ${{ formattedTotalPrice }}</div>
        <div class="text-white text-center text-[16px] font-[800]">
          {{ selectedItems.length }} {{ selectedItems.length === 1 ? "skin" : "skins" }}
        </div>
        <button class="p-[12px] text-white text-[14px] bg-[#04AB53] font-[600]">WITHDRAW TO STEAM</button>
      </div>
    </div>
    <!-- Body End -->
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/solid";

export default {
  components: { XMarkIcon },
  data() {
    return {
      searchQuery: "",
      activeDropdown: null,
      selectedItems: [],
      filterOptions: {
        sort_by: {
          label: "SORT BY",
          selected: "Highest Amount First",
          items: ["Highest Amount First", "ASC", "DESC"],
        },
      },
      items: Array.from({ length: 60 }, (_, index) => {
        const templates = [
          { name: "WEAPON B...", image: "/img/ranks/21-25.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/hell.svg", price: 44 },
          { name: "WEAPON B...", image: "/img/ranks/16-19.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/heaven.svg", price: 44 },
        ];
        return { id: index + 1, ...templates[index % templates.length] };
      }),
    };
  },
  computed: {
    filteredItems() {
      return this.items
        .filter(item => {
          const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          return matchesSearch;
        })
        .sort((a, b) => {
          const sort = this.filterOptions.sort_by.selected;
          if (sort === "ASC") return a.price - b.price;
          if (sort === "DESC") return b.price - a.price;
          return b.price - a.price; // Highest Amount First
        });
    },
    totalPrice() {
      return this.items
        .filter(item => this.selectedItems.includes(item.id))
        .reduce((sum, item) => sum + Number(item.price), 0);
    },
    formattedTotalPrice() {
      return this.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
  },
  methods: {
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, value) {
      this.filterOptions[key].selected = value;
      this.activeDropdown = null;
    },
    toggleItemSelection(itemId) {
      const index = this.selectedItems.indexOf(itemId);
      if (index > -1) this.selectedItems.splice(index, 1);
      else this.selectedItems.push(itemId);
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
