<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <StatsGraph />
      <StatsTable />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import StatsTable from "@/components/more_info/Stats/StatsTable.vue";
import StatsGraph from "@/components/more_info/Stats/StatsGraph.vue";

export default {
  name: "MoreInfoStats",
  components: {
    StatsGraph,
    StatsTable,
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
