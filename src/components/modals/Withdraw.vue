<template>
  <div v-if="activeModal === 'coinflip deposit'">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#21010163] bg-opacity-50 transition-all duration-300"
      :class="{
        '-z-30 opacity-0': activeModal !== 'coinflip deposit'
      }"
      @click.self="activeModal = null"
    >
      <div class="backdrop-blur-xl">
        <div
          class="relative md:min-w-[684px] max-w-[684px] flex-col transform min-h-10 transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] rounded border overflow-hidden shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)]"
        >
          <XMarkIcon
            class="absolute w-5 stroke-white top-2 right-2 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 z-50"
            @click="activeModal = null"
          />

          <div class="flex items-center flex-col gap-y-2 w-full py-6 px-2">
            <span class="text-center font-Rubik text-lg font-bold text-white"
              >TOTAL SELECTED: ${{
                Number(totalItemsValue).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })
              }}</span
            >
            <span class="text-center font-Rubik text-sm font-normal text-white"
              >The skins you selected below will be used to create a coinflip.</span
            >
            <div class="flex flex-col pt-4 pb-6 items-center justify-center ] w-full gap-4">
              <div
                class="flex items-center justify-center gap-x-2 font-Rubik font-bold text-white text-lg relative w-auto"
              >
                PLEASE SELECT A COIN
              </div>
              <div class="flex items-center justify-center w-full gap-6">
                <img
                  class="w-[90px] h-[90px] xl:w-[128px] xl:h-[128px] hover:scale-105 transform transition-all duration-300 cursor-pointer rounded-full"
                  :class="{
                    'opacity-50': selectedCoin != '' && selectedCoin != 'heaven',
                    heaven: selectedCoin == 'heaven'
                  }"
                  @click="selectedCoin = 'heaven'"
                  src="../../assets/img/coins/heaven.png"
                />
                <img
                  class="w-[90px] h-[90px] xl:w-[128px] xl:h-[128px] hover:scale-105 transform transition-all duration-300 cursor-pointer rounded-full"
                  :class="{
                    'opacity-50': selectedCoin != '' && selectedCoin != 'hell',
                    hell: selectedCoin == 'hell'
                  }"
                  @click="selectedCoin = 'hell'"
                  src="../../assets/img/coins/hell.png"
                />
                <div
                  class="relative hover:scale-105 transform transition-all duration-200 rounded-full"
                >
                  <div
                    class="w-[90px] xl:w-[128px] cursor-pointer h-[90px] xl:h-[128px] rounded-full relative bg-[rgb(255,52,53,0.2)] flex items-center justify-center overflow-hidden transition-all border-transparent duration-300"
                    :class="{
                      'opacity-50': selectedCoin != '' && selectedCoin != 'random',
                      random: selectedCoin == 'random'
                    }"
                    @click="selectedCoin = 'random'"
                  >
                    <img src="../../assets/icons/questionMark.png" />
                    <img
                      src="../../assets/icons/questionMark.png"
                      class="opacity-20 absolute left-0 xl:left-2 w-[30.83px] h-[38px] rotate-[-15deg] bottom-0 xl:bottom-4"
                    />
                    <img
                      src="../../assets/icons/questionMark.png"
                      class="opacity-20 absolute right-0.5 w-[30.83px] h-[38px] rotate-[15deg] top-5 xl:top-3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-center flex-wrap gap-2 mt-4">
              <button
                class="bg-[rgba(255,52,53,1)] h-8 px-4 flex items-center justify-center w-[86px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
              >
                CANCEL
              </button>
              <button
                class="bg-[rgba(4,171,83,1)] h-8 px-4 flex items-center justify-center w-[86px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="activeModal === 'jackpot deposit'">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#21010163] bg-opacity-50 transition-all duration-300"
      :class="{
        '-z-30 opacity-0': activeModal != 'jackpot deposit'
      }"
      @click.self="activeModal = null"
    >
      <div class="backdrop-blur-xl">
        <div
          class="relative md:min-w-[684px] max-w-[684px] flex-col transform min-h-10 transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] rounded border overflow-hidden shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)]"
        >
          <XMarkIcon
            class="absolute w-5 stroke-white top-2 right-2 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150"
            @click="activeModal = null"
          />

          <div class="flex items-center flex-col gap-y-2 w-full py-6 px-2">
            <span class="text-center font-Rubik text-lg font-bold text-white"
              >TOTAL SELECTED: ${{
                Number(totalItemsValue).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })
              }}</span
            >
            <span class="text-center font-Rubik text-sm font-normal text-white"
              >The skins you selected below will be used to put it into a jackpot.</span
            >
            <div class="flex items-center justify-center flex-wrap gap-2 mt-4">
              <button
                class="bg-[rgba(255,52,53,1)] h-8 px-4 flex items-center justify-center w-[86px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
              >
                CANCEL
              </button>
              <button
                class="bg-[rgba(4,171,83,1)] h-8 px-4 flex items-center justify-center w-[86px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div
      class="relative min-w-full 2xl:min-w-[1339px] max-w-[85rem] flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border h-full"
    >
      <!-- Header Start -->
      <div
        class="flex justify-between w-full h-[59px] items-center px-4 border-b border-[rgb(255,255,255,0.2)]"
      >
        <span class="font-Rubik font-extrabold text-white text-base">WITHDRAW</span>
        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
          @click="closeModal()"
        />
      </div>
      <div class="flex items-center justify-center flex-col gap-2 w-full pt-4 sm:pt-8">
        <div
          class="flex items-center justify-center w-full gap-x-2 font-Rubik font-bold text-white text-lg"
        >
          PLEASE SELECT SKINS
        </div>
        <!-- Controls Start -->
        <div
          class="w-full flex items-center justify-center xl:justify-between gap-2 px-4 flex-wrap xl:flex-nowrap"
        >
          <div class="flex items-center justify-center xl:justify-start w-full gap-2 flex-wrap">
            <div class="relative w-full sm:w-[300px] flex items-center">
              <MagnifyingGlassIcon class="absolute left-2 w-[14.6px] stroke-[#d7b7b7]" />
              <input
                type="text"
                class="h-[40px] bg-[#2f0101] pr-2 pl-8 w-full font-Rubik placeholder:font-Rubik placeholder:text-[#d7b7b7] text-white placeholder:text-sm text-sm focus:outline-none"
                placeholder="Search for items..."
                v-model="searchQuery"
              />
            </div>
            <div class="flex items-center justify-end gap-x-2">
              <div class="flex items-center w-full sm:w-fit justify-end gap-x-2 relative">
                <div
                  class="flex w-full sm:w-fit items-center gap-x-2 relative font-Rubik font-semibold text-sm text-white cursor-pointer select-none px-3 bg-[#770303CC] h-[40px] uppercase"
                  @click="toggleDropdown('sorting')"
                >
                  <span class="font-Rubik font-semibold text-sm text-[#d7b7b7] whitespace-nowrap"
                    >SORT BY:</span
                  >
                  <div
                    class="flex w-full sm:w-[12.5rem] font-Rubik font-semibold text-sm text-white items-center justify-between gap-2"
                  >
                    {{ sort }}
                    <ChevronDownIcon
                      class="w-[12px] stroke-[#ff3435] transition-transform fill-[#ff3435]"
                      :class="{ '-rotate-180': openedDropdown == 'sorting' }"
                    />
                  </div>
                </div>
                <div
                  class="absolute w-full top-full left-0 bg-[#620101] flex flex-col gap-2 items-start dropdown_menu dropdown_menu-1 transition-all text-white"
                  :class="{
                    'h-[11.2rem] z-20': openedDropdown == 'sorting',
                    'h-0 z-0 opacity-0': openedDropdown != 'sorting'
                  }"
                >
                  <div
                    class="p-2 cursor-pointer text-left hover:bg-[#E82D2E] w-full uppercase font-bold font-Rubik"
                    v-for="(item, index) in sorting"
                    :key="index"
                    @click="sort == item ? '' : (sort = item), (openedDropdown = null)"
                    :class="{ 'opacity-60 bg-[#e82d2e] cursor-default': item == sort }"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-center sm:justify-end gap-2 flex-wrap md:flex-nowrap"
          >
            <div
              class="px-6 h-10 bg-[#6d0303] border border-solid border-[#ff3435] flex items-center justify-center gap-x-2 text-nowrap font-Rubik text-sm font-semibold text-white"
            >
              <img src="../../assets/icons/dollar_sign_green.svg" class="mb-1 w-5" />
              WITHDRAWABLE: $12,234.12
            </div>
            <div
              class="px-6 h-10 bg-[#6d0303] border border-solid border-[#ff3435] flex items-center justify-center gap-x-1 text-nowrap font-Rubik text-sm font-semibold text-white relative"
            >
              <img src="../../assets/icons/gambling.svg" class="mb-1 w-5" />
              GAMBLEABLE: $12,234.12
              <div class="cursor-pointer info w-9 flex items-center h-full justify-center info">
                <img class="w-3 h-3" src="../../assets/icons/infoIcon.svg" />
                <div
                  class="tooltip w-full sm:w-fit right-0 sm:right-0 top-[calc(100%+0.5rem)] whitespace-pre-wrap sm:whitespace-nowrap bg-[#8F0E0E] py-3 px-2 font-Rubik font-bold text-xs text-white text-left break-words"
                >
                  1. Gambleable: You must gamble this balance in order to withdraw it.<br />
                  2. Withdrawable: You can instantly withdraw this balance or gamble it.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls End -->
        <!-- Items Selection Start -->
        <div class="h-[18rem] sm:h-[21.4375rem] w-full relative">
          <div
            v-if="filteredItems.length >= 24"
            class="absolute h-10 bottom-0 z-10 w-full ml-4 max-w-[calc(100%-32px)] opacity-90 bg-[linear-gradient(180deg,rgba(83,1,1,0)_20%,#530101_100%)]"
          ></div>
          <div
            class="overflow-y-auto grid w-full py-2 justify-center gap-x-1 gap-y-1 px-2 relative max-h-full"
            style="grid-template-columns: repeat(auto-fill, 125.5px)"
          >
            <div
              v-for="item in filteredItems"
              :key="item._id"
              @click="selectItem(item)"
              class="w-[125.5px] h-[134px] flex flex-col items-center justify-center px-4 cursor-pointer hover:scale-[1.05] transition-transform"
              :class="{ 'bg-[#8F0E0E]': isSelected(item), 'bg-[#690405]': !isSelected(item) }"
            >
              <img :src="item.image" class="max-w-[64px]" />
              <span
                class="w-full truncate font-Rubik font-semibold text-[#d7b7b7] text-sm text-center"
                >{{ item.name }}</span
              >
              <span class="font-Rubik text-white text-base font-semibold"
                >${{
                  Number(item.price).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }}</span
              >
            </div>
          </div>
        </div>
        <!-- Items Selection End -->
        <!-- Footer Start -->
        <div class="flex items-center w-full justify-center gap-2 lg:justify-between p-4 flex-wrap">
          <div v-if="selectedItems.length == 0"></div>
          <div
            v-else
            class="flex justify-between gap-2 font-Rubik font-extrabold text-white text-base w-full lg:w-fit"
          >
            Selected: ${{
              Number(totalItemsValue).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}
            <div
              class="lg:hidden flex font-Rubik font-extrabold text-white text-base"
              v-if="selectedItems.length >= 1"
            >
              {{ selectedItems.length }}/100 skins
            </div>
          </div>
          <div
            class="h-fit lg:h-[40px] flex items-center justify-center flex-wrap lg:justify-end gap-2"
          >
            <div
              class="hidden lg:flex font-Rubik font-extrabold text-white text-base"
              v-if="selectedItems.length >= 1"
            >
              {{ selectedItems.length }}/100 skins
            </div>
            <button
              class="h-10 px-4 bg-[#ff3435] font-Rubik text-base font-extrabold text-white"
              @click="activeModal = 'jackpot deposit'"
            >
              JACKPOT DEPOSIT
            </button>
            <button
              class="h-10 px-4 bg-[#ff3435] font-Rubik text-base font-extrabold text-white"
              @click="activeModal = 'coinflip deposit'"
            >
              CREATE COINFLIP
            </button>
            <button class="h-10 px-4 font-Rubik text-base font-extrabold text-white bg-[#04AB53]">
              WITHDRAW TO STEAM
            </button>
          </div>
        </div>
        <!-- Footer End -->
      </div>
    </div>
  </div>
</template>
<script>
// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'withdraw_modal',
  props: {
    battle: Object,
    secondsLeft: Number
  },
  components: {
    XMarkIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon
  },
  data() {
    return {
      searchQuery: '',
      selectedCoin: '',
      items: [
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
      sort: 'highest amount first',
      sorting: ['newest first', 'oldest first', 'highest amount first', 'lowest amount first'],
      selectedItems: [],
      openedDropdown: null,
      activeModal: null

      // joinable: false
    }
  },
  methods: {
    // join() {
    //   this.$emit('joinPlayer')
    // },

    toggleDropdown(dropdown) {
      if (this.openedDropdown == dropdown) {
        this.openedDropdown = null
      } else {
        this.openedDropdown = dropdown
      }
    },

    closeModal() {
      this.$emit('close-modal')
    },

    selectItem(item) {
      if (this.selectedItems.length < 20) {
        if (this.selectedItems.includes(item)) {
          this.selectedItems = this.selectedItems.filter((selectedItem) => selectedItem !== item)
        } else {
          this.selectedItems.push(item)
        }
      } else return
    },
    isSelected(item) {
      return this.selectedItems.includes(item)
    }
  },
  mounted() {},

  computed: {
    filteredItems() {
      const lowercaseQuery = this.searchQuery.toLowerCase()

      // Filter the items by the search query
      let filteredItems = this.items.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(lowercaseQuery)
        return matchesSearch
      })

      if (this.sort === 'newest first') {
        filteredItems = filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else if (this.sort === 'oldest first') {
        filteredItems = filteredItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      } else if (this.sort === 'highest amount first') {
        filteredItems = filteredItems.sort((a, b) => b.price - a.price) //
      } else if (this.sort === 'lowest amount first') {
        filteredItems = filteredItems.sort((a, b) => a.price - b.price) //
      }

      return filteredItems
    },
    totalItemsValue() {
      let value = 0
      value += this.selectedItems.reduce((itemAcc, item) => itemAcc + item.price, 0)
      return value
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
  background: #d10d0d;
  border-radius: 4px;
}
.tooltip {
  display: none;
}
.info:hover .tooltip {
  display: flex;
  position: absolute;
  flex-wrap: wrap;
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
  /* filter: drop-shadow(0px 0px 20px rgb(255, 52, 53, 0.1)); */
  box-shadow: 0px 0px 50px 1px rgb(255, 52, 53, 0.65);
}
</style>
