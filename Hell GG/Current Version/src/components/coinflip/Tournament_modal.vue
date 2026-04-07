<template>
  <div>
    <div
      class="relative max-w-[98vw] 2xl:max-w-[1466px] 2xl:w-[1466px] w-[98vw] flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border h-full overflow-hidden"
    >
      <XMarkIcon
        class="absolute top-4 right-3 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
        @click="closeModal()"
      />
      <div
        class="h-14 pl-4 w-full py-4 border-b border-white/20 justify-start items-center inline-flex overflow-hidden"
      >
        <div
          class="text-white text-base font-extrabold font-['Rubik'] leading-normal whitespace-nowrap"
        >
          TOURNAMENT #1
        </div>
      </div>
      <!-- Header End -->
      <!-- Body Start -->
      <div
        class="flex items-center flex-col w-full py-4 gap-4 mt-4 relative max-w-[1466px] overflow-auto"
      >
        <div class="absolute left-4 top-0 flex flex-col gap-2">
          <div class="flex items-center gap-1 font-Rubik text-sm font-semibold text-[#FFBF14]">
            <img src="../../assets/img/cups/gold.png" class="h-6 w-6" />
            1ST PLACE GETS $160.00 (40%)
          </div>
          <div class="flex items-center gap-1 font-Rubik text-sm font-semibold text-[#D1C8BD]">
            <img src="../../assets/img/cups/silver.png" class="h-6 w-6" />
            2ND PLACE GETS $104.00 (26%)
          </div>
          <div class="flex items-center gap-1 font-Rubik text-sm font-semibold text-[#C18738]">
            <img src="../../assets/img/cups/bronze.png" class="h-6 w-6" />
            3RD PLACE GETS $68.00 (17%)
          </div>
          <div class="flex items-center gap-1 font-Rubik text-sm font-semibold text-[#C18738]">
            <img src="../../assets/img/cups/bronze.png" class="h-6 w-6" />
            3RD PLACE GETS $68.00 (17%)
          </div>
        </div>
        <div class="absolute right-4 top-0 flex items-center gap-2">
          <button
            class="w-[101px] h-7 pl-2.5 pr-3 py-2 bg-[#04ab53] justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-extrabold font-['Rubik'] leading-tight"
          >
            JOIN
          </button>
          <button class="w-[30px] h-[30px]">
            <PlayCircleIcon class="w-[30px] h-[30px] fill-[rgba(255,52,53,1)]" />
          </button>
        </div>
        <div class="w-full max-h-[80vh] sm:h-full 2xl:h-[41rem] overflow-auto">
          <Bracket />
        </div>
      </div>
      <!-- Body End -->
    </div>
  </div>
</template>

<script>
import { XMarkIcon, PlayCircleIcon } from '@heroicons/vue/24/solid'
import Bracket from './Tournament_bracket.vue'
export default {
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    }
  },
  watch: {},
  mounted() {},
  components: {
    XMarkIcon,
    Bracket,
    PlayCircleIcon
  },
  computed: {}
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
