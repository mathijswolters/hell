<template>
  <div class="w-[320px] bg-blue-500 text-white relative">
    <div class="w-full bg-[#A46409] flex justify-center items-center gap-2 p-1">
      <span class="text-white font-[700] text-[14px] uppercase">BIG WIN ON</span>
      <img src="/img/icons/jackpot.svg" width="14" alt="" />
      <span class="text-white font-[700] text-[14px] uppercase">Jackpot</span>
    </div>
    <div class="w-full bg-[#6E3005] flex justify-between items-center gap-3 p-[10px]">
      <div class="flex flex-col items-start gap-1">
        <div class="flex items-center gap-1">
          <img src="/img/icons/clever-boy.png" class="rounded" alt="img" width="32" />
          <img src="/img/ranks/2.png" class="object-fit-cover" alt="img" width="20" />
          <span class="text-white font-[700] text-[14px] uppercase">COOLER</span>
        </div>
        <h4 class="text-white font-[500] text-[14px] uppercase">
          won
          <span class="text-[#FEBD11] font-[500] text-[14px]">$2,000</span>
          with
          <span class="opacity-50 font-[500] text-[14px]">36%</span>
          chance
        </h4>
      </div>
      <div class="relative w-max">
        <button class="p-[6px_10px] bg-[#A46409] rounded-[2px] text-white font-[700]">VIEW</button>
      </div>
    </div>
  </div>
</template>

<script>
import { openModal } from "@/modalStore";

export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    openModal(name, props) {
      openModal(name, props);
    },
  },
};
</script>
