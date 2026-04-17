<template>
  <div ref="unbox-spinner" class="unbox-spinner" :class="'spinner-' + effectiveAnimationType">
    <div class="spinner-inner relative" v-for="i in 1" v-bind:key="i">
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
          :spinPhase="spinPhase"
        />
      </div>
      <div
        v-else
        class="flex h-full w-full flex-col items-center justify-center gap-y-2 px-2 text-center"
      >
        <div
          class="h-[50px] w-[50px] shrink-0 rounded-[4px] bg-cover bg-center bg-no-repeat sm:h-[72px] sm:w-[72px]"
          :style="{
            backgroundImage: `url(${getAvatar(winner)})`,
          }"
        ></div>

        <span class="max-w-full text-white font-Rubik font-bold text-base sm:text-xl">
          <span
            class="text-[rgba(255,191,20,1)] font-Rubik text-base sm:text-xl font-bold"
            >{{ winner.name }}
          </span>
          | WON
          <span class="text-[rgba(4,171,83,1)] font-Rubik font-bold text-base sm:text-xl"
            >${{
              Number(pot_value).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}</span
          >
          WITH
          <span class="text-[rgba(255,52,53,1)] font-Rubik font-bold text-base sm:text-xl"
            >{{
              Number(winner.chance).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
              })
            }}%</span
          >
          CHANCE | TICKET: {{ formatTicketForDisplay(displayTicket) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import UnboxReel from "./Reel.vue";

/** Winner row stays visible this long after the reel stops, before `complete` (lobby runs next steps). */
const WINNER_REVEAL_HOLD_MS = 2000;

/** Deterministic string → uint32 (same input → same hash on all runtimes). */
function fnv1a32(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Seeded PRNG (mulberry32); same seed ⇒ same sequence on all browsers. */
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default {
  name: "UnboxSpinner",
  components: {
    UnboxReel,
  },
  data() {
    return {
      finsihed_spinning: false,
      animationFrameId: null,
      unboxReelsSpinTimeout: null,
      unboxReelsPosRepeater: null,
      unboxReelsPos: 20,
      // index used for smooth winner transitions
      displayCenterIndex: 20,
      unboxReels: {
        1: [],
        2: [],
        3: [],
        4: [],
      },
      unboxReelStyle: {
        transform: "translateX(2535px) translateY(0px)",
        transition: "none",
      },

      unboxFilterSearch: "",
      unboxFilterSort: "highest",
      unboxFilterSelect: "featured",
      unboxRunning: false,
      unboxBoxes: [],
      unboxGames: [],
      unboxBoxData: {
        box: null,
        loading: false,
      },
      generalTimeDiff: 0,
      unboxCount: 1,
      winner: null,
      /** Set by demoSpin / unboxSpin — backend winner; reel only displays this at the end. */
      spinWinner: null,
      /** Provably-fair string from lobby (ticket|hash|roundId) — same seed ⇒ same reel order + stop slot. */
      syncSeed: null,
      spinDurationMs: 30000,
      spinPhase: "idle",
      winnerRevealHoldTimer: null,
    };
  },
  props: {
    caseContent: { type: Array, default: () => [] },
    pot_value: { type: [Number, String], default: 0 },
    displayTicket: { type: [String, Number], default: "" },
    /** 1–4: same motion as Hell GG `Version-1` … `Version-4` (from roll `animation_type`). */
    animationType: { type: Number, default: 1 },
  },
  methods: {
    formatTicketForDisplay(raw) {
      if (raw == null || String(raw).trim() === "") return "—";
      const n = Number(String(raw).replace(/[^\d.-]/g, ""));
      if (Number.isFinite(n)) {
        return n.toLocaleString(undefined, {
          maximumFractionDigits: 14,
          minimumFractionDigits: 0,
        });
      }
      return String(raw);
    },
    /**
     * Reel stopped: keep reel + bordered winner thumbnail for WINNER_REVEAL_HOLD_MS, then
     * switch to winner detail row and emit `complete`.
     */
    scheduleEmitCompleteAfterWinnerHold(demo) {
      if (this.winnerRevealHoldTimer) {
        clearTimeout(this.winnerRevealHoldTimer);
        this.winnerRevealHoldTimer = null;
      }
      this.finsihed_spinning = false;
      this.winnerRevealHoldTimer = setTimeout(() => {
        this.winnerRevealHoldTimer = null;
        this.finsihed_spinning = true;
        this.$nextTick(() => {
          this.$emit("complete", demo);
        });
      }, WINNER_REVEAL_HOLD_MS);
    },
    resetWinnerReveal() {
      if (this.winnerRevealHoldTimer) {
        clearTimeout(this.winnerRevealHoldTimer);
        this.winnerRevealHoldTimer = null;
      }
      this.finsihed_spinning = false;
      this.spinWinner = null;
      this.syncSeed = null;
    },
    /**
     * Skip reel animation (e.g. `jackpot:roll` replay after refresh when the spin already finished).
     * Shows the winner summary row without emitting `complete`.
     */
    showStaticRollComplete(winnerPlayer) {
      if (this.winnerRevealHoldTimer) {
        clearTimeout(this.winnerRevealHoldTimer);
        this.winnerRevealHoldTimer = null;
      }
      if (this.unboxReelsSpinTimeout) {
        clearTimeout(this.unboxReelsSpinTimeout);
        this.unboxReelsSpinTimeout = null;
      }
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (this.unboxReelsPosRepeater) {
        cancelAnimationFrame(this.unboxReelsPosRepeater);
        this.unboxReelsPosRepeater = null;
      }
      this.unboxRunning = false;
      this.spinPhase = "idle";
      this.unboxGames = [];
      this.spinWinner = winnerPlayer || null;
      this.finalizeSpinWinnerDisplay(null);
      this.finsihed_spinning = true;
    },
    /**
     * @param {object} winnerPlayer — winner from backend (shown at end of spin)
     * @param {string} [syncSeed] — fairness bundle; same value ⇒ identical reel + RNG on all clients
     * @param _winningTicket — reserved
     * @param {number} [spinDurationMs] — animation length
     */
    demoSpin(winnerPlayer, syncSeed, _winningTicket, spinDurationMs) {
      this.spinPhase = "idle";
      this.finsihed_spinning = false;
      this.spinWinner = winnerPlayer || null;
      this.syncSeed =
        syncSeed != null && String(syncSeed).length > 0 ? String(syncSeed) : null;
      if (spinDurationMs != null && Number.isFinite(Number(spinDurationMs))) {
        this.spinDurationMs = 30000;
        // this.spinDurationMs = Math.max(1000, Number(spinDurationMs));
      }
      let games = [];
      setTimeout(() => {
        for (let i = 0; i < this.unboxCount; i++) {
          games.push({
            demo: true,
            updatedAt: new Date(),
          });
        }
        this.unboxGames = games;
        this.unboxRunning = true;
      }, 250);
    },
    getAvatar(item) {
      if (!item || !item.avatar) {
        return "/img/fallback.png";
      }

      try {
        new URL(item.avatar, window.location.origin);
      } catch (e) {
        return "/img/fallback.png";
      }

      return item.avatar;
    },

    unboxSpin(winnerPlayer, syncSeed) {
      this.spinPhase = "idle";
      this.finsihed_spinning = false;
      this.spinWinner = winnerPlayer || null;
      this.syncSeed =
        syncSeed != null && String(syncSeed).length > 0 ? String(syncSeed) : null;
      let games = [];

      for (let i = 0; i < this.unboxCount; i++) {
        games.push({
          demo: false,
          updatedAt: new Date(),
        });
      }

      this.unboxGames = games;
      this.unboxRunning = true;
    },
    /** `chance` from API is 0–100 (percent). */
    chancePercent(player) {
      let c = Number(player?.chance);
      if (!Number.isFinite(c)) c = 0;
      return Math.max(0, Math.min(100, c));
    },
    /** Fisher–Yates; `random01` must return [0, 1). Pass from makeRng for sync. */
    shuffleArray(arr, random01 = Math.random) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(random01() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    /** When `syncSeed` is set, all clients get the same PRNG stream for `salt`. */
    makeRng(syncSeed, salt) {
      if (syncSeed == null || String(syncSeed).length === 0) {
        return Math.random;
      }
      const seed = fnv1a32(String(syncSeed) + "\0" + salt);
      return mulberry32(seed);
    },
    /** Each player's avatar count ≈ their chance % of `reelSlots` (no ticket ranges). */
    buildChanceWeightedReel(players, reelSlots, random01 = Math.random) {
      const list = Array.isArray(players) ? players.filter(Boolean) : [];
      const placeholder = {
        name: "—",
        avatar: "/img/fallback.png",
        chance: 0,
      };
      if (!list.length) {
        return Array.from({ length: reelSlots }, () => ({ ...placeholder }));
      }

      const chances = list.map((p) => this.chancePercent(p));
      const sum = chances.reduce((a, b) => a + b, 0);

      if (sum <= 0) {
        const per = Math.floor(reelSlots / list.length);
        let rem = reelSlots - per * list.length;
        const out = [];
        for (let i = 0; i < list.length; i++) {
          const n = per + (rem-- > 0 ? 1 : 0);
          for (let j = 0; j < n; j++) out.push(list[i]);
        }
        return this.shuffleArray(out, random01);
      }

      const raw = chances.map((c) => (c / sum) * reelSlots);
      const floors = raw.map((r) => Math.floor(r));
      let allocated = floors.reduce((a, b) => a + b, 0);
      let rem = reelSlots - allocated;
      const fracs = raw.map((r, i) => ({ i, f: r - Math.floor(r) }));
      // Tie-break by index so sort order is identical in every JS engine
      fracs.sort((a, b) => b.f - a.f || a.i - b.i);
      const counts = [...floors];
      for (let k = 0; k < rem; k++) counts[fracs[k].i]++;

      const out = [];
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < counts[i]; j++) out.push(list[i]);
      }
      while (out.length > reelSlots) out.pop();
      while (out.length < reelSlots) out.push(list[0]);
      return this.shuffleArray(out, random01);
    },
    unboxGetReelsPos() {
      const spinner = this.$refs["unbox-spinner"].getBoundingClientRect();
      const reel = this.$refs["reel-1"][0].$el.getBoundingClientRect();

      const spinnerCenter = spinner.left + spinner.width / 2;

      const pos = Math.round((spinnerCenter - reel.left - 35) / 70);

      const maxPos = this.unboxReels[1] ? this.unboxReels[1].length : 150;

      if (this.unboxReelsPos !== pos && pos >= 0 && pos < maxPos) {
        this.unboxReelsPos = pos;
      }

      this.unboxReelsPosRepeater = requestAnimationFrame(this.unboxGetReelsPos);
    },

    unboxAddReels() {
      const items = this.unboxGetItems;
      this.unboxReels = { 1: [], 2: [], 3: [], 4: [] };
      for (const reel of Object.keys(this.unboxReels)) {
        this.unboxReels[reel] = [...items];
      }
    },

    /**
     * Backend already sends the winner; merge them into the reel index under the marker so the
     * strip matches the final avatar (geometry alone can point at the wrong cell).
     */
    applySpinWinnerAtReelIndex(reelIdx, index) {
      const resolved = this.spinWinner;
      const row = this.unboxReels[reelIdx];
      if (!resolved || !Array.isArray(row) || !row.length) return;
      const n = row.length;
      const i = ((index % n) + n) % n;
      const prev = row[i] || {};
      row.splice(i, 1, { ...prev, ...resolved });
    },
    /** Final winner row: always prefer backend `spinWinner` when present. */
    finalizeSpinWinnerDisplay(fallbackPlayer) {
      this.winner = this.spinWinner || fallbackPlayer || null;
    },

    /**
     * translateX for the reel (flex-centered in the viewport) so slot `slotIndex` aligns with
     * the spinner center. Without this, `START_X - slotIndex * stride` moves the strip entirely
     * off-screen for large indices and avatars vanish mid-spin.
     */
    reelTranslateXForCenteredSlot(reelItems, slotIndex, itemWidth) {
      const reelLen = reelItems * itemWidth;
      return reelLen / 2 - itemWidth / 2 - slotIndex * itemWidth;
    },
    /** Inverse of reelTranslateXForCenteredSlot (approximate slot index from translateX). */
    approxSlotIndexFromTranslateX(reelItems, translateX, itemWidth) {
      const reelLen = reelItems * itemWidth;
      let idx = Math.round((reelLen / 2 - itemWidth / 2 - translateX) / itemWidth);
      const n = reelItems;
      return ((idx % n) + n) % n;
    },

    /** Hell GG Version-1 (`Hell GG/Version-1/.../Jackpot_Spinner.vue`). */
    _runSpinHellV1(index, game) {
      const reelIdx = index + 1;
      this.unboxRunning = true;
      this.spinPhase = "spinning";

      const reelItems = this.unboxReels[reelIdx].length;
      const rngSlot = this.makeRng(this.syncSeed, "winner-slot-v1");
      const minIndex = Math.floor(reelItems * 0.85);
      const maxIndex = Math.floor(reelItems * 0.95);
      let winnerIndex = Math.floor(rngSlot() * (maxIndex - minIndex + 1)) + minIndex;
      const resolved = this.spinWinner;
      if (resolved) {
        this.unboxReels[reelIdx][winnerIndex] = resolved;
      }
      this.winner = resolved || this.unboxReels[reelIdx][winnerIndex];

      const TOTAL_SPIN_MS = this.spinDurationMs;
      const ITEM_WIDTH = 70;
      const START_X = 2535;
      const REEL_LENGTH = reelItems * ITEM_WIDTH;
      const WINNER_INDEX = winnerIndex;
      const finalX = this.reelTranslateXForCenteredSlot(reelItems, winnerIndex, ITEM_WIDTH);
      const totalDistance = START_X - finalX;
      this.unboxReelStyle = {
        transform: `translateX(${finalX}px) translateY(0px)`,
        transition: "transform 0.3s ease-out",
      };

      const spinStart = performance.now();
      const singlePhaseEase = (t) => {
        t = Math.min(Math.max(t, 0), 1);
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };

      let lastX = START_X;

      const animate = (currentTime) => {
        const elapsed = currentTime - spinStart;
        const progress = Math.min(elapsed / TOTAL_SPIN_MS, 1);
        const easedProgress = singlePhaseEase(progress);
        const distanceTraveled = totalDistance * easedProgress;
        let currentX = START_X - distanceTraveled;

        while (currentX < -REEL_LENGTH + START_X) {
          currentX += REEL_LENGTH;
        }

        if (progress >= 0.95) {
          this.unboxReelStyle = {
            transform: `translateX(${currentX}px) translateY(0px)`,
            transition: "transform 0.2s ease-out",
          };
        } else {
          this.unboxReelStyle = {
            transform: `translateX(${currentX}px) translateY(0px)`,
            transition: "none",
          };
        }
        lastX = currentX;
        if (progress < 1) {
          this.animationFrameId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(this.unboxReelsPosRepeater);

          try {
            const spinnerRect = this.$refs["unbox-spinner"].getBoundingClientRect();
            const reelRect = this.$refs["reel-" + reelIdx][0].$el.getBoundingClientRect();
            const spinnerCenter = spinnerRect.left + spinnerRect.width / 2;
            let centeredIndex = Math.round(
              (spinnerCenter - reelRect.left - 35) / ITEM_WIDTH
            );

            const reelItemsCount = this.unboxReels[reelIdx].length;

            if (
              isNaN(centeredIndex) ||
              centeredIndex < 0 ||
              centeredIndex >= reelItemsCount
            ) {
              centeredIndex = this.approxSlotIndexFromTranslateX(
                reelItemsCount,
                lastX,
                ITEM_WIDTH
              );
            }

            centeredIndex = centeredIndex % reelItemsCount;

            const correctionFinalX = finalX;
            this.unboxReelStyle = {
              transform: `translateX(${correctionFinalX}px) translateY(0px)`,
              transition: "transform 0.15s ease-out",
            };

            this.unboxReelsSpinTimeout = setTimeout(() => {
              this.unboxReelsPos = centeredIndex;
              this.applySpinWinnerAtReelIndex(reelIdx, centeredIndex);
              this.finalizeSpinWinnerDisplay(this.unboxReels[reelIdx][centeredIndex]);
              this.spinPhase = "finished";
              this.unboxRunning = false;
              this.scheduleEmitCompleteAfterWinnerHold(game.demo);
            }, 160);
          } catch (e) {
            const centeredIndex = WINNER_INDEX % this.unboxReels[reelIdx].length;
            this.unboxReelsPos = centeredIndex;

            this.unboxReelsSpinTimeout = setTimeout(() => {
              this.applySpinWinnerAtReelIndex(reelIdx, centeredIndex);
              this.finalizeSpinWinnerDisplay(this.unboxReels[reelIdx][centeredIndex]);
              this.spinPhase = "finished";
              this.unboxRunning = false;
              this.scheduleEmitCompleteAfterWinnerHold(game.demo);
            }, 300);
          }
        }
      };

      this.animationFrameId = requestAnimationFrame(animate);
    },

    /** Hell GG Version-2 — same as V1 but correction −66, delayed complete. */
    _runSpinHellV2(index, game) {
      const reelIdx = index + 1;
      this.unboxRunning = true;
      this.spinPhase = "spinning";

      const reelItems = this.unboxReels[reelIdx].length;
      const rngSlot = this.makeRng(this.syncSeed, "winner-slot-v2");
      const minIndex = Math.floor(reelItems * 0.85);
      const maxIndex = Math.floor(reelItems * 0.95);
      let winnerIndex = Math.floor(rngSlot() * (maxIndex - minIndex + 1)) + minIndex;
      const resolved = this.spinWinner;
      if (resolved) {
        this.unboxReels[reelIdx][winnerIndex] = resolved;
      }
      this.winner = resolved || this.unboxReels[reelIdx][winnerIndex];

      const TOTAL_SPIN_MS = this.spinDurationMs;
      const ITEM_WIDTH = 70;
      const START_X = 2535;
      const REEL_LENGTH = reelItems * ITEM_WIDTH;
      const WINNER_INDEX = winnerIndex;
      const finalX = this.reelTranslateXForCenteredSlot(reelItems, winnerIndex, ITEM_WIDTH);
      const totalDistance = START_X - finalX;
      this.unboxReelStyle = {
        transform: `translateX(${finalX}px) translateY(0px)`,
        transition: "transform 0.3s ease-out",
      };

      const spinStart = performance.now();
      const singlePhaseEase = (t) => {
        t = Math.min(Math.max(t, 0), 1);
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };

      let lastX = START_X;

      const animate = (currentTime) => {
        const elapsed = currentTime - spinStart;
        const progress = Math.min(elapsed / TOTAL_SPIN_MS, 1);
        const easedProgress = singlePhaseEase(progress);
        const distanceTraveled = totalDistance * easedProgress;
        let currentX = START_X - distanceTraveled;

        while (currentX < -REEL_LENGTH + START_X) {
          currentX += REEL_LENGTH;
        }

        if (progress >= 0.95) {
          this.unboxReelStyle = {
            transform: `translateX(${currentX}px) translateY(0px)`,
            transition: "transform 0.2s ease-out",
          };
        } else {
          this.unboxReelStyle = {
            transform: `translateX(${currentX}px) translateY(0px)`,
            transition: "none",
          };
        }
        lastX = currentX;
        if (progress < 1) {
          this.animationFrameId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(this.unboxReelsPosRepeater);

          try {
            const spinnerRect = this.$refs["unbox-spinner"].getBoundingClientRect();
            const reelRect = this.$refs["reel-" + reelIdx][0].$el.getBoundingClientRect();
            const spinnerCenter = spinnerRect.left + spinnerRect.width / 2;
            let centeredIndex = Math.round(
              (spinnerCenter - reelRect.left - 35) / ITEM_WIDTH
            );

            const reelItemsCount = this.unboxReels[reelIdx].length;

            if (
              isNaN(centeredIndex) ||
              centeredIndex < 0 ||
              centeredIndex >= reelItemsCount
            ) {
              centeredIndex = this.approxSlotIndexFromTranslateX(
                reelItemsCount,
                lastX,
                ITEM_WIDTH
              );
            }

            centeredIndex = centeredIndex % reelItemsCount;

            const correctionFinalX = finalX;
            this.unboxReelStyle = {
              transform: `translateX(${correctionFinalX}px) translateY(0px)`,
              transition: "transform 0.15s ease-out",
            };

            this.unboxReelsSpinTimeout = setTimeout(() => {
              this.unboxReelsPos = centeredIndex;
              this.applySpinWinnerAtReelIndex(reelIdx, centeredIndex);
              this.finalizeSpinWinnerDisplay(this.unboxReels[reelIdx][centeredIndex]);
              this.spinPhase = "finished";

              this.unboxReelsSpinTimeout = setTimeout(() => {
                this.unboxRunning = false;
                this.scheduleEmitCompleteAfterWinnerHold(game.demo);
              }, 500);
            }, 160);
          } catch (e) {
            const centeredIndex = WINNER_INDEX % this.unboxReels[reelIdx].length;
            this.unboxReelsPos = centeredIndex;

            this.unboxReelsSpinTimeout = setTimeout(() => {
              this.applySpinWinnerAtReelIndex(reelIdx, centeredIndex);
              this.finalizeSpinWinnerDisplay(this.unboxReels[reelIdx][centeredIndex]);
              this.spinPhase = "finished";
              this.unboxReelsSpinTimeout = setTimeout(() => {
                this.unboxRunning = false;
                this.scheduleEmitCompleteAfterWinnerHold(game.demo);
              }, 500);
            }, 300);
          }
        }
      };

      this.animationFrameId = requestAnimationFrame(animate);
    },

    /** Hell GG Version-3 — START_X 2515, −30 settle, 500ms reveal. */
    _runSpinHellV3(index, game) {
      const reelIdx = index + 1;
      this.unboxRunning = true;
      this.spinPhase = "spinning";

      const reelItems = this.unboxReels[reelIdx].length;
      const currentCenterIndex = this.unboxReelsPos;
      const minIndex = Math.floor(reelItems * 0.85);
      const maxIndex = Math.floor(reelItems * 0.95);
      const rngSlot = this.makeRng(this.syncSeed, "winner-slot-v3");
      let winnerIndex =
        Math.floor(rngSlot() * (maxIndex - minIndex + 1)) + minIndex;
      const baseIndexShift =
        (winnerIndex - currentCenterIndex + reelItems) % reelItems;

      const resolved = this.spinWinner;
      if (resolved) {
        this.unboxReels[reelIdx][winnerIndex] = resolved;
      }
      this.winner = resolved || this.unboxReels[reelIdx][winnerIndex];

      const TOTAL_SPIN_MS = this.spinDurationMs;
      const ITEM_WIDTH = 70;
      const START_X = 2515;
      const LOOPS = 0;
      const REEL_LENGTH = reelItems * ITEM_WIDTH;
      const totalDistance = LOOPS * REEL_LENGTH + baseIndexShift * ITEM_WIDTH;
      const targetIndex = LOOPS * reelItems + baseIndexShift;
      let finalX = START_X - targetIndex * ITEM_WIDTH;
      this.unboxReelStyle = {
        transform: `translateX(${finalX}px) translateY(0px)`,
        transition: "transform 0.3s ease-out",
      };

      const spinStart = performance.now();
      const singlePhaseEase = (t) => {
        t = Math.min(Math.max(t, 0), 1);
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };

      const animate = (currentTime) => {
        const elapsed = currentTime - spinStart;
        const progress = Math.min(elapsed / TOTAL_SPIN_MS, 1);
        const easedProgress = singlePhaseEase(progress);
        const distanceTraveled = totalDistance * easedProgress;
        let currentX = START_X - distanceTraveled;

        while (currentX < -REEL_LENGTH + START_X) {
          currentX += REEL_LENGTH;
        }
        const steps = Math.floor(distanceTraveled / ITEM_WIDTH);
        const centerIndex =
          (currentCenterIndex + steps) % this.unboxReels[reelIdx].length;
        this.unboxReelsPos = centerIndex;
        this.finalizeSpinWinnerDisplay(this.unboxReels[reelIdx][centerIndex]);

        if (progress >= 1) {
          finalX = finalX - 30;
          this.unboxReelStyle = {
            transform: `translateX(${finalX}px) translateY(0px)`,
            transition: "transform 1s cubic-bezier(0.25,0.1,0.25,1)",
          };

          this.unboxReelsSpinTimeout = setTimeout(() => {
            cancelAnimationFrame(this.unboxReelsPosRepeater);
            const stopIdx = this.unboxReelsPos;
            this.applySpinWinnerAtReelIndex(reelIdx, stopIdx);
            this.finalizeSpinWinnerDisplay(this.unboxReels[reelIdx][stopIdx]);
            this.spinPhase = "finished";
            this.unboxRunning = false;
            this.scheduleEmitCompleteAfterWinnerHold(game.demo);
          }, 500);
        } else {
          this.unboxReelStyle = {
            transform: `translateX(${currentX}px) translateY(0px)`,
            transition: "transform 0.3s ease-out",
          };
          this.animationFrameId = requestAnimationFrame(animate);
        }
      };

      this.animationFrameId = requestAnimationFrame(animate);
    },

    /** Hell GG Version-4 — 35s spin, smoothing, −40 settle, 1s reveal. */
    _runSpinHellV4(index, game) {
      const reelIdx = index + 1;
      this.unboxRunning = true;
      this.spinPhase = "spinning";

      const reelItems = this.unboxReels[reelIdx].length;
      const currentCenterIndex = this.unboxReelsPos;
      const minIndex = Math.floor(reelItems * 0.85);
      const maxIndex = Math.floor(reelItems * 0.95);
      const rngSlot = this.makeRng(this.syncSeed, "winner-slot-v4");
      let winnerIndex =
        Math.floor(rngSlot() * (maxIndex - minIndex + 1)) + minIndex;
      const baseIndexShift =
        (winnerIndex - currentCenterIndex + reelItems) % reelItems;

      const resolved = this.spinWinner;
      if (resolved) {
        this.unboxReels[reelIdx][winnerIndex] = resolved;
      }
      this.displayCenterIndex = currentCenterIndex;
      this.winner = resolved || this.unboxReels[reelIdx][winnerIndex];

      const TOTAL_SPIN_MS = this.spinDurationMs;
      const ITEM_WIDTH = 70;
      const START_X = 2525;
      const LOOPS = 0;
      const REEL_LENGTH = reelItems * ITEM_WIDTH;
      const totalDistance = LOOPS * REEL_LENGTH + baseIndexShift * ITEM_WIDTH;
      const targetIndex = LOOPS * reelItems + baseIndexShift;
      let finalX = START_X - targetIndex * ITEM_WIDTH;
      this.unboxReelStyle = {
        transform: `translateX(${finalX}px) translateY(0px)`,
        transition: "transform 0.3s ease-out",
      };

      const spinStart = performance.now();
      const singlePhaseEase = (t) => {
        t = Math.min(Math.max(t, 0), 1);
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      };

      const animate = (currentTime) => {
        const elapsed = currentTime - spinStart;
        const progress = Math.min(elapsed / TOTAL_SPIN_MS, 1);
        const easedProgress = singlePhaseEase(progress);
        const distanceTraveled = totalDistance * easedProgress;
        let currentX = START_X - distanceTraveled;

        while (currentX < -REEL_LENGTH + START_X) {
          currentX += REEL_LENGTH;
        }
        const steps = Math.floor(distanceTraveled / ITEM_WIDTH);
        const centerIndex =
          (currentCenterIndex + steps) % this.unboxReels[reelIdx].length;
        this.unboxReelsPos = centerIndex;

        const smoothing = 0.1;
        this.displayCenterIndex +=
          (centerIndex - this.displayCenterIndex) * smoothing;
        const displayIdx = Math.round(this.displayCenterIndex);
        this.finalizeSpinWinnerDisplay(this.unboxReels[reelIdx][displayIdx]);

        if (progress >= 1) {
          finalX = finalX - 40;
          this.unboxReelStyle = {
            transform: `translateX(${finalX}px) translateY(0px)`,
            transition: "transform 1s cubic-bezier(0.25,0.1,0.25,1)",
          };

          this.unboxReelsSpinTimeout = setTimeout(() => {
            cancelAnimationFrame(this.unboxReelsPosRepeater);
            const stopIdx = this.unboxReelsPos;
            this.applySpinWinnerAtReelIndex(reelIdx, stopIdx);
            this.finalizeSpinWinnerDisplay(this.unboxReels[reelIdx][stopIdx]);
            this.spinPhase = "finished";
            this.unboxRunning = false;
            this.scheduleEmitCompleteAfterWinnerHold(game.demo);
          }, 1000);
        } else {
          this.unboxReelStyle = {
            transform: `translateX(${currentX}px) translateY(0px)`,
            transition: "transform 0.3s ease-out",
          };
          this.animationFrameId = requestAnimationFrame(animate);
        }
      };

      this.animationFrameId = requestAnimationFrame(animate);
    },
  },
  computed: {
    effectiveAnimationType() {
      const n = Number(this.animationType);
      if (!Number.isFinite(n) || n < 1) return 1;
      return Math.min(4, Math.floor(n));
    },
    unboxGetItems() {
      const rng = this.makeRng(this.syncSeed, "chance-reel");
      return this.buildChanceWeightedReel(this.caseContent, 150, rng);
    },
  },
  watch: {
    unboxGames: {
      handler(data, dataOld) {
        if (this.unboxGames.length >= 1) {
          this.finsihed_spinning = false;
          // Always rebuild so first spin uses syncSeed (created() ran before seed existed).
          this.unboxAddReels();
          this.unboxGetReelsPos();

          for (const [index, game] of this.unboxGames.entries()) {
            if (this.animationFrameId) {
              cancelAnimationFrame(this.animationFrameId);
              this.animationFrameId = null;
            }
            if (this.unboxReelsSpinTimeout) {
              clearTimeout(this.unboxReelsSpinTimeout);
              this.unboxReelsSpinTimeout = null;
            }
            if (this.winnerRevealHoldTimer) {
              clearTimeout(this.winnerRevealHoldTimer);
              this.winnerRevealHoldTimer = null;
            }

            const t = this.effectiveAnimationType;
            if (t === 1) this._runSpinHellV1(index, game);
            else if (t === 2) this._runSpinHellV2(index, game);
            else if (t === 3) this._runSpinHellV3(index, game);
            else this._runSpinHellV4(index, game);
          }
        }
      },
    },
  },

  created() {
    this.unboxAddReels();
  },
  beforeUnmount() {
    this.unboxRunning = false;
    clearTimeout(this.unboxReelsSpinTimeout);
    if (this.winnerRevealHoldTimer) {
      clearTimeout(this.winnerRevealHoldTimer);
      this.winnerRevealHoldTimer = null;
    }
    cancelAnimationFrame(this.unboxReelsPosRepeater);
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
};
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
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.15));
}

.unbox-spinner::after {
  content: "";
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
