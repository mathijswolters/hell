<template>
  <div class="more-info-page">
    <SideBar v-if="isSidebarOpen" @close="isSidebarOpen = false" />

    <div class="moreinfo-container">
     <BannedSkinsContent />
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/more_info/SideBar.vue";
import BannedSkinsContent from "@/components/more_info/BannedSkinsContent.vue";

export default {
  name: "BannedSkins",
  components: {
    BannedSkinsContent,
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
