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
              Number(biggest_win?.winnings ?? 0).toLocaleString(undefined, {
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
              backgroundImage: `url(${biggest_win?.avatar || '/img/user/userImage.png'})`
            }"
          ></div>
          <div class="text-white text-xl font-bold font-['Rubik'] uppercase leading-normal">
            {{ biggest_win?.name ?? '—' }}
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
                type="button"
                class="text-right text-[#d7b7b7] text-xs font-semibold font-['Rubik'] uppercase leading-[18px] hover:text-white cursor-pointer"
                @click="openJackpotHistoryDetails(item)"
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
            :value="isWaiting ? 120 : secondsLeft"
            :max="120"
            :size="screenWidth > 1024 ? 254.5 : 120"
            :colorUnfilled="'rgba(4,171,83,1)'"
            :colorBack="'rgba(4,171,83,0.2)'"
            :startAngle="0"
            strokeWidth="15"
            class="-ml-0.5 lg:-ml-[4.8545px] mt-[-1.04px] lg:-mt-[0.32rem]"
            ><span class="font-bold font-Rubik text-white text-[28px] lg:text-[60px]">{{
              isWaiting ? 120 : secondsLeft
            }}</span></CircleProgressBar
          >
        </div>
      </div>
      <span
        class="flex flex-col items-center w-full left-0 right-0 whitespace-nowrap top-[calc(100%+1rem)]"
      >
        <span class="font-Rubik font-medium text-sm text-[#FF4444]"
          >Ticket: {{ fairness.ticket || '-' }}</span
        >
        <span class="font-Rubik font-medium text-sm text-[#d7b7b7]"
          >Hash: {{ fairness.hash || '-' }}</span
        >
        <span class="font-Rubik font-medium text-sm text-[#d7b7b7]"
          >Secret: {{ fairness.secret || '-' }}</span
        >
        <span class="font-Rubik font-semimediumbold text-sm text-[#d7b7b7]"
          >EOS: {{ fairness.eos ? `#${fairness.eos}` : '-' }}</span
        >
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
                @click="openJackpotDepositModal"
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
            v-for="item in (game.players || []).slice().reverse()"
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
import {
  depositToJackpot,
  getHistory,
  getLuckiest,
  getRound,
  loadInventory,
  normalizeHistoryEntry,
  normalizePlayer,
  normalizeRound,
  toNumber
} from '@/services/jackpotClient'
import { getSteamId } from '@/auth/session'
import { useJackpotSocket } from '@/composables/useJackpotSocket'
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
      secondsLeft: 120,
      game: {
        _id: 1,
        players: []
      },
      biggest_win: {},
      history: [],
      screenWidth: window.innerWidth,
      fairness: {
        ticket: '',
        hash: '',
        secret: '',
        eos: ''
      },
      latestTotalValue: 0,
      /** From `jackpot:roll` — use for synced reel avatars when you wire the spinner */
      rollAvatars: [],
      potId: 1,
      socket: null,
      socketControl: null,
      isRolling: false,
      opening: false
    }
  },
  created() {},
  computed: {
    isWaiting() {
      return String(this.game?.status ?? '').toLowerCase() === 'waiting'
    },
    pot_value() {
      if (this.latestTotalValue > 0) return this.latestTotalValue
      let items_val = 0
      const players = Array.isArray(this.game.players) ? this.game.players : []
      players.forEach((user) => {
        const items = Array.isArray(user?.items) ? user.items : []
        items.forEach((item) => {
          items_val += toNumber(item.price ?? item.value, 0)
        })
      })
      return items_val
    },
    num_of_items() {
      let num = 0
      const players = Array.isArray(this.game.players) ? this.game.players : []
      players.forEach((user) => {
        num += (Array.isArray(user?.items) ? user.items : []).length
      })
      return num
    }
  },
  methods: {
    updateScreenWidth() {
      this.screenWidth = window.innerWidth
    },
    demoOpen() {
      this.isRolling = true
      if (this.$refs.spinner && this.game.players?.length) {
        this.$refs.spinner.demoSpin(this.game.players[0])
      }
    },
    async refreshRound({ includeHistory = false, includeLucky = false } = {}) {
      try {
        const round = await getRound({
          potid: this.potId,
          history: includeHistory,
          lucky: includeLucky
        })
        if (round && Array.isArray(round.players)) {
          this.game = round
        }
        this.applyRoundTiming(round)
      } catch (error) {
        console.error('Failed to fetch jackpot round:', error)
      }
    },
    applyRoundTiming(round) {
      const status = String(round?.status ?? '').toLowerCase()
      if (status === 'waiting') {
        this.stopCountdown()
        this.secondsLeft = 120
        return
      }
      const now = toNumber(round?.server_time, Math.floor(Date.now() / 1000))
      const end = toNumber(round?.end, 0)
      if (end > now) {
        this.restartCountdown(Math.max(0, end - now))
      } else {
        this.stopCountdown()
      }
    },
    async refreshHistory() {
      try {
        const list = await getHistory()
        if (list.length) this.history = list
      } catch (error) {
        console.error('Failed to fetch jackpot history:', error)
      }
    },
    async refreshLuckiest() {
      try {
        const luckiest = await getLuckiest()
        if (luckiest) this.biggest_win = luckiest
      } catch (error) {
        console.error('Failed to fetch jackpot luckiest:', error)
      }
    },
    applyJackpotNewDeposit(payload) {
      if (!payload || typeof payload !== 'object') return
      const { deposit, chances, total_value } = payload
      if (total_value != null) {
        this.latestTotalValue = toNumber(total_value, this.latestTotalValue)
      }
      if (!Array.isArray(this.game.players)) this.game.players = []
      if (Array.isArray(chances)) {
        chances.forEach((c) => {
          const oid = c?.offerid ?? c?.offer_id
          const ch = toNumber(c?.chance ?? c?.ch, NaN)
          if (oid == null || !Number.isFinite(ch)) return
          const key = String(oid)
          let applied = false
          for (const p of this.game.players) {
            if (p.offerid != null && String(p.offerid) === key) {
              p.chance = ch
              applied = true
              break
            }
            if (Array.isArray(p.items)) {
              const it = p.items.find((i) => i.offerid != null && String(i.offerid) === key)
              if (it) {
                it.chance = ch
                applied = true
              }
            }
          }
          if (!applied) {
            /* no row yet — refreshRound will sync */
          }
        })
      }
      if (deposit) {
        try {
          const np = normalizePlayer(deposit)
          const byOffer =
            np.offerid != null
              ? this.game.players.findIndex((p) => String(p.offerid) === String(np.offerid))
              : -1
          const bySteam =
            np.steamid != null
              ? this.game.players.findIndex(
                  (p) => p.steamid && String(p.steamid) === String(np.steamid)
                )
              : -1
          const idx = byOffer >= 0 ? byOffer : bySteam
          if (idx >= 0) {
            this.game.players.splice(idx, 1, { ...this.game.players[idx], ...np })
          } else {
            this.game.players.push(np)
          }
        } catch (_) {
          /* ignore */
        }
      }
    },
    connectJackpotSocket() {
      if (this.socketControl) return
      this.socketControl = useJackpotSocket({
        potId: this.potId,
        getSteamId: () => getSteamId(),
        onConnectError: (error, debug) => {
          console.error('Jackpot socket connection error:', error, debug)
        },
        onSubscribe: (payload) => {
          if (!payload || typeof payload !== 'object') return
          const round = normalizeRound(payload)
          if (round && Array.isArray(round.players)) {
            this.game = round
            this.applyRoundTiming(round)
          }
          if (Array.isArray(payload.history)) {
            this.history = payload.history.map((entry) => normalizeHistoryEntry(entry))
          }
          if (payload.luckiest) {
            this.biggest_win = normalizeHistoryEntry(payload.luckiest)
          }
          const totalFromSocket = toNumber(payload?.jackpot?.total_value, NaN)
          if (Number.isFinite(totalFromSocket)) {
            this.latestTotalValue = totalFromSocket
            this.$store.commit('setJackpotNavTotal', totalFromSocket)
          }
        },
        onNewDeposit: async (payload) => {
          this.applyJackpotNewDeposit(payload)
          await this.refreshRound()
        },
        onValueUpdate: (totalValue) => {
          const v = toNumber(totalValue, 0)
          this.latestTotalValue = v
          this.$store.commit('setJackpotNavTotal', v)
        },
        onEOSBlock: ({ block, blockid }) => {
          const id =
            block && typeof block === 'object' && block.id != null
              ? block.id
              : block?.id ??
                blockid ??
                (typeof block === 'string' || typeof block === 'number' ? block : '')
          this.fairness.eos = id ?? ''
        },
        onStartTimer: ({ start, end, send }) => {
          const now = Math.floor(Date.now() / 1000)
          const startTs = toNumber(start, now)
          const endTs = toNumber(end ?? send, startTs)
          this.restartCountdown(Math.max(0, endTs - now))
        },
        onRoll: async ({ ticket, hash, block, avatars, winner, winner_data }) => {
          this.fairness.ticket = ticket ?? ''
          this.fairness.hash = hash ?? ''
          this.fairness.eos =
            block && typeof block === 'object' && block.id != null
              ? block.id
              : block?.id ?? block ?? this.fairness.eos
          this.fairness.secret = this.fairness.secret || ''
          this.rollAvatars = Array.isArray(avatars) ? avatars : []

          let spinTarget = null
          const winnerPayload = winner_data || winner
          if (winnerPayload) {
            try {
              spinTarget = normalizePlayer(winnerPayload)
            } catch (_) {
              spinTarget = winnerPayload
            }
            if (this.game.players?.length) {
              const matched = this.game.players.find(
                (player) =>
                  player.steamid &&
                  winnerPayload.steamid &&
                  String(player.steamid) === String(winnerPayload.steamid)
              )
              if (matched) spinTarget = { ...matched, ...spinTarget }
            }
          }

          if (spinTarget && this.game.players?.length) {
            this.$refs.spinner?.demoSpin(spinTarget)
          } else if (this.game.players?.length) {
            this.$refs.spinner?.demoSpin(this.game.players[0])
          } else {
            this.demoOpen()
          }
          await this.refreshRound()
        },
        onLastHistory: async (payload) => {
          const historyEntry = payload?.history ?? payload
          if (historyEntry) {
            this.history = [normalizeHistoryEntry(historyEntry), ...this.history].slice(0, 20)
          }
          await this.refreshRound()
        },
        onLuckiest: (payload) => {
          if (!payload) return
          this.biggest_win = normalizeHistoryEntry(payload)
        }
      })
      this.socket = this.socketControl.connect()
    },
    disconnectJackpotSocket() {
      this.socketControl?.disconnect()
      this.socketControl = null
      this.socket = null
    },
    async loadUserInventory() {
      const steamid = getSteamId()
      if (!steamid) return []
      return loadInventory(steamid)
    },
    async depositSelectedSkins(skins) {
      const steamid = getSteamId()
      if (!steamid) throw new Error('User is not logged in.')
      if (!Array.isArray(skins) || skins.length === 0) throw new Error('No skins selected.')
      const result = await depositToJackpot({ steamid, skins })
      // Do not await — refresh can be slow; server broadcasts jackpot:newDeposit anyway.
      void this.refreshRound().catch((err) => console.error('refreshRound after deposit:', err))
      return result
    },
    openJackpotDepositModal() {
      openModal('jackpot deposit', {
        potId: this.potId,
        loadInventory: () => this.loadUserInventory(),
        deposit: (skins) => this.depositSelectedSkins(skins)
      })
    },
    openJackpotHistoryDetails(item) {
      const gameid = item?.gameid ?? item?._id
      if (gameid == null || gameid === '') return
      this.openModal('jackpot history details', { gameid, potId: this.potId })
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
      if (this.isWaiting) return
      if (this.intervalId) return

      this.intervalId = setInterval(() => {
        if (this.isWaiting) {
          this.stopCountdown()
          return
        }
        if (this.secondsLeft > 0) {
          this.secondsLeft--
        } else {
          this.stopCountdown()
          this.secondsLeft = 0
        }
      }, 1000)
    }
  },
  async mounted() {
    await Promise.all([this.refreshRound(), this.refreshHistory(), this.refreshLuckiest()])
    if (this.pot_value > 0) {
      this.$store.commit('setJackpotNavTotal', this.pot_value)
    }
    this.connectJackpotSocket()
    window.addEventListener('resize', this.updateScreenWidth)
  },
  beforeUnmount() {
    this.stopCountdown()
    this.disconnectJackpotSocket()
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
