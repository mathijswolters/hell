<template>
  <div class="flex gap-x-2 w-full h-full affiliates">
    <!-- right -->
    <div class="h-full w-full flex flex-col gap-y-2">
      <div class="flex w-full items-center justify-between flex-wrap">
        <div class="flex items-center gap-x-2">
          <span
            class="text-base font-Rubik font-bold text-[rgb(255,255,255,1)] uppercase truncate max-w-[11rem]"
            >PROFIT</span
          >
        </div>
        <div
          class="flex items-center gap-x-2 text-xs sm:text-base font-Rubik font-bold text-white pr-1 pl-2 py-1 h-11 bg-[#620101]"
        >
          SHOW STATICS FOR
          <div class="relative h-full">
            <div
              class="h-full w-[140px] flex items-center justify-between px-2 text-base font-Rubik font-bold text-[rgb(255,255,255,0.5)] cursor-pointer rounded-sm relative z-20 bg-[rgba(255,52,53,1)]"
              @click="
                active_dropdown == 'time' ? (active_dropdown = null) : (active_dropdown = 'time')
              "
            >
              <span
                class="flex items-center gap-x-1 text-base font-Rubik font-bold text-[rgb(255,255,255,0.5)]"
              >
                <span
                  class="text-base font-Rubik font-bold text-[rgb(255,255,255,1)] uppercase truncate max-w-[11rem]"
                  >{{ selectedTime }}</span
                >
              </span>

              <ChevronDownIcon
                class="stroke-white w-5 transition-all"
                :class="{
                  '-rotate-180': active_dropdown == 'time'
                }"
              />
            </div>
            <div
              class="absolute w-full left-0 transition-all z-10 top-0 overflow-hidden rounded-b-sm search px-px pb-px"
              :class="{
                ' h-0 bg-transparent   mt-0 ': active_dropdown != 'time',
                'w-full h-56 bg-[linear-gradient(180deg,#620101_0%,#FF3435_100%)]  mt-[32px]   ':
                  active_dropdown == 'time'
              }"
            >
              <div class="h-full bg-[rgba(98,1,1,1)] overflow-auto rounded-b-sm">
                <div
                  v-for="(item, index) in time"
                  :key="index"
                  class="mt-2 rounded-sm hover:bg-[#E82D2E] min-h-[46px] h-[46px] px-2 flex items-center cursor-pointer gap-x-2 capitalize text-white font-Rubik font-extrabold text-base"
                  @click="selectTime(item), (active_dropdown = null)"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chart />
      <div class="flex w-full items-center flex-wrap justify-center gap-2">
        <div
          v-for="(item, index) in statistics"
          :key="index"
          class="h-32 bg-[rgba(98,1,1,1)] w-full min-w-[280px] sm:max-w-[280px] rounded-sm p-4 flex flex-col gap-y-3 items-center justify-center"
        >
          <span class="text-white text-base font-bold font-rubik uppercase">{{ item.title }}</span>
          <div
            class="w-full h-8 flex items-center justify-center gap-x-1 text-3xl font-bold font-Rubik"
            :class="{
              'text-[rgba(4,171,83,1)]': item.title == 'total won' || item.title == 'total profit',
              'text-[rgba(255,52,53,1)]': item.title == 'total lost',
              'text-white': item.title == 'total gambled' || item.title == 'total skins gambled'
            }"
          >
            <span
              class="text-3xl font-bold font-Rubik"
              v-if="item.title != 'total skins gambled'"
              :class="{
                'text-[rgba(4,171,83,1)]': item.title == 'total gambled'
              }"
              >$</span
            >
            {{
              item.title.includes('total skins gambled')
                ? Number(item.value).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0
                  })
                : Number(item.value).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
            }}
          </div>
          <span
            class="text-sm font-bold font-Rubik flex items-center gap-x-1"
            :class="{
              'text-[rgba(4,171,83,1)]': item.title != 'total lost',
              'text-[rgba(255,52,53,1)]': item.title == 'total lost'
            }"
          >
            <ChevronDownIcon
              class="w-4"
              :class="{
                'fill-[rgba(4,171,83,1)] rotate-180': item.title != 'total lost',
                'fill-[rgba(255,52,53,1)]': item.title == 'total lost'
              }"
            />
            $15.00 (-8.23%)</span
          >
        </div>
      </div>
      <div class="w-full grid lg:grid-cols-2 gap-2">
        <div
          class="min-h-[50px] sm:h-[50px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-wrap items-center justify-center sm:justify-between gap-2"
        >
          <span class="text-white text-base font-bold font-rubik opacity-65"
            >Total Skins Gambled (Coinflip):</span
          >
          <span class="text-white text-xl flex items-center gap-x-1 font-bold font-rubik"
            >265
            <p class="text-white text-base font-bold font-rubik opacity-50">($6,251.34)</p></span
          >
        </div>
        <div
          class="min-h-[50px] sm:h-[50px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-wrap items-center justify-center sm:justify-between gap-2"
        >
          <span class="text-white text-base font-bold font-rubik opacity-65"
            >Total Skins Gambled (Jackpot):</span
          >
          <span class="text-white text-xl flex items-center gap-x-1 font-bold font-rubik"
            >265
            <p class="text-white text-base font-bold font-rubik opacity-50">($6,251.34)</p></span
          >
        </div>
        <div
          class="min-h-[50px] sm:h-[50px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-wrap items-center justify-center sm:justify-between gap-2"
        >
          <span class="text-white text-base font-bold font-rubik opacity-65"
            >Total Profit (Coinflip):</span
          >
          <span class="text-white text-xl flex items-center gap-x-1 font-bold font-rubik">
            <p class="text-[rgba(4,171,83,1)] font-bold font-rubik">$</p>
            3,251.21</span
          >
        </div>
        <div
          class="min-h-[50px] sm:h-[50px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-wrap items-center justify-center sm:justify-between gap-2"
        >
          <span class="text-white text-base font-bold font-rubik opacity-65"
            >Total Profit (Jackpot):</span
          >
          <span class="text-white text-xl flex items-center gap-x-1 font-bold font-rubik">
            <p class="text-[rgba(4,171,83,1)] font-bold font-rubik">$</p>
            3,251.21</span
          >
        </div>
        <div
          class="min-h-[105px] sm:h-[105px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-col items-center justify-center gap-y-4"
        >
          <div class="flex flex-col sm:flex-row items-center justify-between w-full">
            <span class="text-white text-base font-bold font-rubik opacity-65"
              >Biggest Coinflip:</span
            >
            <span class="text-white text-xl flex items-center gap-x-1 font-bold font-rubik">
              <p class="text-[rgba(4,171,83,1)] font-bold font-rubik">$</p>
              3,251.21</span
            >
          </div>
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 sm:justify-between w-full"
          >
            <div
              class="flex flex-col sm:flex-row items-center justify-start gap-2 sm:gap-0 relative sm:w-[80%] overflow-hidden"
            >
              <div class="flex items-center gap-6">
                <div
                  class="relative flex items-center transition-opacity duration-200 order-1"
                  :class="{
                    'opacity-40 ': !biggest_coinflip_win.players[0].win
                  }"
                >
                  <img
                    :src="`/img/coins/${biggest_coinflip_win.players[0].coin}.svg`"
                    class="w-[1.5rem] absolute border-[2px] border-[#740c0a] rounded-full -right-3"
                  />
                  <div
                    class="w-[2.25rem] h-[2.25rem] rounded-[4px] bg-no-repeat bg-center bg-cover"
                    :style="{
                      backgroundImage: `url(${biggest_coinflip_win.players[0].avatar})`
                    }"
                  ></div>
                </div>
                <span class="order-2 font-Rubik text-[#d7b7b7] text-sm font-semibold">VS</span>
                <div
                  class="relative flex items-center transition-opacity duration-200 order-3"
                  :class="{
                    'opacity-40': !biggest_coinflip_win.players[1].win
                  }"
                >
                  <img
                    :src="`/img/coins/${biggest_coinflip_win.players[1].coin}.svg`"
                    class="w-[1.5rem] absolute border-[2px] border-[#740c0a] rounded-full -left-3"
                  />
                  <div
                    class="w-[2.25rem] h-[2.25rem] rounded-[4px] bg-no-repeat bg-center bg-cover"
                    :style="{
                      backgroundImage: `url(${biggest_coinflip_win.players[1].avatar})`
                    }"
                  ></div>
                </div>
              </div>
              <hr
                class="bg-[#ff3435] right-0 h-[36px] w-px opacity-30 ml-5 mr-3 border-transparent hidden sm:flex"
              />
              <div class="flex items-center gap-x-2">
                <img
                  v-for="item in biggest_coinflip_win.players[0].items"
                  :key="item._id"
                  :src="item.image"
                  class="max-w-12"
                />
              </div>
            </div>
            <button
              class="w-[61px] h-8 bg-[rgba(255,52,53,1)] rounded-sm text-white font-Rubik font-bold text-base"
            >
              VIEW
            </button>
          </div>
        </div>
        <div
          class="min-h-[105px] sm:h-[105px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-col items-center justify-center gap-y-4"
        >
          <div class="flex flex-col sm:flex-row items-center justify-between w-full">
            <span class="text-white text-base font-bold font-rubik opacity-65"
              >Biggest win (Jackpot):</span
            >
            <span class="text-white text-xl flex items-center gap-x-1 font-bold font-rubik">
              <p class="text-[rgba(4,171,83,1)] font-bold font-rubik">$</p>
              3,251.21</span
            >
          </div>
          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 sm:justify-between w-full"
          >
            <div
              class="flex flex-col sm:flex-row items-center justify-start gap-2 sm:gap-0 relative sm:w-[80%] overflow-hidden"
            >
              <div class="flex items-center gap-2">
                <div
                  class="min-w-[40px] w-[40px] min-h-[40px] rounded-full"
                  :style="{
                    background: `conic-gradient(#04AB53 0% 25%, rgb(4, 171, 83,0.35) 25% 100%)`
                  }"
                ></div>
                <span
                  class="font-Rubik text-xs sm:text-base text-white opacity-50 font-bold whitespace-nowrap"
                  >$93.00 | 18.76%</span
                >
              </div>
              <hr
                class="bg-[#ff3435] right-0 h-[36px] w-px opacity-30 ml-5 mr-3 hidden sm:flex border-transparent"
              />
              <div class="flex items-center gap-x-2">
                <img
                  v-for="item in biggest_coinflip_win.players[0].items"
                  :key="item._id"
                  :src="item.image"
                  class="max-w-12"
                />
              </div>
            </div>
            <button
              class="w-[61px] h-8 bg-[rgba(255,52,53,1)] rounded-sm text-white font-Rubik font-bold text-base"
            >
              VIEW
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex h-full lg:h-[68px] rounded-sm items-center justify-center p-px w-full bg-[linear-gradient(90deg,#FF3435_0%,#620101_100%)] gap-x-2"
      >
        <div
          class="w-full h-full rounded-sm grid grid-cols-12 lg:flex flex-row items-center lg:justify-between bg-[rgba(98,1,1,1)] p-2"
        >
          <div
            class="text-white text-xl font-bold font-rubik opacity-50 whitespace-nowrap col-span-12"
          >
            Luckiest Jackpot Win:
          </div>
          <div
            class="flex items-center justify-start relative lg:max-w-[50%] overflow-hidden col-span-12 sm:col-span-9"
          >
            <div class="flex items-center gap-2">
              <div
                class="min-w-[40px] w-[40px] min-h-[40px] rounded-full"
                :style="{
                  background: `conic-gradient(#04AB53 0% 25%, rgb(4, 171, 83,0.35) 25% 100%)`
                }"
              ></div>
              <span
                class="font-Rubik text-xs whitespace-nowrap sm:text-base text-white opacity-50 font-bold"
                >$93.00 | 18.76%</span
              >
            </div>
            <hr
              class="bg-[#ff3435] right-0 h-[36px] w-px opacity-30 ml-5 mr-3 border-transparent"
            />
            <img
              v-for="item in biggest_coinflip_win.players[0].items"
              :key="item._id"
              :src="item.image"
              class="max-w-12"
            />

            <div
              class="absolute right-0.5 h-full top-0 w-1/4 bg-[linear-gradient(270deg,#620101_0%,rgba(98,1,1,0)100%)]"
            ></div>
          </div>
          <div
            class="flex items-center justify-center sm:justify-end lg:justify-normal gap-x-2 col-span-12 sm:col-span-3"
          >
            <span class="text-white text-xl flex items-center gap-x-1 font-bold font-rubik">
              <p class="text-[rgba(4,171,83,1)] font-bold font-rubik">$</p>
              3,251.21</span
            >
            <button
              class="w-[61px] h-8 bg-[rgba(255,52,53,1)] rounded-sm text-white font-Rubik font-bold text-base"
            >
              VIEW
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

import Chart from '../../Statistics_chart.vue'
export default {
  data() {
    return {
      selectedOption: 'total deposits',
      selectedTime: 'all time',
      time: [
        'all time',
        'sessions',
        '1 year',
        '6 months',
        '3 months',
        '1 month',
        '2 weeks',
        '1 week',
        '3 days',
        '1 day',
        '14 hours',
        '6 hours'
      ],
      referees: [
        {
          _id: 1,
          name: 'tester',
          avatar:
            'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg',
          deposited: 1234,
          commission: 1234,
          last_deposited: '2024-12-29T17:05',
          last_seen: '2024-12-29T17:05'
        }
      ],
      biggest_coinflip_win: {
        _id: 1,
        players: [
          {
            name: 'tester heaven',
            avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
            coin: 'heaven',
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
              }
            ],
            win: true
          },
          {
            name: 'tester hell',
            avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
            coin: 'hell',
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
              }
            ],
            win: false
          }
        ],
        total: 1077,
        state: 'finished'
      },
      luckiest_big_jackpot_win: {
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
            price: 900,
            id: 6
          },
          {
            name: 'AK-47',
            image:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            price: 900,
            id: 7
          },
          {
            name: 'AK-47',
            image:
              'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
            price: 900,
            id: 8
          }
        ]
      },
      options: ['total deposits', 'code used', 'deposits', 'total earned'],
      statistics: [
        { title: 'total skins gambled', value: 12156 },
        {
          title: 'total gambled',
          value: 45000.11
        },
        { title: 'total won', value: 38356.21 },
        { title: 'total lost', value: 29000 },
        { title: 'total profit', value: 9356.21 }
      ],
      experience: 30,
      referalTyping: '',
      active_dropdown: null,
      referalCodes: ['https://hell.gg/r/test'],
      rows_dropdown: false,
      rows_per_page: 10,
      current_page: 1,
      rows_options: [10, 20, 30],
      maxVisiblePages: 5
    }
  },
  methods: {
    selectOption(item) {
      this.selectedOption = item
    },
    selectTime(time) {
      this.selectedTime = time
    },
    copyToClipboard(item) {
      navigator.clipboard.writeText(item)
    },
    formatDateTime(dateString) {
      const now = new Date()
      const targetDate = new Date(dateString)
      const diffInSeconds = Math.floor((now - targetDate) / 1000)

      // Conditions for relative time
      if (diffInSeconds < 60) {
        return 'a minute ago'
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
      } else if (diffInSeconds < 172800) {
        return 'a day ago'
      }

      // Fallback: Format fixed date for older entries
      return targetDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    updateReferalCode() {
      if (!this.referalTyping.trim()) {
        return
      }
      if (!this.referalTyping.startsWith('https://hell.gg/r/')) {
        this.referalTyping = `https://hell.gg/r/${this.referalTyping.trim()}`
      }
    },
    addReferalCode() {
      if (!this.referalTyping.trim()) {
        return
      }
      if (!this.referalTyping.includes('https://hell.gg/r/')) {
        this.updateReferalCode()
        if (!this.referalCodes.includes(this.referalTyping)) {
          this.referalCodes.push(this.referalTyping)
          this.referalTyping = ''
        } else {
          alert('This referral code already exists.')
        }
      } else {
        if (!this.referalCodes.includes(this.referalTyping)) {
          this.referalCodes.push(this.referalTyping)
          this.referalTyping = ''
        } else {
          alert('This referral code already exists.')
        }
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.current_page = page
      }
    },
    updatePagination() {
      this.current_page = 1
    }
  },
  mounted() {},

  components: {
    Chart,
    ChevronDownIcon
  },
  computed: {
    totalPages() {
      return Math.ceil(this.referees.length / this.rows_per_page)
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.rows_per_page
      const end = start + this.rows_per_page
      return this.referees.slice(start, end)
    },
    visiblePages() {
      const half = Math.floor(this.maxVisiblePages / 2)
      let start = Math.max(1, this.current_page - half)
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1)

      // Adjust start if we're near the end
      if (end - start < this.maxVisiblePages - 1) {
        start = Math.max(1, end - this.maxVisiblePages + 1)
      }

      const pages = []
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  }
}
</script>
<style scoped>
.affiliates ::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
}
.affiliates ::-webkit-scrollbar-track {
  background: transparent;
}
.affiliates ::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #a60000;
  border-radius: 4px;
}
</style>
