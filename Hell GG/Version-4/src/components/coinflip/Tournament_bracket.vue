<template>
  <div class="px-4 w-[90rem] 2xl:w-full min-w-[83rem] min-h-[14rem]">
    <div class="max-h-[40rem] flex items-center justify-center w-full">
      <div class="container">
        <div class="tournament-bracket tournament-bracket--rounded">
          <div
            v-for="(round, roundIndex) in tournamentRounds"
            :key="roundIndex"
            class="tournament-bracket__round"
            :class="round.class"
          >
            <div class="tournament-bracket__list gap-y-7">
              <div
                v-for="(match, matchIndex) in round.matches"
                :key="matchIndex"
                class="tournament-bracket__item"
              >
                <div class="tournament-bracket__match">
                  <div
                    class="tournament-bracket__table rotate-90 flex flex-col gap-y-2 items-center justify-center min-w-[10rem] max-h-[7rem] relative"
                  >
                    <div
                      v-if="roundIndex == 2 && match.state == 'finished'"
                      class="absolute"
                      :class="{ 'right-full mr-6': matchIndex == 1, 'left-full': matchIndex == 0 }"
                    >
                      <div
                        class="flex items-center gap-1 font-Rubik text-sm font-semibold text-[#C18738]"
                      >
                        <img src="../../assets/img/cups/bronze.png" class="h-6 w-6" />
                        $68(17%)
                      </div>
                    </div>

                    <div
                      v-if="!hide_view_button"
                      className="text-white text-sm font-bold -mt-2 mb-1 font-['Rubik'] leading-normal"
                    >
                      $100.00
                    </div>
                    <div
                      class="flex items-center justify-between w-full px-2.5"
                      :class="hide_view_button ? '-mt-8' : 'mt-0'"
                    >
                      <div
                        v-if="roundIndex == 3 && match.state == 'finished'"
                        class="absolute"
                        :class="{
                          'left-full': !match.players[0].win,
                          'right-full mr-6': match.players[0].win
                        }"
                      >
                        <div
                          class="flex items-center gap-1 font-Rubik text-sm font-semibold text-[#FFBF14]"
                        >
                          <img src="../../assets/img/cups/gold.png" class="h-6 w-6" />
                          $160(40%)
                        </div>
                      </div>
                      <div
                        v-if="roundIndex == 3 && match.state == 'finished'"
                        class="absolute"
                        :class="{
                          'left-full': !match.players[1].win,
                          'right-full mr-6': match.players[1].win
                        }"
                      >
                        <div
                          class="flex items-center gap-1 font-Rubik text-sm font-semibold text-[#D1C8BD]"
                        >
                          <img src="../../assets/img/cups/silver.png" class="h-6 w-6" />
                          $104(26%)
                        </div>
                      </div>
                      <div
                        v-if="match.players[0]"
                        class="flex items-center gap-4 relative"
                        :class="{
                          'opacity-40': !match.players[0].win && match.state == 'finished'
                        }"
                      >
                        <div class="relative flex items-center transition-opacity duration-200">
                          <img
                            :src="`/img/coins/${match.players[0].coin}.svg`"
                            class="w-[1.5rem] absolute border-[2px] border-[#740c0a] rounded-full -right-3"
                          />
                          <div
                            class="w-9 h-9 rounded-sm bg-no-repeat bg-center bg-cover"
                            :style="{
                              backgroundImage: `url(${match.players[0].avatar})`
                            }"
                          ></div>
                        </div>
                      </div>
                      <div v-else-if="roundIndex == 0">
                        <button
                          class="w-[45px] h-7 px-2.5 py-2 bg-[#04ab53] justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-bold font-['Rubik'] leading-tight"
                        >
                          JOIN
                        </button>
                      </div>
                      <div
                        v-else
                        class="relative hover:scale-105 transform transition-all duration-200 rounded-full"
                      >
                        <div
                          class="w-9 h-9 rounded-full relative bg-[rgb(255,52,53,0.2)] flex items-center justify-center"
                        >
                          <img src="../../assets/icons/questionMark.png" class="w-4 h-5" />
                          <img
                            src="../../assets/icons/questionMark.png"
                            class="opacity-20 absolute left-0 w-[9.63px] h-[11.98px] rotate-[-15deg] bottom-0 xl:bottom-1"
                          />
                          <img
                            src="../../assets/icons/questionMark.png"
                            class="opacity-20 absolute right-0.5 w-[9.63px] h-[11.98px] rotate-[15deg] top-0"
                          />
                        </div>
                      </div>

                      <CircleProgressBar
                        v-if="
                          (match.state == 'created' &&
                            match.players.length == 2 &&
                            secondsLeft > 0) ||
                          (match.state == 'in_progress' && secondsLeft > 0) ||
                          (match.state == 'finished' && secondsLeft > 0)
                        "
                        :value="secondsLeft"
                        :max="
                          match.state == 'created' ? 30 : match.state == 'in_progress' ? 10 : 30
                        "
                        size="35"
                        :colorUnfilled="match.state == 'in_progress' ? '#04AB53' : '#FF3435'"
                        :colorBack="
                          match.state == 'in_progress' ? 'rgb(4,171,83,0.2)' : '#FF343533'
                        "
                        :startAngle="0"
                        strokeWidth="15"
                        ><span
                          class="font-bold font-Rubik text-white text-[10px] w-full h-full flex items-center justify-center rounded-full pl-0.5 pt-0.5 -z-10"
                          >{{ secondsLeft }}</span
                        ></CircleProgressBar
                      >
                      <span v-else class="text-[#d7b7b7] text-sm font-bold font-['Rubik'] mx-1">
                        VS
                      </span>
                      <div
                        v-if="match.players[1]"
                        class="flex items-center gap-4"
                        :class="{
                          'opacity-40': !match.players[1].win && match.state == 'finished'
                        }"
                      >
                        <div class="relative flex items-center transition-opacity duration-200">
                          <img
                            :src="`/img/coins/${match.players[1].coin}.svg`"
                            class="w-[1.5rem] absolute border-[2px] border-[#740c0a] rounded-full -left-3"
                          />
                          <div
                            class="w-9 h-9 rounded-sm bg-no-repeat bg-center bg-cover"
                            :style="{
                              backgroundImage: `url(${match.players[1].avatar})`
                            }"
                          ></div>
                        </div>
                      </div>
                      <div v-else-if="roundIndex == 0">
                        <button
                          class="w-[45px] h-7 px-2.5 py-2 bg-[#04ab53] justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-bold font-['Rubik'] leading-tight"
                        >
                          JOIN
                        </button>
                      </div>
                      <div
                        v-else
                        class="relative hover:scale-105 transform transition-all duration-200 rounded-full"
                      >
                        <div
                          class="w-9 h-9 rounded-full relative bg-[rgb(255,52,53,0.2)] flex items-center justify-center"
                        >
                          <img src="../../assets/icons/questionMark.png" class="w-4 h-5" />
                          <img
                            src="../../assets/icons/questionMark.png"
                            class="opacity-20 absolute left-0 w-[9.63px] h-[11.98px] rotate-[-15deg] bottom-0 xl:bottom-1"
                          />
                          <img
                            src="../../assets/icons/questionMark.png"
                            class="opacity-20 absolute right-0.5 w-[9.63px] h-[11.98px] rotate-[15deg] top-0"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      v-if="match.state != 'in_progress' && !hide_view_button"
                      class="w-[138px] h-7 pl-2.5 pr-3 py-2 bg-[#ff3435] justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-bold font-['Rubik'] leading-tight"
                    >
                      VIEW
                    </button>
                    <button
                      v-else-if="!hide_view_button"
                      class="w-[138px] h-7 pl-2.5 pr-3 py-2 bg-[#04ab53] justify-center items-center gap-0.5 inline-flex overflow-hidden text-white text-sm font-bold font-['Rubik'] leading-tight"
                    >
                      <PlayCircleIcon class="w-[17px] h-[17px] fill-white" /> WATCH
                    </button>
                  </div>
                </div>
                <div
                  v-if="matchIndex % 2 != 0 && roundIndex == 0 && matchIndex != 7"
                  :class="hide_view_button ? 'left-14' : 'left-10'"
                  class="h-px w-10 absolute left-10 top-full mt-3.5 bg-[#ff3435]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="../../assets/css/tournament_bracket.css" />
<script>
import { PlayCircleIcon } from '@heroicons/vue/24/solid'
import { CircleProgressBar } from 'circle-progress.vue'
export default {
  props: {
    hide_view_button: { type: Boolean, default: false }
  },
  data() {
    return {
      secondsLeft: 10,
      tournamentRounds: [
        {
          title: 'round of 16',
          class: 'tournament-bracket__round--quarterfinals',
          matches: [
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'finished'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'finished'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
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
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
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
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
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
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
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
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            }
          ]
        },
        {
          title: 'Quarterfinals',
          class: 'tournament-bracket__round--quarterfinals',
          matches: [
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'finished'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'finished'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            }
          ]
        },
        {
          title: 'Semifinals',
          class: 'tournament-bracket__round--semifinals',
          matches: [
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            },
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            }
          ]
        },
        {
          title: 'gold medal game',
          class: 'tournament-bracket__round--gold',
          matches: [
            {
              date: '1998-02-18',
              players: [
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: true,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                },
                {
                  name: 'tester heaven',
                  avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                  coin: 'heaven',
                  win: false,
                  items: [
                    {
                      name: 'AK-47',
                      image:
                        'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                      price: 1,
                      id: 1
                    }
                  ],
                  total: 1077,
                  state: 'created'
                }
              ],
              state: 'finished'
            }
          ]
        }
      ]
    }
  },
  components: {
    PlayCircleIcon,
    CircleProgressBar
  },
  methods: {
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
      //   if (this.battle.state === 'finished') {
      //     this.secondsLeft = this.time
      //   } else {
      //     this.secondsLeft = this.maxTime
      //   }

      this.intervalId = setInterval(() => {
        if (this.secondsLeft > 0) {
          this.secondsLeft--
        } else {
          clearInterval(this.intervalId)
          this.intervalId = null
        }
      }, 1000)
    }
  },
  mounted() {
    this.startCountdown()
  },
  beforeUnmount() {
    this.stopCountdown()
  },
  watch: {
    //   'battle.state'(newState, oldState) {
    //     if (newState === 'in_progress') {
    //       this.restartCountdown(10)
    //     } else if (newState === 'created') {
    //       this.restartCountdown(30)
    //     } else if (newState === 'finished') {
    //       this.restartCountdown(this.time)
    //     } else {
    //       this.stopCountdown()
    //     }
    //   }
  }
}
</script>
