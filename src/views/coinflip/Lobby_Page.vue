<template>
  <div
    class="w-full min-w-0 max-w-full overflow-hidden lg:overflow-visible flex flex-col items-stretch gap-[1rem] px-3 sm:px-4"
  >
    <!-- Header Start -->

    <div
      class="flex flex-col lg:flex-row w-full gap-4 lg:items-center lg:h-12 justify-center lg:justify-between flex-wrap lg:flex-nowrap"
    >
      <!-- Left Start -->
      <div
        v-if="(screenWidth < 640 && show_previos_coinflips) || screenWidth > 640"
        class="w-full sm:h-12 min-h-12 border-[#530000] border bg-[linear-gradient(180deg,#530000_0%,#2E0101_100%)] pl-4 flex flex-col sm:flex-row items-center gap-4 py-2 sm:py-0 overflow-hidden"
      >
        <span class="font-Rubik font-semibold text-sm text-[#d7b7b7] whitespace-nowrap"
          >PREVIOUS COINFLIPS</span
        >
        <div class="flex items-center h-full gap-2 overflow-hidden">
          <img
            v-for="(result, index) in previousCoinflips.slice(-30)"
            :key="index"
            :src="`/img/coins/${result}.png`"
            class="max-w-6"
          />
        </div>
      </div>
      <!-- Left End -->
      <!-- Right Start -->
      <div
        v-if="(screenWidth < 640 && show_previous_100) || screenWidth > 640"
        class="flex flex-col sm:flex-row justify-center items-center gap-2 lg:pl-2 xl:pl-4 lg:border-l lg:border-[rgb(255,52,53,0.2)]"
      >
        <span class="font-Rubik font-semibold text-sm text-[#d7b7b7] whitespace-nowrap"
          >PREVIOUS 100:</span
        >
        <div class="flex items-center gap-2 sm:gap-4 whitespace-nowrap w-full sm:w-auto">
          <div
            class="h-12 border-[#530000] border bg-[linear-gradient(180deg,#530000_0%,#2E0101_100%)] px-2 flex items-center gap-2 justify-between whitespace-nowrap w-full sm:w-auto sm:min-w-[170px]"
          >
            <div class="flex items-center gap-2">
              <img src="/img/coins/heaven.png" class="w-6" />
              <span class="font-semibold font-Rubik text-sm text-white">HEAVEN</span>
            </div>

            <span class="font-bold font-Rubik text-base text-[#72b5ff]">
              {{
                Number(previos100Percentage.heavenPercentage).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0
                })
              }}%
            </span>
          </div>
          <div
            class="h-12 border-[#530000] border bg-[linear-gradient(180deg,#530000_0%,#2E0101_100%)] px-2 flex items-center gap-2 justify-between whitespace-nowrap w-full sm:w-auto sm:min-w-[170px]"
          >
            <div class="flex items-center gap-2">
              <img src="/img/coins/hell.png" class="w-6" />
              <span class="font-semibold font-Rubik text-sm text-white">HELL</span>
            </div>

            <span class="font-bold font-Rubik text-base text-[#ff3435]">
              {{
                Number(previos100Percentage.hellPercentage).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0
                })
              }}%
            </span>
          </div>
        </div>
      </div>
      <!-- Right End -->
    </div>
    <!-- Header End -->
    <!-- Controls Start -->
    <div class="flex flex-col xl:flex-row w-full items-center lg:justify-between flex-wrap gap-2">
      <!-- Left Start -->
      <div
        class="hidden xl:flex font-Rubik font- text-2xl text-white whitespace-nowrap order-2 xl:order-1 font-[600]"
      >
        GAMES <span class="ml-1 font-bold text-2xl font-Rubik text-[#FF3435]">(2)</span>
      </div>
      <!-- Left End -->
      <div
        class="flex justify-center items-center lg:items-center w-full xl:flex-1 xl:min-w-0 lg:justify-between flex-wrap gap-2 xl:order-2 order-1"
      >
        <!-- Center Start -->
        <div
          v-if="(screenWidth < 640 && show_personal_stats) || screenWidth > 640"
          class="flex flex-col sm:flex-row justify-center w-full xl:justify-start xl:w-fit items-center gap-2"
        >
          <span
            class="font-Rubik font-bold text-base text-white flex items-center gap-1 whitespace-nowrap"
            ><UserIcon class="w-4" />PERSONAL STATS</span
          >
          <div class="flex items-center gap-2 sm:gap-4 whitespace-nowrap w-full sm:w-auto">
            <div
              class="px-4 2xl:px-6 h-10 w-full sm:w-auto flex items-center justify-between gap-2 sm:gap-4 bg-[#690505] rounded"
            >
              <span class="whitespace-nowrap font-semibold font-Rubik text-sm text-[#d7b7b7]"
                >COINFLIP UP</span
              >
              <span class="font-bold font-Rubik text-lg 2xl:text-2xl text-white">0</span>
            </div>
            <div
              class="px-4 2xl:px-6 h-10 w-full sm:w-auto flex items-center justify-between gap-2 sm:gap-4 bg-[#690505] rounded"
            >
              <span class="whitespace-nowrap font-semibold font-Rubik text-sm text-[#d7b7b7]"
                >TOTAL VALUE</span
              >
              <span class="font-bold font-Rubik text-lg 2xl:text-2xl text-white whitespace-nowrap">
                <span class="font-bold font-Rubik text-lg 2xl:text-2xl text-[#04ab53]">$</span>
                0.00</span
              >
            </div>
          </div>
        </div>

        <!-- Center End -->
        <!-- Right Start -->
        <div
          class="hidden sm:flex flex-wrap-reverse sm:flex-wrap w-full xl:w-fit lg:flex-nowrap items-center justify-center sm:justify-between xl:justify-normal gap-2"
        >
          <div class="flex xl:hidden font-Rubik font-bold text-2xl text-white whitespace-nowrap">
            GAMES <span class="ml-1 font-bold text-2xl font-Rubik text-[#FF3435]">(2)</span>
          </div>
          <div class="flex items-center gap-2">
            <button class="select-none" @click="openModal('coinflip settings')">
              <Cog8ToothIcon class="w-7 fill-white" />
            </button>

            <button
              class="flex items-center px-2 sm:px-6 h-10 bg-[#ff3435] border-[#530000] border border-solid font-bold font-Rubik text-white text-sm sm:text-base whitespace-nowrap tracking-wide"
              @click="openModal('sitewide history')"
            >
              HISTORY
            </button>
            <button
              class="flex items-center px-2 sm:px-6 h-10 bg-[#04AB53] font-bold font-Rubik text-white text-sm sm:text-base whitespace-nowrap tracking-wide"
              @click="openModal('create coinflip')"
            >
              CREATE NEW
            </button>
          </div>
        </div>

        <!-- right mobile -->
        <div class="sm:hidden flex flex-wrap-reverse w-full items-center justify-center gap-2">
          <div class="flex items-center justify-between w-full">
            <div class="flex xl:hidden font-Rubik font-bold text-2xl text-white whitespace-nowrap">
              GAMES <span class="ml-1 font-bold text-2xl font-Rubik text-[#FF3435]">(2)</span>
            </div>
            <div class="flex items-center gap-4">
              <button class="select-none" @click="openModal('coinflip settings')">
                <Cog8ToothIcon class="w-7 fill-white" />
              </button>
              <div class="relative">
                <div
                  class="toggle 2xl:hidden flex items-center justify-center relative w-6 h-[2.5rem] rounded-[5px] overflow-hidden cursor-pointer"
                  @click="toggleDropdown('mobile nav')"
                  :class="{ active: toggled_dropdown == 'mobile nav' }"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div
                  class="absolute top-full right-0 -ml-px bg-[#420101] z-10 rounded-sm transition-all flex flex-col items-center gap-y-1"
                  :class="{
                    'py-0 h-0 w-0 border border-solid border-transparent invisible':
                      toggled_dropdown != 'mobile nav',
                    ' h-[130px] w-[283px]  visible border-[0.5px] border-solid border-[#FF3435]':
                      toggled_dropdown == 'mobile nav'
                  }"
                >
                  <div
                    class="flex items-center h-10 justify-between w-full px-2"
                    :class="{
                      'opacity-0 duration-75': toggled_dropdown != 'mobile nav',
                      'opacity-100 duration-700': toggled_dropdown == 'mobile nav'
                    }"
                    @click="show_previos_coinflips = !show_previos_coinflips"
                  >
                    <span class="font-Rubik font-bold text-sm text-white"
                      >SHOW PREVIOUS COINFLIPS</span
                    >
                    <span
                      class="w-3.5 h-3.5 relative border border-solid border-white rounded-sm mb-1"
                    >
                      <img
                        src="../../assets/img/tick.png"
                        class="h-3.5 min-w-4 absolute bottom-0 select-none cursor-pointer transition-all duration-300"
                        :class="show_previos_coinflips ? 'opacity-100' : 'opacity-0'"
                      />
                    </span>
                  </div>
                  <div
                    class="flex items-center h-10 justify-between w-full px-2"
                    :class="{
                      'opacity-0 duration-75': toggled_dropdown != 'mobile nav',
                      'opacity-100 duration-700': toggled_dropdown == 'mobile nav'
                    }"
                    @click="show_previous_100 = !show_previous_100"
                  >
                    <span class="font-Rubik font-bold text-sm text-white">SHOW PREVIOUS 100</span>
                    <span
                      class="w-3.5 h-3.5 relative border border-solid border-white rounded-sm mb-1"
                    >
                      <img
                        src="../../assets/img/tick.png"
                        class="h-3.5 min-w-4 absolute bottom-0 select-none cursor-pointer transition-all duration-300"
                        :class="show_previous_100 ? 'opacity-100' : 'opacity-0'"
                      />
                    </span>
                  </div>
                  <div
                    class="flex items-center h-10 justify-between w-full px-2"
                    :class="{
                      'opacity-0 duration-75': toggled_dropdown != 'mobile nav',
                      'opacity-100 duration-700': toggled_dropdown == 'mobile nav'
                    }"
                    @click="show_personal_stats = !show_personal_stats"
                  >
                    <span
                      class="font-Rubik font-bold text-sm text-white"
                      :class="{
                        'opacity-0 duration-75': toggled_dropdown != 'mobile nav',
                        'opacity-100 duration-700': toggled_dropdown == 'mobile nav'
                      }"
                      >SHOW PERSDONAL STATS</span
                    >
                    <span
                      class="w-3.5 h-3.5 relative border border-solid border-white rounded-sm mb-1"
                    >
                      <img
                        src="../../assets/img/tick.png"
                        class="h-3.5 min-w-4 absolute bottom-0 select-none cursor-pointer transition-all duration-300"
                        :class="show_personal_stats ? 'opacity-100' : 'opacity-0'"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center w-full gap-2">
            <button
              class="flex items-center px-2 w-full sm:px-6 h-10 bg-[#ff3435] border-[#530000] border border-solid font-bold font-Rubik text-white text-sm sm:text-base whitespace-nowrap tracking-wide justify-center"
              @click="openModal('sitewide history')"
            >
              SITEWIDE HISTORY
            </button>
            <button
              class="flex items-center w-full px-2 sm:px-6 h-10 bg-[#04AB53] font-bold font-Rubik text-white text-sm sm:text-base whitespace-nowrap tracking-wide justify-center"
              @click="openModal('create coinflip')"
            >
              CREATE NEW
            </button>
          </div>
        </div>
        <!-- Right End -->
      </div>
    </div>
    <!-- Controls End -->
    <!-- Battles List Start -->
    <div class="flex flex-col gap-y-2 w-full">
      <div class="hidden lg:grid grid-cols-[repeat(13,minmax(0,1fr))] gap-4">
        <div class="col-span-3 xl:col-span-2 font-Rubik font-semibold text-sm text-[#d7b7b7]">
          PLAYERS
        </div>
        <div class="col-span-3 xl:col-span-6 font-Rubik font-semibold text-sm text-[#d7b7b7]">
          ITEMS
        </div>
        <div class="col-span-2 xl:col-span-3 font-Rubik font-semibold text-sm text-[#d7b7b7]">
          TOTAL
        </div>
        <div class="col-span-1"></div>
      </div>
      <div v-for="battle in filteredBattles" v-bind:key="battle._id">
        <CoinflipRow :battle="battle" :time="Number(filters.time)" />
      </div>
    </div>
    <!-- Battles List End -->
    <!-- Tournament bracket start -->
    <div
      class="hidden sm:flex items-stretch h-auto lg:h-[163px] w-full bg-[linear-gradient(90deg,rgba(255,52,53,0.25)_0%,rgba(255,52,53,0.5)_100%)] p-px mt-[-8+px]"
    >
      <div
        class="w-full h-full flex flex-col lg:flex-row lg:items-stretch items-center justify-between bg-[linear-gradient(90deg,#7C0A0B_0%,#5C0000_29.51%)] gap-2"
      >
        <div
          class="max-h-[163px] lg:h-full max-w-full lg:max-w-none w-full min-w-0 flex-1 flex items-center overflow-hidden relative"
        >
          <div class="absolute top-2 left-2 flex flex-col items-start gap-2 z-10">
            <div class="text-center text-white text-xl font-semibold font-['Rubik'] leading-tight">
              TOURNAMENT
            </div>
            <div
              className="text-center text-white text-xl font-semibold font-['Rubik'] leading-tight"
            >
              15 /16
            </div>
          </div>
          <div
            class="flex items-center justify-center w-full pl-12 h-full overflow-x-auto overflow-y-hidden"
          >
            <Tournament_bracket :hide_view_button="true" class="mt-96 -mb-32" />
          </div>
        </div>

        <div
          class="flex h-full items-center w-full shrink-0 justify-between flex-wrap p-2 lg:p-0 lg:pr-2 lg:max-w-[min(100%,564px)] xl:max-w-[564px]"
        >
          <div class="flex flex-col">
            <div>
              <span class="text-[#04ab53] text-base font-bold font-['Rubik'] leading-tight">$</span
              ><span class="text-white text-base font-bold font-['Rubik'] leading-tight"
                >124.00</span
              >
            </div>
            <div class="flex items-center gap-2">
              <div className="text-[#d7b7b7] text-xs font-semibold font-['Rubik'] leading-[18px]">
                Needs: $124.20 - 135.00
              </div>

              <div
                className="text-center text-white text-xl font-semibold font-['Rubik'] leading-tight"
              >
                15 /16
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button
              class="h-9 px-3 py-2 bg-[#04ab53] justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-bold font-['Rubik'] leading-tight"
            >
              JOIN
            </button>
            <button
              @click="openModal('coinflip tournament')"
              class="h-9 px-3 py-2 bg-[#ff3435] justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-bold font-['Rubik'] leading-tight"
            >
              VIEW
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Tournament bracket end -->

    <!-- Mobile Tournament bracket start -->
    <div
      class="flex sm:hidden items-center h-auto lg:h-[163px] w-full bg-[linear-gradient(90deg,rgba(255,52,53,0.25)_0%,rgba(255,52,53,0.5)_100%)] p-px justify-center mt-[-10px]"
    >
      <div
        class="w-full h-full flex flex-col lg:flex-row items-center justify-between bg-[linear-gradient(90deg,#7C0A0B_0%,#5C0000_29.51%)] gap-2"
      >
        <div
          class="max-h-[163px] lg:h-full max-w-full lg:max-w-none w-full min-w-0 flex items-center overflow-hidden relative"
        >
          <div class="absolute top-2 left-2 w-[95%] flex items-start justify-between">
            <div class="flex flex-col items-start gap-2 z-10">
              <div
                class="text-center text-white text-xl font-semibold font-['Rubik'] leading-tight"
              >
                TOURNAMENT
              </div>
              <!-- <div
                className="text-center text-white text-xl font-semibold font-['Rubik'] leading-tight"
              >
                15 /16
              </div> -->
            </div>
            <div class="flex flex-col">
              <div>
                <span class="text-[#04ab53] text-base font-bold font-['Rubik'] leading-tight"
                  >$</span
                ><span class="text-white text-base font-bold font-['Rubik'] leading-tight"
                  >124.00</span
                >
              </div>
              <div class="flex items-center gap-2">
                <div className="text-[#d7b7b7] text-xs font-semibold font-['Rubik'] leading-[18px]">
                  Needs: $124.20 - 135.00
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex items-center justify-center w-full pl-12 h-full overflow-x-auto overflow-y-hidden"
          >
            <Tournament_bracket :hide_view_button="true" class="mt-96 -mb-32" />
          </div>
        </div>

        <div
          class="flex h-full items-center w-full justify-between flex-wrap p-2 lg:p-0 lg:pr-2 lg:max-w-[564px]"
        >
          <div class="flex  items-start w-full justify-between">
            <div
              className="text-center text-white text-xl font-semibold font-['Rubik'] leading-tight"
            >
              15 /16
            </div>
            <div class="flex items-center gap-2">
              <button
                class="h-9 px-3 py-2 bg-[#04ab53] justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-bold font-['Rubik'] leading-tight"
              >
                JOIN
              </button>
              <button
                @click="openModal('coinflip tournament')"
                class="h-9 px-3 py-2 bg-[#ff3435] justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-bold font-['Rubik'] leading-tight"
              >
                VIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Mobile Tournament bracket end -->
  </div>
</template>
<script>
import { UserIcon, Cog8ToothIcon } from '@heroicons/vue/24/solid'
import CoinflipRow from '../../components/coinflip/CoinflipRow.vue'
import { mapState } from 'vuex'
import Tournament_bracket from '@/components/coinflip/Tournament_bracket.vue'
import { openModal } from '@/modalStore'
import {
  getSharedJackpotSocket,
  getCoinflips,
  isSocketEnabled,
  joinCoinflipSocketRoom
} from '@/services/jackpotClient'
import { getSteamId } from '@/auth/session'
export default {
  components: {
    UserIcon,
    Cog8ToothIcon,
    CoinflipRow,
    Tournament_bracket
  },
  data() {
    return {
      previousCoinflips: [],
      toggled_dropdown: null,
      activeModal: null,
      show_personal_stats: false,
      show_previos_coinflips: true,
      show_previous_100: false,
      screenWidth: window.innerWidth,
      socket: null,
      coinflipSocketHandlers: null,
      autoOpenedCoinflipGames: new Set()
    }
  },
  computed: {
    ...mapState({
      battles: (state) => state.battles,
      filters: (state) => state.coinFlipFilters
    }),

    previos100Percentage() {
      const counts = { hell: 0, heaven: 0 }
      const arr = this.previousCoinflips.slice(-100)
      arr.forEach((element) => {
        if (element === 'hell') counts.hell++
        if (element === 'heaven') counts.heaven++
      })
      const total = arr.length
      const hellPercentage = (counts.hell / total) * 100
      const heavenPercentage = (counts.heaven / total) * 100
      return {
        hellPercentage: hellPercentage,
        heavenPercentage: heavenPercentage
      }
    },
    filteredBattles() {
      // Copy so `.sort()` / `.filter()` never mutate Vuex `state.battles` in place (breaks reactivity).
      let battlesArray = Array.isArray(this.battles) ? [...this.battles] : []
      // Apply 'personalCoinFlips' filter
      if (this.filters.personalCoinFlips) {
        battlesArray = battlesArray.filter((battle) => {
          if (Array.isArray(battle?.players)) {
            return battle.players.some((player) => player?.name === 'qusai')
          }
          return battle?.host_data?.name === 'qusai' || battle?.part_data?.name === 'qusai'
        })
      }

      // Apply 'completedToBottom' filter
      const isEndingish = (s) => s === 'ending'
      if (this.filters.completedToBottom) {
        battlesArray = battlesArray.sort((a, b) => {
          if (isEndingish(a.state) && !isEndingish(b.state)) {
            return 1
          }
          if (!isEndingish(a.state) && isEndingish(b.state)) {
            return -1
          }
          return 0
        })
      }

      // Apply 'sort' filter: sort battles by total value
      if (this.filters.sort === 'newest first') {
        battlesArray = battlesArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else if (this.filters.sort === 'oldest first') {
        battlesArray = battlesArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      } else if (this.filters.sort === 'highest amount first') {
        battlesArray = battlesArray.sort(
          (a, b) => Number(b.total_value ?? b.total ?? 0) - Number(a.total_value ?? a.total ?? 0)
        )
      } else if (this.filters.sort === 'lowest amount first') {
        battlesArray = battlesArray.sort(
          (a, b) => Number(a.total_value ?? a.total ?? 0) - Number(b.total_value ?? b.total ?? 0)
        )
      }

      const isDone = (s) => s === 'ended' || s === 'finished'
      if (this.filters.completedToBottom) {
        battlesArray = battlesArray.sort((a, b) => {
          if (isDone(a.state) && !isDone(b.state)) {
            return 1
          }
          if (!isDone(a.state) && isDone(b.state)) {
            return -1
          }
          return 0
        })
      }

      return battlesArray
    }
  },
  async mounted() {
    window.addEventListener('resize', this.updateScreenWidth)
    this.connectCoinflipSocket()
    try {
      const data = await getCoinflips()
      this.upsertGamesFromList(this.extractCoinflipGamesList(data))
    } catch (e) {
      console.error('Could not load coinflip list:', e)
    }
  },
  methods: {
    getGameId(game) {
      return game?.gameid ?? game?.gameId ?? game?.id ?? game?._id ?? null
    },
    normalizeCoinSideValue(raw) {
      if (raw === 1 || raw === '1') return 'heaven'
      if (raw === 2 || raw === '2') return 'hell'
      const s = String(raw || '')
        .trim()
        .toLowerCase()
      if (s === 'heaven' || s === 'hell') return s
      return 'heaven'
    },
    mapCoinflipItem(item, index = 0) {
      if (!item || typeof item !== 'object') return null
      return {
        _id: item._id ?? item.id ?? item.assetid ?? item.asset_id ?? index,
        id: item.id ?? item._id ?? index,
        name: item.name ?? item.market_hash_name ?? 'Item',
        image: item.image ?? item.icon_url ?? item.icon ?? '/img/user/userImage.png',
        price: Number(item.price ?? item.value ?? item.amount ?? 0) || 0
      }
    },
    /** Second player from `coinflip:joined` (skins). Name/avatar/coin usually come from `joinPartData` (set on `coinflip:joining`). */
    buildJoinerPlayerFromJoinedPayload(payload, battle) {
      if (!battle?.players?.[0]) return null
      const host = battle.players[0]
      const fromJoining = battle.part_data
      const partData = {
        ...fromJoining,
        ...(payload.part_data || payload.joiner_data || payload.joiner || payload.user || {})
      }
      const steamid = battle.part;
      const skins = payload.skins;
      const items = skins
        .map((item, idx) => this.mapCoinflipItem(item, idx))
        .filter((item) => item != null)
      const joinerValue = items.reduce((s, it) => s + Number(it?.price ?? 0), 0)
      const joinerCoin = host.coin === 1 ? 2 : 1
      
      return {
        _id: steamid,
        steamid,
        name: battle.part_data.name,
        avatar: battle.part_data.avatar,
        coin: joinerCoin,
        chance: battle.part_data.chance ?? 50,
        value: battle.part_data.value,
        items
      }
    },
    upsertGamesFromList(list) {
      if (!Array.isArray(list)) return
      for (const game of list) {
        if (!game || typeof game !== 'object') continue
        const gid = game.gameid ?? game.gameId ?? game.id ?? game._id
        this.$store.commit('upsertCoinflipGame', {
          ...game,
          gameid: gid != null ? gid : game.gameid
        })
      }
    },
    extractCoinflipGamesList(data) {
      if (!data) return []
      if (Array.isArray(data)) return data
      if (Array.isArray(data.games)) return data.games
      if (Array.isArray(data.coinflips)) return data.coinflips
      if (data.games && typeof data.games === 'object' && !Array.isArray(data.games)) {
        return Object.entries(data.games).map(([id, game]) => ({
          ...(game || {}),
          gameid: game?.gameid ?? (Number.isFinite(Number(id)) ? Number(id) : id)
        }))
      }
      return []
    },
    applyCoinflipSubscribePayload(payload) {
      if (!payload || typeof payload !== 'object') return
      const gamesSource = payload.games
      this.$store.commit('setServerTime', payload.server_time)
      if (Array.isArray(gamesSource)) {
        this.upsertGamesFromList(gamesSource)
      } else if (gamesSource && typeof gamesSource === 'object') {
        const list = Object.entries(gamesSource).map(([id, game]) => ({
          ...(game || {}),
          gameid: game?.gameid ?? (Number.isFinite(Number(id)) ? Number(id) : id)
        }))
        this.upsertGamesFromList(list)
      }
      const stats = payload.stats || {}
      if (Array.isArray(payload.history) && payload.history.length) {
        this.previousCoinflips = payload.history
          .map((entry) => this.normalizeCoinSideValue(entry?.coin ?? entry?.result ?? entry))
          .filter(Boolean)
          .slice(0, 100)
      } else if (stats.last != null) {
        const lastCoin = this.normalizeCoinSideValue(stats.last)
        this.previousCoinflips = [lastCoin, ...this.previousCoinflips].slice(0, 100)
      }
    },
    connectCoinflipSocket() {
      if (this.socket || !isSocketEnabled()) return
      this.socket = getSharedJackpotSocket()
      if (!this.socket) return
      const subscribe = () => {
        // Required so server `io.to(coinflip).emit('coinflip:hosted', …)` reaches this socket (same room name).
        joinCoinflipSocketRoom(this.socket)
        this.socket.emit('coinflip:subscribe', (payload) => {
          this.applyCoinflipSubscribePayload(payload)
        })
      }
      this.coinflipSocketHandlers = {
        connect: () => subscribe(),
        subscribe: (payload) => {
          this.applyCoinflipSubscribePayload(payload)
        },
        hosted: (payload) => {
          const game = payload && typeof payload === 'object' ? payload : null
          if (!game) return
          this.$store.commit('upsertCoinflipGame', {
            ...game,
            gameid: game.gameid ?? game.gameId ?? game.id ?? game._id
          })
        },
        updateStats: (payload) => {
          const lastCoin = this.normalizeCoinSideValue(payload?.last)
          if (!lastCoin) return
          this.previousCoinflips = [lastCoin, ...this.previousCoinflips].slice(0, 100)
        },
        joining: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null) return
          const battle = this.battles.find((b) => String(this.getGameId(b)) === String(gid))
          console.log('here is battle in joining: ', battle)
          const patch = {
            joining: true,
            state: payload?.state ?? 'joining',
          }
          if (payload.part_data || payload.part != null) {
            patch.part = payload.part
            patch.part_data = payload.part_data
          }
          if (payload.host_chance != null) {
            patch.host_data = {
              ...(battle?.host_data || {}),
              chance: Number(payload.host_chance)
            }
          }

          this.$store.commit('patchBattleById', { battleId: gid, patch })
        },
        joined: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null) return
          const battle = this.battles.find((b) => String(this.getGameId(b)) === String(gid))
          if (!battle) return
          const joiner = this.buildJoinerPlayerFromJoinedPayload(payload, battle)
          const host = battle.players?.[0]
          const players =
            joiner && host ? [host, joiner] : Array.isArray(battle.players) ? [...battle.players] : []
          const nextTotal =
            players.reduce(
              (acc, p) => acc + (p.items || []).reduce((s, it) => s + Number(it?.price ?? 0), 0),
              0
            )

          this.$store.commit('patchBattleById', {
            battleId: gid,
            patch: {
              players,
              total: nextTotal,
              state: payload.state ?? 'joined',
              joining: false
            }
          })
          const nextBattle = this.battles.find((b) => String(this.getGameId(b)) === String(gid))
          this.maybeAutoOpenJoinedGame(gid, nextBattle)
        },
        updateState: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null || payload?.state == null) return
          this.$store.commit('patchBattleById', {
            battleId: gid,
            patch: { state: payload.state }
          })
        },
        cancelJoining: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null) return
          this.$store.commit('patchBattleById', {
            battleId: gid,
            patch: { joining: false, joinPartData: null, state: payload?.state ?? 'open' }
          })
        },
        eosBlock: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null || payload?.block == null) return
          const battle = this.battles.find((b) => String(this.getGameId(b)) === String(gid))
          this.$store.commit('patchBattleById', {
            battleId: gid,
            patch: {
              block: payload.block
            }
          })
        },
        flip: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null) return
          const battle = this.battles.find((b) => String(this.getGameId(b)) === String(gid))
          if (!battle) return
          console.log('here is payload in flip: ', payload, battle)
          const winningCoin =
            payload.coin != null ? this.normalizeCoinSideValue(payload.coin) : null
          let playersPatch
          if (winningCoin && Array.isArray(battle.players) && battle.players.length >= 2) {
            playersPatch = battle.players.map((p) => ({
              ...p,
              win: p.coin === winningCoin
            }))
          }

          this.$store.commit('patchBattleById', {
            battleId: gid,
            patch: {
              ...(playersPatch ? { players: playersPatch } : {}),
              state: payload.state ?? 'ended',
              winner: payload.winner ?? battle.winner,
              ticket: payload.ticket ?? battle.ticket,
              hash: payload.hash ?? battle.hash,
              block: payload.block ?? battle.block,
              coin: payload.coin ?? battle.coin,
              roll: payload.roll ?? battle.roll,
              joining: false
            }
          })
        }
      }
      this.socket.on('connect', this.coinflipSocketHandlers.connect)
      this.socket.on('coinflip:subscribe', this.coinflipSocketHandlers.subscribe)
      this.socket.on('coinflip:hosted', this.coinflipSocketHandlers.hosted)
      this.socket.on('coinflip:updateStats', this.coinflipSocketHandlers.updateStats)
      this.socket.on('coinflip:joining', this.coinflipSocketHandlers.joining)
      this.socket.on('coinflip:joined', this.coinflipSocketHandlers.joined)
      this.socket.on('coinflip:updateState', this.coinflipSocketHandlers.updateState)
      this.socket.on('coinflip:flip', this.coinflipSocketHandlers.flip)
      this.socket.on('fairness:eosBlock', this.coinflipSocketHandlers.eosBlock)
      this.socket.on('fairness:EOSBlock', this.coinflipSocketHandlers.eosBlock)
      this.socket.on('coinflip:cancelJoining', this.coinflipSocketHandlers.cancelJoining)
      if (this.socket.connected) subscribe()
    },
    disconnectCoinflipSocket() {
      if (!this.socket) return
      this.socket.emit('coinflip:unsubscribe')
      if (this.coinflipSocketHandlers) {
        this.socket.off('connect', this.coinflipSocketHandlers.connect)
        this.socket.off('coinflip:subscribe', this.coinflipSocketHandlers.subscribe)
        this.socket.off('coinflip:hosted', this.coinflipSocketHandlers.hosted)
        this.socket.off('coinflip:updateStats', this.coinflipSocketHandlers.updateStats)
        this.socket.off('coinflip:joining', this.coinflipSocketHandlers.joining)
        this.socket.off('coinflip:joined', this.coinflipSocketHandlers.joined)
        this.socket.off('coinflip:updateState', this.coinflipSocketHandlers.updateState)
        this.socket.off('coinflip:flip', this.coinflipSocketHandlers.flip)
        this.socket.off('fairness:eosBlock', this.coinflipSocketHandlers.eosBlock)
        this.socket.off('fairness:EOSBlock', this.coinflipSocketHandlers.eosBlock)
        this.socket.off('coinflip:cancelJoining', this.coinflipSocketHandlers.cancelJoining)
      }
      this.coinflipSocketHandlers = null
      this.socket = null
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth
    },
    openModal(modalName) {
      if (modalName === 'coinflip settings') {
        openModal(modalName, this.filters)
      } else openModal(modalName)
    },
    closeModal() {
      this.activeModal = null
    },
    toggleDropdown(name) {
      if (this.toggled_dropdown == null) {
        this.toggled_dropdown = name
      } else {
        this.toggled_dropdown = null
      }
    },
    maybeAutoOpenJoinedGame(gid, battle) {
      const currentSteamId = String(getSteamId() || '')
      if (!currentSteamId || gid == null || !battle) return
      const gameKey = String(gid)
      if (this.autoOpenedCoinflipGames.has(gameKey)) return
      const hostSteamId = String(
        battle?.host ??
          battle?.host_data?.steamid ??
          battle?.players?.[0]?.steamid ??
          battle?.players?.[0]?._id ??
          ''
      )
      const joinerSteamId = String(
        battle?.part ??
          battle?.part_data?.steamid ??
          battle?.players?.[1]?.steamid ??
          battle?.players?.[1]?._id ??
          ''
      )
      if (currentSteamId !== hostSteamId && currentSteamId !== joinerSteamId) return
      this.autoOpenedCoinflipGames.add(gameKey)
      openModal('coinflip game', { battle, secondsLeft: 10 })
    }
  },
  beforeUnmount() {
    this.disconnectCoinflipSocket()
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>
<style scoped>
::-webkit-scrollbar {
  display: block;
  width: 9px !important;
  height: 9px !important;
}
::-webkit-scrollbar-track {
  background: linear-gradient(90.01deg, #5d0101 0%, #79090a 8.33%);
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: rgba(255, 52, 53, 0.5);

  border-radius: 4px;
}

.toggle span {
  position: absolute;
  height: 3px;
  background: #fff;
  width: 100%;
  transition: 250ms;
}
.toggle span:nth-child(1) {
  transform: translateY(-0.5rem);
  max-width: 100%;
}
.toggle span:nth-child(2) {
  transform: translateY(0.5rem);
  max-width: 100%;
}
.toggle.active span:nth-child(3) {
  transform: translateX(2.2rem);
}
.toggle.active span:nth-child(1) {
  transform: translateY(0) rotate(45deg);
  max-width: 100%;
  transition-delay: 0.05s;
}
.toggle.active span:nth-child(2) {
  transform: translateY(0) rotate(-45deg);
  max-width: 100%;
  transition-delay: 0.05s;
}
</style>
