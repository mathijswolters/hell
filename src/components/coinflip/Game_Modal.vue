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
                          :src="coinImageSrc(previous_battle.players[0].coin)"
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
                          :src="coinImageSrc(previous_battle.players[1].coin)"
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
          'gap-4 sm:gap-8': !hasAnimatedFlipResult,
          'gap-4 sm:gap-16': hasAnimatedFlipResult
        }"
      >
        <!-- <button @click="testfunction()">test</button>
        {{ battle }} -->
        <!-- Users and game Start -->
        <div class="flex items-start justify-between sm:justify-center sm:w-full sm:gap-x-20">
          <div
            v-if="battle.players.length == 1 && !joiningPreviewPlayer"
            class="w-[140px] sm:w-[9.25rem] sm:h-[9.25rem] order-3"
          ></div>
          <div
            v-for="(player, index) in battle.players"
            :key="index"
            :class="{
              'order-1': index == 0,
              'order-3': index == 1,
              'opacity-50 ': hasAnimatedFlipResult && player.coin !== battle.winner?.coin,
              'pr-3': index == 1
            }"
            class="flex flex-col gap-y-4 justify-center items-center transition-opacity duration-[1000ms] w-[140px] sm:w-[9.25rem]"
          >
            <div
              class="w-[76.85px] h-[76.85px] sm:w-[9.25rem] sm:h-[9.25rem] rounded-[4px] flex items-center justify-center relative"
            >
              <img
                v-lazy="player.avatar"
                class="w-[76.85px] h-[76.85px] sm:w-[9.25rem] sm:h-[9.25rem] rounded-[4px] object-cover border-[0.5px] border-solid border-white"
              />
              <img
                :src="coinImageSrc(player.coin)"
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
            v-if="joiningPreviewPlayer"
            class="order-3 pr-3 flex flex-col gap-y-4 justify-center items-center transition-opacity duration-[1000ms] w-[140px] sm:w-[9.25rem]"
          >
            <div
              class="w-[76.85px] h-[76.85px] sm:w-[9.25rem] sm:h-[9.25rem] rounded-[4px] flex items-center justify-center relative"
            >
              <img
                v-lazy="joiningPreviewPlayer.avatar"
                class="w-[76.85px] h-[76.85px] sm:w-[9.25rem] sm:h-[9.25rem] rounded-[4px] object-cover border-[0.5px] border-solid border-white"
              />
              <img
                :src="coinImageSrc(joiningPreviewPlayer.coin)"
                class="absolute sm:max-w-[3.5rem] w-9 sm:w-[3.5rem] rounded-full -bottom-4 sm:-bottom-5 z-10 -right-4 sm:-right-6"
              />
            </div>
            <div
              class="font-Rubik text-white font-extrabold text-sm sm:text-base whitespace-nowrap truncate w-full text-center"
            >
              {{ joiningPreviewPlayer.name }}
            </div>
          </div>
          <div
            class="order-2 flex flex-col gap-y-4 h-full justify-center relative"
            :class="{ 'sm:ml-12': battle.players.length == 1 && !joiningPreviewPlayer }"
          >
            <CircleProgressBar
              v-if="showCountdownRing"
              :value="localSecondsLeft"
              :max="countdownMax"
              :size="screenWidth < 640 ? '90' : '148'"
              :colorUnfilled="isGreenPhase ? '#04AB53' : '#FF3435'"
              :colorBack="isGreenPhase ? 'rgb(4, 171, 83,0.2)' : '#FF343533'"
              :startAngle="0"
              :strokeWidth="screenWidth < 640 ? '15' : '15'"
              ><span class="font-extrabold font-Rubik text-white text-xl sm:text-[32px]">{{
                localSecondsLeft
              }}</span></CircleProgressBar
            >
            <div v-else class="h-[120px] sm:h-[190px] w-[120px] sm:w-[190px] relative z-20">
              <div id="coin_container" class="z-10">
                <div
                  id="coin"
                  :class="{
                    'coin-win-heaven':
                      hasAnimatedFlipResult && !isFlipping && coinSideValue(battle.coin) === 'heaven',
                    'coin-win-hell':
                      hasAnimatedFlipResult && !isFlipping && coinSideValue(battle.coin) === 'hell',
                  }"
                >
                  <div
                    :key="`${spriteRunId}-${activeCoinSprite}`"
                    class="coin-sprite"
                    :class="[
                      {
                        animate: isFlipping,
                        ended: hasAnimatedFlipResult && !isFlipping
                      }
                    ]"
                    :style="{ backgroundImage: 'url(' + activeCoinSpriteUrl + ')', height: '99%', width: '105%' }"

                  />
                </div>
              </div>
            </div>
            <span
              class="hidden sm:flex flex-col items-center w-full left-0 right-0 whitespace-nowrap top-[calc(100%+3rem)] sm:top-[calc(85%+1rem)] absolute"
            >
              <transition name="fade-slide">
                <span
                  v-if="hasAnimatedFlipResult"
                  class="font-Rubik font-medium text-sm"
                  :class="{
                    'text-[#93C8FB]': battle.coin === 1,
                    'text-[#FF4444]': battle.coin === 2
                  }"
                >
                  Ticket: {{ Number(battle.ticket).toFixed(6) }}
                </span>
              </transition>
              <span v-if="hasAnimatedFlipResult" class="font-Rubik font-medium text-sm text-[#d7b7b7]">
                Hash: {{ shorten(battle.hash) }}
              </span>
              <span
                v-if="hasAnimatedFlipResult && battle.block != null"
                class="font-Rubik font-semibold text-sm text-[#d7b7b7]"
              >
                EOS: {{ battle.block }}
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
                  <img :src="mapInventoryItem(item).image" class="max-w-[64px]" />
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
            <div v-if="isDepositAcceptPhase" class="flex w-full flex-col gap-y-[2rem] max-w-[402px] h-fit items-center justify-center">
              <span class="font-Rubik text-sm sm:text-base text-white font-bold">User Joining</span>
              <div v-if="signedIn && joiningOfferUrl" class="flex w-full flex-col gap-y-3 bg-[#690405] py-4 px-3 items-center justify-center">
                <div class="font-Rubik text-white font-bold text-base text-center">Offer is active</div>
              <!-- <div class="font-Rubik text-white font-semibold text-xs text-center break-all">
                <span class="text-[#FF3435] font-semibold">Reference:</span>
                {{ joiningOfferReference }}
                <span class="text-[#FF3435] font-semibold ml-1">Security code:</span>
                {{ joiningOfferSecurityCode }}
              </div> -->
              <a
                v-if="signedIn && joiningOfferUrl"
                :href="joiningOfferUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-2/3 bg-[#04ab53] flex items-center justify-center h-10 gap-2 font-Rubik font-extrabold text-white text-xs rounded-[2px]"
              >
                <img src="../../assets/icons/chrome.png" />
                OPEN IN BROWSER
              </a>
              <div class="font-Rubik text-white font-medium text-xs text-center max-w-[30rem]">
                Always use the links we provide to you or check the security code of your trade offer
                to defend against fake bots or scammers
              </div>
              </div>
            </div>
            <button
              v-else-if="signedIn"
              class="bg-[#04ab53] w-full sm:w-[162px] h-[40px] font-Rubik text-white font-extrabold text-base"
              @click="openJoinCoinflipFromGameModal"
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
                @click="openLoginModal()"
              >
                <img class="w-[22px]" src="../../assets/icons/steam.png" />
                LOG IN WITH STEAM
              </button>
            </div>
          </div>
        </div>
        <!-- Items End -->
        <!-- <span class="sm:hidden flex flex-col items-center w-full left-0 right-0 whitespace-nowrap">
         dd
          <span class="font-Rubik font-semimediumbold text-sm text-[#d7b7b7]">EOS: {{ battle.block }}</span>
        </span> -->
      </div>
    </div>
  </div>
</template>
<script>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { CircleProgressBar } from 'circle-progress.vue'
import ConfettiGenerator from 'confetti-js'
import { mapActions } from 'vuex'
import { authVersion, isLoggedIn } from '@/auth/session'
import { openModalFromModal } from '@/modalStore'
import { normalizeSteamEconomyImageUrl } from '@/services/jackpotClient'
import HEAVEN_COIN from '@/assets/img/coins/heaven.png'
import HELL_COIN from '@/assets/img/coins/hell.png'
import B2B_SPRITE from '@/assets/img/B2B sprite_q.png'
import B2B2_SPRITE from '@/assets/img/B2B2 sprite_q.png'
import R2B_SPRITE from '@/assets/img/R2B sprite_q.png'
import R2B2_SPRITE from '@/assets/img/R2B2 sprite_q.png'
import B2R_SPRITE from '@/assets/img/B2R sprite_q.png'
import B2R2_SPRITE from '@/assets/img/B2R2 sprite_q.png'
import R2R_SPRITE from '@/assets/img/R2R sprite_q.png'
import R2R2_SPRITE from '@/assets/img/R2R2 sprite_q.png'

/** Deposit trade acceptance window after `coinflip:joining`. */
const COINFLIP_DEPOSIT_COUNTDOWN_SEC = 90
/** Countdown after both players are in until the flip (green ring). */
const COINFLIP_PRE_FLIP_COUNTDOWN_SEC = 15
/** Must match `.coin-sprite.animate` duration in this component’s styles. */
const COINFLIP_MODAL_FLIP_ANIM_MS = 5000

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
      default: 0
    }
  },
  components: { XMarkIcon, CircleProgressBar },
  data() {
    return {
      battleData: null,
      isFlipping: false,
      hasAnimatedFlipResult: false,
      activeCoinSprite: 'heaven',
      activeCoinSpriteUrl: B2B_SPRITE,
      heavenCoinSprites: [B2B_SPRITE, B2B2_SPRITE, R2B_SPRITE, R2B2_SPRITE],
      hellCoinSprites: [B2R_SPRITE, B2R2_SPRITE, R2R_SPRITE, R2R2_SPRITE],
      spriteRunId: 0,
      confetti: null,
      localSecondsLeft: this.secondsLeft,
      countdownInterval: null,
      screenWidth: window.innerWidth
    }
  },
  watch: {
    localSecondsLeft(newState) {
      if (this.isDepositAcceptPhase && newState == 0) {
        setTimeout(() => {
          if (this.isFlipping == false) {
            // this.removeBattle(this.battle._id)
          }
        }, 1000)
      }
    },
    'battle.state'(newState) {
      if (newState === 'joined' || newState === 'ending' || newState === 'in_progress') {
        this.startCountdown(COINFLIP_PRE_FLIP_COUNTDOWN_SEC)
      } else if (newState === 'joining') {
        this.startCountdown(COINFLIP_DEPOSIT_COUNTDOWN_SEC)
      } else if (newState === 'open' || newState === 'created') {
        this.clearCountdown()
      } else if (newState === 'ended' || newState === 'finished') {
        this.clearCountdown()
        if (this.hasFlipResultData && !this.hasAnimatedFlipResult) {
          this.flipCoin()
        }
      }
    },
    hasFlipResultData(newValue) {
      if (!newValue || this.hasAnimatedFlipResult || this.isFlipping || !this.isEnded) return
      this.flipCoin()
    }
  },
  methods: {
    ...mapActions(['updateBattle', 'updateBattleState', 'updatePlayerResult', 'removeBattle']),
    coinSideValue(coin) {
      if (coin === 2 || coin === '2') return 'hell'
      const normalized = String(coin || '')
        .trim()
        .toLowerCase()
      if (normalized === 'hell') return 'hell'
      return 'heaven'
    },
    coinImageSrc(coin) {
      return this.coinSideValue(coin) === 'hell' ? HELL_COIN : HEAVEN_COIN
    },
    ticketNumberShorten(str, start = 5, end = 5) {
      if (str.length <= start + end) return str;
      return str.slice(0, start) + '...' + str.slice(-end);
    },
    shorten(str, start = 10, end = 8) {
      if (str.length <= start + end) return str;
      return str.slice(0, start) + '...' + str.slice(-end);
    },
    pickRandomCoinSprite(side) {
      const pool = side === 'hell' ? this.hellCoinSprites : this.heavenCoinSprites
      if (!Array.isArray(pool) || pool.length === 0) return
      const randomIndex = Math.floor(Math.random() * pool.length)
      console.log('+++++++pool[randomIndex]++++++++', pool[randomIndex])
      this.activeCoinSpriteUrl = pool[randomIndex]
    },
    mapInventoryItem(item, index = 0) {
      return {
        ...item,
        image: normalizeSteamEconomyImageUrl(item?.image) || item?.image,
        _id: item?._id ?? item?.id ?? item?.assetid ?? item?.asset_id ?? index
      }
    },
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
    openLoginModal() {
      const path = this.$route?.fullPath || '/coinflip'
      openModalFromModal('login', { redirectTo: path.startsWith('/') ? path : '/coinflip' })
    },
    openJoinCoinflipFromGameModal() {
      if (this.isDepositAcceptPhase) return
      if (!isLoggedIn()) {
        this.openLoginModal()
        return
      }
      this.openModal('join coinflip', { battle: this.battle, secondsLeft: this.localSecondsLeft })
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

      items.forEach((item) => {
        value += item.price
      })
      let chance = totalValue ? (value / totalValue) * 100 : 0
      return { value, chance }
    },
    isPassedTime() {
      if (!this.battle.server_time || this.battle.server_time > ( this.battle.hosted + 30 )) {
        return true
      }
      return false
    },
    flipCoin() {
      if (this.isFlipping) return

      // Hide proof/winner info until the animation's final timeout completes.
      this.hasAnimatedFlipResult = false

      const flipKey = this.flipBattleIdKey
      if (flipKey) {
        this.$store.commit('coinflipModalFlipAnimatingSet', flipKey)
      }

      const updatedBattle = { ...this.battle }
      updatedBattle.state = 'joined'
      this.updateBattle({ battleIndex: this.battle.id, updatedBattle })
      this.updateBattleState({ battleIndex: this.battle.id, newState: updatedBattle.state })

      // Pre-fill the `win` flags while the animation runs; we'll set the final winner after 5s.
      this.updatePlayerResult({
        battleIndex: this.battle.id,
        playerIndex: 0,
        result: updatedBattle.players?.[0]?.result ?? false
      })
      this.updatePlayerResult({
        battleIndex: this.battle.id,
        playerIndex: 1,
        result: updatedBattle.players?.[1]?.result ?? false
      })

      // New animation driver: CSS handles both rotation + sprite frames.
      const winnerSide = this.coinSideValue(this.battle.coin) // 'heaven' | 'hell'
      this.activeCoinSprite = winnerSide
      this.pickRandomCoinSprite(winnerSide)
      this.spriteRunId += 1

      this.isFlipping = true
      setTimeout(() => {
        // Mark final winner based on which player's coin matches `battle.coin`.
        const players = Array.isArray(this.battle?.players) ? this.battle.players : []
        const winnerIndex = players.findIndex((p) => this.coinSideValue(p?.coin) === winnerSide)
        const winIndex = winnerIndex === -1 ? 0 : winnerIndex
        const loseIndex = winIndex === 0 ? 1 : 0
        if (players.length >= 2) {
          this.updateResult(winIndex, loseIndex)
        }

        this.startConfetti()
        this.$store.dispatch('updateBattleState', {
          battleId: this.battle._id,
          newState: 'ended'
        })

        // Reveal proof/winner UI only after the flip animation finishes.
        this.hasAnimatedFlipResult = true
        this.isFlipping = false
        if (flipKey) {
          this.$store.commit('coinflipModalFlipAnimatingClear', flipKey)
        }
      }, COINFLIP_MODAL_FLIP_ANIM_MS)
    },
    winnerModal() {
      this.$emit('winnerModal')
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
      if (this.isDepositAcceptPhase) {
        console.log('Countdown ended: deposit acceptance window expired.')
      }
    },
    clearCountdown() {
      clearInterval(this.countdownInterval)
      this.countdownInterval = null
      this.localSecondsLeft = 0
    },
    updateScreenWidth() {
      this.screenWidth = window.innerWidth
    }
  },
  computed: {
    totalItemsValue() {
      return this.battle.players.reduce((playerAcc, player) => {
        const playerTotal = player.items.reduce((itemAcc, item) => itemAcc + item.price, 0)
        return playerAcc + playerTotal
      }, 0)
    },

    winner() {
      let battleWinner = {}
      if (this.isEnded) {
        this.battle.players.forEach((player) => {
          if (player.win) {
            battleWinner = player
          }
        })
        return battleWinner
      } else return 0
    },
    isEnded() {
      const s = this.battle?.state
      return s === 'finished' || s === 'ended'
    },
    joiningPreviewPlayer() {
      if (!this.isDepositAcceptPhase) return null
      if ((this.battle?.players?.length || 0) > 1) return null
      const hostCoin = this.battle?.players?.[0]?.coin
      const part = this.battle?.part_data || {}
      const fallbackCoin = this.coinSideValue(hostCoin) === 'hell' ? 1 : 2
      return {
        name: part?.name || 'User',
        avatar: part?.avatar || '/img/user/userImage.png',
        coin: part?.coin ?? fallbackCoin
      }
    },
    /** Someone is locking in / accepting the Steam deposit for the join. */
    isDepositAcceptPhase() {
      const s = this.battle?.state
      return s === 'joining' || !!this.battle?.joining
    },
    isGreenPhase() {
      const s = this.battle?.state
      return s === 'joined' || s === 'ending' || s === 'in_progress'
    },
    showCountdownRing() {
      return (
        (this.isDepositAcceptPhase && this.localSecondsLeft > 0) ||
        (this.isGreenPhase && this.localSecondsLeft > 0)
      )
    },
    hasFlipResultData() {
      const hasCoin = this.battle?.coin === 1 || this.battle?.coin === 2
      const hasResultMeta =
        this.battle?.ticket != null || this.battle?.hash != null || this.battle?.roll != null
      return hasCoin && hasResultMeta
    },
    countdownMax() {
      if (this.isDepositAcceptPhase) return COINFLIP_DEPOSIT_COUNTDOWN_SEC
      if (this.isGreenPhase) return COINFLIP_PRE_FLIP_COUNTDOWN_SEC
      return COINFLIP_DEPOSIT_COUNTDOWN_SEC
    },
    signedIn() {
      authVersion.value
      return isLoggedIn()
    },
    joiningUserName() {
      const b = this.battle || {}
      return (
        b?.part_data?.name ||
        b?.players?.[1]?.name ||
        'User'
      )
    },
    joiningUserAvatar() {
      const b = this.battle || {}
      return (
        b?.part_data?.avatar ||
        b?.players?.[1]?.avatar ||
        '/img/user/userImage.png'
      )
    },
    joiningOfferUrl() {
      const b = this.battle || {}
      const part = b.part_data || {}
      const candidates = [
        b.joinOfferUrl,
        b.offerUrl,
        b.offer_url,
        b.tradeOfferUrl,
        b.trade_offer_url,
        b.offer?.url,
        part.offerUrl,
        part.offer_url,
        part.tradeOfferUrl,
        part.trade_offer_url,
        part.offer?.url
      ]
      for (const v of candidates) {
        const s = typeof v === 'string' ? v.trim() : ''
        if (s && /^https?:\/\//i.test(s)) return s
      }
      const offerIdCandidates = [
        b.offerid,
        b.offer_id,
        b.tradeOfferId,
        b.offer?.id,
        part.offerid,
        part.offer_id,
        part.tradeOfferId,
        part.offer?.id
      ]
      for (const v of offerIdCandidates) {
        if (v == null) continue
        const id = String(v).trim()
        if (!id) continue
        return `https://steamcommunity.com/tradeoffer/${encodeURIComponent(id)}/`
      }
      return ''
    },
    joiningOfferReference() {
      const b = this.battle || {}
      const part = b.part_data || {}
      const candidates = [
        b.offerReference,
        b.offer_reference,
        b.reference,
        b.ref,
        part.offerReference,
        part.offer_reference,
        part.reference,
        part.ref
      ]
      for (const v of candidates) {
        const s = typeof v === 'string' ? v.trim() : ''
        if (s) return s
      }
      const offerUrl = this.joiningOfferUrl
      if (offerUrl) {
        const m = offerUrl.match(/\/tradeoffer\/([^/?#]+)/i)
        if (m?.[1]) return decodeURIComponent(m[1])
      }
      return '--'
    },
    joiningOfferSecurityCode() {
      const b = this.battle || {}
      const part = b.part_data || {}
      const candidates = [
        b.securityCode,
        b.security_code,
        b.code,
        part.securityCode,
        part.security_code,
        part.code
      ]
      for (const v of candidates) {
        const s = typeof v === 'string' ? v.trim() : ''
        if (s) return s
      }
      const offerUrl = this.joiningOfferUrl
      if (!offerUrl) return '--'
      try {
        const u = new URL(offerUrl)
        const token = u.searchParams.get('token')
        if (token && token.trim()) return token.trim()
      } catch (_) {}
      return '--'
    },
    /** Same id resolution as lobby `getGameId` / `CoinflipRow` for Vuex flip-animation flag. */
    flipBattleIdKey() {
      const b = this.battle
      return String(b?.gameid ?? b?.gameId ?? b?.id ?? b?._id ?? '')
    }
  },
  mounted() {
    // If modal opens after the server already marked the battle completed,
    // show the proof immediately (no flip animation needed).
    this.hasAnimatedFlipResult = this.isEnded && this.hasFlipResultData
    this.pickRandomCoinSprite(this.coinSideValue(this.battle?.coin))
    if (this.isDepositAcceptPhase) {
      this.startCountdown(COINFLIP_DEPOSIT_COUNTDOWN_SEC)
    } else if (this.isGreenPhase && !this.isEnded) {
      this.startCountdown(COINFLIP_PRE_FLIP_COUNTDOWN_SEC)
    } else {
      this.clearCountdown()
    }
    window.addEventListener('resize', this.updateScreenWidth)
  },
  beforeUnmount() {
    this.clearCountdown()
    if (this.isFlipping) {
      const k = this.flipBattleIdKey
      if (k) this.$store.commit('coinflipModalFlipAnimatingClear', k)
    }
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
  width: 190px;
  height: 190px;
  --coin-size: 190px;
  /* sprite sheets are 256x(256*121), so 121 square frames vertically stacked */
  --sprite-frames: 121;
  background-color: transparent;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
}

.coin-sprite {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: 100% auto; /* same idea as your sample: width fixed, height auto */
  background-repeat: no-repeat;
  background-position: 0 0;
}

@keyframes coinSpriteAnim {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 0 100%;
  }
}

/* One-shot sprite playback (same pattern as reference code). */
.coin-sprite.animate {
  animation: coinSpriteAnim 5s steps(120, end) forwards;
}

.coin-sprite.ended {
  background-position: 0 100%;
}

#coin.coin-win-heaven {
  filter: drop-shadow(0px 0px 20px #95c9fb);
  transition: filter 1s;
}

#coin.coin-win-hell {
  filter: drop-shadow(0px 0px 20px #db0404);
  transition: filter 1s;
}

@media (max-width: 640px) {
  #coin {
    width: 120px;
    height: 120px;
    --coin-size: 120px;
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
