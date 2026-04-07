<template>
  <div class="w-[320px] bg-blue-500 text-white relative">
    <div class="w-full bg-[#810E0E] flex justify-center items-center gap-2 p-1">
      <span class="text-white font-[700] text-[14px] uppercase">BIG WIN FROM</span>
      <img src="/src/assets/img/case_image.png" width="30" alt="" />
      <span class="text-white font-[700] text-[14px] uppercase">LVL 95 Case</span>
    </div>
    <div class="w-full bg-[#620101] flex justify-between items-center gap-5 p-[10px]">
      <div class="flex items-center gap-1">
        <img src="/img/icons/clever-boy.png" class="rounded" alt="img" width="32" />
        <img src="/img/ranks/2.png" class="object-fit-cover" alt="img" width="20" />
        <span class="text-white font-[700] text-[14px] uppercase">COOLER</span>
        <span class="text-white font-[500] text-[14px]">unboxed</span>
      </div>
      <div class="relative w-max">
        <div class="absolute top-[-15px] right-[0px]">
          <h3 class="text-[#FEBD11] font-[700] text-[10px] w-max">22.52%</h3>
        </div>
        <img src="/img/icons/shoes.png" width="50" alt="img" />
        <div class="absolute bottom-[-10px] left-[-25px]">
          <h3 class="text-white font-[500] text-[14px] flex gap-1 w-max">
          <span class="text-[#04AB53] font-[500] text-[14px]">$</span>
          500.00</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { openModal } from "@/modalStore";

export default {
  components: {
  },
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
