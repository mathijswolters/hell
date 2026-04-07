<template>
  <div class="w-[320px] bg-blue-500 text-white relative">
    <div class="w-full bg-[#810E0E] flex justify-center items-center gap-2 p-1">
      <span class="text-white font-[700] text-[14px] uppercase">BIG WIN ON</span>
      <img src="/img/icons/coinflip.svg" width="14" alt="" />
      <span class="text-white font-[700] text-[14px] uppercase">COINFLIP</span>
    </div>
    <div
      class="w-full bg-[#620101] flex justify-between items-center gap-3 p-[10px] relative"
    >
      <div class="flex flex-col items-start gap-1">
        <div class="flex items-center gap-1">
          <img src="/img/icons/clever-boy.png" class="rounded" alt="img" width="32" />
          <img src="/img/ranks/2.png" class="object-fit-cover" alt="img" width="20" />
          <span class="text-white font-[700] text-[14px] uppercase">COOLER</span>
        </div>
        <h4 class="text-white font-[500] text-[14px] uppercase flex items-center gap-1">
          won
          <span class="text-[#04AB53] font-[500] text-[14px]">$2,000</span>
          from
          <img src="/img/coins/hell.svg" width="14" alt="hell" />
          coinflip
        </h4>
      </div>
      <div class="flex flex-col items-end w-max gap-1 absolute top-[10px] right-[10px]">
        <h4 class="text-[14px] whitespace-nowrap font-[500]">
          <span class="opacity-50">Double Downs</span> <span class="text-[#FEBD11]">6x</span>
        </h4>
        <button class="p-[6px_10px] bg-[#FF3435] rounded text-white font-[700]">
          VIEW
        </button>
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
