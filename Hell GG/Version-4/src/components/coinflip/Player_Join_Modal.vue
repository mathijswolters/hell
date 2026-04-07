<template>
  <div>
    <div
      class="relative max-w-[98vw] lg:w-[1080px] lg:max-w-[80rem] xl:w-[80rem] flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border max-h-[95vh] h-full overflow-y-auto"
    >
      <!-- Header Start -->
      <div class="flex justify-between w-full h-[59px] items-center px-4 bg-[#620101]">
        <span class="font-Rubik font-extrabold text-white text-base"
          >JOIN COINFLIP #{{ battle._id }}</span
        >
        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
          @click="closeModal()"
        />
      </div>
      <div class="flex items-center justify-center flex-col gap-2 w-full pt-8">
        <div
          class="flex items-center justify-center w-full gap-x-2 font-Rubik font-bold text-white text-lg"
        >
          PLEASE SELECT SKINS
          <div class="relative cursor-pointer info flex justify-center">
            <img class="w-3 h-3" src="../../assets/icons/infoIcon.svg" />
            <div
              class="tooltip w-[60vw] lg:w-auto max-w-[90vw] top-[calc(100%+0.5rem)] lg:whitespace-nowrap bg-[#8F0E0E] py-3 px-2 font-Rubik font-bold text-xs text-white text-left break-words whitespace-pre-wrap !right-0 lg:!right-auto"
            >
              1. From your skins, select what you want to join the coinflip with, and meet the join
              requirements.<br />
              2. You will Receive a trade offer for your skins. Accept it in order to go through
              with the coinflip.
            </div>
          </div>
        </div>
        <!-- Controls Start -->
        <div
          class="flex items-center justify-center xl:justify-between w-full gap-2 px-4 flex-wrap xl:flex-nowrap"
        >
          <div class="relative w-full xl:max-w-[300px] flex items-center">
            <MagnifyingGlassIcon class="absolute left-2 w-[14.6px] stroke-[#d7b7b7]" />
            <input
              type="text"
              class="h-[40px] bg-[#2f0101] pr-2 pl-8 w-full font-Rubik placeholder:font-Rubik placeholder:text-[#d7b7b7] text-white placeholder:text-sm text-sm focus:outline-none"
              placeholder="Search for items..."
              v-model="searchQuery"
            />
          </div>
          <div
            class="flex items-center justify-center xl:justify-end gap-2 flex-wrap xl:flex-nowrap"
          >
            <div
              class="flex items-center gap-x-2 relative font-Rubik font-semibold text-sm text-white cursor-pointer select-none px-3 bg-[#770303CC] h-[40px] uppercase"
              @click="toggleDropdown('sorting')"
            >
              <span class="font-Rubik font-semibold text-sm text-[#d7b7b7]">SORT BY:</span>
              <div
                class="flex w-[12.5rem] font-Rubik font-semibold text-sm text-white items-center justify-between"
              >
                {{ sort }}
                <ChevronDownIcon
                  class="w-[12px] stroke-[#ff3435] transition-transform fill-[#ff3435]"
                  :class="{ '-rotate-180': openedDropdown == 'sorting' }"
                />
              </div>

              <div
                class="absolute w-full top-full left-0 bg-[#620101] flex flex-col gap-2 items-start dropdown_menu dropdown_menu-1 transition-all text-white"
                :class="{
                  'h-[11.2rem] z-20': openedDropdown == 'sorting',
                  'h-0 z-0 opacity-0': openedDropdown != 'sorting'
                }"
              >
                <div
                  class="p-2 cursor-pointer font-Rubik font-semibold text-sm text-white text-left hover:bg-[#E82D2E] w-full uppercase"
                  v-for="(item, index) in sorting"
                  :key="index"
                  @click="sort == item ? '' : (sort = item)"
                  :class="{ 'opacity-60 bg-[#e82d2e] cursor-default': item == sort }"
                >
                  {{ item }}
                </div>
              </div>
            </div>
            <div
              class="flex items-center gap-x-2 relative font-Rubik font-semibold whitespace-nowrap text-xs sm:text-sm text-white pl-3 bg-[#770303CC] h-[40px]"
            >
              <span class="font-Rubik font-semibold text-xs sm:text-sm text-[#d7b7b7]"
                >INVENTORY VALUE:</span
              >
              $1934.00
              <p
                class="text-[#19BD67] font-Rubik text-xs sm:text-sm font-bold flex items-center gap-1"
              >
                <img src="../../assets/icons/arrow.svg" />$15.00 (+8.23%)
              </p>
              <span
                class="font-Rubik font-semibold text-xs sm:text-sm text-[#d7b7b7] relative flex items-center gap-4 h-[40px] cursor-pointer pr-3 select-none uppercase justify-between"
                @click="toggleDropdown('inventory_value')"
                >{{ formated_selected_time(selected_time) }}
                <ChevronDownIcon
                  class="w-[12px] stroke-[#fff] transition-transform"
                  :class="{ '-rotate-180': openedDropdown == 'inventory_value' }"
                />
              </span>
              <div
                class="absolute w-[8rem] top-full right-0 bg-[#620101] flex flex-col items-start dropdown_menu dropdown_menu-1 overflow-y-auto transition-all text-white"
                :class="{
                  'h-[11.2rem] z-20': openedDropdown == 'inventory_value',
                  'h-0 z-0 opacity-0': openedDropdown != 'inventory_value'
                }"
              >
                <div class="px-2 w-full my-2">
                  <input
                    type="text"
                    v-model="time"
                    class="w-full bg-[#2f0101] rounded-sm outline-none h-6 px-2 font-Rubik placeholder:font-Rubik font-semibold text-white"
                    placeholder="Time"
                    @keyup.enter="
                      toggleDropdown('inventory_value'),
                        (selected_time = formated_selected_time(time)),
                        (time = '')
                    "
                  />
                </div>

                <div
                  class="p-2 cursor-pointer font-Rubik font-semibold text-xs text-white text-left hover:bg-[#E82D2E] w-full uppercase"
                  v-for="(item, index) in inventory_value_times"
                  :key="index"
                  @click="
                    selected_time == item ? '' : (selected_time = item),
                      toggleDropdown('inventory_value')
                  "
                  :class="{ 'opacity-60 bg-[#e82d2e] cursor-default': item == selected_time }"
                >
                  {{ formated_selected_time(item) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Controls End -->
        <!-- Items Selection Start -->
        <div class="h-[15rem] lg:h-[21.4375rem] w-full relative">
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
                class="w-full text-center truncate font-Rubik font-semibold text-[#d7b7b7] text-sm"
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
        <div class="flex items-center w-full justify-center lg:justify-between p-4 flex-wrap gap-2">
          <div v-if="selectedItems.length == 0"></div>
          <div v-else class="font-Rubik font-extrabold text-white text-base">
            Needs: ${{
              Number(min).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}
            - ${{
              Number(max).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}
          </div>
          <div class="min-h-[40px] flex items-center justify-center flex-wrap sm:justify-end gap-2">
            <div
              class="font-Rubik font-extrabold text-white text-base"
              v-if="selectedItems.length >= 1"
            >
              {{ selectedItems.length }}/20 skins
            </div>
            <button
              class="h-10 px-4 bg-[#ff3435] font-Rubik text-base font-extrabold text-white"
              @click="selectedItems.length > 0 ? (selectedItems = []) : closeModal()"
            >
              CANCEL
            </button>
            <button
              class="h-10 px-4 font-Rubik text-base font-extrabold text-white bg-[#febd11]"
              @click="autoSelectItems()"
            >
              AUTO SELECT
            </button>
            <button
              class="h-10 px-4 font-Rubik text-base font-extrabold text-white"
              :class="{ 'bg-[#04AB53]': joinable, 'bg-[#8f0e0e]': !joinable }"
              @click="joinable ? openModal() : ''"
            >
              {{ joinable ? 'JOIN' : 'NEEDS:' }} {{ calculateNeed }}
              <span class="font-Rubik text-base font-extrabold text-white opacity-70"
                >({{
                  Number(calculatePlayerChance).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }}%)
              </span>
            </button>
          </div>
        </div>
        <!-- Footer End -->
      </div>
    </div>
  </div>
</template>
<script>
import { XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

import { openModalFromModal } from '@/modalStore'
export default {
  name: 'coinFlip_Battle',
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
      inventory_value_times: ['30m', '1h', '2h', '4h', '6h', '12h', '1D', '2D', '3D', '1W'],
      selected_time: '1D',
      time: '',
      selectedItems: [],
      openedDropdown: null,
      min: 0,
      max: 0
      // joinable: false
    }
  },
  methods: {
    formated_selected_time(duration) {
      const timeUnit = duration.slice(-1) // Extract the last character
      const timeValue = parseInt(duration.slice(0, -1)) // Extract the number
      switch (timeValue) {
        case 1:
          switch (timeUnit.toLowerCase()) {
            case 'm':
              return `${timeValue} minute`
            case 'h':
              return `${timeValue} hour`
            case 'd':
              return `${timeValue} day`
            case 'w':
              return `${timeValue} week`
            default:
              return duration
          }
        default:
          switch (timeUnit.toLowerCase()) {
            case 'm':
              return `${timeValue} minutes`
            case 'h':
              return `${timeValue} hours`
            case 'd':
              return `${timeValue} days`
            case 'w':
              return `${timeValue} weeks`
            default:
              return duration
          }
      }
    },
    // join() {
    //   this.$emit('joinPlayer')
    // },
    openModal() {
      openModalFromModal('coinflip confirmation', {
        battle: this.battle,
        selectedItems: this.selectedItems
      })
    },
    joinBattle() {
      let updatedBattle = this.battle
      let player = {
        name: 'qusai',
        _id: 23,
        avatar:
          'https://image.tensorartassets.com/cdn-cgi/image/anim=false,plain=false,w=500,q=85/model_showcase/690698035015003900/63b70cf5-54fc-3411-8bab-945aadd14633.jpeg',
        coin: this.battle.players[0].coin == 'hell' ? 'heaven' : 'hell',
        items: this.selectedItems
      }

      updatedBattle.players.push(player)

      this.$store.dispatch('updateBattle', {
        battleId: this.battle._id, // Pass the battle's unique ID
        updatedBattle: updatedBattle // Set the new state after the coin flip
      })
      this.$store.dispatch('updateBattleState', {
        battleId: this.battle._id, // Pass the battle's unique ID
        newState: 'in_progress' // Set the new state after the coin flip
      })
      // this.$emit('update-battle', updatedBattle)
      // this.$emit('playerJoinedProtocol')
    },
    toggleDropdown(dropdown) {
      if (this.openedDropdown == dropdown) {
        this.openedDropdown = null
      } else {
        this.openedDropdown = dropdown
      }
    },
    calculateMinMaxNeed() {
      let total = this.battle.total
      let percentage = (total * 10) / 100
      this.min = total - percentage
      this.max = total + percentage
    },
    closeModal() {
      this.$emit('close-modal')
    },

    calculateTotalItemsValue(items) {
      let value = 0
      let totalValue = this.totalItemsValue

      items.forEach((item) => {
        value += item.price
      })
      let chance = totalValue ? (value / totalValue) * 100 : 0
      return { value, chance }
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
    },
    autoSelectItems() {
      this.selectedItems = []
      let total = 0

      // Sort items by price in descending order
      const sortedItems = [...this.items].sort((a, b) => b.price - a.price)

      for (const item of sortedItems) {
        // Check if adding the current item's price stays within limits
        if (total + item.price <= this.max) {
          this.selectedItems.push(item)
          total += item.price
        }

        // Stop if we've reached or exceeded the minimum threshold
        if (total >= this.min) break
      }

      // Validate that the total is within the allowed range
      if (total < this.min) {
        console.error(
          `Unable to auto-select items: Total (${total}) is less than the minimum requirement (${this.min}).`
        )
      } else if (total > this.max) {
        console.error(
          `Unable to auto-select items: Total (${total}) exceeds the maximum allowed (${this.max}).`
        )
      }
    }
  },
  mounted() {
    this.calculateMinMaxNeed()
  },

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
      this.battle.players.forEach((player) => {
        player.items.forEach((item) => {
          value += item.price
        })
      })
      value += this.selectedItems.reduce((itemAcc, item) => itemAcc + item.price, 0)
      return value
    },
    calculatePlayerChance() {
      let value = 0
      let totalValue = this.totalItemsValue

      this.selectedItems.forEach((item) => {
        value += item.price
      })
      let chance = totalValue ? (value / totalValue) * 100 : 0
      return chance
    },
    calculateNeed() {
      let value = this.selectedItems.reduce((acc, item) => acc + item.price, 0)
      let need = 0

      if (value < this.min) {
        need = this.min - value
        return (
          '+' +
          Number(need).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
        )
      } else if (value > this.max) {
        need = value - this.max
        return (
          '-' +
          Number(need).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
        )
      } else {
        return Number(value).toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        })
      }
    },
    joinable() {
      let value = this.selectedItems.reduce((acc, item) => acc + item.price, 0)
      return value >= this.min && value <= this.max
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
  z-index: 1;
  right: -200px;
  box-shadow: 0px 4px 6px 0px #00000040;
}
</style>
