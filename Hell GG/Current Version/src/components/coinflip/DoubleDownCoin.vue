<template>
  <div>
    <div
      class="relative glow-after sm:min-w-[550px] min-w-[320px] w-full flex-col transform transition-all border border-[#530000] bg-[#420101] max-h-[95vh] h-full overflow-y-auto"
    >
      <div class="flex justify-end w-full h-[59px] items-center px-4">
        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform z-50 fill-[#d7b7b7]"
          @click="closeModal"
        />
      </div>

      <div class="flex items-center flex-col w-full px-0 sm:py-4 gap-4">
        <div class="flex flex-col gap-5 items-center justify-center px-5 sm:py-3">
          <div class="relative flex items-center justify-center winner-glow">
            <img
              class="absolute sm:top-[-37px] top-[-20px] z-[-10] sm:w-[60px]"
              src="/img/crowns/gold-winner.svg"
              width="30"
              alt="crown"
            />
            <img
              class="rounded-full sm:w-[120px]"
              src="/img/icons/double-down-winner.png"
              width="80"
              alt="avatar"
            />
          </div>
          <h2 class="text-white font-bold sm:text-4xl text-2xl uppercase z-10">
            You've Won!
            <span class="text-[#04AB53] font-bold">$100.00</span>
            <!-- <span class="text-[#04AB53] font-bold">${{ totalPrice.toFixed(2) }}</span> -->
          </h2>
        </div>

        <div class="wrapper-box w-full relative h-[420px] sm:h-[485px] h-full">
          <div
            class="w-full relative h-[420px] sm:h-[485px] h-full overflow-y-auto custom-scrollbar"
          >
            <div
              v-if="filteredItems.length >= 24"
              class="absolute h-10 bottom-0 z-10 w-full opacity-90 bg-[linear-gradient(180deg,transparent_0%,#530101_100%)]"
            ></div>

            <div
              class="grid w-full py-2 justify-center gap-2 px-2"
              style="grid-template-columns: repeat(auto-fill, 125px)"
            >
              <div
                v-for="item in filteredItems"
                :key="item._id"
                class="w-[125px] h-[134px] flex flex-col items-center justify-center px-2 transition-all bg-[#690405]"
                :class="[item.banned ? 'cursor-not-allowed bg-[#2F0101] opacity-60' : '']"
              >
                <div class="relative w-[70px] h-[70px] flex items-center justify-center">
                  <img
                    v-if="item.banned"
                    class="absolute w-full z-10"
                    src="../../assets/icons/ban.png"
                  />
                  <img :src="item.image" class="max-w-[60px]" />
                </div>
                <span
                  class="w-full truncate text-center font-semibold text-[#d7b7b7] text-sm"
                  >{{ item.name }}</span
                >
                <span class="text-white text-base font-semibold"
                  >${{ item.price.toFixed(2) }}</span
                >
              </div>
            </div>
          </div>
          <div
            class="absolute w-full bottom-3 z-50 w-full flex sm:gap-4 gap-1 flex-wrap sm:flex-nowrap items-center justify-between px-4"
          >
            <button
              class="h-10 w-full bg-[#ff3435] text-[16px] font-bold text-white hover:brightness-110"
              @click="closeModal"
            >
              DOUBLE-DOWN
            </button>
            <button
              @click="toggleText"
              :disabled="isLoading"
              :class="[
                'h-10 w-full flex justify-center items-center gap-2 relative overflow-hidden transition-colors',
                isLoading ? 'bg-[#24010180] ' : 'bg-[#04AB53] hover:brightness-110',
                'disabled:opacity-80',
              ]"
            >
              <!-- Loader -->
              <!-- <span v-if="isLoading" class="loader"></span> -->
              <img v-if="isLoading" src="/img/icons/loader.svg" alt="loader" class="loader">

              <!-- Normal content -->
              <template v-else>
                <img src="/img/icons/steam.svg" width="20" />
                <span class="text-[16px] font-bold text-white mt-[2px] uppercase">
                  {{ accepted ? "Accept Skins" : "SEND TRADE OFFER" }}
                </span>
              </template>
            </button>
          </div>
        </div>

        <div class="flex flex-col py-4 items-center px-2 gap-4 w-full">
          <div class="flex items-center gap-2 font-bold text-white text-lg relative">
            PLEASE SELECT A COIN
            <div class="group cursor-pointer">
              <div
                class="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 z-20 w-[280px] bg-[#8F0E0E] p-3 text-xs text-center shadow-xl"
              >
                Select skins to coinflip and accept the trade offer to start.
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center w-full gap-4">
            <img
              @click="selectedCoin = 'heaven'"
              src="/img/coins/heaven.svg"
              class="min-w-24 sm:w-[128px] cursor-pointer transition-all rounded-full"
              :class="{
                'opacity-40': selectedCoin && selectedCoin !== 'heaven',
                'heaven-glow': selectedCoin === 'heaven',
              }"
            />
            <img
              @click="selectedCoin = 'hell'"
              src="/img/coins/hell.svg"
              class="max-w-[] min-w-24 sm:w-[128px] cursor-pointer transition-all rounded-full"
              :class="{
                'opacity-40': selectedCoin && selectedCoin !== 'hell',
                'hell-glow': selectedCoin === 'hell',
              }"
            />
            <img
              @click="selectedCoin = 'random'"
              src="/img/coins/random.svg"
              class="max-w-[] min-w-24 sm:w-[128px] cursor-pointer transition-all rounded-full"
              :class="{
                'opacity-40': selectedCoin && selectedCoin !== 'random',
                'random-glow': selectedCoin === 'random',
              }"
            />
          </div>
        </div>

        <button
          class="h-10 w-full max-w-[50%] px-5 bg-[#04AB53] font-bold text-[16px] text-white mb-4 hover:brightness-110"
          @click="triggerFireworks"
        >
          CONFIRM
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import confetti from "canvas-confetti";

export default {
  components: { XMarkIcon },
  data() {
    return {
      accepted: false,
      isLoading: false,
      searchQuery: "",
      selectedCoin: "",
      selectedItems: [],
      sort: "highest amount first",
      inventory: [
        {
          name: "AK-47",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 900,
          _id: 1,
        },
        {
          name: "AK-47",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 10,
          _id: 1,
        },

        {
          name: "AK-47",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 40,
          _id: 1,
          banned: true,
        },
        {
          name: "AK-47",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 30,
          _id: 1,
        },
        {
          name: "AK-47",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 1,
          _id: 1,
        },
        {
          name: "AK-47s",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 46,
          _id: 1,
        },
        {
          name: "AK-47t",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 90,
          _id: 1,
        },
        {
          name: "AK-47",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 30,
          _id: 1,
        },
        {
          name: "AK-47s",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 46,
          _id: 1,
        },
        {
          name: "AK-47t",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 90,
          _id: 1,
        },
        {
          name: "AK-47",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 30,
          _id: 1,
        },
        {
          name: "AK-47",
          image:
            "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
          price: 130,
          _id: 1,
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    toggleText() {
      if (this.isLoading) return;

      this.isLoading = true;

      setTimeout(() => {
        this.accepted = !this.accepted;
        this.isLoading = false;
      }, 500);
    },
    selectItem(item) {
      const index = this.selectedItems.indexOf(item);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(item);
      }
    },
    isSelected(item) {
      return this.selectedItems.includes(item);
    },
    triggerFireworks() {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 25,
        spread: 360,
        ticks: 500,
        gravity: 0.9,
        scalar: 1.3,
        shapes: ["ribbon", "square"],
        zIndex: 9999,
      };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        const particleCount = Math.floor(50 * (timeLeft / duration));

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    },
  },
  computed: {
    filteredItems() {
      let items = this.inventory.filter((i) =>
        i.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.sort === "highest amount first")
        return items.sort((a, b) => b.price - a.price);
      if (this.sort === "lowest amount first")
        return items.sort((a, b) => a.price - b.price);
      return items;
    },
    totalPrice() {
      return this.selectedItems.reduce((acc, item) => acc + item.price, 0);
    },
  },
};
</script>

<style scoped>
.wrapper-box {
  position: relative;
  padding-bottom: 100px;
}
.wrapper-box::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 180px;
  background: linear-gradient(180deg, rgba(83, 1, 1, 0) 0%, #530101 58.41%);
}
.custom-scrollbar {
  padding-bottom: 80px;
}
.custom-scrollbar::-webkit-scrollbar {
  display: block;
  width: 0px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d10d0d;
  border-radius: 4px;
}

.heaven-glow {
  box-shadow: 0 0 30px #95c9fb;
}
.hell-glow {
  box-shadow: 0 0 30px #db0404;
}
.random-glow {
  box-shadow: 0 0 30px #ff3435;
}

.winner-glow {
  border-radius: 500px;
  z-index: 2;
  filter: drop-shadow(-10px -100px 80px rgba(255, 215, 0, 0.8));
}
@media (max-width: 640px) {
  .winner-glow {
    filter: drop-shadow(-10px -100px 60px rgba(255, 215, 0, 0.8));
  }
}

.glow-after {
  position: relative;
}

.glow-after::before {
  content: "";
  position: absolute;
  top: -80%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;

  background: radial-gradient(circle, #ffd809 0%, #420101 100%);

  filter: blur(180px);
  z-index: 0;
  opacity: 0.3;
  pointer-events: none;
}
.glow-after::after {
  content: "";
  position: absolute;
  top: -80%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;

  background: radial-gradient(circle, #420101 100%, #ffd809 0%);

  filter: blur(60px);
  z-index: 0;
  opacity: 1;
  pointer-events: none;
}

.loader {
  width: 30px;
  height: 30px;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
