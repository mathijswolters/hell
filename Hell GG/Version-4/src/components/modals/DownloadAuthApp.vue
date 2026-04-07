<template>
  <div class="max-w-[520px] bg-[#620101] border border-red-700 p-6 text-white relative">

      <XMarkIcon
        class="w-6 h-6 absolute right-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
        @click="closeModal()"
      />

    <!-- Icon -->
    <div class="flex justify-center mb-4">
      <img src="/img/icons/2fa-lock.svg" width="60" alt="icon">
    </div>

    <!-- Title -->
    <h2 class="text-center text-[22px] font-[600]">
      ENABLE
    </h2>
    <h3 class="text-center text-[#04AB53] text-[22px] font-[600]">
      TWO-FACTOR AUTHENTICATOR
    </h3>

    <!-- Code Box -->
    <div class="bg-[#FF343540] p-4 rounded-[2px] my-6">
      <img src="/img/icons/app.png" width="38" class="mb-3 mx-auto" alt="icon">

      <p class="text-center text-[14px] font-[500] mb-3">Download an Authentication App</p>

      <p class="text-center text-[12px] font-[500] opacity-[0.5] text-white leading-relaxed">
      Get an authentication app on your device, like Google Authenticator, Authy(recommended) or Windows Phone Authenticator.
      </p>
    </div>

     <!-- Actions -->
    <div class="flex justify-between gap-2">
      <button
        class="flex-1 bg-[#E82D2E] text-white font-bold py-2"
        @click="submitCode"
      >
        CONTINUE
      </button>
    </div>

  </div>
</template>

<script>
import { openModal } from '@/modalStore';
import { XMarkIcon } from '@heroicons/vue/24/solid';

export default {
  components:{
    XMarkIcon,
  },
  data() {
    return {
    }
  },
  methods: {
    submitCode() {
      // const finalCode = this.code.join('')
      // this.$emit('submit', finalCode)
      this.$emit("close-modal");
      openModal('2nd 2fa qrcode');
    },
    openModal(name, props) {
      openModal(name, props);
    },
    closeModal() {
      this.$emit("close-modal");
    },
  }
}
</script>
