<template>
  <div class="bg-[#430101] w-full p-5 flex flex-col items-center gap-4">
    <StatsGraph />
    <AffiliatesTable />
    <LogsTable />
  </div>
</template>
<script>
import StatsGraph from "@/components/affiliates/StatsGraph.vue";
import AffiliatesTable from "@/components/affiliates/AffiliatesTable.vue";
import LogsTable from "@/components/affiliates/LogsTable.vue";

export default {
  components: {
    StatsGraph,
    AffiliatesTable,
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
