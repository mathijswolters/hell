<template>
  <div ref="otpCont">
    <input
      type="text"
      class="w-[41.22px] h-[53px] text-center mx-1 bg-[rgba(153,19,19,1)] text-white text-xl font-semibold rounded-sm"
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      :autofocus="ind === 0"
      :placeholder="0"
      maxlength="1"
      @keydown="handleKeyDown($event, ind)"
    />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true
  }
})

const digits = reactive([])

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i)
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null
  }
}
const handleKeyDown = function (event, index) {
  if (event.key !== 'Tab' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
    event.preventDefault()
  }

  if (event.key === 'Backspace') {
    digits[index] = null

    if (index != 0) {
      otpCont.value.children[index - 1].focus()
    }

    return
  }

  if (new RegExp('^([0-9])$').test(event.key)) {
    digits[index] = event.key

    if (index != props.digitCount - 1) {
      otpCont.value.children[index + 1].focus()
    }
  }
}
const otpCont = ref(null)
</script>
<style scoped></style>
