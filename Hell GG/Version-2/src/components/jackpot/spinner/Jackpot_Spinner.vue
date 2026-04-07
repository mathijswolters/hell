<template>
  <div ref="unbox-spinner" class="unbox-spinner" v-bind:class="['spinner-' + '1']">
    <div class="spinner-inner relative" v-for="i in 1" v-bind:key="i">
      <!-- <ChevronDownIcon
        v-if="!finsihed_spinning"
        class="absolute w-[26px] fill-[rgba(255,52,53,1)] stroke-[rgba(255,52,53,1)] z-50 -bottom-2.5 rotate-180"
      />
      <ChevronDownIcon
        v-if="!finsihed_spinning"
        class="absolute w-[26px] fill-[rgba(255,52,53,1)] stroke-[rgba(255,52,53,1)] z-50 -top-2.5"
      /> -->
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
            backgroundImage: `url(${getAvatar(item)})`,
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
          CHANCE | TICKET:89.688
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
      spinPhase: "idle",
    };
  },
  props: ["caseContent", "pot_value"],
  methods: {
    demoSpin(itemsWon) {
      this.spinPhase = "idle";
      this.finsihed_spinning = false;
      let games = [];
      setTimeout(() => {
        for (let i = 0; i < this.unboxCount; i++) {
          games.push({
            demo: true,
            outcome: itemsWon.ticketRange.min,
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

    unboxSpin(itemsWon) {
      this.spinPhase = "idle";
      let games = [];

      for (let i = 0; i < this.unboxCount; i++) {
        games.push({
          demo: false,
          outcome: itemsWon[i].ticketRange.min,
          updatedAt: new Date(),
        });
      }

      this.unboxGames = games;
      this.unboxRunning = true;
    },
    unboxGetItemsFormated(items) {
      let pos = 0;
      for (let item of items) {
        pos = pos + (item.ticketRange.max - item.ticketRange.min);
      }

      return items;
    },
    unboxGetOutcomeItem(game) {
      let outcomeItem = null;

      for (const item of this.unboxGetItemsFormated(this.caseContent)) {
        let minTickets = item.ticketRange.min;
        let maxTickets = item.ticketRange.max;

        if (game.outcome >= minTickets && game.outcome <= maxTickets) {
          outcomeItem = item;
          break;
        }
      }

      return outcomeItem;
    },
    unboxGetReelsPos() {
      const spinner = this.$refs["unbox-spinner"].getBoundingClientRect();
      const reel = this.$refs["reel-1"][0].$el.getBoundingClientRect();

      const spinnerCenter = spinner.left + spinner.width / 2;

      const pos = Math.round((spinnerCenter - reel.left - 35) / 70);

      if (this.unboxReelsPos !== pos && pos >= 0 && pos < 150) {
        this.unboxReelsPos = pos;
      }

      this.unboxReelsPosRepeater = requestAnimationFrame(this.unboxGetReelsPos);
    },

    unboxAddReels() {
      let items = this.unboxGetItems;
      this.unboxReels = { 1: [], 2: [], 3: [], 4: [] };
      for (const reel of Object.keys(this.unboxReels)) {
        for (let i = 0; i < 150; i++) {
          this.unboxReels[reel].push(items[Math.floor(Math.random() * items.length)]);
        }
      }
    },
  },
  computed: {
    unboxGetItems() {
      let items = [];

      for (let item of this.unboxGetItemsFormated(this.caseContent)) {
        const count = Math.floor((item.ticketRange.max - item.ticketRange.min) / 1000);
        for (let i = 0; i < (count <= 0 ? 1 : count); i++) {
          items.push(item);
        }
      }

      return items;
    },
  },
  watch: {
    unboxGames: {
      deep: true,
      handler(data, dataOld) {
        if (this.unboxGames.length >= 1) {
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

            this.unboxReels[index + 1][60] = this.unboxGetOutcomeItem(game);
            this.winner = this.unboxReels[index + 1][60];

            const TOTAL_SPIN_MS = 38000;
            const ITEM_WIDTH = 70;
            const START_X = 2535;
            const LOOPS = 0;
            const reelItems = this.unboxReels[index + 1].length;
            const REEL_LENGTH = reelItems * ITEM_WIDTH;
            const WINNER_INDEX = 104;
            const totalDistance = LOOPS * REEL_LENGTH + WINNER_INDEX * ITEM_WIDTH;
            const targetIndex = LOOPS * reelItems + WINNER_INDEX;
            const finalX = START_X - targetIndex * ITEM_WIDTH;
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
                  const reelRect = this.$refs[
                    "reel-" + (index + 1)
                  ][0].$el.getBoundingClientRect();
                  const spinnerCenter = spinnerRect.left + spinnerRect.width / 2;
                  let centeredIndex = Math.round(
                    (spinnerCenter - reelRect.left - 35) / ITEM_WIDTH
                  );

                  const reelItemsCount = this.unboxReels[index + 1].length;

                  if (
                    isNaN(centeredIndex) ||
                    centeredIndex < 0 ||
                    centeredIndex >= reelItemsCount
                  ) {
                    centeredIndex =
                      Math.round((START_X - lastX) / ITEM_WIDTH) % reelItemsCount;
                    if (centeredIndex < 0) centeredIndex += reelItemsCount;
                  }

                  centeredIndex = centeredIndex % reelItemsCount;

                  const correctionTargetIndex = LOOPS * reelItemsCount + centeredIndex;
                  const correctionFinalX =
                    START_X -
                    correctionTargetIndex * ITEM_WIDTH +
                    START_X +
                    correctionTargetIndex +
                    ITEM_WIDTH -
                    66;
                  this.unboxReelStyle = {
                    transform: `translateX(${correctionFinalX}px) translateY(0px)`,
                    transition: "transform 0.15s ease-out",
                  };

                  setTimeout(() => {
                    this.unboxReelsPos = centeredIndex;
                    this.winner = this.unboxReels[index + 1][centeredIndex];
                    
                    this.spinPhase = "finished";

                    setTimeout(() => {
                      this.unboxRunning = false;
                      this.$emit("complete", game.demo);
                    }, 500);


                  }, 160);
                } catch (e) {
                  const centeredIndex = WINNER_INDEX % this.unboxReels[index + 1].length;
                  this.unboxReelsPos = centeredIndex;

                  setTimeout(() => {
                    this.spinPhase = "finished";
                    setTimeout(() => {
                      this.unboxRunning = false;
                      this.$emit("complete", game.demo);
                    }, 500);
                  }, 300);
                }
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
