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
            backgroundImage: `url(${winner.avatar})`
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
          CHANCE | TICKET:89.688
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
        transform: 'translateX(2535px) translateY(0px)',
        transition: 'none'
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
      /** When set, reel shuffle and end jitter use this PRNG so all clients match the same roll. */
      spinRandFn: null
    }
  },
  props: ['caseContent', 'pot_value'],
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
    demoSpin(itemsWon, syncSeed, winningTicket) {
      this.finsihed_spinning = false
      this.spinRandFn =
        syncSeed != null && String(syncSeed).length > 0
          ? this._makeSeededRandom(String(syncSeed))
          : null
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
      const offset =
        this.$refs['reel-1'][0].$el.getBoundingClientRect().left +
        this.$refs['reel-1'][0].$el.getBoundingClientRect().width / 2 -
        this.$refs['unbox-spinner'].getBoundingClientRect().width / 2 -
        this.$refs['unbox-spinner'].getBoundingClientRect().left

      const pos = Math.round(Math.abs(offset - 2535) / 70) + 20

      if (this.unboxReelsPos !== pos) {
        this.unboxReelsPos = pos
      }

      this.unboxReelsPosRepeater = requestAnimationFrame(this.unboxGetReelsPos)
    },
    /** Entrants that can appear on the jackpot reel (need ticket range for outcome matching). */
    _jackpotSpinParticipants() {
      const raw = Array.isArray(this.caseContent) ? this.caseContent : []
      return raw.filter(
        (p) => p?.ticketRange && toNum(p.ticketRange.max) >= toNum(p.ticketRange.min)
      )
    },
    /** One random entrant weighted by `chance` (%), else ticket span, else uniform. Uses _spinRandom (seeded when syncing). */
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
    unboxAddReels() {
      this.unboxReels = { 1: [], 2: [], 3: [], 4: [] }
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

      for (const reel of Object.keys(this.unboxReels)) {
        for (let i = 0; i < 112; i++) {
          this.unboxReels[reel].push(this._pickWeightedPlayer(pickList))
        }
      }
    }
  },
  watch: {
    unboxGames: {
      deep: true,
      handler(data, dataOld) {
        if (this.unboxGames.length >= 1) {
          /* Always rebuild from current caseContent — first spin used to skip this when dataOld was [], leaving the empty-state reel (one placeholder). */
          this.unboxAddReels()
          this.unboxGetReelsPos()

          for (const [index, game] of this.unboxGames.entries()) {
            this.unboxReelStyle = {
              transform: 'translateX(2535px) translateY(0px)',
              transition: 'none'
            }

            this.unboxReels[index + 1][60] = this.unboxGetOutcomeItem(game)
            this.winner = this.unboxReels[index + 1][60]
            // Adjust the duration based on fastOpening
            const duration = 15000

            setTimeout(() => {
              const timeEnding = new Date(game.updatedAt).getTime() + duration
              let timeLeft =
                timeEnding -
                (new Date().getTime() + (game.demo !== true ? this.generalTimeDiff : 0))
              timeLeft = timeLeft > 0 ? timeLeft : 0

              this.unboxReelStyle = {
                transform:
                  'translateX(-' +
                  (2600.5 + (60 / 8) * Math.floor(this._spinRandom() * (7 - 1 + 1)) + 1) +
                  'px) translateY(0px)',
                transition: 'transform ' + timeLeft / 1000 + 's cubic-bezier(0.1, 0, 0.2, 1)'
              }

              this.unboxReelsSpinTimeout = setTimeout(() => {
                this.unboxReelStyle = {
                  transform: 'translateX(-2665px) translateY(0px)',
                  transition: 'transform 0.25s cubic-bezier(0.1, 0, 0.2, 1)'
                }

                cancelAnimationFrame(this.unboxReelsPosRepeater)

                setTimeout(() => {
                  this.unboxRunning = false
                  this.spinRandFn = null
                  this.$emit('complete', game.demo)
                }, 250)
                setTimeout(() => {
                  // this.finsihed_spinning = true
                }, 2000)
              }, timeLeft + 100)
            }, 5)
          }
        }
      }
    }
  },

  created() {
    this.unboxAddReels()
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
