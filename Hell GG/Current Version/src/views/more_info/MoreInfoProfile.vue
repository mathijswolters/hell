<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
      <div class="pb-5 border-b border-b-[#ff343580] border-b-[2px]">
        <ProfileRows />
      </div>
      <div class="py-5 border-b border-b-[#ff343580] border-b-[2px]">
        <ToggleOptions />
      </div>
      <div class="py-5 border-b border-b-[#ff343580] border-b-[2px]">
        <StatBalances />
      </div>
      <div class="py-5 border-b border-b-[#ff343580] border-b-[2px]">
        <TotalStats />
      </div>
      <div class="py-5">
        <BanForms />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import ToggleOptions from "@/components/more_info/profile/ToggleOptions.vue";
import StatBalances from "@/components/more_info/profile/StatBalances.vue";
import TotalStats from "@/components/more_info/profile/TotalStats.vue";
import ProfileRows from "@/components/more_info/profile/ProfileRows.vue";
import BanForms from "@/components/more_info/profile/BanForms.vue";

export default {
  name: "MoreInfoProfile",
  components: {
    SideBar,
    ToggleOptions,
    BanForms,
    ProfileRows,
    TotalStats,
    StatBalances,
  },
  data() {
    return {
      isSidebarOpen: true,
    };
  },
  methods: {
    
  },
};
</script>
