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
            class="flex w-full px-2 items-center justify-between"
            :class="{
              'bg-[#620101] h-[50px] gap-1 ': message.game == 'coinflip',
              'bg-[#6E3005] pt-2 py-5 ': message.game == 'jackpot'
            }"
          >
            <div
              class="flex items-center"
              :class="{
                'gap-1 ': message.game == 'coinflip',
                'gap-0 ': message.game == 'jackpot'
              }"
            >
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
              <span
                class="flex relative items-center ml-2 font-Rubik text-white font-bold text-sm gap-1"
              >
                <img
                  v-if="message.user.rank"
                  :src="`/img/ranks/${message.user.rank}.png`"
                  class="max-h-[20px]"
                />
                {{ message.user.name }}
                <div
                  v-if="message.game == 'jackpot'"
                  class="absolute w-full whitespace-nowrap top-full mt-0.5 text-white/65 font-Rubik font-bold text-xs"
                >
                  {{ message.chance }}% Chance
                </div>
                <span
                  class="flex items-center font-Rubik font-bold text-sm gap-1 whitespace-nowrap"
                  :class="{
                    'text-[#04AB53]': message.game == 'coinflip',
                    'text-[#FEBD11]': message.game == 'jackpot'
                  }"
                >
                  WON
                  {{
                    Number(message.ammount).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0
                    })
                  }}
                </span>
              </span>
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
</style>
