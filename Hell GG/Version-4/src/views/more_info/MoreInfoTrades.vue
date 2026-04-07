<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <TradesTable />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import TradesTable from "@/components/more_info/TradesTable.vue";

export default {
  name: "MoreInfoTrades",
  components: {
    SideBar,
    TradesTable,
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
