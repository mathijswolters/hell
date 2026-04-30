<template>
  <div>
    <div
      class="relative max-w-[98vw] xl:w-[80rem] w-full flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border max-h-[95vh] h-full overflow-y-auto"
    >
      <!-- Header Start -->
      <div
        class="flex justify-between w-full h-[59px] items-center px-4 border-b border-[rgb(255,255,255,0.2)]"
      >
        <span class="font-Rubik font-extrabold text-white text-base">CREATE COINFLIP</span>
        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
          @click="closeModal()"
        />
      </div>
      <!-- Header End -->
      <!-- Body Start -->
      <div class="flex items-center flex-col w-full px-4 py-4 gap-4">
        <div
          class="flex flex-col pt-4 pb-6 items-center justify-center border-b border-[rgb(255,255,255,0.1)] w-full gap-4"
        >
          <div
            class="flex items-center justify-center gap-x-2 font-Rubik font-bold text-white text-lg relative w-full md:w-auto"
          >
            PLEASE SELECT A COIN
            <div class="cursor-pointer info flex justify-center">
              <img class="w-3 h-3" src="../../assets/icons/infoIcon.svg" />
              <div
                class="tooltip title top-[calc(100%+0.5rem)] !left-0 md:!-right-3/4 lg:!right-auto md:!left-auto w-full md:w-[595px] bg-[#8F0E0E] py-3 px-2 font-Rubik font-bold text-xs text-white text-center flex justify-center"
              >
                1. From your skins, select what you'd like to coinflip.<br />
                2.You will receive a trade offer for your skins. Please accept it in order to create
                the coinflip.
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center w-full gap-6">
            <img
              class="w-[90px] xl:w-[128px] hover:scale-105 transform transition-all duration-200 cursor-pointer rounded-full"
              :class="{
                'opacity-50': selectedCoin != '' && selectedCoin != 'heaven',
                heaven: selectedCoin == 'heaven'
              }"
              @click="selectedCoin = 'heaven'"
              src="../../assets/img/coins/heaven.png"
            />
            <img
              class="w-[90px] xl:w-[128px] hover:scale-105 transform transition-all duration-200 cursor-pointer rounded-full"
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
                class="w-[90px] xl:w-[128px] cursor-pointer h-[90px] xl:h-[128px] rounded-full relative bg-[rgb(255,52,53,0.2)] flex items-center justify-center overflow-hidden"
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
              <div class="absolute top-2.5 right-3">
                <div class="relative cursor-pointer info flex justify-center">
                  <img class="w-3 h-3" src="../../assets/icons/infoIcon.svg" />
                  <div
                    class="tooltip top-[calc(100%+0.5rem)] -left-[300px] w-fit sm:w-[466px] bg-[#8F0E0E] py-3 px-2 font-Rubik font-bold text-xs text-white text-center"
                  >
                    This will randomly select either heaven or hell to create the coinflip on.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Controls Start -->
        <div
          class="flex items-center justify-center xl:justify-between w-full gap-2 px-4 flex-wrap"
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
          <div class="flex items-center justify-center xl:justify-end gap-2 flex-wrap">
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
              class="flex items-center gap-x-2 relative font-Rubik font-semibold whitespace-nowrap text-[11px] sm:text-sm text-white pl-3 bg-[#770303CC] h-[40px]"
            >
              <span class="font-Rubik font-semibold text-[11px] sm:text-sm text-[#d7b7b7]"
                >INVENTORY VALUE:</span
              >
              $1934.00
              <p
                class="text-[#19BD67] font-Rubik text-[11px] sm:text-sm font-bold flex items-center gap-1"
              >
                <img src="../../assets/icons/arrow.svg" />$15.00 (+8.23%)
              </p>
              <span
                class="font-Rubik font-semibold text-[11px] sm:text-sm text-[#d7b7b7] relative flex items-center gap-2 sm:gap-4 h-[40px] cursor-pointer ml-2 sm:ml-0 pr-3 select-none uppercase justify-between"
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
                    placeholder="Time: ex.(3m or 5h)"
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
        <div class="h-[35.25rem] w-full relative">
          <div
            v-if="loadingInventory"
            class="absolute inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
          >
            <p class="text-white/80 font-Rubik text-sm">Loading inventory...</p>
          </div>
          <div
            v-else-if="inventory.length === 0"
            class="flex h-full min-h-[12rem] items-center justify-center px-4 py-8"
          >
            <p class="text-center text-[#c9a8a8] font-Rubik text-sm leading-relaxed">
              No items in your inventory.
            </p>
          </div>
          <div
            v-else-if="filteredItems.length === 0"
            class="flex h-full min-h-[12rem] items-center justify-center px-4 py-8"
          >
            <p class="text-center text-[#c9a8a8] font-Rubik text-sm leading-relaxed">
              No items match your search.
            </p>
          </div>
          <template v-else>
            <div
              v-if="filteredItems.length >= 24"
              class="absolute h-10 bottom-0 z-10 w-full ml-4 max-w-[calc(100%-32px)] opacity-90"
            ></div>
            <div
              class="overflow-y-auto grid w-full py-2 justify-center gap-x-2 gap-y-1 px-2 relative max-h-full"
              style="grid-template-columns: repeat(auto-fill, 125.5px)"
            >
              <div
                v-for="(item, idx) in filteredItems"
                :key="item._id ?? item.id ?? idx"
                @click="item.banned ? '' : selectItem(item)"
                class="w-[125.5px] h-[134px] flex flex-col items-center justify-center px-4"
                :class="{
                  'bg-[#8F0E0E] cursor-pointer hover:scale-[1.05] transition-transform':
                    isSelected(item) && !item.banned,
                  'bg-[#690405] cursor-pointer hover:scale-[1.05] transition-transform':
                    !isSelected(item) && !item.banned,
                  'select-none cursor-not-allowed bg-[#2F0101]': item.banned
                }"
              >
                <div class="relative w-[76px] h-[75px] flex items-center justify-center">
                  <img
                    v-if="item.banned"
                    class="absolute min-w-[76px] w-[76px] min-h-[75px] h-[75px] z-10"
                    src="../../assets/icons/ban.png"
                  />
                  <img
                    :src="item.image"
                    class="max-w-[64px]"
                    :class="{ 'opacity-50': item.banned }"
                  />
                </div>

                <span
                  class="w-full truncate text-center font-Rubik font-semibold text-[#d7b7b7] text-sm"
                  :class="{ 'opacity-50': item.banned }"
                  >{{ item.name }}</span
                >
                <span
                  class="font-Rubik text-white text-base font-semibold"
                  :class="{ 'opacity-50': item.banned }"
                  >${{
                    Number(item.price).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })
                  }}</span
                >
              </div>
            </div>
          </template>
        </div>
        <!-- Items Selection End -->
      </div>
      <!-- Body End -->
      <!-- Footer Start -->
      <div class="w-full flex gap-2 items-center justify-end pb-4 px-4">
        <button
          class="h-10 px-4 bg-[#ff3435] font-Rubik text-base font-[600] text-white"
          @click="selectedItems.length > 0 ? (selectedItems = []) : closeModal()"
        >
          CANCEL
        </button>
        <button
          class="h-10 px-4 bg-[#04AB53] font-Rubik text-base font-[600] text-white min-w-40 flex items-center justify-between gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!canCreate || creating"
          @click="createCoinflip"
        >
          {{ creating ? 'CREATING...' : 'CREATE' }}
          <span class="font-Rubik text-base font-[700] text-white"
            >${{
              Number(totalPrice).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}</span
          >
        </button>
      </div>
      <!-- Footer End -->
    </div>
  </div>
</template>

<script>
import { XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { getSteamId } from '@/auth/session'
import { hostCoinflip, loadInventory, normalizeSteamEconomyImageUrl } from '@/services/jackpotClient'
import { openModalFromModal } from '@/modalStore'
import { store } from '@/store'
export default {
  props: {
    initialCoin: {
      type: String,
      default: ''
    },
    initialSelectedItems: {
      type: Array,
      default: () => []
    },
    doubleDownFromBattle: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loadingInventory: false,
      creating: false,
      inventory: [],
      sort: 'highest amount first',
      sorting: ['newest first', 'oldest first', 'highest amount first', 'lowest amount first'],
      inventory_value_times: ['30m', '1h', '2h', '4h', '6h', '12h', '1D', '2D', '3D', '1W'],
      searchQuery: '',
      selectedCoin: '',
      selectedItems: [],
      selected_time: '1D',
      openedDropdown: null,
      time: ''
    }
  },
  methods: {
    mapInventoryItem(item, index = 0) {
      return {
        ...item,
        image: normalizeSteamEconomyImageUrl(item?.image) || item?.image,
        _id: item?._id ?? item?.id ?? item?.assetid ?? item?.asset_id ?? index
      }
    },
    async fetchInventory() {
      // const steamid = '76561197984485194'
      const steamid = getSteamId()
      this.loadingInventory = true
      try {
        if (!steamid) {
          this.inventory = []
          return
        }
        const items = await loadInventory(steamid)
        this.inventory = Array.isArray(items) ? items.map(this.mapInventoryItem) : []
      } catch (error) {
        console.error('Failed to load inventory:', error)
        this.inventory = []
      } finally {
        this.loadingInventory = false
      }
    },
    resolveSteamOfferUrl(result) {
      if (!result || typeof result !== 'object') return ''
      const offerUrlCandidates = [
        result.offerUrl,
        result.offer_url,
        result.offer?.url,
        result.tradeOfferUrl,
        result.trade_offer_url
      ]
      for (const value of offerUrlCandidates) {
        const s = typeof value === 'string' ? value.trim() : ''
        if (s && /^https?:\/\//i.test(s)) return s
      }
      const offerIdCandidates = [result.offerid, result.offer_id, result.offer?.id, result.tradeOfferId]
      const offerId = offerIdCandidates.find((v) => v != null && String(v).trim())
      if (offerId != null) {
        return `https://steamcommunity.com/tradeoffer/${encodeURIComponent(String(offerId).trim())}/`
      }
      return ''
    },
    selectedCoinToApiValue() {
      if (this.selectedCoin === 'random') return 0
      if (this.selectedCoin === 'heaven') return 1
      if (this.selectedCoin === 'hell') return 2
      return 0
    },
    async createCoinflip() {
      if (!this.canCreate || this.creating) return
      const steamid = getSteamId()
      if (!steamid) {
        this.$toaster?.error?.('Please login first.')
        return
      }
      this.creating = true
      try {
        const skins = this.selectedItems.map((item) => ({
          assetid: item.assetid ?? item.asset_id ?? item.id ?? item._id,
          amount: Number(item.amount) > 0 ? Number(item.amount) : 1
        }))
        const choice = this.selectedCoinToApiValue()
        const result = await hostCoinflip({ steamid, skins, choice })
        // store.commit('upsertCoinflipGame', {
        //   ...(result || {}),
        //   gameid: result?.gameid ?? result?.gameId ?? result?.id ?? result?._id
        // })

        const offerUrl = this.resolveSteamOfferUrl(result)
        if (offerUrl) {
          openModalFromModal('steam offer', { offerUrl })
          return
        }
        this.closeModal()
      } catch (error) {
        this.$toaster?.error?.(error?.message || 'Could not create coinflip game.')
        console.error('Failed to host coinflip:', error)
      } finally {
        this.creating = false
      }
    },
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
    closeModal() {
      this.$emit('close-modal')
    },
    applyInitialDoubleDown() {
      const valid = ['heaven', 'hell', 'random']
      if (this.initialCoin && valid.includes(this.initialCoin)) {
        this.selectedCoin = this.initialCoin
      }
      if (!Array.isArray(this.initialSelectedItems) || !this.initialSelectedItems.length) return
      const picked = []
      for (const battleItem of this.initialSelectedItems) {
        const inv = this.inventory.find(
          (i) =>
            (battleItem.assetid != null &&
              (String(i.assetid) === String(battleItem.assetid) ||
                String(i.asset_id) === String(battleItem.assetid))) ||
            (battleItem.asset_id != null &&
              (String(i.assetid) === String(battleItem.asset_id) ||
                String(i.asset_id) === String(battleItem.asset_id))) ||
            (battleItem._id != null && i._id === battleItem._id) ||
            (battleItem.image && i.image === battleItem.image) ||
            (i.name === battleItem.name && Number(i.price) === Number(battleItem.price))
        )
        if (inv && !picked.includes(inv)) picked.push(inv)
      }
      if (picked.length) this.selectedItems = picked
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
    }
  },
  async mounted() {
    await this.fetchInventory()
    this.applyInitialDoubleDown()
  },
  components: {
    XMarkIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon
  },
  computed: {
    canCreate() {
      return !!this.selectedCoin && this.selectedItems.length > 0
    },
    filteredItems() {
      const lowercaseQuery = this.searchQuery.toLowerCase()

      // Filter the items by the search query
      let filteredItems = this.inventory.filter((item) => {
        const name = typeof item?.name === 'string' ? item.name : ''
        const matchesSearch = name.toLowerCase().includes(lowercaseQuery)
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
    totalPrice() {
      return this.selectedItems.reduce((itemAcc, item) => itemAcc + Number(item.price || 0), 0)
    }
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
  height: 0.3rem !important;
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
.info:hover .tooltip.title {
  display: flex;
  position: absolute;
  z-index: 1;
  left: -60%;
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
