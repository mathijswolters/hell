<template>
  <div>
    <span class="font-Rubik font-bold text-white text-base">{{ formattedTime }}:</span>
    <span class="font-bold font-Rubik text-sm text-[#FF3435]">{{ seconds }}</span>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'

// Props: time (string) and secondsStyle (object for custom seconds styling)
const props = defineProps({
  time: {
    type: String,
    required: true
  }
})

// Split and format the time
const { time } = toRefs(props)

const formattedTime = computed(() => {
  const [hours, minutes, seconds] = time.value.split(':')
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`
})

// Extract the seconds for separate styling
const seconds = computed(() => time.value.split(':')[2].padStart(2, '0'))
</script>

<style scoped>
/* Add any base styles for the component here */
</style>
