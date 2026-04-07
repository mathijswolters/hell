<template>
  <div
    class="relative w-full max-w-[1093px] mx-auto bg-[linear-gradient(180deg,rgba(83,0,0,0.85)_0%,rgba(46,1,1,0.9)_100%)] backdrop-blur-[120px] border border-[#530000] rounded-sm flex flex-col"
  >
    <!-- BODY -->
    <div class="p-4">
      <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 max-h-[40rem] overflow-y-auto"
      >
        <!-- CARD -->
        <div
          v-for="i in 9"
          :key="i"
          class="bg-[#5f0303] min-w-[126px] relative flex flex-col items-center justify-center px-4 py-5 rounded-sm hover:bg-[#6b0404] transition-colors"
        >
          <img
            src="https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f"
            alt="item"
            class="max-w-[64px] mb-3"
          />

          <span
            class="w-full text-center truncate font-Rubik font-semibold text-[#d7b7b7] text-sm"
          >
            WEAPON B...
          </span>

          <div class="text-white absolute text-[10px] top-1 right-1">5.12%</div>

          <span class="font-Rubik font-semibold text-white text-base"> $44.00 </span>
        </div>
      </div>

      <button @click="closeModal()" class="mt-3 text-white text-center bg-[#04AB53] w-full p-3 font-[800]">CLOSE</button>
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
