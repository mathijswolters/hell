<template>
  <div
    class="relative max-w-[98vw] 2xl:max-w-[1466px] 2xl:w-[1466px] w-full flex-col transform transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[#530000] border max-h-[93vh] 2xl:max-h-full h-full"
  >
    <!-- Header Start -->
    <div
      class="flex w-full flex-wrap py-4 sm:py-0 sm:h-[50px] items-center px-4 border-b border-[hsl(0,98%,19%)] gap-x-4"
    >
      <span
        class="font-Rubik font-bold text-white text-base flex items-center gap-2 h-full"
      >
        HISTORY
      </span>
      <!-- Check boxes -->
      <div class="flex items-center gap-x-4 h-full">
        <label
          v-for="option in options"
          :key="option.value"
          class="flex items-center relative pl-6 cursor-pointer text-base select-none radio"
        >
          <input
            type="radio"
            v-model="selectedOption"
            :value="option.value"
            @click="current_page = 1"
          />
          <span class="checkmark"></span>
          <span class="text-base font-Rubik text-white font-bold">{{
            option.label
          }}</span>
        </label>
      </div>
      <XMarkIcon
        class="w-6 h-6 absolute right-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
        @click="closeModal()"
      />
    </div>
    <!-- Header End -->
    <!-- Body Start -->
    <div class="flex items-center pt-4 flex-col gap-2 px-4">
      <!-- controls start -->
      <div
        class="w-full flex items-center justify-center sm:justify-between flex-wrap gap-2"
      >
        <!-- Left -->
        <div
          class="flex items-center w-full max-w-[397px] justify-center sm:justify-start"
        >
          <div
            class="relative max-w-[397px] w-full flex items-center rounded-sm h-[46px]"
          >
            <input
              type="text"
              class="h-full rounded-sm px-2 pr-2 w-full bg-[#620101] font-Rubik placeholder:font-Rubik placeholder:text-[rgb(255,255,255,0.5)] text-white placeholder:text-base text-base placeholder:font-bold focus:outline-none z-20"
              placeholder="SEARCH BY GAME ID, PLAYER NAME..."
              v-model="searchQuery"
              :class="{ 'rounded-b-none': searchQuery != '' }"
            />
            <button
              class="absolute right-2 h-[32px] bg-[#FF3435] text-white rounded-sm px-1 font-Rubik font-bold text-base z-20"
            >
              FIND
            </button>
            <div
              class="absolute w-full bg-[#620101] left-0 transition-all z-10 top-0 overflow-hidden duration-200 rounded-b-sm search"
              :class="{
                ' h-0    mt-0 ': searchQuery == '',
                'w-full h-56  mt-[46px]   ': searchQuery != '' && +searchQuery != ' ',
              }"
            >
              <div class="h-full overflow-auto">
                <div
                  v-for="item in searchFilteredHistory"
                  :key="item._id"
                  class="text-white mt-2 rounded-sm hover:bg-[#E82D2E] min-h-[46px] h-[46px] px-2 flex items-center cursor-pointer gap-x-2"
                >
                  <UserImage v-if="searchedPlayer(item)" :user="searchedPlayer(item)" />
                  <span
                    v-if="searchedPlayer(item)"
                    class="font-Rubik font-bold text-base text-white"
                    >{{ searchedPlayer(item).name }}</span
                  >
                  <UserImage v-if="!searchedPlayer(item)" :user="item.players[0]" />
                  <span
                    v-if="!searchedPlayer(item)"
                    class="font-Rubik font-bold text-base text-white"
                    >{{ item.players[0].name }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right -->
        <div
          class="flex items-center justify-center whitespace-nowrap h-[32px] relative"
          ref="dropdownContainer"
        >
          <button
            class="h-full bg-[#FF3435] text-white rounded-sm px-2 font-Rubik font-bold text-base flex items-center gap-x-2 outline-none"
            @click="toggleDropdown('date')"
          >
            SORT BY DATE
            <ChevronDownIcon
              class="w-4 stroke-white transition-all"
              :class="{ '-rotate-180': dropdown == 'date', 'z-20': dropdown != 'date' }"
            />
          </button>
          <div
            class="absolute bg-[#420101] rounded-md border border-solid border-[#620101] sm:right-0 transition-all flex items-center justify-center"
            :class="{
              'w-0 h-0 opacity-0 top-0  mt-0 -z-10': dropdown != 'date',
              'md:w-[387px] w-[300px] h-[345px] opacity-100 top-full mt-1.5 z-10': dropdown == 'date',
            }"
          >
            <DatePicker
              :class="{
                'opacity-0': dropdown != 'date',
                'opacity-100 transition-opacity duration-500': dropdown == 'date',
              }"
            />
          </div>
        </div>
      </div>
      <!-- controls end -->
      <div
        class="flex w-full max-w-full items-center flex-col pt-4 min-h-[6rem] h-full overflow-x-auto"
      >
        <div class="w-full overflow-y-auto max-h-[50vh] 2xl:max-h-[70vh] overflow-x-auto">
          <!--table start-->
          <div class="flex flex-col w-[1432px] items-start">
            <!-- title start -->
            <div
              class="grid gap-x-2 grid-cols-[repeat(16,minmax(0,1fr))] items-start h-[28px] w-full border-b border-solid border-[#620101]"
            >
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-center">
                GAME ID
              </div>
              <div class="text-center font-Rubik text-[#d7b7b7] text-sm font-semibold">
                TYPE
              </div>
              <div
                class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-left bg-red col-span-2"
              >
                STATUS
              </div>
              <div
                class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-left col-span-3"
              >
                WINNER
              </div>
              <div
                class="col-span-3 font-Rubik text-[#d7b7b7] text-sm font-semibold text-left"
              >
                ITEMS
              </div>
              <div
                class="col-span-2 font-Rubik text-[#d7b7b7] text-sm font-semibold text-left"
              >
                TOTAL
              </div>
              <div
                class="text-left font-Rubik text-[#d7b7b7] text-sm font-semibold col-span-2"
              >
                DATE
              </div>
              <div class="text-end font-Rubik text-[#d7b7b7] text-sm font-semibold"></div>
            </div>
            <!-- title end -->
            <!-- table start -->
            <div
              class="transition-all duration-200 overflow-auto w-full flex flex-col"
              :class="{
                'h-[17rem] ': rows_per_page == 5,
                'h-full sm:h-[34rem]': rows_per_page != 5,
              }"
            >
              <div
                class="grid gap-x-2 grid-cols-[repeat(16,minmax(0,1fr))] items-center min-h-[54px] h-[54px] w-full border-b border-solid border-[#620101]"
                v-for="item in paginatedData"
                :key="item._id"
              >
                <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-center">
                  #{{ item._id }}
                </div>
                <div
                  class="text-center font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center justify-center"
                >
                  <img
                    v-if="item.type === 'coinflip' || item.type == 'tournament'"
                    src="/img/icons/coinflip.svg"
                  />

                  <img v-if="item.type === 'jackpot'" src="/img/icons/jackpot.svg" />
                </div>
                <div
                  class="font-Rubik text-sm font-semibold text-left bg-red col-span-2 uppercase"
                  :class="{
                    'text-[#d7b7b7]': item.state == 'in_progress',
                    'text-[#04AA53]': item.state == 'completed',
                    'text-[#FF3435]': item.state == 'canceled',
                    'text-[#FEBD11]':
                      item.state == 'spinning' || item.state == 'flipping',
                  }"
                >
                  {{ item.state == "in_progress" ? "IN PROGRESS" : item.state }}
                </div>
                <div
                  class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-left col-span-3 relative h-full items-center flex gap-x-2"
                >
                  <div
                    class="h-[36px] bg-[#FF3435] w-px opacity-20 absolute right-2"
                  ></div>
                  <div
                    v-if="
                      (item.state === 'in_progress' || item.state === 'spinning') &&
                      item.type == 'jackpot'
                    "
                    class="relative rounded-full"
                  >
                    <div
                      class="w-[35px] h-[35px] rounded-full relative bg-[rgb(255,52,53,0.2)] flex items-center justify-center"
                    >
                      <img
                        src="../assets/icons/questionMark.png"
                        class="w-[13.58px] h-[17.5px]"
                      />
                      <img
                        src="../assets/icons/questionMark.png"
                        class="opacity-20 absolute left-0 w-[8.19px] h-[10.46px] rotate-[-15deg] bottom-1.5"
                      />
                      <img
                        src="../assets/icons/questionMark.png"
                        class="opacity-20 absolute right-0.5 w-[7.21px] h-[9.2px] rotate-[15deg] top-1"
                      />
                    </div>
                  </div>
                  <div v-if="item.type == 'coinflip'">
                    <div class="flex items-center justify-start w-full relative">
                      <div
                        v-if="item.players.length == 1 && item.state == 'canceled'"
                        class="flex items-center gap-2"
                      >
                        <div
                          class="relative flex items-center transition-opacity duration-200 order-1"
                        >
                          <img
                            :src="`/img/coins/${item.players[0].coin}.svg`"
                            class="w-[1.5rem] absolute border-[2px] border-[#740c0a] rounded-full -right-3 z-10"
                          />
                          <UserImage :user="item.players[0]" />
                        </div>
                      </div>
                      <div v-else class="flex items-center gap-4">
                        <div
                          class="relative flex items-center transition-opacity duration-200 order-1"
                          :class="{
                            'opacity-40 ':
                              !item.players[0].win && item.state == 'completed',
                          }"
                        >
                          <img
                            :src="`/img/coins/${item.players[0].coin}.svg`"
                            class="w-[1.5rem] absolute border-[2px] border-[#740c0a] rounded-full -right-3 z-10"
                          />
                          <UserImage :user="item.players[0]" />
                        </div>
                        <span
                          class="order-2 font-Rubik text-[#d7b7b7] text-sm font-semibold"
                          >VS</span
                        >
                        <div
                          class="relative flex items-center transition-opacity duration-200 order-3"
                          :class="{
                            'opacity-40':
                              !item.players[1].win && item.state == 'completed',
                          }"
                        >
                          <img
                            :src="`/img/coins/${item.players[1].coin}.svg`"
                            class="w-[1.5rem] absolute border-[2px] border-[#740c0a] rounded-full -left-3 z-10"
                          />
                          <UserImage :user="item.players[1]" />
                        </div>
                      </div>
                      <hr
                        class="absolute bg-[#ff3435] right-0 h-[36px] w-px opacity-30"
                      />
                    </div>
                  </div>
                  <span
                    v-if="
                      item.state === 'spinning' ||
                      (item.type == 'jackpot' && item.state == 'in_progress') ||
                      (item.type == 'tournament' && item.state === 'flipping')
                    "
                    class="text-[#D7B7B7] text-xs font-Rubik font-semibold"
                    >pending ...
                  </span>
                  <div
                    v-if="item.type == 'jackpot' && item.state == 'completed'"
                    class="flex items-center gap-x-1 text-sm"
                  >
                    <UserImage :user="item.players[0]" />
                    <img src="/img/ranks/21-25.png" class="max-w-5" />
                    <span class="text-white max-w-26 font-Rubik font-bold truncate">{{
                      item.players[0].name
                    }}</span>
                    <div
                      class="w-[20px] h-[20px] rounded-full"
                      :style="{
                        background: `conic-gradient(#04AB53 0% ${numb}%, rgb(4, 171, 83,0.35) ${numb}% 100%)`,
                      }"
                    ></div>
                    <span class="opacity-50 text-white font-bold font-Rubik text-sm"
                      >+12</span
                    >
                  </div>
                </div>
                <div
                  class="col-span-3 font-Rubik text-[#d7b7b7] text-sm font-semibold text-left relative h-full flex gap-2 w-full items-center overflow-hidden px-2"
                >
                  <div
                    class="absolute right-0.5 h-full top-0 w-1/2 bg-[linear-gradient(270deg,#420101_0%,rgba(69,4,6,0)100%)]"
                  ></div>
                  <img
                    v-for="item in item.players[0].items"
                    :key="item.id"
                    :src="item.image"
                    class="max-w-9"
                  />
                </div>
                <div
                  class="col-span-2 font-Rubik text-white text-base font-semibold text-left flex gap-x-2 items-center"
                >
                  <span class="font-Rubik font-semibold text-[#04AB53]">$</span>
                  {{
                    Number(calculateTotal(item.players)).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
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
                  class="text-left font-Rubik text-[#d7b7b7] text-xs font-medium uppercase col-span-2"
                >
                  {{ formatDateTime(item.date) }}
                </div>
                <div
                  class="text-end font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center justify-end col-span-2 gap-2"
                >
                  <button
                    class="h-8 bg-[#ff3435] px-4 text-white text-sm font-Rubik font-bold"
                  >
                    VIEW
                  </button>
                  <button
                    class="h-8 bg-[#04AA53] w-full text-white text-sm font-Rubik font-bold flex items-center justify-center gap-x-1.5"
                  >
                    <img src="../assets/icons/share.svg" class="w-4 h-4" />
                    SHARE
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
    <div
      class="flex flex-col sm:flex-row min-h-16 sm:h-16 items-center sm:justify-between md:justify-center w-full relative gap-4 py-4 px-4"
    >
      <div
        class="w-full order-2 sm:order-1 h-full flex items-center justify-center sm:justify-start"
      >
        <div
          class="flex gap-x-2 items-center text-[#d7b7b7] font-Rubik font-semibold text-xs"
        >
          Rows per page
          <span
            class="flex items-center gap-x-px text-white font-Rubik font-semibold text-xs cursor-pointer fill-[#d7b7b7] stroke-[#d7b7b7] relative"
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
      <!-- controls -->
      <div
        class="relative w-full sm:w-fit order-1 sm:order-2 md:w-fit md:absolute flex items-center justify-center sm:justify-end gap-x-2"
      >
        <button
          :disabled="current_page === 1"
          @click="changePage(current_page - 1)"
          class="flex gap-x-2 items-center stroke-white text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
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
              'text-white transition-all duration-200': current_page === page,
            }"
          >
            {{ page }}
          </button>
        </div>

        <button
          :disabled="current_page === totalPages"
          @click="changePage(current_page + 1)"
          class="flex items-center stroke-white gap-x-2 text-[#D7B7B7] font-semibold text-xs font-Rubik disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap"
        >
          Next Page <ChevronDoubleRightIcon class="w-4" />
        </button>
      </div>
    </div>
    <!-- Footer End -->
  </div>
</template>

<script>
import {
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronUpDownIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid";
import UserImage from "./UserImage.vue";
import DatePicker from "./DatePicker.vue";
export default {
  data() {
    return {
      numb: 20,
      selectedOption: "all",
      options: [
        { label: "ALL", value: "all" },
        { label: "COINFLIP", value: "coinflip" },
        { label: "JACKPOT", value: "jackpot" },
        { label: "TOURNAMENT", value: "tournament" },
      ],
      history: [
        {
          type: "coinflip",
          _id: 3,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-16T17:05",
          state: "in_progress",
        },
        {
          type: "coinflip",
          _id: 32,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
              win: true,
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-16T18:05",
          state: "completed",
        },
        {
          type: "coinflip",
          _id: 325,
          players: [
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-16T18:28",
          state: "canceled",
        },
        {
          type: "coinflip",
          _id: 6,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "flipping",
        },
        {
          type: "jackpot",
          _id: 7,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "in_progress",
        },
        {
          type: "jackpot",
          _id: 8,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "completed",
        },
        {
          type: "jackpot",
          _id: 9,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "canceled",
        },
        {
          type: "jackpot",
          _id: 10,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "spinning",
        },
        {
          type: "jackpot",
          _id: 8,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "completed",
        },
        {
          type: "jackpot",
          _id: 9,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "canceled",
        },
        {
          type: "jackpot",
          _id: 10,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "qusai",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "spinning",
        },
        {
          type: "tournament",
          _id: 33,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "qusai",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "flipping",
        },
      ],
      searchQuery: "",
      dropdown: null,

      rows_dropdown: false,
      rows_per_page: 10,
      current_page: 1,
      rows_options: [10, 20, 30],
      maxVisiblePages: 5,
      //   user_in_page: false
    };
  },
  methods: {
    searchedPlayer(item) {
      const query = this.searchQuery.toLowerCase();
      return (
        item.players.find((player) =>
          player.name.toLowerCase().includes(query.toLowerCase())
        ) || null
      );
    },
    closeModal() {
      this.$emit("close-modal");
    },
    toggleTab(text) {
      this.tab = text;
      this.current_page = 1;
    },
    toggleDropdown(name) {
      this.dropdown = this.dropdown === name ? null : name;
    },
    handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdownContainer;
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.dropdown = null;
      }
    },
    formatDateTime(dateString) {
      const now = new Date();
      const targetDate = new Date(dateString);
      const diffInSeconds = Math.floor((now - targetDate) / 1000);

      // Conditions for relative time
      if (diffInSeconds < 60) {
        return "a minute ago";
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
      } else if (diffInSeconds < 172800) {
        return "a day ago";
      }

      // Fallback: Format fixed date for older entries
      return targetDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.current_page = page;
      }
    },
    calculateTotal(players) {
      let value = 0;
      players.forEach((player) => {
        player.items.forEach((item) => {
          value += item.price;
        });
      });
      return value;
    },
    updatePagination() {
      this.current_page = 1;
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  },
  components: {
    XMarkIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronUpDownIcon,
    ChevronDownIcon,
    DatePicker,
    UserImage,
  },
  computed: {
    filteredHistory() {
      let arr = [];
      if (this.selectedOption == "all") {
        arr = this.history;
      } else if (this.selectedOption == "jackpot") {
        this.history.forEach((item) => {
          if (item.type == "jackpot") {
            arr.push(item);
          }
        });
      } else if (this.selectedOption == "coinflip") {
        this.history.forEach((item) => {
          if (item.type == "coinflip") {
            arr.push(item);
          }
        });
      } else if (this.selectedOption == "tournament") {
        this.history.forEach((item) => {
          if (item.type == "tournament") {
            arr.push(item);
          }
        });
      }
      return arr;
    },
    searchFilteredHistory() {
      if (!this.searchQuery) return this.filteredHistory;

      const query = this.searchQuery.toLowerCase();

      return this.filteredHistory.filter((entry) => {
        const matchGameId = entry._id.toString().includes(query);

        const matchPlayers = entry.players.some((player) =>
          player.name.toLowerCase().includes(query)
        );

        return matchGameId || matchPlayers;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredHistory.length / this.rows_per_page);
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.rows_per_page;
      const end = start + this.rows_per_page;
      return this.filteredHistory.slice(start, end);
    },
    visiblePages() {
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = Math.max(1, this.current_page - half);
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

      // Adjust start if we're near the end
      if (end - start < this.maxVisiblePages - 1) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
};
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
  content: "";
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
  background: #d10d0d;
}
.search ::-webkit-scrollbar-thumb {
  /* width: 2rem; */

  background: #ff3435;
  border-radius: 4px;
}
</style>
