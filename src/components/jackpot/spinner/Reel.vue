<template>
  <div
    class="unbox-reel"
    :class="{ 'unbox-reel--stopped': spinPhase === 'finished' }"
  >
    <div
      v-for="(item, index) in reel"
      v-bind:key="index"
      class="reel-element"
      v-bind:class="[
        {
          'element-active': index === pos && spinPhase === 'finished',
          'final-item': spinPhase === 'finished' && index === pos,
          'element-active-center': spinPhase === 'spinning' && index === pos,
        },
      ]"
    >
      <div class="spin-slot-card-image">
        <div class="backk">
          <div class="backImg">
            <div class="backImg2">
              <div
                class="w-[60px] h-[60px] bg-no-repeat bg-center bg-cover"
                :class="{ 'reel-element-winner-thumb': spinPhase === 'finished' && index === pos }"
                :style="{ backgroundImage: `url(${getAvatar(item)}), url('/img/fallback.png')`, backgroundColor: '#0b0b0b' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnboxReel",
  components: {},
  props: ["reel", "pos", "running", "spinPhase"],
  watch: {
    spinPhase(newVal, oldVal) {
      console.log("spinPhase changed:", oldVal, "→", newVal)
    }
  },
  methods: {
    unboxFormatValue(value) {
      return parseFloat(Math.floor(value / 10) / 100)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatNumber(number) {
      const parts = number.toFixed(2).toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${parts[0]}<span v-if="hasDecimal(number)" class="decimal">.${parts[1]}</span>`;
    },
    getAvatar(item) {
      // CASE 1 — missing avatar
      if (!item || !item.avatar) {
        return "/img/fallback.png";
      }

      // CASE 2 — invalid URL (missing protocol, typo)
      try {
        new URL(item.avatar, window.location.origin); // validate
      } catch (e) {
        return "/img/fallback.png";
      }

      // CASE 3 — valid image
      return item.avatar;
    },
  },
};
</script>

<style scoped>

.reel-element-winner-thumb {
  border: 2px solid #d6d5d4;
}
.element-center {
  transform: scale(1.05);
  border: 2px solid #fff;
  transition: transform 0.1s ease;
}

.unbox-reel {
  height: 100%;
  display: flex;
  align-items: center;
  /* margin-left: 40px; */
  will-change: transform;
} 

/* Default (non-focused) items on the reel */
.unbox-reel .reel-element {
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  /* softer “disabled” effect so they stay visible */
  opacity: 0.25; /* was 0.25  */
  filter: grayscale(80%); /* removed blur + less grey */
  transform: scale(0.95); /* was 0.85  */
  transition: all 0.25s ease;
}

.unbox-reel .reel-element:last-child {
  margin-right: 0;
  margin-bottom: 0;
}

/* Focused centre item */
.unbox-reel .reel-element.element-active {
  opacity: 1 !important;
  filter: none !important;
  transform: scale(1.3);
  z-index: 5;
  transition: all 0.2s ease; /* quick transition for sliding */
}

/* Center item highlight while spinning */
.unbox-reel .reel-element.element-active-center {
  opacity: 1 !important;
  filter: none !important;
  transform: scale(1.3); /* matches element-active */
  z-index: 5;
  border: 2px solid #cfb7b7; /* sliding highlighter border */
  transition: all 0.2s ease; /* quick transition for sliding */
}

/* Extra punch when the spin is finished */
.unbox-reel .reel-element.final-item {
  transform: scale(1.5);
  transition: transform 0.2s ease-in-out;
}

.unbox-reel .reel-element.element-active .spin-slot-card-image {
  /* box-shadow: 0 0 18px rgba(255, 255, 255, 0.9); */
  border-radius: 0px;
  border: 2px solid #cfb7b7;
}

/* Reel only (not the post-spin winner text row): when stopped, recess non-winners */
.unbox-reel.unbox-reel--stopped .reel-element:not(.final-item) {
  opacity: 0.14;
  filter: grayscale(85%) brightness(0.45);
}

/* Reel only: light frame on the winning thumbnail after spin (inner 60×60) */
.unbox-reel.unbox-reel--stopped .reel-element.final-item .backImg2 > div {
  box-sizing: border-box;
  border: 2px solid #d6d5d4;
  border-radius: 4px;
}

/* Avoid double frame: outer card border is for spinning; stopped uses inner thumb border only */
.unbox-reel.unbox-reel--stopped .reel-element.element-active .spin-slot-card-image {
  border: none;
}

.unbox-reel .element-image {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.unbox-reel .element-image svg {
  flex-shrink: 0;
}

.unbox-reel .element-image img {
  width: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease;
}

.unbox-reel .reel-element.element-active .element-image img {
  transform: translate(-50%, -40%) scale(1.5);
}

.unbox-reel .element-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
}
</style>
<style lang="scss" scoped>
.backk {
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 125px;
  // height: 105px;
}
.backImg {
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 125px;
  // height: 105px;
}

.spin-slot-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.spin {
  &-slot {
    max-width: 100%;
    width: 100%;
    height: 100%;
    position: relative; /* Replaced relative */
    &::before,
    &::after {
      content: "";
      position: absolute; /* Replaced absolute */
    }
    &::before {
      // background-position: left -50px;
      background-repeat: no-repeat; /* Replaced bg-no-repeat */
    }
    &::after {
      // background-position: right -50px;
      background-repeat: no-repeat; /* Replaced bg-no-repeat */
    }
    .logo-badge {
      z-index: 1;
      position: absolute; /* Replaced absolute */
      img {
        // min-width: 198px;
        position: absolute; /* Replaced absolute */
      }
      &-left {
        left: 0; /* Replaced left-0 */
        img {
          transform: rotate(90deg); /* Replaced rotate-90 */
        }
      }
      &-right {
        right: 0; /* Replaced right-0 */
        img {
          transform: rotate(90deg); /* Replaced rotate-90 */
        }
      }
    }
    &-machine {
      height: 100%;
      &-wrap {
        margin-top: 2rem;
        margin-bottom: 2rem; /* Replaced my-8 */
        height: 100%;
      }
      &-rounds {
        .spin {
          height: 100%;
          &-slot {
            height: 100%;
            z-index: 0;
            border-radius: 20px; /* Replaced rounded-20 */
            &::before,
            &::after {
              z-index: -1;
              // @apply bg-none;
              background: none; /* Replaced bg-none */
            }
            &::before {
              width: 50%;
            }
            &::after {
              width: 50%;
            }
            &-wrap {
              position: relative;
              height: 100%;
              // left: calc(50% - 92px);
              &.smooth {
                transition: transform 0.5s ease-in-out;
              }
            }
            &-item {
              min-height: 255px;

              height: 100%;
              z-index: 0;
              position: relative; /* Replaced relative */
              &::before,
              &::after {
                content: "";
                z-index: -1;
                position: absolute; /* Replaced absolute */
              }

              &.next,
              &.prev {
                opacity: 1; /* Replaced opacity-100 */
                &::before,
                &::after {
                  opacity: 1; /* Replaced opacity-100 */
                }
              }
              &.next {
                &::before {
                  height: 100%; /* Replaced h-full */
                }
                &::after {
                  height: 0.25rem; /* Replaced h-1 */
                }
              }
              &.prev {
                &::before {
                  height: 100%; /* Replaced h-full */
                }
                &::after {
                  height: 0.25rem; /* Replaced h-1 */
                }
              }
            }
            &-card {
              display: flex; /* Replaced flex */
              height: 100%;
              align-items: center;
              &-image {
                // @apply mb-0.5;
                margin-bottom: 0.125rem; /* Replaced mb-0.5 */
                img {
                  // max-height: 100px;
                  // max-width: 110px;
                }
              }
              .case-card-value-btn {
                display: flex; /* Replaced flex */
              }
            }
            &-window {
              // @apply py-0;
              padding-top: 0;
              padding-bottom: 0; /* Replaced py-0 */
            }
          }
        }
        .arrow {
          z-index: 0;
          // @apply bg-none ;
          background: none; /* Replaced bg-none */
          &::before {
            border: none;
            // @apply border-r-2 h-10 border-primary border-solid;
            border-right: 2px solid #f00; /* Replaced border-r-2 */
          }
        }
      }
    }
    &-window {
      position: relative; /* Replaced relative */
      height: 100%;
    }
    &-battle &-window {
      // @apply py-0;
      padding-top: 0;
      padding-bottom: 0; /* Replaced py-0 */
    }

    &-single &-window {
      // @apply py-0;
      padding-top: 0;
      height: 100%;
      padding-bottom: 0; /* Replaced py-0 */
    }
    &-single &-card {
      height: calc(100% - 0.5rem);
      display: flex;
      align-items: center;
    }

    &-wrap {
      display: flex; /* Replaced flex */
      height: 100%;
    }
    &-raplicator {
      display: flex; /* Replaced flex */
      height: 100%;
    }
    &-item {
      width: 184px;
      opacity: 1;
      height: 100%;
      display: flex;
      justify-content: center;

      &.active {
        transition: opacity 0.25s ease-in-out;
        opacity: 1;
        transform: scale(1.11);
        position: relative; /* Replaced relative */
        &::before,
        &::after {
          content: "";
          z-index: -1;
          position: absolute; /* Replaced absolute */
        }

        &::before {
          height: 100%; /* Replaced h-full */
        }
        &::after {
          height: 0.25rem; /* Replaced h-1 */
        }
      }
    }
    &-card {
      text-align: center; /* Replaced text-center */
      height: calc(100% - 0.5rem);
      &-image {
        display: flex; /* Replaced flex */
        position: relative;
        img {
          max-width: 60px;
          max-height: 60px;
        }
      }
    }
  }
}
</style>
