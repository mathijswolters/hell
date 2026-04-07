<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <StatsGraph />
      <AffiliatesTable />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import StatsGraph from "@/components/more_info/Affiliates/StatsGraph.vue";
import AffiliatesTable from "@/components/more_info/Affiliates/AffiliatesTable.vue";

export default {
  name: "MoreInfoAffiliates",
  components: {
    StatsGraph,
    AffiliatesTable,
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
