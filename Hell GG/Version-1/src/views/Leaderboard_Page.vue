<template>
  <div class="w-full max-w-[56.5rem] flex items-center flex-col gap-[2rem]">
    <!-- Title Start -->
    <div class="flex flex-col items-center">
      <span class="text-[46px] sm:text-[69px] font-black font-Rubik title"
        >$
        {{
          Number(10000).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 0
          })
        }}</span
      >
      <span class="text-[35px] sm:text-[52.43px] font-Rubik_One text-white leading-9"
        >LEADERBOARD</span
      >
    </div>
    <!-- Title End -->
    <!-- Top 3 Start -->
    <div
      class="lg:flex-row flex-wrap flex relative items-center justify-center gap-[3rem] lg:gap-[1.3rem] mt-[2rem] sm:mt-[5rem] pb-4"
    >
      <div
        v-for="player in filteredItems"
        :key="player.rank"
        class="w-[280px] h-[322px] bg-black p-[1px] flex items-center justify-center rounded-[4px] relative"
        :class="{
          'order-2 lg:order-1 silver': player.rank == 2,
          'order-1 lg:order-2 lg:mt-[-4rem] gold': player.rank == 1,
          'order-3 bronze': player.rank == 3
        }"
      >
        <div
          class="w-full h-full rounded-[4px] bg-[linear-gradient(180deg,#530000_0%,_#2E0101_100%)]"
        >
          <div
            class="inner relative flex flex-col gap-[1rem] w-full h-full rounded-[4px] items-center py-[1.5rem] px-[1rem]"
          >
            <img
              class="absolute bottom-[100%]"
              :src="`/img/crowns/${player.rank == 1 ? 'gold' : player.rank == 2 ? 'silver' : 'bronze'}.png`"
            />
            <div class="flex flex-col items-center gap-[1rem]">
              <img
                v-lazy="player.avatar"
                class="w-[4.5rem] h-[4.5rem] rounded-[2px] object-cover"
              />

              <span class="text-white font-bold font-Rubik text-[16px]">{{ player.name }}</span>
              <div
                class="flex items-center justify-center text-center w-fit min-w-[5rem] px-[12px] bg-[rgb(0,0,0,0.5)] h-[36px] rounded-[4px] backdrop-blur-lg font-extrabold font-Rubik text-white text-[14px]"
              >
                $
                {{
                  Number(player.wagered).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }}
              </div>
            </div>
            <div
              class="flex items-center justify-center h-[88px] bg-[rgb(0,0,0,0.3)] w-full rounded-[4px] p-[1rem] gap-[0.5rem]"
            >
              <div
                class="bg-[radial-gradient(50%_50%_at_50%_50%,_#66391A_0%,rgba(46,11,8,0)_100%)] min-w-[4rem] w-[4rem] h-[4rem]"
              >
                <img :src="player.prize.imageUrl" />
              </div>
              <div class="flex flex-col w-full font-Rubik">
                <span class="font-semibold text-[12px] text-[#FF3435]">PRIZE</span>
                <span class="font-semibold text-[14px] text-[#D7B7B7]">{{
                  player.prize.name
                }}</span>
                <span class="font-extrabold text-[16px] text-white"
                  >$
                  {{
                    Number(player.prize.value).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex -mb-8 lg:mb-0 absolute bottom-0 order-4 gap-2 bg-[#770303B2] rounded-[4px] w-[227px] justify-between items-center h-[34px] font-Rubik text-white text-[16px] px-[0.5rem]"
      >
        <ClockIcon class="stroke-[#FF1B1C] w-[21.7px] stroke-2" />
        <div class="time">
          <span class="font-semibold">{{ days }} D</span>
        </div>
        <div class="time">
          <span class="font-semibold">{{ hours }} H</span>
        </div>
        <div class="time">
          <span class="font-semibold">{{ minutes }} M</span>
        </div>
        <div class="time">
          <span class="font-semibold">{{ seconds }} S</span>
        </div>
      </div>
    </div>
    <!-- Top 3 End -->
    <!-- 4 - 10 Start -->
    <div class="flex flex-col mt-4 lg:mt-0 gap-y-[0.5rem] w-full">
      <div
        class="bg-[linear-gradient(90deg,rgba(255,52,53,0.8)_0%,rgba(255,52,53,0)_100%)] w-full md:h-[48px] flex items-center justify-center p-[1px] rounded"
        v-for="(player, index) in displayedItems"
        :key="index"
      >
        <div
          class="grid grid-cols-6 md:grid-cols-10 w-full h-full rounded items-center md:pl-0 px-[0.5rem] relative py-3 md:py-0 gap-[0.5rem]"
          :class="{
            'relative bg-[#240101]': player._id == user._id,
            'bg-[linear-gradient(0deg,rgba(92,0,0,1),rgba(92,0,0,1)),radial-gradient(32.08%_534.72%_at_0%_0%,rgba(255,52,53,1)_0%,rgba(255,52,53,0)_100%)]':
              player._id !== user._id
          }"
        >
          <span
            class="flex items-center justify-center md:w-[64px] h-[32px] rounded order-2 md:absolute right-[100%] mr-1.5 bg-[#700809] border-[1px] border-[#bb1e1f] text-white font-Rubik font-bold tex-sm"
            v-if="player._id === user._id"
            >You</span
          >
          <div class="hidden md:flex justify-center font-bold font-Rubik text-[#d7b7b7] text-sm">
            #{{ player.rank }}
          </div>
          <div class="col-span-3 flex items-center gap-[0.5rem]">
            <div class="md:hidden flex justify-center font-bold font-Rubik text-[#d7b7b7] text-sm">
              #{{ player.rank }}
            </div>

            <img v-lazy="player.avatar" class="w-[2rem] h-[2rem] rounded-[2px] object-cover" />
            <span class="text-white font-Rubik font-bold text-sm">{{ player.name }}</span>
          </div>
          <div
            class="col-span-3 flex justify-end md:justify-center font-bold font-Rubik text-white text-sm"
          >
            $
            {{
              Number(player.wagered).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}
          </div>
          <div
            class="col-span-6 md:col-span-3 flex justify-center md:justify-end items-center gap-[0.5rem]"
          >
            <span class="text-[#D7B7B7] font-Rubik font-semibold text-sm">PRIZE</span>
            <div
              class="h-[36px] rounded bg-[#2e0101] w-[136px] flex tiems-center px-[0.3rem] pr-[0.5rem] gap-[0.5rem]"
            >
              <img :src="player.prize.imageUrl" class="w-full max-w-[34.52px]" />
              <div class="flex flex-col w-full max-w-[4.7rem] justify-center">
                <span class="text-[#ff3435] text-[10px] font-semibold font-Rubik w-full truncate">{{
                  player.prize.name
                }}</span>
                <span class="font-semibold font-Rubik text-white text-[10px] text-nowrap">
                  $
                  {{
                    Number(player.wagered).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 0
                    })
                  }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- user not in top 10 -->
      <div
        class="bg-[linear-gradient(90deg,rgba(255,52,53,0.8)_0%,rgba(255,52,53,0)_100%)] w-full md:h-[48px] flex items-center justify-center p-[1px] rounded"
        v-if="user.rank > 10"
      >
        <div
          class="grid grid-cols-6 md:grid-cols-10 w-full h-full rounded items-center md:pl-0 px-[0.5rem] py-3 md:py-0 gap-[0.5rem] relative bg-[#240101]"
        >
          <span
            class="flex items-center justify-center md:w-[64px] h-[32px] rounded order-2 md:absolute right-[100%] mr-1.5 bg-[#700809] border-[1px] border-[#bb1e1f] text-white font-Rubik font-bold tex-sm"
            >You</span
          >
          <div class="hidden md:flex justify-center font-bold font-Rubik text-[#d7b7b7] text-sm">
            #{{ user.rank }}
          </div>
          <div class="col-span-3 flex items-center gap-[0.5rem]">
            <div class="md:hidden flex justify-center font-bold font-Rubik text-[#d7b7b7] text-sm">
              #{{ user.rank }}
            </div>

            <img v-lazy="user.avatar" class="w-[2rem] h-[2rem] rounded-[2px] object-cover" />
            <span class="text-white font-Rubik font-bold text-sm">{{ user.name }}</span>
          </div>
          <div
            class="col-span-3 flex justify-end md:justify-center font-bold font-Rubik text-white text-sm"
          >
            $
            {{
              Number(user.wagered).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}
          </div>
        </div>
      </div>
    </div>
    <!-- 4 - 10 End -->
  </div>
</template>

<script>
import { ClockIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    ClockIcon
  },
  data() {
    return {
      user: {
        _id: 11,
        name: 'tester',
        wagered: 7955236,
        prize: {
          imageUrl:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          value: 1234,
          name: 'Ak 47'
        },
        rank: 40,
        avatar:
          'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
      },
      players: [
        {
          _id: 1,
          rank: 1,
          name: 'ROCKEY',
          wagered: 71552,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47'
          },
          avatar:
            'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjD8p4whbfjkqOUXl6Ttq7fVFE1nkYvJyiri7_My8Ii9KFvZlcywxkuTbxhBRAxuRKH9oa2Qg9o-E__i12FJx-E2nfVvl1fLyXuLyndi7OmoD_XaTtq3lcYfnn0yKgsNa4pfYpaUYa9fnPK/w5120-h2880-c/doom-eternal-doomguy-uhdpaper.com-8K-26.jpg'
        },
        {
          _id: 2,
          rank: 2,
          name: 'NIGFKAL',
          wagered: 79552,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47'
          },
          avatar:
            'https://preview.redd.it/hcrurzwkxvf51.jpg?auto=webp&s=535cfe4446829f7cc2ca6304b0d62ff01b3d5b40'
        },
        {
          _id: 3,
          rank: 3,
          name: 'ROCKEY',
          wagered: 71552,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47 red alien'
          },
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
        },
        {
          _id: 4,
          name: 'NIGFKAL',
          wagered: 7955236,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47 Red Alien'
          },
          rank: 4,
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
        },
        {
          _id: 5,
          name: 'NIGFKAL',
          wagered: 7955236,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47'
          },
          rank: 5,
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
        },
        {
          _id: 6,
          name: 'tester',
          wagered: 7955236,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47'
          },
          rank: 6,
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
        },
        {
          _id: 7,
          name: 'NIGFKAL',
          wagered: 7955236,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47'
          },
          rank: 7,
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
        },
        {
          _id: 8,
          name: 'NIGFKAL',
          wagered: 7955236,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47'
          },
          rank: 8,
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
        },
        {
          _id: 9,
          name: 'NIGFKAL',
          wagered: 7955236,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47'
          },
          rank: 9,
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
        },
        {
          _id: 10,
          name: 'NIGFKAL',
          wagered: 7955236,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47'
          },
          rank: 10,
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
        },
        {
          _id: 11,
          name: 'NIGFKAL',
          wagered: 7955236,
          prize: {
            imageUrl:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            value: 1234,
            name: 'Ak 47'
          },
          rank: 11,
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/36/884/2/doom-slayer-doom-eternal-smoke-shotgun-hd-wallpaper-preview.jpg'
        }
      ],
      days: 13,
      hours: 24,
      minutes: 0,
      seconds: 0,
      isYou: true
    }
  },
  mounted() {
    this.startCountdown()
  },
  methods: {
    startCountdown() {
      const countdownInterval = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--
        } else {
          if (this.minutes > 0) {
            this.seconds = 59
            this.minutes--
          } else {
            if (this.hours > 0) {
              this.seconds = 59
              this.minutes = 59
              this.hours--
            } else {
              if (this.days > 0) {
                this.seconds = 59
                this.minutes = 59
                this.hours = 23
                this.days--
              } else {
                clearInterval(countdownInterval)
                // Countdown finished
              }
            }
          }
        }
      }, 1000)
    }
  },
  computed: {
    filteredItems() {
      // Filter the items based on the "place" property
      return this.players.filter((item) => [1, 2, 3].includes(item.rank))
    },
    totalPages() {
      return Math.ceil(this.players.length / 7)
    },
    displayedItems() {
      const filteredItems = this.players.filter((item) => item.rank >= 4 && item.rank <= 10)
      const sortedItems = filteredItems.slice().sort((a, b) => a.rank - b.rank)
      return sortedItems
    },
    splitPrizeAmount() {
      return this.players.map((player) => {
        const [integerPart, decimalPart] = Number(player.prize).toFixed(2).split('.')
        return {
          ...player,
          integerPart,
          decimalPart
        }
      })
    }
  }
}
</script>
<style scoped>
.title {
  background: #ff9393;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 4px 0px #ff1b1c;
}

.gold {
  background: linear-gradient(0deg, rgba(83, 0, 0, 1) 0%, rgba(255, 207, 95, 0.7) 100%);
}
.gold .inner {
  background: radial-gradient(
    76.92% 62.5% at 50% 0%,
    rgba(254, 202, 128, 0.2) 0%,
    rgba(255, 207, 95, 0) 100%
  );
}
.silver {
  background: linear-gradient(0deg, rgba(83, 0, 0, 1) 0%, rgba(244, 244, 244, 0.7) 100%);
}
.silver .inner {
  background: radial-gradient(
    76.92% 62.5% at 50% 0%,
    rgba(244, 244, 244, 0.2) 0%,
    rgba(244, 244, 244, 0) 100%
  );
}
.bronze {
  background: linear-gradient(0deg, rgba(83, 0, 0, 1) 0%, rgba(229, 167, 131, 0.7) 100%);
}
.bronze .inner {
  background: radial-gradient(
    76.92% 62.5% at 50% 0%,
    rgba(255, 207, 95, 0.2) 0%,
    rgba(255, 207, 95, 0) 100%
  );
}
</style>
