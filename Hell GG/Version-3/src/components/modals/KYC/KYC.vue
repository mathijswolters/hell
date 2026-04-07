<template>
  <div
    class="relative lg:min-w-[838px] max-w-[838px] flex-col transform transition-all bg-[rgba(74,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-sm pb-2"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    />
    <!-- header -->
    <div
      class="flex items-center justify-center h-[65px] sm:h-[57px] w-full border-b-[2px] border-b-solid border-b-[rgba(98,1,1,1)] text-white font-Rubik font-bold text-2xl gap-x-1"
    >
      <div
        class="text-white text-sm sm:text-lg font-extrabold font-['Rubik'] leading-normal flex gap-1 items-end relative text-center justify-center -mt-3 sm:mt-0"
      >
        KNOW YOUR CUSTOMER (KYC)
        <div
          class="text-[#e82d2e] absolute sm:relative top-full -mt-0.5 text-xs sm:text-sm font-medium font-['Rubik'] leading-normal text-center"
        >
          (Required to play)
        </div>
      </div>
    </div>
    <div class="flex items-center flex-col gap-y-4 mt-4 px-2">
      <img src="../../../assets/img/kyc.png" class="lg:w-auto w-auto max-w-[70vw]" />
      <div class="  text-center text-white text-sm font-normal font-Rubik leading-normal">
        To ensure you're not underage. We require you to undergo a 3 minute verification process. We
        use a 3rd Party to do the age verification, they have live facial recognition software that
        can identify if you're overage in seconds. If additional confirmation is needed you'll be
        required to show government issued id. After that, you're all clear to enjoy the site.
      </div>
      <div class="flex flex-col items-center gap-1">
        <div class=" text-white text-sm font-normal font-['Rubik'] leading-normal">
          All data is safely sorted.
        </div>
        <button
          class="w-[281px] h-[50px] bg-[#e82d2e] rounded-sm border border-[#e82d2e] flex flex-col  items-center justify-center"
          @click="openModal('kyc verification')"
        >
          <div
            class=" text-white text-base font-extrabold font-['Rubik'] uppercase leading-normal"
          >
            start verification
          </div>
          <div
            class="opacity-80 text-white text-[10px] font-medium font-['Rubik'] uppercase leading-normal"
          >
            Takes ~3m (2 steps)
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
export default {
  name: 'security_warning',

  components: {
    XMarkIcon
  },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    openModal(name, props) {
      openModalFromModal(name, props)
    }
  },
  mounted() {},

  computed: {}
}
</script>
