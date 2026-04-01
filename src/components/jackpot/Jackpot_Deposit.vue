<template>
  <div>
    <div
      class="relative max-w-[98vw] xl:w-[80rem] w-full flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border max-h-[95vh] h-full overflow-y-auto"
    >
      <!-- Header Start -->
      <div
        class="flex justify-between w-full h-[59px] items-center px-4 border-b border-[rgb(255,255,255,0.2)]"
      >
        <span class="font-Rubik font-extrabold text-white text-base"> JACKPOT DEPOSIT</span>
        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
          @click="closeModal()"
        />
      </div>
      <!-- Header End -->
      <!-- Body Start -->
      <div class="flex items-center flex-col w-full px-4 py-4 gap-4">
        <p v-if="depositError" class="w-full text-sm text-[#ff6b6b] font-Rubik">{{ depositError }}</p>
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
            v-if="loadingInventory"
            class="absolute inset-0 z-20 flex items-center justify-center bg-[rgba(0,0,0,0.25)]"
          >
            <div class="flex flex-col items-center gap-3">
              <Loading_spinner :size="64" />
              <p class="text-white/80 font-Rubik text-sm">Loading inventory...</p>
            </div>
          </div>

          <div
            v-if="!loadingInventory && filteredItems.length >= 24"
            class="absolute h-10 bottom-0 z-10 w-full ml-4 max-w-[calc(100%-32px)] opacity-90 bg-[linear-gradient(180deg,rgba(83,1,1,0)_20%,#530101_100%)]"
          ></div>
          <div
            v-if="!loadingInventory"
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
        </div>
        <!-- Items Selection End -->
      </div>
      <!-- Body End -->
      <!-- Footer Start -->
      <div class="w-full flex gap-2 items-center justify-end pb-4 px-4">
        <button
          class="h-10 px-4 bg-[#ff3435] font-Rubik text-base font-extrabold text-white"
          @click="selectedItems.length > 0 ? (selectedItems = []) : closeModal()"
        >
          CANCEL
        </button>
        <button
          type="button"
          class="h-10 px-4 bg-[#04AB53] font-Rubik text-base font-extrabold text-white min-w-40 flex items-center justify-between gap-4 disabled:opacity-50"
          :disabled="depositing || selectedItems.length === 0"
          @click="submitDeposit"
        >
          {{ depositing ? 'DEPOSITING…' : 'DEPOSIT' }}
          <span class="font-Rubik text-base font-extrabold text-white"
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
import { normalizeSteamEconomyImageUrl } from '@/services/jackpotClient'
import Loading_spinner from '@/components/Loading_spinner.vue'
import { openModalFromModal } from '@/modalStore'
export default {
  props: {
    potId: { type: Number, default: 1 },
    loadInventory: { type: Function, default: null },
    deposit: { type: Function, default: null }
  },
  data() {
    return {
      depositing: false,
      loadingInventory: false,
      depositError: '',
      inventory: [],
      sort: 'highest amount first',
      sorting: ['newest first', 'oldest first', 'highest amount first', 'lowest amount first'],
      searchQuery: '',
      selectedItems: [],
      openedDropdown: null,
      time: '',
      selected_time: '1D',
      inventory_value_times: ['30m', '1h', '2h', '4h', '6h', '12h', '1D', '2D', '3D', '1W']
    }
  },
  methods: {
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
    async submitDeposit() {
      if (!this.selectedItems.length || !this.deposit) return
      this.depositing = true
      this.depositError = ''
      try {
        const skins = this.selectedItems.map((item) => ({
          assetid: item.assetid ?? item.asset_id ?? item.id ?? item._id,
          id: item.id ?? item._id,
          name: item.name,
          price: item.price,
          image: normalizeSteamEconomyImageUrl(item.image) || item.image
        }))
        const result = await this.deposit(skins)
        const offerUrl = this.resolveSteamOfferUrl(result)
        if (offerUrl) {
          openModalFromModal('steam offer', { offerUrl })
        } else {
          this.closeModal()
        }
      } catch (e) {
        this.depositError = e?.message || 'Deposit failed'
      } finally {
        this.depositing = false
      }
    }
  },
  async mounted() {
    const mapEconomyImage = (item) => ({
      ...item,
      image: normalizeSteamEconomyImageUrl(item.image) || item.image
    })
    if (typeof this.loadInventory === 'function') {
      try {
        this.loadingInventory = true
        const items = await this.loadInventory()
        if (Array.isArray(items) && items.length) {
          this.inventory = items.map((item, i) =>
            mapEconomyImage({
              ...item,
              _id: item._id ?? item.id ?? item.assetid ?? i
            })
          )
        }
      } catch (e) {
        console.error('Failed to load inventory:', e)
      } finally {
        this.loadingInventory = false
      }
    }
    this.inventory = this.inventory.map(mapEconomyImage)
  },
  components: {
    XMarkIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    Loading_spinner
  },
  computed: {
    filteredItems() {
      const lowercaseQuery = this.searchQuery.toLowerCase()

      // Filter the items by the search query
      let filteredItems = this.inventory.filter((item) => {
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
    totalPrice() {
      return this.selectedItems.reduce((itemAcc, item) => itemAcc + item.price, 0)
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
</style>
