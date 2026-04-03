<template>
  <div ref="unbox-spinner" class="unbox-spinner spinner-1">
    <div class="spinner-inner relative" v-for="i in 1" :key="i">
      <template v-if="!finsihed_spinning">
        <div
          class="absolute h-full w-[10rem] bg-[linear-gradient(90deg,#4B0505_0%,rgba(75,5,5,0)100%)] rounded-l-md z-50 left-0 pointer-events-none"
        />
        <div
          class="absolute h-full w-[10rem] bg-[linear-gradient(90deg,#4B0505_0%,rgba(75,5,5,0)100%)] rounded-l-md z-50 right-0 rotate-180 pointer-events-none"
        />
        <div
          :ref="'spinner-' + i"
          class="inner-wheel inner-wheel--gpu"
          :class="{ 'mr-10 transition-all': !unboxRunning && !winner }"
        >
          <UnboxReel
            :ref="'reel-' + i"
            :style="stripStyleBinding"
            :reel="unboxReels[i]"
            :pos="unboxReelsPos"
            :running="unboxRunning"
            :spin-phase="spinPhase"
          />
        </div>
      </template>
      <div
        v-else
        class="flex flex-wrap items-center justify-center w-full min-h-[72px] h-full gap-x-2 gap-y-1 text-center px-2 py-2"
      >
        <div
          class="w-[50px] h-[50px] sm:w-[72px] sm:h-[72px] rounded-[4px] bg-no-repeat bg-center bg-cover shrink-0 border border-[#5a1212]"
          :style="{ backgroundImage: `url(${getAvatar(winner)})` }"
        />
        <span class="text-white font-Rubik font-bold text-base sm:text-xl leading-snug">
          <span class="text-[rgba(255,191,20,1)] font-Rubik text-base sm:text-xl font-bold">{{
            winner?.name ?? '—'
          }}</span>
          | WON
          <span class="text-[rgba(4,171,83,1)] font-Rubik font-bold text-base sm:text-xl"
            >${{
              Number(displayPotValue).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
            }}</span
          >
          WITH
          <span class="text-[rgba(255,52,53,1)] font-Rubik font-bold text-base sm:text-xl"
            >{{
              Number(winner?.chance ?? 0).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0
              })
            }}%</span
          >
          CHANCE | TICKET:{{ displayTicketStr }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import UnboxReel from './Reel.vue'
import { normalizeSteamEconomyImageUrl } from '@/services/jackpotClient'

function toNum(v, fallback = 0) {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

/** Matches Reel.vue: `.reel-element` width + margin-right (last child has margin 0 but spacing between indices is still this step). */
const SLOT_STEP = 70
/** Half of the 60px reel card — center of the face, not SLOT_STEP/2 (that was off by 5px and skewed the winner). */
const SLOT_FACE_HALF = 30
const STRIP_LEN = 150
const WINNER_SLOT_INDEX = 135
const START_X = 2525
/** Must match `data().unboxReelsPos` initial value and the strip position implied by START_X. */
const STRIP_START_CENTER_SLOT = 20
const MIN_SPIN_MS = 5000
/** Extra time at end of RAF (slow coast folded into the same RAF loop). */
const SETTLE_TRANSITION_MS = 5800
const SETTLE_AFTER_DELAY_MS = 0
const FINISHED_REEL_HOLD_MS = 2800

/**
 * Two-phase ease: fast ramp (quadratic), then cubic ease-out — not the extra-long sine tail.
 */
function easeOutCubic01(u) {
  u = Math.min(Math.max(u, 0), 1)
  return 1 - Math.pow(1 - u, 3)
}

function easeCasinoSpin(t) {
  t = Math.min(Math.max(t, 0), 1)
  const split = 0.44
  const distFast = 0.56
  if (t <= split) {
    const u = t / split
    return distFast * u * u
  }
  const u = (t - split) / (1 - split)
  return distFast + (1 - distFast) * easeOutCubic01(u)
}

export default {
  name: 'UnboxSpinner',
  components: { UnboxReel },
  props: {
    caseContent: { type: Array, default: () => [] },
    pot_value: { type: [Number, String], default: 0 },
    rollAvatars: { type: Array, default: () => [] },
    displayTicket: { type: [String, Number], default: '' }
  },
  data() {
    return {
      finsihed_spinning: false,
      /** When true, strip transform is driven by RAF on DOM (not Vue :style) for smooth motion. */
      stripTransformViaRaf: false,
      animationFrameId: null,
      unboxReelsPosRepeater: null,
      unboxReelsPos: 20,
      displayCenterIndex: 20,
      unboxReels: { 1: [], 2: [], 3: [], 4: [] },
      unboxReelStyle: {
        transform: `translate3d(${START_X}px,0,0)`,
        transition: 'none',
        willChange: 'auto'
      },
      unboxRunning: false,
      unboxGames: [],
      unboxCount: 1,
      winner: null,
      spinPhase: 'idle',
      spinDurationMs: 15000,
      demoSpinLeadTimeout: null,
      settleTimeoutId: null,
      displayPotSnapshot: 0,
      spinRandFn: null,
      winnerRevealTimeoutId: null
    }
  },
  computed: {
    displayTicketStr() {
      const t = this.displayTicket
      if (t == null || String(t).trim() === '') return '—'
      return String(t).trim()
    },
    displayPotValue() {
      const v = this.displayPotSnapshot
      const n = Number(v)
      return Number.isFinite(n) ? n : Number(this.pot_value) || 0
    },
    /** Vue-bound strip style only when not using RAF (idle / after spin before next). */
    stripStyleBinding() {
      if (this.stripTransformViaRaf) return {}
      return this.unboxReelStyle
    }
  },
  methods: {
    /**
     * Clears winner panel so the reel shows again. Call only when the next spin starts (`demoSpin`).
     */
    resetWinnerReveal() {
      if (this.winnerRevealTimeoutId != null) {
        clearTimeout(this.winnerRevealTimeoutId)
        this.winnerRevealTimeoutId = null
      }
      this.finsihed_spinning = false
    },
    getReelStripEl() {
      const r = this.$refs['reel-1']
      const comp = Array.isArray(r) ? r[0] : r
      return comp?.$el ?? null
    },
    clearStripDomTransform() {
      const el = this.getReelStripEl()
      if (!el) return
      el.style.removeProperty('transform')
      el.style.removeProperty('transition')
      el.style.removeProperty('will-change')
    },
    /**
     * After the spin, nudge translateX so the strip covers the wheel (used on settle only).
     * Do NOT use this during RAF: iterative nudges fight the eased position — when the animation
     * wants to move past the "min X" bound, the clamp caps X so the reel appears to freeze mid-spin.
     */
    clampStripTranslateToFillWheel(stripEl, wheelEl, x) {
      if (!stripEl || !wheelEl) return x
      if (stripEl.scrollWidth < wheelEl.clientWidth - 1) return x
      stripEl.style.transition = 'none'
      let cur = x
      for (let iter = 0; iter < 5; iter++) {
        stripEl.style.transform = `translate3d(${cur}px,0,0)`
        const sr = stripEl.getBoundingClientRect()
        const wr = wheelEl.getBoundingClientRect()
        let dx = 0
        if (sr.right < wr.right - 0.5) dx += wr.right - sr.right
        if (sr.left > wr.left + 0.5) dx -= sr.left - wr.left
        if (Math.abs(dx) < 0.25) break
        cur += dx
      }
      return cur
    },
    /**
     * Place slot `slotIndex` (tile center) under the wheel viewport center (winner in the middle).
     * Uses the real DOM node when possible so scale transforms on `.reel-element` match what the user sees.
     */
    alignStripIndexToWheelCenter(stripEl, wheelEl, slotIndex, xGuess) {
      if (!stripEl || !wheelEl) return xGuess
      let x = xGuess
      stripEl.style.transition = 'none'
      for (let iter = 0; iter < 12; iter++) {
        stripEl.style.transform = `translate3d(${x}px,0,0)`
        const wr = wheelEl.getBoundingClientRect()
        const wheelCx = (wr.left + wr.right) / 2
        const child = stripEl.children[slotIndex]
        let slotCx
        if (child && typeof child.getBoundingClientRect === 'function') {
          const cr = child.getBoundingClientRect()
          slotCx = (cr.left + cr.right) / 2
        } else {
          const sr = stripEl.getBoundingClientRect()
          slotCx = sr.left + slotIndex * SLOT_STEP + SLOT_FACE_HALF
        }
        const err = wheelCx - slotCx
        if (Math.abs(err) < 0.4) break
        x += err
      }
      return x
    },
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
    resolvePlayerAvatar(p) {
      if (!p || typeof p !== 'object') return '/img/user/userImage.png'
      const raw = p.avatar ?? p.avatarfull ?? p.image ?? p.url ?? ''
      const s = String(raw).trim()
      if (!s) return '/img/user/userImage.png'
      if (/^https?:\/\//i.test(s)) return s
      if (s.startsWith('//')) return `https:${s}`
      if (s.startsWith('/')) return s
      const n = normalizeSteamEconomyImageUrl(s)
      return n || '/img/user/userImage.png'
    },
    _reelPlayerFromRoll(winner) {
      if (!winner || typeof winner !== 'object') return null
      return { ...winner, avatar: this.resolvePlayerAvatar(winner) }
    },
    /**
     * One entry per participant so the visible strip cycles all avatars (no long runs of duplicates).
     */
    uniqueParticipantsList() {
      const raw = Array.isArray(this.caseContent) ? this.caseContent : []
      const seen = new Set()
      const out = []
      const push = (p) => {
        if (!p || typeof p !== 'object') return
        const key =
          p.steamid != null && String(p.steamid).length > 0
            ? `s:${p.steamid}`
            : `a:${this.resolvePlayerAvatar(p)}`
        if (seen.has(key)) return
        seen.add(key)
        out.push({ ...p, avatar: this.resolvePlayerAvatar(p) })
      }
      for (const p of raw) push(p)
      for (const a of Array.isArray(this.rollAvatars) ? this.rollAvatars : []) {
        if (typeof a === 'string') {
          push({ avatar: a, name: '', chance: 0, steamid: null })
        } else if (a && typeof a === 'object') push(a)
      }
      if (!out.length) return [{ avatar: '/img/user/userImage.png', name: '—', chance: 0 }]
      return out
    },
    _shuffleStripInPlace(arr) {
      if (!Array.isArray(arr) || arr.length < 2) return
      const rnd = () => this._spinRandom()
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
    },
    unboxAddReels() {
      const unique = this.uniqueParticipantsList()
      const reels = { 1: [], 2: [], 3: [], 4: [] }
      for (const reel of Object.keys(reels)) {
        const half = []
        for (let i = 0; i < STRIP_LEN; i++) {
          const src = unique[i % unique.length]
          half.push(src ? { ...src } : { avatar: '/img/user/userImage.png', name: '—', chance: 0 })
        }
        reels[reel] = [...half.map((c) => ({ ...c })), ...half.map((c) => ({ ...c }))]
      }
      this.unboxReels = reels
    },
    getAvatar(p) {
      if (!p || typeof p !== 'object') return '/img/fallback.png'
      return this.resolvePlayerAvatar(p)
    },
    demoSpin(itemsWon, syncSeed, winningTicket, spinDurationMs) {
      if (this.demoSpinLeadTimeout != null) {
        clearTimeout(this.demoSpinLeadTimeout)
        this.demoSpinLeadTimeout = null
      }
      if (this.settleTimeoutId != null) {
        clearTimeout(this.settleTimeoutId)
        this.settleTimeoutId = null
      }
      if (this.winnerRevealTimeoutId != null) {
        clearTimeout(this.winnerRevealTimeoutId)
        this.winnerRevealTimeoutId = null
      }
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
        this.animationFrameId = null
      }
      this.clearStripDomTransform()
      this.stripTransformViaRaf = false
      this.spinPhase = 'idle'
      this.finsihed_spinning = false
      /** Next spin always animates from START_X + this slot; avoids baseIndexShift=0 after a prior winner. */
      this.unboxReelsPos = STRIP_START_CENTER_SLOT
      this.unboxReelStyle = {
        transform: `translate3d(${START_X}px,0,0)`,
        transition: 'none',
        willChange: 'auto'
      }
      this.spinRandFn =
        syncSeed != null && String(syncSeed).length > 0 ? this._makeSeededRandom(String(syncSeed)) : null
      this.spinDurationMs = Math.max(
        MIN_SPIN_MS,
        typeof spinDurationMs === 'number' && spinDurationMs > 0 ? spinDurationMs : 15000
      )
      const parsed = Number(String(winningTicket ?? '').replace(/[^\d.-]/g, ''))
      const outcome = Number.isFinite(parsed)
        ? parsed
        : toNum(itemsWon?.ticketRange?.min, 0)

      this.demoSpinLeadTimeout = setTimeout(() => {
        this.demoSpinLeadTimeout = null
        this.unboxGames = [
          {
            demo: true,
            outcome,
            rollWinner: itemsWon && typeof itemsWon === 'object' ? itemsWon : null,
            updatedAt: new Date()
          }
        ]
        this.unboxRunning = true
      }, 250)
    },
    unboxGetItemsFormated(items) {
      if (!Array.isArray(items)) return []
      return items.filter((x) => x && x.ticketRange)
    },
    unboxGetOutcomeItem(game) {
      for (const item of this.unboxGetItemsFormated(this.caseContent)) {
        const minT = item.ticketRange.min
        const maxT = item.ticketRange.max
        if (game.outcome >= minT && game.outcome <= maxT) {
          return { ...item, avatar: this.resolvePlayerAvatar(item) }
        }
      }
      return null
    },
    unboxSpin(itemsWon) {
      this.spinPhase = 'idle'
      this.finsihed_spinning = false
      const games = []
      for (let i = 0; i < this.unboxCount; i++) {
        games.push({
          demo: false,
          outcome: itemsWon[i].ticketRange.min,
          rollWinner: null,
          updatedAt: new Date()
        })
      }
      this.unboxGames = games
      this.unboxRunning = true
    }
  },
  watch: {
    unboxGames: {
      deep: true,
      handler() {
        if (!this.unboxGames.length) return

        for (const [index, game] of this.unboxGames.entries()) {
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
            this.animationFrameId = null
          }
          if (this.settleTimeoutId != null) {
            clearTimeout(this.settleTimeoutId)
            this.settleTimeoutId = null
          }
          if (this.winnerRevealTimeoutId != null) {
            clearTimeout(this.winnerRevealTimeoutId)
            this.winnerRevealTimeoutId = null
          }

          const rollWinner =
            game.rollWinner && typeof game.rollWinner === 'object' ? game.rollWinner : null
          const reelKey = index + 1
          this.unboxAddReels()
          const reelArr = this.unboxReels[reelKey]
          this._shuffleStripInPlace(reelArr)

          if (this.unboxReelsPosRepeater) {
            cancelAnimationFrame(this.unboxReelsPosRepeater)
            this.unboxReelsPosRepeater = null
          }

          this.unboxRunning = true
          this.spinPhase = 'spinning'
          const reelItems = reelArr.length
          /** Reset each run: after spin 1, unboxReelsPos was winnerIndex; demo reuses WINNER_SLOT_INDEX → shift 0 if unchanged. */
          this.unboxReelsPos = STRIP_START_CENTER_SLOT
          const currentCenterIndex = STRIP_START_CENTER_SLOT
          const minIndex = Math.floor(reelItems * 0.85)
          const maxIndex = Math.floor(reelItems * 0.95)

          const winnerIndex =
            game.demo && rollWinner
              ? WINNER_SLOT_INDEX
              : Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex

          const baseIndexShift = (winnerIndex - currentCenterIndex + reelItems) % reelItems

          const outcomeResolved = game.demo
            ? this._reelPlayerFromRoll(rollWinner)
            : this.unboxGetOutcomeItem(game)
          reelArr[winnerIndex] = outcomeResolved || reelArr[winnerIndex]

          this.displayCenterIndex = currentCenterIndex
          this.winner = reelArr[winnerIndex]
          this.displayPotSnapshot = Number(this.pot_value) || 0

          const TOTAL_SPIN_MS = this.spinDurationMs
          /** Full motion (including slow end) runs in RAF so avatars never stop until this elapses. */
          const RAF_TOTAL_MS = TOTAL_SPIN_MS + SETTLE_TRANSITION_MS
          const totalDistance = baseIndexShift * SLOT_STEP
          let finalX = START_X - winnerIndex * SLOT_STEP

          this.stripTransformViaRaf = true
          this.unboxReelStyle = {
            transform: `translate3d(${START_X}px,0,0)`,
            transition: 'none',
            willChange: 'transform'
          }

          this.$nextTick(() => {
            const stripEl = this.getReelStripEl()
            if (stripEl) {
              stripEl.style.willChange = 'transform'
              stripEl.style.transition = 'none'
              stripEl.style.transform = `translate3d(${START_X}px,0,0)`
            }

            const spinStart = performance.now()

            const animate = (currentTime) => {
              const elapsed = currentTime - spinStart
              const progress = Math.min(elapsed / RAF_TOTAL_MS, 1)
              const easedProgress = easeCasinoSpin(progress)
              const distanceTraveled = totalDistance * easedProgress
              const currentX = START_X - distanceTraveled
              const el = this.getReelStripEl()
              const wheelEl = el?.parentElement
              if (el) {
                el.style.transition = 'none'
                el.style.transform = `translate3d(${currentX}px,0,0)`
              }
              /** Which slot sits under the viewport centre (aligns highlight with the pointer). */
              let centerIndex = 0
              if (el && wheelEl) {
                const stripRect = el.getBoundingClientRect()
                const wheelRect = wheelEl.getBoundingClientRect()
                const stripLeftInWheel = stripRect.left - wheelRect.left
                const cx = wheelEl.clientWidth / 2
                const idx = Math.round((cx - stripLeftInWheel - SLOT_FACE_HALF) / SLOT_STEP)
                centerIndex = ((idx % reelItems) + reelItems) % reelItems
              } else {
                const steps = Math.floor(distanceTraveled / SLOT_STEP)
                centerIndex = (currentCenterIndex + steps) % reelArr.length
              }
              if (centerIndex !== this.unboxReelsPos) {
                this.unboxReelsPos = centerIndex
              }

              if (progress >= 1) {
                this.animationFrameId = null
                let settleX = START_X - winnerIndex * SLOT_STEP
                const stripDone = this.getReelStripEl()
                const wheelDone = stripDone?.parentElement
                if (stripDone && wheelDone) {
                  stripDone.style.transition = 'none'
                  settleX = this.alignStripIndexToWheelCenter(
                    stripDone,
                    wheelDone,
                    winnerIndex,
                    settleX
                  )
                  settleX = this.clampStripTranslateToFillWheel(stripDone, wheelDone, settleX)
                  settleX = this.alignStripIndexToWheelCenter(
                    stripDone,
                    wheelDone,
                    winnerIndex,
                    settleX
                  )
                }
                finalX = settleX
                if (stripDone) {
                  stripDone.style.willChange = 'auto'
                  stripDone.style.transition = 'none'
                  stripDone.style.transform = `translate3d(${finalX}px,0,0)`
                }

                // Lock highlight to winner immediately (no extra wait after motion ends).
                this.unboxReelsPos = winnerIndex
                this.winner = reelArr[winnerIndex]
                this.displayPotSnapshot = Number(this.pot_value) || 0
                this.spinPhase = 'finished'
                this.unboxRunning = false
                this.spinRandFn = null
                this.finsihed_spinning = false

                const handoff = () => {
                  if (this.settleTimeoutId != null) {
                    clearTimeout(this.settleTimeoutId)
                    this.settleTimeoutId = null
                  }
                  this.stripTransformViaRaf = false
                  this.clearStripDomTransform()
                  this.unboxReelStyle = {
                    transform: `translate3d(${finalX}px,0,0)`,
                    transition: 'none',
                    willChange: 'auto'
                  }
                  if (this.winnerRevealTimeoutId != null) {
                    clearTimeout(this.winnerRevealTimeoutId)
                    this.winnerRevealTimeoutId = null
                  }
                  this.winnerRevealTimeoutId = setTimeout(() => {
                    this.winnerRevealTimeoutId = null
                    this.finsihed_spinning = true
                    this.$emit('complete', game.demo)
                  }, FINISHED_REEL_HOLD_MS)
                }
                if (SETTLE_AFTER_DELAY_MS > 0) {
                  this.settleTimeoutId = setTimeout(() => {
                    this.settleTimeoutId = null
                    handoff()
                  }, SETTLE_AFTER_DELAY_MS)
                } else {
                  // After DOM transform, wait two frames so paint catches up before Vue :style handoff (avoids flicker).
                  this.$nextTick(() => {
                    requestAnimationFrame(() => {
                      requestAnimationFrame(handoff)
                    })
                  })
                }
              } else {
                this.animationFrameId = requestAnimationFrame(animate)
              }
            }

            this.animationFrameId = requestAnimationFrame(animate)
          })
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
    if (this.demoSpinLeadTimeout != null) clearTimeout(this.demoSpinLeadTimeout)
    if (this.settleTimeoutId != null) clearTimeout(this.settleTimeoutId)
    if (this.winnerRevealTimeoutId != null) clearTimeout(this.winnerRevealTimeoutId)
    cancelAnimationFrame(this.unboxReelsPosRepeater)
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId)
    this.clearStripDomTransform()
  }
}
</script>

<style scoped>
.unbox-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  border-radius: 4px;
  background: rgba(75, 5, 5, 1);
  box-shadow: 0px 4px 4px 0px #00000040;
  border: 0.5px solid rgba(255, 52, 53, 1);
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
  overflow: hidden;
}

.unbox-spinner .inner-wheel--gpu {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>
