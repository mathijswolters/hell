<template>
  <div class="bg-[#430101] w-full p-5 flex flex-col h-full justify-between items-center gap-4">
    <div class="bg-[#430101] w-full flex flex-col items-center gap-4">
      <!-- Filters -->
      <div
        class="w-full flex lg:flex-row flex-col xl:flex-nowrap flex-wrap justify-between items-center gap-2"
      >
        <div class="flex items-center xl:flex-nowrap flex-wrap gap-2">
          <!-- Search -->
          <div class="icon-input-wrap w-[280px]">
            <img src="/img/icons/search-icon.png" alt="icon" class="icon-img" />
            <input type="text" placeholder="Search for name..." v-model="searchQuery" />
          </div>

          <!-- Min Price -->
          <div class="icon-input-wrap w-[170px]">
            <img src="/img/icons/dollar-icon.png" alt="icon" class="icon-img" />
            <input type="number" placeholder="Min Price" v-model.number="minPrice" />
          </div>

          <!-- Max Price -->
          <div class="icon-input-wrap w-[170px]">
            <img src="/img/icons/dollar-icon.png" alt="icon" class="icon-img" />
            <input type="number" placeholder="Max Price" v-model.number="maxPrice" />
          </div>

          <!-- Sort Dropdown -->
          <div
            v-for="(filter, key) in filterOptions"
            :key="key"
            class="custom-dropdown sm-dropdown"
          >
            <div class="dropdown-trigger" @click="toggleDropdown(key)">
              <span class="label">{{ filter.label }}:</span>
              <span>{{ filter.selected }}</span>
              <ChevronDownIcon
                class="w-[20px] transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === key }"
              />
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

          <button
            class="p-[12px] text-[14px] text-white font-[600] bg-[#690405]"
            @click="clearFilters"
          >
            REFRESH
          </button>
        </div>
        <div class="w-full text-[14px] flex justify-end items-center gap-2">
          <button
            class="theme-btn"
            :class="{ active: currentView === 'Store' }"
            @click="currentView = 'Store'"
          >
            Store
          </button>
          <button
            class="theme-btn"
            :class="{ active: currentView === 'Vault' }"
            @click="currentView = 'Vault'"
          >
            Vault
          </button>
        </div>
      </div>

      <!-- Items -->
      <div class="flex flex-wrap gap-2 justify-center w-full">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="item-card cursor-pointer transition-all"
          :class="{ active: selectedItems.includes(item.id) }"
          @click="toggleItemSelection(item.id)"
        >
          <input
            type="checkbox"
            class="hidden"
            :checked="selectedItems.includes(item.id)"
          />
          <img :src="item.image" width="64" height="64" class="max-w-[64px] mb-[5px]" />
          <span>{{ item.name }}</span>
          <h2>${{ Number(item.price).toFixed(2) }}</h2>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="w-full flex flex-wrap justify-end items-center gap-3">
      <div class="text-white text-[16px] font-[800]">
        {{ selectedItems.length }}
        {{ selectedItems.length === 1 ? "skin" : "skins" }} selected
      </div>
      <div
        class="p-[12px] text-white text-[14px] bg-[#770303CC] font-[600] flex gap-2 items-center"
      >
        AMOUNT:
        <img src="/img/icons/dollar-icon.png" alt="icon" class="icon-img" />
        {{ formattedTotalPrice }}
      </div>
      <button class="p-[12px] text-white text-[14px] bg-[#04AB53] font-[600]">
        WITHDRAW TO STEAM
      </button>
      <button class="p-[12px] text-white text-[14px] bg-[#FF3435] font-[600]">
        {{ currentView === "Store" ? "Transfer to Vault" : "Transfer to Store" }}
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

export default {
  components: { ChevronDownIcon },
  data() {
    return {
      searchQuery: "",
      minPrice: null,
      maxPrice: null,
      activeDropdown: null,
      currentView: "Store",
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
        .filter((item) => {
          const matchesSearch = item.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
          const matchesMin = this.minPrice != null ? item.price >= this.minPrice : true;
          const matchesMax = this.maxPrice != null ? item.price <= this.maxPrice : true;
          return matchesSearch && matchesMin && matchesMax;
        })
        .sort((a, b) => {
          const sort = this.filterOptions.sort_by.selected;
          if (sort === "ASC") return a.price - b.price;
          if (sort === "DESC") return b.price - a.price;
          return b.price - a.price;
        });
    },

    totalPrice() {
      return this.items
        .filter((item) => this.selectedItems.includes(item.id))
        .reduce((sum, item) => sum + Number(item.price), 0);
    },
    formattedTotalPrice() {
      return this.totalPrice.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
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
    clearFilters() {
      this.searchQuery = "";
      this.minPrice = null;
      this.maxPrice = null;
    },
    handleTransfer() {
      if (this.currentView === "Store") {
        console.log("Transferring selected items to Vault");
      } else {
        console.log("Transferring selected items to Store");
      }
    },
  },
};
</script>
