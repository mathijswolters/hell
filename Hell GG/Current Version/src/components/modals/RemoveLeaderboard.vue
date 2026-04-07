<template>
  <div class="max-w-[520px] bg-[#420101] p-6 text-white relative">
    <XMarkIcon
      class="w-6 h-6 absolute right-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
      @click="closeModal()"
    />

    <!-- Title -->
    <h2 class="text-[18px] font-[800]"> Remove Leaderboard Balance</h2>
    <h3 class="text-white text-[10px] font-[800]">
      Current Balance: <span class="text-[#04AB53] font-[800]">$</span>10,000.10
    </h3>

    <div class="mt-3">
      <label class="opacity-[0.7]" for="">Balance deduction:</label>
      <input
        type="number"
        placeholder="500"
        class="w-full min-w-[312px] py-[12px] px-[16px] rounded-[2px] text-[14px] font-[500] bg-[#620101] uppercase my-3 border border-[#E82D2E]"
      />
    </div>
    <!-- Actions -->
    <div class="flex justify-end gap-2">
      <button class="px-3 rounded-[2px] bg-[#FF3435] text-white font-bold py-2" @click="submitCode">
        Change
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
    return {};
  },
  methods: {
    submitCode() {
      const finalCode = this.code.join("");
      this.$emit("submit", finalCode);
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
