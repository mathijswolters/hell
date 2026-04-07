<template>
  <div class="w-full flex justify-center items-center gap-3 pb-4">
      <button class="theme-btn active">1 Day Stats</button>
      <button class="theme-btn">1 Week Stats</button>
      <button class="theme-btn">1 Month Stats</button>
    </div>
    <div class="border-y w-full border-[#ff343580] max-w-[864px] mx-auto block py-5">
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 lg:gap-5 gap-3 w-full">
        <div class="stat-card">
          <img src="/public/img/icons/jackpot.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Jackpot Wagered</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/coinflip.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Coinflip Wagered</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/tournament.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Tournament Wagered</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/affiliate.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Affiliates Paid</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/affiliate.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Affiliates Earned</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/reward.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Rewards Earned</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/percentage.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Raked</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/withdraw.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Withdrawn</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/dollar-red.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Current Balance</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/affiliate.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>10,000.10</h2>
            <h2 class="opacity-[0.5]">Current Affiliate Balance</h2>
          </div>
        </div>
      </div>
    </div>
  <div class="graph-container max-w-[952px] !bg-[#310000] p-2">
    <div class="border-t border-[#ff343580] mt-[50px]">
      <GraphChart />
    </div>
  </div>
</template>

<script>
import GraphChart from "@/components/more_info/Stats/GraphChart.vue";

export default {
  name: "StatsGraph",
  components: {
    GraphChart,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.graph-container {
  background-color: transparent;
  width: 100%;
  margin: 20px auto;
  font-family: "rubik";
}
</style>
