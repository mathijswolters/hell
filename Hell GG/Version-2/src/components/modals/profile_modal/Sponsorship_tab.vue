<template>
  <div class="flex flex-col gap-y-4 w-full h-full">
    <span class="font-Rubik font-bold text-2xl text-white">SPONSORSHIP</span>
    <div
      class="p-3 bg-[rgba(98,1,1,1)] border border-solid border-[rgba(255,52,53,1)] w-full rounded-sm flex flex-col gap-y-2"
    >
      <div
        class="font-Rubik font-bold text-sm sm:text-xl text-white flex w-full items-center justify-between"
      >
        SPONSORSHIP <span class="text-sm sm:text-base font-bold">2 months to go</span>
      </div>
      <div
        class="my-2 h-[26px] w-full bg-[rgba(66,1,1,1)] rounded-full overflow-hidden flex justify-start"
      >
        <div
          class="bg-[rgba(255,52,53,1)] rounded-full"
          :style="{ width: total_gambled + '%' }"
        ></div>
      </div>
      <div
        class="font-Rubik font-bold text-sm sm:text-xl text-white flex justify-between flex-wrap w-full"
      >
        Total Gambled: ${{
          Number(total_gambled).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
        }}
        <span class="font-bold">$150.00 (30%)</span>
        <span class="font-bold"
          >Total Gambled: ${{
            Number(total_needed).toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })
          }}</span
        >
      </div>
    </div>
    <div class="flex w-full justify-end -mt-1">
      <button
        class="h-8 bg-[rgba(4,171,83,1)] text-white font-Rubik font-bold text-base rounded-sm w-[97px] whitespace-nowrap"
      >
        VIEW URL
      </button>
    </div>
    <div
      class="flex flex-wrap items-start mt-4 pt-6 border-t-solid border-t border-[rgba(255,52,53,1)] gap-2"
    >
      <span class="font-Rubik font-bold text-xl whitespace-nowrap text-white">Widget URL</span>
      <div class="flex flex-col gap-y-1 w-full max-w-[1080px] ml-2">
        <div
          class="relative h-8 w-full flex items-center bg-[rgba(98,1,1,1)] border px-2 border-solid border-[rgba(255,52,53,1)] text-[rgb(255,255,255,0.5)] rounded-sm"
        >
          {{ widget_url }}
          <div
            v-if="blur"
            class="absolute left-0 backdrop-blur-[2px] right-0 w-full h-full flex items-center justify-center text-white font-Rubik font-medium text-sm gap-x-1"
          >
            <LockClosedIcon class="w-4 fill-white stroke-white" /> Click To Copy Widget URL
          </div>
          <EyeIcon
            class="absolute right-2 w-4 z-20 stroke-white cursor-pointer"
            @click="blur = false"
          />
        </div>
        <span class="font-Rubik font-medium text-sm text-[rgba(255,52,53,1)]"
          >Note: Widget URL contains sensitive information. It should not be shared with other users
          or sites.</span
        >
      </div>
      <button
        class="h-8 bg-[rgba(255,52,53,1)] text-white font-Rubik font-bold text-base rounded-sm px-2 whitespace-nowrap"
        @click="copyToClipboard"
      >
        COPY
      </button>
      <button
        class="h-8 bg-[rgba(4,171,83,1)] text-white font-Rubik font-bold text-base rounded-sm px-2 whitespace-nowrap"
      >
        LAUNCH
      </button>
    </div>
  </div>
</template>
<script>
import { EyeIcon } from '@heroicons/vue/24/outline'
import { LockClosedIcon } from '@heroicons/vue/24/solid'
export default {
  data() {
    return {
      total_gambled: 25,
      total_needed: 500,
      blur: true,
      widget_url: 'testing string for copy function'
    }
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.widget_url)
    }
  },
  mounted() {},

  components: { EyeIcon, LockClosedIcon },
  computed: {}
}
</script>
