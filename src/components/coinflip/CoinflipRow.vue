<template>
  <div
    class="lg:h-[68px] bg-[linear-gradient(90deg,rgba(255,52,53,0.5)_0%,rgba(255,52,53,0)_100%)] p-px 2-full flex items-center justify-center"
  >
    <div
      class="bg-[linear-gradient(0deg,#5C0000,#5C0000),radial-gradient(32.08%_534.72%_at_0%_0%,rgba(255,52,53,0.2)_0%,rgba(255,52,53,0)_100%)] w-full h-full grid grid-cols-7 lg:grid-cols-[repeat(13,minmax(0,1fr))] gap-4 py-2 lg:py-0 px-2 lg:px-0"
    >
      <div
        class="order-1 col-span-3 sm:col-span-2 lg:col-span-3 xl:col-span-2 flex items-center justify-center relative"
      >
        <div v-if="battle.players.length == 1" class="flex items-center gap-4">
          <img :src="`/img/coins/${battle.players[0].coin}.png`" class="w-[2rem]" />
          <UserImage :user="battle.players[0]" />
        </div>
        <div v-else class="flex items-center gap-4 sm:gap-6">
          <div
            class="relative flex items-center transition-opacity duration-200 order-1"
            :class="{
              'opacity-40 ': !battle.players[0].win && battle.state == 'finished'
            }"
          >
            <div
              class="border-[2px] border-[#740c0a] rounded-full -right-3 w-[1.5rem] absolute z-10"
            >
              <img :src="`/img/coins/${battle.players[0].coin}.png`" class="w-full h-full" />
            </div>

            <UserImage :user="battle.players[0]" />
          </div>
          <span class="order-2 font-Rubik text-[#d7b7b7] text-sm font-semibold">VS</span>
          <div
            class="relative flex items-center transition-opacity duration-200 order-3"
            :class="{
              'opacity-40': !battle.players[1].win && battle.state == 'finished'
            }"
          >
            <div
              class="border-[2px] border-[#740c0a] rounded-full -left-3 w-[1.5rem] absolute z-10"
            >
              <img :src="`/img/coins/${battle.players[1].coin}.png`" class="w-full h-full" />
            </div>
            <UserImage :user="battle.players[1]" />
          </div>
        </div>
        <hr class="hidden sm:flex absolute bg-[#ff3435] right-0 h-[36px] w-px opacity-30" />
      </div>
      <div
        class="order-3 sm:order-2 col-span-3 sm:col-span-4 lg:col-span-3 xl:col-span-6 flex gap-2 overflow-hidden items-center min-w-0"
      >
        <div class="flex gap-1 overflow-hidden min-w-0 shrink">
          <img
            v-for="item in battle.players[0].items"
            :key="`h-${item._id ?? item.id}`"
            :src="skinImageUrl(item)"
            class="max-w-[3rem] shrink-0"
          />
        </div>
        <span
          v-if="hasTwoPlayers"
          class="shrink-0 font-Rubik text-[#d7b7b7] text-xs font-semibold px-0.5"
          >VS</span
        >
        <div v-if="hasTwoPlayers" class="flex gap-1 overflow-hidden min-w-0 shrink">
          <img
            v-for="item in battle.players[1].items"
            :key="`j-${item._id ?? item.id}`"
            :src="skinImageUrl(item)"
            class="max-w-[3rem] shrink-0"
          />
        </div>
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
          <span
            v-if="!hasTwoPlayers"
            class="font-semibold font-Rubik text-xs text-[#d7b7b7]"
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
          v-if="
            (isLobbyOpen && !hasTwoPlayers && secondsLeft > 0) ||
            (battle.state == 'in_progress' && secondsLeft > 0)
          "
          :value="secondsLeft"
          :max="maxTime"
          size="35"
          :colorUnfilled="battle.state == 'in_progress' ? '#04AB53' : '#FF3435'"
          :colorBack="battle.state == 'in_progress' ? 'rgb(4, 171, 83,0.2)' : '#FF343533'"
          :startAngle="0"
          strokeWidth="15"
          ><span class="font-bold font-Rubik text-white text-xs">{{
            secondsLeft
          }}</span></CircleProgressBar
        >
      </div>

      <div
        class="order-5 col-span-3 sm:col-span-3 xl:col-span-2 justify-end flex items-center gap-2 lg:pr-4"
      >
        <button
          v-if="battle.players.length == 1 && !battle.joining && isLobbyOpen"
          class="flex items-center px-3 h-9 bg-[#ff3435] border-[#530000] border border-solid font-bold font-Rubik text-white text-sm whitespace-nowrap"
          @click="
            openModal('join coinflip', { battle: this.battle, secondsLeft: this.secondsLeft })
          "
        >
          JOIN
        </button>
        <div v-if="battle.state == 'ending'" class="flex items-center gap-2">
          <img
            :src="`/img/coins/${battle.players[0].win ? battle.players[0].coin : battle.players[1].coin}.png`"
            class="w-[1.5rem]"
          />
          <img
            v-lazy="battle.players[0].win ? battle.players[0].avatar : battle.players[1].avatar"
            class="min-w-[2.25rem] min-h-[2.25rem] w-[2.25rem] h-[2.25rem] rounded-[4px] object-cover"
          />
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

import { normalizeSteamEconomyImageUrl } from '@/services/jackpotClient'

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
      activeModal: null,
      min: 0,
      max: 0,
      /** After pre-flip countdown ends we auto-open the game modal once so the coin animation can run. */
      preflipAutoOpened: false
    }
  },
  created() {},
  computed: {
    isLobbyOpen() {
      return this.battle.state === 'created' || this.battle.state === 'open'
    },
    hasTwoPlayers() {
      return (this.battle.players?.length ?? 0) >= 2
    },
    /** Both players joined: run short timer before flip animation (matches Game_Modal). */
    isPreflipPhase() {
      return this.hasTwoPlayers && this.battle.state === 'in_progress'
    },
    maxTime() {
      if (this.battle.state === 'finished') return Number(this.time) || 10
      if (this.isPreflipPhase) return 10
      return 30
    }

    // inBattle: function () {
    //   return this.battle.players.some(
    //     (i) => i.user.id === this.$store.getters.getUser?.id
    //   );
    // },
  },
  methods: {
    ...mapActions(['updateBattle', 'updateBattleState', 'updatePlayerResult', 'removeBattle']),
    // openBattle(battle) {
    //   this.$router.push({
    //     path: `/coinflip/${battle._id}`, // Construct the path with the slug
    //     query: { battleData: JSON.stringify(battle) }
    //   })
    // },
    openModal(name, props) {
      openModal(name, props)
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
    skinImageUrl(skin) {
      const raw = skin?.image ?? ''
      return normalizeSteamEconomyImageUrl(raw) || raw
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
      this.secondsLeft = startingTime
      this.startCountdown()
    },
    syncCountdownToBattle() {
      if (this.battle.state === 'finished') {
        this.preflipAutoOpened = false
        this.restartCountdown(Number(this.time) || 10)
        return
      }
      if (this.isPreflipPhase) {
        this.preflipAutoOpened = false
        this.restartCountdown(10)
        return
      }
      if (this.isLobbyOpen && !this.hasTwoPlayers) {
        this.preflipAutoOpened = false
        this.restartCountdown(30)
        return
      }
      if (this.hasTwoPlayers && this.isLobbyOpen) {
        this.preflipAutoOpened = false
        this.restartCountdown(10)
        return
      }
    },
    tryOpenGameModalForFlip() {
      if (this.preflipAutoOpened) return
      if (this.battle.state !== 'in_progress') return
      this.preflipAutoOpened = true
      this.openModal('coinflip game', {
        battle: this.battle,
        secondsLeft: 0
      })
    },
    stopCountdown() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    },
    startCountdown() {
      if (this.intervalId) return
      // `restartCountdown` / `syncCountdownToBattle` already set `secondsLeft`.

      this.intervalId = setInterval(() => {
        if (this.secondsLeft > 0) {
          this.secondsLeft--
        } else {
          if (this.battle.state === 'in_progress') {
            this.tryOpenGameModalForFlip()
          }
          if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
          }
        }
      }, 1000)
    }
  },
  mounted() {
    this.syncCountdownToBattle()
    this.calculateMinMaxNeed()
  },
  beforeUnmount() {
    this.stopCountdown()
  },
  watch: {
    'battle._id'() {
      this.preflipAutoOpened = false
      this.$nextTick(() => this.syncCountdownToBattle())
    },
    'battle.state'() {
      this.syncCountdownToBattle()
    },
    'battle.players.length'() {
      this.syncCountdownToBattle()
    }
  }
}
</script>
