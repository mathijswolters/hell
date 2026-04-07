<template>
  <div class="bg-[#430101] border-y-[1px] border-y-[#620101] w-full p-5 flex flex-col items-center gap-4">
    <CreatorTool />
  </div>
</template>
<script>
import CreatorTool from "@/components/case/CreatorTool.vue";

export default {
  name: "CaseEdit",
  components: {
    CreatorTool,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
