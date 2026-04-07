<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <JackpotHistory />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import JackpotHistory from "@/components/more_info/GameHistory/JackpotHistory.vue";

export default {
  name: "GameHistoryJackpot",
  components: {
    SideBar,
    JackpotHistory,
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
