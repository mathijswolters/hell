<template>
  <div
    class="relative w-full sm:min-w-[450px] pt-4 pb-1 flex-col transform transition-all bg-[rgba(98,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-lg"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-[#FF3435] stroke-2"
      @click="closeModal()"
    />

    <div class="py-2 px-4 sm:px-6 h-full flex flex-col gap-4 items-center justify-center">
      <div
        class="text-white text-base sm:text-lg sm:text-[20px] font-semibold font-Rubik leading-normal flex items-end gap-x-1 flex-wrap"
      >
        FOR FREE EVERY 30 MINUTES!
      </div>
      <div class="relative flex items-center justify-center flex-col">
        <div class="-mt-2 text-white text-[25px] font-bold font-Rubik">
          <span class="text-white text-[25px] font-bold font-Rubik">1 FREE</span>
          (<span class="text-[#04ab53] text-[25px] font-Rubik font-bold">$</span>0.03 -
          <span class="text-[#04ab53] text-[25px] font-Rubik font-bold">$</span>0.15) SKIN
        </div>
      </div>
      <div class="relative flex items-center justify-center flex-col gap-4">
        <span class="text-white text-sm font-medium font-Rubik">Available Free Skins</span>
        <div class="flex gap-3">
          <div v-for="item in items" :key="item._id" class="w-[61px] flex flex-col gap-1">
            <div
              class="h-[85px] w-full flex flex-col gap-0.5 p-1 transition-all cursor-pointer"
              @click="selected_item = item"
              :class="{
                'scale-105 bg-[#FF3435]': selected_item == item,
                'bg-[#A41B1B] hover:scale-105 hover:bg-[#FF3435]': selected_item !== item
              }"
            >
              <span class="text-white/70 text-right font-Rubik text-xs font-semibold">
                <span
                  class="font-Rubik text-xs font-semibold "
                  :class="{
                    'text-[#A41B1B]': selected_item == item,
                    'text-[#FF3435]/70': selected_item !== item
                  }"
                  >X</span
                >
                {{ item.available }}</span
              >
              <div class="flex items-center justify-center max-h-[42px]">
                <img :src="item.image" class="h-full w-full" />
              </div>
              <span class="text-white text-center font-Rubik text-xs font-semibold">{{
                Number(item.price).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center flex-col gap-y-2 w-full">
        <div
          class="h-11 px-2.5 py-1 bg-[rgba(255,52,53,1)] rounded-sm flex justify-center items-center gap-2.5 text-white text-xs sm:text-sm font-medium font-Rubik leading-normal w-full max-w-[197px] transition-all duration-200"
          :class="{
            'opacity-50': !requirements_met || time > 0,
            'opacity-100 hover:translate-y-[-2px] hover:opacity-80 cursor-pointer':
              requirements_met && time == 0
          }"
        >
          {{
            requirements_met ? (time > 0 ? formattedTime : 'Claim $0.03') : 'Complete equirements'
          }}
        </div>
      </div>
      <div class="text-white text-base font-bold font-Rubik w-full mt-4">
        Complete these requirements for free mula.
      </div>
      <div class="w-full flex flex-col -mt-2">
        <span class="flex items-center gap-x-1">
          <div class="w-1 h-1 bg-[#d9d9d9] rounded-full" />
          <div class="text-center">
            <span
              class="text-white text-sm font-medium font-Rubik"
              :class="{
                'opacity-70': !joined_discord
              }"
              >Join our</span
            ><a href="/" target="blank" class="text-[#ff3435] text-sm font-medium font-Rubik ml-0.5"
              >Discord server</a
            >
          </div>
          <img
            v-if="joined_discord"
            src="../../../assets/icons/green_tick.png"
            class="select-none"
          />
        </span>

        <span class="flex items-center gap-x-1">
          <div class="w-1 h-1 bg-[#d9d9d9] rounded-full" />
          <div class="text-center">
            <span
              class="text-white text-sm font-medium font-Rubik"
              :class="{
                'opacity-70': !level_5
              }"
              >Level 5+ on steam</span
            >
          </div>
          <img v-if="level_5" src="../../../assets/icons/green_tick.png" class="select-none" />
        </span>
        <span class="flex items-center gap-x-1">
          <div class="w-1 h-1 bg-[#d9d9d9] rounded-full" />
          <div class="text-center">
            <span
              class="text-white text-sm font-medium font-Rubik"
              :class="{
                'opacity-70': !steam_name
              }"
              >Put
            </span>
            <span
              class="text-white text-sm font-medium font-Rubik bg-[rgba(255,52,53,0.4)] px-1 rounded"
              :class="{
                'text-white/70': !steam_name
              }"
            >
              Hell.gg</span
            >
            <span
              class="text-white text-sm font-medium font-Rubik"
              :class="{
                'opacity-70': !steam_name
              }"
            >
              in your steam name</span
            >
          </div>
          <img v-if="steam_name" src="../../../assets/icons/green_tick.png" class="select-none" />
        </span>
        <span class="flex items-center gap-x-1">
          <div class="w-1 h-1 bg-[#d9d9d9] rounded-full" />
          <div class="text-center">
            <span
              class="text-white text-sm font-medium font-Rubik"
              :class="{
                'opacity-70': !less_than_10cents
              }"
              >Have less
            </span>
            <span
              class="text-white text-sm font-medium font-Rubik"
              :class="{
                'text-white/70 underline decoration-[rgba(255,52,53,1)] decoration-wavy':
                  !less_than_10cents
              }"
            >
              than $0.10 in
            </span>
            <span
              class="text-white text-sm font-medium font-Rubik"
              :class="{
                'opacity-70': !less_than_10cents
              }"
            >
              your balance</span
            >
          </div>
          <img
            v-if="less_than_10cents"
            src="../../../assets/icons/green_tick.png"
            class="select-none"
          />
        </span>
        <span class="flex items-center gap-x-1">
          <div class="w-1 h-1 bg-[#d9d9d9] rounded-full" />
          <div class="text-center">
            <span
              class="text-white text-sm font-medium font-Rubik"
              :class="{
                'text-white/70 underline decoration-[rgba(255,52,53,1)] decoration-wavy':
                  !public_inventory
              }"
            >
              Steam profile & inventory MUST be public
            </span>
          </div>
          <img
            v-if="public_inventory"
            src="../../../assets/icons/green_tick.png"
            class="select-none"
          />
        </span>
      </div>
      <div
        class="h-7 flex items-center justify-center w-full border-[rgba(255,52,53,1)] border border-solid rounded text-white font-medium font-Rubik text-xs sm:text-sm"
        v-if="!requirements_met"
      >
        Please make sure to complete all the requirements
      </div>
    </div>
  </div>
</template>

<script>
import { UserGroupIcon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
export default {
  name: 'free_mula',
  props: {
    remainingTime: Number
  },
  components: {
    XMarkIcon,
    UserGroupIcon
  },
  data() {
    return {
      promoCode: null,
      isLoading: false,
      message: '',
      isSuccess: false,
      timerStarted: false,
      redeemed: false,
      time: 0,
      joined_discord: false,
      steam_name: false,
      level_5: false,
      less_than_10cents: false,
      public_inventory: true,
      items: [
        {
          _id: 1,
          image: 'https://skinsmonkey.com/_nuxt/img/mp5.6d6fef9.png',
          price: 0.09,
          available: 1
        },
        {
          _id: 2,
          image: 'https://app.skin.land/market_images/163243_b.png',
          price: 0.1,
          available: 5
        },
        {
          _id: 3,
          image:
            'https://community.cloudflare.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835ZY4GLMfCk4nReh8DEiv5dePaA-rLw2RfiwB3aCig/200fx200f',
          price: 0.11,
          available: 10
        },
        {
          _id: 4,
          image: 'https://rustcasino.com/_ipx/f_webp&s_180x180/images/wiki/rust/redemption-sar.png',
          price: 0.13,
          available: 20
        },
        {
          _id: 5,
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ja5WrMfDY0jhyo8DEiv5daMKk6r70yQoJpxfiC/360fx360f',
          price: 0.15,
          available: 3
        }
      ],
      selected_item: {}
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    startTimer() {
      this.timerStarted = true
      this.interval = setInterval(() => {
        if (this.time > 0) {
          this.time -= 1
        } else {
          clearInterval(this.interval)
          this.timerStarted = false
          this.redeemed = false
        }
      }, 1000) // Update every second
    },
    stopTimer() {
      clearInterval(this.interval)
      this.timerStarted = false
    },
    openModal(name) {
      openModalFromModal(name)
    }
  },
  mounted() {
    this.time = this.remainingTime
    if (this.requirements_met && this.remainingTime > 0) {
      this.startTimer()
    }
  },
  computed: {
    requirements_met() {
      if (
        this.joined_discord &&
        this.steam_name &&
        this.level_5 &&
        this.less_than_10cents &&
        this.public_inventory
      ) {
        return true
      } else return false
    },
    formattedTime() {
      const minutes = Math.floor(this.time / 60)
      const seconds = this.time % 60
      return `${minutes}m ${seconds}s`
    }
  }
}
</script>
