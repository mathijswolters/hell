<template>
  <Transition
    name="modal"
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="activeModal != null"
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#21010163] bg-opacity-50"
      @click.self="activeModal = null"
    >
      <div class="backdrop-blur-xl flex justify-center w-[calc(100%_-_2rem)] md:w-auto">
        <div
          class="relative md:min-w-[684px] md:max-w-[684px] flex-col transform min-h-10 transition-all bg-[rgba(98,1,1,1)] backdrop-blur-[10px] border-[rgba(255,52,53,1)] rounded border overflow-hidden shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)]"
        >
          <XMarkIcon
            class="w-6 h-6 absolute right-2 top-2 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
            @click="activeModal = null"
          />
          <div class="flex items-center flex-col gap-y-4 w-full p-4">
            <div class="pt-4">
              <span class="font-Rubik font-semibold text-xl text-white text-center md:text-left">{{
                activeModal == 'ban skins'
                  ? 'Are you sure that you want to BET BAN these skins?'
                  : 'UNBAN SKINS'
              }}</span>
            </div>
            <div
              class="w-auto max-w-full max-h-[18.5rem] grid h-auto overflow-y-auto gap-1 p-2 bg-[rgba(47,1,1,1)] border border-solid border-[rgba(255,52,53,1)] shadow-[0_4px_14px_0px_rgba(0,0,0,0.5)] rounded"
              style="grid-template-columns: repeat(auto-fill, 125.5px)"
            >
              <div
                v-for="item in selectedItems"
                :key="item._id"
                class="w-[125.5px] h-[134px] flex flex-col items-center justify-center px-4 bg-[#690405]"
              >
                <div class="relative w-[76px] h-[75px] flex items-center justify-center">
                  <img :src="item.image" class="max-w-[64px]" />
                </div>

                <span
                  class="w-full truncate text-center font-Rubik font-semibold text-[#d7b7b7] text-sm"
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
            <span
              class="font-medium font-Rubik"
              :class="{
                'text-base text-white': activeModal == 'ban skins',
                'text-sm text-white opacity-50': activeModal == 'unban skins'
              }"
            >
              {{
                activeModal == 'ban skins'
                  ? "If you change your mind it'll take 14 days (2 weeks) to undo the ban."
                  : '  skins banned until (01-05-2025 / 18:00:42)'
              }}
            </span>
            <div class="flex items-center gap-x-2 h-10 w-full justify-center">
              <div
                v-if="activeModal == 'unban skins'"
                class="h-full flex items-center justify-between w-full border border-solid border-[rgba(232,45,46,1)] px-2 rounded-sm text-white font-Rubik"
              >
                <span class="font-bold text-base">BAN TIMER COUNTDOWN</span>
                <span class="font-medium text-base opacity-70">13D - 23H - 59M - 59S</span>
              </div>
              <button
                class="h-full px-4 bg-[rgba(255,52,53,1)] text-white font-Rubik font-bold text-base w-[170px] whitespace-nowrap"
              >
                {{ activeModal == 'ban skins' ? 'CANCEL' : 'CANCEL UNBAN' }}
              </button>
              <button
                v-if="activeModal == 'ban skins'"
                class="h-full px-4 bg-[rgba(4,171,83,1)] text-white font-Rubik font-bold text-base w-[170px]"
              >
                BAN SKINS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <div class="flex flex-col w-full gap-y-2">
    <span class="text-white font-Rubik font-extrabold text-2xl">BAN YOUR SKINS</span>
    <span class="uppercase text-[rgb(255,255,255,0.5)] font-medium font-Rubik text-sm"
      >If you don't want to gamble your skins for whatever reason use this feature to place
      individual bet bans on each skin. What that means is that you cannot gamble whatever skins you
      banned from your inventory on Hell.gg. If you change your mind it'll take 14 days (2 weeks) to
      undo the ban.</span
    >
    <div class="flex items-center justify-between w-full flex-wrap gap-2 mt-3">
      <div class="relative w-full sm:w-[300px] flex items-center">
        <MagnifyingGlassIcon class="absolute left-2 w-[14.6px] stroke-[#d7b7b7]" />
        <input
          type="text"
          class="h-[40px] bg-[#2f0101] pr-2 pl-8 w-full font-Rubik placeholder:font-Rubik placeholder:text-[#d7b7b7] text-white placeholder:text-sm text-sm focus:outline-none"
          placeholder="Search for items..."
          v-model="searchQuery"
        />
      </div>
      <div class="flex items-center w-full sm:w-fit justify-end gap-x-2 relative">
        <div
          class="flex w-full sm:w-fit items-center gap-x-2 relative font-Rubik font-semibold text-sm text-white cursor-pointer select-none px-3 bg-[#770303CC] h-[40px] uppercase"
          @click="toggleDropdown('sorting')"
        >
          <span class="font-Rubik font-semibold text-sm text-[#d7b7b7] whitespace-nowrap"
            >SORT BY:</span
          >
          <div
            class="flex w-full sm:w-[12.5rem] font-Rubik font-semibold text-sm text-white items-center justify-between"
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
    <!-- Items Selection Start -->
    <div class="h-[20rem] sm:h-[30.5rem] w-full relative">
      <div
        v-if="filteredItems.length >= 24"
        class="absolute h-10 bottom-0 z-10 w-full max-w-[calc(100%-32px)] opacity-90 bg-[linear-gradient(180deg,rgba(83,1,1,0)_20%,#530101_100%)]"
      ></div>
      <div
        class="overflow-auto grid w-full mt-2 pt-1 justify-center gap-x-2 gap-y-1 relative min-h-[15rem] h-auto max-h-full"
        style="grid-template-columns: repeat(auto-fill, 120.5px)"
      >
        <div
          v-for="item in filteredItems"
          :key="item._id"
          @click="selectItem(item)"
          class="w-[125.5px] h-[134px] flex flex-col items-center justify-center px-4 cursor-pointer hover:scale-[1.05] transition-all relative card"
          :class="{
            'bg-[#8F0E0E] ': isSelected(item),
            'bg-[#690405]  ': !isSelected(item) && !item.banned,
            'select-none bg-[#2F0101]': item.banned && !isSelected(item)
          }"
        >
          <div
            class="cardHover top-0"
            v-if="item.banned"
            :class="{
              withTimer: item.timer,
              withoutTimer: !item.timer,
              'bg-[#8F0E0E] ': isSelected(item),
              'bg-[#690405]  ': !isSelected(item) && !item.banned,
              'select-none bg-[#2F0101]': item.banned && !isSelected(item)
            }"
          >
            <div class="flex flex-col items-center justify-center px-4 w-full">
              <div class="relative w-[76px] h-[75px] flex items-center justify-center">
                <img
                  v-if="item.banned"
                  class="absolute min-w-[76px] w-[76px] min-h-[75px] h-[75px] z-10"
                  src="../../../assets/icons/ban.png"
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
              <div
                v-if="item.timer"
                class="w-full text-center text-sm text-white font-Rubik font-medium whitespace-nowrap"
              >
                {{ item.timer }}
              </div>
              <button
                class="text-white font-Rubik font-bold w-full h-10 rounded-sm mt-2"
                :class="{
                  'bg-[rgba(255,52,53,1)]': item.timer,
                  'bg-[rgba(254,189,17,1)]': !item.timer
                }"
              >
                {{ item.timer ? 'CANCEL UNBAN' : 'UNBAN SKIN' }}
              </button>
            </div>
          </div>
          <div
            v-if="item.timer"
            class="absolute top-1 w-full text-center text-[10px] text-white opacity-70 font-Rubik font-medium whitespace-nowrap"
          >
            {{ item.timer }}
          </div>
          <div class="relative w-[76px] h-[75px] flex items-center justify-center">
            <img
              v-if="item.banned"
              class="absolute min-w-[76px] w-[76px] min-h-[75px] h-[75px] z-10"
              src="../../../assets/icons/ban.png"
            />
            <img :src="item.image" class="max-w-[64px]" :class="{ 'opacity-50': item.banned }" />
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
    <div class="w-full flex gap-2 items-center justify-between flex-wrap pb-4">
      <div class="font-Rubik whitespace-nowrap font-medium text-base text-[rgba(255,52,53,1)]">
        ({{ bannedSkinsCount() }}) BANNED SKINS
      </div>
      <div class="flex items-center gap-2 whitespace-nowrap flex-wrap">
        <span class="font-Rubik font-bold text-white text-base"
          >({{ selectedItems.length }}) Skins SELECTED</span
        >
        <div class="flex items-cetr gap-2">
          <button
            class="h-10 px-4 bg-[rgba(254,189,17,1)] font-Rubik text-base font-extrabold text-white"
            @click="selectedItems.length >= 1 ? toggleModal('unban skins') : ''"
          >
            UNBAN SKINS
          </button>
          <button
            class="h-10 px-4 bg-[#ff3435] font-Rubik text-base font-extrabold text-white min-w-40 flex items-center justify-center gap-4"
            @click="selectedItems.length >= 1 ? toggleModal('ban skins') : ''"
          >
            BAN SKINS
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XMarkIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { openModalFromModal } from '@/modalStore'
export default {
  name: 'ban_your_skins',

  components: {
    ChevronDownIcon,
    MagnifyingGlassIcon,
    XMarkIcon
  },
  data() {
    return {
      proceed_to_otp: false,
      activeModal: null,
      activeDropdown: null,
      openedDropdown: null,

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
          _id: 11
        },

        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 40,
          _id: 10,
          banned: true
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 9
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 1,
          _id: 8
        },
        {
          name: 'AK-47s',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 46,
          _id: 7
        },
        {
          name: 'AK-47t',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 90,
          _id: 6
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 5
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 130,
          _id: 4
        },
        {
          name: 'AK-47 banned ',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 2,
          banned: true
        },
        {
          name: 'timer banned',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 20,
          _id: 3,
          banned: true,
          timer: '13D - 23H - 59M - 59S'
        }
      ],
      sort: 'highest amount first',
      sorting: ['newest first', 'oldest first', 'highest amount first', 'lowest amount first'],
      searchQuery: '',
      selectedItems: []
    }
  },
  methods: {
    filterNumbers(event) {
      this.phoneNumber = event.target.value.replace(/\D/g, '').slice(0, 10)
    },
    filterNumbersAmount(event) {
      this.amount_of_bets = event.target.value.replace(/\D/g, '').slice(0, 10)
    },
    openModalFromModal(name, props) {
      openModalFromModal(name, props)
    },
    chatPosition(position) {
      this.chat = position
    },
    toggleModal(name) {
      this.activeModal = name
    },
    setDuration(item) {
      this.ban_duration = item
      this.activeDropdown = null
    },
    validateField(field) {
      this.touched[field] = true
    },
    handleSubmit() {
      this.touched.email = true
      this.touched.message = true

      if (this.formValid) {
        console.log('Form submitted:', {
          email: this.email,
          message: this.message
        })
      }
    },
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
      if (this.selectedItems.includes(item)) {
        this.selectedItems = this.selectedItems.filter((selectedItem) => selectedItem !== item)
      } else {
        this.selectedItems.push(item)
      }
    },
    isSelected(item) {
      return this.selectedItems.includes(item)
    },
    bannedSkinsCount() {
      return this.inventory.filter((item) => item.banned).length
    },
    banSkins() {
      this.inventory.map((item) => {
        this.selectedItems.map((selected) => {
          if (item === selected && !item.banned) {
            item.banned = true
          }
        })
      })
      this.selectedItems = []
    },
    unBanSkins() {
      this.inventory.map((item) => {
        this.selectedItems.map((selected) => {
          if (item === selected && item.banned) {
            item.banned = false
          }
        })
      })

      this.selectedItems = []
    }
  },
  mounted() {
    if (this.initialTab != '') {
      this.selectedTab = this.initialTab
    }

    this.position =
      this.selectedTab == 'statistics'
        ? 0
        : this.selectedTab == 'game history'
          ? 0.95
          : this.selectedTab == 'self ban'
            ? 2.1
            : this.selectedTab == 'settings'
              ? 2.9
              : this.selectedTab == 'transactions'
                ? 3.75
                : this.selectedTab == 'affiliates'
                  ? 4.9
                  : this.selectedTab == 'ban your skins'
                    ? 5.8
                    : 7.1
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
  background: #870000;
  border-radius: 4px;
}

.radio input {
  position: absolute;
  opacity: 0; /* Hide the default radio button */
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 2px solid #ff3435;
}

.checkmark::after {
  content: '';
  position: absolute;
  /* display: none; */
  opacity: 0;
  left: 3px;
  top: -2px;
  height: 14px;
  width: 16px;
  /* width: 5px;
    height: 10px; */
  /* border: solid white; */
  /* border-width: 0 2px 2px 0;
    transform: rotate(45deg); */
  z-index: 2;
  background-image: url(../../assets/img/tick.png);
  background-size: contain;
  transition: opacity ease-in-out 100ms;
}

.radio input:checked ~ .checkmark::after {
  /* display: block; */
  opacity: 1;
}
.card .cardHover {
  height: 0;
  width: 0;
  opacity: 0;
}
.card:hover {
  z-index: 100;
  width: 125.5px;
}
.card:hover .cardHover {
  display: flex;

  width: 190px;
  opacity: 1;
  position: absolute;
  border: 0.5px solid rgba(255, 52, 53, 0.5);
  z-index: 100;
  display: flex;
  transition: all 200ms ease-in-out;
}
.card:hover .cardHover.withTimer {
  height: 226px;
}
.card:hover .cardHover.withoutTimer {
  height: 195px;
}
</style>
