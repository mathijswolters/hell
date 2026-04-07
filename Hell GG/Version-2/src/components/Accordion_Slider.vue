<template>
  <div :class="[isOpen ? 'fullAccordionOpen' : '']">
    <div
      class="flex items-center justify-between custom-header h-12 px-2 text-white font-Rubik transition-all z-20 cursor-pointer"
      :class="[
        isOpen
          ? 'bg-[#FF3435] border-transparent rounded-t-sm'
          : 'bg-[#620101] border border-solid border-[#FF3435] rounded-sm'
      ]"
      @click="toggleAccordion"
    >
      <span class="font-bold text-sm sm:text-lg select-none">{{ title }}</span>

      <ChevronDownIcon
        class="w-4 transition-all fill-white stroke-white"
        :class="{ '-rotate-180': isOpen }"
      />
    </div>
    <div
      class="bg-[#620101] transition-all flex item-center relative rounded-b-sm"
      :class="{
        'h-fit ': isOpen,
        ' h-0': !isOpen
      }"
    >
      <p
        class="text-white font-medium font-Rubik text-xs sm:text-sm w-full p-2 transition-all flex items-start select-none"
        :class="{
          'h-full z-10 opacity-50 ': isOpen,
          'h-0 opacity-0 -z-10 absolute': !isOpen
        }"
      >
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
export default {
  components: {
    ChevronDownIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)

    const toggleAccordion = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      toggleAccordion
    }
  }
}
</script>
