<template>
  <!-- Sidebar + main align from the left (matches classic layout: rail | game | chat). -->
  <div class="w-full px-3 sm:px-4">
    <div
      class="flex flex-col xl:flex-row xl:justify-start xl:items-start gap-5 xl:gap-5 w-full"
    >
    <!-- history -->
    <div
      class="flex flex-col md:flex-row xl:flex-col gap-4 w-full max-w-full xl:w-[360px] xl:max-w-[360px] xl:flex-shrink-0 order-last lg:order-first"
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
      class="flex w-full min-w-0 flex-1 flex-col items-stretch gap-y-3 overflow-x-hidden max-w-[min(100%,900px)] xl:max-w-none"
    >
      <!-- TIMER AND POT -->

      <div
        class="flex items-center w-full max-w-full justify-center relative h-[120px] lg:h-[250px]"
      >
        <div
          class="flex items-center w-full justify-between gap-x-4 lg:gap-x-12 xl:gap-x-16 2xl:gap-x-24 3xl:gap-x-32 px-4 relative bg-[rgba(66,1,1,1)] h-fit lg:h-[103px]"
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
            :value="jackpotTimerRingValue"
            :max="jackpotTimerRingMax"
            :size="screenWidth > 1024 ? 254.5 : 120"
            :colorFilled="jackpotTimerRingColorFilled"
            :colorUnfilled="jackpotTimerRingColorUnfilled"
            :colorBack="jackpotTimerRingColorBack"
            :startAngle="0"
            strokeWidth="15"
            class="-ml-0.5 lg:-ml-[4.8545px] mt-[-1.04px] lg:-mt-[0.32rem]"
            ><span class="font-bold font-Rubik text-white text-[28px] lg:text-[60px]">{{
              displayTimerValue
            }}</span></CircleProgressBar
          >
        </div>
      </div>
      <p
        v-if="showWaitingForBlockIrreversible"
        class="w-full max-w-full px-4 text-center font-Rubik text-xs sm:text-sm text-[#d7b7b7] leading-snug mt-1"
      >
        <template v-if="fairness.eos != null && String(fairness.eos).trim() !== ''">
          Waiting for block {{ formatFairnessEos(fairness.eos) }} to be irreversible
        </template>
        <template v-else>Waiting for the EOS block to be irreversible</template>
      </p>
      <span
        v-if="showJackpotProvablyFairLine"
        class="flex flex-col items-center w-full max-w-full left-0 right-0 px-2 sm:px-4 text-center gap-0.5 top-[calc(100%+1rem)]"
      >
        <span class="font-Rubik font-medium text-sm text-[#FF4444]"
          >Ticket: {{ formatFairnessTicket(fairness.ticket) }}</span
        >
        <span
          class="font-Rubik font-medium text-xs sm:text-sm text-[#d7b7b7] font-mono break-all max-w-full"
          :title="fairness.hash && String(fairness.hash).length > 28 ? fairness.hash : undefined"
          >Hash: {{ formatFairnessLong(fairness.hash) }}</span
        >
        <!-- <span
          class="font-Rubik font-medium text-xs sm:text-sm text-[#d7b7b7] font-mono break-all max-w-full"
          :title="fairness.secret && String(fairness.secret).length > 28 ? fairness.secret : undefined"
          >Secret: {{ formatFairnessLong(fairness.secret) }}</span
        > -->
        <span class="font-Rubik font-medium text-sm text-[#d7b7b7]"
          >EOS: {{ formatFairnessEos(fairness.eos) }}</span
        >
      </span>

      <div
        class="w-full transition-all duration-700 max-w-[95vw] sm:max-w-[97vw] xl:max-w-full overflow-hidden lg:max-w-full"
        :class="{
          'h-[133px] opacity-100': showJackpotSpinnerRail,
          'h-0 opacity-0': !showJackpotSpinnerRail
        }"
      >
        <Spinner
          v-if="showJackpotSpinnerRail"
          ref="spinner"
          :pot_value="pot_value"
          :case-content="game.players"
          :roll-avatars="rollAvatars"
          :animation-type="rollAnimationType"
          :display-ticket="fairness.ticket"
          @complete="onJackpotSpinComplete"
        />
      </div>

      <!-- PLAYERS AND CONTROLS -->
      <div
        class="w-full flex flex-col gap-y-2 pb-3 mb-5 bg-[rgba(83,0,0,0.8)] border border-solid border-[rgba(83,0,0,1)] backdrop-blur-[200px] rounded-sm"
      >
        <!-- controls -->
        <div
          class="min-h-[59px] flex w-full items-center justify-center sm:justify-between gap-2 px-4 py-3 sm:py-0 bg-[rgba(98,1,1,1)] flex-wrap rounded-t-sm"
        >
          <!-- Left Start — row count matches list below (deposit lines, not always same as player count) -->
          <div class="font-Rubik font-bold text-base text-white whitespace-nowrap">
            CURRENT ENTRIES {{ jackpotDepositRowCount }}
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
        <div class="flex flex-col gap-y-3 px-4 pb-1">
          <template v-if="jackpotDepositRowCount === 0">
            <p class="text-center text-[#b89090] text-sm font-Rubik py-2">
              No deposits in this round yet.
            </p>
          </template>
          <template v-else>
            <Row
              v-for="dep in jackpotDepositRowsDisplay"
              :key="dep.key"
              :user="dep.player"
              :deposit-item="dep.item"
              :range-low="dep.rangeLow"
              :range-high="dep.rangeHigh"
              :chance-pct="dep.chancePct"
              :pot_value="pot_value"
            />
          </template>
        </div>
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
  mergeRoundPlayersPreservingItems,
  normalizeHistoryEntry,
  normalizePlayer,
  normalizeRound,
  potItemsFlattenedForDisplay,
  serverTimestampToMs,
  toNumber,
  tradeOfferUrlFromJackpotRollPayload
} from '@/services/jackpotClient'
import { getSteamId, isLoggedIn } from '@/auth/session'
import { useJackpotSocket } from '@/composables/useJackpotSocket'

/** Reel easing duration — must match product expectation (Jackpot_Spinner `spinDurationMs`). */
const JACKPOT_SPIN_DURATION_MS = 30000
/** After 30s spin: up to ~1s settle + 2s reel winner + detail; keep rail until `@complete`. */
const JACKPOT_SPIN_RAIL_EXTRA_MS = 4000

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
      secondsLeft: 0,
      serverRoundStartMs: null,
      serverRoundEndMs: null,
      /** Total round length in seconds (end − start), for the ring max. */
      timerTotalSeconds: 120,
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
      /** From `jackpot:roll` — controls spinner finish animation style (1..4). */
      rollAnimationType: 1,
      potId: 1,
      socket: null,
      socketControl: null,
      isRolling: false,
      opening: false,
      /** Resolved winner for the current roll; spin starts when local timer hits 0 (spinner visible). */
      pendingSpinWinner: null,
      jackpotSpinDone: false,
      intervalId: null,
      /** Keep spinner visible through backend reveal moment even if next startTimer arrives. */
      spinVisibleUntilMs: null,
      /** `serverNowMs - Date.now()` so countdowns match backend clock (not local clock skew). */
      serverTimeOffsetMs: 0,
      /** Dedupes duplicate `jackpot:roll` (same ticket/hash) or replays after refresh. */
      lastJackpotRollSignature: '',
      /** From latest `jackpot:roll` — Steam trade URL for the winner modal. */
      pendingWinnerTradeUrl: '',
      /** Dedupes opening the winner choice modal for the same roll. */
      lastJackpotWinnerModalSig: '',
      /**
       * After the reel animation completes, `refreshRound` often reapplies `serverRoundEndMs`.
       * If that `end` is still in the past, `byEnd` becomes true again and the spinner rail
       * re-expands (looks like a "second" spinner). Suppress until a new betting phase or spin.
       */
      suppressJackpotSpinnerRailAfterReveal: false,
      /** After `@complete`, keep the spinner rail expanded so winner text stays visible until `resetFairnessForNewRound`. */
      jackpotWinnerRevealVisible: false,
      /**
       * REST often returns start/end with `end` already in the past after a refresh, which made
       * `byEnd` true immediately and showed an empty/stale spinner. Keep the rail hidden until a
       * live betting window (`now < end`), socket `jackpot:startTimer`, or a roll-driven spin.
       */
      jackpotSpinnerRailAllowed: false,
      /** Ticket / hash / EOS row only after `Spinner` emits `complete` (not when roll arrives / spin starts). */
      jackpotFairnessShownAfterSpin: false
    }
  },
  created() {},
  computed: {
    hasAtLeastTwoDistinctSteamPlayers() {
      const players = Array.isArray(this.game?.players) ? this.game.players : []
      const ids = new Set()
      for (const p of players) {
        const sid = p?.steamid
        if (sid != null && String(sid).trim() !== '') ids.add(String(sid))
      }
      return ids.size >= 2
    },
    /**
     * Betting countdown is off during spin reveal or after server `end` has passed.
     * Do not use `game.status` here — `jackpot:startTimer` does not merge a new round object,
     * so status would stay stale (e.g. `rolling`) and block the timer until a full page refresh.
     */
    isRoundEndingPhase() {
      if (this.jackpotSpinDone) return true
      if (this.serverRoundEndMs != null && this.nowMs() >= this.serverRoundEndMs) return true
      return false
    },
    /**
     * Betting window ended, still waiting on chain — show EOS finality message.
     * Hide as soon as `jackpot:roll` data exists (same moment as ticket/hash row appears).
     */
    showWaitingForBlockIrreversible() {
      if (this.hasJackpotFairnessFromRoll) return false
      if (!this.hasAtLeastTwoDistinctSteamPlayers) return false
      if (this.serverRoundEndMs == null || this.jackpotSpinDone) return false
      void this.secondsLeft
      return this.nowMs() >= this.serverRoundEndMs
    },
    isWaitingStatus() {
      const s = this.game?.status ?? this.game?.state ?? null
      if (s == null) return false
      const v = String(s).toLowerCase()
      return v === 'waiting'
    },
    hasJackpotFairnessFromRoll() {
      const t = this.fairness?.ticket
      const h = this.fairness?.hash
      const ticketOk = t != null && String(t).trim() !== ''
      const hashOk = h != null && String(h).trim() !== ''
      return ticketOk && hashOk
    },
    showJackpotProvablyFairLine() {
      return (
        this.hasJackpotFairnessFromRoll &&
        this.jackpotFairnessShownAfterSpin &&
        this.showJackpotSpinnerRail
      )
    },
    /** Ring + label: no backend end time yet → empty ring. */
    displayTimerValue() {
      if (this.isWaitingStatus) return this.timerTotalSeconds
      if (this.serverRoundEndMs == null) return 0
      if (this.isRoundEndingPhase) return this.secondsLeft
      if (!this.hasAtLeastTwoDistinctSteamPlayers) return this.displayTimerMax
      return this.secondsLeft
    },
    /** Must match the round window length used by `secondsLeft` / `displayTimerValue`. */
    jackpotTimerRingMax() {
      // const m = Math.max(1, Math.floor(toNumber(this.timerTotalSeconds, 120)))
      // return m
      return 120
    },
    /**
     * Progress ring value tracks the same number shown in the center (unlike older attempts that
     * forced `max` while the label still showed `secondsLeft`).
     */
    jackpotTimerRingValue() {
      return Math.max(0, Math.min(this.jackpotTimerRingMax, Math.floor(toNumber(this.displayTimerValue, 0))))
    },
    jackpotTimerRingColorFilled() {
      return '#04AB53'
    },
    jackpotTimerRingColorUnfilled() {
      return '#04AB53'
    },
    jackpotTimerRingColorBack() {
      return 'rgba(4, 171, 83, 0.2)'
    },
    displayTimerMax() {
      return 120
    },
    /** Spinner rail only after backend round end time has passed (timer driven by server `end`). */
    showJackpotSpinnerRail() {
      if (!this.hasAtLeastTwoDistinctSteamPlayers) return false
      if (this.jackpotWinnerRevealVisible) return true
      if (this.suppressJackpotSpinnerRailAfterReveal) return false
      if (!this.jackpotSpinnerRailAllowed) return false
      const now = this.nowMs()
      const byEnd = this.serverRoundEndMs != null && now >= this.serverRoundEndMs
      const byAnimation =
        this.spinVisibleUntilMs != null && now <= this.spinVisibleUntilMs
      return byEnd || byAnimation
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
    },
    /**
     * One row per deposit (offer/item): cumulative 0–100% wheel segments like history,
     * in API player order, then item order within each player.
     */
    jackpotDepositRows() {
      const players = Array.isArray(this.game?.players) ? this.game.players : []
      const pot = this.pot_value
      const rows = []
      let acc = 0
      for (const p of players) {
        const items = Array.isArray(p.items) ? p.items : []
        if (items.length === 0) {
          let c = Number(p.chance)
          if (!Number.isFinite(c)) c = 0
          if (c > 0 && c <= 1) c *= 100
          c = Math.min(100, Math.max(0, c))
          const rangeLow = acc
          const rangeHigh = Math.min(100, acc + c)
          acc = rangeHigh
          rows.push({
            key: `p-${p._id ?? p.steamid}-solo`,
            player: p,
            item: null,
            rangeLow,
            rangeHigh,
            chancePct: c
          })
          continue
        }
        items.forEach((it, idx) => {
          const c = this.depositChanceForItem(it, p, pot)
          const rangeLow = acc
          const rangeHigh = Math.min(100, acc + c)
          acc = rangeHigh
          const oid = it.offerid ?? it.id ?? idx
          rows.push({
            key: `d-${p._id ?? p.steamid}-${oid}-${idx}`,
            player: p,
            item: it,
            rangeLow,
            rangeHigh,
            chancePct: c
          })
        })
      }
      return rows
    },
    /** Newest / last deposits first (same as previous player reverse). */
    jackpotDepositRowsDisplay() {
      return [...this.jackpotDepositRows].reverse()
    },
    /** Matches the number of `Row` lines below (deposit segments), not always `game.players.length`. */
    jackpotDepositRowCount() {
      return this.jackpotDepositRows.length
    }
  },
  methods: {
    /** Current time aligned to server clock when `server_time` / socket `send` has been applied. */
    nowMs() {
      return Date.now() + this.serverTimeOffsetMs
    },
    syncServerTimeFromTimestamp(serverTs) {
      const ms = serverTimestampToMs(serverTs)
      if (ms == null || ms <= 0) return
      this.serverTimeOffsetMs = ms - Date.now()
    },
    syncServerTimeFromGame(g) {
      if (!g || typeof g !== 'object') return
      const st = g.server_time ?? g.serverTime
      if (st == null || st === '' || st === 0) return
      this.syncServerTimeFromTimestamp(st)
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth
    },
    /** Chance % for one deposit: API `item.chance`, else value share of pot. */
    depositChanceForItem(item, player, potValue) {
      if (item && item.chance != null && Number.isFinite(Number(item.chance))) {
        let c = Number(item.chance)
        if (c > 0 && c <= 1) c *= 100
        return Math.min(100, Math.max(0, c))
      }
      const price = toNumber(item?.price, 0)
      const pv = toNumber(potValue, 0)
      if (pv > 0 && price > 0) return Math.min(100, (price / pv) * 100)
      return 0
    },
    /** Provably-fair line: readable number for ticket. */
    formatFairnessTicket(raw) {
      const s = raw == null ? '' : String(raw).trim()
      if (!s) return '—'
      const n = Number(s.replace(/[^\d.-]/g, ''))
      if (Number.isFinite(n)) {
        return n.toLocaleString(undefined, {
          maximumFractionDigits: 14,
          minimumFractionDigits: 0
        })
      }
      return s
    },
    /** Long hex / secrets: compact on one line, full text still copy-friendly via title. */
    formatFairnessLong(raw) {
      const s = raw == null ? '' : String(raw).trim()
      if (!s) return '—'
      if (s.length <= 28) return s
      return `${s.slice(0, 14)}…${s.slice(-12)}`
    },
    formatFairnessEos(raw) {
      if (raw == null || String(raw).trim() === '') return '—'
      const t = String(raw).trim()
      return t.startsWith('#') ? t : `#${t}`
    },
    /** New betting round (socket): clear fairness and collapse winner rail for the next round. */
    resetFairnessForNewRound() {
      this.fairness = { ticket: '', hash: '', secret: '', eos: '' }
      this.rollAnimationType = 1
      this.jackpotWinnerRevealVisible = false
      this.jackpotFairnessShownAfterSpin = false
      this.$nextTick(() => this.$refs.spinner?.resetWinnerReveal?.())
    },
    demoOpen() {
      this.isRolling = true
      this.suppressJackpotSpinnerRailAfterReveal = false
      this.jackpotWinnerRevealVisible = false
      this.jackpotFairnessShownAfterSpin = false
      this.jackpotSpinnerRailAllowed = true
      if (!this.game.players?.length) return
      this.spinVisibleUntilMs = this.nowMs() + JACKPOT_SPIN_DURATION_MS + JACKPOT_SPIN_RAIL_EXTRA_MS
      this.$nextTick(() => {
        if (!this.$refs.spinner) return
        this.jackpotSpinDone = true
        this.$refs.spinner.demoSpin(
          this.game.players[0],
          undefined,
          undefined,
          JACKPOT_SPIN_DURATION_MS
        )
      })
    },
    isWinnerCurrentUser(winner) {
      // const sid = '76561197984485194'
      const sid = getSteamId()
      if (!sid || !winner?.steamid) return false
      return String(winner.steamid) === String(sid)
    },
    findWinnerByTicket(ticketRaw) {
      const t = toNumber(String(ticketRaw ?? '').replace(/[^\d.-]/g, ''), NaN)
      if (!Number.isFinite(t)) return null
      const players = Array.isArray(this.game.players) ? this.game.players : []
      for (const p of players) {
        const min = toNumber(p.ticketRange?.min, 0)
        const max = toNumber(p.ticketRange?.max, 0)
        if (max >= min && t >= min && t <= max) return p
      }
      return null
    },
    /**
     * Round ends after ~30s; backend sends `jackpot:roll` with winner, ticket, avatars.
     * Spin + winner UI are driven only by that event (not by the local timer hitting 0).
     */
    startJackpotSpinFromRoll() {
      if (!this.hasAtLeastTwoDistinctSteamPlayers) return
      if (this.jackpotSpinDone) return

      const target =
        this.pendingSpinWinner || this.findWinnerByTicket(this.fairness.ticket)
      if (!target) return

      this.suppressJackpotSpinnerRailAfterReveal = false
      this.jackpotSpinnerRailAllowed = true
      this.jackpotWinnerRevealVisible = false
      this.jackpotFairnessShownAfterSpin = false
      this.jackpotSpinDone = true
      const syncSeed = [this.fairness.ticket, this.fairness.hash, this.game?._id]
        .filter((x) => x != null && String(x).length > 0)
        .join('|')
      const winningTicket = toNumber(
        String(this.fairness.ticket ?? '').replace(/[^\d.-]/g, ''),
        NaN
      )
      this.spinVisibleUntilMs = this.nowMs() + JACKPOT_SPIN_DURATION_MS + JACKPOT_SPIN_RAIL_EXTRA_MS
      this.$nextTick(() => {
        this.$refs.spinner?.demoSpin(
          target,
          syncSeed || undefined,
          Number.isFinite(winningTicket) ? winningTicket : undefined,
          JACKPOT_SPIN_DURATION_MS
        )
      })
    },
    async onJackpotSpinComplete() {
      this.spinVisibleUntilMs = null
      this.jackpotWinnerRevealVisible = true
      if (this.hasJackpotFairnessFromRoll) {
        this.jackpotFairnessShownAfterSpin = true
      }

      const winnerForResults =
        this.pendingSpinWinner || this.findWinnerByTicket(this.fairness.ticket)
      this.pendingSpinWinner = null

      const rollSig = `${String(this.game?._id ?? '')}|${String(this.fairness.ticket ?? '')}|${String(this.fairness.hash ?? '')}`
      if (
        winnerForResults &&
        this.isWinnerCurrentUser(winnerForResults) &&
        rollSig !== this.lastJackpotWinnerModalSig &&
        rollSig !== '||'
      ) {
        this.lastJackpotWinnerModalSig = rollSig
        const items = potItemsFlattenedForDisplay(this.game?.players)
        openModal('jackpot winner choice', {
          tradeOfferUrl: this.pendingWinnerTradeUrl,
          potValue: this.pot_value,
          potId: this.potId,
          loadInventory: () => this.loadUserInventory(),
          deposit: (skins) => this.depositSelectedSkins(skins),
          avatar: winnerForResults.avatar || '/img/user/userImage.png',
          items
        })
      }

      // Stop round countdown; next round timing comes from `jackpot:startTimer` / REST when ready.
      this.stopTimerTick()
      this.serverRoundStartMs = null
      this.serverRoundEndMs = null
      this.secondsLeft = 0

      const prevGameId = this.game?._id
      try {
        await this.refreshRound()
      } finally {
        const prevNum = toNumber(prevGameId, NaN)
        const currNum = toNumber(this.game?._id, NaN)
        if (Number.isFinite(prevNum) && Number.isFinite(currNum) && currNum === prevNum) {
          this.game._id = currNum + 1
        }
      }
    },
    async refreshRound({ includeHistory = false, includeLucky = false, skipApplyTiming = false } = {}) {
      try {
        const round = await getRound({
          potid: this.potId,
          history: includeHistory,
          lucky: includeLucky
        })
        if (round && Array.isArray(round.players)) {
          const prev = Array.isArray(this.game?.players) ? this.game.players : []
          round.players = mergeRoundPlayersPreservingItems(prev, round.players)
          this.game = round
          this.syncServerTimeFromGame(round)
        }
        if (!skipApplyTiming) this.applyRoundTiming()
      } catch (error) {
        console.error('Failed to fetch jackpot round:', error)
      }
    },
    applyRoundTiming() {
      const g = this.game
      if (!g) return
      const start = g.start
      const end = g.end
      const startMs = serverTimestampToMs(start)
      const endMs = serverTimestampToMs(end)
      if (startMs && endMs) {
        this.applyServerTimer(start, end)
        return
      }
      // REST often sends 0/0 or omits timing while state is `not_started`; the socket may
      // already have applied `jackpot:startTimer` — do not wipe that.
      const roundCountdownStillLive =
        this.serverRoundEndMs != null && this.nowMs() < this.serverRoundEndMs
      const spinRevealInProgress =
        this.spinVisibleUntilMs != null && this.nowMs() <= this.spinVisibleUntilMs
      if (roundCountdownStillLive || spinRevealInProgress || this.jackpotWinnerRevealVisible) {
        return
      }
      this.clearServerTimer()
      this.jackpotSpinDone = false
      this.pendingSpinWinner = null
    },
    /** Backend `jackpot:startTimer` + REST round sync. */
    applyServerTimer(start, end) {
      const startMs = serverTimestampToMs(start)
      const endMs = serverTimestampToMs(end)
      if (!startMs || !endMs) return
      this.jackpotSpinDone = false
      this.pendingSpinWinner = null
      this.serverRoundStartMs = startMs
      this.serverRoundEndMs = endMs
      this.timerTotalSeconds = Math.max(1, Math.ceil((endMs - startMs) / 1000))
      const now = this.nowMs()
      // New round with betting still open — allow spinner rail again when this round's end passes.
      if (now < endMs) {
        this.suppressJackpotSpinnerRailAfterReveal = false
        this.jackpotSpinnerRailAllowed = true
      } else {
        const inSpinWindow =
          this.spinVisibleUntilMs != null && now <= this.spinVisibleUntilMs
        if (inSpinWindow) {
          this.jackpotSpinnerRailAllowed = true
        } else if (!this.jackpotWinnerRevealVisible) {
          this.jackpotSpinnerRailAllowed = false
        }
      }
      // Round is closing (server state, past end time, or spin): do not run the countdown interval.
      if (this.isRoundEndingPhase) {
        this.stopTimerTick()
        this.secondsLeft = Math.max(0, Math.ceil((endMs - this.nowMs()) / 1000))
        return
      }
      if (this.isWaitingStatus) {
        this.stopTimerTick()
        this.secondsLeft = this.timerTotalSeconds
        return
      }
      // If the pot doesn't have 2+ distinct steam IDs, do not run the timer/spin.
      if (!this.hasAtLeastTwoDistinctSteamPlayers) {
        this.stopTimerTick()
        // Freeze timer at the full length until backend condition is met again.
        this.secondsLeft = this.timerTotalSeconds
        return
      }
      this.secondsLeft = Math.max(0, Math.ceil((endMs - this.nowMs()) / 1000))
      this.startTimerTick()
    },
    clearServerTimer() {
      this.stopTimerTick()
      this.serverRoundStartMs = null
      this.serverRoundEndMs = null
      this.secondsLeft = 0
      this.timerTotalSeconds = 120
    },
    timerTick() {
      if (this.serverRoundEndMs == null) return
      if (this.isRoundEndingPhase) {
        this.stopTimerTick()
        this.secondsLeft = Math.max(0, Math.ceil((this.serverRoundEndMs - this.nowMs()) / 1000))
        return
      }
      if (this.isWaitingStatus) {
        this.stopTimerTick()
        this.secondsLeft = this.timerTotalSeconds
        return
      }
      if (!this.hasAtLeastTwoDistinctSteamPlayers) {
        this.stopTimerTick()
        // Freeze timer at the full length until condition is met again.
        this.secondsLeft = this.timerTotalSeconds
        return
      }
      const left = Math.max(0, Math.ceil((this.serverRoundEndMs - this.nowMs()) / 1000))
      this.secondsLeft = left
    },
    startTimerTick() {
      if (this.isRoundEndingPhase) {
        this.stopTimerTick()
        if (this.serverRoundEndMs != null) {
          this.secondsLeft = Math.max(0, Math.ceil((this.serverRoundEndMs - this.nowMs()) / 1000))
        }
        return
      }
      this.stopTimerTick()
      this.timerTick()
      this.intervalId = setInterval(() => this.timerTick(), 250)
    },
    stopTimerTick() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    sortJackpotHistoryByGameIdDesc(entries) {
      const list = Array.isArray(entries) ? entries.slice() : []
      list.sort((a, b) => {
        const ga = toNumber(a?.gameid ?? a?._id, NaN)
        const gb = toNumber(b?.gameid ?? b?._id, NaN)
        const aNum = Number.isFinite(ga)
        const bNum = Number.isFinite(gb)
        if (aNum && bNum && ga !== gb) return gb - ga
        if (aNum && !bNum) return -1
        if (!aNum && bNum) return 1
        const sa = String(a?.gameid ?? a?._id ?? '')
        const sb = String(b?.gameid ?? b?._id ?? '')
        return sb.localeCompare(sa, undefined, { numeric: true })
      })
      return list
    },
    async refreshHistory() {
      try {
        const list = await getHistory()
        if (list.length) this.history = this.sortJackpotHistoryByGameIdDesc(list)
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
            const old = this.game.players[idx]
            const merged = { ...old, ...np }
            const newItems = Array.isArray(np.items) ? np.items : []
            const oldItems = Array.isArray(old.items) ? old.items : []
            merged.items = newItems.length > 0 ? newItems : oldItems
            this.game.players.splice(idx, 1, merged)
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
            const prev = Array.isArray(this.game?.players) ? this.game.players : []
            round.players = mergeRoundPlayersPreservingItems(prev, round.players)
            this.game = round
            this.syncServerTimeFromGame(round)
            this.applyRoundTiming()
          }
          if (Array.isArray(payload.history)) {
            const mapped = payload.history.map((entry) => normalizeHistoryEntry(entry))
            this.history = this.sortJackpotHistoryByGameIdDesc(mapped)
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
        onEOSBlock: (blockid) => {
          this.fairness.eos = blockid ?? ''
        },
        onStartTimer: ({ start, end, send } = {}) => {
          if (start != null && end != null) {
            if (send != null) this.syncServerTimeFromTimestamp(send)
            this.lastJackpotRollSignature = ''
            this.pendingWinnerTradeUrl = ''
            this.lastJackpotWinnerModalSig = ''
            this.suppressJackpotSpinnerRailAfterReveal = false
            this.resetFairnessForNewRound()
            this.applyServerTimer(start, end)
          }
        },
        onRoll: async (payload) => {
          const { ticket, hash, block, avatars, winner, winner_data, animation_type } =
            payload || {}
          const rollSig = `${String(ticket ?? '')}|${String(hash ?? '')}`
          if (rollSig === this.lastJackpotRollSignature && rollSig !== '|') return
          this.lastJackpotRollSignature = rollSig

          this.fairness.ticket = ticket ?? ''
          this.fairness.hash = hash ?? ''
          this.fairness.eos =
            block && typeof block === 'object' && block.id != null
              ? block.id
              : block?.id ?? block ?? this.fairness.eos
          this.fairness.secret = this.fairness.secret || ''
          this.rollAvatars = Array.isArray(avatars) ? avatars : []
          const parsedAnimationType = Number(animation_type)
          this.rollAnimationType =
            Number.isFinite(parsedAnimationType) && parsedAnimationType >= 1
              ? Math.min(4, Math.floor(parsedAnimationType))
              : 1
          this.pendingWinnerTradeUrl = tradeOfferUrlFromJackpotRollPayload(payload)

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
          if (!spinTarget && this.fairness.ticket) {
            spinTarget = this.findWinnerByTicket(this.fairness.ticket)
          }
          if (!spinTarget && this.game.players?.length) {
            spinTarget = this.game.players[0]
          }

          if (spinTarget && this.game.players?.length) {
            this.pendingSpinWinner = spinTarget
            this.startJackpotSpinFromRoll()
          } else if (spinTarget) {
            this.pendingSpinWinner = spinTarget
            this.startJackpotSpinFromRoll()
        } else {
          this.demoOpen()
          }
        },
        onLastHistory: async (payload) => {
          const historyEntry = payload?.history ?? payload
          if (historyEntry) {
            const merged = [normalizeHistoryEntry(historyEntry), ...this.history].slice(0, 20)
            this.history = this.sortJackpotHistoryByGameIdDesc(merged)
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
      if (!isLoggedIn()) {
        const path = this.$route?.fullPath || '/jackpot'
        openModal('login', { redirectTo: path.startsWith('/') ? path : '/jackpot' })
        return
      }
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
    this.stopTimerTick()
    this.disconnectJackpotSocket()
    window.removeEventListener('resize', this.updateScreenWidth)
  },
  watch: {
    'game.players': {
      deep: true,
      handler() {
        // If backend started the timer but we currently don't have 2+ distinct users,
        // keep the UI/timer paused until the pot grows.
        if (this.serverRoundEndMs == null) return
        if (this.isRoundEndingPhase) return
        if (this.isWaitingStatus) {
          this.stopTimerTick()
          this.secondsLeft = this.timerTotalSeconds
          return
        }
        if (!this.hasAtLeastTwoDistinctSteamPlayers) {
          this.stopTimerTick()
          this.secondsLeft = this.timerTotalSeconds
          return
        }
        // Resume ticking when allowed.
        if (!this.intervalId) this.startTimerTick()
      }
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
  background: #870000;
  border-radius: 4px;
}
</style>
