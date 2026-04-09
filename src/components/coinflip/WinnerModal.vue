<template>
  <div
    class="w-[534px] h-[1032px] overflow-hidden relative bg-[radial-gradient(ellipse_36.32%_58.01%_at_50%_0%,rgba(255,216,9,0.3)_0%,#530000_100%)] border border-[#530000] backdrop-blur-[32px]"
  >
    <button class="absolute right-4 top-4 z-20" @click="closeModal">
      <XMarkIcon class="w-6 h-6 fill-[#d7b7b7]" />
    </button>

    <div class="pt-16 pb-4 flex flex-col items-center">
      <img :src="winnerAvatar" class="w-[124px] h-[124px] rounded-full object-cover" />
      <div class="mt-4 flex items-center gap-2">
        <span class="text-white text-4xl font-extrabold font-['Rubik'] uppercase">YOU'VE WON!</span>
        <span class="text-[#04AB53] text-4xl font-extrabold font-['Rubik'] uppercase">
          ${{ formattedWon }}
        </span>
      </div>
    </div>

    <div class="px-3 pb-3">
      <div class="max-h-[420px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-1.5 p-1.5">
        <div
          v-for="(item, index) in allBattleItems"
          :key="`item-${index}-${item._id ?? item.id ?? ''}`"
          class="p-2 bg-[#690405] flex flex-col justify-center items-center gap-2 min-h-[120px]"
        >
          <img :src="item.image" class="w-16 h-16 object-contain" />
          <div class="flex flex-col justify-center items-center gap-0.5">
            <div class="text-[#d7b7b7] text-sm font-semibold font-['Rubik'] leading-5 truncate max-w-[120px]">
              {{ item.name }}
            </div>
            <div class="text-white text-base font-extrabold font-['Rubik'] uppercase leading-6">
              ${{ formatPrice(item.price) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-3 pb-4 flex items-center gap-2">
      <button
        type="button"
        class="h-10 flex-1 bg-[#FF3435] text-white text-base font-extrabold font-['Rubik'] uppercase"
        @click="startDoubleDown"
      >
        DOUBLE-DOWN
      </button>
      <button
        type="button"
        class="h-10 px-4 flex items-center justify-center gap-2 bg-[#04AB53] text-white text-base font-extrabold font-['Rubik'] uppercase"
      >
        <img src="../../assets/img/loginIcon.png" class="w-6 h-6" />
        SEND TRADE OFFER
      </button>
    </div>
    <div
      v-if="showDoubleDownCoins"
      class="w-full flex flex-col items-center justify-center px-3 pb-6 border-t border-[#530000]/60 pt-4"
    >
      <div class="w-full max-w-md mx-auto flex flex-col items-center gap-4">
        <div
          class="text-center text-white text-base font-extrabold font-['Rubik'] uppercase leading-6 w-full"
        >
          please select a coin
        </div>
        <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <img
            class="w-[90px] sm:w-32 h-[90px] sm:h-32 hover:scale-105 transition cursor-pointer rounded-full"
            :class="coinSelectClass('heaven')"
            src="../../assets/img/coins/heaven.png"
            alt="Heaven"
            @click="selectedDoubleCoin = 'heaven'"
          />
          <img
            class="w-[90px] sm:w-32 h-[90px] sm:h-32 hover:scale-105 transition cursor-pointer rounded-full"
            :class="coinSelectClass('hell')"
            src="../../assets/img/coins/hell.png"
            alt="Hell"
            @click="selectedDoubleCoin = 'hell'"
          />
          <div
            class="relative hover:scale-105 transition cursor-pointer rounded-full"
            @click="selectedDoubleCoin = 'random'"
          >
            <div
              class="w-[90px] sm:w-32 h-[90px] sm:h-32 rounded-full relative bg-[rgb(255,52,53,0.2)] flex items-center justify-center overflow-hidden"
              :class="coinSelectClass('random', true)"
            >
              <img src="../../assets/icons/questionMark.png" class="w-12 h-12 object-contain" alt="" />
              <img
                src="../../assets/icons/questionMark.png"
                class="opacity-20 absolute left-1 w-[30px] h-[38px] rotate-[-15deg] bottom-2"
                alt=""
              />
              <img
                src="../../assets/icons/questionMark.png"
                class="opacity-20 absolute right-1 w-[30px] h-[38px] rotate-[15deg] top-3"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 w-full justify-center">
          <button
            type="button"
            class="px-6 py-2 bg-[#04AB53] text-white text-base font-extrabold font-['Rubik'] uppercase disabled:opacity-40 disabled:cursor-not-allowed"
            :disabled="!selectedDoubleCoin"
            @click="confirmDoubleDown"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { openModalFromModal } from '@/modalStore'
import { getAuth } from '@/auth/session'

export default {
  name: 'CoinflipWinnerModal',
  props: {
    winner: {
      type: Object,
      default: () => ({})
    },
    battle: {
      type: Object,
      default: () => ({ players: [] })
    },
    wonAmount: {
      type: Number,
      default: 0
    }
  },
  components: { XMarkIcon },
  data() {
    return {
      showDoubleDownCoins: false,
      selectedDoubleCoin: ''
    }
  },
  computed: {
    winnerAvatar() {
      return getAuth()?.avatarUrl || this.winner?.avatar || '/img/user/userImage.png'
    },
    loserPlayer() {
      const players = Array.isArray(this.battle?.players) ? this.battle.players : []
      if (!players.length) return null
      const w = this.winner
      const byWin = players.find((p) => p && p.win === false)
      if (byWin) return byWin
      if (w && (w._id != null || w.name)) {
        return players.find((p) => p !== w && (p._id !== w._id || p.name !== w.name)) || null
      }
      return players[1] || null
    },
    allBattleItems() {
      const winnerItems = Array.isArray(this.winner?.items) ? this.winner.items : []
      const loser = this.loserPlayer
      const loserItems = loser && Array.isArray(loser.items) ? loser.items : []
      return [...winnerItems, ...loserItems]
    },
    formattedWon() {
      const amount = Number(this.wonAmount || this.battle?.total || 0)
      return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
  },
  methods: {
    coinSelectClass(coin, isRandomBox) {
      const selected = this.selectedDoubleCoin === coin
      if (isRandomBox) {
        return {
          'opacity-50': this.selectedDoubleCoin !== '' && !selected,
          'ring-[5px] ring-[#ff3435] ring-offset-2 ring-offset-[#310000]': selected
        }
      }
      return {
        'opacity-50': this.selectedDoubleCoin !== '' && !selected,
        'shadow-[0_0_50px_1px_#95c9fb] rounded-full': coin === 'heaven' && selected,
        'shadow-[0_0_50px_1px_#db0404] rounded-full': coin === 'hell' && selected
      }
    },
    startDoubleDown() {
      this.showDoubleDownCoins = true
      this.selectedDoubleCoin = ''
    },
    confirmDoubleDown() {
      if (!this.selectedDoubleCoin) return
      const winnerItems = Array.isArray(this.winner?.items) ? [...this.winner.items] : []
      openModalFromModal('create coinflip', {
        initialCoin: this.selectedDoubleCoin,
        initialSelectedItems: winnerItems,
        doubleDownFromBattle: this.battle
      })
    },
    closeModal() {
      this.$emit('close-modal')
    },
    formatPrice(price) {
      return Number(price || 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    }
  }
}
</script>
