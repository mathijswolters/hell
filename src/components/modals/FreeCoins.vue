<template>
  <div
    class="relative sm:min-w-[480px] py-5 max-w-[650px] flex-col transform transition-all bg-[rgba(74,1,1,1)] backdrop-blur-[200px] border-[#530000] border overflow-hidden rounded-lg"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-[3px] stroke-[rgba(255,52,53,1)]"
      @click="closeModal()"
    />

    <div class="py-2 px-4 h-full flex gap-4 sm:gap-6 items-center justify-center">
      <div class="flex items-center gap-2 sm:gap-4">
        <div
          class="flex flex-col items-center gap-y-0.5 cursor-pointer hover:scale-105 transition-all duration-100"
          @click="openModal('redeem affiliate')"
        >
          <span class="font-Rubik text-white font-medium text-xs sm:text-sm">Affiliates</span>
          <UserGroupIcon class="fill-[rgba(255,52,53,1)] size-12" />
          <span class="flex opacity-30 font-Rubik text-sm text-white font-medium"
            >+
            <p class="font-Rubik text-sm ml-0.5 text-[rgba(4,171,83)] font-medium">$</p>
            0.50</span
          >
        </div>
        
        <div
          class="flex flex-col items-center gap-y-0.5 transition-all duration-100 hover:scale-105 cursor-pointer sn:mb-0"
          @click="openModal('free mula', remainingTime), startTimer"
        >
          <span
            class="font-Rubik text-white font-medium text-xs sm:text-sm"
            @click="redeemed = true"
            >30m Free</span
          >
          <img
            src="../../assets/icons/coinstack.png"
            class="transition-all duration-500 size-12"
            :class="{ 'opacity-30 ': remainingTime > 0 }"            
          />
          <span
            v-if="remainingTime > 0"
            class="flex font-Rubik text-xs sm:text-sm text-white font-medium opacity-30"
            >{{ formattedTime }}</span
          >
          <span v-else class="flex font-Rubik text-sm text-white font-medium"
            >+
            <p class="font-Rubik text-sm ml-0.5 text-[rgba(4,171,83)] font-medium">$</p>
            0.03</span
          >
        </div>
        
        <div
          @click="openModal('promo code')"
          class="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-100"
        >
          <span class="font-Rubik text-white font-medium text-xs sm:text-sm">Promocode</span>
          <img src="../../assets/icons/promoTicket.png" class="size-16"/>
        </div>
      
      
        <hr class="w-[2px] h-[65px] bg-white border-transparent" />

        <div
          class="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-100"
          @click="openModal('level cases')"
        >
          <span class="font-Rubik text-white font-medium text-sm">Level Cases</span>
          <div class="relative">
            <img src="../../assets/icons/case.png" class="size-16"/>
            <div
              class="absolute -bottom-2 -right-1 w-[20px] h-[20px] bg-[#2f0101] rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.50)] border border-[#ff3435] flex items-center justify-center text-white text-xs font-normal font-Rubik"
            >
              3
            </div>
          </div>
        </div>
      
        <div
          class="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-100"
          @click="openModal('weekly cases')"
        >
          <span class="font-Rubik text-white font-medium text-sm">Weekly Case</span>
          <div class="relative">
            <img src="../../assets/img/weekly-case.png" class="size-16"/>
            <div
              class="absolute inset-0 flex items-center justify-center text-white text-sm font-medium font-Rubik pointer-events-none"
            >
              <span class="text-green-600 text-sm font-medium font-Rubik">$</span>120.20
            </div>
            <div
              class="absolute -bottom-2 -right-1 w-[20px] h-[20px] bg-[#2f0101] rounded-full shadow-[0px_2px_2px_0px_rgba(0,0,0,0.50)] border border-[#ff3435] flex items-center justify-center text-white text-xs font-normal font-Rubik"
            >
              2
            </div>
          </div>
        </div>
      </div>
    </div>
   
    <div class="flex items-center justify-center mt-2 flex-col gap-y-2" v-if="gift">
      <div class="relative">
        <img src="../../assets/img/giftImage.svg" />
        <div
          class="absolute w-4 h-4 bg-[rgba(255,52,53,1)] flex items-center justify-center rounded-full text-xs font-Rubik text-white top-[35%] right-[18%]"
        >
          3
        </div>
      </div>

      <button
        class="h-8 px-2.5 py-1 bg-[#04ab53] rounded-sm justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-base font-bold font-Rubik uppercase leading-normal"
        @click="openModal('gift modal')"
      >
        OPEN GIFT
      </button>
    </div>
  </div>
</template>

<script>
import { UserGroupIcon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
export default {
  name: 'support_modal',

  components: {
    XMarkIcon,
    UserGroupIcon
  },
  data() {
    return {
      gift: true,
      remainingTime: 15,
      interval: null,
      timerStarted: false,
      redeemed: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    openModal(name, props) {
      openModalFromModal(name, props)
    },
    startTimer() {
      this.timerStarted = true
      this.interval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime -= 1
        } else {
          clearInterval(this.interval)
          this.timerStarted = false
          this.redeemed = false
        }
      }, 1000)
    },
    stopTimer() {
      clearInterval(this.interval)
      this.timerStarted = false
    }
  },
  mounted() {},
  watch: {
    redeemed(newVal) {
      if (newVal) {
        this.remainingTime = 15
        this.startTimer()
      }
    }
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.remainingTime / 60)
      const seconds = this.remainingTime % 60
      return `${minutes}m ${seconds}s`
    }
  }
}
</script>
