<template>
  <div
    class="relative w-[94vw] sm:min-w-[480px] pt-3 pb-5 max-w-[480px] flex-col transform transition-all bg-[rgba(98,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-lg"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    />
    <ArrowLeftIcon
      class="absolute left-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white fill-white stroke-2"
      @click="openModal('gift modal')"
    />

    <div class="py-2 px-6 h-full flex flex-col gap-4 items-center justify-center">
      <div
        class="text-white text-lg sm:text-[20px] font-semibold font-Rubik leading-normal flex items-end gap-x-1 flex-wrap "
      >
        where are you located?
        <img src="../../../../assets/img/frog_writing.png" class="mb-2 select-none" />
      </div>
      <div class="relative flex items-center justify-center">
        <div class="relative w-full sm:w-[300px] flex items-center">
          <MagnifyingGlassIcon class="absolute left-2 w-[14.6px] stroke-[#d7b7b7]" />
          <ChevronDownIcon
            class="absolute right-2 w-[14.6px] stroke-[rgba(255,52,53,1)] cursor-pointer stroke-[4px] transition-all"
            :class="{
              '-rotate-180': activeDropdown == 'countries'
            }"
            @click="toggleDropdown('countries')"
          />
          <input
            type="text"
            class="h-[40px] bg-transparent px-8 w-full font-Rubik placeholder:font-Rubik placeholder:text-[rgb(255,255,255,0.5)] text-white placeholder:text-sm placeholder:font-semibold text-sm focus:outline-none border border-solid border-[rgba(255,52,53,1)] rounded-md transition-all placeholder:uppercase"
            :class="{
              'border-b-white rounded-t-md rounded-b-none':  activeDropdown == 'countries' || searchQuery
            }"
            :placeholder="selectedCountry ? selectedCountry : 'SEARCH COUNTRIES...'"
            v-model="searchQuery"
          />

          <div
            class="absolute bg-[rgba(98,1,1,1)] w-full top-full border border-solid border-[rgba(255,52,53,1)] rounded-b-md transition-all"
            :class="{
              ' h-0    mt-0 opacity-0 -z-10': activeDropdown != 'countries' && !searchQuery,
              'h-24 overflow-y-auto': activeDropdown == 'countries' || searchQuery
            }"
          >
            <span
              class="h-10 flex items-center w-full px-2 hover:bg-[rgba(255,52,53,1)] transition-all cursor-pointer uppercase text-white font-Rubik font-semibold text-sm"
              :class="{
                'opacity-0 duration-75': activeDropdown != 'countries' && !searchQuery,
                'opacity-100 duration-700': activeDropdown == 'countries' || searchQuery
              }"
              v-for="(country, index) in filteredLocations"
              @click="
                (selectedCountry = country.name), (searchQuery = null), (activeDropdown = null)
              "
              >{{ country.name }}</span
            >
          </div>
        </div>
      </div>
      <div class="flex items-center flex-col gap-y-2 w-full mt-6">
        <button
          class="h-8 px-2.5 py-1 bg-[#04ab53] rounded-sm justify-center items-center gap-2.5 inline-flex overflow-hidden text-white text-sm font-medium font-Rubik uppercase leading-normal  "
          @click="selectedCountry ? openModal('delivery selection') : ''"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { UserGroupIcon } from '@heroicons/vue/24/solid'
import {
  XMarkIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'
import { openModal, openModalFromModal } from '@/modalStore'
import { countryCodes } from '@/assets/countryCodes'
export default {
  name: 'location_modal',

  components: {
    XMarkIcon,
    ArrowLeftIcon,
    UserGroupIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon
  },
  data() {
    return {
      activeDropdown: null,
      searchQuery: null,
      countries: countryCodes,
      selectedCountry: ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    openModal(name) {
      openModalFromModal(name)
    },
    toggleDropdown(name) {
      if (this.activeDropdown == name) {
        this.activeDropdown = null
        return
      } else {
        this.activeDropdown = name
      }
    }
  },
  mounted() {},
  computed: {
    filteredLocations() {
      return this.searchQuery
        ? this.countries.filter((country) =>
            country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        : this.countries
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
