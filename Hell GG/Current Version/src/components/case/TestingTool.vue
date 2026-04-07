<template>
  <div class="container-class">
    <div
      class="flex justify-between items-center w-full gap-2 flex-wrap md:pt-[22px] md:pb-[42px] pb-5 border-b-[1px] border-b-[#620101]"
    >
      <div class="flex gap-2 items-center">
        <router-link
          :to="{ name: 'CaseCreator' }"
          class="text-[16px] flex items-center font-[800] bg-[#FF3435] px-[16px] py-3 text-white"
        >
          <ChevronLeftIcon class="w-[20px] me-2" /> BACK TO CASES
        </router-link>
        <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white">
          SAVE
        </button>
      </div>
      <div class="text-[14px] flex lg:justify-end items-center flex-wrap gap-2">
        <router-link :to="{ name: 'CaseEdit' }" class="theme-btn" active-class="active">
          Case Creator Tool
        </router-link>

        <router-link
          :to="{ name: 'CaseTesting' }"
          class="theme-btn"
          active-class="active"
        >
          Case Testing Tool
        </router-link>

        <router-link
          :to="{ name: 'CaseStatsAll' }"
          class="theme-btn"
          active-class="active"
        >
          Case Stats
        </router-link>
      </div>
    </div>

    <div
      class="flex md:flex-row flex-col justify-center md:py-[50px] py-5 md:gap-0 gap-10 mx-auto w-[max-content] max-w-full"
    >
      <div
        class="flex flex-col w-full justify-end gap-3 md:min-w-[310px] w-full md:pe-[50px] md:border-r border-r-[#FF343580]"
      >
        <label class="text-[14px] text-white font-[600]" for="">Case Quantity</label>
        <input
          type="number"
          placeholder="16"
          class="placeholder:opacity-[0.5] placeholder:text-white outline-none w-full text-[14px] font-[600] bg-[#a01b1b] px-[10px] py-2 text-white"
        />

        <button
          class="mb-2 w-full text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          TEST
        </button>
        <div
          class="text-center w-full text-[14px] font-[600] bg-[#a01b1b] px-[10px] py-2 text-white"
        >
          Test_Case_1 Test Opening Data
        </div>
        <div class="w-full text-[16px] font-[600] bg-[#2d0507] px-[10px] py-2 text-white">
          <span class="text-[16px] font-[600] opacity-[0.5]">Times:</span> 61
        </div>
        <div class="w-full text-[16px] font-[600] bg-[#2d0507] px-[10px] py-2 text-white">
          <span class="text-[16px] font-[600] opacity-[0.5]">House Edge:</span> 16
        </div>
        <div class="w-full text-[16px] font-[600] bg-[#2d0507] px-[10px] py-2 text-white">
          <span class="text-[16px] font-[600] opacity-[0.5]">Case Price: </span>
          <span class="text-[16px] font-[600] text-[#04AA53]">$</span>2,167.48
        </div>
        <div class="w-full text-[16px] font-[600] bg-[#2d0507] px-[10px] py-2 text-white">
          <span class="text-[16px] font-[600] opacity-[0.5]">W/L Ratio:</span> 53 / 8
        </div>
        <div class="w-full text-[16px] font-[600] bg-[#2d0507] px-[10px] py-2 text-white">
          <span class="text-[16px] font-[600] opacity-[0.5]">Total Cost:</span>
          $132,216.28
        </div>
        <div class="w-full text-[16px] font-[600] bg-[#2d0507] px-[10px] py-2 text-white">
          <span class="text-[16px] font-[600] opacity-[0.5]">Total Won:</span> $73,335.00
        </div>
        <div
          class="w-full text-[16px] font-[600] bg-[#2d0507] px-[10px] py-2 text-[#FF3435]"
        >
          <span class="text-[16px] font-[600]">Total Lost:</span> $34,250.00
        </div>
        <div
          class="w-full text-[16px] font-[600] bg-[#2d0507] px-[10px] py-2 text-[#04AA53]"
        >
          <span class="text-[16px] font-[600]">Total profit:</span> $24,261.28
        </div>
      </div>
      <div
        class="flex flex-col w-full justify-start gap-3 lg:min-w-[480px] w-full md:ps-[50px]"
      >
        <div class="w-full p-[10px] bg-[#620101] border border-[#FF3435] flex gap-3">
          <img src="/img/icons/error-icon.svg" width="16px" height="16px" alt="img" />
          <span class="text-white text-[14px] font-[600]"
            >There are no skins in the store to create the case</span
          >
        </div>
        <button
          class="mb-2 w-full text-[16px] font-[800] bg-[#FEBD11] px-[16px] py-3 text-white"
        >
          TEST SKINS
        </button>

        <div class="flex flex-wrap gap-2 justify-center w-full">
          <div
            v-for="item in items"
            :key="item.id"
            class="item-card cursor-pointer transition-all"
            :class="{
              active: selectedItems.includes(item.id),
              banned: item.is_banned,
            }"
            @click="toggleItemSelection(item.id)"
          >
            <input
              type="checkbox"
              class="hidden"
              :checked="selectedItems.includes(item.id)"
              :disabled="item.is_banned"
            />

            <div v-if="item.is_banned" class="time-text text-[#FF3435]">NO AVAILABLE</div>
            <div v-else class="time-text text-white text-end pe-2">5.12%</div>
            <img :src="item.image" width="64" height="64" class="max-w-[64px] mb-[5px]" />
            <span>{{ item.name }}</span>
            <h2>${{ Number(item.price).toFixed(2) }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
export default {
  components: { ChevronLeftIcon },

  name: "TestingTool",
  data() {
    return {
      selectedItems: [],
      items: Array.from({ length: 5 }, (_, index) => {
        const templates = [
          { name: "WEAPON B...", image: "/img/ranks/21-25.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/hell.svg", price: 44 },
          { name: "WEAPON B...", image: "/img/ranks/16-19.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/heaven.svg", price: 44 },
        ];

        const template = templates[index % templates.length];

        return {
          id: index + 1,
          ...template,
          is_banned: index % 2 === 0,
        };
      }),
    };
  },
  methods: {
    toggleItemSelection(itemId) {
      const item = this.items.find((i) => i.id === itemId);
      if (item.is_banned) return;

      const index = this.selectedItems.indexOf(itemId);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(itemId);
      }
    },
  },
};
</script>

<style scoped></style>
