<template>
  <div ref="unbox-spinner" class="unbox-spinner" v-bind:class="['spinner-' + '1']">
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
        class="flex flex-wrap items-center justify-center w-full h-full gap-x-2 text-center px-2"
      >
        <div
          class="w-[50px] h-[50px] sm:w-[72px] sm:h-[72px] rounded-[4px] bg-no-repeat bg-center bg-cover"
          :style="{
            backgroundImage: `url(${getAvatar(winner)})`,
          }"
        ></div>

        <span class="text-white font-Rubik font-bold text-base sm:text-xl">
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
      spinDurationMs: 15000,
      spinPhase: "idle",
    };
  },
  props: ["caseContent", "pot_value", "displayTicket"],
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
    resetWinnerReveal() {
      this.finsihed_spinning = false;
      this.spinWinner = null;
    },
    /**
     * @param {object} winnerPlayer — winner from backend (shown at end of spin)
     * @param _syncSeed — reserved
     * @param _winningTicket — reserved
     * @param {number} [spinDurationMs] — animation length
     */
    demoSpin(winnerPlayer, _syncSeed, _winningTicket, spinDurationMs) {
      this.spinPhase = "idle";
      this.finsihed_spinning = false;
      this.spinWinner = winnerPlayer || null;
      if (spinDurationMs != null && Number.isFinite(Number(spinDurationMs))) {
        this.spinDurationMs = Math.max(1000, Number(spinDurationMs));
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

    unboxSpin(winnerPlayer) {
      this.spinPhase = "idle";
      this.finsihed_spinning = false;
      this.spinWinner = winnerPlayer || null;
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
    shuffleArray(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },
    /** Each player's avatar count ≈ their chance % of `reelSlots` (no ticket ranges). */
    buildChanceWeightedReel(players, reelSlots) {
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
        return this.shuffleArray(out);
      }

      const raw = chances.map((c) => (c / sum) * reelSlots);
      const floors = raw.map((r) => Math.floor(r));
      let allocated = floors.reduce((a, b) => a + b, 0);
      let rem = reelSlots - allocated;
      const fracs = raw.map((r, i) => ({ i, f: r - Math.floor(r) }));
      fracs.sort((a, b) => b.f - a.f);
      const counts = [...floors];
      for (let k = 0; k < rem; k++) counts[fracs[k].i]++;

      const out = [];
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < counts[i]; j++) out.push(list[i]);
      }
      while (out.length > reelSlots) out.pop();
      while (out.length < reelSlots) out.push(list[0]);
      return this.shuffleArray(out);
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
  },
  computed: {
    unboxGetItems() {
      return this.buildChanceWeightedReel(this.caseContent, 150);
    },
  },
  watch: {
    unboxGames: {
      deep: true,
      handler(data, dataOld) {
        if (this.unboxGames.length >= 1) {
          this.finsihed_spinning = false;
          if (dataOld.length !== 0) {
            this.unboxAddReels();
          }
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

            this.unboxRunning = true;

            this.spinPhase = "spinning";

            const reelItems = this.unboxReels[index + 1].length;
            const currentCenterIndex = this.unboxReelsPos;
            const minIndex = Math.floor(reelItems * 0.85);
            const maxIndex = Math.floor(reelItems * 0.95);
            var winnerIndex =
              Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
            const baseIndexShift =
              (winnerIndex - currentCenterIndex + reelItems) % reelItems;

            const resolved = this.spinWinner;
            if (resolved) {
              this.unboxReels[index + 1][winnerIndex] = resolved;
            }
            // seed the displayed index for smoothing
            this.displayCenterIndex = currentCenterIndex;
            this.winner = resolved || this.unboxReels[index + 1][winnerIndex];

            const TOTAL_SPIN_MS = 20000;
            const ITEM_WIDTH = 70;
            const START_X = 2525;
            const LOOPS = 0;
            const REEL_LENGTH = reelItems * ITEM_WIDTH;
            const totalDistance = LOOPS * REEL_LENGTH + baseIndexShift * ITEM_WIDTH;
            const targetIndex = LOOPS * reelItems + baseIndexShift;
            var finalX = START_X - targetIndex * ITEM_WIDTH;
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
                (currentCenterIndex + steps) % this.unboxReels[index + 1].length;
              this.unboxReelsPos = centerIndex;

              // smooth the displayed index using a simple lerp so the winner
              // value flows nicely instead of jumping each frame
              const smoothing = 0.1; // lower = more smoothing
              this.displayCenterIndex +=
                (centerIndex - this.displayCenterIndex) * smoothing;
              const displayIdx = Math.round(this.displayCenterIndex);
              this.winner = this.unboxReels[index + 1][displayIdx];

              if (progress >= 1) {
                // Spin math is done — Reel must see "finished" now (not after setTimeout), or
                // spinPhase stays "spinning" through the settle delay and Reel.vue styles break.
                this.spinPhase = "finished";

                // final settle: move exactly to finalX with a smooth ease
                finalX = finalX - 40;
                this.unboxReelStyle = {
                  transform: `translateX(${finalX}px) translateY(0px)`,
                  transition: "transform 0.3s ease-out",
                };

                // Reveal winner text / emit after the slow settle for suspense
                setTimeout(() => {
                  cancelAnimationFrame(this.unboxReelsPosRepeater);
                  this.winner = this.unboxReels[index + 1][winnerIndex];
                  this.finsihed_spinning = true;
                  this.unboxRunning = false;
                  this.$emit("complete", game.demo);
                }, 1000);
              } else {
                // during spin, keep easing normally
                // currentX = currentX - 20;
                this.unboxReelStyle = {
                  transform: `translateX(${currentX}px) translateY(0px)`,
                  transition: "transform 0.3s ease-out",
                };
                this.animationFrameId = requestAnimationFrame(animate);
              }
            };

            this.animationFrameId = requestAnimationFrame(animate);
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
