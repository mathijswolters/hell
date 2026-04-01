<template>
  <div
    class="fixed top-[6.5rem] sm:top-[10rem] flex flex-col gap-3 z-50 items-center justify-center w-[329px]"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <div
      v-for="feed in domination_feed"
      :key="feed.id"
      class="relative w-fit px-2 h-10 flex items-center bg-[#FF343526] rounded-sm killfeed-item"
      style="backdrop-filter: blur(100px); box-shadow: 0px 4px 4px 0px #00000040"
    >
      <!-- Player Information -->
      <div v-if="feed.type === 'dominating'" class="flex items-center gap-1">
        <Dominating_icon :number="feed.domination_count" />
        <span class="text-[#04AB53] text-base font-bold font-Rubik leading-tight"> YOU </span>
        <span class="text-white text-base font-bold font-Rubik leading-tight whitespace-nowrap">
          are Dominating
        </span>
        <Target_icon :number="feed.target_count" />
        <span class="text-white text-base font-bold font-Rubik leading-tight opacity-50">
          {{ feed.name }}
        </span>
      </div>
      <div v-if="feed.type === 'dominated'" class="flex items-center gap-1">
        <Dominating_icon :number="feed.domination_count" />
        <span class="text-[#FF3435] text-base font-bold font-Rubik leading-tight">
          {{ feed.name }}
        </span>
        <span class="text-white text-base font-bold font-Rubik leading-tight whitespace-nowrap">
          is Dominating you
        </span>
      </div>
      <div v-if="feed.type === 'you_revenged'" class="flex items-center gap-1">
        <Dominating_icon :number="feed.domination_count" />
        <span class="text-[#04AB53] text-base font-bold font-Rubik leading-tight"> YOU </span>
        <span class="text-white text-base font-bold font-Rubik leading-tight whitespace-nowrap">
          have Revenged
        </span>
        <Target_icon :number="feed.target_count" />
        <span class="text-white text-base font-bold font-Rubik leading-tight opacity-50">
          {{ feed.name }}
        </span>
      </div>
      <div v-if="feed.type === 'revenged_you'" class="flex items-center gap-1">
        <Dominating_icon :number="feed.domination_count" />
        <span class="text-[#FF3435] text-base font-bold font-Rubik leading-tight">
          {{ feed.name }}
        </span>
        <span class="text-white text-base font-bold font-Rubik leading-tight whitespace-nowrap">
          have Revenged you
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Target_icon from './icons/Target_icon.vue'
import Dominating_icon from './icons/Dominating_icon.vue'
import { number } from 'echarts'
export default {
  data() {
    return {
      domination_feed: []
    }
  },
  components: {
    Dominating_icon,
    Target_icon
  },
  methods: {
    addDominationFeed(type, data) {
      const id = Date.now()
      this.domination_feed.push({
        id,
        type,
        ...data
      })

      // Remove the oldest feed if we exceed 5 items
      if (this.domination_feed.length > 5) {
        this.domination_feed.shift()
      }

      setTimeout(() => {
        this.removeDomination(id)
      }, 5000)
    },
    removeDomination(id) {
      this.domination_feed = this.domination_feed.filter((feed) => feed.id !== id)
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
