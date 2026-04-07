<template>
  <div class="relative flex items-center sm:justify-center justify-between w-full mt-2 pt-4 border-t border-[#ff343580]">
    
    <div class="flex items-center md:gap-x-12 gap-x-5">
      
      <button
        :disabled="current_page === 1"
        @click="changePage(current_page - 1)"
        class="pagination-nav-group group flex items-center gap-x-2 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronDoubleLeftIcon class="w-4 text-white" />
        <p class="hidden md:block text-white font-semibold text-[12px] uppercase">
          Previous Page
        </p>
      </button>

      <div class="flex items-center md:gap-x-4 gap-x-3">
        <span
          v-for="page in computedVisiblePages"
          :key="page"
          @click="changePage(page)"
          class="cursor-pointer font-bold text-[16px] transition-all duration-200 font-Rubik"
          :class="current_page === page ? 'text-white opacity-100' : 'text-white opacity-50 hover:opacity-100'"
        >
          {{ page }}
        </span>
      </div>

      <button
        :disabled="current_page === computedTotalPages"
        @click="changePage(current_page + 1)"
        class="pagination-nav-group group flex items-center gap-x-2 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <p class="hidden md:block text-white font-semibold text-[12px] uppercase">
          Next Page
        </p>
        <ChevronDoubleRightIcon class="w-4 text-white" />
      </button>
    </div>

    <div class="sm:absolute right-0 flex items-center gap-x-2 text-white font-semibold text-[12px]">
      <span class="opacity-50 hidden sm:">Rows per page</span>
      <div class="relative">
        <div
          class="flex justify-center items-center gap-x-1 font-[700] text-white cursor-pointer bg-[#E82D2E] px-2 py-1 min-w-[40px] rounded-sm"
          @click.stop="rows_dropdown = !rows_dropdown"
        >
          {{ rows_per_page }} 
          <ChevronUpDownIcon class="w-3" />
        </div>

        <transition name="fade">
          <div
            v-if="rows_dropdown"
            class="absolute bottom-full left-0 w-full bg-[#420101] border border-[#ff343580] z-50 flex flex-col mb-1"
          >
            <div
              v-for="option in rows_options"
              :key="option"
              @click="setRowsPerPage(option)"
              class="cursor-pointer py-1.5 hover:bg-[#E82D2E] text-center text-[12px]"
            >
              {{ option }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/24/solid";

export default {
  name: "TablePagination",
  components: {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronUpDownIcon,
  },
  props: {
    totalItems: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      current_page: 1,
      rows_per_page: 10,
      rows_options: [10, 20, 30, 50],
      rows_dropdown: false,
      maxVisiblePages: 5,
    };
  },
  computed: {
    computedTotalPages() {
      return Math.ceil(this.totalItems / this.rows_per_page) || 1;
    },
    computedVisiblePages() {
      const total = this.computedTotalPages;
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = Math.max(1, this.current_page - half);
      let end = Math.min(total, start + this.maxVisiblePages - 1);

      if (end - start < this.maxVisiblePages - 1) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.computedTotalPages) {
        this.current_page = page;
        this.$emit('page-changed', { page: this.current_page, rows: this.rows_per_page });
      }
    },
    setRowsPerPage(num) {
      this.rows_per_page = num;
      this.current_page = 1;
      this.rows_dropdown = false;
      this.$emit('page-changed', { page: this.current_page, rows: this.rows_per_page });
    },
    closeDropdown() {
      this.rows_dropdown = false;
    }
  },
  mounted() {
    window.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    window.removeEventListener("click", this.closeDropdown);
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>