<template>
  <div
    class="relative max-w-[98vw] 2xl:max-w-[1466px] 2xl:w-[1466px] w-full flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border px-4"
  >
    <!-- Header Start -->
    <div
      class="flex justify-center w-full h-[59px] items-center px-4 border-b border-[#620101]"
    >
      <span class="font-Rubik font-extrabold text-white text-2xl flex items-center gap-2">
        <img src="@/assets/icons/cup.svg" class="w-[44px]" />
        HALL OF FAME <img src="@/assets/icons/cup.svg" class="w-[44px]"
      /></span>
      <XMarkIcon
        class="w-6 h-6 absolute right-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
        @click="closeModal()"
      />
    </div>
    <!-- Header End -->
    <!-- Body Start -->
    <div class="flex items-center pt-4 flex-col gap-2">
      <!-- Buttons start -->
      <div class="hidden 2xl:flex flex-col items-center w-full gap-y-2 flex-wrap">
        <div
          v-for="(group, groupIndex) in buttonGroups"
          :key="groupIndex"
          class="flex items-center justify-center w-full gap-2 whitespace-nowrap flex-wrap"
        >
          <button
            v-for="(button, index) in group"
            :key="index"
            class="px-[8px] rounded-sm h-[36px] bg-[#620101] border-solid border-[#ff3435] border text-sm font-Rubik font-medium text-white"
            :class="{ 'bg-[#ff3435]': tab === button.value }"
            @click="toggleTab(button)"
          >
            {{ button.label }}
          </button>
        </div>
      </div>
      <div
        class="flex 2xl:hidden w-full justify-between items-center gap-x-2 relative font-Rubik font-semibold text-sm text-white cursor-pointer select-none px-3 bg-[#770303CC] h-[40px] uppercase"
        @click="toggleDropdown('tab selection')"
      >
        <div
          class="flex w-full font-Rubik font-semibold text-sm text-white items-center justify-between"
        >
          {{ selected_tab }}
          <ChevronDownIcon
            class="w-[12px] stroke-[#ff3435] transition-transform fill-[#ff3435]"
            :class="{ '-rotate-180': openedDropdown == 'tab selection' }"
          />
        </div>

        <div
          class="absolute w-full top-full left-0 bg-[#620101] z-20 flex flex-wrap gap-2 items-start dropdown_menu dropdown_menu-1 transition-all overflow-y-auto"
          :class="{
            'h-0 opacity-0': openedDropdown != 'tab selection',
            'h-[10rem] opacity-100': openedDropdown == 'tab selection',
          }"
        >
          <div
            v-for="(group, groupIndex) in buttonGroups"
            :key="groupIndex"
            class="flex flex-col items-center justify-start w-full gap-2 whitespace-nowrap"
          >
            <button
              v-for="(button, index) in group"
              :key="index"
              class="p-2 cursor-pointer text-left hover:bg-[#E82D2E] w-full uppercase"
              :class="{ 'bg-[#ff3435]': tab === button.value }"
              @click="toggleTab(button)"
            >
              {{ button.label }}
            </button>
          </div>
        </div>
      </div>
      <!-- Buttons end -->
      <div class="flex w-full items-center flex-col pt-4 min-h-[6rem] h-full">
        <div class="w-full overflow-y-auto h-auto max-h-[57vh] overflow-x-auto">
          <div
            class="flex flex-col gap-y-2 w-[1432px] items-start"
            :key="tab + '-' + current_page"
          >
            <!-- title start -->
            <div
              v-if="tab === 'biggest_coinflip_win'"
              class="grid grid-cols-[repeat(17,minmax(0,1fr))] items-start h-[22px] w-full border-b border-solid border-[#620101]"
            >
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-left pl-2">
                RANK
              </div>
              <div
                class="col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold"
              >
                WINNER
              </div>
              <div
                class="col-span-1 text-center font-Rubik text-[#d7b7b7] text-sm font-semibold"
              ></div>
              <div
                class="col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold"
              >
                LOSER
              </div>
              <div
                class="col-span-4 font-Rubik text-[#d7b7b7] text-sm font-semibold text-left"
              >
                ITEMS
              </div>
              <div
                class="col-span-2 font-Rubik text-[#d7b7b7] text-sm font-semibold text-center"
              >
                WON AMOUNT
              </div>
              <div
                class="col-span-2 font-Rubik text-[#d7b7b7] text-sm font-semibold text-center"
              >
                GAME ID
              </div>
              <div
                class="col-span-2 col-start-16 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold"
              >
                DATE
              </div>
              <div
                class="col-span-1 text-center font-Rubik text-[#d7b7b7] text-sm font-semibold"
              ></div>
            </div>
            <div
              v-else
              class="grid grid-cols-[repeat(14,minmax(0,1fr))] items-start h-[22px] w-full border-b border-solid border-[#620101]"
            >
              <div class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-left pl-2">
                RANK
              </div>
              <div
                class="col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold"
              >
                PLAYER NAME
              </div>
              <div
                v-if="tab === 'highest_double_down_win_streak'"
                class="col-span-2"
              ></div>
              <div
                v-if="tab !== 'highest_double_down_win_streak'"
                class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-left"
                :class="{
                  'col-span-5':
                    tab === 'highest_coinflip_win_streak' ||
                    tab === 'highest_coinflip_loss_streak' ||
                    tab === 'most_gambled' ||
                    tab === 'most_skins_gambled' ||
                    tab === 'most_won' ||
                    tab === 'most_lost' ||
                    tab === 'most_profit',
                  'col-span-4':
                    tab === 'most_double_tab_downs' ||
                    tab === 'highest_jackpot_win_streak' ||
                    tab === 'biggest_jackpot_win',
                  'col-span-6':
                    tab !== 'biggest_jackpot_win' &&
                    tab !== 'highest_coinflip_win_streak' &&
                    tab !== 'highest_coinflip_loss_streak' &&
                    tab !== 'most_gambled' &&
                    tab !== 'most_skins_gambled' &&
                    tab !== 'most_won' &&
                    tab !== 'most_lost' &&
                    tab !== 'most_profit' &&
                    tab !== 'most_double_tab_downs',
                  'col-span-7':
                    (tab === 'highest_jackpot_win_streak' &&
                      tab === 'highest_24H_profit') ||
                    tab === 'highest_24H_lost' ||
                    tab === 'most_jackpot_entries' ||
                    tab === 'most_coinflip_created' ||
                    tab === 'most_coinflip_joined',
                }"
              >
                {{
                  tab == "biggest_coinflip_win" || tab == "biggest_jackpot_win"
                    ? "ITEMS"
                    : tab == "highest_double_down_win_streak"
                    ? ""
                    : tab == "highest_coinflip_win_streak" ||
                      tab == "highest_coinflip_loss_streak" ||
                      tab == "most_coinflip_wins"
                    ? "AVERAGE COINFLIP AMOUNT"
                    : tab == "most_jackpot_wins"
                    ? "AVERAGE JACKPOT AMOUNT"
                    : tab == "most_gambled" || tab == "most_skins_gambled"
                    ? "AVERAGE GAMBLING AMOUNT"
                    : tab == "highest_24H_profit" || tab == "highest_24H_lost"
                    ? "AVERAGE GAMBLED AMOUNT"
                    : ""
                }}
              </div>
              <div
                style="white-space: nowrap"
                class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-center"
                :class="{
                  'col-span-2':
                    tab === 'highest_coinflip_win_streak' ||
                    tab === 'highest_coinflip_loss_streak' ||
                    tab === 'most_gambled' ||
                    tab === 'most_skins_gambled' ||
                    tab === 'most_won' ||
                    tab === 'most_lost' ||
                    tab === 'most_profit' ||
                    tab === 'highest_24H_profit' ||
                    tab === 'highest_24H_lost' ||
                    tab === 'most_coinflip_created' ||
                    tab === 'most_coinflip_joined' ||
                    tab === 'most_double_tab_downs' ||
                    tab == 'most_jackpot_entries' ||
                    tab === 'biggest_jackpot_win' ||
                    tab === 'highest_double_down_win_streak',
                  'col-span-3':
                    tab === 'highest_average_coinflip_amount' ||
                    tab === 'highest_average_jackpot_join_amount' ||
                    tab === 'highest_average_jackpot_bet_amount' ||
                    tab === 'biggest_pussy',
                }"
              >
                {{
                  tab == "biggest_coinflip_win"
                    ? "WON AMOUNT"
                    : tab == "biggest_jackpot_win"
                    ? "BET AMOUNT"
                    : tab == "highest_coinflip_win_streak"
                    ? "WIN STREAKS"
                    : tab == "highest_coinflip_loss_streak"
                    ? "LOST STREAKS"
                    : tab == "most_coinflip_wins" || tab == "most_jackpot_wins"
                    ? "TOTAL WON"
                    : tab == "most_gambled"
                    ? "TOTAL GAMBLED"
                    : tab == "most_skins_gambled"
                    ? "TOTAL SKINS GAMBLED"
                    : tab == "most_won"
                    ? "MOST OVERALL WON"
                    : tab == "most_lost"
                    ? "MOST OVERALL LOST"
                    : tab == "most_profit"
                    ? "MOST OVERALL PROFIT"
                    : tab == "highest_24H_profit"
                    ? "HIGHEST PROFIT"
                    : tab == "highest_24H_lost"
                    ? "HIGHEST LOST"
                    : tab == "highest_average_coinflip_amount"
                    ? "HIGHEST AVERAGE CREATION/JOIN AMOUNT"
                    : tab == "highest_average_jackpot_bet_amount"
                    ? "HIGHEST AVERAGE JACKPOT BET AMOUNT"
                    : tab == "highest_average_jackpot_join_amount"
                    ? "HIGHEST AVERAGE JACKPOT JOIN AMOUNT"
                    : tab == "most_coinflip_created"
                    ? "MOST COINFLIPS CREATED"
                    : tab == "most_coinflip_joined"
                    ? "MOST COINFLIPS JOINED"
                    : tab == "most_double_tab_downs"
                    ? "DOUBLE DOWNS"
                    : tab == "highest_double_down_win_streak" ||
                      tab == "highest_jackpot_win_streak"
                    ? "WIN STREAK"
                    : tab == "most_jackpot_entries"
                    ? "JACKPOT ENTRIES"
                    : "BIGGEST COINFLIPS CANCELLED"
                }}
              </div>
              <div
                class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-center"
                v-if="tab != 'biggest_pussy'"
                :class="{
                  'col-span-2':
                    tab === 'highest_coinflip_win_streak' ||
                    tab === 'highest_coinflip_loss_streak' ||
                    tab === 'most_coinflip_wins' ||
                    tab === 'most_jackpot_wins' ||
                    tab === 'most_gambled' ||
                    tab === 'most_skins_gambled' ||
                    tab === 'most_won' ||
                    tab === 'most_lost' ||
                    tab === 'most_profit' ||
                    tab == 'highest_24H_profit' ||
                    tab == 'highest_24H_lost' ||
                    tab === 'highest_average_coinflip_amount' ||
                    tab === 'highest_average_jackpot_bet_amount' ||
                    tab === 'highest_average_jackpot_join_amount' ||
                    tab === 'most_jackpot_entries',
                  'col-span-3':
                    tab === 'most_double_tab_downs' ||
                    tab === 'highest_double_down_win_streak' ||
                    tab === 'highest_jackpot_win_streak',
                }"
              >
                {{
                  tab == "biggest_coinflip_win"
                    ? "GAME ID"
                    : tab == "biggest_jackpot_win" || tab == "highest_coinflip_win_streak"
                    ? "WON AMOUNT"
                    : tab == "highest_coinflip_loss_streak"
                    ? "LOST AMOUNT"
                    : tab == "most_coinflip_wins" ||
                      tab == "most_jackpot_wins" ||
                      tab == "most_gambled" ||
                      tab == "most_skins_gambled"
                    ? "TOTAL WON AMOUNT"
                    : tab == "most_won" ||
                      tab == "most_lost" ||
                      tab == "most_profit" ||
                      tab == "highest_24H_profit" ||
                      tab == "highest_24H_lost" ||
                      tab == "highest_average_coinflip_amount"
                    ? "TOTAL PLAYED"
                    : tab == "highest_average_jackpot_join_amount"
                    ? "TOTAL JOINED"
                    : tab == "highest_average_jackpot_bet_amount"
                    ? "TOTAL PLAYED"
                    : tab == "most_coinflip_created" || tab == "most_coinflip_joined"
                    ? "WON"
                    : tab == "most_double_tab_downs" ||
                      tab == "highest_double_down_win_streak"
                    ? "AVERAGE DOUBLE DOWN AMOUNT"
                    : tab == "highest_jackpot_win_streak"
                    ? "HIGHEST JACKPOT WON"
                    : tab == "most_jackpot_entries"
                    ? "TIME PERIOD"
                    : ""
                }}
              </div>
              <div
                style="white-space: nowrap"
                class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-center"
                v-if="
                  tab == 'biggest_jackpot_win' ||
                  tab == 'most_coinflip_created' ||
                  tab == 'most_coinflip_joined' ||
                  tab == 'most_double_tab_downs' ||
                  tab == 'highest_jackpot_win_streak' ||
                  tab == 'highest_double_down_win_streak'
                "
                :class="{
                  'col-span-2': tab === 'most_double_tab_downs',
                  'col-span-3':
                    tab == 'highest_jackpot_win_streak' ||
                    tab == 'highest_double_down_win_streak',
                }"
              >
                {{
                  tab == "biggest_jackpot_win"
                    ? "GAME ID"
                    : tab == "most_coinflip_created" || tab == "most_coinflip_joined"
                    ? "LOST"
                    : tab == "most_double_tab_downs"
                    ? "TOTAL PLAYED"
                    : tab == "highest_double_down_win_streak"
                    ? "TOTAL AMOUNT DOUBLE DOWNED"
                    : ""
                }}
              </div>
              <div
                class="col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold"
                v-if="
                  tab == 'biggest_jackpot_win' ||
                  tab == 'biggest_coinflip_win' ||
                  tab == 'highest_coinflip_loss_streak' ||
                  tab == 'highest_coinflip_win_streak' ||
                  tab == 'most_coinflip_wins' ||
                  tab == 'most_jackpot_wins' ||
                  tab == 'most_gambled' ||
                  tab == 'most_skins_gambled' ||
                  tab == 'most_won' ||
                  tab == 'most_lost' ||
                  tab == 'most_profit' ||
                  tab == 'biggest_pussy'
                "
              >
                DATE
              </div>
              <div
                v-if="
                  tab === 'biggest_coinflip_win' ||
                  tab === 'biggest_jackpot_win' ||
                  tab === 'highest_double_down_win_streak'
                "
              ></div>
            </div>
            <!-- title end -->
            <!-- table start -->
            <div
              class="transition-all duration-200 overflow-auto w-full flex flex-col gap-y-2"
              :class="{
                'h-[17rem] ': rows_per_page == 5,
                'h-[35rem]': rows_per_page != 5,
              }"
            >
              <div
                v-for="item in paginatedData"
                :key="item._id"
                class="w-full h-[48px] min-h-[48px] flex items-center justify-center p-px rounded-sm"
                :class="{
                  'bg-[linear-gradient(90deg,#EFBF04_25%,#580101_100%)]': item.rank === 1,
                  'bg-[linear-gradient(90deg,#C4C4C4_25%,#580101_100%)]': item.rank === 2,
                  'bg-[linear-gradient(90deg,#A87A23_25%,#580101_100%)]': item.rank === 3,
                  'bg-[linear-gradient(90deg,#A01A1B_0%,#580101_100%)]': item.rank > 3,
                }"
              >
                <div
                  v-if="tab === 'biggest_coinflip_win'"
                  class="grid grid-cols-[repeat(17,minmax(0,1fr))] gap-x-1 items-center w-full h-full rounded-sm"
                  :class="{
                    'bg-[linear-gradient(90deg,#750A0A_0%,#570000_100%)]': !checkUser(
                      item
                    ),
                    'bg-[#240101]': checkUser(item),
                  }"
                >
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold relative text-left pl-4"
                    :class="{
                      'text-[#EFBF04]': item.rank === 1,
                      'text-[#C4C4C4]': item.rank === 2,
                      'text-[#A87A23]': item.rank === 3,
                      'text-[#D7B7B7]': item.rank > 3,
                    }"
                  >
                    <div
                      class="absolute right-1 font-bold font-Rubik text-sm text-white"
                      v-if="checkUser(item)"
                    >
                      YOU
                    </div>
                    #{{ item.rank }}
                  </div>
                  <div
                    class="col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center gap-x-2 h-[calc(100%-12px)]"
                    :class="{
                      'text-[#EFBF04]': item.rank === 1,
                      'text-[#C4C4C4]': item.rank === 2,
                      'text-[#A87A23]': item.rank === 3,
                      'text-[#D7B7B7]': item.rank > 3,
                    }"
                  >
                    <div class="coin-img-cell">
                      <img src="/img/coins/hell.svg" class="coin-img" />
                      <img v-lazy="item.avatar" class="w-8 h-8 rounded-sm object-cover" />
                    </div>
                    ILOVEBREAD
                  </div>
                  <div
                    class="col-span-1 text-center font-Rubik text-sm font-semibold text-[#d7b7b7]"
                  >
                    VS
                  </div>
                  <div
                    class="opacity-50 col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold border-r-2 border-solid flex items-center gap-x-2 h-[calc(100%-12px)]"
                    :class="{
                      'border-[#EFBF04] text-[#EFBF04]': item.rank === 1,
                      'border-[#C4C4C4] text-[#C4C4C4]': item.rank === 2,
                      'border-[#A87A23] text-[#A87A23]': item.rank === 3,
                      'border-[rgb(255,52,53,0.3)] text-[#D7B7B7]': item.rank > 3,
                    }"
                  >
                    <div class="coin-img-cell">
                      <img src="/img/coins/heaven.svg" class="coin-img" />

                      <img v-lazy="item.avatar" class="w-8 h-8 rounded-sm object-cover" />
                    </div>
                    ILOVEBREAD
                  </div>
                  <div
                    class="col-span-4 font-Rubik text-[#d7b7b7] text-sm font-semibold text-left flex items-center gap-x-2 overflow-hidden pl-2"
                  >
                    <div
                      class="relative h-full flex gap-2 w-full items-center overflow-hidden"
                    >
                      <div
                        class="absolute right-0 h-full w-1/2"
                        :class="{
                          'bg-[linear-gradient(270deg,#660505_0%,rgba(102,5,5,0)_100%)]': !checkUser(
                            item
                          ),
                          'bg-[linear-gradient(270deg,#240101_0%,rgba(36,1,1,0))_100%)]': checkUser(
                            item
                          ),
                        }"
                      ></div>
                      <img
                        v-for="it in item.items"
                        :key="it.id"
                        :src="it.image"
                        class="max-w-9"
                      />
                    </div>
                  </div>
                  <div
                    class="col-span-2 font-Rubik text-[#d7b7b7] text-sm font-semibold flex gap-x-px justify-center items-center text-nowrap"
                  >
                    <span
                      class="font-Rubik text-xs font-bold flex gap-x-px"
                      :class="{
                        'text-[#EFBF04]': item.rank === 1,
                        'text-[#C4C4C4]': item.rank === 2,
                        'text-[#A87A23]': item.rank === 3,
                        'text-[#D7B7B7]': item.rank > 3,
                      }"
                      >${{
                        Number(item.won_amount).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}</span
                    >
                  </div>
                  <div
                    class="col-span-2 font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center gap-x-px justify-center"
                  >
                    <span
                      class="font-Rubik text-xs font-bold flex gap-x-px text-white opacity-50"
                      >#36524</span
                    >
                  </div>
                  <div
                    class="col-span-2 col-start-16 text-left font-Rubik text-white opacity-50 text-sm font-semibold"
                  >
                    22-11-2024 | 5m ago
                  </div>
                  <div class="col-span-1 flex items-center justify-center h-full">
                    <button
                      class="flex items-center justify-center px-4 h-9 bg-[#FF3435] rounded-sm text-white font-Rubik font-bold text-sm"
                    >
                      VIEW
                    </button>
                  </div>
                </div>
                <div
                  v-else
                  class="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-x-1 items-center w-full h-full rounded-sm"
                  :class="{
                    'bg-[linear-gradient(90deg,#750A0A_0%,#570000_100%)]': !checkUser(
                      item
                    ),
                    'bg-[#240101]': checkUser(item),
                  }"
                >
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold relative text-left pl-4"
                    :class="{
                      'text-[#EFBF04]': item.rank === 1,
                      'text-[#C4C4C4]': item.rank === 2,
                      'text-[#A87A23]': item.rank === 3,
                      'text-[#D7B7B7]': item.rank > 3,
                    }"
                  >
                    <div
                      class="absolute right-1 font-bold font-Rubik text-sm text-white"
                      v-if="checkUser(item)"
                    >
                      YOU
                    </div>
                    #{{ item.rank }}
                  </div>
                  <div
                    class="col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold border-r-2 border-solid flex items-center gap-x-2 h-[calc(100%-12px)]"
                    :class="{
                      'border-[#EFBF04] text-[#EFBF04]': item.rank === 1,
                      'border-[#C4C4C4] text-[#C4C4C4]': item.rank === 2,
                      'border-[#A87A23] text-[#A87A23]': item.rank === 3,
                      'border-[rgb(255,52,53,0.3)] text-[#D7B7B7]': item.rank > 3,
                    }"
                  >
                    <img v-lazy="item.avatar" class="w-8 h-8 rounded-sm object-cover" />
                    {{ item.name }}
                  </div>
                  <div
                    v-if="tab === 'highest_double_down_win_streak'"
                    class="col-span-2"
                  ></div>
                  <div
                    v-if="tab !== 'highest_double_down_win_streak'"
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-left flex items-center gap-x-2 overflow-hidden pl-2"
                    :class="{
                      'col-span-5':
                        tab === 'highest_coinflip_win_streak' ||
                        tab === 'highest_coinflip_loss_streak' ||
                        tab === 'most_gambled' ||
                        tab === 'most_skins_gambled' ||
                        tab === 'most_won' ||
                        tab === 'most_lost' ||
                        tab === 'most_profit',
                      'col-span-4':
                        tab === 'most_double_tab_downs' ||
                        tab === 'highest_jackpot_win_streak' ||
                        tab === 'biggest_jackpot_win',
                      'col-span-6':
                        tab !== 'biggest_jackpot_win' &&
                        tab !== 'highest_coinflip_win_streak' &&
                        tab !== 'highest_coinflip_loss_streak' &&
                        tab !== 'most_gambled' &&
                        tab !== 'most_skins_gambled' &&
                        tab !== 'most_won' &&
                        tab !== 'most_lost' &&
                        tab !== 'most_profit' &&
                        tab !== 'most_double_tab_downs',
                      'col-span-7':
                        (tab === 'highest_jackpot_win_streak' &&
                          tab === 'highest_24H_profit') ||
                        tab === 'highest_24H_lost' ||
                        tab === 'most_jackpot_entries' ||
                        tab === 'most_coinflip_created' ||
                        tab === 'most_coinflip_joined',
                    }"
                  >
                    <div
                      class="relative h-full flex gap-2 w-full items-center overflow-hidden"
                      v-if="tab == 'biggest_coinflip_win' || tab == 'biggest_jackpot_win'"
                    >
                      <div
                        class="absolute right-0 h-full w-1/2"
                        :class="{
                          'bg-[linear-gradient(270deg,#660505_0%,rgba(102,5,5,0)_100%)]': !checkUser(
                            item
                          ),
                          'bg-[linear-gradient(270deg,#240101_0%,rgba(36,1,1,0))_100%)]': checkUser(
                            item
                          ),
                        }"
                      ></div>
                      <img
                        v-for="item in item.items"
                        :key="item.id"
                        :src="item.image"
                        class="max-w-9"
                      />
                    </div>
                    <span
                      v-if="
                        tab == 'highest_coinflip_win_streak' ||
                        tab == 'highest_coinflip_loss_streak' ||
                        tab == 'most_coinflip_wins' ||
                        tab == 'most_jackpot_wins' ||
                        tab == 'most_gambled' ||
                        tab == 'most_skins_gambled' ||
                        tab == 'highest_24H_profit' ||
                        tab == 'highest_24H_lost'
                      "
                      class="font-Rubik text-sm font-bold"
                      :class="{
                        'text-[#EFBF04]': item.rank === 1,
                        'text-[#C4C4C4]': item.rank === 2,
                        'text-[#A87A23]': item.rank === 3,
                        'text-[#D7B7B7]': item.rank > 3,
                      }"
                      >$
                      {{
                        Number(
                          tab == "highest_coinflip_win_streak" ||
                            tab == "highest_coinflip_loss_streak" ||
                            tab == "most_coinflip_wins"
                            ? item.average_coinflip_amount
                            : tab == "most_jackpot_wins"
                            ? item.average_jackpot_amount
                            : tab == "most_gambled"
                            ? item.average_gambling_amount
                            : tab == "most_skins_gambled"
                            ? item.average_gambling_amount
                            : tab == "highest_24H_profit" || tab == "highest_24H_lost"
                            ? item.average_gambled_amount
                            : ""
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                    </span>
                  </div>
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold flex gap-x-px justify-center items-center text-nowrap"
                    :class="{
                      'col-span-2':
                        tab === 'highest_coinflip_win_streak' ||
                        tab === 'highest_coinflip_loss_streak' ||
                        tab === 'most_gambled' ||
                        tab === 'most_skins_gambled' ||
                        tab === 'most_won' ||
                        tab === 'most_lost' ||
                        tab === 'most_profit' ||
                        tab === 'highest_24H_profit' ||
                        tab === 'highest_24H_lost' ||
                        tab === 'most_coinflip_created' ||
                        tab === 'most_coinflip_joined' ||
                        tab === 'most_double_tab_downs' ||
                        tab == 'most_jackpot_entries' ||
                        tab === 'biggest_jackpot_win' ||
                        tab === 'highest_double_down_win_streak',
                      'col-span-3':
                        tab === 'highest_average_coinflip_amount' ||
                        tab === 'highest_average_jackpot_bet_amount' ||
                        tab === 'highest_average_jackpot_join_amount' ||
                        tab === 'biggest_pussy',
                    }"
                  >
                    <img
                      v-if="item.rank === 1 && tab !== 'biggest_jackpot_win'"
                      src="@/assets/img/cups/gold.png"
                      class="w-6 h-6"
                    />

                    <img
                      v-if="item.rank === 2 && tab !== 'biggest_jackpot_win'"
                      src="@/assets/img/cups/silver.png"
                      class="w-6 h-6"
                    />

                    <img
                      v-if="item.rank === 3 && tab !== 'biggest_jackpot_win'"
                      src="@/assets/img/cups/bronze.png"
                      class="w-6 h-6"
                    />
                    <span
                      v-if="
                        tab === 'biggest_coinflip_win' ||
                        tab === 'biggest_jackpot_win' ||
                        tab == 'highest_24H_profit' ||
                        tab == 'highest_24H_lost' ||
                        tab == 'highest_average_coinflip_amount' ||
                        tab == 'most_profit' ||
                        tab == 'highest_average_jackpot_bet_amount' ||
                        tab == 'highest_average_jackpot_join_amount' ||
                        tab === 'biggest_pussy'
                      "
                      class="font-Rubik text-xs font-bold flex gap-x-px"
                      :class="{
                        'text-[#EFBF04]': item.rank === 1,
                        'text-[#C4C4C4]': item.rank === 2,
                        'text-[#A87A23]': item.rank === 3,
                        'text-[#D7B7B7]': item.rank > 3,
                      }"
                      >${{
                        Number(
                          tab === "biggest_coinflip_win"
                            ? item.won_amount
                            : tab === "biggest_jackpot_win"
                            ? item.bet_amount
                            : tab === "highest_24H_profit"
                            ? item.highest_profit
                            : tab === "highest_24H_lost"
                            ? item.highest_lost
                            : tab === "highest_average_jackpot_bet_amount"
                            ? item.highest_average_jackpot_bet_amount
                            : tab === "highest_average_jackpot_join_amount"
                            ? item.highest_average_jackpot_join_amount
                            : tab === "most_profit"
                            ? item.most_overall_profit
                            : tab === "biggest_pussy"
                            ? item.biggest_coinflips_cancelled
                            : ""
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                      <p
                        v-if="tab === 'biggest_jackpot_win'"
                        class="font-Rubik text-xs font-bold flex"
                      >
                        | 18.50%
                      </p>
                    </span>
                    <span
                      v-else
                      class="font-Rubik text-sm font-bold flex ml-1"
                      :class="{
                        'text-[#EFBF04]': item.rank === 1,
                        'text-[#C4C4C4]': item.rank === 2,
                        'text-[#A87A23]': item.rank === 3,
                        'text-[#D7B7B7]':
                          item.rank > 3 &&
                          (tab !== 'most_coinflip_created' ||
                            tab !== 'most_coinflip_joined'),
                        'text-[#FF3435]':
                          item.rank > 3 &&
                          (tab === 'most_coinflip_created' ||
                            tab === 'most_coinflip_joined'),
                      }"
                    >
                      {{
                        tab === "highest_coinflip_win_streak"
                          ? item.win_streak
                          : tab === "highest_coinflip_loss_streak"
                          ? item.lost_streak
                          : tab === "most_coinflip_wins" || tab === "most_jackpot_wins"
                          ? item.total_won
                          : tab === "most_gambled"
                          ? item.total_gambled
                          : tab === "most_skins_gambled"
                          ? item.total_gambled
                          : tab === "most_won"
                          ? item.most_overall_won
                          : tab === "most_lost"
                          ? item.most_overall_lost
                          : tab === "most_coinflip_created"
                          ? item.most_coinflips_created
                          : tab === "most_coinflip_joined"
                          ? item.most_coinflips_joined
                          : tab === "most_double_tab_downs"
                          ? item.double_downs
                          : tab === "highest_double_down_win_streak"
                          ? item.win_streak
                          : tab === "highest_jackpot_win_streak"
                          ? item.win_streak
                          : tab === "most_jackpot_entries"
                          ? item.jackpot_entries
                          : ""
                      }}
                    </span>
                  </div>
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center gap-x-px justify-center"
                    v-if="tab != 'biggest_pussy'"
                    :class="{
                      'col-span-2':
                        tab === 'highest_coinflip_win_streak' ||
                        tab === 'highest_coinflip_loss_streak' ||
                        tab === 'most_coinflip_wins' ||
                        tab === 'most_jackpot_wins' ||
                        tab === 'most_gambled' ||
                        tab === 'most_skins_gambled' ||
                        tab === 'most_won' ||
                        tab === 'most_lost' ||
                        tab === 'most_profit' ||
                        tab == 'highest_24H_profit' ||
                        tab == 'highest_24H_lost' ||
                        tab === 'highest_average_coinflip_amount' ||
                        tab === 'highest_average_jackpot_bet_amount' ||
                        tab === 'highest_average_jackpot_join_amount' ||
                        tab === 'most_jackpot_entries',
                      'col-span-3':
                        tab === 'most_double_tab_downs' ||
                        tab === 'average_double_down_amount' ||
                        tab === 'highest_double_down_win_streak' ||
                        tab === 'highest_jackpot_win_streak',
                    }"
                  >
                    <img
                      v-if="item.rank === 1 && tab === 'biggest_jackpot_win'"
                      src="@/assets/img/cups/gold.png"
                      class="w-6 h-6"
                    />

                    <img
                      v-if="item.rank === 2 && tab === 'biggest_jackpot_win'"
                      src="@/assets/img/cups/silver.png"
                      class="w-6 h-6"
                    />

                    <img
                      v-if="item.rank === 3 && tab === 'biggest_jackpot_win'"
                      src="@/assets/img/cups/bronze.png"
                      class="w-6 h-6"
                    />
                    <span
                      v-if="tab === 'biggest_coinflip_win'"
                      class="font-Rubik text-xs font-bold flex gap-x-px text-white opacity-50"
                      >#{{ item.game_id }}</span
                    >
                    <span
                      v-else-if="
                        tab === 'biggest_jackpot_win' ||
                        tab === 'highest_coinflip_win_streak' ||
                        tab === 'highest_coinflip_loss_streak' ||
                        tab === 'most_coinflip_wins' ||
                        tab === 'most_jackpot_wins' ||
                        tab === 'most_gambled' ||
                        tab === 'most_skins_gambled' ||
                        tab === 'most_double_tab_downs' ||
                        tab === 'average_double_down_amount' ||
                        tab === 'highest_double_down_win_streak' ||
                        tab === 'highest_jackpot_win_streak'
                      "
                      class="font-Rubik text-sm font-bold flex gap-x-px"
                      :class="{
                        'text-[#EFBF04]': item.rank === 1 && tab !== 'most_gambled',
                        'text-[#C4C4C4]': item.rank === 2 && tab !== 'most_gambled',
                        'text-[#A87A23]': item.rank === 3 && tab !== 'most_gambled',
                        'text-[#D7B7B7]': item.rank > 3 && tab !== 'most_gambled',
                        'text-white': tab === 'most_gambled',
                        'text-xs': tab === 'biggest_jackpot_win',
                      }"
                    >
                      ${{
                        Number(
                          tab === "biggest_jackpot_win" ||
                            tab === "highest_coinflip_win_streak" ||
                            tab === "most_coinflip_wins" ||
                            tab === "average_double_down_amount" ||
                            tab === "most_jackpot_wins" ||
                            tab === "most_skins_gambled" ||
                            tab === "most_gambled"
                            ? item.won_amount
                            : tab === "highest_coinflip_loss_streak"
                            ? item.lost_ammount
                            : tab === "most_double_tab_downs"
                            ? item.average_double_down_amount
                            : tab === "highest_jackpot_win_streak"
                            ? item.average_double_down_amount
                            : ""
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                    </span>
                    <span
                      v-else
                      class="font-Rubik text-xs font-bold flex gap-x-px"
                      :class="{
                        'text-[#EFBF04]':
                          item.rank === 1 &&
                          tab !== 'most_coinflip_joined' &&
                          tab !== 'most_coinflip_created',
                        'text-[#C4C4C4]':
                          item.rank === 2 &&
                          tab !== 'most_coinflip_joined' &&
                          tab !== 'most_coinflip_created',
                        'text-[#A87A23]':
                          item.rank === 3 &&
                          tab !== 'most_coinflip_joined' &&
                          tab !== 'most_coinflip_created',
                        'text-[#D7B7B7]':
                          item.rank > 3 &&
                          tab !== 'most_coinflip_joined' &&
                          tab !== 'most_coinflip_created',
                        'text-[#04AB53]':
                          tab === 'most_coinflip_joined' ||
                          tab === 'most_coinflip_created',
                      }"
                    >
                      {{
                        tab === "highest_average_jackpot_bet_amount"
                          ? item.total_joined
                          : tab === "highest_average_jackpot_join_amount"
                          ? item.total_joined
                          : tab === "most_double_tab_downs"
                          ? item.average_double_down_amount
                          : tab == "most_coinflip_created" ||
                            tab === "most_coinflip_joined"
                          ? item.won
                          : tab == "most_jackpot_entries"
                          ? item.time_period
                          : item.total_played
                      }}
                    </span>
                  </div>
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold justify-center"
                    v-if="
                      tab == 'biggest_jackpot_win' ||
                      tab == 'most_coinflip_created' ||
                      tab == 'most_coinflip_joined' ||
                      tab == 'most_double_tab_downs' ||
                      tab == 'highest_double_down_win_streak' ||
                      tab == 'highest_jackpot_win_streak'
                    "
                    :class="{
                      'col-span-3': tab === 'most_double_tab_downs',
                      'col-span-3':
                        tab == 'highest_double_down_win_streak' ||
                        tab == 'highest_double_down_win_streak' ||
                        tab == 'highest_jackpot_win_streak',
                    }"
                  >
                    <span
                      v-if="tab === 'biggest_jackpot_win'"
                      class="font-Rubik text-xs font-bold flex gap-x-px text-white opacity-50 justify-center"
                      >#{{ item.game_id }}</span
                    >
                    <span
                      v-else-if="tab === 'highest_double_down_win_streak'"
                      class="font-Rubik text-sm font-bold flex gap-x-px justify-center"
                      :class="{
                        'text-[#EFBF04]':
                          item.rank === 1 &&
                          tab !== 'most_gambled' &&
                          tab !== 'most_skins_gambled',
                        'text-[#C4C4C4]':
                          item.rank === 2 &&
                          tab !== 'most_gambled' &&
                          tab !== 'most_skins_gambled',
                        'text-[#A87A23]':
                          item.rank === 3 &&
                          tab !== 'most_gambled' &&
                          tab !== 'most_skins_gambled',
                        'text-white':
                          item.rank > 3 &&
                          tab !== 'most_gambled' &&
                          tab !== 'most_skins_gambled',
                      }"
                    >
                      ${{
                        Number(item.total_amount_double_downed).toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          }
                        )
                      }}
                    </span>
                    <span
                      v-else
                      class="font-Rubik text-xs font-bold flex gap-x-px justify-center"
                      :class="{
                        'text-[#EFBF04]':
                          item.rank === 1 && tab === 'most_double_tab_downs',
                        'text-[#C4C4C4]':
                          item.rank === 2 && tab === 'most_double_tab_downs',
                        'text-[#A87A23]':
                          item.rank === 3 && tab === 'most_double_tab_downs',
                        'text-[#D7B7B7]':
                          item.rank > 3 && tab === 'most_double_tab_downs',
                        'text-[#FF3435]': tab !== 'most_double_tab_downs',
                      }"
                    >
                      {{
                        tab === "most_double_tab_downs" ? item.total_played : item.lost
                      }}
                    </span>
                  </div>
                  <div
                    class="col-span-2 text-left font-Rubik text-white opacity-50 text-sm font-semibold"
                    v-if="
                      tab == 'biggest_jackpot_win' ||
                      tab == 'biggest_coinflip_win' ||
                      tab == 'highest_coinflip_loss_streak' ||
                      tab == 'highest_coinflip_win_streak' ||
                      tab == 'most_coinflip_wins' ||
                      tab == 'most_jackpot_wins' ||
                      tab == 'most_gambled' ||
                      tab == 'most_skins_gambled' ||
                      tab == 'most_won' ||
                      tab == 'most_lost' ||
                      tab == 'most_profit' ||
                      tab == 'biggest_pussy'
                    "
                  >
                    {{ formatDateTime(item.date).relativeTime }} &nbsp;
                    {{ formatDateTime(item.date).formattedDate }}
                  </div>
                  <div
                    v-if="
                      tab === 'biggest_coinflip_win' ||
                      tab === 'biggest_jackpot_win' ||
                      tab === 'highest_double_down_win_streak'
                    "
                    class="flex items-center justify-center h-full"
                  >
                    <button
                      class="flex items-center justify-center px-4 h-9 bg-[#FF3435] rounded-sm text-white font-Rubik font-bold text-sm"
                    >
                      VIEW
                    </button>
                  </div>
                </div>
              </div>
              <!-- the user rank  -->
              <div
                v-if="userData && !user_in_page"
                class="w-full h-[48px] min-h-[48px] flex items-center justify-center p-px rounded-sm bg-[linear-gradient(90deg,#A01A1B_0%,#580101_100%)]"
              >
                <div
                  v-if="tab === 'biggest_coinflip_win'"
                  class="grid grid-cols-[repeat(17,minmax(0,1fr))] gap-x-1 items-center w-full h-full rounded-sm bg-[#240101]"
                >
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold relative text-left pl-4"
                  >
                    <div class="absolute right-1 font-bold font-Rubik text-sm text-white">
                      YOU
                    </div>
                    #{{ userData.rank }}
                  </div>
                  <div
                    class="col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center gap-x-2 h-[calc(100%-12px)]"
                  >
                    <div class="coin-img-cell">
                      <img src="/img/coins/heaven.svg" class="coin-img" />

                      <img
                        v-lazy="userData.avatar"
                        class="w-8 h-8 rounded-sm object-cover"
                      />
                    </div>
                    ILOVEBREAD
                  </div>
                  <div
                    class="col-span-1 text-center font-Rubik text-sm font-semibold text-[#d7b7b7]"
                  ></div>
                  <div
                    class="opacity-50 col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold border-r-2 border-solid flex items-center gap-x-2 h-[calc(100%-12px)] border-[rgb(255,52,53,0.3)]"
                  >
                    <div class="coin-img-cell">
                      <img src="/img/coins/hell.svg" class="coin-img" />

                      <img
                        v-lazy="userData.avatar"
                        class="w-8 h-8 rounded-sm object-cover"
                      />
                    </div>
                    ILOVEBREAD
                  </div>
                  <div
                    class="col-span-4 font-Rubik text-[#d7b7b7] text-sm font-semibold text-left flex items-center gap-x-2 overflow-hidden pl-2"
                  >
                    <div
                      class="relative h-full flex gap-2 w-full items-center overflow-hidden"
                    >
                      <div
                        class="absolute right-0 h-full w-1/2 bg-[linear-gradient(270deg,#240101_0%,rgba(36,1,1,0)100%)]"
                      ></div>
                      <img
                        v-for="it in userData.items"
                        :key="it.id"
                        :src="it.image"
                        class="max-w-9"
                      />
                    </div>
                  </div>
                  <div
                    class="col-span-2 font-Rubik text-[#d7b7b7] text-sm font-semibold flex gap-x-px justify-center items-center text-nowrap"
                  >
                    <span
                      class="font-Rubik text-xs font-bold flex gap-x-px text-[#D7B7B7]"
                      >${{
                        Number(userData.won_amount).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}</span
                    >
                  </div>
                  <div
                    class="col-span-2 font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center gap-x-px justify-center"
                  >
                    <span
                      class="font-Rubik text-xs font-bold flex gap-x-px text-[#D7B7B7]"
                      >#36524</span
                    >
                  </div>
                  <div
                    class="col-span-2 col-start-16 text-left font-Rubik text-white opacity-50 text-sm font-semibold"
                  >
                    22-11-2024 | 5m ago
                  </div>
                  <div class="col-span-1 flex items-center justify-center h-full">
                    <button
                      class="flex items-center justify-center px-4 h-9 bg-[#FF3435] rounded-sm text-white font-Rubik font-bold text-sm"
                    >
                      VIEW
                    </button>
                  </div>
                </div>
                <div
                  v-else
                  class="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-x-1 items-center w-full h-full rounded-sm bg-[#240101]"
                >
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold relative text-left pl-4"
                  >
                    <div class="absolute right-1 font-bold font-Rubik text-sm text-white">
                      YOU
                    </div>
                    #{{ userData.rank }}
                  </div>
                  <div
                    class="col-span-2 text-left font-Rubik text-[#d7b7b7] text-sm font-semibold border-r-2 border-solid flex items-center gap-x-2 h-[calc(100%-12px)] border-[rgb(255,52,53,0.3)]"
                  >
                    <img
                      v-lazy="userData.avatar"
                      class="w-8 h-8 rounded-sm object-cover"
                    />
                    {{ userData.name }}
                  </div>
                  <div
                    v-if="tab === 'highest_double_down_win_streak'"
                    class="col-span-2"
                  ></div>
                  <div
                    v-if="tab !== 'highest_double_down_win_streak'"
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold text-left flex items-center gap-x-2 overflow-hidden pl-2"
                    :class="{
                      'col-span-5':
                        tab === 'highest_coinflip_win_streak' ||
                        tab === 'highest_coinflip_loss_streak' ||
                        tab === 'most_gambled' ||
                        tab === 'most_skins_gambled' ||
                        tab === 'most_won' ||
                        tab === 'most_lost' ||
                        tab === 'most_profit',
                      'col-span-4':
                        tab === 'most_double_tab_downs' ||
                        tab === 'highest_jackpot_win_streak' ||
                        tab === 'biggest_jackpot_win',
                      'col-span-6':
                        tab !== 'biggest_jackpot_win' &&
                        tab !== 'highest_coinflip_win_streak' &&
                        tab !== 'highest_coinflip_loss_streak' &&
                        tab !== 'most_gambled' &&
                        tab !== 'most_skins_gambled' &&
                        tab !== 'most_won' &&
                        tab !== 'most_lost' &&
                        tab !== 'most_profit' &&
                        tab !== 'most_double_tab_downs',
                      'col-span-7':
                        tab === 'highest_24H_profit' ||
                        tab === 'highest_24H_lost' ||
                        tab === 'most_jackpot_entries' ||
                        tab === 'most_coinflip_created' ||
                        tab === 'most_coinflip_joined',
                    }"
                  >
                    <div
                      class="relative h-full flex gap-2 w-full items-center overflow-hidden"
                      v-if="tab == 'biggest_coinflip_win' || tab == 'biggest_jackpot_win'"
                    >
                      <div
                        class="absolute right-0 h-full w-1/2 bg-[linear-gradient(270deg,#240101_0%,rgba(36,1,1,0)100%)]"
                      ></div>
                      <img
                        v-for="item in userData.items"
                        :key="item.id"
                        :src="item.image"
                        class="max-w-9"
                      />
                    </div>
                    <span
                      v-if="
                        tab == 'highest_coinflip_win_streak' ||
                        tab == 'highest_coinflip_loss_streak' ||
                        tab == 'most_coinflip_wins' ||
                        tab == 'most_jackpot_wins' ||
                        tab == 'most_gambled' ||
                        tab == 'most_skins_gambled' ||
                        tab == 'highest_24H_profit' ||
                        tab == 'highest_24H_lost'
                      "
                      class="font-Rubik text-sm font-bold text-[#D7B7B7]"
                      >$
                      {{
                        Number(
                          tab == "highest_coinflip_win_streak" ||
                            tab == "highest_coinflip_loss_streak" ||
                            tab == "most_coinflip_wins"
                            ? userData.average_coinflip_amount
                            : tab == "most_jackpot_wins"
                            ? userData.average_jackpot_amount
                            : tab == "most_gambled"
                            ? userData.average_gambling_amount
                            : tab == "most_skins_gambled"
                            ? userData.average_gambling_amount
                            : tab == "highest_24H_profit" || tab == "highest_24H_lost"
                            ? userData.average_gambled_amount
                            : ""
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                    </span>
                    <div
                      v-if="tab === 'highest_double_down_win_streak'"
                      class="flex items-center justify-center h-full w-full"
                    >
                      <button
                        class="flex items-center justify-center px-4 h-9 bg-[#FF3435] rounded-sm text-white font-Rubik font-bold text-sm"
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold flex gap-x-px justify-center items-center text-nowrap"
                    :class="{
                      'col-span-2':
                        tab === 'highest_coinflip_win_streak' ||
                        tab === 'highest_coinflip_loss_streak' ||
                        tab === 'most_gambled' ||
                        tab === 'most_skins_gambled' ||
                        tab === 'most_won' ||
                        tab === 'most_lost' ||
                        tab === 'most_profit' ||
                        tab === 'highest_24H_profit' ||
                        tab === 'highest_24H_lost' ||
                        tab === 'most_coinflip_created' ||
                        tab === 'most_coinflip_joined' ||
                        tab == 'most_jackpot_entries' ||
                        tab === 'most_double_tab_downs' ||
                        tab === 'biggest_jackpot_win',
                      'col-span-3':
                        tab === 'highest_average_coinflip_amount' ||
                        tab === 'highest_average_jackpot_bet_amount' ||
                        tab === 'highest_average_jackpot_join_amount' ||
                        tab === 'biggest_pussy',
                    }"
                  >
                    <span
                      v-if="
                        tab === 'biggest_coinflip_win' ||
                        tab === 'biggest_jackpot_win' ||
                        tab == 'highest_24H_profit' ||
                        tab == 'highest_24H_lost' ||
                        tab == 'highest_average_coinflip_amount' ||
                        tab == 'highest_average_jackpot_bet_amount' ||
                        tab === 'highest_average_jackpot_join_amount' ||
                        tab === 'biggest_pussy'
                      "
                      class="font-Rubik text-xs font-bold flex gap-x-px text-[#D7B7B7]"
                      >${{
                        Number(
                          tab === "biggest_coinflip_win"
                            ? userData.won_amount
                            : tab === "biggest_jackpot_win"
                            ? userData.bet_amount
                            : tab === "highest_24H_profit"
                            ? userData.highest_profit
                            : tab === "highest_24H_lost"
                            ? userData.highest_lost
                            : tab === "highest_average_coinflip_amount"
                            ? userData.highest_average_coinflip_amount
                            : tab === "highest_average_jackpot_bet_amount"
                            ? userData.highest_average_jackpot_join_amount
                            : tab === "highest_average_jackpot_join_amount"
                            ? userData.highest_average_jackpot_join_amount
                            : tab === "biggest_pussy"
                            ? userData.biggest_coinflips_cancelled
                            : ""
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                      <p
                        v-if="tab === 'biggest_jackpot_win'"
                        class="font-Rubik text-xs font-bold flex"
                      >
                        | 18.50%
                      </p>
                    </span>
                    <span
                      v-else
                      class="font-Rubik text-sm font-bold flex ml-1"
                      :class="{
                        'text-[#D7B7B7]':
                          tab !== 'most_coinflip_created' ||
                          tab !== 'most_coinflip_joined',
                        'text-[#FF3435]':
                          tab === 'most_coinflip_created' ||
                          tab === 'most_coinflip_joined',
                      }"
                    >
                      {{
                        tab === "highest_coinflip_win_streak"
                          ? userData.win_streak
                          : tab === "highest_coinflip_loss_streak"
                          ? userData.lost_streak
                          : tab === "most_coinflip_wins" || tab === "most_jackpot_wins"
                          ? userData.total_won
                          : tab === "most_gambled"
                          ? userData.total_gambled
                          : tab === "most_skins_gambled"
                          ? userData.total_gambled
                          : tab === "most_won"
                          ? userData.most_overall_won
                          : tab === "most_lost"
                          ? userData.most_overall_lost
                          : tab === "most_profit"
                          ? userData.most_overall_profit
                          : tab === "most_coinflip_created"
                          ? userData.most_coinflips_created
                          : tab === "most_coinflip_joined"
                          ? userData.most_coinflips_joined
                          : tab === "most_double_tab_downs"
                          ? userData.average_double_down_amount
                          : tab === "highest_double_down_win_streak"
                          ? userData.win_streak
                          : tab === "highest_jackpot_win_streak"
                          ? userData.win_streak
                          : tab === "most_jackpot_entries"
                          ? userData.jackpot_entries
                          : ""
                      }}
                    </span>
                  </div>
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold flex items-center gap-x-px justify-center"
                    v-if="tab != 'biggest_pussy'"
                    :class="{
                      'col-span-2':
                        tab === 'highest_coinflip_win_streak' ||
                        tab === 'highest_coinflip_loss_streak' ||
                        tab === 'most_coinflip_wins' ||
                        tab === 'most_jackpot_wins' ||
                        tab === 'most_gambled' ||
                        tab === 'most_skins_gambled' ||
                        tab === 'most_won' ||
                        tab === 'most_lost' ||
                        tab === 'most_profit' ||
                        tab == 'highest_24H_profit' ||
                        tab == 'highest_24H_lost' ||
                        tab === 'highest_average_coinflip_amount' ||
                        tab === 'highest_average_jackpot_bet_amount' ||
                        tab === 'highest_average_jackpot_join_amount' ||
                        tab === 'biggest_pussy',
                      'col-span-3':
                        tab === 'most_double_tab_downs' ||
                        tab === 'highest_jackpot_win_streak' ||
                        tab === 'highest_double_down_win_streak',
                    }"
                  >
                    <span
                      v-if="tab === 'biggest_coinflip_win'"
                      class="font-Rubik text-xs font-bold flex gap-x-px text-white opacity-50"
                      >#{{ userData.game_id }}</span
                    >
                    <span
                      v-else-if="
                        tab === 'biggest_jackpot_win' ||
                        tab === 'highest_coinflip_win_streak' ||
                        tab === 'highest_coinflip_loss_streak' ||
                        tab === 'most_coinflip_wins' ||
                        tab === 'most_jackpot_wins' ||
                        tab === 'most_gambled' ||
                        tab === 'most_skins_gambled' ||
                        tab === 'highest_double_down_win_streak' ||
                        tab === 'highest_jackpot_win_streak'
                      "
                      class="font-Rubik text-sm font-bold flex gap-x-px"
                      :class="{
                        'text-[#D7B7B7]':
                          tab !== 'most_gambled' && tab !== 'most_skins_gambled',
                        'text-white':
                          tab === 'most_gambled' || tab === 'most_skins_gambled',
                        'text-xs': tab === 'biggest_jackpot_win',
                      }"
                    >
                      ${{
                        Number(
                          tab === "biggest_jackpot_win" ||
                            tab === "highest_coinflip_win_streak" ||
                            tab === "most_coinflip_wins" ||
                            tab === "most_jackpot_wins" ||
                            tab === "most_gambled" ||
                            tab === "most_skins_gambled"
                            ? userData.won_amount
                            : tab === "highest_coinflip_loss_streak"
                            ? userData.lost_ammount
                            : tab === "most_double_tab_downs"
                            ? userData.average_double_down_amount
                            : tab === "highest_double_down_win_streak"
                            ? userData.average_double_down_amount
                            : tab === "highest_jackpot_win_streak"
                            ? userData.average_double_down_amount
                            : ""
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                    </span>
                    <span
                      v-else
                      class="font-Rubik text-xs font-bold flex gap-x-px"
                      :class="{
                        'text-[#D7B7B7]':
                          tab !== 'most_coinflip_joined' &&
                          tab !== 'most_coinflip_created',
                        'text-[#04AB53]':
                          tab === 'most_coinflip_joined' ||
                          tab === 'most_coinflip_created',
                      }"
                    >
                      {{
                        tab === "highest_average_jackpot_bet_amount"
                          ? userData.total_joined
                          : tab === "highest_average_jackpot_join_amount"
                          ? userData.total_joined
                          : tab === "most_double_tab_downs"
                          ? item.average_double_down_amount
                          : tab == "most_coinflip_created" ||
                            tab === "most_coinflip_joined"
                          ? userData.won
                          : tab == "most_jackpot_entries"
                          ? userData.time_period
                          : userData.total_played
                      }}
                    </span>
                  </div>
                  <div
                    class="font-Rubik text-[#d7b7b7] text-sm font-semibold justify-center"
                    v-if="
                      tab == 'biggest_jackpot_win' ||
                      tab == 'most_coinflip_created' ||
                      tab == 'most_coinflip_joined' ||
                      tab == 'most_double_tab_downs' ||
                      tab == 'highest_jackpot_win_streak' ||
                      tab == 'highest_double_down_win_streak'
                    "
                    :class="{
                      'col-span-2': tab === 'most_double_tab_downs',
                      'col-span-3':
                        tab == 'highest_double_down_win_streak' ||
                        tab == 'highest_jackpot_win_streak',
                    }"
                  >
                    <span
                      v-if="tab === 'biggest_jackpot_win'"
                      class="font-Rubik text-xs font-bold flex gap-x-px text-white opacity-50 justify-center"
                      >#{{ userData.game_id }}</span
                    >
                    <span
                      v-else-if="tab === 'highest_double_down_win_streak'"
                      class="font-Rubik text-sm font-bold flex gap-x-px justify-center"
                      :class="{
                        'text-white': tab !== 'most_gambled',
                        'text-white': tab !== 'most_skins_gambled',
                      }"
                    >
                      ${{
                        Number(userData.total_amount_double_downed).toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          }
                        )
                      }}
                    </span>
                    <span
                      v-else
                      class="font-Rubik text-xs font-bold flex gap-x-px justify-center"
                      :class="{
                        'text-[#D7B7B7]': tab === 'most_double_tab_downs',
                        'text-[#FF3435]': tab !== 'most_double_tab_downs',
                      }"
                    >
                      {{
                        tab === "most_double_tab_downs"
                          ? userData.average_double_down_amount
                          : userData.lost
                      }}
                    </span>
                  </div>
                  <div
                    class="col-span-2 text-left font-Rubik text-white opacity-50 text-sm font-semibold"
                    v-if="
                      tab == 'biggest_jackpot_win' ||
                      tab == 'biggest_coinflip_win' ||
                      tab == 'highest_coinflip_loss_streak' ||
                      tab == 'highest_coinflip_win_streak' ||
                      tab == 'most_coinflip_wins' ||
                      tab == 'most_jackpot_wins' ||
                      tab == 'most_gambled' ||
                      tab == 'most_skins_gambled' ||
                      tab == 'most_won' ||
                      tab == 'most_lost' ||
                      tab == 'most_profit' ||
                      tab == 'biggest_pussy'
                    "
                  >
                    {{ formatDateTime(userData.date).relativeTime }} &nbsp;
                    {{ formatDateTime(userData.date).formattedDate }}
                  </div>
                  <div
                    v-if="
                      tab === 'biggest_coinflip_win' ||
                      tab === 'biggest_jackpot_win' ||
                      tab === 'highest_double_down_win_streak'
                    "
                    class="flex items-center justify-center h-full"
                  >
                    <button
                      class="flex items-center justify-center px-4 h-9 bg-[#FF3435] rounded-sm text-white font-Rubik font-bold text-sm"
                    >
                      VIEW
                    </button>
                  </div>
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
      v-if="this.tab != ''"
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
export default {
  data() {
    return {
      tab: "biggest_coinflip_win",
      rows_dropdown: false,
      rows_per_page: 10,
      current_page: 1,
      rows_options: [5, 10, 20, 30],
      maxVisiblePages: 5,
      openedDropdown: null,
      selected_tab: "Biggest Coinflip Win",
      buttonGroups: [
        [
          { label: "Biggest Coinflip Win", value: "biggest_coinflip_win" },
          { label: "Biggest Jackpot Win", value: "biggest_jackpot_win" },
          { label: "Highest Coinflip Win Streak", value: "highest_coinflip_win_streak" },
          {
            label: "Highest Coinflip Loss Streak",
            value: "highest_coinflip_loss_streak",
          },
          { label: "Most Coinflip Wins", value: "most_coinflip_wins" },
          { label: "Most Jackpot Wins", value: "most_jackpot_wins" },
          { label: "Most Gambled", value: "most_gambled" },
          { label: "Most Skins Gambled", value: "most_skins_gambled" },
          { label: "Most Won", value: "most_won" },
          { label: "Most Lost", value: "most_lost" },
          { label: "Highest Jackpot Win Streak", value: "highest_jackpot_win_streak" },
          { label: "Most Profit", value: "most_profit", type: "overall_profit" },
          { label: "Highest 24H Profit", value: "highest_24H_profit" },
          { label: "Highest 24H Lost", value: "highest_24H_lost" },
          {
            label: "Highest Average Coinflip Creation/Join Amount",
            value: "highest_average_coinflip_amount",
          },
          {
            label: "Highest Average Jackpot Bet Amount",
            value: "highest_average_jackpot_bet_amount",
          },
          {
            label: "Highest Average Jackpot Join Amount",
            value: "highest_average_jackpot_join_amount",
          },
          { label: "Most Coinflip Created", value: "most_coinflip_created" },
          { label: "Most Coinflip Joined", value: "most_coinflip_joined" },
          { label: "Most Double Downs", value: "most_double_tab_downs" },
          {
            label: "Highest Double Down Win Streak",
            value: "highest_double_down_win_streak",
            type: "flip_sequence",
          },
          { label: "Most Jackpot Entries", value: "most_jackpot_entries" },
          { label: "Biggest Pussy", value: "biggest_pussy" },
        ],
      ],

      user: {
        name: "qusai 2",
        avatar: "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
        _id: 2,
      },
      HOF: {
        biggest_coinflip_win: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            items: [
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
                price: 900,
                _id: 1,
              },
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
                price: 900,
                _id: 1,
              },
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
                price: 900,
                _id: 1,
              },
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
                price: 900,
                _id: 1,
              },

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
            ],
            won_amount: 15401,
            game_id: 1,
            date: "2024-12-08T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,
            items: [
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
            ],
            won_amount: 15400,
            game_id: 2,
            date: "2024-12-08T19:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            items: [
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
            ],
            won_amount: 1541,
            game_id: 3,
            date: "2024-12-08T20:00",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            items: [
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
            ],
            won_amount: 15401,
            game_id: 1,
            date: "2024-11-03T17:20",
          },
          {
            rank: 5,
            name: "qusai 5",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 5,
            items: [
              {
                name: "AK-47",
                image:
                  "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                price: 10,
                _id: 1,
              },
            ],
            won_amount: 15401,
            game_id: 5,
            date: "2024-12-08T17:20",
          },
          {
            rank: 6,
            name: "qusai 6",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 6,
            items: [
              {
                name: "AK-47",
                image:
                  "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                price: 10,
                _id: 1,
              },
            ],
            won_amount: 15401,
            game_id: 6,
            date: "2024-12-08T17:20",
          },
          {
            rank: 7,
            name: "qusai 7",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 7,
            items: [
              {
                name: "AK-47",
                image:
                  "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                price: 10,
                _id: 1,
              },
            ],
            won_amount: 15401,
            game_id: 7,
            date: "2024-12-08T17:20",
          },
          {
            rank: 8,
            name: "qusai 8",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 8,
            items: [
              {
                name: "AK-47",
                image:
                  "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                price: 10,
                _id: 1,
              },
            ],
            won_amount: 15401,
            game_id: 8,
            date: "2024-12-08T17:20",
          },
          {
            rank: 9,
            name: "qusai 9",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 9,
            items: [
              {
                name: "AK-47",
                image:
                  "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                price: 10,
                _id: 1,
              },
            ],
            won_amount: 15401,
            game_id: 9,
            date: "2024-12-08T17:20",
          },
          {
            rank: 10,
            name: "qusai 10",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 10,
            items: [
              {
                name: "AK-47",
                image:
                  "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                price: 10,
                _id: 1,
              },
            ],
            won_amount: 15401,
            game_id: 10,
            date: "2024-12-08T17:20",
          },
        ],
        biggest_jackpot_win: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            items: [
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
            ],
            bet_amount: 30000,
            won_amount: 15401,
            game_id: 1,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,
            items: [
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
            ],
            bet_amount: 30000,
            won_amount: 15400,
            game_id: 2,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            items: [
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
            ],
            bet_amount: 30000,
            won_amount: 1541,
            game_id: 3,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            items: [
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
            ],
            bet_amount: 30000,
            won_amount: 15401,
            game_id: 1,
            date: "2024-12-03T17:20",
          },
        ],
        highest_coinflip_win_streak: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            average_coinflip_amount: 15000,
            win_streak: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            average_coinflip_amount: 15000,
            win_streak: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            average_coinflip_amount: 15000,
            win_streak: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",

            _id: 4,

            average_coinflip_amount: 15000,
            win_streak: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
        ],
        highest_coinflip_loss_streak: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            average_coinflip_amount: 15000,
            lost_streak: 9,
            lost_ammount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            average_coinflip_amount: 15000,
            lost_streak: 9,
            lost_ammount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            average_coinflip_amount: 15000,
            lost_streak: 9,
            lost_ammount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",

            _id: 4,

            average_coinflip_amount: 15000,
            lost_streak: 9,
            lost_ammount: 15401,
            date: "2024-12-03T17:20",
          },
        ],
        most_coinflip_wins: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            average_coinflip_amount: 15000,
            total_won: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            average_coinflip_amount: 15000,
            total_won: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            average_coinflip_amount: 15000,
            total_won: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,

            average_coinflip_amount: 15000,
            total_won: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
        ],
        most_jackpot_wins: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            average_jackpot_amount: 15000,
            total_won: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            average_jackpot_amount: 15000,
            total_won: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            average_jackpot_amount: 15000,
            total_won: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,

            average_jackpot_amount: 15000,
            total_won: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
        ],
        most_gambled: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            average_gambling_amount: 15000,
            total_gambled: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            average_gambling_amount: 15000,
            total_gambled: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            average_gambling_amount: 15000,
            total_gambled: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            average_gambling_amount: 15000,
            total_gambled: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
        ],
        most_skins_gambled: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            average_gambling_amount: 15000,
            total_gambled: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            average_gambling_amount: 15000,
            total_gambled: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            average_gambling_amount: 15000,
            total_gambled: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            average_gambling_amount: 15000,
            total_gambled: 9,
            won_amount: 15401,
            date: "2024-12-03T17:20",
          },
        ],
        most_won: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            most_overall_won: 9,
            total_played: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            most_overall_won: 9,
            total_played: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            most_overall_won: 9,
            total_played: 15401,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            most_overall_won: 9,
            total_played: 15401,
            date: "2024-12-03T17:20",
          },
        ],
        most_lost: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            most_overall_lost: 9,
            total_played: 12,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            most_overall_lost: 9,
            total_played: 12,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            most_overall_lost: 9,
            total_played: 12,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            most_overall_lost: 9,
            total_played: 12,
            date: "2024-12-03T17:20",
          },
        ],
        most_profit: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            most_overall_profit: 9,
            total_played: 12,
            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            most_overall_profit: 9,
            total_played: 12,
            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            most_overall_profit: 9,
            total_played: 12,
            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            most_overall_profit: 9,
            total_played: 12,
            date: "2024-12-03T17:20",
          },
        ],
        highest_24H_profit: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            average_gambled_amount: 90290,
            highest_profit: 9123,
            total_played: 12,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            average_gambled_amount: 90290,
            highest_profit: 9123,
            total_played: 12,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            average_gambled_amount: 90290,
            highest_profit: 9123,
            total_played: 12,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,

            average_gambled_amount: 90290,
            highest_profit: 9123,
            total_played: 12,
          },
        ],
        highest_24H_lost: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            average_gambled_amount: 90290,
            highest_lost: 9123,
            total_played: 12,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            average_gambled_amount: 90290,
            highest_lost: 9123,
            total_played: 12,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            average_gambled_amount: 90290,
            highest_lost: 9123,
            total_played: 12,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,

            average_gambled_amount: 90290,
            highest_lost: 9123,
            total_played: 12,
          },
        ],
        highest_average_coinflip_amount: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            highest_average_coinflip_amount: 90290,

            total_played: 12,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            highest_average_coinflip_amount: 90290,

            total_played: 12,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            highest_average_coinflip_amount: 90290,

            total_played: 12,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,

            highest_average_coinflip_amount: 90290,

            total_played: 12,
          },
        ],
        highest_average_jackpot_bet_amount: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            highest_average_jackpot_bet_amount: 90290,

            total_joined: 12,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            highest_average_jackpot_bet_amount: 90290,

            total_joined: 12,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            highest_average_jackpot_bet_amount: 90290,

            total_joined: 12,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,

            highest_average_jackpot_bet_amount: 90290,

            total_joined: 12,
          },
        ],
        highest_average_jackpot_join_amount: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            highest_average_jackpot_join_amount: 90290,

            total_joined: 12,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            highest_average_jackpot_join_amount: 90290,

            total_joined: 12,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            highest_average_jackpot_join_amount: 90290,

            total_joined: 12,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,

            highest_average_jackpot_join_amount: 90290,

            total_joined: 12,
          },
        ],
        most_coinflip_created: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            most_coinflips_created: 123,
            won: 12,
            lost: 111,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,
            most_coinflips_created: 123,
            won: 12,
            lost: 111,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            most_coinflips_created: 123,
            won: 12,
            lost: 111,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            most_coinflips_created: 123,
            won: 12,
            lost: 111,
          },
        ],
        most_coinflip_joined: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            most_coinflips_joined: 123,
            won: 12,
            lost: 111,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,
            most_coinflips_joined: 123,
            won: 12,
            lost: 111,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            most_coinflips_joined: 123,
            won: 12,
            lost: 111,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            most_coinflips_joined: 123,
            won: 12,
            lost: 111,
          },
        ],
        most_double_tab_downs: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            double_downs: 12345,
            average_double_down_amount: 234,
            total_played: 345,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,
            double_downs: 12345,
            average_double_down_amount: 234,
            total_played: 345,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            double_downs: 12345,
            average_double_down_amount: 234,
            total_played: 345,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            double_downs: 12345,
            average_double_down_amount: 234,
            total_played: 345,
          },
        ],
        highest_jackpot_win_streak: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            win_streak: 123,
            average_double_down_amount: 12233,
            total_amount_double_downed: 11232,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,
            win_streak: 123,
            average_double_down_amount: 12233,
            total_amount_double_downed: 11232,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            win_streak: 123,
            average_double_down_amount: 12233,
            total_amount_double_downed: 11232,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            win_streak: 123,
            average_double_down_amount: 12233,
            total_amount_double_downed: 11232,
          },
        ],
        highest_double_down_win_streak: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            win_streak: 123,
            average_double_down_amount: 12233,
            total_amount_double_downed: 11232,
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,
            win_streak: 123,
            average_double_down_amount: 12233,
            total_amount_double_downed: 11232,
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            win_streak: 123,
            average_double_down_amount: 12233,
            total_amount_double_downed: 11232,
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            win_streak: 123,
            average_double_down_amount: 12233,
            total_amount_double_downed: 11232,
          },
        ],
        most_jackpot_entries: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,
            jackpot_entries: 123,
            time_period: "12 days",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,
            jackpot_entries: 123,
            time_period: "12 days",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,
            jackpot_entries: 123,
            time_period: "12 days",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,
            jackpot_entries: 123,
            time_period: "12 days",
          },
        ],
        biggest_pussy: [
          {
            rank: 1,
            name: "qusai",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 1,

            biggest_coinflips_cancelled: 15401,

            date: "2024-12-03T17:20",
          },
          {
            rank: 2,
            name: "qusai 2",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 2,

            biggest_coinflips_cancelled: 15401,

            date: "2024-12-03T17:20",
          },
          {
            rank: 3,
            name: "qusai 3",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 3,

            biggest_coinflips_cancelled: 15401,

            date: "2024-12-03T17:20",
          },
          {
            rank: 4,
            name: "qusai 4",
            avatar:
              "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
            _id: 4,

            biggest_coinflips_cancelled: 15401,

            date: "2024-12-03T17:20",
          },
        ],
      },
    };
  },
  methods: {
    toggleDropdown(dropdown) {
      if (this.openedDropdown == dropdown) {
        this.openedDropdown = null;
      } else {
        this.openedDropdown = dropdown;
      }
    },
    closeModal() {
      this.$emit("close-modal");
    },
    toggleTab(text) {
      this.tab = text.value;
      this.selected_tab = text.label;
      this.current_page = 1;
    },
    formatDateTime(inputDate) {
      if (!inputDate) return "No Date";

      const now = new Date();
      const date = new Date(inputDate);

      // Format the date as dd-MM-yyyy
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);

      // Calculate time difference in milliseconds
      const timeDifference = Math.abs(now - date);
      const secondsAgo = Math.floor(timeDifference / 1000);
      const minutesAgo = Math.floor(secondsAgo / 60);
      const hoursAgo = Math.floor(minutesAgo / 60);
      const daysAgo = Math.floor(hoursAgo / 24);
      const weeksAgo = Math.floor(daysAgo / 7);

      // Determine relative time
      let relativeTime;
      if (secondsAgo < 60) {
        relativeTime = `${secondsAgo}s ago`;
      } else if (minutesAgo < 60) {
        relativeTime = `${minutesAgo}m ago`;
      } else if (hoursAgo < 24) {
        relativeTime = `${hoursAgo}h ago`;
      } else if (daysAgo < 7) {
        relativeTime = `${daysAgo}d ago`;
      } else {
        relativeTime = `${weeksAgo}w ago`;
      }

      return {
        relativeTime: relativeTime,
        formattedDate: formattedDate,
      };
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.current_page = page;
      }
    },
    checkUser(item) {
      if (item._id === this.user._id && item.name === this.user.name) {
        return true;
      } else return false;
    },
    updatePagination() {
      this.current_page = 1;
    },
  },
  mounted() {},
  components: {
    XMarkIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronUpDownIcon,
    ChevronDownIcon,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.HOF[this.tab].length / this.rows_per_page);
    },
    userData() {
      const user = this.HOF[this.tab]?.find(
        (item) => item._id === this.user._id && item.name === this.user.name
      );

      // Return the user or false if not found
      return user || false;
    },
    user_in_page() {
      return this.paginatedData.some(
        (item) => item._id === this.user._id && item.name === this.user.name
      );
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.rows_per_page;
      const end = start + this.rows_per_page;
      return this.HOF[this.tab].slice(start, end);
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

.coin-img-cell {
  width: 32px;
  height: 32px;
  position: relative;
  margin-right: 10px;
}

.coin-img-cell .coin-img {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
}
</style>
