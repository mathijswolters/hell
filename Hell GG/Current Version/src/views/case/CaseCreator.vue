<template>
  <div class="bg-[#430101] border-y-[1px] border-y-[#620101] w-full p-5 flex flex-col items-center gap-4">
    <CasesPage />
  </div>
</template>
<script>
import CasesPage from "@/components/case/CasesPage.vue";

export default {
  name: "CaseCreator",
  components: {
    CasesPage,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
