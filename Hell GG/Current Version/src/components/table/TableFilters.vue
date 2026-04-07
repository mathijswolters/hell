<template>
  <div class="filters-wrap flex gap-2 lg:flex-nowrap flex-wrap">
    <!-- SEARCH -->
    <div v-if="search" class="search-input-group">
      <input
        type="text"
        :placeholder="search.placeholder || 'SEARCH...'"
        v-model="localSearch"
      />
      <button @click="emitSearch">FIND</button>
    </div>

    <!-- DROPDOWNS -->
    <div v-for="(filter, key) in filters" :key="key" class="custom-dropdown">
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
  </div>
</template>

<script>
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

export default {
  name: "TableFilters",
  components: { ChevronDownIcon },
  props: {
    search: {
      type: Object,
      default: null,
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeDropdown: null,
      localSearch: this.search?.value || "",
    };
  },
  methods: {
    toggleDropdown(key) {
      this.activeDropdown = this.activeDropdown === key ? null : key;
    },
    selectOption(key, value) {
      this.$emit("update-filter", { key, value });
      this.activeDropdown = null;
    },
    emitSearch() {
      this.$emit("search", this.localSearch);
    },
  },
};
</script>
<style scoped>
/* Filters */
.filters-wrap {
  font-family: "Rubik", sans-serif;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
}

.filters-wrap .search-input-group {
  display: flex;
  background: #620101;
  padding: 6px 12px;
  border-radius: 2px;
}

.filters-wrap .search-input-group input {
  background: transparent;
  border: none;
  color: white;
  padding: 0px 0px;
  outline: none;
  font-size: 16px;
  font-weight: 800;
  width: 300px;
}

.filters-wrap .search-input-group button {
  background: #ff3435;
  color: white;
  padding: 6px 8px;
  border-radius: 2px;
  font-weight: 900;
  font-size: 16px;
}

@media (max-width: 767px) {
  .filters-wrap .dropdown-menu li,
  .filters-wrap .dropdown-trigger span,
  .filters-wrap .search-input-group input,
  .filters-wrap .search-input-group button {
    font-size: 12px;
    max-width: 220px;
  }
  .custom-dropdown .dropdown-trigger {
    padding: 10px 12px;
  }
}
</style>
