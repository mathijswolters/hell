<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <GraphChart />
      <RewardsTable />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import GraphChart from "@/components/more_info/rewards/GraphChart.vue";
import RewardsTable from "@/components/more_info/rewards/RewardsTable.vue";

export default {
  name: "MoreInfoRewards",
  components: {
    GraphChart,
    RewardsTable,
    SideBar,
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
