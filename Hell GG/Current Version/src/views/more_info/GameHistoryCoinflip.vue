<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <CoinflipHistory />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import CoinflipHistory from "@/components/more_info/GameHistory/CoinflipHistory.vue";

export default {
  name: "GameHistoryCoinflip",
  components: {
    SideBar,
    CoinflipHistory,
  },
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  methods: {},
};
</script>
<style scoped></style>
