<template>
  <div
    class="relative w-full min-w-[94vw] md:min-w-[464px] sm:pb-3 max-w-[464px] flex-col transform bg-[rgba(98,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-lg max-h-[349px] transition-all duration-700"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    />
    <ArrowLeftIcon
      class="absolute left-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white fill-white stroke-2"
      @click="openModal('delivery selection')"
    />

    <div
      v-if="!isSuccess && !isLoading"
      class="py-2 h-full flex flex-col gap-4 items-center justify-center"
    >
      <div class="flex items-ceneter flex-col px-2">
        <div
          class="text-white text-xs sm:text-sm font-semibold font-Rubik leading-normal text-center flex items-end gap-x-1 flex-wrap relative h-16 uppercase"
        >
          Are you sure you want a $50.00 {{ shop }} gift card?
        </div>
      </div>

      <div class="relative flex items-center justify-center">
        <div
          class="h-full w-full min-h-2 flex flex-wrap justify-center gap-2 sm:gap-4 max-h-[450px] overflow-y-auto"
        >
          <img :src="getImagePath(shop)" class="sm:w-[193px] sm:h-[113px] w-[260px]" />
        </div>
      </div>
      <div class="flex items-center justify-center gap-2 w-full px-4 sm:px-6">
        <button
          class="h-8 px-2.5 py-1 bg-[#ff3435] rounded-sm justify-center items-center inline-flex overflow-hidden text-white text-sm font-medium font-Rubik uppercase leading-normal"
          @click="openModal('delivery selection')"
        >
          NO
        </button>
        <button
          class="h-8 px-2.5 py-1 bg-[#04ab53] rounded-sm justify-center items-center inline-flex overflow-hidden text-white text-sm font-medium font-Rubik uppercase leading-normal"
          @click="initiate_confirmation_sequence()"
        >
          <div>
            <span class="text-white text-sm font-bold font-Rubik uppercase leading-normal"
              >yes </span
            ><span class="text-white text-[11px] font-bold font-Rubik uppercase leading-normal"
              >(no take backsies)</span
            >
          </div>
        </button>
      </div>
    </div>
    <div
      v-if="!isSuccess && isLoading"
      class="py-2 mt-6 h-full flex flex-col gap-4 items-center justify-center"
    >
      <div class="flex items-center max-h-12 flex-col px-2">
        <div
          class="text-white  text-sm font-semibold font-Rubik leading-normal text-center flex items-end gap-x-1 flex-wrap relative h-16 uppercase"
        >
          This might take a while...
        </div>
        <div
          class="text-[rgba(210,39,40,1)] text-xs  font-semibold font-Rubik leading-normal text-center flex items-end gap-x-1 flex-wrap relative h-16 uppercase"
        >
          we’ll notify you once we it’s ready for you
        </div>
      </div>
      <Loading_spinner :size="64" />
    </div>
    <div
      v-if="isSuccess && !isLoading"
      class="py-2 h-full flex flex-col gap-4 items-center justify-center"
    >
      <div class="flex items-ceneter flex-col px-2">
        <div
          class="text-white text-xs sm:text-sm font-semibold font-Rubik leading-normal text-center flex items-end gap-x-1 flex-wrap relative h-16 uppercase"
        >
          here is your gift card
        </div>
      </div>

      <div class="relative flex-col w-full flex items-center justify-center">
        <Peel
          class="w-[315px] h-[73px] rounded bg-transparent"
          @drag="handleDrag"
          drag
          ref="peel"
          :options="{
            corner: corners.TOP_LEFT
          }"
          :constraints="[corners.BOTTOM_RIGHT]"
          :peel-position="peelPosition"
          :fade-threshold="0.9"
          :peel-path="[415, 415, -315, -315]"
        >
          <!-- Top Cover -->
          <template #top>
            <div class="layer bg-[rgba(255,52,53,1)] text-white flex items-center justify-center">
              <span
                class="font-semibold text-base text-[rgba(74,1,1,1)] font-Rubik cursor-pointer"
                @click="triggerPeel"
                >Reveal</span
              >
            </div>
          </template>

          <!-- Back Side -->
          <template #back>
            <div
              class="layer bg-[linear-gradient(131.59deg,#4A0101_48.17%,#790202_71.48%,#4A0101_98.85%)] text-white flex items-center justify-center cursor-pointer shadow-[0_1px_12px_0_rgb(0,0,0,0.5)]"
            ></div>
          </template>

          <!-- Bottom Content -->
          <template #bottom>
            <div
              class="layer bg-[rgba(255,52,53,1)] rounded text-white flex items-center justify-center cursor-pointer"
            >
              <span
                class="font-semibold text-base text-white font-Rubik uppercase z-10"
                @click="copyToClipboard('dj25dtr85f')"
                >dj25dtr85f</span
              >
            </div>
          </template>
        </Peel>
      </div>
      <div
        class="flex flex-col gap-y-6 items-center justify-center gap-2 w-full px-4 sm:px-6 -mt-2"
      >
        <div
          class="text-white text-xs sm:text-sm font-semibold font-Rubik leading-normal text-center flex items-end gap-x-1 flex-wrap relative  uppercase"
        >
          enjoy the meal <img src="../../../../assets/img/frog_happy.png" class="ml-1" />
        </div>
        <div
          class="transition-all duration-500"
          :class="{ 'opacity-0': !revealed, 'opacity-100': revealed }"
        >
          <span
            class="text-[rgba(255,52,53,1)] text-xs font-semibold font-Rubik leading-normal text-center"
            >Keep us motivated in providing awesome rewards like this by showing us what you got in
            our
          </span>
          <a
            href="/"
            target="blank"
            class="underline text-xs font-semibold font-Rubik leading-normal text-center mx-0.5 text-white"
            >discord</a
          >
          <span
            class="text-[rgba(255,52,53,1)] text-xs font-semibold font-Rubik leading-normal text-center transition-all duration-500 relative"
            >channel
            <img
              class="absolute left-full top-0 ml-1 h-full"
              src="../../../../assets/img/discord_server_instruction.svg
              "
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
import Loading_spinner from '@/components/Loading_spinner.vue'
import Peel, { corners } from 'vue-peel'
import 'vue-peel/style.css'

const props = defineProps({
  shop: String
})

const emit = defineEmits()

const isLoading = ref(false)
const isSuccess = ref(false)
const peel = ref(null)
const revealed = ref(false)
const isPeeling = ref(false)
const peelPosition = ref({ x: 30, y: 30 })

const closeModal = () => {
  emit('close-modal')
}
const preventClosing = () => {
  emit('prevent-closing')
}
const undoPreventClosing = () => {
  emit('undo-prevent-closing')
}
const openModal = (name) => {
  openModalFromModal(name)
}
const copyToClipboard = (item) => {
  navigator.clipboard.writeText(item)
  undoPreventClosing()
}
const getImagePath = (name) => {
  return new URL(`../../../../assets/img/food_delivery/${name}.png`, import.meta.url).href
}

const initiate_confirmation_sequence = () => {
  isLoading.value = true
  preventClosing()
  setTimeout(() => {
    isLoading.value = false
    isSuccess.value = true
  }, 5000)
}

const triggerPeel = () => {
  isPeeling.value = true

  let x = 30
  let y = 30
  const targetX = 500
  const targetY = 325
  const step = 5

  const interval = setInterval(() => {
    if (x < targetX) x += step
    if (y < targetY) y += step

    peelPosition.value = { x, y }

    if (x >= targetX && y >= targetY) {
      clearInterval(interval)
      revealed.value = true
    }
  }, 16)
}

const handleDrag = ({ amountClipped }) => {
  if (peel.value) {
    if (amountClipped >= 0.3) {
      revealed.value = true
    }
    if (amountClipped === 1) {
      peel.value.peel.removeEvents()
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: rgba(255, 52, 53, 1);
  border-radius: 4px;
}
</style>

<style>
.layer {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.peel-bottom {
  background-color: transparent !important;
}
.peel-top {
  background-color: transparent !important;
}
.peel-back {
  background-color: transparent !important;
}
</style>
