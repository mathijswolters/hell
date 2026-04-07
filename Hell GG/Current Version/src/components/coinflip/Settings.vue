<template>
  <div>
    <div
      class="relative sm:max-w-[606px] xl:w-[606px] w-full flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border h-full"
    >
      <XMarkIcon
        class="absolute top-2 right-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
        @click="closeModal()"
      />
      <!-- Header End -->
      <!-- Body Start -->
      <div class="flex items-center flex-col w-full px-4 py-4 gap-4 mt-4">
        <div class="flex items-center select-none px-3 h-[40px]">
          <span class="font-Rubik font-semibold text-sm text-[#d7b7b7]">SORT BY:</span>
          <div
            class="flex justify-between items-center gap-1 relative font-Rubik font-semibold text-sm w-[14rem] text-white cursor-pointer h-[30px] px-2 uppercase hover:bg-[#FF3435] hover:stroke-white hover:fill-white stroke-[#FF3435] opacity-100 fill-[#FF3435] transition-all"
            :class="{
              'bg-[#FF3435]': openedDropdown === 'sorting'
            }"
            @click="toggleDropdown('sorting')"
          >
            {{ filters.sort }}

            <ChevronDownIcon
              class="w-[12px] transition-transform"
              :class="{ '-rotate-180 stroke-white fill-white': openedDropdown == 'sorting' }"
            />
            <div
              v-if="openedDropdown == 'sorting'"
              class="absolute w-full top-full left-0 bg-[#420101] z-10 flex flex-col items-start dropdown_menu dropdown_menu-1"
            >
              <div
                class="p-2 cursor-pointer text-left hover:bg-[#E82D2E] w-full"
                v-for="(item, index) in sorting"
                :key="index"
                :class="{ 'bg-[#E82D2E] opacity-60 cursor-default': item == filters.sort }"
                @click="changeSorting(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-2 px-2 py-2 border rounded border-solid border-[#C62525]">
          <span class="text-sm sm:text-lg font-semibold font-Rubik text-[#d7b7b7]"
            >See only personal coinflips</span
          >
          <Switch
            v-model="personalCoinflips"
            :class="[
              personalCoinflips ? 'bg-[#04AB53]' : 'bg-[#FF3435]',
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none hover:translate-y-0'
            ]"
          >
            <span class="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              :class="[
                personalCoinflips ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              ]"
            />
          </Switch>
        </div>
        <div
          class="flex flex-wrap items-center justify-center gap-2 px-2 py-2 border rounded border-solid border-[#C62525] mt-2"
        >
          <span class="text-xs sm:text-lg font-semibold font-Rubik text-[#d7b7b7] text-center"
            >MOVE COMPLETED COINFLIPS TO BOTTOM PAGE</span
          >
          <Switch
            v-model="completedCoinflips"
            :class="[
              completedCoinflips ? 'bg-[#04AB53]' : 'bg-[#FF3435]',
              'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none hover:translate-y-0'
            ]"
            @click="updateCompletedCoinFlips(completedCoinflips)"
          >
            <span class="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              :class="[
                completedCoinflips ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              ]"
            />
          </Switch>
        </div>
        <div class="flex flex-col text-center">
          <span class="font-semibold text-sm sm:text-lg font-Rubik text-[#d7b7b7]"
            >Time for completed coinflips to disappear</span
          >
          <span class="font-semibold text-base sm:text-lg font-Rubik text-[#d7b7b7] opacity-50"
            >(0s for them to disappear instantly)</span
          >
          <div
            class="mt-4 flex items-center gap-2 text-base font-Rubik font-semibold text-[#d7b7b7]"
          >
            <input
              v-model="time"
              type="range"
              min="0"
              max="60"
              accept="images/*"
              class="max-w-[324px] w-full"
            />
            <div>{{ filters.time }}s</div>
          </div>
        </div>
      </div>
      <!-- Body End -->
    </div>
  </div>
</template>

<script>
import { Switch } from '@headlessui/vue'

import { XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
export default {
  props: {
    filters: Object
  },
  data() {
    return {
      inventory: [
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 900,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 10,
          _id: 1
        },

        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 40,
          _id: 1,
          banned: true
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 1,
          _id: 1
        },
        {
          name: 'AK-47s',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 46,
          _id: 1
        },
        {
          name: 'AK-47t',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 90,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 130,
          _id: 1
        }
      ],
      sorting: ['newest first', 'oldest first', 'highest amount first', 'lowest amount first'],
      searchQuery: '',
      selectedCoin: '',
      selectedItems: [],
      openedDropdown: null,
      personalCoinflips: false,
      completedCoinflips: false,
      time: parseInt(this.filters.time)
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    toggleDropdown(dropdown) {
      if (this.openedDropdown == dropdown) {
        this.openedDropdown = null
      } else {
        this.openedDropdown = dropdown
      }
    },
    selectItem(item) {
      if (this.selectedItems.includes(item)) {
        this.selectedItems = this.selectedItems.filter((selectedItem) => selectedItem !== item)
      } else {
        this.selectedItems.push(item)
      }
    },
    isSelected(item) {
      return this.selectedItems.includes(item)
    },
    changeSorting(item) {
      this.$store.dispatch('updateCoinFlipFiltersProperty', { key: 'sort', value: item })
    },
    updatePersonalCoinflips(val) {
      this.personalCoinflips = val
      this.$store.dispatch('updateCoinFlipFiltersProperty', {
        key: 'personalCoinFlips',
        value: val
      })
    },
    updateCompletedCoinFlips(val) {
      this.$store.dispatch('updateCoinFlipFiltersProperty', {
        key: 'completedToBottom',
        value: val
      })
    },
    updateTime(val) {
      this.$store.dispatch('updateCoinFlipFiltersProperty', {
        key: 'time',
        value: val
      })
    }
  },
  watch: {
    personalCoinflips(newVal) {
      this.updatePersonalCoinflips(newVal)
    },
    completedCoinflips(newVal) {
      this.updateCompletedCoinFlips(newVal)
    },
    time(newVal) {
      this.updateTime(newVal)
    }
  },
  mounted() {
    this.personalCoinflips = this.filters.personalCoinFlips
    this.completedCoinflips = this.filters.completedToBottom
  },
  components: {
    XMarkIcon,
    ChevronDownIcon,
    Switch
  },
  computed: {}
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
  background: #d10d0d;
  border-radius: 4px;
}
.tooltip {
  display: none;
}
.info:hover .tooltip {
  display: flex;
  position: absolute;
  z-index: 1;
  box-shadow: 0px 4px 6px 0px #00000040;
}
.heaven {
  box-shadow: 0px 0px 50px 1px #95c9fb;
  border-radius: 50%;
}
.hell {
  box-shadow: 0px 0px 50px 1px #db0404;
  border-radius: 50%;
}
.random {
  border: 5px solid #ff3435;
  border-radius: 100%;
  position: relative;
  background: rgb(255, 52, 53, 0.65);
  backdrop-filter: blur(60px);
  box-shadow: 0px 0px 50px 1px rgb(255, 52, 53, 0.65);
}
input[type='range']::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-[#C62525]  rounded-full cursor-grab transition-shadow hover:drop-shadow-lg ease-in-out;
}

input[type='range'] {
  @apply appearance-none h-[5px]  bg-[rgb(198,37,37,0.3)] rounded-full;
}
</style>
