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
      SUCCESFULLY ENABLED
    </h2>
    <h3 class="text-center text-[#04AB53] text-[22px] font-[600]">
      TWO-FACTOR AUTHENTICATOR
    </h3>

      <p class="text-center text-[12px] font-[500] opacity-[0.5] text-white leading-relaxed my-6">
        Once your account is registered, you should start seeing 6-digit
        verification codes in the authenticator. Enter the code displayed
        in your app to make sure everything works.
      </p>

    <!-- Actions -->
    <div class="flex justify-between gap-2">
      <button
        class="w-full bg-[#E82D2E] text-white font-bold py-2"
        @click="backBtn"
      >
        Remove 2FA
      </button>

      <button
        class="bg-[#04AB53] text-white font-bold py-2 w-[130px] flex items-center justify-center gap-2"
        @click="submitCode"
      >
      <img src="/img/icons/tick.png" class="w-4" alt="Tick">
        Done
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
    backBtn() {
      this.$emit("close-modal");
      openModal("1st download authApp");
    },
    submitCode() {
      this.$emit("close-modal");
      openModal("2fa code");
    },
    closeModal() {
      this.$emit("close-modal");
    },
    openModal(name, props) {
      openModal(name, props);
    },
  }
}
</script>
