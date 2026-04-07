<template>
  <div class="relative w-full flex-col transform transition-all">
    <!-- Body Start -->
    <div class="flex items-center flex-col gap-2">
      <!-- controls start -->
      <div class="w-full flex items-center gap-2 lg:gap-4 justify-between lg:flex-wrap">
        <!-- Left -->
        <div class="flex items-center w-full md:w-auto">
          <div class="relative w-full md:w-[380px] flex items-center rounded-sm h-[46px]">
            <input
              type="text"
              class="h-full rounded-sm px-2 pr-2 w-full bg-[#620101] font-Rubik placeholder:font-Rubik placeholder:text-[rgb(255,255,255,0.5)] text-white placeholder:text-base text-base placeholder:font-bold focus:outline-none z-20"
              placeholder="SEARCH GAME ID, GAME TYPE ..."
              v-model="searchQuery"
            />
            <button
              class="absolute right-2 h-[32px] bg-[#FF3435] text-white rounded-sm px-1 font-Rubik font-bold text-base z-20"
            >
              FIND
            </button>
          </div>
        </div>
        <!-- Right -->
        <div class="hidden md:flex items-center h-[32px] relative" ref="dropdownContainer">
          <div class="w-full h-full flex items-center justify-start">
            <div
              class="flex gap-x-4 items-center text-[#d7b7b7] font-Rubik font-semibold text-base bg-[rgba(98,1,1,1)] rounded-sm h-12 px-2"
            >
              NUMBER OF ROWS PER PAGE
              <span
                class="flex items-center rounded-sm w-12 h-8 bg-[rgba(255,52,53,1)] text-white font-Rubik font-semibold text-xs cursor-pointer fill-white stroke-white relative text-center justify-center"
                @click="rows_dropdown = !rows_dropdown"
              >
                {{ rows_per_page }} <ChevronUpDownIcon class="w-4" />
                <div
                  v-if="rows_dropdown"
                  class="w-full absolute left-0 mb-1 top-full bg-[#620101] z-20 flex flex-col"
                >
                  <div
                    v-for="(item, index) in rows_options"
                    :key="index"
                    @click="rows_per_page = item"
                    class="cursor-pointer py-1 hover:bg-[#E82D2E] w-full uppercase text-center justify-center"
                  >
                    {{ item }}
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- controls end -->
      <div class="flex w-full items-center flex-col pt-3 min-h-[6rem] h-full">
        <div class="w-full overflow-y-auto max-h-[95vw] overflow-x-auto">
          <div class="flex flex-col w-[1432px] items-start">
            <!-- title start -->
            <div
              class="grid grid-cols-[repeat(7,minmax(0,1fr))] items-start h-[28px] w-full border-b border-solid border-[#620101]"
            >
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">GAME ID</div>
              <div class="text-start font-Rubik text-[#d7b7b7] text-sm font-semibold">
                GAME TYPE
              </div>
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start bg-red">
                STATUS
              </div>
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">
                BET AMMOUNT
              </div>
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">
                TOTAL WIN
              </div>
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">DATE</div>
              <div></div>
            </div>
            <!-- title end -->
            <!-- table start -->
            <div class="transition-all duration-200 overflow-auto w-full flex flex-col h-[34rem]">
              <div
                class="grid grid-cols-[repeat(7,minmax(0,1fr))] items-center min-h-[54px] h-[54px] w-full border-b border-solid border-[#620101]"
                v-for="item in paginatedData"
                :key="item._id"
              >
                <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-start">
                  #{{ item._id }}
                </div>
                <div
                  class="text-start font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center gap-x-2 uppercase"
                >
                  <img v-if="item.type === 'coinflip'" src="../../../assets/icons/coinflip.png" />

                  <img v-if="item.type === 'jackpot'" src="../../../assets/icons/jackpot.png" />
                  {{ item.type }}
                </div>
                <div
                  class="font-Rubik text-sm font-semibold text-left bg-red uppercase"
                  :class="{
                    'text-[#04AA53]': item.state == 'completed',
                    'text-[#FF3435]': item.state == 'canceled',
                    'text-[#FEBD11]':
                      item.state == 'spinning' ||
                      item.state == 'in_progress' ||
                      item.state == 'flipping'
                  }"
                >
                  {{ item.state == 'in_progress' ? 'IN PROGRESS' : item.state }}
                </div>

                <div
                  class="font-Rubik text-white text-base font-semibold text-left flex gap-x-2 items-center"
                >
                  <span class="font-Rubik font-semibold text-[#04AB53]">$</span>
                  {{
                    Number(calculateTotal(item.players)).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })
                  }}
                  <div
                    v-if="item.type === 'jackpot'"
                    class="font-Rubik text-white flex gap-x-2 items-center text-base font-semibold"
                  >
                    |
                    <span
                      class="font-Rubik text-white flex gap-x-2 items-center text-base font-semibold"
                      >18.12%</span
                    >
                  </div>
                </div>
                <div
                  class="font-Rubik text-white text-base font-semibold text-left flex gap-x-2 items-center"
                >
                  <span
                    v-if="item.state == 'completed' && item.total_win > 0"
                    class="font-Rubik font-semibold text-[#04AB53]"
                    >$
                    {{
                      Number(item.total_win).toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2
                      })
                    }}
                  </span>
                  <span
                    v-if="(item.state == 'completed' && item.total_win < 0) || item.total_win == 0"
                    class="text-[rgba(255,52,53,1)] font-Rubik text-base font-bold"
                  >
                    LOST
                  </span>
                  <span
                    v-if="item.state == 'canceled'"
                    class="text-[rgba(255,52,53,1)] font-Rubik text-base font-bold rotate-90"
                    >:(</span
                  >
                </div>
                <div class="text-left font-Rubik text-[#d7b7b7] text-xs font-medium uppercase">
                  {{ formatDateTime(item.date) }}
                </div>
                <div
                  class="text-end font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center justify-between"
                >
                  <div>
                    <button
                      v-if="item.state == 'completed' && item.total_win > 0"
                      class="h-8 bg-[rgba(4,171,83,1)] px-4 text-white text-[10px] font-Rubik font-bold"
                    >
                      RESEND TRADE
                    </button>
                    <button
                      v-if="item.state != 'completed' && item.state != 'canceled'"
                      class="h-8 bg-[#ff3435] px-4 text-white text-[10px] font-Rubik font-bold"
                    >
                      CANCEL
                    </button>
                    <span
                      v-if="
                        item.state == 'completed' && (item.total_win < 0 || item.total_win == 0)
                      "
                      class="text-[rgba(255,52,53,1)] font-Rubik text-base font-bold"
                    >
                      :(
                    </span>
                  </div>
                  <button class="h-8 bg-[#ff3435] px-4 text-white text-sm font-Rubik font-bold">
                    VIEW
                  </button>
                </div>
              </div>
            </div>

            <!-- table end -->
          </div>
        </div>
      </div>
    </div>
    <!-- Body End -->
    <!-- Footer Start -->
    <div class="flex h-16 items-center justify-center w-full relative">
      <!-- controls -->
      <div class="absolute flex items-center gap-x-2">
        <button
          :disabled="current_page === 1"
          @click="changePage(current_page - 1)"
          class="flex gap-x-2 items-center stroke-white text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ChevronDoubleLeftIcon class="w-4" /> Previous Page
        </button>
        <div class="flex items-center gap-x-2 w-28 justify-center">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="changePage(page)"
            class="text-[#D7B7B7] font-bold text-base transition-all duration-200 font-Rubik"
            :class="{
              'text-white transition-all duration-200': current_page === page
            }"
          >
            {{ page }}
          </button>
        </div>

        <button
          :disabled="current_page === totalPages"
          @click="changePage(current_page + 1)"
          class="flex items-center stroke-white gap-x-2 text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60"
        >
          Next Page <ChevronDoubleRightIcon class="w-4" />
        </button>
      </div>
    </div>
    <!-- number of rows per page in mobile  -->
    <div class="flex md:hidden w-full items-center justify-center">
      <div class="flex items-center h-[32px] relative" ref="dropdownContainer">
        <div class="w-full h-full flex items-center justify-start">
          <div
            class="flex gap-x-1 items-center text-[#d7b7b7] font-Rubik font-normal text-xs rounded-sm h-12 px-2"
          >
            ROWS PER PAGE
            <span
              class="flex items-center rounded-sm w-12 h-8 text-white font-Rubik font-semibold text-xs cursor-pointer fill-white stroke-white relative text-center justify-center"
              @click="rows_dropdown = !rows_dropdown"
            >
              {{ rows_per_page }} <ChevronUpDownIcon class="w-4" />
              <div
                v-if="rows_dropdown"
                class="w-full absolute left-0 mb-1 bottom-full bg-[#620101] z-20 flex flex-col"
              >
                <div
                  v-for="(item, index) in rows_options"
                  :key="index"
                  @click="rows_per_page = item"
                  class="cursor-pointer py-1 hover:bg-[#E82D2E] w-full uppercase text-center justify-center"
                >
                  {{ item }}
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer End -->
  </div>
</template>

<script>
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronUpDownIcon
} from '@heroicons/vue/24/solid'

export default {
  data() {
    return {
      numb: 20,
      selectedOption: 'all',
      options: [
        { label: 'ALL', value: 'all' },
        { label: 'COINFLIP', value: 'coinflip' },
        { label: 'JACKPOT', value: 'jackpot' }
      ],
      history: [
        {
          type: 'coinflip',
          _id: 3,
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
                  price: 300,
                  id: 1
                }
              ]
            },
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],

          date: '2024-12-16T17:05',
          state: 'in_progress'
        },
        {
          type: 'coinflip',
          _id: 32,
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
                  price: 300,
                  id: 1
                }
              ],
              win: true
            },
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],
          total_win: 10,
          date: '2024-12-16T18:05',
          state: 'completed'
        },
        {
          type: 'coinflip',
          _id: 325,
          players: [
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],
          date: '2024-12-16T18:28',
          state: 'canceled'
        },
        {
          type: 'coinflip',
          _id: 6,
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
                  price: 300,
                  id: 1
                }
              ]
            },
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],

          date: '2024-12-01T17:05',
          state: 'flipping'
        },
        {
          type: 'jackpot',
          _id: 7,
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
                  price: 300,
                  id: 1
                }
              ]
            },
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],

          date: '2024-12-01T17:05',
          state: 'in_progress'
        },
        {
          type: 'jackpot',
          _id: 8,
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
                  price: 300,
                  id: 1
                }
              ]
            },
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],
          total_win: 10,
          date: '2024-12-01T17:05',
          state: 'completed'
        },
        {
          type: 'jackpot',
          _id: 9,
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
                  price: 300,
                  id: 1
                }
              ]
            },
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],

          date: '2024-12-01T17:05',
          state: 'canceled'
        },
        {
          type: 'jackpot',
          _id: 10,
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
                  price: 300,
                  id: 1
                }
              ]
            },
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],

          date: '2024-12-01T17:05',
          state: 'spinning'
        },
        {
          type: 'jackpot',
          _id: 8,
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
                  price: 300,
                  id: 1
                }
              ]
            },
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],
          total_win: 0,
          date: '2024-12-01T17:05',
          state: 'completed'
        },
        {
          type: 'jackpot',
          _id: 9,
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
                  price: 300,
                  id: 1
                }
              ]
            },
            {
              name: 'tester hell',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],

          date: '2024-12-01T17:05',
          state: 'canceled'
        },
        {
          type: 'jackpot',
          _id: 10,
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
                  price: 300,
                  id: 1
                }
              ]
            },
            {
              name: 'qusai',
              avatar: 'https://images3.alphacoders.com/132/1320540.png',
              coin: 'hell',
              items: [
                {
                  name: 'AK-47',
                  image:
                    'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                  price: 59,
                  id: 1
                }
              ]
            }
          ],
          total_win: -10,
          date: '2024-12-01T17:05',
          state: 'completed'
        }
      ],
      searchQuery: '',
      dropdown: null,

      rows_dropdown: false,
      rows_per_page: 10,
      current_page: 1,
      rows_options: [10, 20, 30],
      maxVisiblePages: 5
      //   user_in_page: false
    }
  },
  methods: {
    searchedPlayer(item) {
      const query = this.searchQuery.toLowerCase()
      return (
        item.players.find((player) => player.name.toLowerCase().includes(query.toLowerCase())) ||
        null
      )
    },
    closeModal() {
      this.$emit('close-modal')
    },
    toggleTab(text) {
      this.tab = text
      this.current_page = 1
    },
    toggleDropdown(name) {
      this.dropdown = this.dropdown === name ? null : name
    },
    handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdownContainer
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.dropdown = null
      }
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
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.current_page = page
      }
    },
    calculateTotal(players) {
      let value = 0
      players.forEach((player) => {
        player.items.forEach((item) => {
          value += item.price
        })
      })
      return value
    },
    updatePagination() {
      this.current_page = 1
    }
  },
  mounted() {
    document.addEventListener('mousedown', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  },
  components: {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronUpDownIcon
  },
  computed: {
    searchFilteredHistory() {
      if (!this.searchQuery) return this.history

      const query = this.searchQuery.toLowerCase()

      return this.history.filter((entry) => {
        const matchGameId = entry._id.toString().includes(query)
        const matchType = entry.type.toString().includes(query)

        return matchGameId || matchType
      })
    },
    totalPages() {
      return Math.ceil(this.searchFilteredHistory.length / this.rows_per_page)
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.rows_per_page
      const end = start + this.rows_per_page
      return this.searchFilteredHistory.slice(start, end)
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
  background: #d10d0d;
  border-radius: 4px;
}

.radio input {
  position: absolute;
  opacity: 0; /* Hide the default radio button */
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 2px solid #ff3435;
}

.checkmark::after {
  content: '';
  position: absolute;
  /* display: none; */
  opacity: 0;
  left: 3px;
  top: -2px;
  height: 14px;
  width: 16px;
  /* width: 5px;
    height: 10px; */
  /* border: solid white; */
  /* border-width: 0 2px 2px 0;
    transform: rotate(45deg); */
  z-index: 2;
  background-image: url(../assets/img/tick.png);
  background-size: contain;
  transition: opacity ease-in-out 100ms;
}

.radio input:checked ~ .checkmark::after {
  /* display: block; */
  opacity: 1;
}
.search ::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
}
.search ::-webkit-scrollbar-track {
  background: #710101;
}
.search ::-webkit-scrollbar-thumb {
  /* width: 2rem; */

  background: #ff3435;
  border-radius: 4px;
}
</style>
