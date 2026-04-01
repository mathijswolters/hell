<template>
  <div
    class="relative sm:min-w-[622px] max-w-[622px] flex-col transform transition-all bg-[rgba(74,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-sm pb-2"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    />
    <!-- header -->
    <div
      class="flex items-center justify-center h-[57px] w-full bg-[rgba(255,52,53,1)] text-white font-Rubik font-bold text-2xl gap-x-1"
    >
      <ExclamationTriangleIcon class="stroke-white w-5" />
      SECURITY WARNING!
    </div>
    <div class="flex items-center flex-col gap-y-4 mt-4 px-2">
      <div class="text-center text-[#ff3435] text-base font-medium font-Rubik leading-normal">
        Your account recently declined a deposit trade with security code<br />“fn3uy45”
      </div>
      <div class="text-center text-white text-base font-medium font-Rubik leading-normal">
        Our trade to you got cancelled. If you didn't do this yourself your computer/steam account
        may be compromised.
      </div>
      <div class="text-center text-[#ff3435] text-xl font-medium font-Rubik leading-normal">
        If there is another trade DO NOT ACCEPT IT.
      </div>
      <div
        class="flex items-center justify-center sm:h-[48px] py-2 px-2 sm:px-0 sm:py-0 flex-wrap w-full bg-[#620101] gap-x-1 border border-solid border-[#ff3435] rounded-sm gap-2"
      >
        <div class="text-center text-white text-base font-medium font-Rubik leading-normal">
          Follow this scam prevention guide.
        </div>
        <button
          @click="openModal('scam prevention')"
          class="px-2.5 h-8 bg-[rgba(4,171,83,1)] text-white font-Rubik font-bold text-base w-[122px] rounded-sm"
        >
          CLICK HERE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
import Siren_sound from '../../assets/audio/rust_alarm.mp3'
export default {
  name: 'security_warning',

  components: {
    XMarkIcon,
    ExclamationTriangleIcon
  },
  data() {
    return { siren: new Audio(Siren_sound) }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    openModal(name, props) {
      openModalFromModal(name, props)
    }
  },
  mounted() {
    this.siren.play()
  },
  beforeUnmount() {
    this.siren.pause()
  },
  computed: {}
}
</script>
