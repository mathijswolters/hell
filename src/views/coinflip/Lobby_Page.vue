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
import { getSharedJackpotSocket, isSocketEnabled, joinCoinflipSocketRoom } from '@/services/jackpotClient'
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
      coinflipSocketHandlers: null
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
        battlesArray = battlesArray.filter((battle) =>
          battle.players.some((player) => player.name === 'qusai')
        )
      }

      // Apply 'completedToBottom' filter
      if (this.filters.completedToBottom) {
        battlesArray = battlesArray.sort((a, b) => {
          if (a.state === 'finished' && b.state !== 'finished') {
            return 1
          }
          if (a.state !== 'finished' && b.state === 'finished') {
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
        battlesArray = battlesArray.sort((a, b) => b.total - a.total)
      } else if (this.filters.sort === 'lowest amount first') {
        battlesArray = battlesArray.sort((a, b) => a.total - b.total)
      }

      if (this.filters.completedToBottom) {
        battlesArray = battlesArray.sort((a, b) => {
          if (a.state === 'finished' && b.state !== 'finished') {
            return 1
          }
          if (a.state !== 'finished' && b.state === 'finished') {
            return -1
          }
          return 0
        })
      }

      return battlesArray
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateScreenWidth)
    this.connectCoinflipSocket()
  },
  methods: {
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
    mapSocketGameToBattle(game, fallbackId) {
      if (!game || typeof game !== 'object') return null
      const id = game.gameid ?? game.gameId ?? game.game_id ?? game.id ?? game._id ?? fallbackId
      if (id == null || id === '') return null
      const hostData = game.host_data || game.hostData || {}
      const hostSkins = Array.isArray(game.host_skins)
        ? game.host_skins
        : Array.isArray(game.hostSkins)
          ? game.hostSkins
          : []
      const hostPlayer = {
        _id: game.host ?? hostData.steamid ?? id,
        steamid: game.host ?? hostData.steamid ?? null,
        name: hostData.name ?? 'Unknown',
        avatar: hostData.avatar ?? '/img/user/userImage.png',
        coin: this.normalizeCoinSideValue(hostData.coin),
        chance: Number(hostData.chance ?? 50) || 50,
        value: Number(hostData.value ?? game.total_value ?? 0) || 0,
        items: hostSkins.map((item, idx) => this.mapCoinflipItem(item, idx)).filter(Boolean)
      }
      const players = [hostPlayer]
      if (game.part_data && game.part) {
        const partSkins = Array.isArray(game.part_skins) ? game.part_skins : []
        players.push({
          _id: game.part,
          steamid: game.part,
          name: game.part_data.name ?? 'Unknown',
          avatar: game.part_data.avatar ?? '/img/user/userImage.png',
          coin: this.normalizeCoinSideValue(game.part_data.coin),
          chance: Number(game.part_data.chance ?? 50) || 50,
          value: Number(game.part_data.value ?? 0) || 0,
          items: partSkins.map((item, idx) => this.mapCoinflipItem(item, idx)).filter(Boolean)
        })
      }
      let total = Number(game.total_value ?? game.total ?? 0) || 0
      if (total <= 0) {
        total = hostPlayer.items.reduce((s, it) => s + Number(it?.price ?? 0), 0)
      }
      return {
        _id: Number.isFinite(Number(id)) ? Number(id) : id,
        players,
        total,
        state: game.state ?? 'open',
        joining: !!game.joining,
        attempts: Array.isArray(game.attempts) ? game.attempts : [],
        ...(game.createdAt != null ? { createdAt: game.createdAt } : {})
      }
    },
    /** Second player from `coinflip:joined` (skins). Name/avatar/coin usually come from `joinPartData` (set on `coinflip:joining`). */
    buildJoinerPlayerFromJoinedPayload(payload, battle) {
      if (!battle?.players?.[0]) return null
      const host = battle.players[0]
      const pending = battle.joinPartData || {}
      const fromJoining = pending.part_data || {}
      const partData = {
        ...fromJoining,
        ...(payload.part_data || payload.joiner_data || payload.joiner || payload.user || {})
      }
      const steamid =
        payload.part ??
        pending.part ??
        partData.steamid ??
        partData.steam_id ??
        payload.steamid ??
        payload.joiner_steamid ??
        payload.joiner ??
        null
      const skins = Array.isArray(payload.skins)
        ? payload.skins
        : Array.isArray(payload.part_skins)
          ? payload.part_skins
          : []
      const items = skins
        .map((item, idx) => this.mapCoinflipItem(item, idx))
        .filter((item) => item != null)
      const joinerValue = items.reduce((s, it) => s + Number(it?.price ?? 0), 0)
      const hostCoin = host.coin === 'hell' ? 'hell' : 'heaven'
      let coin
      if (partData.coin != null) {
        coin = this.normalizeCoinSideValue(partData.coin)
      } else if (payload.part_coin != null) {
        coin = this.normalizeCoinSideValue(payload.part_coin)
      } else {
        coin = hostCoin === 'heaven' ? 'hell' : 'heaven'
      }
      return {
        _id: steamid ?? `joiner-${battle._id}`,
        steamid,
        name: partData.name ?? partData.personaname ?? payload.name ?? 'Player',
        avatar:
          partData.avatar ??
          partData.avatarfull ??
          payload.avatar ??
          payload.avatarfull ??
          '/img/user/userImage.png',
        coin,
        chance:
          partData.chance != null
            ? Number(partData.chance) || 50
            : payload.part_chance != null
              ? Number(payload.part_chance) || 50
              : 50,
        value: Number(partData.value ?? joinerValue) || joinerValue,
        items
      }
    },
    applyCoinflipSubscribePayload(payload) {
      if (!payload || typeof payload !== 'object') return
      const gamesSource = payload.games
      let incomingGames = []
      if (Array.isArray(gamesSource)) {
        incomingGames = gamesSource
      } else if (gamesSource && typeof gamesSource === 'object') {
        incomingGames = Object.entries(gamesSource).map(([id, game]) => ({
          ...(game || {}),
          gameid: game?.gameid ?? id
        }))
      }
      if (incomingGames.length) {
        const mapped = incomingGames
          .map((game, idx) => this.mapSocketGameToBattle(game, game?.gameid ?? idx))
          .filter(Boolean)
        this.$store.commit('setBattles', mapped)
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
          console.log('=====subscribe=====>', payload)
          this.applyCoinflipSubscribePayload(payload)
        })
      }
      this.coinflipSocketHandlers = {
        connect: () => subscribe(),
        subscribe: (payload) => {
          this.applyCoinflipSubscribePayload(payload)
        },
        hosted: (payload) => {
          const game = this.mapSocketGameToBattle(payload, payload?.gameid ?? payload?.id)
          if (!game) return
          this.$store.commit('upsertCoinflipGame', game)
        },
        updateStats: (payload) => {
          const lastCoin = this.normalizeCoinSideValue(payload?.last)
          if (!lastCoin) return
          this.previousCoinflips = [lastCoin, ...this.previousCoinflips].slice(0, 100)
        },
        joining: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null) return
          const battle = this.battles.find((b) => String(b._id) === String(gid))
          const patch = { joining: true }
          if (payload.part_data || payload.part != null) {
            patch.joinPartData = {
              part: payload.part,
              part_data: payload.part_data || {}
            }
          }
          if (battle?.players?.[0] && payload.host_chance != null) {
            const nextPlayers = [...battle.players]
            nextPlayers[0] = {
              ...nextPlayers[0],
              chance: Number(payload.host_chance)
            }
            patch.players = nextPlayers
          }
          this.$store.commit('patchBattleById', { battleId: gid, patch })
        },
        joined: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null) return
          const battle = this.battles.find((b) => String(b._id) === String(gid))
          if (!battle?.players?.[0]) return

          const joiner = this.buildJoinerPlayerFromJoinedPayload(payload, battle)
          if (!joiner) return

          let hostPlayer = { ...battle.players[0] }
          if (payload.host_chance != null) {
            hostPlayer = { ...hostPlayer, chance: Number(payload.host_chance) }
          }
          let joinerPlayer = { ...joiner }
          if (payload.part_chance != null) {
            joinerPlayer = { ...joinerPlayer, chance: Number(payload.part_chance) }
          }

          const hostItems = Array.isArray(hostPlayer.items) ? hostPlayer.items : []
          const joinItems = Array.isArray(joinerPlayer.items) ? joinerPlayer.items : []
          const hostSum = hostItems.reduce((s, it) => s + Number(it?.price ?? 0), 0)
          const joinSum = joinItems.reduce((s, it) => s + Number(it?.price ?? 0), 0)
          let total =
            payload.total_value != null ? Number(payload.total_value) : hostSum + joinSum
          if (!Number.isFinite(total) || total <= 0) {
            total = hostSum + joinSum
          }

          this.$store.commit('patchBattleById', {
            battleId: gid,
            patch: {
              players: [hostPlayer, joinerPlayer],
              total,
              state: 'in_progress',
              joining: false,
              joinPartData: null
            }
          })
        },
        cancelJoining: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null) return
          this.$store.commit('patchBattleById', {
            battleId: gid,
            patch: { joining: false, joinPartData: null }
          })
        },
        eosBlock: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null || payload?.block == null) return
          const battle = this.battles.find((b) => String(b._id) === String(gid))
          const prev =
            battle?.fairness && typeof battle.fairness === 'object' ? { ...battle.fairness } : {}
          this.$store.commit('patchBattleById', {
            battleId: gid,
            patch: {
              fairness: {
                ...prev,
                block: payload.block
              }
            }
          })
        },
        flip: (payload) => {
          const gid = payload?.gameid ?? payload?.gameId
          if (gid == null) return
          const battle = this.battles.find((b) => String(b._id) === String(gid))
          if (!battle?.players?.length) return

          const wSteam = payload.winner?.steamid
          const nextPlayers = battle.players.map((p) => {
            const won = wSteam != null && String(p.steamid) === String(wSteam)
            if (!won) return { ...p, win: false }
            const w = payload.winner || {}
            return {
              ...p,
              win: true,
              name: w.name ?? p.name,
              avatar: w.avatar ?? p.avatar,
              chance: w.chance != null ? Number(w.chance) || p.chance : p.chance,
              value: w.value != null ? Number(w.value) : p.value
            }
          })

          const fairness = {
            ticket: payload.ticket,
            hash: payload.hash,
            block: payload.block
          }

          this.$store.commit('patchBattleById', {
            battleId: gid,
            patch: {
              players: nextPlayers,
              state: 'finished',
              fairness
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
