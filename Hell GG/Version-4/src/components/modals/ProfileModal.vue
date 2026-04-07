<template>
  <div>
    <div
      class="relative w-[calc(100vw-2rem)] 2xl:min-w-[1466px] max-w-[1466px] flex-col transform max-h-[95vh] h-[95vh] xl:h-[800px] transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border overflow-hidden"
    >
      <!-- Header Start -->
      <div
        class="flex relative w-full py-4 xl:py-0 xl:h-[59px] items-center border-solid border-b-2 border-[#620101] px-4"
      >
        <div
          class="flex flex-wrap items-center h-full gap-6 relative"
          :style="{ '--position': position }"
        >
          <div
            class="hidden xl:flex w-10 h-0.5 bg-[#FF3435] absolute -bottom-0.5 -ml-1 transition-all duration-300"
            :class="{
              'w-[6.5rem]': selectedTab == 'statistics' || selectedTab == 'affiliates',
              'w-[7.9rem]': selectedTab == 'game history',
              'w-[9.2rem]': selectedTab == 'ban your skins',
              'w-[8rem]': selectedTab == 'transactions' || selectedTab == 'sponsorship',
              'w-[5.2rem]': selectedTab == 'self ban' || selectedTab == 'settings'
            }"
            :style="{
              left: `calc((100% / 8) * ${position})`
            }"
          ></div>
          <span
            v-for="(tab, index) in tabs"
            :key="index"
            @click="
              (selectedTab = tab),
                selectedTab == 'statistics'
                  ? (position = 0)
                  : selectedTab == 'game history'
                    ? (position = 0.95)
                    : selectedTab == 'self ban'
                      ? (position = 2.1)
                      : selectedTab == 'settings'
                        ? (position = 2.9)
                        : selectedTab == 'transactions'
                          ? (position = 3.75)
                          : selectedTab == 'affiliates'
                            ? (position = 4.9)
                            : selectedTab == 'ban your skins'
                              ? (position = 5.8)
                              : (position = 7.1)
            "
            class="font-Rubik font-bold text-base cursor-pointer text-white transition-all duration-200 hover:scale-105 uppercase"
            :class="{ 'opacity-50': selectedTab != tab }"
          >
            {{ tab }}
          </span>
        </div>
        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7] absolute top-2 right-0 sm:top-4 sm:right-4"
          @click="closeModal()"
        />
      </div>
      <div
        class="pb-2 px-4 pt-2 sm:pt-6 h-full max-h-[calc(100vh-10rem)] sm:max-h-[calc(100vh-8rem)] xl:max-h-[calc(100vh-6.4rem)] 2xl:max-h-[46rem] overflow-y-auto"
      >
        <div class="flex flex-col w-full h-full gap-y-2" v-if="selectedTab === 'self ban'">
          <span class="text-white font-Rubik font-extrabold text-2xl">SELF-BAN</span>
          <span class="uppercase text-[rgb(255,255,255,0.5)] font-medium font-Rubik text-base"
            >If you want to stop using the website, use this feature to ban yourself.</span
          >
          <div class="flex gap-4 items-center flex-wrap h-auto md:h-11 mt-4">
            <div class="relative h-11 w-full md:w-auto">
              <div
                class="h-full w-full sm:w-auto md:w-80 flex items-center justify-between bg-[#620101] px-2 text-base font-Rubik font-bold text-[rgb(255,255,255,0.5)] cursor-pointer rounded-sm relative z-20"
                @click="
                  activeDropdown == 'ban_duration'
                    ? (activeDropdown = null)
                    : (activeDropdown = 'ban_duration')
                "
              >
                BAN DURATION
                <ChevronDownIcon
                  class="fill-white stroke-white w-5 transition-all"
                  :class="{
                    '-rotate-180': activeDropdown == 'ban_duration'
                  }"
                />
              </div>
              <div
                class="absolute w-full bg-[#620101] left-0 transition-all z-10 top-0 overflow-hidden rounded-b-sm search"
                :class="{
                  ' h-0    mt-0 ': activeDropdown != 'ban_duration',
                  'w-full h-56  mt-[44px]   ': activeDropdown == 'ban_duration'
                }"
              >
                <div class="h-full pt-1 overflow-auto">
                  <div class="px-2 w-full">
                    <input
                      type="text"
                      class="w-full min-h-[34px] h-[34px] rounded-sm bg-[#991313] px-2 placeholder:text-[rgb(255,255,255,0.5)] font-Rubik font-semibold text-base outline-none text-white"
                      placeholder="Type BAN duration..."
                    />
                  </div>

                  <div
                    v-for="(item, index) in self_ban"
                    :key="index"
                    class="mt-2 rounded-sm hover:bg-[#E82D2E] min-h-[46px] h-[46px] px-2 flex items-center cursor-pointer gap-x-2 capitalize text-white font-Rubik font-extrabold text-base"
                    @click="setDuration(item)"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>

            <button
              v-if="ban_duration != null && ban_duration != ''"
              class="bg-[#E82D2E80] h-11 px-4 flex items-center justify-center w-full sm:w-auto lg:w-96 border border-solid border-[#e82d2e] rounded-sm text-[rgb(255,255,255,0.5)] font-Rubik font-medium text-sm md:text-base capitalize"
              @click="openModalFromModal('self-ban')"
            >
              BAN ACCOUNT FOR {{ ban_duration }}
            </button>
          </div>

          <label
            class="flex items-center relative pl-6 cursor-pointer text-base select-none radio mt-2"
          >
            <input type="checkbox" v-model="understand" :value="understand" />
            <span class="checkmark"></span>
            <span class="text-base font-Rubik text-white font-semibold"
              >I understand that staff CANNOT LIFT THIS BAN whatsoever
            </span>
          </label>
        </div>
        <div class="flex flex-col w-full h-full gap-y-2" v-if="selectedTab === 'ban your skins'">
          <Ban_skins />
        </div>

        <div class="flex flex-col w-full h-full gap-y-2" v-if="selectedTab === 'settings'">
          <Settings />
        </div>
        <div class="flex flex-col w-full h-full gap-y-2" v-if="selectedTab === 'game history'">
          <Game_History />
        </div>
        <div class="flex flex-col w-full h-full gap-y-2" v-if="selectedTab === 'transactions'">
          <Transactions />
        </div>
        <div class="flex flex-col w-full h-full gap-y-2" v-if="selectedTab === 'sponsorship'">
          <Sponsorship />
        </div>
        <div class="flex flex-col w-full h-full gap-y-2" v-if="selectedTab === 'affiliates'">
          <Affiliates />
        </div>
        <div class="flex flex-col w-full h-full gap-y-2" v-if="selectedTab === 'statistics'">
          <Statistics />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Game_History from './profile_modal/Personal_Game_History.vue'
import Transactions from './profile_modal/Transactions_tab.vue'
import Sponsorship from './profile_modal/Sponsorship_tab.vue'
import Affiliates from './profile_modal/Affiliates_tab.vue'
import Statistics from './profile_modal/Statistics_tab.vue'
import Settings from './profile_modal/Settings_tab.vue'
import Ban_skins from './profile_modal/Ban_your_skins_tab.vue'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { openModalFromModal } from '@/modalStore'
import { chatPosition, chat_position } from '@/chatStore'
import { countryCodes } from '@/assets/countryCodes'
export default {
  setup() {
    return {
      chat_position
    }
  },
  name: 'support_modal',
  props: {
    initialTab: String
  },
  components: {
    XMarkIcon,
    ChevronDownIcon,
    Game_History,
    Transactions,
    Sponsorship,
    Affiliates,
    Statistics,
    Settings,
    Ban_skins
  },
  data() {
    return {
      proceed_to_otp: false,
      email: '',
      otpValue: '',
      verfification_type: null,
      opt_out_rewards: false,
      amount_of_bets: 0,
      itemsNotification: false,
      coinflipNotification: false,
      chat: 'left',
      countries: countryCodes,
      selectedCountryCode: countryCodes[0].dial_code,
      phoneNumber: '',
      promo: false,
      activeModal: null,
      activeDropdown: null,
      position: 0,
      understand: false,
      openedDropdown: null,
      tabs: [
        'statistics',
        'game history',
        'self ban',
        'settings',
        'transactions',
        'affiliates',
        'ban your skins',
        'sponsorship'
      ],
      self_ban: [
        '2 hours',
        '6 hours',
        '12 hours',
        '1 day',
        '2 days',
        '3 days',
        '1 week',
        '2 weeks',
        '1 month',
        '3 months',
        '6 months',
        '1 year',
        'permenant'
      ],
      ban_duration: '',
      selectedTab: 'statistics',
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
      chatPosition(this.chat)
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
    this.chat = chat_position.position
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
    fullPhoneNumber() {
      return this.selectedCountryCode + this.phoneNumber
    },
    emailValid() {
      return /\S+@\S+\.\S+/.test(this.email)
    },
    messageValid() {
      return this.message.trim().length > 0
    },
    formValid() {
      return this.emailValid && this.messageValid
    },
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
