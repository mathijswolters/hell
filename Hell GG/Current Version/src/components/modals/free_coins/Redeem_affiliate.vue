<template>
  <div
    class="relative w-full sm:min-w-[480px] py-5 max-w-[480px] flex-col transform transition-all bg-[rgba(98,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-lg px-5 sm:px-0"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    />

    <div class="py-2 px-6 h-full flex flex-col gap-4 items-center justify-center">
      <div class="text-white text-[22px] font-semibold font-Rubik leading-normal">
        Enter Your Affiliate Code
      </div>
      <input
        v-model="affiliateCode"
        class="h-12 w-full bg-[#420101] rounded-sm text-center outline-none text-white text-sm font-semibold font-Rubik leading-normal placeholder:opacity-50"
        placeholder="XYZ123"
      />
      <div class="flex items-center gap-x-2">
        <button
          v-if="!isLoading && !message"
          class="h-8 px-2.5 py-1 bg-[#04ab53] rounded-sm justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-base font-bold font-Rubik uppercase leading-normal"
          @click="affiliateCode ? initiate_confirmation_sequence() : ''"
        >
          confirm
        </button>
        <Loading_spinner v-if="isLoading" />

        <div
          v-else-if="message"
          class="h-8 font-Rubik text-base font-bold"
          :class="{ 'text-[#04ab53] ': isSuccess, 'text-[rgba(255,52,53,1)]': !isSuccess }"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import Loading_spinner from '@/components/Loading_spinner.vue'
export default {
  name: 'redeem_affiliate',

  components: {
    XMarkIcon,
    Loading_spinner
  },
  data() {
    return {
      affiliateCode: null,
      isLoading: false,
      message: '',
      isSuccess: false
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    initiate_confirmation_sequence() {
      this.isLoading = true
      this.message = ''

      setTimeout(() => {
        this.isLoading = false

        const success = Math.random() > 0.5
        this.isSuccess = success

        this.message = success ? 'Success!' : 'Unavailable Affiliate Code!'

        setTimeout(() => {
          this.message = ''
        }, 1000)
      }, 5000)
    }
  },
  mounted() {},
  computed: {}
}
</script>
