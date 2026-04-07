<template>
  <div
    class="fixed bottom-4 flex flex-col gap-3 z-50 transition-all duration-500"
    :class="{
      'left-4 md:left-[20rem]': chat_opened.opened && chat_position.position == 'left',
      'left-4': !chat_opened.opened || chat_position.position !== 'left',
    }"
  >
    <div
      v-for="feed in chatNotification"
      :key="feed.id"
      class="w-[320px] text-white relative chatNotification-item"
    >
      <!-- ================= UNBOX ================= -->
      <template v-if="feed.type === 'unbox'">
        <!-- TOP -->
        <div class="w-full bg-[#810E0E] flex justify-center items-center gap-2 p-1">
          <span class="font-[700] text-[14px] uppercase">BIG WIN FROM</span>
          <img :src="feed.case_image" width="30" />
          <span class="font-[700] text-[14px] uppercase">{{ feed.case_name }}</span>
        </div>

        <!-- BODY -->
        <div class="w-full bg-[#620101] flex justify-between items-center gap-5 p-[10px]">
          <div class="flex items-center gap-1">
            <img :src="feed.avatar" class="rounded" width="32" />
            <img :src="feed.item_icon" width="20" />
            <span class="font-[700] text-[14px] uppercase">{{ feed.name }}</span>
            <span class="font-[500] text-[14px]">unboxed</span>
          </div>

          <div class="relative w-max">
            <div
              class="absolute top-[-15px] right-0 text-[#FEBD11] text-[10px] font-[700]"
            >
              {{ feed.chance }}%
            </div>
            <img :src="feed.item_image" width="50" />
            <div class="absolute bottom-[-10px] left-[-25px]">
              <span class="flex gap-1 text-[14px] font-[700]">
                <span class="text-[#04AB53] font-[700]">$</span>{{ feed.price }}
              </span>
            </div>
          </div>
        </div>
      </template>

      <!-- ================= JACKPOT ================= -->
      <template v-else-if="feed.type === 'jackpot'">
        <div class="w-full bg-[#A46409] flex justify-center items-center gap-2 p-1">
          <span class="font-[700] text-[14px] uppercase">BIG WIN ON</span>
          <img src="/img/icons/jackpot.svg" width="14" />
          <span class="font-[700] text-[14px] uppercase">JACKPOT</span>
        </div>

        <div class="w-full bg-[#6E3005] flex justify-between items-center gap-3 p-[10px]">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-1">
              <img :src="feed.avatar" class="rounded" width="32" />
              <img :src="feed.item_icon" width="20" />
              <span class="font-[700] text-[14px] uppercase">{{ feed.name }}</span>
            </div>

            <h4 class="text-[14px]">
              won
              <span class="text-[#FEBD11] font-[700]">${{ feed.amount }}</span>
              with
              <span class="opacity-50">{{ feed.chance }}%</span>
              chance
            </h4>
          </div>

          <button class="p-[6px_10px] bg-[#A46409] rounded text-[700]">VIEW</button>
        </div>
      </template>

      <!-- ================= COINFLIP ================= -->
      <template v-else-if="feed.type === 'coinflip'">
        <div class="w-full bg-[#810E0E] flex justify-center items-center gap-2 p-1">
          <span class="font-[700] text-[14px] uppercase">BIG WIN ON</span>
          <img src="/img/icons/coinflip.svg" width="14" />
          <span class="font-[700] text-[14px] uppercase">COINFLIP</span>
        </div>

        <div class="w-full bg-[#620101] flex justify-between items-center gap-3 p-[10px]">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-1">
              <img :src="feed.avatar" class="rounded" width="32" />
              <img :src="feed.item_icon" width="20" />
              <span class="font-[700] text-[14px] uppercase">{{ feed.name }}</span>
            </div>

            <h4 class="flex items-center gap-1 text-[14px]">
              won
              <span class="text-[#04AB53] font-[700]">${{ feed.amount }}</span>
              from
              <img :src="`/img/coins/${feed.coin}.svg`" width="14" />
              coinflip
            </h4>
          </div>

          <button class="p-[6px_10px] bg-[#FF3435] rounded font-[700]">VIEW</button>
        </div>
      </template>

      <!-- ================= DOUBLE DOWN ================= -->
      <template v-else-if="feed.type === 'double-down-coinflip'">
        <div class="w-full bg-[#810E0E] flex justify-center items-center gap-2 p-1">
          <span class="font-[700] text-[14px] uppercase">BIG WIN ON</span>
          <img src="/img/icons/coinflip.svg" width="14" />
          <span class="font-[700] text-[14px] uppercase">COINFLIP</span>
        </div>

        <div
          class="w-full bg-[#620101] flex justify-between items-center p-[10px] relative"
        >
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-1">
              <img :src="feed.avatar" class="rounded" width="32" />
              <img :src="feed.item_icon" width="20" />
              <span class="font-[700] text-[14px] uppercase">{{ feed.name }}</span>
            </div>

            <h4 class="flex items-center gap-1 text-[14px]">
              won
              <span class="text-[#04AB53] font-[700]">${{ feed.amount }}</span>
              from
              <img :src="`/img/coins/${feed.coin}.svg`" width="14" />
              coinflip
            </h4>
          </div>

          <div class="absolute top-[10px] right-[10px] flex flex-col items-end gap-1">
            <span class="text-[14px]">
              <span class="opacity-50">Double Downs </span>
              <span class="text-[#FEBD11]"> {{ feed.multiplier }}x</span>
            </span>
            <button class="p-[6px_10px] bg-[#FF3435] rounded font-[700]">VIEW</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { chat_opened, chat_position } from "@/chatStore";
export default {
  setup() {
    return {
      chat_opened,
      chat_position,
    };
  },
  components: {},
  data() {
    return {
      chatNotification: [],
    };
  },
  methods: {
    addchatNotification(type, data) {
      const id = Date.now();
      this.chatNotification.push({
        id,
        type,
        ...data,
      });

      // Remove the oldest feed if we exceed 5 items
      if (this.chatNotification.length > 5) {
        this.chatNotification.shift();
      }

      setTimeout(() => {
        this.removeChat(id);
      }, 5000);
    },
    removeChat(id) {
      this.chatNotification = this.chatNotification.filter((feed) => feed.id !== id);
    },
  },
};
</script>

<style>
/* Add slide-in animation for Chat feed */
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

.chatNotification-item {
  animation: slide-in 0.3s ease-in-out;
}
</style>
