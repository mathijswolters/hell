<template>
  <div
    class="w-full h-full relative bg-[linear-gradient(180deg,#530000_0%,#2e0101_100%)] border-l border-solid border-[#530000] pb-2 flex flex-col gap-[0.5rem]"
  >
    <!-- Chat Shadow -->
    <div
      class="absolute h-[100px] md:h-[187px] w-full bg-[linear-gradient(180deg,#4B0202_0%,rgba(75,2,2,0.9)_49.25%,rgba(75,2,2,0)_100%)] left-0 z-[1]"
    ></div>
    <!-- End Chat Shadow -->
    <!-- Chat Voice Users -->
    <div
      class="absolute top-5 md:top-[4rem] px-2 right-0 text-white z-10 flex items-end flex-col gap-[0.5rem]"
    >
      <span
        class="px-2 py-2 bg-[#690405] flex items-center justify-center text-xs text-[#D7B7B7] font-Rubik font-bold"
        >{{ chatSteamLabel }}</span
      >
      <div class="flex w-full items-center justify-end">
        <SpeakerWaveIcon class="min-w-[15px] w-[15px] stroke-[#fff] fill-[#fff] mr-6" />
        <div class="flex w-full justify-end">
          <img
            v-for="(item, index) in images"
            :key="index"
            :style="{ zIndex: `${images.length - index}` }"
            :src="item"
            class="min-w-[2rem] w-[2rem] rounded-full border-[2px] border-solid border-[#4E0202] -ml-4"
          />
        </div>
      </div>
      <button
        class="flex bg-[#810E0E] items-center justify-center gap-1 font-Rubik text-sm text-[#FF3435] font-bold p-2"
      >
        <DiscordIcon class="-mb-1.5" />
        JOIN
      </button>
    </div>
    <!-- Chat Voice Users -->
    <!-- Chat Messages -->

    <div
      class="w-full h-[calc(100%-6rem)] flex flex-col-reverse overflow-y-auto pt-36"
      ref="chatArea"
    >
      <div class="flex w-full flex-col">
        <div class="w-full flex gap-[0.5rem]" v-for="message in messages" :key="message">
          <div v-if="message.type == 'hof announcement'" class="w-full bg-[#590101] flex flex-col">
            <div
              class="w-full flex items-end pb-0.5 justify-center gap-1 h-[26px]"
              :class="{
                'bg-[#efbf04]/60': message.place == 1,
                'bg-[#8D8A8AB2]': message.place == 2,
                'bg-[#765518B2]': message.place == 3
              }"
              style="box-shadow: 0px 2px 2px 0px #00000040"
            >
              <div
                class="flex -mb-0.5 items-center gap-1 font-Rubik text-base font-bold text-white"
              >
                <img src="../assets/icons/cup.svg" class="h-4 w-4" />
                HOF
                <img src="../assets/icons/cup.svg" class="h-4 w-4" />
              </div>
              <span class="font-Rubik text-[10px] font-medium text-white">
                {{
                  message.place == 1
                    ? 'New Biggest Coinflip Win'
                    : message.place == 2
                      ? '2nd Biggest Coinflip Win'
                      : '3rd Biggest Coinflip Win'
                }}
              </span>
            </div>
            <div class="h-[51px] flex items-center justify-center gap-1">
              <div
                class="min-w-[2rem] w-[2rem] h-[2rem] rounded-sm bg-no-repeat bg-center bg-cover"
                :style="{
                  backgroundImage: `url(${message.user.avatar})`
                }"
              ></div>
              <img
                v-if="message.user.rank"
                :src="`/img/ranks/${message.user.rank}.png`"
                class="max-h-[20px]"
              />
              <span class="font-Rubik text-white font-bold text-sm">{{ message.user.name }}</span>

              <div
                class="flex items-start gap-0.5 text-sm font-Rubik font-bold"
                :class="{
                  'text-[#EFBF04]': message.place == 1,
                  'text-[#C4C4C4]': message.place == 2,
                  'text-[#A87A23]': message.place == 3
                }"
              >
                <img v-if="message.place == 1" src="../assets/img/cups/gold.png" class="h-4 w-4" />
                <img
                  v-if="message.place == 2"
                  src="../assets/img/cups/silver.png"
                  class="h-4 w-4"
                />
                <img
                  v-if="message.place == 3"
                  src="../assets/img/cups/bronze.png"
                  class="h-4 w-4"
                />
                {{
                  Number(message.ammount).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }}
              </div>
            </div>
          </div>
          <div
            v-else-if="message.type == 'winning'"
            class="w-full flex flex-col"
          >
            <div
              class="h-[26px] w-full flex items-center justify-center gap-1 font-Rubik font-extrabold text-[10px] uppercase tracking-wide text-white"
              :class="{
                'bg-[#8F0A0A]': message.game == 'coinflip',
                'bg-[#9E640D]': message.game == 'jackpot'
              }"
            >
              <span class="text-xs font-bold">BIG WIN ON</span>
              <img
                :src="message.game == 'jackpot' ? '/src/assets/img/coins/jackpot.png' : '/src/assets/img/coins/coinflip.png'"
                class="w-3 h-3 rounded-full"
              />
              <span class="text-xs font-bold">{{ message.game }}</span>
            </div>
            <div
              class="flex w-full px-2 items-center justify-between"
            :class="{
              'bg-[#620101] h-[50px] gap-1 ': message.game == 'coinflip',
              'bg-[#6E3005] pt-2 py-5 ': message.game == 'jackpot'
            }"
          >
            <div class="flex min-w-0 flex-col gap-0.5">
              <div class="flex items-center gap-1">
                <div
                  class="min-w-[2rem] w-[2rem] h-[2rem] rounded-sm bg-no-repeat bg-center bg-cover relative"
                  :style="{
                    backgroundImage: `url(${message.user.avatar})`
                  }"
                >
                  <div class="absolute flex items-center h-full -right-2">
                    <img
                      v-if="message.game == 'coinflip' && message.coin == 'heaven'"
                      src="../assets/img/coins/heaven.png"
                      class="w-5 h-5"
                    />
                    <img
                      v-if="message.game == 'coinflip' && message.coin == 'hell'"
                      src="../assets/img/coins/hell.png"
                      class="w-5 h-5"
                    />
                  </div>
                </div>
                <div class="ml-2 flex items-center font-Rubik text-white font-bold text-sm gap-1 min-w-0">
                  <img
                    v-if="message.user.rank"
                    :src="`/img/ranks/${message.user.rank}.png`"
                    class="max-h-[20px]"
                  />
                  <span class="truncate">{{ message.user.name }}</span>
                </div>
              </div>
              <div class="flex items-center font-Rubik font-bold text-sm gap-1 whitespace-nowrap">
                <span class="text-white">WON</span>
                <span
                  :class="{
                    'text-[#04AB53]': message.game == 'coinflip',
                    'text-[#FEBD11]': message.game == 'jackpot'
                  }"
                  >
                  ${{
                    Number(message.ammount).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0
                    })
                  }}</span
                >
                <span class="text-white" v-if="message.game == 'coinflip'">FROM</span>
                <img
                  v-if="message.game == 'coinflip'"
                  :src="`/img/coins/${message.coin || 'hell'}.png`"
                  class="w-3.5 h-3.5 rounded-full"
                />
                <span class="text-white" v-if="message.game == 'coinflip'">COINFLIP</span>
                <span class="text-white" v-if="message.game == 'jackpot'"
                  >WITH <span class="text-opacity-65">{{ message.chance }}%</span> CHANCE</span
                >
              </div>
            </div>

            <button
              class="w-[60px] h-8 rounded-sm font-Rubik font-bold text-base text-white"
              :class="{
                'bg-[#FF3435]': message.game == 'coinflip',
                'bg-[#A46409] -mb-2': message.game == 'jackpot'
              }"
            >
              VIEW
            </button>
          </div>
          </div>
          <div v-else class="w-full flex gap-[0.5rem] p-2">
            <UserImage :user="message.user" />

            <span class="w-full break-words text-white text-[14px] font-medium font-Rubik pt-1">
              <span
                class="text-[14px] font-Rubik font-bold inline-flex items-center"
                :class="{
                  'text-[#FF3435]': message.user.role == 'admin',
                  'text-[#10CF6A]': message.user.role == 'mod',
                  'text-white': message.user.role != 'mod' && message.user.role != 'admin'
                }"
              >
                <span
                  v-if="message.user.role == 'admin' || message.user.role == 'mod'"
                  class="px-1 py-0.5 mr-1 text-white font-bold text-[12px] font-Rubik uppercase"
                  :class="{
                    'bg-[#FF3435]': message.user.role == 'admin',
                    'bg-[#04AB53]': message.user.role == 'mod'
                  }"
                >
                  {{ message.user.role }}
                </span>
                <div v-else class="py-0.5 invisible">a</div>
                <img
                  v-if="message.user.rank"
                  :src="`/img/ranks/${message.user.rank}.png`"
                  class="max-h-4 mr-1"
                  :class="{ '-ml-1': message.user.role !== 'admin' && message.user.role !== 'mod' }"
                />
                {{ message.user.name }}

                <span class="pl-1 pb-0.5">:</span>
              </span>

              <span
                class="pl-1 text-[#D7B7B7] font-Rubik font-medium"
                v-html="formatMessage(message.content)"
              ></span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="h-[6rem] flex flex-col gap-[0.5rem] px-2">
      <!-- Input -->
      <div class="relative h-[4rem] bg-[#53000099] backdrop-blur-[32px]">
        <input
          type="text"
          v-model="newMessage"
          ref="inputField"
          :disabled="!signedIn"
          @keyup.enter="sendMessage"
          class="w-full bg-transparent placeholder:text-[#D7B7B7] font-Rubik font-normal text-[14px] p-2 pr-10 focus:outline-none text-white disabled:cursor-not-allowed disabled:opacity-60"
          :placeholder="signedIn ? 'Enter your message' : 'Sign in to chat'"
        />

        <img
          @click="signedIn && showEmojiPicker()"
          src="../assets/icons/emoji.svg"
          class="absolute top-2 right-2.5"
          :class="signedIn ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'"
        />
        <div
          class="absolute bottom-full w-full overflow-y-auto flex flex-wrap justify-center bg-[#530000] pt-2 px-2 transition-all duration-300"
          :class="{
            '-z-10 h-0 opacity-0 ': !emojisPickerVisible,
            'z-10 h-[10rem] opacity-100 backdrop-blur-2xl': emojisPickerVisible
          }"
        >
          <div class="flex flex-wrap gap-2">
            <img
              v-for="(emoji, n) in emojis"
              :src="setEmojiPath(emoji.file)"
              :alt="setEmojiPath(emoji.file)"
              @click="importEmoji(emoji.name)"
              :key="n + 1"
              class="max-w-9 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <!-- End Input -->
      <!-- Toggles -->
      <div class="flex items-center justify-between gap-[1rem] relative">
        <div
          class="absolute bg-[#620101] border-[0.5px] border-solid bottom-full mb-1 transition-all overflow-hidden px-2 py-3 flex flex-col gap-3"
          @mousedown="stopPropagation"
          ref="dropdownContainer"
          :class="{
            'w-full h-[162px] opacity-100 border-[#FF3435]': chat_rules,
            'w-0 h-0 opacity-0 border-transparent': !chat_rules
          }"
        >
          <div
            class="flex item-center gap-[0.3rem] font-Rubik font-semibold text-[14px] text-white"
          >
            <DocumentTextIcon class="fill-[#fff] w-[16px]" />
            Chat Rules
          </div>

          <span class="flex item-center font-Rubik font-medium text-xs text-[#D7B7B7]">
            For the people that need a rules page in order to know how to behave.</span
          >
          <ul class="list-disc pl-4 text-white font-medium font-Rubik text-sm">
            <li class="text-white font-medium font-Rubik text-sm">No Bigotry/Racism/Sexism.</li>
            <li class="text-white font-medium font-Rubik text-sm">No Begging.</li>
            <li class="text-white font-medium font-Rubik text-sm">No referral codes/links.</li>
          </ul>
        </div>
        <button
          class="cursor-pointer flex item-center gap-[0.3rem] font-Rubik font-semibold text-[14px] text-[#D7B7B7] select-none"
          @click="chat_rules = !chat_rules"
          ref="dropdownContainer"
        >
          <DocumentTextIcon class="fill-[#D7B7B7] w-[16px]" />
          Chat Rules
        </button>
        <!-- <div
          class="cursor-pointer flex item-center gap-[0.3rem] font-Rubik font-semibold text-[14px] text-white"
        >
          <img src="../assets/icons/rain.svg" />
          Tip Rain
        </div> -->
        <button
          type="button"
          class="h-[2rem] px-[0.75rem] bg-[#FF3435] text-white font-Rubik font-extrabold text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!signedIn"
          @click="sendMessage"
        >
          SEND
        </button>
      </div>
    </div>
    <div class="support-cta" ref="supportCta">
      <img
        v-if="!showChatRoomsPopup"
        src="../assets/img/support_chat.png"
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
        class="support-chat-popup w-[340px] rounded-lg bg-[#310000] p-4 border border-[#5c0000]"
      >
        <template v-if="!selectedChatRoom">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="text-[#d7b7b7] text-lg font-semibold font-['Rubik']">Chats</h4>
            <div class="flex items-center gap-2">
              <button class="bg-[#04ab53] text-white px-3 py-2 rounded text-xs font-extrabold hover:opacity-90 transition">CREATE NEW</button>
              <button
                class="text-[#d7b7b7] text-xl leading-none hover:text-white transition"
                @click="closeChatRoomsPopup"
              >
                x
              </button>
            </div>
          </div>

          <div class="max-h-[560px] overflow-y-auto pr-1 space-y-3">
            <button
              v-for="room in chatRooms"
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
                class="bg-[#04ab53] text-white px-1 py-2 rounded text-xs font-extrabold font-['Rubik'] hover:opacity-90 transition"
              >
                COMPLETE
              </span>
            </button>
          </div>
        </template>

        <template v-else>
          <div class="mb-3 flex items-center justify-between">
            <button
              type="button"
              class="text-[#d7b7b7] text-sm font-semibold hover:text-white transition"
              @click="backToChatRooms"
            >
              ← Go back to Chats
            </button>
            <button
              class="text-[#d7b7b7] text-xl leading-none hover:text-white transition"
              @click="closeChatRoomsPopup"
            >
              x
            </button>
          </div>

          <div class="rounded-lg bg-[#5C000080] p-3 mb-3">
            <div class="text-white text-sm font-bold font-['Rubik']">Admin</div>
            <p class="mt-1 text-[#d7b7b7] text-sm font-medium font-['Rubik']">
              Before contacting our Live Support agents, please review the FAQ page. Your issue or
              question may already be addressed there, providing you with a quicker solution.
            </p>
          </div>

          <div class="max-h-[320px] overflow-y-auto pr-1 space-y-2">
            <div
              v-for="(detail, index) in selectedChatRoom.detailMessages"
              :key="`detail-${index}`"
            >
              <div v-if="isFirstSupportMessage(index)" class="mb-2 flex items-center gap-1 justify-center">
                <img :src="selectedChatRoom.avatar" :alt="selectedChatRoom.name" class="w-5 h-5 rounded-sm" />
                <span class="text-white text-xs font-bold font-['DM_Sans']">{{ selectedChatRoom.name }}</span>
                <span class="text-white/50 text-xs font-medium font-['DM_Sans']">
                  joined the conversation
                </span>
              </div>
              <div
                :class="[
                  'rounded-lg p-2 max-w-[88%]',
                  detail.sender === 'You'
                    ? 'bg-[#5C0000] ml-auto mr-0'
                    : 'bg-[#5C000080] ml-0 mr-auto'
                ]"
              >
              <div
                :class="[
                  'flex items-start gap-2 flex-row text-left',
                ]"
              >
                <img
                  :src="detail.sender === 'You' ? currentUserAvatar : selectedChatRoom.avatar"
                  :alt="detail.sender"
                  class="w-8 h-8 rounded"
                />
                <div class="min-w-0">
                  <span class="text-white text-sm font-bold font-['Rubik']">{{ detail.sender }}:  </span>
                  <span class="text-[#d7b7b7] text-sm font-medium font-['Rubik'] break-words">
                    {{ detail.text }}
                  </span>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div
            v-if="selectedChatRoom.supportTyping"
            class="mt-2 flex items-center gap-1"
          >
            <img :src="selectedChatRoom.avatar" :alt="selectedChatRoom.name" class="w-5 h-5 rounded-sm" />
            <span class="text-white text-xs font-bold font-['DM_Sans']">{{ selectedChatRoom.name }}</span>
            <span class="text-white/50 text-xs font-medium font-['DM_Sans']">is typing...</span>
          </div>

          <div class="mt-3 flex items-center gap-2 rounded-lg bg-[#240101] p-2">
            <input
              v-model="supportDetailMessage"
              type="text"
              :disabled="selectedChatRoom.completed"
              class="flex-1 bg-transparent placeholder:text-[#D7B7B7] font-Rubik text-[14px] focus:outline-none text-white disabled:opacity-50 disabled:cursor-not-allowed"
              :placeholder="selectedChatRoom.completed ? 'This chat room is completed' : 'Enter your message...'"
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
  </div>
</template>
<script>
import { SpeakerWaveIcon, DocumentTextIcon } from '@heroicons/vue/24/solid'
import joypixels from 'emoji-toolkit'
import UserImage from './UserImage.vue'
import DiscordIcon from '../components/icons/Discord.vue'
import defaultUserImg from '@/assets/img/user/userImage.png'
import { authVersion, getAuth, isLoggedIn } from '@/auth/session'
export default {
  components: {
    SpeakerWaveIcon,
    DocumentTextIcon,
    UserImage,
    DiscordIcon
  },
  data() {
    return {
      newMessage: '',
      messageId: 1,
      images: [
        'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY-iP-czPusnPWfMuxqknkMABLAnmLI6iUxA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAZLAACY8aaZLPre_yB9KZ9vBWBMiEMBS6oA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROWYOi4SwhNBJRgXoCsU0wnw4rVQyj8U5OSg&s'
      ],
      showChatRoomsPopup: false,
      selectedChatRoom: null,
      supportDetailMessage: '',
      chatRooms: [
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
            { sender: 'You', text: 'Thank you, I will wait for update.' },
            { sender: 'John', text: 'We are checking this for you now.' },
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
      ],
      messages: [
        {
          user: {
            _id: 123,
            role: 'mod',
            name: 'tester',
            win_streak: 1,
            dominating: 1,
            target: 0,
            rank: 1,
            avatar:
              'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg'
          },
          content:
            'this is a test message this is a test message this is a test message this is a test message this is a test message'
        },
        {
          user: {
            _id: 123,
            role: 'admin',
            name: 'tester',

            win_streak: 0,
            dominating: 2,
            target: 3,
            rank: 5,
            avatar:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY-iP-czPusnPWfMuxqknkMABLAnmLI6iUxA&s'
          },
          content:
            'this is a test message this is a test message this is a test message this is a test message this is a test message'
        },
        {
          type: 'hof announcement',
          place: 1,
          ammount: 2456,
          user: {
            _id: 1234,
            role: '',
            name: 'COOLER',
            win_streak: 0,
            dominating: false,
            target: false,
            rank: 9,
            avatar:
              'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg'
          },
          content:
            'this is a test message this is a test message this is a test message this is a test message this is a test message'
        },
        {
          user: {
            _id: 123,
            role: '',
            name: 'tester',
            win_streak: 0,
            dominating: false,
            target: false,
            rank: 9,
            avatar:
              'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg'
          },
          content:
            'this is a test message this is a test message this is a test message this is a test message this is a test message'
        },
        {
          type: 'hof announcement',
          place: 2,
          ammount: 2456,
          user: {
            _id: 1234,
            role: '',
            name: 'COOLER 2',
            win_streak: 0,
            dominating: false,
            target: false,
            rank: 2,
            avatar:
              'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg'
          },
          content:
            'this is a test message this is a test message this is a test message this is a test message this is a test message'
        },
        {
          type: 'hof announcement',
          place: 3,
          ammount: 2456,
          user: {
            _id: 1234,
            role: '',
            name: 'COOLER',
            win_streak: 0,
            dominating: false,
            target: false,
            rank: 9,
            avatar:
              'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg'
          },
          content:
            'this is a test message this is a test message this is a test message this is a test message this is a test message'
        },
        {
          user: {
            _id: 123,
            role: '',
            name: 'tester',
            win_streak: 0,
            dominating: false,
            target: false,
            rank: 9,
            avatar:
              'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg'
          },
          content:
            'this is a test message this is a test message this is a test message this is a test message this is a test message'
        },
        {
          type: 'winning',
          game: 'coinflip',
          coin: 'heaven',
          ammount: 2456,
          user: {
            _id: 1234,
            role: '',
            name: 'COOLER',
            win_streak: 0,
            dominating: false,
            target: false,
            rank: 9,
            avatar:
              'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg'
          }
        },
        {
          type: 'winning',
          game: 'jackpot',
          chance: 36,
          ammount: 2456,
          user: {
            _id: 1234,
            role: '',
            name: 'COOLER',
            win_streak: 0,
            dominating: false,
            target: false,
            rank: 9,
            avatar:
              'https://imgcdn.stablediffusionweb.com/2024/9/15/5e3461df-7a8d-45dd-8ca7-73223594993f.jpg'
          }
        }
      ],
      emojis: [
        { name: 'kappaglasses', file: '3972-kappaglasses.gif' },
        { name: '4Head', file: '4Head.png' },
        { name: '6216_kappapride', file: '6216_kappapride.png' },
        { name: 'BabyCry', file: 'BabyCry.gif' },
        { name: 'CatJam', file: 'CatJam.gif' },
        { name: 'CoolStoryBob', file: 'CoolStoryBob.png' },
        { name: 'CryCat', file: 'CryCat.png' },
        { name: 'DogeJamming', file: 'DogeJamming.gif' },
        { name: 'DogeSmug', file: 'DogeSmug.png' },
        { name: 'EZY', file: 'EZY.png' },
        { name: 'HyperBruh', file: 'HyperBruh.png' },
        { name: 'Jebaited', file: 'Jebaited.png' },
        { name: 'Kappa', file: 'Kappa.png' },
        { name: 'KekwDisco', file: 'KekwDisco.gif' },
        { name: 'KreyGasm', file: 'KreyGasm.png' },
        { name: 'LUL', file: 'LUL.png' },
        { name: 'MonkaS', file: 'MonkaS.png' },
        { name: 'NotLikeThis', file: 'NotLikeThis.png' },
        { name: 'OmegaLUL', file: 'OmegaLUL.png' },
        { name: 'PepeBanned', file: 'PepeBanned.png' },
        { name: 'PepeClown', file: 'PepeClown.png' },
        { name: 'PepeCry', file: 'PepeCry.png' },
        { name: 'PepeHacker', file: 'PepeHacker.gif' },
        { name: 'PepeHands', file: 'PepeHands.png' },
        { name: 'PepeHappy', file: 'PepeHappy.png' },
        { name: 'PepeMoney', file: 'PepeMoney.png' },
        { name: 'PepeNo', file: 'PepeNo.png' },
        { name: 'PepeNoting', file: 'PepeNoting.gif' },
        { name: 'PepeNotLikeThis', file: 'PepeNotLikeThis.gif' },
        { name: 'PepeOK', file: 'PepeOK.png' },
        { name: 'PepePoggies', file: 'PepePoggies.png' },
        { name: 'PepePray', file: 'PepePray.png' },
        { name: 'PepeRee', file: 'PepeRee.png' },
        { name: 'PepeShoot', file: 'PepeShoot.gif' },
        { name: 'PepeSus', file: 'PepeSus.png' },
        { name: 'PepeYes', file: 'PepeYes.png' },
        { name: 'Poggers', file: 'Poggers.png' },
        { name: 'PoggersPride', file: 'PoggersPride.gif' },
        { name: 'Pogging', file: 'Pogging.png' },
        { name: 'ResidentSleeper', file: 'ResidentSleeper.png' },
        { name: 'RNG', file: 'RNG.png' },
        { name: 'Sadge', file: 'Sadge.png' },
        { name: 'SadgePray', file: 'SadgePray.png' },
        { name: 'Salt', file: 'Salt.png' },
        { name: 'SeemsGood', file: 'SeemsGood.png' },
        { name: 'SideEye', file: 'SideEye.png' },
        { name: 'Smorc', file: 'Smorc.png' },
        { name: 'Trollge', file: 'Trollge.png' },
        { name: 'TrollgeGIF', file: 'TrollgeGIF.gif' },
        { name: 'WeSmart', file: 'WeSmart.png' }
      ],
      chat_rules: false,
      emojisPickerVisible: false
    }
  },
  computed: {
    reversedMessages() {
      return [...this.messages].reverse()
    },
    signedIn() {
      authVersion.value
      return isLoggedIn()
    },
    chatSteamLabel() {
      const id = getAuth()?.steamid
      if (!id) return '—'
      const s = String(id)
      return s.length > 6 ? `Steam …${s.slice(-6)}` : `Steam ${s}`
    },
    currentUserAvatar() {
      return getAuth()?.avatarUrl || defaultUserImg
    }
  },

  methods: {
    setEmojiPath(name) {
      return `/public/img/emojis/${name}`
    },
    handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdownContainer
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.chat_rules = false
      }

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
    stopPropagation(event) {
      event.stopPropagation()
    },
    sendMessage() {
      if (!this.signedIn) return
      const messageContent = this.newMessage.trim()
      if (messageContent !== '') {
        const now = new Date()
        const formattedTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`
        const auth = getAuth()

        this.messages.push({
          id: this.messageId,
          content: messageContent,
          time: formattedTime,
          user: {
            name: auth?.personaname || 'Player',
            role: 'user',
            rank: null,
            win_streak: 0,
            dominating: 0,
            target: 0,
            avatar: auth?.avatarUrl || defaultUserImg,
            steamid: auth?.steamid
          }
        })

        this.messageId++
        this.newMessage = ''

        // Scroll to the bottom of the chat area to show the latest message
        this.$refs.chatArea.scrollTop = this.$refs.chatArea.scrollHeight
      }
    },
    isAloneEmoji(message) {
      return /^:[a-zA-Z0-9_]+:$/.test(message.trim())
    },
    formatMessage(message) {
      // First, convert any emoji shortcodes to Unicode
      message = joypixels.shortnameToUnicode(message)

      // Then replace custom emoji codes with image tags
      // assuming you have an 'emojis' array in your data
      return message.replace(/:([a-zA-Z0-9_]+):/g, (match, name) => {
        const emoji = this.emojis.find((e) => e.name.toLowerCase() === name.toLowerCase())
        if (emoji) {
          let emojiTag = `<img src="/public/img/emojis/${emoji.file}" alt="${emoji.name}" class="emoji" style="max-width: 1.6em !important;vertical-align: middle !important;display: inline-block !important;margin: 0 0em !important;height: auto !important;">`

          if (/^:[a-zA-Z0-9_]+:$/.test(message.trim())) {
            emojiTag = `<img src="/public/img/emojis/${emoji.file}" alt="${emoji.name}" class="big-emoji" style="max-width: 2.5em !important;vertical-align: middle !important;display: inline-block !important;margin: 0 0.2em !important;height: auto !important;">`
          }

          return emojiTag
        }
        return match // Return the original text if no emoji is found
      })
    },
    showEmojiPicker() {
      if (!this.signedIn) return
      this.emojisPickerVisible = !this.emojisPickerVisible
    },
    importEmoji(name) {
      if (!this.signedIn) return
      this.newMessage += ` :${name}: `
      this.emojisPickerVisible = false
      this.$refs.inputField.focus()
    },
    openChatRoomsPopup() {
      this.showChatRoomsPopup = true
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
  },
  mounted() {
    document.addEventListener('mousedown', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #a60000;
  border-radius: 4px;
}

.support-cta {
  position: absolute;
  left: -110px;
  bottom: 8px;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.support-chat-popup {
  position: absolute;
  left: -240px;
  bottom: calc(100% + 10px);
  z-index: 30;
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
  transform: translateX(50px);
}
</style>
