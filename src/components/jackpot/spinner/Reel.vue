<template>
  <div
    class="unbox-reel"
    :class="{
      'reel--spinning': spinPhase === 'spinning',
      'reel--finished': spinPhase === 'finished'
    }"
  >
    <div
      v-for="(item, index) in reel"
      :key="index"
      class="reel-element"
      :class="[
        {
          'reel-element--center': isCenterSlot(index),
          'element-active': index === pos && spinPhase === 'finished',
          'final-item': spinPhase === 'finished' && index === pos
        }
      ]"
    >
      <div class="spin-slot-card-image">
        <div class="backk">
          <div class="backImg">
            <div class="backImg2">
              <div
                class="reel-face w-[60px] h-[60px] bg-no-repeat bg-center bg-cover"
                :class="isCenterSlot(index) ? 'reel-face--color' : 'reel-face--bw'"
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
import { normalizeSteamEconomyImageUrl } from '@/services/jackpotClient'

export default {
  name: 'UnboxReel',
  props: ['reel', 'pos', 'running', 'spinPhase'],
  methods: {
    /** Slot under the pointer: full colour + zoom; all others B/W. */
    isCenterSlot(index) {
      const at = Number(this.pos)
      const idx = Number(index)
      if (Number.isNaN(at) || Number.isNaN(idx) || at !== idx) return false
      return this.spinPhase === 'spinning' || this.spinPhase === 'finished'
    },
    getAvatar(item) {
      if (!item || typeof item !== 'object') return '/img/fallback.png'
      const raw = item.avatar ?? item.image ?? item.url ?? ''
      const s = String(raw).trim()
      if (!s) return '/img/fallback.png'
      if (/^https?:\/\//i.test(s)) return s
      if (s.startsWith('//')) return `https:${s}`
      if (s.startsWith('/')) return s
      const n = normalizeSteamEconomyImageUrl(s)
      return n || '/img/fallback.png'
    }
  }
}
</script>

<style scoped>
.element-center {
  transform: scale(1.05);
  border: 2px solid #fff;
  transition: transform 0.1s ease;
}

.unbox-reel {
  height: 100%;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: max-content;
  min-width: min-content;
  /* margin-left: 40px; */
  will-change: transform;
} 

/* Scale on wrapper; grayscale only on .reel-face so transform stays crisp */
.unbox-reel .reel-element {
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  opacity: 1;
  transform: scale(0.88);
  transform-origin: center center;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.unbox-reel.reel--spinning .reel-element {
  transition: none !important;
}

/* Slot aligned with viewport centre: zoom in + colour (see .reel-face--color) */
.unbox-reel .reel-element--center {
  transform: scale(1.2);
  z-index: 5;
  border: 2px solid #cfb7b7;
  border-radius: 4px;
  box-sizing: border-box;
}

.unbox-reel.reel--spinning .reel-element--center {
  transform: scale(1.28);
}

.unbox-reel .reel-element:last-child {
  margin-right: 0;
  margin-bottom: 0;
}

.reel-face {
  border-radius: 2px;
  transform-origin: center center;
}

.unbox-reel.reel--finished .reel-face {
  transition: filter 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.reel-face--bw {
  filter: grayscale(100%);
}

.reel-face--color {
  filter: none;
}

.unbox-reel .reel-element.element-active {
  opacity: 1 !important;
  transform: scale(1.36) !important;
  z-index: 6;
  transition:
    filter 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.48s cubic-bezier(0.2, 0.85, 0.25, 1);
}

.unbox-reel .reel-element.element-active .reel-face {
  filter: none !important;
}

.unbox-reel .reel-element.final-item.element-active {
  transform: scale(1.42) !important;
  transition: transform 0.52s cubic-bezier(0.2, 0.85, 0.25, 1);
}

.unbox-reel .reel-element.element-active .spin-slot-card-image {
  /* box-shadow: 0 0 18px rgba(255, 255, 255, 0.9); */
  border-radius: 0px;
  border: 2px solid #cfb7b7;
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
