<template>
  <div v-if="showCelebration">
    <!-- Fireworks Component -->
    <Fireworks
      ref="fireworksRef"
      :options="{ opacity: 0.5 }"
      class="fixed top-0 left-0 w-full h-full z-40 pointer-events-none"
    />

    <!-- Confetti Inside the Page -->
    <Confetti v-if="showCelebration" :recycle="true" :number-of-pieces="300" :gravity="0.05" />
  </div>
</template>

<script>
import Confetti from 'vue-confetti' // Adjust the import path if needed
import Fireworks from '@fireworks-js/vue' // Adjust this to the correct path if needed

import { ref, watch } from 'vue'
export default {
  components: {
    Confetti,
    Fireworks
  },
  props: {
    showCelebration: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const fireworksRef = ref(null)

    watch(
      () => props.showCelebration,
      (newVal) => {
        if (newVal && fireworksRef.value) {
          fireworksRef.value.start()
        } else if (!newVal && fireworksRef.value) {
          fireworksRef.value.stop()
        }
      }
    )

    return {
      fireworksRef
    }
  }
}
</script>

<style scoped>
/* Add any additional styles for positioning if needed */
</style>
