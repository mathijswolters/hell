<template>
  <div class="bg-[#430101] border-y-[1px] border-y-[#620101] w-full p-5 flex flex-col items-center gap-4">
    <StatsGraph />
    <StatsAllTable />
  </div>
</template>
<script>
import StatsGraph from "@/components/case/StatsAll/StatsGraph.vue";
import StatsAllTable from "@/components/case/StatsAll/StatsAllTable.vue";

export default {
  name: "CaseStatsAll",
  components: {
    StatsGraph,
    StatsAllTable,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
