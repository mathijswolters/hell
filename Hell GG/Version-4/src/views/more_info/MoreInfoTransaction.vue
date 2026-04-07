<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <TransactionHistoryTable />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import TransactionHistoryTable from "@/components/more_info/TransactionHistoryTable.vue";

export default {
  name: "MoreInfoTransaction",
  components: {
    SideBar,
    TransactionHistoryTable,
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
