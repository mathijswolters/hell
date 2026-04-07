<template>
  <div
    class="relative w-full sm:min-w-[480px] pt-3 pb-5 max-w-[480px] flex-col transform transition-all bg-[rgba(98,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-lg"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    />

    <div class="py-2 px-4 sm:px-6 h-full flex flex-col gap-4 items-center justify-center">
      <div
        class="text-white text-base sm:text-lg sm:text-[20px] font-semibold font-Rubik leading-normal flex items-end gap-x-1 flex-wrap"
      >
        We want to buy you a meal!! <img src="../../../assets/img/frog_love.png" class="w-[51px]" />
      </div>
      <div class="relative flex items-start justify-center h-40">
        <div class="absolute" style="text-shadow: 0 1px 15px rgba(255, 52, 53, 0.5)">
          <span class="text-[#04ab53] text-[40px] font-Rubik font-bold">$</span
          ><span class="text-white text-[40px] font-bold font-Rubik">50.00</span>
        </div>
        <img src="../../../assets/img/gift_cards_bg.svg" class="select-none" />
      </div>
      <div class="flex items-center flex-col gap-y-2 w-full">
        <button
          class="h-8 px-2.5 py-1 bg-[#04ab53] rounded-sm justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-medium font-Rubik uppercase leading-normal w-full max-w-[335px] "
          @click="openModal('location step')"
        >
          Accept
        </button>
        <div
          class="text-white text-sm font-semibold font-Rubik leading-normal flex items-end gap-x-1"
        >
          OR
        </div>
        <button
          class="h-8 px-2.5 py-1 bg-[rgba(255,52,53,1)] rounded-sm justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-xs sm:text-sm font-medium font-Rubik uppercase leading-normal w-full max-w-[335px] "
        >
          Get Site Balance instead (+30%)= $65
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { UserGroupIcon } from '@heroicons/vue/24/solid'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
export default {
  name: 'gift_modal',

  components: {
    XMarkIcon,
    UserGroupIcon
  },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },

    openModal(name) {
      openModalFromModal(name)
    }
  },
  mounted() {},
  computed: {}
}
</script>
