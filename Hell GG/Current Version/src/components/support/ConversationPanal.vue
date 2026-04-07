<template>
  <div class="conversation-container">
    <div class="conversation-header">
      <div class="tabs-wrap">
        <button
          v-for="tab in openTabs"
          :key="tab.id"
          :class="['tab-item', { active: activeTabId === tab.id }]"
          @click="switchTab(tab.id)"
        >
          <div class="flex gap-2">
            <img class="profile-img" :src="tab.userImage" alt="img" />
            <span class="name">{{ tab.username }}</span>
          </div>
          <div class="tab-icons">
            <img src="/img/icons/user-icon.svg" alt="img" />
            <div v-if="tab.notification" class="circle-count">{{ tab.notification }}</div>
            <img
              src="/img/icons/close.png"
              alt="img"
              @click.stop="closeTab(tab.id)"
              class="cursor-pointer hover:opacity-70"
            />
          </div>
        </button>
      </div>
      <div class="flex justify-end gap-2 pt-2">
        <button
          class="text-white bg-[#FF3435] text-[14px] font-[800] rounded-[2px] p-[10px]"
        >
          FOR ADMIN
        </button>
        <button
          class="text-white bg-[#04AB53] text-[14px] font-[800] rounded-[2px] p-[10px] flex gap-2"
        >
          <img src="/img/icons/handshake.svg" width="20" alt="img" />
          RESOLVE
        </button>
      </div>
    </div>

    <div v-if="activeTab" class="scroll-y-wrapper">
      <div class="conversation-wrap">
        <div class="message you">
          <div class="info">
            <img src="/img/icons/clever-boy.png" alt="img" />
            <span>{{ activeTab.username }}</span>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
          </p>
        </div>
        <div class="message me">
          <div class="info">
            <img src="/img/icons/clever-boy.png" alt="img" />
            <span>BreadYoutube</span>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
          </p>
        </div>
        <div class="message you">
          <div class="info">
            <img src="/img/icons/clever-boy.png" alt="img" />
            <span>{{ activeTab.username }}</span>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
          </p>
        </div>
        <div class="message me">
          <div class="info">
            <img src="/img/icons/clever-boy.png" alt="img" />
            <span>BreadYoutube</span>
          </div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
          </p>
        </div>
      </div>
    </div>

    <div v-if="activeTab" class="conversation-footer">
      <div class="msg-type-wrap">
        <div class="info">
          <img src="/img/icons/clever-boy.png" alt="img" />
          <span>{{ activeTab.username }} is typing...</span>
        </div>
        <p>Hi Bread, I need help with setting up my</p>
      </div>
      <div class="input-wrap">
        <input type="text" placeholder="Type a message" />
        <button>send</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConversationPanal",
  data() {
    return {
      activeTabId: 1,
      openTabs: [
        {
          id: 1,
          username: "BreadYoutube0",
          userImage: "/img/icons/clever-boy.png",
          notification: null,
        },
        {
          id: 2,
          username: "BreadYoutube1",
          userImage: "/img/icons/clever-boy.png",
          notification: null,
        },
        {
          id: 3,
          username: "BreadYoutube2",
          userImage: "/img/icons/clever-boy.png",
          notification: null,
        },
        {
          id: 4,
          username: "BreadYoutube3",
          userImage: "/img/icons/clever-boy.png",
          notification: 1,
        },
      ],
    };
  },
  computed: {
    activeTab() {
      return this.openTabs.find((tab) => tab.id === this.activeTabId);
    },
  },
  methods: {
    switchTab(tabId) {
      this.activeTabId = tabId;
      console.log("Switched to tab:", tabId);
    },
    closeTab(tabId) {
      // Prevent closing if only one tab remains
      if (this.openTabs.length <= 1) {
        console.log("Cannot close the last tab");
        return;
      }

      const index = this.openTabs.findIndex((tab) => tab.id === tabId);
      if (index > -1) {
        this.openTabs.splice(index, 1);

        if (this.activeTabId === tabId && this.openTabs.length > 0) {
          this.activeTabId = this.openTabs[Math.max(0, index - 1)].id;
        }

        console.log("Closed tab:", tabId);
      }
    },
    openChat(chat) {
      const existingTab = this.openTabs.find(tab => tab.id === chat.id);
      if (existingTab) {
        this.switchTab(chat.id);
      } else {
        this.openTabs.push({
          id: chat.id,
          username: chat.username,
          userImage: chat.userImage,
          notification: chat.adminNotification || null
        });
        this.switchTab(chat.id);
      }
    },
  },
};
</script>

<style scoped>
.conversation-container {
  height: 100%;
  max-height: 62vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.conversation-wrap {
  background-color: #310000;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.conversation-wrap .message {
  background-color: #5c0000;
  width: 100%;
  max-width: 360px;
  border-radius: 6px;
  padding: 10px;
}
.conversation-wrap .message.me {
  margin-left: auto;
}
.conversation-wrap .message .info {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.conversation-wrap .message .info img {
  width: 20px;
  height: 20px;
}
.conversation-wrap .message .info span {
  font-size: 14px;
  font-weight: 500;
  color: white;
  opacity: 0.5;
}
.conversation-wrap .message p {
  width: 100%;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
}
/*  Conversation Footer */
.conversation-footer {
  background-color: #310000;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: hidden;
  position: sticky;
  bottom: 0;
  left: 0;
}
.conversation-footer .msg-type-wrap {
  width: 100%;
}
.conversation-footer .msg-type-wrap .info {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.conversation-footer .msg-type-wrap .info img {
  width: 20px;
  height: 20px;
}
.conversation-footer .msg-type-wrap .info span {
  font-size: 14px;
  font-weight: 500;
  color: white;
  opacity: 0.5;
}
.conversation-footer .msg-type-wrap p {
  width: 100%;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: white;
}

.conversation-footer .input-wrap {
  width: 100%;
  display: flex;
  gap: 8px;
}
.conversation-footer .input-wrap input {
  width: 100%;
  background-color: #620101;
  border: 2px;
  color: white;
  padding: 7px 10px;
}
.conversation-footer .input-wrap button {
  width: max-content;
  background-color: #ff3435;
  border: 2px;
  padding: 6px 10px;
  font-weight: 800;
  font-size: 14px;
  color: white;
  text-transform: uppercase;
}
/*  Conversation Header */
.conversation-header {
  background-color: #310000;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: sticky;
  top: 0;
  left: 0;
}
.conversation-header .tabs-wrap {
  width: 100%;
  display: flex;
  gap: 8px;
  border-bottom: 1px solid #620101;
  overflow-x: scroll;
}
.conversation-header .tabs-wrap .tab-item {
  background-color: #310000;
  min-width: max-content;
  padding: 10px;
  border-radius: 6px 6px 0 0;
  border: 1px solid #620101;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.conversation-header .tabs-wrap .tab-item.active {
  background-color: #240101;
}
.conversation-header .tabs-wrap .tab-item .profile-img {
  width: 20px;
  height: 20px;
}
.conversation-header .tabs-wrap .tab-item span {
  font-size: 14px;
  color: white;
  font-weight: 700;
}
.conversation-header .tabs-wrap .tab-item .tab-icons {
  display: flex;
  align-items: center;
  gap: 10px;
}
.conversation-header .tabs-wrap .tab-item .tab-icons img {
  width: 12px;
}

/* Scroll y wrapper */
.scroll-y-wrapper {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: #ff3435 #310000;
}

.scroll-y-wrapper::-webkit-scrollbar {
  width: 8px;
}

.scroll-y-wrapper::-webkit-scrollbar-track {
  background: #310000;
  border-radius: 10px;
}

.scroll-y-wrapper::-webkit-scrollbar-thumb {
  background: #ff3435;
  border-radius: 10px;
}

.scroll-y-wrapper::-webkit-scrollbar-thumb:hover {
  background: #ff5a5a;
}

.circle-count {
  width: 20px;
  height: 20px;
  border: 1px solid #ff3435;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #420101;
  font-size: 14px;
  font-weight: 500;
  color: #ff3435;
}
</style>
