<template>
  <div ref="unbox-spinner" class="unbox-spinner" v-bind:class="['spinner-' + '1']">
    <div class="spinner-inner relative" v-for="i in 1" v-bind:key="i">
      <ChevronDownIcon
        v-if="!finsihed_spinning"
        class="absolute w-[26px] fill-[rgba(255,52,53,1)] stroke-[rgba(255,52,53,1)] z-50 -bottom-2.5 rotate-180"
      />
      <ChevronDownIcon
        v-if="!finsihed_spinning"
        class="absolute w-[26px] fill-[rgba(255,52,53,1)] stroke-[rgba(255,52,53,1)] z-50 -top-2.5"
      />
      <div
        v-if="!finsihed_spinning"
        class="absolute h-full w-[10rem] bg-[linear-gradient(90deg,#4B0505_0%,rgba(75,5,5,0)100%)] rounded-l-md z-50 left-0"
      ></div>
      <div
        v-if="!finsihed_spinning"
        class="absolute h-full w-[10rem] bg-[linear-gradient(90deg,#4B0505_0%,rgba(75,5,5,0)100%)] rounded-l-md z-50 right-0 rotate-180"
      ></div>
      <div
        v-if="!finsihed_spinning"
        v-bind:ref="'spinner-' + i"
        class="inner-wheel"
        :class="{ 'mr-10 transition-all': !unboxRunning && !winner }"
      >
        <UnboxReel
          v-bind:ref="'reel-' + i"
          v-bind:style="unboxReelStyle"
          v-bind:reel="unboxReels[i]"
          v-bind:pos="unboxReelsPos"
          v-bind:running="unboxRunning"
        />
      </div>
      <div
        v-else
        class="flex flex-wrap items-center justify-center w-full h-full gap-x-2 text-center px-2"
      >
        <div
          class="w-[50px] h-[50px] sm:w-[72px] sm:h-[72px] rounded-[4px] bg-no-repeat bg-center bg-cover"
          :style="{
            backgroundImage: `url(${winner?.avatar ?? '/img/user/userImage.png'})`
          }"
        ></div>

        <span class="text-white font-Rubik font-bold text-base sm:text-xl">
          <span class="text-[rgba(255,191,20,1)] font-Rubik text-base sm:text-xl font-bold"
            >{{ winner.name }}
          </span>
          | WON
          <span class="text-[rgba(4,171,83,1)] font-Rubik font-bold text-base sm:text-xl"
            >${{
              Number(pot_value).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}</span
          >
          WITH
          <span class="text-[rgba(255,52,53,1)] font-Rubik font-bold text-base sm:text-xl"
            >{{
              Number(winner.chance).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0
              })
            }}%</span
          >
          CHANCE | TICKET:{{ displayTicket || '—' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import UnboxReel from './Reel.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

function toNum(v, fallback = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

/** Matches Reel.vue: .reel-element width 60px + margin-right 10px */
const REEL_ITEM_STRIDE_PX = 70
/** Fixed strip index where the winner must land (center marker). */
const WINNER_SLOT_INDEX = 60
/** Tuned so translateX aligns the winning slot with the viewport center (was -2665 for index 60). */
const REEL_ALIGN_OFFSET_PX = 1535
/** Minimum CSS transition length so the strip feels substantial (~4–5s). */
const MIN_SPIN_ANIM_MS = 5000

export default {
  name: 'UnboxSpinner',
  components: {
    UnboxReel,
    ChevronDownIcon
  },
  data() {
    return {
      finsihed_spinning: false,
      unboxReelsSpinTimeout: null,
      unboxReelsPosRepeater: null,
      unboxReelsPos: 20,
      unboxReels: {
        1: [],
        2: [],
        3: [],
        4: []
      },
      unboxReelStyle: {
        transform: 'translate3d(2535px, 0, 0)',
        transition: 'none',
        willChange: 'auto'
      },
      unboxFilterSearch: '',
      unboxFilterSort: 'highest',
      unboxFilterSelect: 'featured',
      unboxRunning: false,
      unboxBoxes: [],
      unboxGames: [],
      unboxBoxData: {
        box: null,
        loading: false
      },
      generalTimeDiff: 0,
      unboxCount: 1,
      winner: null,
      spinRandFn: null,
      spinDurationMs: 15000
    }
  },
  props: ['caseContent', 'pot_value', 'rollAvatars', 'displayTicket'],
  methods: {
    _makeSeededRandom(seedStr) {
      let h = 2166136261
      const s = String(seedStr || '')
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i)
        h = Math.imul(h, 16777619)
      }
      let a = h >>> 0
      return () => {
        a = (a + 0x6d2b79f5) >>> 0
        let t = Math.imul(a ^ (a >>> 15), a | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
      }
    },
    _spinRandom() {
      if (this.spinRandFn) return this.spinRandFn()
      return Math.random()
    },
    demoSpin(itemsWon, syncSeed, winningTicket, spinDurationMs) {
      this.finsihed_spinning = false
      this.spinRandFn =
        syncSeed != null && String(syncSeed).length > 0
          ? this._makeSeededRandom(String(syncSeed))
          : null
      this.spinDurationMs = Math.max(
        MIN_SPIN_ANIM_MS,
        typeof spinDurationMs === 'number' && spinDurationMs > 0 ? spinDurationMs : 15000
      )
      const parsed = Number(String(winningTicket ?? '').replace(/[^\d.-]/g, ''))
      const outcome = Number.isFinite(parsed)
        ? parsed
        : toNum(itemsWon?.ticketRange?.min)
      let games = []
      setTimeout(() => {
        for (let i = 0; i < this.unboxCount; i++) {
          games.push({
            demo: true,
            outcome,
            /** Server / lobby already resolved the winner; ticket↔range match can fail (scale, rounding). */
            rollWinner: itemsWon && typeof itemsWon === 'object' ? itemsWon : null,
            updatedAt: new Date()
          })
        }
        this.unboxGames = games
        this.unboxRunning = true
      }, 250)
    },

    unboxSpin(itemsWon) {
      let games = []

      for (let i = 0; i < this.unboxCount; i++) {
        games.push({
          demo: false,
          outcome: itemsWon[i].ticketRange.min,
          updatedAt: new Date()
        })
      }

      this.unboxGames = games
      this.unboxRunning = true
    },
    unboxGetItemsFormated(items) {
      if (!Array.isArray(items)) return []
      let pos = 0
      for (let item of items) {
        const tr = item?.ticketRange
        if (!tr) continue
        pos = pos + (tr.max - tr.min)
      }

      return items
    },
    unboxGetOutcomeItem(game) {
      let outcomeItem = null

      for (const item of this.unboxGetItemsFormated(this.caseContent)) {
        let minTickets = item.ticketRange.min
        let maxTickets = item.ticketRange.max

        if (game.outcome >= minTickets && game.outcome <= maxTickets) {
          outcomeItem = item
          break
        }
      }

      return outcomeItem
    },
    unboxGetReelsPos() {
      /** Do not track position while CSS transform is animating — RAF + Vue updates cause jank. */
      if (this.unboxRunning) return

      const reelRef = this.$refs['reel-1']
      const spinnerEl = this.$refs['unbox-spinner']
      if (!reelRef?.[0]?.$el || !spinnerEl) return

      const offset =
        reelRef[0].$el.getBoundingClientRect().left +
        reelRef[0].$el.getBoundingClientRect().width / 2 -
        spinnerEl.getBoundingClientRect().width / 2 -
        spinnerEl.getBoundingClientRect().left

      const pos = Math.round(Math.abs(offset - 2535) / 70) + 20

      if (this.unboxReelsPos !== pos) {
        this.unboxReelsPos = pos
      }

      this.unboxReelsPosRepeater = requestAnimationFrame(this.unboxGetReelsPos)
    },
    _jackpotSpinParticipants() {
      const raw = Array.isArray(this.caseContent) ? this.caseContent : []
      const fromPot = raw.filter(
        (p) => p?.ticketRange && toNum(p.ticketRange.max) >= toNum(p.ticketRange.min)
      )
      const extras = Array.isArray(this.rollAvatars) ? this.rollAvatars : []
      const fromRoll = extras.map((a, i) => {
        const avatar =
          typeof a === 'string'
            ? a
            : a?.avatar ?? a?.image ?? a?.url ?? '/img/user/userImage.png'
        const name = typeof a === 'object' && a ? a.name ?? a.username ?? '' : ''
        return {
          avatar,
          name,
          chance: toNum(typeof a === 'object' && a ? a.chance : 0, 0),
          ticketRange: { min: -1 - i, max: -1 - i }
        }
      })
      return fromPot.concat(fromRoll)
    },
    _pickWeightedPlayer(players) {
      if (!players.length) return null
      const weights = players.map((p) => {
        const c = toNum(p.chance)
        if (c > 0) return c
        const tr = p.ticketRange
        const span = Math.max(0, toNum(tr?.max) - toNum(tr?.min))
        return span > 0 ? span : 0
      })
      let sum = weights.reduce((a, b) => a + b, 0)
      if (sum <= 0) {
        return players[Math.floor(this._spinRandom() * players.length)]
      }
      let r = this._spinRandom() * sum
      for (let i = 0; i < players.length; i++) {
        r -= weights[i]
        if (r <= 0) return players[i]
      }
      return players[players.length - 1]
    },
    /** Ensure reel item has avatar URL for background-image */
    _reelPlayerFromRoll(winner) {
      if (!winner || typeof winner !== 'object') return null
      const avatar =
        winner.avatar ?? winner.image ?? winner.url ?? '/img/user/userImage.png'
      return { ...winner, avatar }
    },
    /**
     * Build horizontal strip: weighted filler avatars, then force roll winner at WINNER_SLOT_INDEX.
     * Winner is driven by roll (avatar), not ticket math.
     */
    unboxAddReels(rollWinner) {
      this.unboxReels = { 1: [], 2: [], 3: [], 4: [] }
      const stripLen = 112
      let pickList = this._jackpotSpinParticipants()
      if (!pickList.length) {
        pickList = [
          {
            avatar: '/img/user/userImage.png',
            ticketRange: { min: 0, max: 1000 },
            chance: 100
          }
        ]
      }
      const forced = this._reelPlayerFromRoll(rollWinner)

      for (const reel of Object.keys(this.unboxReels)) {
        for (let i = 0; i < stripLen; i++) {
          if (i === WINNER_SLOT_INDEX && forced) {
            this.unboxReels[reel].push(forced)
          } else {
            this.unboxReels[reel].push(this._pickWeightedPlayer(pickList))
          }
        }
      }
    },
    /** Final translateX so WINNER_SLOT_INDEX lines up under the center chevrons */
    _finalReelTranslateX() {
      return -(WINNER_SLOT_INDEX * REEL_ITEM_STRIDE_PX) + REEL_ALIGN_OFFSET_PX
    }
  },
  watch: {
    unboxGames: {
      deep: true,
      handler(data, dataOld) {
        if (this.unboxGames.length >= 1) {
          clearTimeout(this.unboxReelsSpinTimeout)
          cancelAnimationFrame(this.unboxReelsPosRepeater)
          this.unboxReelsPosRepeater = null

          for (const game of this.unboxGames) {
            const byTicket = this.unboxGetOutcomeItem(game)
            const resolved =
              game.demo === true && game.rollWinner
                ? game.rollWinner
                : byTicket ?? game.rollWinner

            this.winner = resolved
            this.unboxAddReels(resolved)

            const START_X = 2535
            const finalX = this._finalReelTranslateX()
            const duration = this.spinDurationMs

            const timeEnding = new Date(game.updatedAt).getTime() + duration
            let timeLeft =
              timeEnding -
              (Date.now() + (game.demo !== true ? this.generalTimeDiff : 0))
            timeLeft = Math.max(0, timeLeft)
            /** Minimum duration so the spin is visibly smooth; avoid ~0s transitions. */
            const animMs = Math.max(MIN_SPIN_ANIM_MS, timeLeft, this.spinDurationMs)

            this.unboxReelStyle = {
              transform: `translate3d(${START_X}px, 0, 0)`,
              transition: 'none',
              willChange: 'transform'
            }

            this.$nextTick(() => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  this.unboxReelStyle = {
                    transform: `translate3d(${finalX}px, 0, 0)`,
                    transition: `transform ${animMs / 1000}s cubic-bezier(0.22, 1, 0.36, 1)`,
                    willChange: 'transform'
                  }

                  this.unboxReelsSpinTimeout = setTimeout(() => {
                    this.unboxReelStyle = {
                      transform: `translate3d(${finalX}px, 0, 0)`,
                      transition: 'none',
                      willChange: 'auto'
                    }
                    this.unboxReelsPos = WINNER_SLOT_INDEX
                    this.unboxRunning = false
                    this.spinRandFn = null
                    this.$emit('complete', game.demo)
                  }, animMs + 80)
                })
              })
            })
          }
        }
      }
    }
  },

  created() {
    this.unboxAddReels(null)
  },
  beforeUnmount() {
    this.unboxRunning = false
    this.spinRandFn = null
    clearTimeout(this.unboxReelsSpinTimeout)
    cancelAnimationFrame(this.unboxReelsPosRepeater)
  }
}
</script>

<style scoped>
.unbox-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* gap: 2rem; */
  width: 100%;
  /* max-width: 100%; */
  height: 100%;
  position: relative;
  z-index: 1;
  border-radius: 4px;
  background: rgba(75, 5, 5, 1);
  box-shadow: 0px 4px 4px 0px #00000040;
  border: 0.5px solid rgba(255, 52, 53, 1);
  /* background-color: red; */
}

.unbox-spinner::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.15));
}

.unbox-spinner::after {
  content: '';
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  position: absolute;
  top: 1px;
  left: 1px;

  z-index: -1;
}

.unbox-spinner .spinner-inner {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.unbox-spinner .inner-wheel {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-right: 60px; */
  overflow: hidden;
}

.unbox-spinner .inner-wheel:last-child {
  border-right: none;
}
.unbox-spinner.spinner-2,
.unbox-spinner.spinner-3,
.unbox-spinner.spinner-4 {
  height: 100%;
}
.unbox-spinner.spinner-2 .inner-wheel {
  width: 100%;
}

.unbox-spinner.spinner-3 .inner-wheel {
  width: 100%;
}

.unbox-spinner.spinner-4 .inner-wheel {
  width: 100%;
}

@media only screen and (max-width: 1170px) {
  .case {
    display: none;
  }
  /*.unbox-spinner {
                height: auto;
            }
  
            .unbox-spinner .spinner-inner {
                flex-direction: column;
            }
  
            .unbox-spinner .inner-wheel {
                height: 140px;
                border-bottom: 1px solid rgba(28, 71, 182, 0.35);
                border-right: none;
            }
  
            .unbox-spinner .inner-wheel:last-child {
                border-bottom: none;
            }
  
            .unbox-spinner.spinner-2 .inner-wheel,
            .unbox-spinner.spinner-3 .inner-wheel,
            .unbox-spinner.spinner-4 .inner-wheel {
                width: 100%;
            }*/
}
</style>
