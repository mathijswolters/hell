<template>
  <div class="flex flex-col xl:flex-row items-start gap-5 px-3 ">
    <!-- history -->
    <div
      class="flex flex-col md:flex-row xl:flex-col gap-4 max-w-full w-full xl:max-w-[360px] order-last lg:order-first"
    >
      <!-- bigest 24h winner -->
      <div
        class="w-full xl:w-[360px] h-fit py-2 md:py-4 xl:h-[266px] bg-gradient-to-b from-[#2e0101] to-[#530101] rounded flex md:flex-col gap-4 items-center md:justify-center relative px-4"
      >
        <div class="flex flex-col gap-y-4 items-center order-2 md:order-1">
          <div>
            <span
              class="text-white text-lg md:text-sm sm:text-xl font-bold font-['Rubik'] uppercase leading-normal"
              >BIGGEST </span
            ><span
              class="text-[#ff3435] text-lg md:text-sm sm:text-xl font-bold font-['Rubik'] uppercase leading-normal"
              >24</span
            ><span
              class="text-white text-lg md:text-sm sm:text-xl font-bold font-['Rubik'] uppercase leading-normal"
            >
              HOUR WIN</span
            >
          </div>
          <div
            class="text-white text-2xl md:text-[35px] font-bold font-['Rubik'] uppercase leading-[18px] relative"
          >
            ${{
              Number(biggest_win.winnings).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}
            <div
              class="text-[#ff3435] text-base font-medium font-['Rubik'] uppercase leading-normal absolute top-full sm:mt-2 right-0"
            >
              36%
            </div>
            <img
              src="../../assets/icons/cup.svg"
              class="absolute right-full top-0 mr-2 sm:w-[39.21px] sm:h-[39.21px] -mt-2 rotate-[-15deg]"
            />
            <img
              src="../../assets/icons/cup.svg"
              class="absolute left-full top-0 -mt-2 ml-2 sm:w-[39.21px] sm:h-[39.21px] rotate-[15deg]"
            />
          </div>
        </div>

        <div class="flex flex-col items-center mt-6 gap-1 md:order-2 order-1">
          <div
            class="w-[82px] h-[82px] rounded-[4px] bg-no-repeat bg-center bg-cover"
            :style="{
              backgroundImage: `url(${biggest_win.avatar})`
            }"
          ></div>
          <div class="text-white text-xl font-bold font-['Rubik'] uppercase leading-normal">
            {{ biggest_win.name }}
          </div>
        </div>
      </div>
      <!-- jackpot history -->
      <div class="flex flex-col w-full bg-[#4b0505] h-full">
        <div
          class="w-full flex items-center justify-center text-center h-12 bg-[#620101] rounded-tl rounded-tr"
        >
          <div class="text-center text-white text-base font-bold font-['Rubik'] leading-normal">
            JACKPOT HISTORY
          </div>
        </div>
        <div class="flex flex-col gap-y-2 p-4 h-[200px] xl:h-auto overflow-y-auto">
          <div
            class="h-[99px] bg-[#5e0303] flex flex-col p-2.5 gap-y-2.5"
            v-for="(item, index) in history"
            :key="index"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-10 h-10 rounded-[4px] bg-no-repeat bg-center bg-cover"
                :style="{
                  backgroundImage: `url(${item.avatar})`
                }"
              ></div>
              <div class="flex flex-col gap-y-[2px]">
                <div class="text-white text-sm font-extrabold font-['Rubik'] leading-tight">
                  {{ item.name }}
                </div>
                <div>
                  <span
                    class="text-[#d7b7b7] text-xs font-semibold font-['Rubik'] uppercase leading-[18px]"
                    >WON </span
                  ><span
                    class="text-[#ff3435] text-xs font-bold font-['Rubik'] uppercase leading-[18px]"
                    >${{
                      Number(item.winnings).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                      })
                    }}</span
                  ><span
                    class="text-[#d7b7b7] text-xs font-semibold font-['Rubik'] uppercase leading-[18px]"
                  >
                    with a </span
                  ><span
                    class="text-[#ff3435] text-xs font-bold font-['Rubik'] uppercase leading-[18px]"
                    >{{
                      Number(item.chance).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                      })
                    }}%</span
                  ><span
                    class="text-[#d7b7b7] text-xs font-semibold font-['Rubik'] uppercase leading-[18px]"
                  >
                    Chance</span
                  >
                </div>
              </div>
            </div>
            <hr class="w-full min-w-full h-px opacity-20 bg-[#ff3435] border-transparent" />
            <div class="flex justify-between items-center">
              <div>
                <span
                  class="text-[#d7b7b7] text-xs font-medium font-['Rubik'] uppercase leading-[18px]"
                  >Ticket: </span
                ><span
                  class="text-white text-xs font-medium font-['Rubik'] uppercase leading-[18px]"
                  >{{ item.ticket }}</span
                >
              </div>

              <button
                class="text-right text-[#d7b7b7] text-xs font-semibold font-['Rubik'] uppercase leading-[18px]"
              >
                view
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- game section -->
    <div
      class="flex items-center justify-center w-full flex-col gap-y-3 max-w-[900px]  2xl:max-w-[850px] 3xl:max-w-[1093px] overflow-x-hidden"
    >
      <!-- TIMER AND POT -->

      <div
        class="flex items-center w-full max-w-[907px] justify-center relative h-[120px] lg:h-[250px]"
      >
        <div
          class="flex items-center w-full justify-between lg:gap-x-52 px-4 relative bg-[rgba(66,1,1,1)] h-fit lg:h-[103px]"
        >
          <!-- LEFT -->
          <div class="flex justify-center py-1 lg:py-0 w-full flex-col gap-y-1 h-full">
            <div class="flex flex-col sm:text-center lg:min-w-[18rem]">
              <span class="font-Rubik text-white text-[18px] lg:text-[40px] font-bold"
                >${{
                  Number(pot_value).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }}</span
              >
              <span
                class="font-Rubik text-[rgba(215,183,183,1)] text-sm lg:text-base font-semibold -mt-1 lg:-mt-3"
                >POT VALUE</span
              >
            </div>
          </div>

          <!-- RIGHT -->
          <div class="flex justify-center py-1 lg:py-0 flex-col w-full gap-y-1 h-full">
            <div class="flex flex-col text-end sm:text-center lg:min-w-[18rem]">
              <span class="font-Rubik text-white text-[18px] lg:text-[40px] font-bold"
                >{{ num_of_items }}/200</span
              >
              <span
                class="font-Rubik text-[rgba(215,183,183,1)] text-sm lg:text-base font-semibold -mt-1 lg:-mt-3"
                >ITEMS IN POT
              </span>
            </div>
          </div>
        </div>
        <!-- CENTER CIRCLE -->
        <div
          class="absolute p-0 bg-[rgba(66,1,1,1)] w-[114.5px] h-[114.5px] lg:h-[242.5px] lg:w-[242.5px] rounded-full flex items-center justify-center"
        >
          <CircleProgressBar
            :value="secondsLeft"
            :max="10"
            :size="screenWidth > 1024 ? 254.5 : 120"
            :colorUnfilled="'rgba(4,171,83,1)'"
            :colorBack="'rgba(4,171,83,0.2)'"
            :startAngle="0"
            strokeWidth="15"
            class="-ml-0.5 lg:-ml-[4.8545px] mt-[-1.04px] lg:-mt-[0.32rem]"
            ><span class="font-bold font-Rubik text-white text-[28px] lg:text-[60px]">{{
              secondsLeft
            }}</span></CircleProgressBar
          >
        </div>
      </div>
      <span
        class="flex flex-col items-center w-full left-0 right-0 whitespace-nowrap top-[calc(100%+1rem)]"
      >
        <span class="font-Rubik font-medium text-sm text-[#FF4444]">Ticket: 42.4241040214012</span>
        <span class="font-Rubik font-medium text-sm text-[#d7b7b7]"
          >Hash: 620b2295fd8aef1313fa3f</span
        >
        <span class="font-Rubik font-medium text-sm text-[#d7b7b7]"
          >Secret: 620b2295fd8aef1313fa3f</span
        >
        <span class="font-Rubik font-semimediumbold text-sm text-[#d7b7b7]">EOS: #42510</span>
      </span>

      <div
        class="w-full transition-all duration-700 max-w-[95vw] sm:max-w-[97vw] xl:max-w-full overflow-hidden lg:max-w-full"
        :class="{ 'h-[133px] opacity-100': secondsLeft == 0, 'h-0 opacity-0': secondsLeft > 0 }"
      >
        <Spinner ref="spinner" :pot_value="pot_value" :case-content="game.players" />
      </div>

      <!-- PLAYERS AND CONTROLS -->
      <div
        class="w-full flex flex-col gap-y-3 pb-3 bg-[linear-gradient(180deg,rgba(83,0,0,0.8)0%,rgba(46,1,1,0.8)100%)] border border-solid border-[rgba(83,0,0,1)] backdrop-blur-[200px]"
      >
        <!-- controls -->
        <div
          class="min-h-[59px] flex w-full items-center justify-center sm:justify-between gap-2 px-4 py-4 sm:py-0 bg-[rgba(98,1,1,1)] flex-wrap"
        >
          <!-- Left Start -->
          <div
            class="font-Rubik font-bold text-base text-white whitespace-nowrap"
            @click="
              openModal('jackpot results', {
                jackpot: game,
                winner: game.players[0],
                pot_value: pot_value
              })
            "
          >
            CURRENT ENTIRES 4
          </div>
          <!-- Left End -->
          <div class="flex items-center flex-wrap gap-2">
            <!-- Right Start -->
            <div class="flex items-center justify-center sm:justify-normal gap-2">
              <button class="select-none sr-only" @click="openModal('coinflip settings')">
                <Cog8ToothIcon class="w-7 fill-white" />
              </button>

              <button
                class="flex items-center px-6 h-10 bg-[#ff3435] border-[#530000] border border-solid font-extrabold font-Rubik text-white text-base whitespace-nowrap tracking-wide"
                @click="openModal('sitewide history')"
              >
                HISTORY
              </button>
              <button
                class="flex items-center px-6 h-10 bg-[#04AB53] font-extrabold font-Rubik text-white text-base whitespace-nowrap tracking-wide"
                @click="openModal('jackpot deposit')"
              >
                DEPOSIT
              </button>
            </div>
            <!-- Right End -->
          </div>
        </div>

        <!-- players -->
        <div class="flex flex-col gap-y-3 px-4">
          <Row
            v-for="item in game.players.slice().reverse()"
            :key="item._id"
            :user="item"
            :pot_value="pot_value"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'vue3-circle-progress/dist/circle-progress.css'
import { CircleProgressBar } from 'circle-progress.vue'
import { openModal } from '@/modalStore'
import { Cog8ToothIcon } from '@heroicons/vue/24/solid'
import Row from '../../components/jackpot/JackpotRow.vue'
import Spinner from '../../components/jackpot/spinner/Jackpot_Spinner.vue'
export default {
  name: 'Jackpot_Lobby',

  components: {
    CircleProgressBar,
    Cog8ToothIcon,
    Row,
    Spinner
  },
  data() {
    return {
      secondsLeft: 1,
      game: {
        _id: 1,
        players: [
          {
            _id: 1,
            name: 'ILOVEBREAD',
            avatar:
              'https://c4.wallpaperflare.com/wallpaper/424/826/436/dragon-ball-dragon-ball-super-piccolo-dragon-ball-wallpaper-preview.jpg',
            value: 93,
            chance: 80,
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 1,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 2
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 20,
                id: 3
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 56,
                id: 4
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 900,
                id: 5
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 1,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 2
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 20,
                id: 3
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 56,
                id: 4
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 900,
                id: 5
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 1,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 2
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 20,
                id: 3
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 56,
                id: 4
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 900,
                id: 5
              }
            ],
            percentage_ticket_range: {
              lowest: 0,
              highest: 80
            },

            ticketRange: {
              min: 0,
              max: 20
            }
          },
          {
            _id: 2,
            name: 'ILOVEBREAD2',
            avatar:
              'data:image/jpeg;base64,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',
            value: 0,
            chance: 20,
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 1,
                id: 1
              }
            ],
            percentage_ticket_range: {
              lowest: 80,
              highest: 100
            },
            ticketRange: {
              min: 80,
              max: 100
            }
          }
        ]
      },
      biggest_win: {
        name: 'ILOVEBREAD',
        _id: 1,
        winnings: 2450,
        chance: 42,
        avatar: 'https://i1.sndcdn.com/artworks-BWuXyLXwYA0VEFLl-S9BFmw-t1080x1080.jpg'
      },
      history: [
        {
          name: 'Goku',
          _id: 2,
          winnings: 2450,
          chance: 42,
          avatar:
            'https://pixelz.cc/wp-content/uploads/edd/2024/01/dragon-ball-super-blue-goku.jpg',
          ticket: 15.252
        },
        {
          name: 'Piccolo',
          _id: 1,
          winnings: 2450,
          chance: 12,
          avatar:
            'https://c4.wallpaperflare.com/wallpaper/424/826/436/dragon-ball-dragon-ball-super-piccolo-dragon-ball-wallpaper-preview.jpg',
          ticket: 15.252
        },
        {
          name: 'ILOVEBREAD',
          _id: 1,
          winnings: 24250,
          chance: 21,
          avatar: 'https://i1.sndcdn.com/artworks-BWuXyLXwYA0VEFLl-S9BFmw-t1080x1080.jpg',
          ticket: 15.252
        }
      ],
      screenWidth: window.innerWidth,

      opening: false
    }
  },
  created() {},
  computed: {
    pot_value() {
      let items_val = 0
      this.game.players.forEach((user) => {
        user.items.forEach((item) => {
          items_val += item.price
        })
      })
      return items_val
    },
    num_of_items() {
      let num = 0
      this.game.players.forEach((user) => {
        num += user.items.length
      })
      return num
    }
  },
  methods: {
    updateScreenWidth() {
      this.screenWidth = window.innerWidth
    },
    demoOpen() {
      this.isOpening = true

      this.$refs.spinner.demoSpin(this.game.players[0])
    },
    openModal(name, props) {
      openModal(name, props)
    },

    restartCountdown(startingTime) {
      this.stopCountdown()
      this.secondsLeft = startingTime
      this.startCountdown()
    },
    stopCountdown() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    startCountdown() {
      if (this.intervalId) return

      this.intervalId = setInterval(() => {
        if (this.secondsLeft > 0) {
          this.secondsLeft--
        } else {
          this.stopCountdown()
          this.demoOpen()
        }
      }, 1000)
    }
  },
  mounted() {
    this.startCountdown()
    window.addEventListener('resize', this.updateScreenWidth)
  },
  beforeUnmount() {
    this.stopCountdown()
    window.removeEventListener('resize', this.updateScreenWidth)
  },
  watch: {}
}
</script>
<style scoped>
::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
  height: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #870000;
  border-radius: 4px;
}
</style>
