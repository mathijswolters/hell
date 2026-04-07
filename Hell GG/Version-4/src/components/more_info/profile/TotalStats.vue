<template>
  <div class="container-class">

    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 gap-3 w-full">
      <div
        class="bg-[#620101] rounded-[2px] py-[16px] px-[10px] text-center text-white font-[700] flex flex-col gap-3"
      >
        <h3 class="text-[10px]">Total Skins Gambled</h3>
        <h2 class="text-[14px] font-[700]">12,156</h2>
        <span class="text-[#04AB53] text-[8px] font-[500]">▲ 15 (+8.23%)</span>
      </div>
      <div
        class="bg-[#620101] rounded-[2px] py-[16px] px-[10px] text-center text-white font-[700] flex flex-col gap-3"
      >
        <h3 class="text-[10px]">Total Gambled</h3>
        <h2 class="text-[14px] font-[700]">
          <span class="text-[#04AB53] font-[700]">$</span>45,000.11
        </h2>
        <span class="text-[#04AB53] text-[8px] font-[500]">▲ $15.00 (+8.23%)</span>
      </div>
      <div
        class="bg-[#620101] rounded-[2px] py-[16px] px-[10px] text-center text-white font-[700] flex flex-col gap-3"
      >
        <h3 class="text-[10px]">Total Won</h3>
        <h2 class="text-[#04AB53] text-[14px] font-[700]">
          <span class="font-[700]">$</span>38,356.21
        </h2>
        <span class="text-[#04AB53] text-[8px] font-[500]">▲ $15.00 (+8.23%)</span>
      </div>
      <div
        class="bg-[#620101] rounded-[2px] py-[16px] px-[10px] text-center text-white font-[700] flex flex-col gap-3"
      >
        <h3 class="text-[10px]">Total Lost</h3>
        <h2 class="text-[14px] text-[#FF3435] font-[700]">
          <span class="font-[700]">$</span>29,000.0
        </h2>
        <span class="text-[#FF3435] text-[8px] font-[500]">▼ $15.00 (+8.23%)</span>
      </div>
      <div
        class="bg-[#620101] rounded-[2px] py-[16px] px-[10px] text-center text-white font-[700] flex flex-col gap-3"
      >
        <h3 class="text-[10px]">Total Profit</h3>
        <h2 class="text-[#04AB53] text-[14px] font-[700]">
          <span class="font-[700]">$</span>9,356.21
        </h2>
        <span class="text-[#04AB53] text-[8px] font-[500]">▲ $15.00 (+8.23%)</span>
      </div>
    </div>

    <div class="w-full grid lg:grid-cols-2 gap-5 my-3 py-3">
        <div
          class="min-h-[50px] sm:h-[50px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-wrap items-center justify-center sm:justify-between gap-2"
        >
          <span class="text-white text-[14px] font-bold font-rubik opacity-65"
            >Total Skins Gambled (Coinflip):</span
          >
          <span class="text-white text-[14px] flex items-center gap-x-1 font-bold font-rubik"
            >265
            <p class="text-white text-[14px] font-bold font-rubik opacity-50">($6,251.34)</p></span
          >
        </div>
        <div
          class="min-h-[50px] sm:h-[50px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-wrap items-center justify-center sm:justify-between gap-2"
        >
          <span class="text-white text-[14px] font-bold font-rubik opacity-65"
            >Total Skins Gambled (Jackpot):</span
          >
          <span class="text-white text-[14px] flex items-center gap-x-1 font-bold font-rubik"
            >265
            <p class="text-white text-[14px] font-bold font-rubik opacity-50">($6,251.34)</p></span
          >
        </div>
        <div
          class="min-h-[50px] sm:h-[50px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-wrap items-center justify-center sm:justify-between gap-2"
        >
          <span class="text-white text-[14px] font-bold font-rubik opacity-65"
            >Total Profit (Coinflip):</span
          >
          <span class="text-white text-[14px] flex items-center gap-x-1 font-bold font-rubik">
            <p class="text-[rgba(4,171,83,1)] font-bold font-rubik">$</p>
            3,251.21</span
          >
        </div>
        <div
          class="min-h-[50px] sm:h-[50px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-wrap items-center justify-center sm:justify-between gap-2"
        >
          <span class="text-white text-[14px] font-bold font-rubik opacity-65"
            >Total Profit (Jackpot):</span
          >
          <span class="text-white text-[14px] flex items-center gap-x-1 font-bold font-rubik">
            <p class="text-[rgba(4,171,83,1)] font-bold font-rubik">$</p>
            3,251.21</span
          >
        </div>
        <div
          class="min-h-[105px] sm:h-[105px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-col items-center justify-center gap-y-4"
        >
          <div class="flex flex-col sm:flex-row items-center justify-between w-full">
            <span class="text-white text-[14px] font-bold font-rubik opacity-65"
              >Biggest Coinflip:</span
            >
            <span class="text-white text-[14px] flex items-center gap-x-1 font-bold font-rubik">
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
                    class="w-[16px] absolute border-[2px] border-[#740c0a] rounded-full -right-3"
                  />
                  <div
                    class="w-[24px] h-[24px] rounded-[4px] bg-no-repeat bg-center bg-cover"
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
                    class="w-[16px] absolute border-[2px] border-[#740c0a] rounded-full -left-3"
                  />
                  <div
                    class="w-[24px] h-[24px] rounded-[4px] bg-no-repeat bg-center bg-cover"
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
                  class="max-w-8"
                />
              </div>
            </div>
            <button
              class="w-[61px] h-8 bg-[rgba(255,52,53,1)] rounded-sm text-white font-Rubik font-bold text-[14px]"
            >
              VIEW
            </button>
          </div>
        </div>
        <div
          class="min-h-[105px] sm:h-[105px] bg-[rgba(98,1,1,1)] rounded-sm p-2 flex flex-col items-center justify-center gap-y-4"
        >
          <div class="flex flex-col sm:flex-row items-center justify-between w-full">
            <span class="text-white text-[14px] font-bold font-rubik opacity-65"
              >Biggest win (Jackpot):</span
            >
            <span class="text-white text-[14px] flex items-center gap-x-1 font-bold font-rubik">
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
                  class="min-w-[24px] w-[24px] min-h-[24px] rounded-full"
                  :style="{
                    background: `conic-gradient(#04AB53 0% 25%, rgb(4, 171, 83,0.35) 25% 100%)`
                  }"
                ></div>
                <span
                  class="font-Rubik text-xs sm:text-[14px] text-white opacity-50 font-bold whitespace-nowrap"
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
                  class="max-w-8"
                />
              </div>
            </div>
            <button
              class="w-[61px] h-8 bg-[rgba(255,52,53,1)] rounded-sm text-white font-Rubik font-bold text-[14px]"
            >
              VIEW
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex h-full lg:h-[68px] rounded-sm items-center justify-center p-px w-full gap-x-2"
      >
        <div
          class="w-full h-full rounded-sm grid grid-cols-12 lg:flex flex-row items-center lg:justify-between bg-[rgba(98,1,1,1)] p-2"
        >
          <div
            class="text-white text-[14px] font-bold font-rubik opacity-50 whitespace-nowrap col-span-12"
          >
            Luckiest Jackpot Win:
          </div>
          <div
            class="flex items-center justify-start relative lg:max-w-[50%] overflow-hidden col-span-12 sm:col-span-9"
          >
            <div class="flex items-center gap-2">
              <div
                class="min-w-[24px] w-[24px] min-h-[24px] rounded-full"
                :style="{
                  background: `conic-gradient(#04AB53 0% 25%, rgb(4, 171, 83,0.35) 25% 100%)`
                }"
              ></div>
              <span
                class="font-Rubik text-xs whitespace-nowrap sm:text-[14px] text-white opacity-50 font-bold"
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
              class="max-w-8"
            />

          </div>
          <div
            class="flex items-center justify-center sm:justify-end lg:justify-normal gap-x-2 col-span-12 sm:col-span-3"
          >
            <span class="text-white text-[14px] flex items-center gap-x-1 font-bold font-rubik">
              <p class="text-[rgba(4,171,83,1)] font-bold font-rubik">$</p>
              3,251.21</span
            >
            <button
              class="w-[61px] h-8 bg-[rgba(255,52,53,1)] rounded-sm text-white font-Rubik font-bold text-[14px]"
            >
              VIEW
            </button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "TotalStats",
  data() {
    return {
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
    };
  },
  methods: {
    percentageToRadians(percentage) {
      return (percentage / 100) * 2 * Math.PI;
    },
    calculatePath(lowest, highest) {
      const startAngle = this.percentageToRadians(lowest);
      const endAngle = this.percentageToRadians(highest);

      const startX = Math.cos(startAngle);
      const startY = Math.sin(startAngle);
      const endX = Math.cos(endAngle);
      const endY = Math.sin(endAngle);

      const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

      return `
        M 0 0
        L ${startX} ${startY}
        A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
        Z
      `;
    },
  },
};
</script>

<style scoped></style>
