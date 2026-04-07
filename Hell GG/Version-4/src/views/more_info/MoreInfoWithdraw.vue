<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <WithdrawTable />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import WithdrawTable from "@/components/more_info/WithdrawTable.vue";

export default {
  name: "MoreInfoWithdraw",
  components: {
    SideBar,
    WithdrawTable,
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
