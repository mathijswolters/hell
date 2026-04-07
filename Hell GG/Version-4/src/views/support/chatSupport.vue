<template>
  <div class="support-chat-container">
    <button class="chat-toggle-btn" @click="toggleChat">
      <img v-if="isOpen == false" src="/img/icons/chat-btn.png" alt="chat" />
      <ChevronDownIcon
        v-else
        class="text-white w-[40px] h-[40px] p-2 bg-[#FF3435] rounded-full"
      />
    </button>

    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <button
          v-if="currentChat"
          @click="currentChat = null"
          class="text-[18px] font-[600] text-[#D7B7B7] flex items-center gap-2"
        >
          <ArrowLongLeftIcon class="w-5 h-5" /> Go back to Chats
        </button>
        <span class="text-[18px] font-[600] text-[#D7B7B7]" v-else>Chats</span>
        <div class="flex gap-2 items-start">
          <button v-if="!currentChat" class="green-btn">CREATE NEW</button>
          <button @click="closeChat">
            <XMarkIcon
              class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
            />
          </button>
        </div>
      </div>

      <div v-if="!currentChat" class="chat-content list-view">
        <div v-for="n in 15" :key="n" class="chat-item" @click="selectChat(n)">
          <img src="/img/icons/clever-boy.png" alt="image" />
          <div class="chat-info">
            <p class="text-[14px] font-[700] text-white">John . 1d</p>
            <p class="text-[12px] font-[500] opacity-50 text-white">Hi I am here</p>
          </div>
          <button v-if="n % 2 === 0" class="green-btn ml-auto">COMPLETE</button>
        </div>
      </div>

      <div v-else class="chat-content conversation-view">
        <div class="message admin">
          <strong>Admin</strong>
          <p>
            Before contacting our Live Support agents, please review the FAQ page. Your
            issue or question may already be addressed there, providing you with a quicker
            solution.
          </p>
        </div>
        <div class="message sent">
          <img src="/img/icons/clever-boy.png" alt="image" />
          <p>
            <span class="name">You:</span> I don’t get my skin could you please help for
            me in this case? I’m very appreciate it.
          </p>
        </div>
        <div class="flex items-center gap-2 justify-center">
          <img src="/img/icons/clever-girl.png" width="20" height="20" alt="image" />
          <p class="text-white text-[12px] text-white font-[arial]">
            John <span class="opacity-50 font-[400]">joined the conversation</span>
          </p>
        </div>
        <div class="message received">
          <img src="/img/icons/clever-girl.png" alt="image" />
          <p><span class="name">John:</span> Hi there DeanCortez!</p>
        </div>
        <div class="message sent">
          <img src="/img/icons/clever-boy.png" alt="image" />
          <p>
            <span class="name">You:</span> I don’t get my skin could you please help for
            me in this case? I’m very appreciate it.
          </p>
        </div>
        <div class="message received">
          <img src="/img/icons/clever-girl.png" alt="image" />
          <p><span class="name">John:</span> Hi there DeanCortez!</p>
        </div>
        <div class="message sent">
          <img src="/img/icons/clever-boy.png" alt="image" />
          <p>
            <span class="name">You:</span> I don’t get my skin could you please help for
            me in this case? I’m very appreciate it.
          </p>
        </div>
        <div class="message received">
          <img src="/img/icons/clever-girl.png" alt="image" />
          <p><span class="name">John:</span> Hi there DeanCortez!</p>
        </div>
      </div>


      <div class="chat-footer">
      <div class="flex items-center gap-2 justify-start">
        <img src="/img/icons/clever-girl.png" width="20" height="20" alt="image" />
        <p class="text-white text-[12px] text-white font-[arial]">
          John <span class="opacity-50 font-[400]">is typing ...</span>
        </p>
      </div>
        <div class="input-wrap">
          <input class="msg-input" type="text" placeholder="Enter your message..." />
          <div class="actions">
            <label class="relative w-5 h-5 cursor-pointer inline-block">
              <input
                type="file"
                class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                @change="handleFileUpload"
              />

              <img src="/img/icons/attach-file.svg" class="w-5 h-5 z-10" alt="upload" />
            </label>

            <button class="send-btn">SEND</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLongLeftIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    XMarkIcon,
    ChevronDownIcon,
    ArrowLongLeftIcon,
  },

  data() {
    return {
      isOpen: false,
      currentChat: null,
    };
  },

  methods: {
    selectChat(id) {
      this.currentChat = id;
    },
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    openChat() {
      this.isOpen = true;
    },
    closeChat() {
      this.isOpen = false;
      this.currentChat = null;
    },
    handleFileUpload(e) {
      const file = e.target.files[0];
      if (!file) return;

      console.log("Selected file:", file);
    },
  },
};
</script>

<style scoped>
.support-chat-container {
  position: relative;
  height: 100%;
  width: 100%;
}

/* FAB Button */
.chat-toggle-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  cursor: pointer;
  font-size: 14px;
}

/* Main Window */
.chat-window {
  width: 390px;
  height: calc(100% - 100px);
  background: #310000;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  position: absolute;
  bottom: 70px;
  right: 0;
  padding: 0px 8px;
}

/* Header Styles */
.chat-header {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: white;
  border-bottom: 1px solid #330000;
}

.chat-content {
  padding: 20px 12px;
  max-height: 626px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 80px;
}
.chat-content::-webkit-scrollbar {
  display: block;
  width: 4px;
}
.chat-content::-webkit-scrollbar-track {
  background: #84080866;
}
.chat-content::-webkit-scrollbar-thumb {
  background: #840808;
  border-radius: 4px;
}

/* List Item Styles */
.chat-item {
  display: flex;
  align-items: center;
  padding: 13px;
  border-radius: 8px;
  cursor: pointer;
  gap: 13px;
  transition: 0.2s;
  background: #240101;
  backdrop-filter: blur(8px);
}
.chat-item:nth-of-type(odd) {
  background: #5c0000;
}
.chat-item img {
  width: 30px;
  height: 30px;
  border-radius: 2px;
  object-fit: cover;
}

.chat-item:hover {
  opacity: 0.9;
}

.green-btn {
  background: #04ab53;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 2px;
  text-transform: uppercase;
}

/* Message Bubbles */
.message {
  padding: 12px;
  border-radius: 8px;
  max-width: 80%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-weight: 500;
  line-height: 20px;
  color: #d7b7b7;
  font-size: 14px;
}
.message.admin {
  background: #5c000080;
  flex-direction: column;
}
.message strong,
.message .name {
  color: white;
  font-weight: 700;
}
.message img {
  width: 32px;
  height: 32px;
  border-radius: 2px;
}

.sent {
  background: #5c0000;
  align-self: flex-end;
  margin-left: auto;
}

.received {
  background: #5c000080;
}

/* Footer Input */
.chat-footer {
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #310000;
}

.chat-footer .input-wrap .actions {
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-footer .input-wrap {
  width: 100%;
  background: #5c0000;
  color: white;
  border-radius: 8px;
  position: relative;
}
.chat-footer .msg-input {
  width: 100%;
  background: #5c0000;
  color: white;
  padding: 16px;
  border-radius: 8px;
}

.send-btn {
  background: #ff3435;
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 700;
  padding: 12px;
  border-radius: 6px;
  height: 100%;
}
</style>
