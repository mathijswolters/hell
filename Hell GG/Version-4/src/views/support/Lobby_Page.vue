<template>
  <div
    class="bg-[#430101] border-y-[1px] border-y-[#620101] w-full p-[30px] flex flex-col gap-4"
  >
    <h2 class="font-[800] text-white text-[25px] uppercase">Live support panel</h2>
    <div class="flex lg:flex-row flex-col gap-4 w-full">
      <div class="min-w-[415px] lg:w-[420px] lg:max-w-[500px]">
        <SideListPanal @chat-selected="openChat" />
      </div>
      <div class="w-full">
        <ConversationPanal ref="conversationPanel" />
      </div>
    </div>
  </div>
</template>
<script>
import SideListPanal from "@/components/support/SideListPanal.vue";
import ConversationPanal from "@/components/support/ConversationPanal.vue";

export default {
  name: "Lobby_Page",
  components: {
    SideListPanal,
    ConversationPanal,
  },
  data() {
    return {};
  },
  methods: {
    openChat(chat) {
      this.$refs.conversationPanel.openChat(chat);
    }
  },
};
</script>

<style scoped></style>
