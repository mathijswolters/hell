<template>
  <div class="flex flex-col gap-[8px]">
    <div class="flex gap-3 items-center">
      <button
        :class="[
          'p-[10px] text-[14px] font-[700] text-white rounded-[2px]',
          filterType === 'unresolved' ? 'bg-[#FF343580]' : 'bg-[#FF343580] opacity-[0.5]',
        ]"
        @click="filterType = 'unresolved'"
      >
        Unresolved
      </button>
      <button
        :class="[
          'p-[10px] text-[14px] font-[700] text-white rounded-[2px]',
          filterType === 'archived' ? 'bg-[#FF343580]' : 'bg-[#FF343580] opacity-[0.5]',
        ]"
        @click="filterType = 'archived'"
      >
        Archived Tickets
      </button>
    </div>

    <div class="w-full">
      <input
        type="text"
        placeholder="Search for user"
        v-model="searchQuery"
        class="w-full p-[10px] text-[14px] font-[700] text-white rounded-[2px] bg-[#620101]"
      />
    </div>

    <div class="scroll-y-wrapper">
      <div
        v-for="chat in filteredChats"
        :key="chat.id"
        :class="['chat-list-item', chat.type, { active: selectedChatId === chat.id }]"
        @click="selectChat(chat)"
      >
        <div class="info-time-row">
          <div class="info-row">
            <img :src="chat.userImage" alt="img" />
            <img v-if="chat.rankImage" :src="chat.rankImage" alt="img" />
            <span class="name">{{ chat.username }}</span>
            <button
              v-if="chat.moreTickets"
              @click.stop="openModal('show tickets')"
              class="ticket-badge"
            >
              {{ chat.moreTickets }} more tickets
            </button>
          </div>
          <div class="info-time">{{ chat.timestamp }}</div>
        </div>
        <p class="message">{{ chat.lastMessage }}</p>
        <div v-if="chat.adminNotification" class="admin-badge">
          For Admin
          <div class="circle-count">{{ chat.adminNotification }}</div>
        </div>
        <div v-if="chat.chatNotification" class="admin-badge">
          <div class="circle-count">{{ chat.chatNotification }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { openModal } from "@/modalStore";

export default {
  name: "SideListPanal",
  data() {
    return {
      selectedChatId: null,
      filterType: "unresolved",
      searchQuery: "",
      chats: [
        {
          id: 1,
          username: "BreadYoutube2",
          userImage: "/img/icons/clever-boy.png",
          rankImage: "/img/icons/clever-rank.png",
          lastMessage: "Hello, how can I help you today?",
          timestamp: "10 seconds ago",
          type: "tickets",
          chatNotification: 3,
          moreTickets: 2,
          status: "unresolved",
        },
        {
          id: 2,
          username: "BreadYoutube2",
          userImage: "/img/icons/clever-boy.png",
          rankImage: null,
          lastMessage: "Hello, how can I help you today?",
          timestamp: "10 seconds ago",
          type: "normal",
          adminNotification: 1,
          status: "unresolved",
        },
        {
          id: 3,
          username: "BreadYoutube2",
          userImage: "/img/icons/clever-boy.png",
          rankImage: null,
          lastMessage: "Hello, how can I help you today?",
          timestamp: "10 seconds ago",
          type: "normal",
          adminNotification: 1,
          status: "unresolved",
        },
        {
          id: 4,
          username: "BreadYoutube2",
          userImage: "/img/icons/clever-boy.png",
          rankImage: "/img/icons/clever-rank.png",
          lastMessage: "Hello, how can I help you today?",
          timestamp: "10 seconds ago",
          chatNotification: 2,
          type: "unread",
          status: "unresolved",
        },
        {
          id: 5,
          username: "BreadYoutube2",
          userImage: "/img/icons/clever-boy.png",
          rankImage: "/img/icons/clever-rank.png",
          lastMessage: "Hello, how can I help you today?",
          timestamp: "10 seconds ago",
          type: "unknown",
          chatNotification: 4,
          status: "unresolved",
        },
        {
          id: 6,
          username: "BreadYoutube2",
          userImage: "/img/icons/clever-boy.png",
          rankImage: "/img/icons/clever-rank.png",
          lastMessage: "Hello, how can I help you today?",
          timestamp: "10 seconds ago",
          chatNotification: 1,
          type: "unread",
          status: "unresolved",
        },
        {
          id: 7,
          username: "BreadYoutube2",
          userImage: "/img/icons/clever-boy.png",
          rankImage: null,
          lastMessage: "Hello, how can I help you today?",
          timestamp: "10 seconds ago",
          type: "normal",
          adminNotification: 1,
          status: "unresolved",
        },
        {
          id: 8,
          username: "BreadYoutube2",
          userImage: "/img/icons/clever-boy.png",
          rankImage: null,
          lastMessage: "Hello, how can I help you today?",
          timestamp: "10 seconds ago",
          type: "normal",
          adminNotification: 1,
          status: "archived",
        },
      ],
    };
  },
  computed: {
    filteredChats() {
      return this.chats.filter((chat) => {
        const matchesFilter = chat.status === this.filterType;
        const matchesSearch = chat.username
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      });
    },
  },
  methods: {
    openModal(name, props) {
      openModal(name, props);
    },
    selectChat(chat) {
      this.selectedChatId = chat.id;
      console.log("Chat clicked:", chat, "Selected:", this.selectedChatId);
      this.$emit("chat-selected", chat);
    },
  },
};
</script>

<style scoped>
/* Scroll y wrapper */
.scroll-y-wrapper {
  width: 100%;
  height: 100%;
  max-height: 62vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
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
.chat-list-item {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: #620101;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: "rubik";
  transition: all 0.2s ease;
  border: 1px solid transparent;
}
.chat-list-item:hover {
  opacity: 0.8;
  cursor: pointer;
}

.chat-list-item.active {
  border: 1px solid #ff3435;
  opacity: 1;
}

.chat-list-item .ticket-badge {
  background-color: #420101;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 9px;
  color: white;
}
.chat-list-item .admin-badge {
  width: max-content;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #ff3435;
  position: absolute;
  bottom: 12px;
  right: 12px;
}

.chat-list-item.tickets {
  background-color: #844307;
}
.chat-list-item.unread {
  background-color: #2c3c1e;
}
.chat-list-item.unknown {
  background-color: #240101;
  border-left: 4px solid #ff3435;
}
.info-time-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}
.info-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}
.info-row img {
  width: 24px;
  height: 24px;
  border-radius: 2px;
}
.info-row span {
  font-size: 14px;
  font-weight: 700;
  color: white;
}
.info-time {
  width: max-content;
  text-align: end;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  color: white;
  opacity: 0.5;
}
p.message {
  font-size: 14px;
  font-weight: 500;
  color: white;
  opacity: 0.5;
  padding-left: 30px;
}
</style>
