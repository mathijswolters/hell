<template>
  <div
    class="lg:h-[68px]  p-px 2-full flex items-center justify-center"
    :class="
      isPersonalCreatedBattle
        ? ''
        : 'bg-[linear-gradient(90deg,rgba(255,52,53,0.5)_0%,rgba(255,52,53,0)_100%)]'
    "
  >
    <div
      class="bg-[linear-gradient(0deg,#5C0000,#5C0000),radial-gradient(32.08%_534.72%_at_0%_0%,rgba(255,52,53,0.2)_0%,rgba(255,52,53,0)_100%)] w-full h-full grid grid-cols-7 lg:grid-cols-[repeat(13,minmax(0,1fr))] gap-4 py-2 lg:py-0 px-2 lg:px-0"
      :class="
        isPersonalCreatedBattle
          ? 'border-l-4 border-solid border-[#04AB53]'
          : ''
      "
    >
      <div
        class="order-1 col-span-3 sm:col-span-2 lg:col-span-3 xl:col-span-2 flex items-center justify-center relative"
      >
        <div v-if="battle.players.length == 1" class="flex items-center gap-4">
          <img :src="coinImageSrc(battle.players[0].coin)" class="w-[2rem]" />
          <UserImage :user="battle.players[0]" />
        </div>
        <div v-else class="flex items-center gap-4 sm:gap-6">
          <div
            class="relative flex items-center transition-opacity duration-200 order-1"
            :class="{
              'opacity-40': showRowWinner && !playerIsWinner(battle.players[0])
            }"
          >
            <div
              class="rounded-full -right-[0.6rem] w-[1.3rem] absolute z-10"
            >
              <img :src="coinImageSrc(battle.players[0].coin)" class="w-full h-full" />
            </div>

            <UserImage :user="battle.players[0]" />
          </div>
          <span class="order-2 font-Rubik text-[#d7b7b7] text-sm font-semibold">VS</span>
          <div
            class="relative flex items-center transition-opacity duration-200 order-3"
            :class="{
              'opacity-40': showRowWinner && !playerIsWinner(battle.players[1])
            }"
          >
            <div
              class="rounded-full -left-[0.6rem] w-[1.3rem] absolute z-10"
            >
              <img :src="coinImageSrc(battle.players[1].coin)" class="w-full h-full" />
            </div>
            <UserImage :user="battle.players[1]" />
          </div>
        </div>
        <hr class="hidden sm:flex absolute bg-[#ff3435] right-0 h-[36px] w-px opacity-30" />
      </div>
      <div
        class="order-3 sm:order-2 col-span-3 sm:col-span-4 lg:col-span-3 xl:col-span-6 flex gap-2 overflow-hidden"
      >
        <img
          v-for="item in battle.players[0].items"
          :key="item.id"
          :src="mapInventoryItem(item).image"
          class="max-w-[3rem] py-3"
        />
        <img
            v-for="item in battle.players[1]?.items || []"
            :key="item.id"
            :src="mapInventoryItem(item).image"
            class="max-w-[3rem] py-3"
          />
      </div>
      <div
        class="order-2 sm:order-4 lg:order-3 col-span-4 lg:col-span-3 xl:col-span-2 flex justify-center sm:justify-normal items-center gap-2"
      >
        <div class="flex flex-col justify-center">
          <span class="font-bold font-Rubik text-base text-white"
            ><span class="font-bold font-Rubik text-base text-[#04ab53]">$</span
            >{{
              Number(battle.total).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}</span
          >
          <span v-if="battle.state === 'open' || battle.state === 'created' || battle.state === 'joining'" class="font-semibold font-Rubik text-xs text-[#d7b7b7]"
            >Needs: ${{
              Number(min).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}
            - ${{
              Number(max).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}</span
          >
        </div>
      </div>
      <div class="order-4 sm:order-3 lg:order-4 flex items-center justify-end lg:justify-center">
        <CircleProgressBar
          v-if="showCountdownRing && !isPassedTime"
          :value="secondsLeft"
          :max="maxTime"
          size="35"
          :colorUnfilled="isGreenPhase ? '#04AB53' : '#FF3435'"
          :colorBack="isGreenPhase ? 'rgb(4, 171, 83,0.2)' : '#FF343533'"
          :startAngle="0"
          strokeWidth="15"
          ><span class="font-bold font-Rubik text-white text-xs">{{
            secondsLeft
          }}</span>
          </CircleProgressBar>
      </div>

      <div
        class="order-5 col-span-3 sm:col-span-3 xl:col-span-2 justify-end flex items-center gap-2 lg:pr-4"
      >
        <button
          v-if="showJoinButton"
          class="flex items-center px-3 h-9 bg-[#ff3435] border-[#530000] border border-solid font-bold font-Rubik text-white text-sm whitespace-nowrap"
          @click="joinCoinflipOrLogin"
        >
          JOIN
        </button>
        <div v-if="showRowWinner" class="flex items-center gap-2 shrink-0">
          <img
            :src="coinImageSrc(battle.coin)"
            class="w-[1.5rem]"
            alt=""
          />
          <img
            v-if="displayWinner?.avatar"
            v-lazy="displayWinner.avatar"
            class="min-w-[2.25rem] min-h-[2.25rem] w-[2.25rem] h-[2.25rem] rounded-[4px] object-cover border-[0.5px] border-solid border-white"
            alt=""
          />
          <span
            v-else-if="displayWinner?.name"
            class="font-Rubik font-bold text-xs text-white max-w-[5rem] truncate"
            >{{ displayWinner.name }}</span>
        </div>
        <button
          @click="openModal('coinflip game', { battle: battle, secondsLeft: secondsLeft })"
          class="flex items-center px-3 h-9 bg-[#04AB53] font-bold font-Rubik text-white text-sm whitespace-nowrap"
        >
          VIEW
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import 'vue3-circle-progress/dist/circle-progress.css'
import { CircleProgressBar } from 'circle-progress.vue'
import Dominating_icon from '../icons/Dominating_icon.vue'
import Target_icon from '../icons/Target_icon.vue'
import { mapActions } from 'vuex'
import { openModal } from '@/modalStore'
import UserImage from '../UserImage.vue'
import { getTradeURLStatus, normalizeSteamEconomyImageUrl } from '@/services/jackpotClient'
import { getSteamId, isLoggedIn } from '@/auth/session'
import HEAVEN_COIN from '@/assets/img/coins/heaven.png'
import HELL_COIN from '@/assets/img/coins/hell.png'

const COINFLIP_DEPOSIT_COUNTDOWN_SEC = 25
const COINFLIP_PRE_FLIP_COUNTDOWN_SEC = 15

export default {
  name: 'CoinflipRow',
  props: {
    battle: Object,
    time: Number
  },
  components: {
    CircleProgressBar,
    Dominating_icon,
    Target_icon,
    UserImage
  },
  data() {
    return {
      secondsLeft: 0,
      intervalId: null,
      activeModal: null,
      min: 0,
      max: 0
    }
  },
  created() {},
  computed: {
    isEnded() {
      const s = this.battle?.state
      return s === 'finished' || s === 'ended'
    },
    hasFlipOutcome() {
      const c = this.battle?.coin
      if (c == null) return false
      if (c === 1 || c === 2) return true
      const s = String(c).trim().toLowerCase()
      return s === '1' || s === '2' || s === 'heaven' || s === 'hell'
    },
    /** Matches lobby `getGameId` / `Game_Modal.flipBattleIdKey` for flip-animation Vuex flag. */
    battleGameIdKey() {
      const b = this.battle
      return String(b?.gameid ?? b?.gameId ?? b?.id ?? b?._id ?? '')
    },
    coinflipModalFlipAnimatingThisBattle() {
      const key = this.battleGameIdKey
      if (!key) return false
      return !!this.$store.state.coinflipModalFlipAnimatingIds[key]
    },
    /** Hide lobby winner strip while `Game_Modal` is running the coin flip for this game. */
    showRowWinner() {
      return this.isEnded && this.hasFlipOutcome && !this.coinflipModalFlipAnimatingThisBattle
    },
    displayWinner() {
      if (!this.isEnded) return null
      const players = Array.isArray(this.battle?.players) ? this.battle.players : []
      const w = this.battle?.winner
      if (w && (w.avatar || w.name || w.steamid)) return w
      if (this.hasFlipOutcome && players.length) {
        const side = this.coinSideValue(this.battle.coin)
        const byCoin = players.find((p) => this.coinSideValue(p?.coin) === side)
        if (byCoin) return byCoin
      }
      return players.find((p) => p?.win === true) || null
    },
    isLobbyPhase() {
      const s = this.battle?.state
      return s === 'open' || s === 'created' || s === 'joining'
    },
    isDepositAcceptPhase() {
      const s = this.battle?.state
      return s === 'joining' || !!this.battle?.joining
    },
    isPassedTime() {
      if (!this.battle.server_time || this.battle.server_time > ( this.battle.hosted + 30 )) {
        return true
      }
      return false
    },
    isGreenPhase() {
      const s = this.battle?.state
      return s === 'joined' || s === 'ending' || s === 'in_progress'
    },
    showCountdownRing() {
      return (
        (this.isDepositAcceptPhase && this.secondsLeft > 0) ||
        (this.isGreenPhase && this.secondsLeft > 0)
      )
    },
    showJoinButton() {
      return (
        this.battle.players.length === 1 &&
        !this.battle.joining &&
        this.battle.state !== 'joining' &&
        this.isLobbyPhase
      )
    },
    isPersonalCreatedBattle() {
      const currentSteamId = String(getSteamId() || '')
      if (!currentSteamId) return false
      const hostSteamId = String(
        this.battle?.host ??
          this.battle?.host_data?.steamid ??
          this.battle?.players?.[0]?.steamid ??
          this.battle?.players?.[0]?._id ??
          ''
      )
      return hostSteamId === currentSteamId
    },
    maxTime() {
      if (this.isDepositAcceptPhase) return COINFLIP_DEPOSIT_COUNTDOWN_SEC
      if (this.isGreenPhase) return COINFLIP_PRE_FLIP_COUNTDOWN_SEC
      return COINFLIP_DEPOSIT_COUNTDOWN_SEC
    }

    // inBattle: function () {
    //   return this.battle.players.some(
    //     (i) => i.user.id === this.$store.getters.getUser?.id
    //   );
    // },
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
    playerIsWinner(player) {
      if (!this.isEnded || !this.hasFlipOutcome || !player) return false
      const dw = this.displayWinner
      if (dw) {
        const da = String(dw.steamid ?? dw._id ?? '')
        const pa = String(player.steamid ?? player._id ?? '')
        if (da && pa) return da === pa
      }
      if (this.hasFlipOutcome) {
        return this.coinSideValue(player?.coin) === this.coinSideValue(this.battle?.coin)
      }
      return !!player?.win
    },
    mapInventoryItem(item, index = 0) {
      return {
        ...item,
        image: normalizeSteamEconomyImageUrl(item?.image) || item?.image,
        _id: item?._id ?? item?.id ?? item?.assetid ?? item?.asset_id ?? index
      }
    },
    // openBattle(battle) {
    //   this.$router.push({
    //     path: `/coinflip/${battle._id}`, // Construct the path with the slug
    //     query: { battleData: JSON.stringify(battle) }
    //   })
    // },
    openModal(name, props) {
      openModal(name, props)
    },
    async joinCoinflipOrLogin() {
      if (!isLoggedIn()) {
        const path = this.$route?.fullPath || '/coinflip'
        openModal('login', { redirectTo: path.startsWith('/') ? path : '/coinflip' })
        return
      }
      const steamid = getSteamId()
      if (!steamid) {
        const path = this.$route?.fullPath || '/coinflip'
        openModal('login', { redirectTo: path.startsWith('/') ? path : '/coinflip' })
        return
      }
      try {
        const status = await getTradeURLStatus({ steamid })
        if (!status.isRegistered) {
          openModal('trade url required', {
            onSaved: () => this.joinCoinflipOrLogin()
          })
          return
        }
      } catch (error) {
        this.$toaster?.error?.(error?.message || 'Could not validate Steam trade URL.')
        return
      }
      openModal('join coinflip', { battle: this.battle, secondsLeft: this.secondsLeft })
    },
    calculateMinMaxNeed() {
      let total = this.battle.total
      let percentage = (total * 10) / 100
      this.min = total - percentage
      this.max = total + percentage
    },
    winnerModal() {
      this.openModal('winner')
    },
    // playerJoinedProtocol() {
    //   this.openModal('game'), this.startCountdown
    // },
    // handleBattleUpdate(updatedBattle) {
    //   this.updateBattle({ battleIndex: this.battle.id, updatedBattle })

    //   this.updateBattleState({ battleIndex: this.battle.id, newState: updatedBattle.state })
    //   this.updatePlayerResult({
    //     battleIndex: this.battle.id,
    //     playerIndex: 0,
    //     result: updatedBattle.players[0].result
    //   })
    //   this.updatePlayerResult({
    //     battleIndex: this.battle.id,
    //     playerIndex: 1,
    //     result: updatedBattle.players[1].result
    //   })
    // },

    // openModal(modalName) {
    //   this.activeModal = modalName
    // },
    closeModal() {
      this.activeModal = null
    },
    restartCountdown(startingTime) {
      this.stopCountdown()
      this.startCountdown(startingTime)
    },
    stopCountdown() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    /**
     * @param {number | undefined} presetSeconds When set (e.g. from `restartCountdown`), use this
     *   instead of `maxTime` so the ring matches the active phase (deposit vs pre-flip).
     */
    startCountdown(presetSeconds) {
      if (this.intervalId) return
      if (this.isEnded) {
        this.secondsLeft = this.time
      } else if (presetSeconds != null && Number.isFinite(Number(presetSeconds))) {
        this.secondsLeft = Math.max(0, Math.floor(Number(presetSeconds)))
      } else {
        this.secondsLeft = this.maxTime
      }

      this.intervalId = setInterval(() => {
        if (this.secondsLeft > 0) {
          this.secondsLeft--
        } else {
          if (this.isGreenPhase) {
            // this.$refs.game.flipCoin()
            // if (this.$refs.game && this.$refs.game.flipCoin) {
            //   this.$refs.game.flipCoin()
            // } else {
            //   console.log('flipCoin method is not available on the game component.')
            //   clearInterval(this.intervalId)
            // }
          } else if (this.isLobbyPhase) {
            {
              // this.removeBattle(this.battle._id)
            }
          } else if (this.isEnded) {
            {
              // this.removeBattle(this.battle._id)
            }
          } else clearInterval(this.intervalId)
          this.intervalId = null
        }
      }, 1000)
    }
  },
  mounted() {
    this.calculateMinMaxNeed()
    if (this.isEnded) {
      this.restartCountdown(this.time)
    } else if (this.isDepositAcceptPhase) {
      this.restartCountdown(COINFLIP_DEPOSIT_COUNTDOWN_SEC)
    } else if (this.isGreenPhase) {
      this.restartCountdown(COINFLIP_PRE_FLIP_COUNTDOWN_SEC)
    } else {
      this.stopCountdown()
      this.secondsLeft = 0
    }
  },
  beforeUnmount() {
    this.stopCountdown()
  },
  watch: {
    'battle.state'(newState) {
      if (newState === 'joined' || newState === 'ending' || newState === 'in_progress') {
        this.restartCountdown(COINFLIP_PRE_FLIP_COUNTDOWN_SEC)
      } else if (newState === 'joining') {
        this.restartCountdown(COINFLIP_DEPOSIT_COUNTDOWN_SEC)
      } else if (newState === 'open' || newState === 'created') {
        this.stopCountdown()
        this.secondsLeft = 0
      } else if (newState === 'finished' || newState === 'ended') {
        this.restartCountdown(this.time)
      } else {
        this.stopCountdown()
      }
    }
  }
}
</script>
