<template>
  <div
    class="fixed bottom-4 flex flex-col gap-3 z-50 transition-all duration-500"
    :class="{
      'left-4 md:left-[20rem]': chat_opened.opened && chat_position.position == 'left',
      'left-4': !chat_opened.opened || chat_position.position !== 'left'
    }"
  >
    <div
      v-for="(feed, index) in killFeed"
      :key="feed.id"
      class="relative w-fit px-2 h-16 flex items-center bg-[#6e3005] rounded-sm border-[0.25px] border-l-[3px] killfeed-item border-l-[#04ab53]"
      :class="
        feed.type === 'coinflip' ? 'border-[#ff3435] bg-[rgba(98,1,1,1)]' : 'border-[#FEBD11]'
      "
    >
      <!-- Player Information -->
      <div v-if="feed.type === 'jackpot'" class="flex items-center">
        <img v-lazy="feed.avatar" class="w-8 h-8 rounded-sm object-cover" />
        <span class="text-white text-sm font-bold font-['Rubik'] leading-tight ml-1">
          {{ feed.name }}
        </span>
        <span class="text-[#febd11] text-sm font-bold font-['Rubik'] ml-2 leading-tight">
          | {{ feed.message }}
        </span>
      </div>
      <div v-if="feed.type === 'coinflip'" class="flex items-center gap-1">
        <div
          class="flex items-center gap-4"
          :class="{
            'opacity-40': !feed.player.win
          }"
        >
          <div class="relative flex items-center transition-opacity duration-200">
            <img
              :src="`/img/coins/${feed.player.coin}.png`"
              class="w-[1.5rem] z-10 absolute border-[2px] border-[#740c0a] rounded-full -right-3"
            />
            <UserImage :user="feed.player" />
          </div>
          <span class="text-white text-sm font-bold font-['Rubik']">
            {{ feed.player.name }}
          </span>
        </div>
        <span class="text-[#d7b7b7] text-sm font-bold font-['Rubik'] mx-1"> VS </span>
        <div
          class="flex items-center gap-4"
          :class="{
            'opacity-40': !feed.opponent.win
          }"
        >
          <span class="text-white text-sm font-bold font-['Rubik']">
            {{ feed.opponent.name }}
          </span>
          <div class="relative flex items-center transition-opacity duration-200">
            <img
              :src="`/img/coins/${feed.opponent.coin}.png`"
              class="w-[1.5rem] z-10 absolute border-[2px] border-[#740c0a] rounded-full -left-3"
            />
            <UserImage :user="feed.opponent" />
          </div>
        </div>
      </div>

      <!-- Killfeed Details -->
      <div
        class="absolute right-2 text-[#febd11] text-sm font-bold font-['Rubik'] leading-tight"
        v-if="feed.type === 'jackpot'"
      >
        {{ feed.details }}
      </div>
    </div>
  </div>
</template>

<script>
import Dominating_icon from './icons/Dominating_icon.vue'
import Target_icon from './icons/Target_icon.vue'
import { chat_opened, chat_position } from '@/chatStore'
import UserImage from './UserImage.vue'
export default {
  setup() {
    return {
      chat_opened,
      chat_position
    }
  },
  components: {
    Target_icon,
    Dominating_icon,
    UserImage
  },
  data() {
    return {
      killFeed: []
    }
  },
  methods: {
    addKillFeed(type, data) {
      const id = Date.now()
      this.killFeed.push({
        id,
        type,
        ...data
      })

      // Remove the oldest feed if we exceed 5 items
      if (this.killFeed.length > 5) {
        this.killFeed.shift()
      }

      setTimeout(() => {
        this.removeKill(id)
      }, 5000)
    },
    removeKill(id) {
      this.killFeed = this.killFeed.filter((feed) => feed.id !== id)
    }
  }
}
</script>

<style>
/* Add slide-in animation for kill feed */
@keyframes slide-in {
  from {
    transform: translateX(-10px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.killfeed-item {
  animation: slide-in 0.3s ease-in-out;
}
</style>
