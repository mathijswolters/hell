<template>
  <div class="max-w-[520px] bg-[#620101] border border-red-700 p-6 text-white relative">
    <XMarkIcon
      class="w-6 h-6 absolute right-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
      @click="closeModal()"
    />

    <!-- Icon -->
    <div class="flex justify-center mb-4">
      <img src="/img/icons/2fa-lock.svg" width="60" alt="icon" />
    </div>

    <!-- Title -->
    <h2 class="text-center text-[22px] font-[600]">ENABLE</h2>
    <h3 class="text-center text-[#04AB53] text-[22px] font-[600]">
      TWO-FACTOR AUTHENTICATOR
    </h3>

    <!-- Code Box -->
    <div class="bg-[#FF343540] p-4 rounded-[2px] my-6">
      <img src="/img/icons/qr.png" width="124" class="mb-3 mx-auto" alt="icon" />

      <p class="text-center text-[14px] font-[500] mb-3">Register HellGG</p>

      <p
        class="text-center text-[12px] font-[500] opacity-[0.5] text-white leading-relaxed"
      >
        From now on you'll use your authenticator app to sign in to HellGG or perform
        sensitive actions in the site such as requesting a withdrawal.
      </p>

      <div class="w-full relative">
        <img @click="copyQRCode" src="/img/icons/copy.svg" alt="icon" class="absolute top-6 right-3 cursor-pointer" />
        <input
          type="text"
          v-model="selectedQRCode"
          readonly
          class="w-full py-[12px] px-[16px] rounded-[2px] text-[14px] font-[500] bg-[#420101] uppercase mt-3"
        />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-between gap-2">
      <button class="bg-[#04AB53] text-white font-bold py-2 w-[87px]" @click="backBtn">
        BACK
      </button>

      <button class="flex-1 bg-[#E82D2E] text-white font-bold py-2" @click="submitCode">
        CONTINUE
      </button>
    </div>
  </div>
</template>

<script>
import { openModal } from "@/modalStore";
import { XMarkIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    XMarkIcon,
  },
  data() {
    return {selectedQRCode: "DEA4 OGKE NFA5 FFAK"};
  },
  methods: {
    submitCode() {
      // const finalCode = this.code.join('')
      // this.$emit('submit', finalCode)
      this.$emit("close-modal");
      openModal("3rd six digit");
    },
    backBtn() {
      this.$emit("close-modal");
      openModal("1st download authApp");
    },
    openModal(name, props) {
      openModal(name, props);
    },
    closeModal() {
      this.$emit("close-modal");
    },
    copyQRCode() {
      navigator.clipboard.writeText(this.selectedQRCode);
      this.toaster.success("QR Code copied!");
    },
  },
};
</script>
