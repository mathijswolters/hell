<template>
  <div class="max-w-[520px] bg-[#620101] border border-red-700 p-6 text-white relative">
    <XMarkIcon
      class="w-6 h-6 absolute right-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
      @click="closeModal()"
    />

    <!-- Icon -->
    <div class="flex justify-center mb-4">
      <img src="/img/icons/2fa-lock.svg" width="40" alt="icon" />
    </div>

    <!-- Title -->
    <h2 class="text-center text-[22px] font-[600]">ENTER 2FA CODE</h2>
    <p
      class="text-center text-[12px] font-[500] opacity-[0.5] text-white leading-relaxed"
    >
      In order to continue with your action, you have to enter the Two-factor
      Authentication code.
    </p>

    <div class="flex justify-center gap-2 my-5">
      <input
        v-for="(digit, index) in code"
        :key="index"
        maxlength="1"
        class="w-[42px] h-[53px] text-center text-[22px] font-[600] bg-[#420101] uppercase"
        v-model="code[index]"
        :ref="(el) => (inputs[index] = el)"
        @input="handleInput(index, $event)"
        @keydown.backspace="handleBackspace(index)"
        @paste="handlePaste($event)"
      />
    </div>

    <!-- Actions -->
    <div class="flex justify-between gap-2 pt-2">
      <button
        class="bg-[#E82D2E] text-white font-bold py-2 w-[170px] mx-auto"
        @click="submitCode"
      >
        CONTINUE
      </button>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    XMarkIcon,
  },
  data() {
    return {
      code: ["", "", "", "", "", ""],
      inputs: [],
    };
  },
  methods: {
    submitCode() {
      const finalCode = this.code.join("");
      this.$emit("submit", finalCode);
    },
    closeModal() {
      this.$emit("close-modal");
    },
    handleInput(index, e) {
      this.code[index] = e.target.value.slice(0, 1);

      if (this.code[index] && index < this.code.length - 1) {
        this.inputs[index + 1]?.focus();
      }
    },

    handleBackspace(index) {
      if (!this.code[index] && index > 0) {
        this.inputs[index - 1]?.focus();
      }
    },
    handlePaste(e) {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\s/g, "").slice(0, 6);

      for (let i = 0; i < this.code.length; i++) {
        this.code[i] = pasted[i] || "";
      }

      const nextIndex = this.code.findIndex((x) => !x);
      if (nextIndex !== -1) this.inputs[nextIndex]?.focus();
      else this.inputs[this.code.length - 1]?.focus();
    },
  },
};
</script>
