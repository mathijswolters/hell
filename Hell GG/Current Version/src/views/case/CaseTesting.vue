<template>
  <div class="bg-[#430101] border-y-[1px] border-y-[#620101] w-full p-5 flex flex-col items-center gap-4">
    <TestingTool />
  </div>
</template>
<script>
import TestingTool from "@/components/case/TestingTool.vue";

export default {
  name: "CaseTesting",
  components: {
    TestingTool,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
