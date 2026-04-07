<template>
  <div class="flex items-center w-5 h-5 relative justify-center select-none">
    <img src="../../assets/icons/target.svg" />
    <span
      class="absolute -bottom-1 right-0 font-Rubik font-bold text-xs text-[#FF3435]"
      style="-webkit-text-stroke: 0.75px black"
      >{{ number }}</span
    >
  </div>
</template>
<script>
export default {
  props: {
    number: {
      type: Number,
      default: 0
    }
  }
}
</script>