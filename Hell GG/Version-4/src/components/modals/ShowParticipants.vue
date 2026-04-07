<template>
  <div
    class="relative max-w-[1093px] xl:w-[1093px] w-full flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border h-full max-h-[50rem]"
  >
    <!-- Header Start -->
    <div class="w-full px-3">
      <div
        class="flex justify-between w-full h-[59px] items-center border-b border-[rgba(98,1,1,1)]"
      >
        <span class="font-Rubik font-extrabold text-white text-base"
          >JACKPOT #{{ jackpot._id }}</span
        >
        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
          @click="closeModal()"
        />
      </div>
    </div>

    <!-- Header End -->
    <!-- Body Start -->
    <div
      class="flex items-center flex-col w-full px-3 py-4 gap-2 h-full max-h-[40rem] overflow-auto"
    >
      <div class="flex items-center justify-center w-full py-4 gap-x-2">
        <div
          class="w-[50px] h-[50px] rounded-[4px] bg-no-repeat bg-center bg-cover"
          :style="{
            backgroundImage: `url(${winner.avatar})`
          }"
        ></div>
        <span class="text-[rgba(255,191,20,1)] font-Rubik text-xl font-bold"
          >{{ winner.name }}
        </span>
        <span class="text-white font-Rubik font-bold text-xl">
          | WON
          <span class="text-[rgba(4,171,83,1)] font-Rubik font-bold text-xl"
            >${{
              Number(pot_value).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}</span
          >
          WITH
          <span class="text-[rgba(255,52,53,1)] font-Rubik font-bold text-xl"
            >{{
              Number(winner.chance).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0
              })
            }}%</span
          >
          CHANCE | TICKET:89.688
        </span>
      </div>
      <div
        class="w-full py-2 rounded"
        v-for="item in jackpot.players.slice().reverse()"
        :key="item._id"
        :class="{
          'border border-solid border-[rgba(255,52,53,1)]': item !== winner,
          'border border-solid border-[rgba(255,191,20,1)] bg-[rgba(255,52,53,0.35)]':
            item === winner
        }"
      >
        <Row :user="item" :pot_value="pot_value" />
      </div>
      <div
        class="w-full py-2 rounded"
        v-for="item in jackpot.players.slice().reverse()"
        :key="item._id"
        :class="{
          'border border-solid border-[#FF3435]': item !== winner,
          'border border-solid border-[#FF3435]':
            item === winner
        }"
      >
        <Row :user="item" :pot_value="pot_value" />
      </div>
      <div class="text-center">
        <span class="text-white text-sm font-extrabold font-Rubik leading-[18px]">ID</span
        ><span class="text-white text-sm font-medium font-Rubik leading-[18px]">:</span
        ><span class="text-[#a68381] text-sm font-medium font-Rubik leading-[18px]">
          2N36N1YDR6M2NYMN135YTM1D8Y<br /></span
        ><span class="text-white text-sm font-extrabold font-Rubik leading-[18px]">HASH</span
        ><span class="text-white text-sm font-medium font-Rubik leading-[18px]">:</span
        ><span class="text-[#a68381] text-sm font-medium font-Rubik leading-[18px]">
          kyjnn8y7u1m6gnt57y1nct7yc1b38c13t8ry71ct7 1y7m168gy7fm1f<br /></span
        ><span class="text-white text-sm font-extrabold font-Rubik leading-[18px]">Mod:</span
        ><span class="text-[#a68381] text-sm font-medium font-Rubik leading-[18px]">
          Wbef2zgb1TRYn71rn 13t5n1drhm1td8t7d1n<br /></span
        ><span class="text-white text-sm font-extrabold font-Rubik leading-[18px]">Ticket:</span
        ><span class="text-[#a68381] text-sm font-medium font-Rubik leading-[18px]">
          19.89889898</span
        >
      </div>
    </div>
    <!-- Body End -->
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import Row from '../jackpot/JackpotRow.vue'

export default {
  data() {
    return {}
  },
  props: {
    jackpot: Object,
    winner: Object,
    pot_value: Number
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    }
  },
  mounted() {},
  components: {
    XMarkIcon,
    Row
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
</style>
