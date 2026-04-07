<template>
  <div
    class="relative w-full md:min-w-[754px] pt-3 sm:pb-5 max-w-[754px] flex-col transform transition-all bg-[rgba(98,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-lg sm:max-h-[630px]"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    />
    <ArrowLeftIcon
      class="absolute left-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white fill-white stroke-2"
      @click="openModal('location step')"
    />

    <div class="py-2 h-full flex flex-col gap-4 items-center justify-center">
      <div class="flex items-ceneter flex-col px-2">
        <div
          class="text-white text-base sm:text-lg sm:text-[20px] font-semibold font-Rubik leading-normal text-center flex items-end gap-x-1 flex-wrap relative h-16 uppercase"
        >
          who do you want do deliver your food?
          <img
            src="../../../../assets/img/frog_chef.png"
            class="mb-2 select-none hidden sm:flex absolute -right-14"
          />
        </div>
        <span class="font-Rubik text-xs font-semibold text-center text-[rgba(255,52,53,1)]"
          >We'll be giving you a giftcard to purchase the food with.</span
        >
      </div>

      <div class="relative flex items-center justify-center">
        <div
          class="h-full w-full min-h-2 flex flex-wrap justify-center gap-2 sm:gap-4 max-h-[460px] py-2 overflow-y-auto"
        >
          <div
            v-for="(item, index) in paginatedData"
            :key="index"
            class="flex flex-col gap-y-1 uppercase font-Rubik font-semibold text-xs relative"
            @click="
              item.in_stock
                ? selectedShop == item
                  ? (selectedShop = '')
                  : (selectedShop = item)
                : ''
            "
            :class="{
              'opacity-50': selectedShop == item,
              'cursor-not-allowed text-[rgb(255,255,255,0.5)]': !item.in_stock,
              'cursor-pointer sm:hover:scale-105 transition-all text-white': item.in_stock
            }"
          >
            <div
              v-if="!item.in_stock"
              class="absolute right-1 top-1 px-4 bg-[rgba(255,52,53,1)] rounded-sm z-10 text-white font-Rubik font-bold text-[8px]"
            >
              OUT OF STOCK
            </div>
            <img
              :src="getImagePath(item.name)"
              class="sm:w-[193px] sm:h-[113px] w-[173px] h-[103px]"
              :class="{
                'opacity-50': !item.in_stock
              }"
            />
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-between md:justify-center gap-y-2 w-full px-4 sm:px-6 flex-wrap"
      >
        <div
          v-if="totalPages > 1"
          class="relative w-fit md:absolute flex items-center justify-start md:justify-center gap-x-2"
        >
          <button
            :disabled="current_page === 1"
            @click="changePage(current_page - 1)"
            class="flex gap-x-2 items-center stroke-white text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
          >
            <ArrowLeftIcon class="w-4 stroke-[3px] stroke-white fill-white" />
          </button>
          <div class="flex items-center gap-x-2 w-28 justify-center">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="changePage(page)"
              class="text-[#D7B7B7] font-bold text-base transition-all duration-200 font-Rubik"
              :class="{
                'text-white transition-all duration-200': current_page === page
              }"
            >
              {{ page }}
            </button>
          </div>

          <button
            :disabled="current_page === totalPages"
            @click="changePage(current_page + 1)"
            class="flex items-center stroke-white gap-x-2 text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
          >
            <ArrowRightIcon class="w-4 stroke-[3px] stroke-white fill-white" />
          </button>
        </div>
        <div
          class="flex justify-end w-fit md:w-full items-center"
          :class="{
            'justify-center': totalPages == 1
          }"
        >
          <button
            class="h-8 px-2.5 py-1 bg-[#04ab53] rounded-sm justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-medium font-Rubik uppercase leading-normal"
            :class="{ 'opacity-50 cursor-not-allowed': !selectedShop && !non_in_stock }"
            @click="non_in_stock ? '' : !selectedShop ? '' : nextModal('confirmation selection')"
          >
            {{ non_in_stock ? 'GET SITE BALANCE INSTEAD' : 'CONFIRM' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
export default {
  name: 'delivery_selection',

  components: {
    XMarkIcon,
    ArrowLeftIcon,
    ArrowRightIcon
  },
  data() {
    return {
      selectedShop: '',
      shops: [
        {
          name: 'deliveroo',
          in_stock: true
        },
        {
          name: 'foodora',
          in_stock: true
        },
        {
          name: 'just eat',
          in_stock: true
        },
        {
          name: 'skip the dishes',
          in_stock: true
        },
        {
          name: 'doordash',
          in_stock: true
        },
        {
          name: 'instacart',
          in_stock: true
        },
        {
          name: 'uber eats',
          in_stock: true
        },
        {
          name: 'chipotle',
          in_stock: true
        },
        {
          name: 'deliveroo',
          in_stock: false
        }
      ],
      items_per_page: 9,
      current_page: 1,
      maxVisiblePages: 5
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    openModal(name) {
      openModalFromModal(name)
    },
    getImagePath(name) {
      return new URL(`../../../../assets/img/food_delivery/${name}.png`, import.meta.url).href
    },
    updatePagination() {
      this.current_page = 1
    },
    nextModal(name) {
      openModalFromModal(name, this.selectedShop)
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.current_page = page
      }
    }
  },
  mounted() {},
  computed: {
    non_in_stock() {
      return this.shops.every((shop) => !shop.in_stock)
    },
    totalPages() {
      return Math.ceil(this.shops.length / this.items_per_page)
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.items_per_page
      const end = start + this.items_per_page
      return this.shops.slice(start, end)
    },
    visiblePages() {
      const half = Math.floor(this.maxVisiblePages / 2)
      let start = Math.max(1, this.current_page - half)
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1)

      // Adjust start if we're near the end
      if (end - start < this.maxVisiblePages - 1) {
        start = Math.max(1, end - this.maxVisiblePages + 1)
      }

      const pages = []
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: rgba(255, 52, 53, 1);
  border-radius: 4px;
}
</style>
