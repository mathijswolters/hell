<template>
  <Transition
    name="inner_modal"
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="activeModal">
      <div
        class="fixed inset-0 flex items-center justify-center bg-[#21010163] bg-opacity-50 transition-all duration-300"
        :class="{
          '-z-50 opacity-0': activeModal != 'choose risk',
          'z-50 opacity-100': activeModal == 'choose risk'
        }"
        @click.self="activeModal = null"
      >
        <div class="backdrop-blur-xl">
          <div
            class="relative md:min-w-[684px] max-w-[684px] flex-col transform min-h-10 transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] rounded border overflow-hidden shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)]"
          >
            <XMarkIcon
              class="absolute w-5 stroke-white top-2 right-2 cursor-pointer"
              @click="activeModal = null"
            />

            <div class="flex items-center flex-col gap-y-2 w-full py-6 px-2">
              <span class="text-center font-Rubik text-base font-medium text-white"
                >CHOOSE YOUR CASE RISK LEVEL</span
              >

              <div class="flex items-center justify-center flex-wrap gap-2 mt-4">
                <button
                  class="bg-[rgba(4,171,83,1)] h-8 px-4 flex items-center justify-center w-[153px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
                  @click="(selectedRisk = 'low'), (activeModal = 'case content')"
                >
                  LOW RISK
                </button>
                <button
                  class="bg-[rgba(254,189,17,1)] h-8 px-4 flex items-center justify-center w-[153px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
                  @click="(selectedRisk = 'medium'), (activeModal = 'case content')"
                >
                  MEDIUM RISK
                </button>
                <button
                  class="bg-[rgba(255,52,53,1)] h-8 px-4 flex items-center justify-center w-[153px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
                  @click="(selectedRisk = 'high'), (activeModal = 'case content')"
                >
                  HIGH RISK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="fixed inset-0 flex items-center justify-center bg-[#21010163] bg-opacity-50 transition-all duration-300"
        :class="{
          '-z-50 opacity-0': activeModal != 'case content',
          'z-50 opacity-100': activeModal == 'case content'
        }"
        @click.self="activeModal = null"
      >
        <div class="backdrop-blur-xl">
          <div
            class="relative md:min-w-[684px] max-w-[684px] flex-col transform min-h-10 transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] rounded border overflow-hidden shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)]"
          >
            <div
              class="flex items-center justify-between w-full py-2 px-2 border-b border-b-solid border-b-[rgb(255,255,255,0.3)]"
            >
              <ArrowLeftIcon
                class="w-5 stroke-white left-2 cursor-pointer"
                @click="(activeModal = 'choose risk'), (selectedRisk = null)"
              />
              <span class="font-Rubik text-white font-bold text-base">
                LvL {{ selectedCaseLvl }} CASE</span
              >
              <XMarkIcon class="w-5 stroke-white cursor-pointer" @click="activeModal = null" />
            </div>

            <div class="flex items-center flex-col gap-y-2 w-full py-6 px-2">
              <div class="flex relative items-center justify-center w-[101px] h-[180px]">
                <img
                  class="min-w-[237px] h-[237px] mb-11 absolute -z-[1]"
                  src="../../../assets/img/case_image.png"
                />
                <img src="/img/ranks/1.png" class="max-h-[60px]" />
                <div
                  class="min-w-[237px] h-[237px] flex items-end justify-center mb-14 absolute -z-10"
                >
                  <div
                    class="min-w-[202px] min-h-[202px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(254,189,17,0.8)_0%,rgba(66,1,1,0)_100%)] blur-md opacity-70"
                  ></div>
                </div>
              </div>

              <div class="flex items-center justify-center flex-wrap gap-2 -mt-6">
                <button
                  class="bg-[rgba(4,171,83,1)] h-8 px-4 flex items-center justify-center w-[153px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
                  @click="(activeModal = 'item won'), startConfetti()"
                >
                  OPEN
                </button>
              </div>
              <div
                class="flex items-center justify-center flex-wrap gap-2 font-Rubik text-white font-bold text-lg mt-4"
              >
                YOU CAN GET ONE OF THESE SKINS
              </div>
              <div
                class="flex flex-wrap justify-center gap-1 max-h-[40vh] md:max-h-[20rem] overflow-auto scrollbar_show"
                v-if="levelsItems[selectedCaseLvl - 1]"
              >
                <div
                  v-for="item in levelsItems[selectedCaseLvl - 1].case.contents"
                  :key="item._id"
                  class="w-[125.5px] h-[134px] flex flex-col items-center justify-center px-4 bg-[#690405]"
                >
                  <img :src="item.image" class="max-w-[64px]" />
                  <span
                    class="w-full truncate font-Rubik font-semibold text-[#d7b7b7] text-sm text-center"
                    >{{ item.name }}</span
                  >
                  <span class="font-Rubik text-white text-base font-semibold"
                    >${{
                      Number(item.price).toLocaleString(undefined, {
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
      </div>
      <div
        class="fixed inset-0 flex items-center justify-center bg-[#21010163] bg-opacity-50 transition-all duration-300"
        :class="{
          '-z-50 opacity-0': activeModal != 'item won',
          'z-50 opacity-100': activeModal == 'item won'
        }"
        @click.self="activeModal = null"
      >
        <canvas ref="confetti" class="absolute left-0 top-0 w-full h-full"></canvas>
        <div class="backdrop-blur-xl">
          <div
            class="relative md:min-w-[439px] max-w-[439px] flex-col transform min-h-10 transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] rounded border overflow-hidden shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)]"
          >
            <XMarkIcon
              class="absolute w-5 stroke-white top-2 right-2 cursor-pointer"
              @click="activeModal = null"
            />

            <div class="flex items-center flex-col gap-y-2 w-full py-6 px-2">
              <span class="text-center font-Rubik text-2xl font-medium text-white"
                >CONGRATULATIONS</span
              >
              <div class="flex relative items-center justify-center w-[101px] h-[180px]">
                <img
                  class="w-auto h-[120px] mb-11 absolute -z-[1]"
                  src="https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f"
                />

                <div
                  class="min-w-[202px] h-[202px] flex items-end justify-center mb-11 absolute -z-10"
                >
                  <div
                    class="min-w-[202px] min-h-[202px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(254,189,17,0.8)_0%,rgba(66,1,1,0)_100%)] blur-lg opacity-70"
                  ></div>
                </div>
              </div>
              <div class="flex flex-col -mt-10">
                <span
                  class="w-full truncate font-Rubik font-semibold text-[#d7b7b7] text-sm text-center"
                  >AK-47</span
                >
                <span class="font-Rubik text-white text-base font-semibold"
                  >${{
                    Number(900).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })
                  }}</span
                >
              </div>
              <div class="flex items-center justify-center flex-wrap gap-2 mt-2">
                <button
                  class="bg-[rgba(4,171,83,1)] h-8 px-4 flex items-center justify-center w-full max-w-[385px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
                >
                  WITHDRAW TO STEAM
                </button>
                <button
                  class="bg-[rgba(255,52,53,1)] h-8 px-4 flex items-center justify-center w-full sm:w-[190px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
                >
                  JACKPOT DEPOSIT
                </button>
                <button
                  class="bg-[rgba(255,52,53,1)] h-8 px-4 flex items-center justify-center w-full sm:w-[190px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize whitespace-nowrap"
                >
                  COINFLIP DEPOSIT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <div
    class="relative w-full max-w-[95vw] xl:min-w-[1239px] xl:max-w-[1239px] flex-col transform transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[rgba(98,1,1,1)] border overflow-hidden"
  >
    <div
      class="flex items-center p-4 w-full text-white font-Rubik font-bold text-base border-b-2 border-b-solid border-b-[rgba(98,1,1,0.5)]"
    >
      LEVEL CASES
    </div>
    <XMarkIcon
      class="absolute right-4 top-4 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    />

    <div class="py-2 h-full flex flex-col gap-4 items-center justify-center">
      <div class="w-full relative py-4 flex flex-col justify-end gap-y-5 overflow-x-hidden">
        <div
          ref="container"
          class="h-[18rem] pb-8 flex flex-col justify-end overflow-x-scroll lg:overflow-x-hidden cursor-grab select-none scroll-smooth pr-14"
        >
          <div
            class="bg-[linear-gradient(90deg,rgba(98,1,1,0)0%,#620101_49%,rgba(98,1,1,0)100%)] relative w-full h-[0.125rem] overflow-visible mb-[1.1rem]"
            :style="{
              width: levelsItems.length * 2.45 + levelsItems.length * 7.5 + 'rem'
            }"
          >
            <div
              class="absolute top-0 left-0 h-full transition-all bg-[linear-gradient(90deg,rgba(255,52,53,0)0%,#FF3435_100%)]"
              :style="{
                width: (levelPercentage + currentLevel * 100) / levelsItems.length + '%'
              }"
            ></div>
            <div
              class="absolute top-[50%] translate-y-[-50%] w-full flex items-center gap-[9rem] pl-[8.75rem]"
            >
              <div
                v-for="(item, n) in levelsItems"
                :key="n + 1"
                class="w-2.5 h-2.5 bg-[rgba(255,52,53,1)] rounded-full relative flex justify-center z-10"
                :class="{ 'w-4 h-4 min-h-4 min-w-4': n + 1 <= currentLevel }"
              >
                <div :id="n + 1" class="absolute bottom-full mb-7 z-10">
                  <div class="flex relative items-center justify-center w-[101px] h-[101px]">
                    <img
                      class="w-[101px] h-[101px] absolute -z-[1]"
                      :class="{
                        'min-w-[237px] h-[237px] mb-14': currentLevel == n + 1
                      }"
                      src="../../../assets/img/case_image.png"
                    />
                    <img v-if="currentLevel == n + 1" src="/img/ranks/1.png" class="max-h-[60px]" />
                    <div
                      v-if="currentLevel == n + 1"
                      class="min-w-[237px] h-[237px] flex items-end justify-center mb-14 absolute -z-10"
                    >
                      <div
                        class="min-w-[202px] min-h-[202px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(254,189,17,0.8)_0%,rgba(66,1,1,0)_100%)] blur-md opacity-70"
                      ></div>
                    </div>
                  </div>
                  <div>
                    <button
                      @click="(activeModal = 'choose risk'), (selectedCaseLvl = n + 1)"
                      class="w-full h-6 bg-[rgba(4,171,83,1)] flex items-center justify-center rounded-sm font-Rubik text-white font-semibold opacity-100"
                      :class="{
                        'opacity-50': item.used && currentLevel >= n + 1
                      }"
                    >
                      {{
                        item.used && currentLevel >= n + 1
                          ? 'view'
                          : currentLevel < n + 1
                            ? 'view'
                            : 'open'
                      }}
                    </button>
                  </div>
                </div>
                <div class="absolute top-full font-Rubik text-white font-semibold text-sm">
                  Level:{{ n + 1 }}
                </div>
                <div
                  class="absolute bottom-full font-Rubik text-[rgba(255,52,53,1)] opacity-60 font-semibold text-sm"
                >
                  $50.00
                  <!-- {{
                  Number(value_with_dollars(n)).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }} -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-between w-full px-4 flex-wrap md:flex-nowrap gap-4 md:gap-0"
        >
          <div class="flex items-center gap-x-2 order-2 md:order-1">
            <button
              class="h-5 w-5 flex items-center justify-center bg-[rgba(98,1,1,1)] border border-solid border-[rgba(255,52,53,1)] rounded-sm"
              @click="prevItem"
            >
              <ChevronLeftIcon class="stroke-[3px] stroke-white w-2.5" />
            </button>
            <button
              class="h-5 w-5 flex items-center justify-center bg-[rgba(98,1,1,1)] border border-solid border-[rgba(255,52,53,1)] rounded-sm"
              @click="firstItem"
            >
              <ChevronDoubleLeftIcon class="stroke-[3px] stroke-white w-3" />
            </button>
          </div>
          <!-- <div @click="levelPercentage += 40">test</div> -->
          <div
            class="flex items-center w-full md:w-auto gap-x-2 text-white font-Rubik text-sm font-semibold whitespace-nowrap order-1 md:order-2"
          >
            Lvl {{ currentLevel }}
            <div
              class="flex items-center w-full md:w-[400px] h-[25px] rounded-full bg-[rgba(98,1,1,1)] border border-solid border-[rgba(255,52,53,1)] p-0.5 relative"
            >
              <div
                class="bg-[rgba(255,52,53,0.3)] rounded-[10.5px] h-full transition-all duration-500"
                :style="{
                  width: levelPercentage + '%'
                }"
              ></div>
              <div
                class="absolute transition-all duration-1000 bg-[rgba(255,52,53,1)] rounded-[10.5px] h-full max-h-[calc(100%-4px)] max-w-[calc(100%-4px)]"
                :style="{
                  width: levelPercentage + '%'
                }"
              ></div>
              <div
                class="absolute w-full flex justify-center text-white font-Rubik font-medium text-sm"
              >
                ${{ wagered }}/${{ max_wager }}
              </div>
            </div>
            Lvl {{ currentLevel + 1 }}
          </div>
          <div class="flex items-center gap-x-2 order-3">
            <button
              class="h-5 w-5 flex items-center justify-center bg-[rgba(98,1,1,1)] border border-solid border-[rgba(255,52,53,1)] rounded-sm"
              @click="finalItem"
            >
              <ChevronDoubleRightIcon class="stroke-[3px] stroke-white w-3" />
            </button>
            <button
              class="h-5 w-5 flex items-center justify-center bg-[rgba(98,1,1,1)] border border-solid border-[rgba(255,52,53,1)] rounded-sm"
              @click="nextItem"
            >
              <ChevronRightIcon class="stroke-[3px] stroke-white w-2.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowLeftIcon
} from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
import ConfettiGenerator from 'confetti-js'
export default {
  name: 'level_cases',

  components: {
    XMarkIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    ArrowLeftIcon
  },
  data() {
    return {
      level: 1,
      // authUser: useUserStore(),
      userProfile: {},
      levelPercentage: 20,
      progress: 50,
      totalLevels: 10,
      activeModal: null,
      selectedRisk: null,
      selectedCaseLvl: null,
      levelsItems: [
        {
          _id: '65d695eabb70ab24235d26b6',
          level: 1,
          isEmpty: true,
          balance: 0,
          createdAt: '2024-02-22T00:31:38.435Z',
          updatedAt: '2024-02-22T00:31:38.435Z',
          __v: 0
        },
        {
          _id: '65d69669bb70ab24235d2963',
          level: 2,
          isEmpty: false,
          balance: 0.01,
          createdAt: '2024-02-22T00:33:45.853Z',
          updatedAt: '2024-02-22T00:33:45.853Z',
          __v: 0
        },
        {
          _id: '65d69adfbb70ab24235d35bc',
          level: 3,
          isEmpty: false,
          balance: 0,
          case: {
            _id: '65c14656fb73af770d759bd6',
            name: 'Level 3 Case',
            slug: 'level-3-case',
            image:
              'https://pub-5f12f7508ff04ae5925853dee0438460.r2.dev/data/csgo/resource/flash/econ/weapon_cases/crate_community_32.png',
            contents: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 900,
                _id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 10,
                _id: 1
              },

              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 40,
                _id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 30,
                _id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 1,
                _id: 1
              },
              {
                name: 'AK-47s',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 46,
                _id: 1
              },
              {
                name: 'AK-47t',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 90,
                _id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 30,
                _id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 130,
                _id: 1
              }
            ],
            isDisabled: false,
            isFeatured: false,
            isFreeTokenEligible: false,
            mininmumLevel: 0,
            isXmasCase: false,
            isYoutuberCase: false,
            openCount: 1124,
            price: 0.1,
            suggestedPrice: 0.05,
            type: 'LEVEL',
            createdAt: '2024-02-05T20:34:30.118Z',
            updatedAt: '2025-01-20T01:27:33.983Z',
            __v: 0
          },
          used: true,
          createdAt: '2024-02-22T00:52:47.669Z',
          updatedAt: '2024-02-22T00:52:47.669Z',
          __v: 0
        },
        {
          _id: '65d69b28bb70ab24235d35e9',
          level: 4,
          isEmpty: false,
          balance: 0.03,
          createdAt: '2024-02-22T00:54:00.655Z',
          updatedAt: '2024-02-22T00:54:00.655Z',
          __v: 0
        },
        {
          _id: '65d69bb4bb70ab24235d36a2',
          level: 5,
          isEmpty: false,
          balance: 0,
          case: {
            _id: '65c17069fb73af770d773480',
            name: 'Level 5 Case',
            slug: 'level-5-case',
            image:
              'https://pub-5f12f7508ff04ae5925853dee0438460.r2.dev/data/csgo/resource/flash/econ/weapon_cases/crate_community_32.png',
            contents: [],
            isDisabled: false,
            isFeatured: false,
            isFreeTokenEligible: false,
            mininmumLevel: 0,
            isXmasCase: false,
            isYoutuberCase: false,
            openCount: 941,
            price: 0.1,
            suggestedPrice: 0.05,
            type: 'LEVEL',
            createdAt: '2024-02-05T23:34:01.052Z',
            updatedAt: '2025-01-20T01:27:54.345Z',
            __v: 0
          },
          createdAt: '2024-02-22T00:56:20.291Z',
          updatedAt: '2024-02-22T00:56:20.291Z',
          __v: 0
        },
        {
          _id: '65d69bf8bb70ab24235d36c2',
          level: 6,
          isEmpty: false,
          balance: 0.05,
          createdAt: '2024-02-22T00:57:28.953Z',
          updatedAt: '2024-02-22T00:57:28.953Z',
          __v: 0
        },
        {
          _id: '65d69c08bb70ab24235d36f4',
          level: 7,
          isEmpty: false,
          balance: 0,
          case: {
            _id: '65c1724ffb73af770d7735e2',
            name: 'Level 7 Case',
            slug: 'level-7-case',
            image:
              'https://pub-5f12f7508ff04ae5925853dee0438460.r2.dev/data/csgo/resource/flash/econ/weapon_cases/crate_community_32.png',
            contents: [],
            isDisabled: false,
            isFeatured: false,
            isFreeTokenEligible: false,
            mininmumLevel: 0,
            isXmasCase: false,
            isYoutuberCase: false,
            openCount: 703,
            price: 0.2,
            suggestedPrice: 0.06,
            type: 'LEVEL',
            createdAt: '2024-02-05T23:42:07.956Z',
            updatedAt: '2025-01-20T00:12:03.822Z',
            __v: 0
          },
          used: false,
          createdAt: '2024-02-22T00:57:44.433Z',
          updatedAt: '2024-02-22T00:57:44.433Z',
          __v: 0
        },
        {
          _id: '65d69bf8bb70ab24235d36c2',
          level: 8,
          isEmpty: false,
          balance: 0.05,
          createdAt: '2024-02-22T00:57:28.953Z',
          updatedAt: '2024-02-22T00:57:28.953Z',
          __v: 0
        },
        {
          _id: '65d69bf8bb70ab24235d36c2',
          level: 9,
          isEmpty: false,
          balance: 0.05,
          createdAt: '2024-02-22T00:57:28.953Z',
          updatedAt: '2024-02-22T00:57:28.953Z',
          __v: 0
        },
        {
          _id: '65d69bf8bb70ab24235d36c2',
          level: 10,
          isEmpty: false,
          balance: 0.05,
          createdAt: '2024-02-22T00:57:28.953Z',
          updatedAt: '2024-02-22T00:57:28.953Z',
          __v: 0
        }
      ],
      testId: 1,
      currentLevel: 9,
      wagered: 100,
      max_wager: 200,
      previousClicked: true,
      nextClicked: false,
      startingvalue: 0,
      isDragging: false,
      startX: 0,
      scrollLeft: 0
    }
  },
  emits: ['closeModal'],
  methods: {
    startConfetti() {
      const confettiSettings = {
        target: this.$refs.confetti,
        max: 250,
        size: 1,
        animate: true,
        props: ['square', 'square', 'line'],
        colors: [
          [0, 184, 145],
          [236, 142, 14],
          [91, 0, 149],
          [255, 105, 147],
          [241, 88, 64],
          [77, 208, 255]
        ],
        clock: 25,
        rotate: true,
        width: this.$refs.confetti.offsetWidth,
        height: this.$refs.confetti.offsetHeight,
        respawn: true,
        start_from_edge: true
      }
      this.confetti = new ConfettiGenerator(confettiSettings)
      this.confetti.render() // Start rendering the confetti
    },
    closeModal() {
      this.$emit('close-modal')
    },

    openModal(name) {
      openModalFromModal(name)
    },
    value_with_dollars(index) {
      if (index === 0) {
        this.startingvalue = 50
      } else if (index === 1) {
        this.startingvalue = 100
      } else {
        this.startingvalue += 100
      }
      return this.startingvalue
    },
    nextItem() {
      if (this.testId < this.levelsItems.length && !this.previousClicked) {
        this.testId += 1
        window.location.hash = `#${this.testId}`
        this.nextClicked = true
        this.previousClicked = false
      } else if (this.testId < this.levelsItems.length && this.previousClicked) {
        this.testId += 7
        this.nextClicked = true
        this.previousClicked = false
        window.location.hash = `#${this.testId}`
      } else if (this.testId == this.levelsItems.length) {
        this.testId 
      }
    },
    finalItem() {
      this.testId = this.levelsItems.length
      this.previousClicked = false
      this.nextClicked = true
      window.location.hash = `#${this.testId}`
    },
    firstItem() {
      this.testId = 1
      this.previousClicked = true
      this.nextClicked = false
      window.location.hash = `#${this.testId}`
    },
    prevItem() {
      if (this.testId > 1 && !this.nextClicked) {
        this.testId -= 1
        window.location.hash = `#${this.testId}`
        this.nextClicked = false
        this.previousClicked = true
      } else if (this.testId > 1 && this.nextClicked) {
        this.testId -= 7
        this.nextClicked = false
        this.previousClicked = true
        window.location.hash = `#${this.testId}`
      } else if (this.testId == 1) {
        this.testId 
      }
    },
    getUserLevel() {
      // let response = await new UserService().getUserLevel()

      this.levelPercentage = 50
    },
    increaseProgress() {
      if (this.progress < 7500) {
        this.progress += 90
        this.level = Math.floor(this.progress / 100)
      } else {
        this.level += 1
        this.progress = 0
      }
    },

    decreaseIdValue() {
      if (this.testId > 1) {
        this.testId -= 1
      }
    },
    increaseIdValue() {
      this.testId += 1
    },
    // openModal(modalName, item, level) {
    //   setRewardCase({ ...item, level })
    //   this.$emit('open-rewardsCase')
    // },
    startDrag(e) {
      this.isDragging = true
      this.startX = e.pageX - this.$refs.container.offsetLeft
      this.scrollLeft = this.$refs.container.scrollLeft
      this.$refs.container.style.cursor = 'grabbing' // Change cursor on drag
    },
    doDrag(e) {
      if (!this.isDragging) return
      e.preventDefault()
      const x = e.pageX - this.$refs.container.offsetLeft
      const walk = (x - this.startX) * 2 // Adjust scrolling speed
      this.$refs.container.scrollLeft = this.scrollLeft - walk
    },
    stopDrag() {
      this.isDragging = false
      this.$refs.container.style.cursor = 'grab'
    }
    // Touch Support
    // startTouch(e) {
    //   this.startDrag(e.touches[0])
    // },
    // doTouch(e) {
    //   this.doDrag(e.touches[0])
    // }
  },
  mounted() {
    // await this.getLevels()
    this.testId = this.IdValue + 6 - this.currentLevel
    this.testId = this.currentLevel
    window.location.hash = `#${this.currentLevel + 6 > this.levelsItems.length ? this.currentLevel : this.currentLevel + 6}`
    // if (this.authUser.isLoggedIn) {
    //   await this.getUserStats()
    //   this.dataLoaded = true
    // } else {
    //   this.dataLoaded = true
    // }

    const container = this.$refs.container

    // Mouse events
    container.addEventListener('mousedown', this.startDrag)
    container.addEventListener('mousemove', this.doDrag)
    container.addEventListener('mouseup', this.stopDrag)
    container.addEventListener('mouseleave', this.stopDrag)

    // Touch events for mobile
    container.addEventListener('touchstart', this.startTouch)
    container.addEventListener('touchmove', this.doTouch)
    container.addEventListener('touchend', this.stopDrag)
  },
  beforeUnmount() {
    const container = this.$refs.container

    // Remove Mouse Events
    container.removeEventListener('mousedown', this.startDrag)
    container.removeEventListener('mousemove', this.doDrag)
    container.removeEventListener('mouseup', this.stopDrag)
    container.removeEventListener('mouseleave', this.stopDrag)

    // Remove Touch Events
    container.removeEventListener('touchstart', this.startTouch)
    container.removeEventListener('touchmove', this.doTouch)
    container.removeEventListener('touchend', this.stopDrag)
  },
  computed: {
    // currentLevel() {
    //   return Math.floor(this.progress / 100);
    // },
    IdValue() {
      return this.currentLevel
    }
  }
}
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
.scrollbar_show::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #d10d0d;
  border-radius: 4px;
}
</style>
