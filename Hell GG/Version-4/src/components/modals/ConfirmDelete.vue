<template>
  <div
    class="relative w-full max-w-[1093px] mx-auto bg-[#530000] rounded-sm flex flex-col"
  >
    <!-- BODY -->
    <div class="py-3 px-5">
      <h2 class="text-white text-center text-[18px] font-[800]">Are you sure you want to delete this case?</h2>

      <div class="flex mt-3 items-center justify-center gap-3">
        <button @click="closeModal()" class="bg-[#04AB53] rounded-[2px] p-[10px] text-[14px] font-[800] text-white">YES</button>
        <button @click="closeModal()" class="bg-[#FF3435] rounded-[2px] p-[10px] text-[14px] font-[800] text-white">NO</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
  mounted() {},

  computed: {},
};
</script>
