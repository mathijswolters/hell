<template>
  <div
    class="relative max-w-[98vw] 2xl:max-w-[1466px] 2xl:w-[1466px] w-full flex-col transform transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[#530000] border max-h-[93vh] 2xl:max-h-full h-full"
  >
    <!-- Header Start -->
    <div
      class="flex w-full flex-wrap py-4 sm:py-0 sm:h-[50px] items-center px-4 border-b border-[hsl(0,98%,19%)] gap-x-4"
    >
      <span
        class="font-Rubik font-bold text-white text-[16px] flex items-center gap-2 h-full"
      >
        Show Skins
      </span>

      <XMarkIcon
        class="w-6 h-6 absolute right-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
        @click="closeModal()"
      />
    </div>
    <!-- Header End -->
    <!-- Body Start -->
    <div class="flex items-center pt-4 flex-col gap-2 px-4">
      <!-- controls start -->
      <div
        class="w-full flex items-center justify-center sm:justify-between flex-wrap gap-2"
      >
        <!-- Left -->
        <div class="flex items-center flex-wrap gap-2">
          <div
            class="flex items-center gap-2 bg-[#770303CC] py-[12px] px-[16px] text-center font-[600] text-[14px] text-white"
          >
            TOTAL VALUE:
            <img src="/img/dollarCoin.png" alt="icon" width="13" />
            46.73
          </div>
          <div
            class="flex items-center gap-2 bg-[#770303CC] py-[12px] px-[16px] text-center font-[600] text-[14px] text-white"
          >
            RAKE:
            <img src="/img/dollarCoin.png" alt="icon" width="13" />
            11.73
          </div>
        </div>
        <!-- Right -->
        <div
          class="flex items-center gap-2 bg-[#770303CC] py-[12px] px-[16px] text-center font-[600] text-[14px] text-white"
        >
          <span class="opacity-[0.5] text-[14px] font-[600]">GAME ID :</span>
          3183097
        </div>
      </div>
      <!-- controls end -->

      <div
        class="flex w-full max-w-full items-center flex-col pt-4 min-h-[6rem] h-full overflow-x-auto"
      >
        <div class="w-full overflow-y-auto max-h-[50vh] 2xl:max-h-[70vh] overflow-x-auto">
          <!-- modal content -->

          <div
            class="flex flex-wrap gap-2 justify-center w-full"
          >
            <div
              v-for="item in items"
              :key="item.id"
              class="item-card cursor-pointer transition-all"
              :class="{ active: selectedItems.includes(item.id) }"
              @click="toggleItemSelection(item.id)"
            >
              <input
                type="checkbox"
                class="hidden"
                :checked="selectedItems.includes(item.id)"
              />

              <img
                :src="item.image"
                width="64"
                height="64"
                class="max-w-[64px] mb-[5px]"
              />
              <span>{{ item.name }}</span>
              <h2>${{ Number(item.price).toFixed(2) }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Body End -->
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/solid";

export default {
  name: "ShowSkins",

  components: {
    XMarkIcon,
  },

  data() {
    return {
      selectedItems: [],
      items: Array.from({ length: 60 }, (_, index) => {
        const templates = [
          { name: "WEAPON B...", image: "/img/ranks/21-25.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/hell.svg", price: 44 },
          { name: "WEAPON B...", image: "/img/ranks/16-19.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/heaven.svg", price: 44 },
        ];

        return {
          id: index + 1,
          ...templates[index % templates.length],
        };
      }),
    };
  },

  methods: {
    toggleItemSelection(itemId) {
      const index = this.selectedItems.indexOf(itemId);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(itemId);
      }
    },

    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
  height: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #d10d0d;
  border-radius: 4px;
}

</style>
