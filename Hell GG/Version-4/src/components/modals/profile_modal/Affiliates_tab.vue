<template>
  <Transition
    name="modal"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
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
      <div class="backdrop-blur-xl">
        <div
          class="relative md:min-w-[600px] max-w-[70vw] sm:max-w-[600px] flex-col transform min-h-10 transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] rounded border shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)] h-full max-h-[90vh] 2xl:max-h-[700px] overflow-auto"
        >
          <div class="flex items-center flex-col gap-y-2 w-full py-2 px-2">
            <span
              class="text-center font-Rubik text-[27px] font-medium text-white py-2 border-b border-b-solid border-b-[rgba(98,1,1,1)] w-full max-w-[393px]"
              >Affiliates Tiers
            </span>
            <div class="w-full flex flex-wrap items-center justify-center gap-2">
              <div
                class="h-[103px] max-w-[282px] w-full bg-[rgba(98,1,1,1)] border border-solid border-[rgba(255,52,53,1)] rounded-sm flex flex-col gap-y-1 p-2"
                v-for="(item, index) in affiliate_tiers"
                :key="index"
              >
                <span class="text-white font-Rubik font-bold text-xl">{{ item.label }}</span>
                <div
                  class="h-[10px] w-full bg-[rgba(255,52,53,0.5)] rounded-full overflow-hidden flex justify-start"
                >
                  <div
                    class="bg-[rgba(255,52,53,1)] rounded-full"
                    :style="{
                      width: item.new_users_percentage + item.existing_users_percentage + '%'
                    }"
                  ></div>
                </div>
                <span class="text-white font-Rubik font-normal text-sm"
                  >New Users: {{ item.new_users_percentage }}%</span
                >
                <span class="text-white font-Rubik font-normal text-sm"
                  >Existing Users: {{ item.existing_users_percentage }}%</span
                >
              </div>
            </div>
            <span class="text-white opacity-65 font-Rubik font-normal text-sm text-center">
              There are multiple Referral tiers that increase in percentage as you refer more users.
              We classify an Existing User as a user who has been active on our website two or more
              unique calendar days in the past 180 days. Everyone else is considered a New User for
              Affiliate purposes. Affiliate tiers may be adjusted at anytime without notice.
            </span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <div class="flex gap-2 w-full gap-y-5 flex-wrap xl:flex-nowrap affiliates">
    <!-- left -->
    <div class="lg:h-[max-content] w-full xl:max-w-[489px] flex flex-col gap-y-2">
      <div class="w-full p-4 flex flex-col gap-y-3 bg-[rgba(98,1,1,1)] rounded-sm">
        <div class="flex items-center gap-x-3">
          <img src="../../../assets/img/user/userImage.png" class="rounded-full w-16 h-16" />
          <span class="font-Rubik font-bold text-white text-2xl">Ilovebread</span>
        </div>
        <hr class="border-transparent h-px w-full bg-[rgba(66,1,1,1)]" />
        <div class="flex items-center gap-x-3">
          <img src="../../../assets/img/dollarCoin.png" />
          <span class="font-Rubik font-bold text-white text-[27px]">0.00/00,000.00</span>
        </div>
        <div
          class="flex items-center gap-x-2 text-white text-base font-Rubik font-bold whitespace-nowrap"
        >
          Tier 1
          <div
            class="my-2 h-[13px] w-full bg-[rgba(66,1,1,1)] rounded-full overflow-hidden flex justify-start whitespace-nowrap"
          >
            <div class="bg-[rgba(255,52,53,1)]" :style="{ width: experience + '%' }"></div>
          </div>
          Tier 2
        </div>
        <button
          class="w-full h-8 rounded-sm bg-[rgba(66,1,1,1)] text-white text-sm font-Rubik font-bold"
          @click="activeModal = 'view tiers'"
        >
          VIEW TIERS
        </button>
      </div>
      <div class="w-full p-4 flex flex-col gap-y-3 bg-[rgba(98,1,1,1)] rounded-sm">
        <span class="text-white text-base font-Rubik font-bold">AVAILABLE EARNINGS</span>
        <div
          class="flex items-center justify-center p-2 bg-[rgba(66,1,1,1)] rounded-sm h-14 text-white text-2xl font-Rubik font-bold"
        >
          $23,352.89
        </div>
        <button
          class="text-white text-[27px] font-Rubik font-bold h-14 bg-[rgba(4,171,83,1)] rounded-sm"
        >
          CLAIM NOW
        </button>
      </div>
      <div class="w-full p-4 flex flex-col gap-y-3 bg-[rgba(98,1,1,1)] rounded-sm">
        <span class="text-white text-base font-Rubik font-bold">YOUR REFERAL CODES</span>
        <span
          class="text-white text-sm font-Rubik flex w-full items-center justify-between font-bold"
          >Referal codes in use
          <span class="flex items-center text-base font-Rubik font-bold text-[rgba(4,171,83,1)]"
            >0
            <p class="text-base font-Rubik font-bold text-white">
              /{{ referalCodes.length }}
            </p></span
          ></span
        >
        <div class="relative flex items-center w-full h-14">
          <input
            type="text"
            v-model="referalTyping"
            class="w-full h-full rounded-sm bg-[rgba(66,1,1,1)] text-white placeholder:text-[rgb(255,255,255,0.5)] pl-2 pr-[80px] outline-none"
            placeholder="Type code here..."
          />
          <button
            class="text-white text-xs absolute right-2 font-Rubik font-bold h-6 bg-[rgba(255,52,53,1)] rounded-sm w-[65px]"
            @click="updateReferalCode"
          >
            UPDATE
          </button>
        </div>
        <div
          class="relative flex items-center w-full h-9 bg-[rgba(49,0,0,1)] px-2 text-sm font-Rubik font-bold text-[rgb(255,255,255,0.5)]"
          v-for="(item, index) in referalCodes"
          :key="index"
        >
          {{ item }}
          <img
            src="../../../assets/icons/copy.png"
            class="absolute right-2 cursor-pointer"
            @click="copyToClipboard(item)"
          />
        </div>
        <button
          class="text-white text-xl font-Rubik font-bold h-9 bg-[rgba(255,52,53,1)] rounded-sm flex items-center gap-x-1 justify-center outline-none"
          @click="addReferalCode()"
        >
          <p class="font-black">+</p>
          Add referral code
        </button>
      </div>
    </div>
    <!-- right -->
    <div class="lg:h-full w-full xl:max-w-[calc(100%-489px)] flex flex-col gap-y-2">
      <div
        class="flex flex-col sm:flex-row gap-2 w-full items-center justify-between pb-2 border-b-[2px] border-b-solid border-b-[rgba(98,1,1,1)]"
      >
        <div class="flex items-center gap-x-2">
          <div class="relative h-full">
            <div
              class="h-11 w-[190px] flex items-center justify-between bg-[#620101] px-2 text-base font-Rubik font-bold text-[rgb(255,255,255,0.5)] cursor-pointer rounded-sm relative z-20"
              @click="
                active_dropdown == 'types' ? (active_dropdown = null) : (active_dropdown = 'types')
              "
            >
              <span
                class="flex items-center gap-x-1 text-base font-Rubik font-bold text-[rgb(255,255,255,0.5)]"
              >
                <span
                  class="text-base font-Rubik font-bold text-[rgb(255,255,255,1)] uppercase truncate max-w-[11rem]"
                  >{{ selectedOption }}</span
                >
              </span>

              <ChevronDownIcon
                class="stroke-white w-5 transition-all"
                :class="{
                  '-rotate-180': active_dropdown == 'types'
                }"
              />
            </div>
            <div
              class="absolute w-full left-0 transition-all z-10 top-0 overflow-hidden rounded-b-sm search px-px pb-px"
              :class="{
                ' h-0 bg-transparent   mt-0 ': active_dropdown != 'types',
                'w-full h-54 bg-[linear-gradient(180deg,#620101_0%,#FF3435_100%)]  mt-[44.8px]   ':
                  active_dropdown == 'types'
              }"
            >
              <div class="h-full bg-[rgba(98,1,1,1)] overflow-auto rounded-b-sm">
                <div
                  v-for="(item, index) in options"
                  :key="index"
                  class="mt-2 rounded-sm hover:bg-[#E82D2E] min-h-[46px] h-[46px] px-2 flex items-center cursor-pointer gap-x-2 uppercase text-white font-Rubik font-extrabold text-base"
                  @click="selectOption(item), (active_dropdown = null)"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between w-full sm:w-fit sm:justify-normal items-center gap-x-2">
          <div
            class="flex order-2 sm:order-1 items-center justify-center h-11 relative"
            ref="dropdownContainer"
          >
            <button
              class="h-full bg-[rgba(254,189,17,1)] text-white rounded-sm px-2 font-Rubik font-bold text-base flex items-center gap-x-2 outline-none"
              @click="
                active_dropdown == 'date' ? (active_dropdown = null) : (active_dropdown = 'date')
              "
            >
              <CalendarIcon class="w-[20px] stroke-white transition-all" />
              <ChevronDownIcon
                class="w-4 stroke-white transition-all"
                :class="{
                  '-rotate-180': active_dropdown == 'date',
                  'z-20': active_dropdown != 'date'
                }"
              />
            </button>
            <div
              class="absolute bg-[#420101] rounded-md border border-solid border-[#620101] right-0 transition-all flex items-center justify-center"
              :class="{
                'w-0 h-0 opacity-0 top-0  mt-0 -z-10': active_dropdown != 'date',
                'md:w-[387px] w-[300px] h-[345px] opacity-100 top-full mt-1.5 z-10': active_dropdown == 'date'
              }"
            >
              <DatePicker
                :class="{
                  'opacity-0': active_dropdown != 'date',
                  'opacity-100 transition-opacity duration-500': active_dropdown == 'date'
                }"
              />
            </div>
          </div>
          <div class="relative h-full sm:order-2 order-1">
            <div
              class="h-11 w-[190px] flex items-center justify-between bg-[#620101] px-2 text-base font-Rubik font-bold text-[rgb(255,255,255,0.5)] cursor-pointer rounded-sm relative z-20"
              @click="
                active_dropdown == 'time' ? (active_dropdown = null) : (active_dropdown = 'time')
              "
            >
              <span
                class="flex items-center gap-x-1 text-base font-Rubik font-bold text-[rgb(255,255,255,0.5)]"
              >
                <span
                  class="text-base font-Rubik font-bold text-[rgb(255,255,255,1)] uppercase truncate max-w-[11rem]"
                  >{{ selectedTime }}</span
                >
              </span>

              <ChevronDownIcon
                class="stroke-white w-5 transition-all"
                :class="{
                  '-rotate-180': active_dropdown == 'time'
                }"
              />
            </div>
            <div
              class="absolute w-full left-0 transition-all z-10 top-0 overflow-hidden rounded-b-sm search px-px pb-px"
              :class="{
                ' h-0 bg-transparent   mt-0 ': active_dropdown != 'time',
                'w-full h-56 bg-[linear-gradient(180deg,#620101_0%,#FF3435_100%)]  mt-[44.8px]   ':
                  active_dropdown == 'time'
              }"
            >
              <div class="h-full bg-[rgba(98,1,1,1)] overflow-auto rounded-b-sm">
                <div
                  v-for="(item, index) in time"
                  :key="index"
                  class="mt-2 rounded-sm hover:bg-[#E82D2E] min-h-[46px] h-[46px] px-2 flex items-center cursor-pointer gap-x-2 capitalize text-white font-Rubik font-extrabold text-base"
                  @click="selectTime(item), (active_dropdown = null)"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chart />
      <div class="grid md:grid-cols-3 w-full gap-2 mt-2">
        <div
          v-for="(item, index) in affiliates"
          :key="index"
          class="h-32 bg-[rgba(98,1,1,1)] rounded-sm p-4 flex flex-col gap-y-3 items-center justify-center"
        >
          <div class="flex items-center gap-x-4 justify-start w-full">
            <img
              src="../../../assets/icons/affiliates/People.png"
              v-if="item.title.includes('all referees')"
            />
            <img v-else src="../../../assets/icons/affiliates/coinDollarSign.png" />
            <div class="flex justify-center gap-y-0.5 flex-col text-xs">
              <span class="text-white font-bold font-Rubik uppercase"> {{ item.title }}</span>
              <span class="font-bold font-Rubik text-white/50">(Equal) vs prev period</span>
            </div>
          </div>
          <div
            class="w-full bg-[rgba(66,1,1,1)] h-8 flex items-center justify-center text-white gap-x-1 text-sm font-bold font-Rubik"
          >
            <img
              v-if="!item.title.includes('all referees')"
              src="../../../assets/img/dollarCoin.png"
              class="w-[17px] h-[17px] -mt-0.5"
            />
            {{
              item.title.includes('all referees')
                ? item.value
                : Number(item.value).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
            }}
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-2 w-full">
        <span class="font-Rubik text-white font-bold text-base">REFEREES LIST</span>
        <div class="w-full overflow-x-auto">
          <div
            class="flex flex-col gap-y-2 w-full bg-[rgba(98,1,1,1)] p-2 rounded-sm min-w-[901px]"
          >
            <div
              class="grid grid-cols-5 w-full h-8 items-center border-b border-b-solid border-b-[rgba(66,1,1,1)] px-2"
            >
              <span class="font-Rubik text-xs font-bold text-white/50">Name</span>
              <span class="font-Rubik text-xs font-bold text-white/50">Deposited</span>
              <span class="font-Rubik text-xs font-bold text-white/50">Commission</span>
              <span class="font-Rubik text-xs font-bold text-white/50">Last Deposited</span>
              <span class="font-Rubik text-xs font-bold text-white/50">Last Seen</span>
            </div>
            <div class="min-h-[7rem]">
              <div
                v-for="item in referees"
                :key="item._id"
                class="grid grid-cols-5 w-full h-8 min-h-8 max-h-8 items-center px-2"
              >
                <span
                  class="font-Rubik text-[10px] flex items-center gap-x-1 font-semibold text-white"
                >
                  <div class="relative">
                    <div
                      class="w-[18px] h-[18px] rounded-full bg-no-repeat bg-center bg-cover"
                      :style="{
                        backgroundImage: `url(${item.avatar})`
                      }"
                    ></div>
                    <div
                      class="rounded-full absolute -left-0.5 -bottom-0.5 bg-[rgba(255,52,53,1)] w-2 h-2"
                    ></div>
                  </div>

                  {{ item.name }}
                </span>
                <span
                  class="font-Rubik text-[10px] font-medium text-white flex items-center gap-x-1"
                >
                  <img src="../../../assets/img/dollarCoin.png" class="w-[13px] h-[13px] -mt-0.5" />
                  {{
                    Number(item.deposited).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })
                  }}
                </span>
                <span
                  class="font-Rubik text-[10px] font-medium text-white flex items-center gap-x-1"
                >
                  <img src="../../../assets/img/dollarCoin.png" class="w-[13px] h-[13px] -mt-0.5" />
                  {{
                    Number(item.commission).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })
                  }}
                </span>
                <span class="font-Rubik text-[10px] font-medium text-white flex gap-x-1 opacity-50">
                  <div
                    class="w-[13px] h-[13px] rounded-full border border-solid border-white"
                  ></div>
                  {{ formatDateTime(item.last_deposited) }}
                </span>
                <span class="font-Rubik text-[10px] font-medium text-white flex gap-x-1 opacity-50">
                  <div
                    class="w-[13px] h-[13px] rounded-full border border-solid border-white"
                  ></div>
                  {{ formatDateTime(item.last_seen) }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- Footer Start -->
        <div
          class="bg-[rgba(98,1,1,1)] flex items-center justify-center sm:justify-between md:justify-center flex-wrap w-full relative -mt-2 p-2"
        >
          <div class="md:w-full md:h-full flex items-center justify-start">
            <div class="flex gap-x-2 items-center text-[#d7b7b7] font-Rubik font-semibold text-xs">
              Rows per page
              <span
                class="flex justify-center items-center text-white font-Rubik font-semibold text-xs cursor-pointer fill-[#d7b7b7] stroke-[#d7b7b7] relative bg-[#E82D2E] p-1"
                @click="rows_dropdown = !rows_dropdown"
              >
                {{ rows_per_page }} <ChevronUpDownIcon class="w-4" />
                <div
                  v-if="rows_dropdown"
                  class="w-full absolute left-0 bottom-full bg-[rgba(66,1,1,1)] z-20 flex flex-col rounded-t-sm"
                >
                  <div
                    v-for="(item, index) in rows_options"
                    :key="index"
                    @click="rows_per_page = item"
                    class="cursor-pointer py-1 hover:bg-[#E82D2E] w-full uppercase text-center justify-center"
                  >
                    {{ item }}
                  </div>
                </div>
              </span>
            </div>
          </div>
          <!-- controls -->
          <div class="md:absolute flex items-center gap-x-2">
            <button
              :disabled="current_page === 1"
              @click="changePage(current_page - 1)"
              class="flex gap-x-2 items-center stroke-white text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
            >
              <ChevronDoubleLeftIcon class="w-4" /> Previous Page
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
              Next Page <ChevronDoubleRightIcon class="w-4" />
            </button>
          </div>
        </div>
        <!-- Footer End -->
      </div>
    </div>
  </div>
</template>
<script>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import {
  CalendarIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronUpDownIcon
} from '@heroicons/vue/24/solid'
import DatePicker from '../../DatePicker.vue'
import Chart from '../../Affiliates_chart.vue'
export default {
  data() {
    return {
      selectedOption: 'total deposits',
      selectedTime: 'all time',
      activeModal: null,
      time: [
        'all time',
        'sessions',
        '1 year',
        '6 months',
        '3 months',
        '1 month',
        '2 weeks',
        '1 week',
        '3 days',
        '1 day',
        '14 hours',
        '6 hours'
      ],
      referees: [
        {
          _id: 1,
          name: 'tester',
          avatar:
            'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
          deposited: 1234,
          commission: 1234,
          last_deposited: '2024-12-29T17:05',
          last_seen: '2024-12-29T17:05'
        }
      ],
      affiliate_tiers: [
        { label: 'Default 5K+', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '50K Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '150K Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '400K Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '750K Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '1.25M Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '2M Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '3M Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '4.5M Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '6.5M Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '9.5M Deposited', new_users_percentage: 2, existing_users_percentage: 10 },
        { label: '14M Deposited', new_users_percentage: 2, existing_users_percentage: 10 }
      ],
      options: ['total deposits', 'code used', 'deposits', 'total earned'],
      affiliates: [
        { title: 'all referees!', value: 0 },
        {
          title: 'comission paid',
          value: 0
        },
        { title: 'total purchased', value: 0 }
      ],
      experience: 30,
      referalTyping: '',
      active_dropdown: null,
      referalCodes: ['https://hell.gg/r/test'],
      rows_dropdown: false,
      rows_per_page: 10,
      current_page: 1,
      rows_options: [10, 20, 30],
      maxVisiblePages: 5
    }
  },
  methods: {
    selectOption(item) {
      this.selectedOption = item
    },
    selectTime(time) {
      this.selectedTime = time
    },
    copyToClipboard(item) {
      navigator.clipboard.writeText(item)
    },
    formatDateTime(dateString) {
      const now = new Date()
      const targetDate = new Date(dateString)
      const diffInSeconds = Math.floor((now - targetDate) / 1000)

      // Conditions for relative time
      if (diffInSeconds < 60) {
        return 'a minute ago'
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
      } else if (diffInSeconds < 172800) {
        return 'a day ago'
      }

      // Fallback: Format fixed date for older entries
      return targetDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    updateReferalCode() {
      if (!this.referalTyping.trim()) {
        return
      }
      if (!this.referalTyping.startsWith('https://hell.gg/r/')) {
        this.referalTyping = `https://hell.gg/r/${this.referalTyping.trim()}`
      }
    },
    addReferalCode() {
      if (!this.referalTyping.trim()) {
        return
      }
      if (!this.referalTyping.includes('https://hell.gg/r/')) {
        this.updateReferalCode()
        if (!this.referalCodes.includes(this.referalTyping)) {
          this.referalCodes.push(this.referalTyping)
          this.referalTyping = ''
        } else {
          alert('This referral code already exists.')
        }
      } else {
        if (!this.referalCodes.includes(this.referalTyping)) {
          this.referalCodes.push(this.referalTyping)
          this.referalTyping = ''
        } else {
          alert('This referral code already exists.')
        }
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.current_page = page
      }
    },
    updatePagination() {
      this.current_page = 1
    }
  },
  mounted() {},

  components: {
    Chart,
    DatePicker,
    ChevronDownIcon,
    CalendarIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronUpDownIcon
  },
  computed: {
    totalPages() {
      return Math.ceil(this.referees.length / this.rows_per_page)
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.rows_per_page
      const end = start + this.rows_per_page
      return this.referees.slice(start, end)
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
  height: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #a60000;
  border-radius: 4px;
}
</style>
