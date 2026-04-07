<template>
  <div class="toggle-container">
    <h2 class="text-[18px] mb-[15px] font-[800] font-[rubik] text-white text-center">
      TOGGLE OPTIONS
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 gap-3 w-full">
      <div v-for="(option, index) in options" :key="index" class="toggle-card">
        <h2 class="uppercase">{{ option.title }}</h2>

        <label class="switch">
          <input type="checkbox" v-model="option.isActive" />
          <span class="slider"></span>
        </label>

        <div class="card-count">
          <h2>
            <div :class="option.isActive ? 'status-green' : 'status-red'">
              {{ option.isActive ? "ON" : "OFF" }}
            </div>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToggleOptions",
  data() {
    return {
      options: [
        { title: "COINFLIP", isActive: true },
        { title: "JACKPOT", isActive: true },
        { title: "TOURNAMENTS", isActive: true },
        { title: "SHOP", isActive: true },
        { title: "LEVEL CASES", isActive: false },
        { title: "PROMO CODES", isActive: false },
        { title: "GIFTING", isActive: false },
        { title: "FAUCET", isActive: true },
        { title: "5 win jackpot", isActive: true },
        { title: "coinflip jackpot", isActive: false },
      ],
    };
  },
};
</script>

<style>

</style>
