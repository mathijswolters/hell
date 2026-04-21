<template>
  <div>
    <canvas
      ref="confetti"
      class="fixed left-0 top-0 w-full h-full -z-10"
      @click="closeModal"
    ></canvas>
    <div
      class="relative lg:min-w-[57rem] w-[96vw] lg:max-w-[57rem] flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] h-full"
    >
      <!-- Header Start -->
      <div
        class="flex justify-between w-full h-[59px] items-center px-4 border-b border-b-solid border-b-[rgb(255,255,255,0.2)]"
      >
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-Rubik font-extrabold text-white text-base"
            >COINFLIP #{{ battle._id }}</span
          >
          <span
            class="font-Rubik font-extrabold text-white text-base flex gap-1 relative group cursor-pointer"
            v-if="battle.double_down"
            ><p class="text-base font-extrabold font-Rubik text-[#FF3435]">DOUBLE DOWN</p>
            x2
            <div
              class="absolute z-20 top-full w-0 opacity-0 group-hover:max-h-[240px] overflow-y-auto overflow-x-hidden group-hover:w-[306px] group-hover:opacity-100 transition-all duration-300 flex flex-col bg-[#840808] rounded-sm border border-solid border-[#ff3435] scrollColor"
              :style="{
                height:
                  battle.double_down.length >= 6
                    ? '240px'
                    : `${40 * battle.double_down.length + 4}px`
              }"
            >
              <div
                class="h-10 w-full px-2 group-hover:opacity-100 opacity-0 transition-all duration-300"
                v-for="(previous_battle, index) in battle.double_down"
                :key="index"
              >
                <div class="flex items-center h-full w-full gap-2 py-2">
                  <div
                    class="flex items-center gap-3 pr-2 border-r border-r-solid border-r-[#FF3435] whitespace-nowrap"
                  >
                    <div class="relative flex items-center transition-opacity duration-200">
                      <div class="rounded-full -right-2 w-4 absolute">
                        <img
                          :src="`/img/coins/${previous_battle.players[0].coin}.png`"
                          class="w-full h-full"
                        />
                      </div>

                      <div
                        class="w-[24px] h-[24px] rounded-sm bg-no-repeat bg-center bg-cover"
                        :style="{
                          backgroundImage: `url(${previous_battle.players[0].avatar})`
                        }"
                      ></div>
                    </div>

                    <span class="font-Rubik text-[#d7b7b7] text-xs font-semibold">VS</span>
                    <div
                      class="relative flex items-center transition-opacity duration-200 opacity-50"
                    >
                      <div class="border-[2px] border-[#740c0a] rounded-full -left-2 w-4 absolute">
                        <img
                          :src="`/img/coins/${previous_battle.players[1].coin}.png`"
                          class="w-full h-full"
                        />
                      </div>

                      <div
                        class="w-[24px] h-[24px] rounded-sm bg-no-repeat bg-center bg-cover"
                        :style="{
                          backgroundImage: `url(${previous_battle.players[1].avatar})`
                        }"
                      ></div>
                    </div>
                  </div>
                  <div class="flex flex-col justify-center h-full whitespace-nowrap">
                    <span class="font-bold font-Rubik text-xs mt-2 text-white"
                      ><span class="font-bold font-Rubik text-xs text-[#04ab53]">$</span
                      >{{
                        Number(previous_battle.total).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2
                        })
                      }}</span
                    >
                    <span class="font-semibold font-Rubik text-[8px] text-[#d7b7b7] -mt-1.5"
                      >Needs: ${{
                        Number(calculateMinMaxNeed(previous_battle.total).min).toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                          }
                        )
                      }}
                      - ${{
                        Number(calculateMinMaxNeed(previous_battle.total).max).toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2
                          }
                        )
                      }}</span
                    >
                  </div>
                  <div class="flex items-center justify-end w-full h-full">
                    <button
                      @click="
                        openModal('coinflip game', { battle: battle, secondsLeft: secondsLeft })
                      "
                      class="flex items-center px-3 h-[28px] bg-[#FF3435] font-bold font-Rubik text-white text-sm whitespace-nowrap"
                    >
                      VIEW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>

        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
          @click="closeModal()"
        />
      </div>

      <div
        class="flex items-center justify-center flex-col w-full pt-8 relative transition-all duration-[0.4s]"
        :class="{
          'gap-4 sm:gap-8': battle.state !== 'finished',
          'gap-4 sm:gap-16': battle.state === 'finished'
        }"
      >
        <!-- <button @click="testfunction()">test</button>
        {{ battle }} -->
        <!-- Users and game Start -->
        <div class="flex items-start justify-between sm:justify-center sm:w-full sm:gap-x-20">
          <div
            v-if="battle.players.length == 1"
            class="w-[140px] sm:w-[9.25rem] sm:h-[9.25rem] order-3"
          ></div>
          <div
            v-for="(player, index) in battle.players"
            :key="index"
            :class="{
              'order-1': index == 0,
              'order-3': index == 1,
              'opacity-50 ': battle.state == 'finished' && !player.win,
              'pr-3': index == 1
            }"
            class="flex flex-col gap-y-4 justify-center items-center transition-opacity duration-[1000ms] w-[140px] sm:w-[9.25rem]"
          >
            <div
              class="w-[76.85px] h-[76.85px] sm:w-[9.25rem] sm:h-[9.25rem] rounded-[4px] flex items-center justify-center relative"
            >
              <img
                v-lazy="player.avatar"
                class="w-[76.85px] h-[76.85px] sm:w-[9.25rem] sm:h-[9.25rem] rounded-[4px] object-cover"
              />
              <img
                :src="`/img/coins/${player.coin}.png`"
                class="absolute sm:max-w-[3.5rem] w-9 sm:w-[3.5rem] rounded-full -bottom-4 sm:-bottom-5 z-10"
                :class="{
                  '-right-4 sm:-right-6': index == 1,
                  '-left-4 sm:-left-6 bg-[#420101]': index == 0
                }"
              />
            </div>
            <div
              class="font-Rubik text-white font-extrabold text-sm sm:text-base whitespace-nowrap truncate w-full text-center"
            >
              {{ player.name }}
            </div>
          </div>

          <div
            class="order-2 flex flex-col gap-y-4 h-full justify-center relative"
            :class="{ 'sm:ml-12': battle.players.length == 1 }"
          >
            <CircleProgressBar
              v-if="
                isLobbyCountdownVisible ||
                (battle.state == 'in_progress' && localSecondsLeft > 0)
              "
              :value="localSecondsLeft"
              :max="countdownMax"
              :size="screenWidth < 640 ? '90' : '148'"
              :colorUnfilled="battle.state == 'in_progress' ? '#04AB53' : '#FF3435'"
              :colorBack="battle.state == 'in_progress' ? 'rgb(4, 171, 83,0.2)' : '#FF343533'"
              :startAngle="0"
              :strokeWidth="screenWidth < 640 ? '15' : '15'"
              ><span class="font-extrabold font-Rubik text-white text-xl sm:text-[32px]">{{
                localSecondsLeft
              }}</span></CircleProgressBar
            >
            <div v-else class="h-[90px] sm:h-[148px] w-[90px] sm:w-[148px] relative z-20">
              <div id="coin_container" class="transition-all duration-[4500ms] z-10">
                <div
                  id="coin"
                  :class="{
                    flipping: isFlipping,
                    hellWinner: battle.state == 'finished' && winner.coin == 'hell'
                  }"
                >
                  <div id="front" :class="{ win: battle.state == 'finished' }">
                    <img src="../../assets/img/coins/heaven.png" />
                  </div>
                  <div id="back" :class="{ win: battle.state == 'finished' }">
                    <img src="../../assets/img/coins/hell.png" />
                  </div>
                </div>
              </div>
            </div>

            <span
              class="hidden sm:flex flex-col items-center w-full left-0 right-0 whitespace-nowrap top-[calc(100%+3rem)] sm:top-[calc(100%+1rem)] absolute"
            >
              <transition name="fade-slide">
                <span
                  v-if="battle.state === 'finished'"
                  class="font-Rubik font-medium text-sm"
                  :class="{
                    'text-[#93C8FB]': winner.coin === 'heaven',
                    'text-[#FF4444]': winner.coin === 'hell'
                  }"
                >
                  Ticket: {{ formatFairnessTicket(flipFairness.ticket) }}
                </span>
              </transition>
              <span
                v-if="battle.state === 'finished'"
                class="font-Rubik font-medium text-xs sm:text-sm text-[#d7b7b7] font-mono break-all max-w-full"
                :title="
                  flipFairness.hash && String(flipFairness.hash).length > 28
                    ? flipFairness.hash
                    : undefined
                "
              >
                Hash: {{ formatFairnessLong(flipFairness.hash) }}
              </span>
              <span
                v-if="fairnessBlockVisible"
                class="font-Rubik font-semibold text-sm text-[#d7b7b7]"
              >
                Block: {{ formatFairnessBlock(flipFairness.block) }}
              </span>
            </span>
          </div>
        </div>
        <!-- Users and game End -->
        <!-- Items Start -->
        <div class="grid grid-cols-2 items-start w-full gap-4 sm:gap-10 md:gap-16 h-full">
          <div
            v-for="player in battle.players"
            :key="player._id"
            class="flex justify-center flex-col"
          >
            <div
              class="w-full min-h-[48px] flex-wrap sm:flex-nowrap sm:h-[48px] flex justify-between items-center bg-[#710101] p-1 px-4"
            >
              <span class="font-Rubik font-extrabold text-xs sm:text-base text-white"
                >${{
                  Number(calculateTotalItemsValue(player.items).value).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })
                }}</span
              >
              <span class="font-Rubik font-semibold text-xs sm:text-base text-[#d7b7b7]"
                >{{ player.items.length }} ITEMS</span
              >
              <span class="font-Rubik font-semibold text-xs sm:text-base text-[#ff4444]"
                >{{
                  Number(calculateTotalItemsValue(player.items).chance).toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                    minimumFractionDigits: 2
                  })
                }}%</span
              >
            </div>
            <div class="relative">
              <!-- <div
                class="absolute bg-[linear-gradient(180deg,rgba(83,1,1,0)_20%,#530101_100%)] h-10 bottom-0 z-10 w-full opacity-90"
              ></div> -->
              <div
                class="overflow-y-auto flex flex-wrap sm:grid w-full py-2 justify-center gap-x-1 sm:gap-x-2 gap-y-1 h-full"
                style="grid-template-columns: repeat(auto-fill, 125.5px)"
              >
                <div
                  v-for="item in player.items"
                  :key="item._id"
                  class="w-[92px] sm:w-[130px] bg-[#690405] py-2 sm:py-0 sm:h-[134px] flex flex-col items-center justify-center px-4"
                >
                  <img :src="itemSkinImageSrc(item)" class="max-w-[64px]" />
                  <span
                    class="w-full text-center truncate font-Rubik font-semibold text-[#d7b7b7] text-sm sm:text-base"
                    >{{ item.name }}</span
                  >
                  <span class="font-Rubik text-white text-sm sm:text-base font-semibold"
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
          <div v-if="battle.players.length == 1" class="flex justify-center order-2">
            <button
              v-if="signedIn"
              class="bg-[#04ab53] w-full sm:w-[162px] h-[40px] font-Rubik text-white font-extrabold text-base"
              @click="openModal('join coinflip', { battle: battle, secondsLeft: localSecondsLeft })"
            >
              JOIN
            </button>
            <div
              v-else
              class="flex w-full flex-col gap-y-2 bg-[#690405] py-4 max-w-[402px] h-fit items-center justify-center"
            >
              <span class="font-Rubik text-sm sm:text-base text-white font-bold"
                >Login if you want to join</span
              >
              <button
                class="bg-[#04ab53] px-2 sm:px-4 h-[40px] font-Rubik text-white font-extrabold text-xs flex items-center gap-x-2"
                @click="goToLogin()"
              >
                <img class="w-[22px]" src="../../assets/icons/steam.png" />
                LOG IN WITH STEAM
              </button>
            </div>
          </div>
        </div>
        <!-- Items End -->
        <span class="sm:hidden flex flex-col items-center w-full left-0 right-0 whitespace-nowrap">
          <span
            v-if="battle.state == 'finished'"
            class="font-Rubik font-medium text-sm"
            :class="{
              'text-[#93C8FB]': winner.coin == 'heaven',
              'text-[#FF4444]': winner.coin == 'hell'
            }"
            >Ticket: {{ formatFairnessTicket(flipFairness.ticket) }}</span
          >
          <span
            v-if="battle.state == 'finished'"
            class="font-Rubik font-medium text-sm text-[#d7b7b7] font-mono break-all max-w-full px-1"
            :title="
              flipFairness.hash && String(flipFairness.hash).length > 28 ? flipFairness.hash : undefined
            "
            >Hash: {{ formatFairnessLong(flipFairness.hash) }}</span
          >
          <span
            v-if="fairnessBlockVisible"
            class="font-Rubik font-medium text-sm text-[#d7b7b7]"
            >Block: {{ formatFairnessBlock(flipFairness.block) }}</span
          >
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { CircleProgressBar } from 'circle-progress.vue'
import ConfettiGenerator from 'confetti-js'
import { mapActions } from 'vuex'
import { authVersion, getAuth, isLoggedIn } from '@/auth/session'
import { openModalFromModal } from '@/modalStore'
import { startSteamOAuth } from '@/auth/steamLogin'
import { normalizeSteamEconomyImageUrl } from '@/services/jackpotClient'
export default {
  name: 'coinFlip_Battle',
  props: {
    battle: {
      type: Object,
      required: true,
      default: () => ({ players: [] }) // Default structure
    },
    secondsLeft: {
      type: Number,
      required: false,
      default: undefined
    }
  },
  components: { XMarkIcon, CircleProgressBar },
  data() {
    return {
      battleData: null,
      currentDegrees: 0,
      amountRedAmount: 0,
      amountBlueAmount: 0,
      isFlipping: false,
      confetti: null,
      localSecondsLeft: 0,
      countdownInterval: null,
      screenWidth: window.innerWidth,
      winnerModalOpened: false
    }
  },
  watch: {
    battle: {
      deep: true,
      handler(newB, oldB) {
        const hadOne = (oldB?.players?.length ?? 0) < 2
        const hasTwo = (newB?.players?.length ?? 0) >= 2
        if (hasTwo && hadOne && newB.state === 'in_progress') {
          this.startCountdown(10)
        }
      }
    },
    localSecondsLeft(newState) {
      if (
        (this.battle.state === 'created' || this.battle.state === 'open') &&
        newState === 0
      ) {
        setTimeout(() => {
          if (this.isFlipping == false) {
            // Lobby timer expired without a join
          }
        }, 1000)
      }
    }
  },
  methods: {
    ...mapActions(['updateBattle', 'updateBattleState', 'updatePlayerResult', 'removeBattle']),
    calculateMinMaxNeed(total_price) {
      let total = total_price
      let percentage = (total * 10) / 100
      let min = total - percentage
      let max = total + percentage
      return { min: min, max: max }
    },
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
    openModal(name, props) {
      openModalFromModal(name, props)
    },
    goToLogin() {
      this.closeModal()
      startSteamOAuth(this.$route.fullPath)
    },
    itemSkinImageSrc(item) {
      const raw = item?.image ?? ''
      const normalized = normalizeSteamEconomyImageUrl(raw)
      if (normalized) return normalized
      if (raw && String(raw).includes('/')) return raw
      return raw ? `https://community.akamai.steamstatic.com/economy/image/${raw}` : ''
    },
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
    formatFairnessLong(raw) {
      const s = raw == null ? '' : String(raw).trim()
      if (!s) return '—'
      if (s.length <= 28) return s
      return `${s.slice(0, 14)}…${s.slice(-12)}`
    },
    formatFairnessBlock(raw) {
      if (raw == null || String(raw).trim() === '') return '—'
      const t = String(raw).trim()
      return t.startsWith('#') ? t : `#${t}`
    },
    join() {
      this.$emit('joinPlayer')
    },
    closeModal() {
      this.$emit('close-modal')
    },
    updateResult(winIndex, loseIndex) {
      this.$store.dispatch('updatePlayerResult', {
        battleId: this.battle._id,
        playerIndex: winIndex,
        result: true
      })
      this.$store.dispatch('updatePlayerResult', {
        battleId: this.battle._id,
        playerIndex: loseIndex,
        result: false
      })
    },
    calculateTotalItemsValue(items) {
      let value = 0
      let totalValue = this.totalItemsValue
      const list = Array.isArray(items) ? items : []
      list.forEach((item) => {
        value += Number(item?.price ?? 0)
      })
      let chance = totalValue ? (value / totalValue) * 100 : 0
      return { value, chance }
    },
    flipCoin() {
      if (this.isFlipping) return
      const playerChances = this.battle.players.map((player) =>
        this.calculateTotalItemsValue(player.items)
      )
      if (this.battle.state == 'in_progress' && this.localSecondsLeft == 0) {
        const redChance =
          (this.battle.players[0].coin === 'hell'
            ? playerChances[0].chance
            : playerChances[1].chance) || 0
        const blueChance =
          (this.battle.players[1].coin === 'heaven'
            ? playerChances[1].chance
            : playerChances[0].chance) || 0

        const randomChance = Math.random() * 100
        const isRedWin = randomChance < redChance

        const randomFlips = Math.floor(Math.random() * 4 + 9)
        this.currentDegrees += 180 * randomFlips

        if (isRedWin) {
          this.amountRedAmount++

          this.currentDegrees =
            this.currentDegrees % 360 === 180 ? this.currentDegrees : this.currentDegrees + 180
        } else {
          this.amountBlueAmount++

          this.currentDegrees =
            this.currentDegrees % 360 === 0 ? this.currentDegrees : this.currentDegrees + 180
        }

        document.getElementById('coin').style.transform = `rotateY(${this.currentDegrees}deg)`
        document.getElementById('coin_container').style.scale = '1.2'

        document.getElementById('coin_container').style.transform = 'translateY(20px)'
        this.isFlipping = true
        setTimeout(() => {
          document.getElementById('coin_container').style.scale = '1'
          document.getElementById('coin_container').style.transform = 'translateY(0px)'
        }, 4500)
        setTimeout(() => {
          let winnerIndex = 0
          if (isRedWin) {
            if (this.battle.players[0].coin == 'hell') {
              this.updateResult(0, 1)
              winnerIndex = 0
            } else {
              this.updateResult(1, 0)
              winnerIndex = 1
            }
          } else {
            if (this.battle.players[0].coin == 'heaven') {
              this.updateResult(0, 1)
              winnerIndex = 0
            } else {
              this.updateResult(1, 0)
              winnerIndex = 1
            }
          }

          const winnerPlayer = this.battle.players[winnerIndex]
          this.startConfetti()
          this.$store.dispatch('updateBattleState', {
            battleId: this.battle._id,
            newState: 'finished'
          })

          if (winnerPlayer && !this.winnerModalOpened) {
            this.winnerModalOpened = true
            openModalFromModal('coinflip winner', {
              winner: this.viewerAsWinnerPayload(winnerPlayer),
              battle: this.battle,
              wonAmount: this.battle?.total ?? 0
            })
          }

          this.isFlipping = false
          // if (this.battle.players[0].win) {
          //   this.winnerModal()
          // }
        }, 10000)
      }
    },
    winnerModal() {
      this.$emit('winnerModal')
    },
    /** Demo: treat the viewer as the winner in the modal (name/avatar from session). */
    viewerAsWinnerPayload(winnerPlayer) {
      if (!winnerPlayer) return winnerPlayer
      const auth = getAuth()
      return {
        ...winnerPlayer,
        name: auth?.personaname || winnerPlayer.name,
        avatar: auth?.avatarUrl || winnerPlayer.avatar
      }
    },
    startCountdown(initialTime) {
      clearInterval(this.countdownInterval) // Clear existing countdown
      this.localSecondsLeft = initialTime

      this.countdownInterval = setInterval(() => {
        if (this.localSecondsLeft > 0) {
          this.localSecondsLeft--
        } else {
          clearInterval(this.countdownInterval)
          this.handleCountdownEnd()
        }
      }, 1000)
    },
    handleCountdownEnd() {
      if (this.battle.state === 'created' || this.battle.state === 'open') {
        return
      }
      if (this.battle.state === 'in_progress' && this.localSecondsLeft === 0) {
        setTimeout(() => {
          this.flipCoin()
        }, 500)
      }
    },
    resolveInitialCountdown() {
      if (this.battle.state === 'finished') {
        return Math.max(0, Number(this.secondsLeft) || 0)
      }
      const two = (this.battle.players?.length ?? 0) >= 2
      const raw = this.secondsLeft
      const hasExplicit = raw != null && Number.isFinite(Number(raw)) && Number(raw) >= 0
      const s = hasExplicit ? Number(raw) : null

      if (!two && (this.battle.state === 'open' || this.battle.state === 'created')) {
        if (s != null && s > 0) return s
        return 30
      }
      if (two && this.battle.state === 'in_progress') {
        if (s != null) return s
        return 10
      }
      if (s != null) return s
      return 10
    },
    shouldRunFlipImmediately() {
      const raw = this.secondsLeft
      const explicitZero =
        raw != null && Number.isFinite(Number(raw)) && Number(raw) === 0
      return (
        explicitZero &&
        this.battle.state === 'in_progress' &&
        (this.battle.players?.length ?? 0) >= 2
      )
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth
    }
  },
  computed: {
    isLobbyCountdownVisible() {
      const lobby =
        this.battle.state === 'created' ||
        this.battle.state === 'open'
      return lobby && (this.battle.players?.length ?? 0) < 2 && this.localSecondsLeft > 0
    },
    countdownMax() {
      const lobby =
        this.battle.state === 'created' ||
        this.battle.state === 'open'
      if (lobby && (this.battle.players?.length ?? 0) < 2) return 30
      if (this.battle.state === 'in_progress') return 10
      return 30
    },
    totalItemsValue() {
      return this.battle.players.reduce((playerAcc, player) => {
        const items = Array.isArray(player?.items) ? player.items : []
        const playerTotal = items.reduce((itemAcc, item) => itemAcc + Number(item?.price ?? 0), 0)
        return playerAcc + playerTotal
      }, 0)
    },

    winner() {
      let battleWinner = {}
      if (this.battle.state == 'finished') {
        this.battle.players.forEach((player) => {
          if (player.win) {
            battleWinner = player
          }
        })
        return battleWinner
      } else return 0
    },
    signedIn() {
      authVersion.value
      return isLoggedIn()
    },
    /** Provably fair fields from `coinflip:flip` / `fairness:eosBlock` (stored on `battle.fairness`). */
    flipFairness() {
      const f = this.battle.fairness
      return f && typeof f === 'object' ? f : { ticket: null, hash: null, block: null }
    },
    /**
     * Block only during in_progress (pre-flip timer + coin animation). After flip, ticket+hash+block when finished.
     */
    fairnessBlockVisible() {
      const block = this.flipFairness.block
      if (block === null || block === undefined) return false
      if (String(block).trim() === '') return false
      if (this.battle.state === 'finished') return true
      if (this.battle.state !== 'in_progress') return false
      if ((this.battle.players?.length ?? 0) < 2) return false
      return true
    }
  },
  mounted() {
    const initial = this.resolveInitialCountdown()
    this.localSecondsLeft = initial
    if (this.shouldRunFlipImmediately()) {
      this.$nextTick(() => this.handleCountdownEnd())
    } else if (initial > 0) {
      this.startCountdown(initial)
    } else {
      this.handleCountdownEnd()
    }
    window.addEventListener('resize', this.updateScreenWidth)
  },
  beforeUnmount() {
    clearInterval(this.countdownInterval)
    if (this.confetti) {
      this.confetti.clear()
    }
    window.removeEventListener('resize', this.updateScreenWidth)
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
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

.scrollColor::-webkit-scrollbar-thumb {
  background: #ff3435;
}
.scrollColor::-webkit-scrollbar {
  width: 0.2rem !important;
}
#coin {
  position: relative;
  width: 148px;
  height: 148px;
  background: white;
  perspective: 1000px;
  transition:
    transform 10s ease,
    box-shadow 0.2s ease;
  transform-style: preserve-3d;
  background-color: transparent;
  box-sizing: border-box;
  border-radius: 50%;
  align-self: center;

  /* box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2); */
}
#coin.hellWinner {
  transform: rotateY(180deg);
  transition: transform 0s !important ;
}

#coin.flipping {
  /* box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2); */
}

#coin > * {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backface-visibility: hidden;
  border-radius: 50%;
}

#front {
  /* background-image: url(../../assets/img/coins/heaven.png); */
  z-index: 2;
}
#front.win {
  filter: drop-shadow(0px 0px 20px #95c9fb);
  transition: filter 1s;
}
#front img,
#back img {
  width: 148px;
  height: 148px;
}
#back.win {
  filter: drop-shadow(0px 0px 20px #db0404);
  transition: filter 1s;
}
#back {
  /* background-image: url(../../assets/img/coins/hell.png); */
  transform: rotateY(180deg);
}
@media (max-width: 640px) {
  #coin {
    width: 90px;
    height: 90px;
  }
  #front img,
  #back img {
    width: 90px;
    height: 90px;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
