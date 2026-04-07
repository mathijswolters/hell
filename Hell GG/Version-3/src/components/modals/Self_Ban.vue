<template>
  <div
    class="relative min-w-[744px] max-w-[744px] flex-col transform h-[300px] transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border overflow-hidden"
  >
    <!-- Header Start -->
    <div
      class="flex justify-center w-full h-[59px] items-end px-4 uppercase text-white font-Rubik text-2xl font-extrabold"
    >
      this account is on self-ban
      <!-- <XMarkIcon
        class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
        @click="closeModal()"
      /> -->
    </div>
    <div class="pb-2 px-12 pt-6 h-full flex flex-col gap-y-4 items-center">
      <div
        class="w-full bg-[#620101] border border-solid border-[#e82d2e] h-12 flex items-center justify-center uppercase text-white font-Rubik font-medium text-base gap-x-1 rounded-sm"
      >
        account banned until 92 days
        <span class="font-medium font-Rubik text-[#e82d2e] text-sm">(01-05-2025 / 18:00:42)</span>
      </div>
      <span class="font-medium font-Rubik text-white opacity-50 uppercase text-xs px-1 text-center"
        >You can cancel your self ban, but it will take 1 month without you canceling the unban to
        go through. You may cancel this at any time.</span
      >
      <div class="flex items-center gap-x-2 w-full">
        <div
          class="w-full bg-[#620101] border border-solid border-[#e82d2e] h-12 flex items-center px-2 uppercase text-white font-Rubik font-medium text-base rounded-sm gap-x-1 justify-between"
        >
          ban TIMER COUNTDOWN
          <span class="font-Rubik text-base text-white opacity-70 font-medium"
            >13D - 23h - 59m - 59S</span
          >
        </div>
        <button
          class="px-6 whitespace-nowrap bg-[#E82D2E] rounded-sm border border-solid border-[#e82d2e] h-12 flex items-center justify-center uppercase text-white font-Rubik font-medium text-base gap-x-1"
        >
          cancel ban
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { XMarkIcon } from '@heroicons/vue/24/solid'
export default {
  name: 'support_modal',

  components: {
    // XMarkIcon
  },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    }
  },
  mounted() {},
  computed: {}
}
</script>
