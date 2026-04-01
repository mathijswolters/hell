<template>
  <div
    class="relative min-w-[90vw] sm:min-w-[422px] max-w-[422px] flex-col transform transition-all bg-[rgba(74,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-sm pb-2"
  >
    <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    />
    <!-- header -->

    <div class="flex items-center flex-col gap-y-2 mt-4 px-2">
      <div class="text-white text-lg font-extrabold font-['Rubik'] leading-normal">
        LET’S GET YOU VERIFIED
      </div>
      <div class="text-white text-sm font-normal font-['Rubik'] leading-normal">
        Provide identity document
      </div>
      <div
        class="relative max-w-[321px] flex gap-1 bg-[#620101] border border-solid border-[#e82d2e] h-10 w-full items-center px-2"
      >
        <label
          for="file-upload"
          class="block text-[255,255,255,0.5] text-sm font-normal font-['Rubik'] leading-normal truncate max-w-[60%]"
          :class="{
            'text-white': fileName
          }"
        >
          {{ fileName || 'Upload your document...' }}
        </label>
        <input id="file-upload" type="file" class="hidden" @change="handleFileUpload" />
        <label
          for="file-upload"
          class="px-2.5 h-8 bg-[#e82d2e] rounded-sm border border-[#e82d2e] flex flex-col absolute  items-center justify-center right-1 text-white text-sm font-bold font-['Rubik'] leading-tight hover:translate-y-[-1px] transition-all duration-200 hover:opacity-80  cursor-pointer"
        >
          CHOOSE FILE
        </label>
      </div>

      <button
        class="opacity-50 text-white text-base font-bold font-['Rubik'] uppercase leading-normal mt-4"
      >
        CONTINUE
      </button>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
export default {
  name: 'security_warning',

  components: {
    XMarkIcon
  },
  data() {
    return { fileName: '' }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    openModal(name, props) {
      openModalFromModal(name, props)
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.fileName = file.name
      } else {
        this.fileName = ''
      }
    }
  },
  mounted() {},

  computed: {}
}
</script>
