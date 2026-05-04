<template>
  <div
    class="relative flex max-h-[min(92vh,920px)] w-[534px] max-w-full shrink-0 flex-col overflow-hidden rounded-lg border border-[#530000] bg-[radial-gradient(ellipse_36.32%_58.01%_at_50%_0%,rgba(255,216,9,0.3)_0%,#530000_100%)] backdrop-blur-[32px]"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden rounded-lg" aria-hidden="true">
      <img
        src="../../assets/img/congratulations.png"
        alt=""
        class="h-[296px] w-[534px] max-w-full object-cover"
      />
    </div>

    <button
      type="button"
      class="absolute top-3 right-3 z-10 rounded-sm p-1 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
      aria-label="Close"
      @click="closeModal"
    >
      <XMarkIcon class="h-6 w-6 stroke-2" />
    </button>

    <div class="relative z-[1] flex min-h-0 flex-1 flex-col px-3 pb-5 pt-9 sm:px-2 sm:pb-6">
      <div class="flex h-[296px] shrink-0 flex-col items-center justify-center text-center">
        <div class="relative shrink-0">
          <img
            src="../../assets/img/Union.png"
            alt=""
            class="pointer-events-none absolute bottom-full left-1/2 mb-[-12px] h-[52px] w-auto max-w-[120px] -translate-x-1/2 select-none object-contain"
            aria-hidden="true"
          />
          <div
            class="relative z-10 h-[124px] w-[124px] shrink-0 rounded-full bg-[#1a0101] bg-cover bg-center shadow-inner ring-2 ring-amber-500/60 ring-offset-2 ring-offset-[#530000] brightness-125"
            :style="{ backgroundImage: `url(${displayAvatar})` }"
          />
        </div>
        <h2
          class="mt-4 flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-0 font-Rubik text-lg font-black uppercase leading-tight tracking-wide text-white sm:text-xl"
        >
          <span class="font-Rubik text-[35px] font-bold text-white">You've won</span>
          <span class="font-Rubik text-[35px] font-bold tabular-nums text-[#4ade80]"
            >${{ formattedWon }}</span
          >
        </h2>
      </div>

      <div class="winner-items-viewport relative mt-5 flex min-h-0 flex-1 flex-col">
        <div
          class="grid-scroll winner-items-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5"
          :class="{ 'pb-1': needsItemsBottomFade }"
        >
          <div class="winner-items-grid grid gap-2">
            <div
              v-for="(it, idx) in displayItems"
              :key="`item-${idx}-${it._key}`"
              class="winner-item-cell flex aspect-square w-full min-w-0 flex-col rounded border border-[#5c1212]/80 bg-[#690405] p-1.5 text-center"
            >
              <div
                class="mx-auto h-[46px] w-[46px] shrink-0 rounded-sm bg-cover bg-center sm:h-[52px] sm:w-[52px]"
                :style="{ backgroundImage: it.image ? `url(${it.image})` : undefined }"
              />
              <div class="mt-1 flex min-h-0 flex-1 flex-col justify-end gap-0.5">
                <p
                  class="min-w-0 truncate px-0.5 font-Rubik text-[16px] font-semibold uppercase leading-tight text-white/90 sm:text-[16px]"
                  :title="it.name"
                >
                  {{ it.name }}
                </p>
                <p class="shrink-0 font-Rubik text-[16px] font-bold tabular-nums leading-none text-white">
                  ${{ formatPrice(it.price) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="needsItemsBottomFade"
          class="pointer-events-none absolute bottom-0 left-0 right-0 h-16 rounded-b-sm bg-gradient-to-t from-[#530000] via-[#530000]/85 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div class="mt-auto grid shrink-0 grid-cols-1 gap-2 pt-5 sm:grid-cols-2 sm:gap-3">
        <button
          type="button"
          class="flex min-h-[48px] w-full min-w-0 items-center justify-center rounded-none bg-[#f15840] px-3 transition-opacity hover:opacity-95 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="wagerLoading || claimLoading"
          @click="startDoubleDown"
        >
          <span class="font-Rubik text-[16px] font-extrabold uppercase tracking-wider text-white">
            Double down
          </span>
        </button>
        <button
          type="button"
          class="flex min-h-[48px] w-full min-w-0 items-center justify-center gap-3 rounded-none bg-[#04AB53] px-3 py-2.5 shadow-[0_4px_14px_rgba(4,171,83,0.35)] transition-opacity hover:opacity-95 active:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          :disabled="claimLoading || wagerLoading"
          @click="onClaimWinnings"
        >
          <span class="flex h-9 w-6 shrink-0 items-center justify-center rounded-full" aria-hidden="true">
            <img src="../../assets/img/loginIcon.png" alt="" class="h-6 w-6 object-contain" />
          </span>
          <span
            class="whitespace-nowrap font-Rubik text-[16px] font-extrabold uppercase tracking-wider text-white"
          >
            {{ claimLoading ? '…' : 'Claim winnings' }}
          </span>
        </button>
      </div>
    </div>

    <div
      v-if="showDoubleDownCoins"
      class="relative z-[1] flex w-full flex-col items-center justify-center border-t border-[#530000]/60 px-3 pb-6 pt-4"
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
            :disabled="!selectedDoubleCoin || wagerLoading"
            @click="confirmDoubleDown"
          >
            {{ wagerLoading ? '…' : 'CONFIRM' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
import { getAuth, getSteamId } from '@/auth/session'
import {
  claimCoinflipWinnings,
  getTradeURLStatus,
  normalizeSteamEconomyImageUrl,
  wagerCoinflipWinnings
} from '@/services/jackpotClient'

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
      selectedDoubleCoin: '',
      wagerLoading: false,
      claimLoading: false
    }
  },
  computed: {
    coinflipGameId() {
      const b = this.battle || {}
      const raw = b.gameid ?? b.gameId ?? b._id
      if (raw == null || raw === '') return null
      const n = Number(raw)
      return Number.isFinite(n) ? n : String(raw)
    },
    displayAvatar() {
      const raw =
        getAuth()?.avatarUrl ||
        this.winner?.avatar ||
        '/img/user/userImage.png'
      const s = typeof raw === 'string' ? raw.trim() : ''
      return s || '/img/user/userImage.png'
    },
    displayItems() {
      const list = Array.isArray(this.allBattleItems) ? this.allBattleItems : []
      return list.map((it, idx) => ({
        ...it,
        _key: it._id ?? it.id ?? it.assetid ?? it.asset_id ?? idx,
        name: it.name ?? '',
        price: it.price,
        image: normalizeSteamEconomyImageUrl(it?.image ?? it?.icon_url ?? it?.icon ?? '')
      }))
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
    },
    /** Bottom fade when content exceeds ~3 rows (4 cols → 12 cells; 2 cols → 6). */
    needsItemsBottomFade() {
      const n = this.displayItems.length
      if (typeof window !== 'undefined' && window.matchMedia('(min-width: 640px)').matches) {
        return n > 12
      }
      return n > 6
    }
  },
  methods: {
    showErrorMessage(error, fallbackMessage) {
      const msg =
        error?.error_message ||
        error?.message ||
        (typeof fallbackMessage === 'string' ? fallbackMessage : 'Request failed')
      this.$toaster?.error?.(String(msg))
    },
    showSuccessMessage(response, fallbackMessage) {
      const msg =
        response?.message ||
        (typeof fallbackMessage === 'string' ? fallbackMessage : 'Action completed.')
      this.$toaster?.success?.(String(msg))
    },
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
      if (this.wagerLoading || this.claimLoading) return
      if (this.showDoubleDownCoins) return
      const steamid = getSteamId()
      if (!steamid) {
        openModalFromModal('login', { redirectTo: '/coinflip' })
        return
      }
      this.showDoubleDownCoins = true
      this.selectedDoubleCoin = ''
    },
    async onClaimWinnings() {
      if (this.claimLoading || this.wagerLoading) return
      const steamid = getSteamId()
      if (!steamid) {
        openModalFromModal('login', { redirectTo: '/coinflip' })
        return
      }
      if (this.coinflipGameId == null) {
        this.showErrorMessage(null, 'Missing game id for this coinflip.')
        return
      }
      this.claimLoading = true
      try {
        const response = await claimCoinflipWinnings({
          steamid: String(steamid).trim(),
          gameid: this.coinflipGameId
        })
        this.showSuccessMessage(response, 'Winnings claimed — check your Steam offers.')
        this.closeModal()
      } catch (error) {
        this.showErrorMessage(error, 'Could not claim winnings.')
        console.error('claimCoinflipWinnings:', error)
      } finally {
        this.claimLoading = false
      }
    },
    async confirmDoubleDown() {
      if (!this.selectedDoubleCoin || this.wagerLoading) return
      const steamid = getSteamId()
      if (!steamid) {
        openModalFromModal('login', { redirectTo: '/coinflip' })
        return
      }
      if (this.coinflipGameId == null) {
        this.showErrorMessage(null, 'Missing game id for this coinflip.')
        return
      }
      try {
        const status = await getTradeURLStatus({ steamid })
        if (!status.isRegistered) {
          openModalFromModal('trade url required', {
            onSaved: () => this.confirmDoubleDown()
          })
          return
        }
      } catch (error) {
        this.$toaster?.error?.(error?.message || 'Could not validate Steam trade URL.')
        return
      }
      this.wagerLoading = true
      try {
        await wagerCoinflipWinnings({
          steamid: String(steamid).trim(),
          gameid: this.coinflipGameId
        })
      } catch (error) {
        this.showErrorMessage(error, 'Could not wager winnings.')
        console.error('wagerCoinflipWinnings:', error)
        return
      } finally {
        this.wagerLoading = false
      }
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

<style scoped>
.grid-scroll {
  scrollbar-width: thin;
  scrollbar-color: #870000 transparent;
}

/* ~3 visible rows: row height tracks square cells; 2 cols on narrow, 4 cols ≥640px */
.winner-items-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.winner-items-scroll {
  max-height: calc((100% - 0.5rem) * 3 / 2 + 0.5rem * 2);
}

@media (min-width: 640px) {
  .winner-items-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .winner-items-scroll {
    max-height: calc((100% - 1.5rem) * 3 / 4 + 1rem);
  }
}
</style>
