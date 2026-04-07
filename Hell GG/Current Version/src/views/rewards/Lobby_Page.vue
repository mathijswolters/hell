<template>
  <div class="bg-[#430101] w-full p-5 flex flex-col items-center gap-4">
    <StatsGraph />
    <RewardsTable />
    <LogsTable />

  </div>
</template>
<script>
import StatsGraph from "@/components/rewards/StatsGraph.vue";
import RewardsTable from "@/components/rewards/RewardsTable.vue";
import LogsTable from "@/components/rewards/LogsTable.vue";

export default {
  components: {
    StatsGraph,
    RewardsTable,
    LogsTable,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
