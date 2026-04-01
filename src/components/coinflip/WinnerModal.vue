<template>
  <div>
    <DialogPanel
      class="relative min-w-[543px] max-w-[543px] flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border h-full"
    >
      <!-- Header Start -->
      <DialogTitle class="flex justify-between w-full items-center">
        <XMarkIcon
          class="w-6 h-6 absolute right-4 top-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
          @click="closeModal()"
        />
      </DialogTitle>
      <div
        class="flex items-center justify-center flex-col gap-2 w-full pt-8 bg-[linear-gradient(0deg,#420101,#420101),radial-gradient(58.01%_36.32%_at_50%_0%,rgba(255,216,9,0.3)_0%,rgba(66,1,1,0)_100%)]"
      >
        <div
          class="flex items-center justify-center w-full gap-x-2 font-Rubik font-extrabold text-white text-lg"
        >
          PLEASE SELECT SKINS
          <div class="relative cursor-pointer info flex justify-center">
            <img class="w-3 h-3" src="../../assets/icons/infoIcon.svg" />
            <div
              class="tooltip top-[calc(100%+0.5rem)] w-[595px] bg-[#8F0E0E] py-3 px-2 font-Rubik font-bold text-xs text-white text-left"
            >
              1. From your skins, select what you want to join the coinflip with, and meet the join
              requirements.<br />
              2. You will Receive a trade offer for your skins. Accept it in order to go through
              with the coinflip.
            </div>
          </div>
        </div>
      </div>
    </DialogPanel>
  </div>
</template>
<script>
import { DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'

export default {
  name: 'coinFlip_Battle',
  props: {
    winner: Object
  },
  components: {
    DialogPanel,
    XMarkIcon,
    DialogTitle
  },
  data() {
    return {
      searchQuery: '',
      items: [
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 900,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 10,
          _id: 1
        },

        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 40,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 1,
          _id: 1
        },
        {
          name: 'AK-47s',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 46,
          _id: 1
        },
        {
          name: 'AK-47t',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 90,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 130,
          _id: 1
        }
      ],
      activeModal: null,
      selectedItems: [],
      openedDropdown: null,
      min: 0,
      max: 0
      // joinable: false
    }
  },
  methods: {
    // join() {
    //   this.$emit('joinPlayer')
    // },

    closeModal() {
      this.$emit('close-modal')
    }
  },
  mounted() {},

  computed: {}
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
  background: #d10d0d;
  border-radius: 4px;
}
.tooltip {
  display: none;
}
.info:hover .tooltip {
  display: flex;
  position: absolute;
  z-index: 1;
  box-shadow: 0px 4px 6px 0px #00000040;
}
</style>
