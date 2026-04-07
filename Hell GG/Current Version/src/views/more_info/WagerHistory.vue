<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <WagerHistoryTable />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import WagerHistoryTable from "@/components/more_info/WagerHistoryTable.vue";

export default {
  name: "WagerHistory",
  components: {
    WagerHistoryTable,
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
