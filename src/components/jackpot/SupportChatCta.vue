<template>
  <div class="support-cta" ref="supportCta" :class="supportCtaDockClass">
    <img
      v-if="!showChatRoomsPopup"
      src="../../assets/img/support_chat.png"
      alt="Open support chat rooms"
      class="w-[100px] h-[105px] cursor-pointer"
      @click="openChatRoomsPopup"
    />
    <button
      v-else
      type="button"
      class="support-toggle-btn"
      @click="closeChatRoomsPopup"
      aria-label="Close support chat rooms"
    >
      <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6">
        <path
          d="M6 9L12 15L18 9"
          stroke="white"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div
      v-if="showChatRoomsPopup"
      ref="chatRoomsPopup"
      class="support-chat-popup w-[min(390px,calc(100vw-2rem))] max-h-[min(776px,calc(100vh-8rem))] rounded-lg bg-[#310000] p-4 border border-[#5c0000] flex flex-col"
    >
      <template v-if="!selectedChatRoom">
        <div class="mb-4 flex items-center justify-between shrink-0">
          <h4 class="text-[#d7b7b7] text-lg font-semibold font-['Rubik']">Chats</h4>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="bg-[#04ab53] text-white px-3 py-2 rounded text-[16px] font-Rubik font-extrabold hover:opacity-90 transition"
              @click="createNewChatRoom"
            >
              CREATE NEW
            </button>
            <button
              class="text-[#d7b7b7] text-xl leading-none hover:text-white transition"
              @click="closeChatRoomsPopup"
            >
              x
            </button>
          </div>
        </div>

        <div class="flex min-h-0 flex-1 flex-col">
          <div class="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            <button
              v-for="room in paginatedChatRooms"
              :key="room.id"
              type="button"
              @click="openChatRoomDetails(room)"
              :class="[
                'w-full rounded-lg p-2 flex items-center gap-3 transition text-left',
                room.completed ? 'bg-[#240101]' : 'bg-[#5c0000] hover:bg-[#240101]'
              ]"
            >
              <img :src="room.avatar" :alt="room.name" class="w-8 h-8 rounded" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1">
                  <span class="text-white text-sm font-bold font-['Rubik'] truncate">{{ room.name }}</span>
                  <span class="text-white text-sm font-bold font-['Rubik']">•</span>
                  <span class="text-white text-sm font-bold font-['Rubik']">{{ room.time }}</span>
                </div>
                <p class="text-[#d7b7b7] text-sm font-medium font-['Rubik'] mt-1 truncate">
                  {{ room.preview }}
                </p>
              </div>
              <span
                v-if="room.completed"
                class="bg-[#04ab53] text-white px-[7px] py-[4px] rounded-sm text-[16px] font-extrabold font-['Rubik'] hover:opacity-90 transition shrink-0"
              >
                COMPLETE
              </span>
            </button>
          </div>
          <div class="relative flex h-16 w-full flex-shrink-0 items-center justify-center pt-2">
            <div class="absolute flex items-center gap-x-2">
              <button
                type="button"
                :disabled="chatRoomsCurrentPage === 1"
                @click="changeChatRoomsPage(chatRoomsCurrentPage - 1)"
                class="flex items-center gap-x-2 stroke-white text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
              >
                <ChevronDoubleLeftIcon class="w-4" /> Previous Page
              </button>
              <div class="flex w-28 items-center justify-center gap-x-2">
                <button
                  v-for="page in chatRoomsVisiblePages"
                  :key="page"
                  type="button"
                  @click="changeChatRoomsPage(page)"
                  class="text-[#D7B7B7] font-bold text-base transition-all duration-200 font-Rubik"
                  :class="{
                    'text-white transition-all duration-200': chatRoomsCurrentPage === page
                  }"
                >
                  {{ page }}
                </button>
              </div>
              <button
                type="button"
                :disabled="chatRoomsCurrentPage === chatRoomsTotalPages || chatRoomsTotalPages === 0"
                @click="changeChatRoomsPage(chatRoomsCurrentPage + 1)"
                class="flex items-center gap-x-2 stroke-white text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
              >
                Next Page <ChevronDoubleRightIcon class="w-4" />
              </button>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="mb-3 flex items-center justify-between shrink-0">
          <button
            type="button"
            class="text-[#d7b7b7] text-sm font-semibold hover:text-white transition"
            @click="backToChatRooms"
          >
            ← Go back to Chats
          </button>
          <button class="text-[#d7b7b7] text-xl leading-none hover:text-white transition" @click="closeChatRoomsPopup">
            x
          </button>
        </div>

        <div class="rounded-lg bg-[#5C000080] p-3 mb-3 shrink-0">
          <div class="text-white text-sm font-bold font-['Rubik']">Admin</div>
          <p class="mt-1 text-[#d7b7b7] text-sm font-medium font-['Rubik']">
            Hi, could you explain the problem or question please?<br />
            Sorry if responses are delayed a bit, because this is a new site and still ironing our the kinks
          </p>
        </div>

        <div class="min-h-0 flex-1 overflow-y-auto pr-1 space-y-2">
          <div
            v-for="(detail, index) in selectedChatRoom.detailMessages"
            :key="`detail-${index}`"
          >
            <div v-if="isFirstSupportMessage(index)" class="mb-2 flex items-center gap-1 justify-center">
              <img :src="selectedChatRoom.avatar" :alt="selectedChatRoom.name" class="w-5 h-5 rounded-sm" />
              <span class="text-white text-xs font-bold font-['Rubik']">{{ selectedChatRoom.name }}</span>
              <span class="text-white/50 text-xs font-medium font-['Rubik']"> joined the conversation </span>
            </div>
            <div
              :class="[
                'rounded-lg p-2 max-w-[88%]',
                detail.sender === 'You' ? 'bg-[#5C0000] ml-auto mr-0' : 'bg-[#5C000080] ml-0 mr-auto'
              ]"
            >
              <div class="flex items-start gap-2 flex-row text-left">
                <img
                  :src="detail.sender === 'You' ? currentUserAvatar : selectedChatRoom.avatar"
                  :alt="detail.sender"
                  class="w-8 h-8 rounded"
                />
                <div class="min-w-0">
                  <span class="text-white text-sm font-bold font-['Rubik']">{{ detail.sender }}: </span>
                  <span class="text-[#d7b7b7] text-sm font-medium font-['Rubik'] break-words">
                    {{ detail.text }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedChatRoom.supportTyping" class="mt-2 flex items-center gap-1 shrink-0">
          <img :src="selectedChatRoom.avatar" :alt="selectedChatRoom.name" class="w-5 h-5 rounded-sm" />
          <span class="text-white text-xs font-bold font-['DM_Sans']">{{ selectedChatRoom.name }}</span>
          <span class="text-white/50 text-xs font-medium font-['Rubik']">is typing...</span>
        </div>

        <div class="mt-3 flex items-center gap-2 rounded-lg bg-[#240101] p-2 shrink-0">
          <input
            v-model="supportDetailMessage"
            type="text"
            :disabled="selectedChatRoom.completed"
            class="flex-1 bg-transparent placeholder:text-[#D7B7B7] font-Rubik text-[14px] focus:outline-none text-white disabled:opacity-50 disabled:cursor-not-allowed"
            :placeholder="
              selectedChatRoom.completed ? 'This chat room is completed' : 'Enter your message...'
            "
            @keyup.enter="sendSupportRoomMessage"
          />
          <button
            type="button"
            class="h-[2rem] px-[0.75rem] bg-[#FF3435] text-white font-Rubik font-extrabold text-[12px] rounded disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="selectedChatRoom.completed"
            @click="sendSupportRoomMessage"
          >
            SEND
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'
import defaultUserImg from '@/assets/img/user/userImage.png'
import { getAuth } from '@/auth/session'
import { chat_opened, chat_position } from '@/chatStore'

const MOCK_CHAT_ROOMS = [
  {
    id: 1,
    name: 'John',
    time: '1m',
    preview: 'Welcome to general chat.',
    avatar: 'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg',
    supportTyping: true,
    completed: false,
    detailMessages: [
      { sender: 'You', text: 'I need help with my recent skin transaction.' },
      { sender: 'John', text: 'Hello! Welcome to support chat.' },
      { sender: 'John', text: 'Hi there DeanCortez!' },
      { sender: 'You', text: 'I need help with my recent skin transaction.' },
      { sender: 'John', text: 'Sure, please share your trade id.' },
      { sender: 'You', text: 'Trade id is #94721.' }
    ]
  },
  {
    id: 2,
    name: 'John',
    time: '4m',
    preview: 'How can we help you today?',
    avatar: 'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg',
    supportTyping: false,
    completed: true,
    detailMessages: [
      { sender: 'You', text: 'Any update on my case?' },
      { sender: 'John', text: 'We reviewed your report.' },
      { sender: 'John', text: 'Your ticket is completed. Thanks for reaching out.' },
      { sender: 'You', text: 'Thank you for the quick support!' }
    ]
  },
  {
    id: 3,
    name: 'John',
    time: '9m',
    preview: 'Share your best coinflip wins.',
    avatar: 'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg',
    supportTyping: true,
    completed: false,
    detailMessages: [
      { sender: 'You', text: 'I think my bet result was delayed.' },
      { sender: 'John', text: 'How can I help with coinflip?' },
      { sender: 'John', text: 'Thanks, we are checking server logs now.' }
    ]
  },
  {
    id: 4,
    name: 'John',
    time: '14m',
    preview: 'Latest jackpot discussions.',
    avatar: 'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg',
    supportTyping: false,
    completed: true,
    detailMessages: [
      { sender: 'You', text: 'Can you confirm jackpot payout status?' },
      { sender: 'John', text: 'This jackpot request has been resolved.' },
      { sender: 'You', text: 'Great, thanks.' }
    ]
  },
  {
    id: 5,
    name: 'John',
    time: '1h',
    preview: 'Official updates from the team.',
    avatar: 'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg',
    supportTyping: true,
    completed: false,
    detailMessages: [
      { sender: 'You', text: 'I cannot access my history page right now.' },
      { sender: 'John', text: 'Please share more details.' },
      { sender: 'You', text: 'I cannot access my history page right now.' }
    ]
  },
  {
    id: 6,
    name: 'John',
    time: '1h',
    preview: 'Official updates from the team.',
    avatar: 'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg',
    supportTyping: true,
    completed: false,
    detailMessages: [
      { sender: 'You', text: 'Thank you, I will wait for update.' },
      { sender: 'John', text: 'We are checking this for you now.' },
      { sender: 'You', text: 'Thank you, I will wait for update.' }
    ]
  },
  {
    id: 7,
    name: 'John',
    time: '1h',
    preview: 'Official updates from the team.',
    avatar: 'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg',
    supportTyping: true,
    completed: false,
    detailMessages: [
      { sender: 'You', text: 'Order id is 11823.' },
      { sender: 'John', text: 'Can you share your order id?' },
      { sender: 'You', text: 'Order id is 11823.' },
      { sender: 'John', text: 'Perfect, support team is reviewing now.' }
    ]
  }
]

export default {
  name: 'SupportChatCta',
  components: {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
  },
  data() {
    return {
      showChatRoomsPopup: false,
      selectedChatRoom: null,
      supportDetailMessage: '',
      chatRoomsCurrentPage: 1,
      chatRoomsRowsPerPage: 8,
      chatRoomsMaxVisiblePages: 5,
      chatRooms: MOCK_CHAT_ROOMS.map((r) => ({ ...r, detailMessages: [...r.detailMessages] }))
    }
  },
  computed: {
    /** Right-docked chat: CTA sits left of the drawer when open (md+). Left-docked chat: CTA stays on the viewport right edge. */
    supportCtaDockClass() {
      void chat_position.position
      void chat_opened.opened
      const side = String(chat_position.position || 'right').toLowerCase()
      return {
        'is-chat-dock-right': side === 'right',
        'is-chat-dock-left': side === 'left',
        'is-chat-panel-open': !!chat_opened.opened
      }
    },
    currentUserAvatar() {
      return getAuth()?.avatarUrl || defaultUserImg
    },
    chatRoomsTotalPages() {
      return Math.ceil(this.chatRooms.length / this.chatRoomsRowsPerPage)
    },
    paginatedChatRooms() {
      const start = (this.chatRoomsCurrentPage - 1) * this.chatRoomsRowsPerPage
      const end = start + this.chatRoomsRowsPerPage
      return this.chatRooms.slice(start, end)
    },
    chatRoomsVisiblePages() {
      const total = this.chatRoomsTotalPages
      const max = this.chatRoomsMaxVisiblePages
      const half = Math.floor(max / 2)
      let start = Math.max(1, this.chatRoomsCurrentPage - half)
      let end = Math.min(total, start + max - 1)

      if (end - start < max - 1) {
        start = Math.max(1, end - max + 1)
      }

      const pages = []
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  watch: {
    chatRoomsTotalPages(tp) {
      if (tp > 0 && this.chatRoomsCurrentPage > tp) {
        this.chatRoomsCurrentPage = tp
      }
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  },
  methods: {
    handleClickOutside(event) {
      const popupElement = this.$refs.chatRoomsPopup
      const supportCtaElement = this.$refs.supportCta
      if (
        this.showChatRoomsPopup &&
        popupElement &&
        supportCtaElement &&
        !popupElement.contains(event.target) &&
        !supportCtaElement.contains(event.target)
      ) {
        this.closeChatRoomsPopup()
      }
    },
    openChatRoomsPopup() {
      this.showChatRoomsPopup = true
    },
    changeChatRoomsPage(page) {
      if (page >= 1 && page <= this.chatRoomsTotalPages) {
        this.chatRoomsCurrentPage = page
      }
    },
    closeChatRoomsPopup() {
      this.selectedChatRoom = null
      this.supportDetailMessage = ''
      this.showChatRoomsPopup = false
    },
    openChatRoomDetails(room) {
      this.selectedChatRoom = room
      this.supportDetailMessage = ''
    },
    createNewChatRoom() {
      const newRoom = {
        id: Date.now(),
        name: 'John',
        time: 'now',
        preview: 'New chat room',
        avatar: 'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg',
        supportTyping: false,
        completed: false,
        detailMessages: []
      }

      this.chatRooms.unshift(newRoom)
      this.chatRoomsCurrentPage = 1
      this.openChatRoomDetails(newRoom)
    },
    backToChatRooms() {
      this.selectedChatRoom = null
      this.supportDetailMessage = ''
    },
    sendSupportRoomMessage() {
      if (!this.selectedChatRoom || this.selectedChatRoom.completed) return
      const content = this.supportDetailMessage.trim()
      if (!content) return

      this.selectedChatRoom.detailMessages.push({
        sender: 'You',
        text: content
      })
      this.supportDetailMessage = ''
    },
    isFirstSupportMessage(index) {
      if (!this.selectedChatRoom) return false
      if (this.selectedChatRoom.detailMessages[index]?.sender === 'You') return false
      return this.selectedChatRoom.detailMessages.findIndex((item) => item.sender !== 'You') === index
    }
  }
}
</script>

<style scoped>
.support-cta {
  position: fixed;
  bottom: 1rem;
  z-index: 35;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* Chat panel on the right → park support just to the left of the drawer (md+ when open). */
.support-cta.is-chat-dock-right {
  right: 1rem;
  left: auto;
}

@media (min-width: 768px) {
  .support-cta.is-chat-dock-right.is-chat-panel-open {
    right: calc(18.75rem + 1rem);
  }
}

/* Chat panel on the left → keep support on the viewport right edge (not next to the chat column). */
.support-cta.is-chat-dock-left {
  right: 1rem;
  left: auto;
}

.support-chat-popup {
  position: absolute;
  right: 0;
  left: auto;
  bottom: calc(100% + 10px);
  z-index: 36;
}

.support-toggle-btn {
  width: 42px;
  height: 42px;
  border-radius: 9999px;
  background: #ff4b4b;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
}
</style>
