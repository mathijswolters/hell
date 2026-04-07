<script setup></script>
<template>
  <Modal_wrapper />
  <div class="app">
    <component :is="isModRoute ? 'ModNavigation' : 'UserNavigation'" />
    <div class="flex w-full justify-center">
      <div
        class="page transition-all duration-500"
        :class="{
          'max-w-full 2xl:max-w-[calc(100%-18.75rem)] ': chat_opened.opened,
          'max-w-full ': !chat_opened.opened,
          'right-0 left-auto': chat_position.position == 'left',
          'right-auto left-0': chat_position.position == 'right',
        }"
      >
        <div
          ref="scrollableContainer"
          class="flex flex-col h-full sm:h-[calc(100vh-5rem)] items-center overflow-y-auto gap-[1rem] pt-[4rem] sm:pt-[5rem] pages"
        >
          <div class="w-full flex justify-center px-2">
            <RouterView class="min-h-[calc(100vh-27rem)]" />
          </div>

          <div class="h-[1rem]"></div>
          <Footer_component />
        </div>
      </div>
      <div
        class="absolute md:hidden flex items-center justify-center w-[35px] h-[37px] gap-4 z-10 top-36 bg-[rgba(95,3,3,1)] text-black p-1 cursor-pointer hover:opacity-80 transition-opacity duration-200"
        :class="{
          'right-0 rounded-l-full': chat_position.position == 'right',
          'left-0 rounded-r-full': chat_position.position == 'left',
        }"
        @click="toggleChat()"
      >
        <ChatBubbleBottomCenterTextIcon
          class="w-[21px] stroke-white stroke-2 transition-all duration-500"
        />
      </div>
      <div
        class="fixed z-10 md:z-0 h-[100vh] md:h-[calc(100vh-4.5rem)] w-full md:w-[18.75rem] md:max-w-[18.75rem] top-0 md:top-[4.5rem]"
        :class="{
          ' right-0 transition-all duration-500':
            chat_opened.opened && chat_position.position == 'right',
          'right-[-100%]  md:right-[-18.75rem]  transition-all duration-500':
            !chat_opened.opened && chat_position.position == 'right',
          'left-0 transition-all duration-500':
            chat_opened.opened && chat_position.position == 'left',
          'left-[-100%] md:left-[-18.75rem] flex  transition-all duration-500':
            !chat_opened.opened && chat_position.position == 'left',
        }"
      >
        <div class="relative h-full w-full">
          <Chat />

          <div
            class="absolute md:hidden flex items-center justify-center w-[2.5rem] h-[2.5rem] rounded-[5px] gap-4 top-4 right-4 bg-[#ff3435] text-black p-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            @click="toggleChat()"
          >
            <XMarkIcon
              class="w-9 fill-white stroke-white stroke-2 transition-all duration-500"
            />
          </div>
          <div
            class="absolute hidden md:flex 2xl:hidden flex-col gap-4 top-32 bg-[rgba(95,3,3,1)] hover:mix-blend-darken text-black p-2 cursor-pointer hover:opacity-80 transition-opacity duration-200 w-[37px]"
            :class="{
              'left-[-36px] rounded-l-[18px]': chat_position.position == 'right',
              'right-[-36px] rounded-r-[18px]': chat_position.position == 'left',
            }"
            @click="toggleChat()"
          >
            <ChatBubbleBottomCenterTextIcon
              class="w-[21px] stroke-white stroke-2 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XMarkIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/vue/24/outline";
import UserNavigation from "./components/NavBar.vue";
import ModNavigation from "./components/ModPanalNavbar.vue";
import Chat from "./components/ChatArea.vue";
import Modal_wrapper from "./components/Modal_wrapper.vue";
import { chat_position, chat_opened, open_chat, chat_toggle } from "@/chatStore";
import Footer_component from "./components/Footer.vue";
export default {
  setup() {
    return {
      chat_position,
      chat_opened,
    };
  },
  components: {
    UserNavigation,
    ModNavigation,
    Chat,
    Modal_wrapper,
    // ChevronRightIcon,
    XMarkIcon,
    ChatBubbleBottomCenterTextIcon,
    Footer_component,
  },
  data() {
    return {
      chat: false,
      isModalOpen: false,
      screenWidth: window.innerWidth,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    toggleChat() {
      open_chat();
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
  },
  watch: {
    screenWidth(newState) {
      if (newState > 1536) {
        chat_toggle(true);
      } else {
        chat_toggle(false);
      }
    },
    // Watch for route changes
    $route() {
      // Scroll the container to the top
      const scrollableContainer = this.$refs.scrollableContainer;
      if (scrollableContainer) {
        scrollableContainer.scrollTop = 0;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateScreenWidth);
    if (this.screenWidth > 1536) {
      chat_toggle(true);
    } else {
      chat_toggle(false);
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
  computed: {
    isModRoute() {
      return this.$route.path.startsWith("/mod");
    },
  },
};
</script>
<style scoped>
.page {
  position: fixed;
  width: 100%;
  top: 5rem;
  height: calc(100% - 9.9rem);
}
.page .pages::-webkit-scrollbar {
  display: none;
}
.app {
  background-image: url(./assets/img/MainBg.svg);
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
@media (max-width: 640px) {
  .page {
    top: 50px;
    height: calc(100% - 50px);
  }
}
</style>
<style src="./assets/css/table.css" />
