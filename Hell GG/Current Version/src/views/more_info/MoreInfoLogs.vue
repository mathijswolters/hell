<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <LogsTable />
    </div>
  </div>
</template>

<script>
import LogsTable from "@/components/more_info/LogsTable.vue";
import SideBar from "@/components/more_info/SideBar.vue";

export default {
  name: "MoreInfoLogs",
  components: {
    SideBar,
    LogsTable,
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
