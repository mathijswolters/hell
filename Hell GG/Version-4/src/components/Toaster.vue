<template>
  <div
    class="fixed bottom-4 flex flex-col gap-3 z-0 md:z-50 transition-all duration-500"
    :class="{
      'right-4 md:right-[20rem]': chat_opened.opened && chat_position.position == 'right',
      'right-4': !chat_opened.opened || chat_position.position !== 'right'
    }"
  >
    <div
      v-for="(toast) in toasts"
      :key="toast.id"
      class="w-[270px] h-8  relative animate-slide-in"
    >
      <div class="w-[270px] h-8 left-0 top-0 absolute">
        <!-- Main Toast Container -->
        <div
          class="w-[270px] h-8 left-0 top-0 absolute rounded-sm border flex items-center justify-between"
          :class="[
            toast.type === 'warning' ? 'bg-[#300101] border-[#febd11]' : '',
            toast.type === 'error' ? 'bg-[#300101] border-[#ff3435]' : '',
            toast.type === 'success' ? 'bg-[#300101] border-[#04ab53]' : ''
          ]"
        >
          <div class="flex items-center space-x-2">
            <!-- Toast Icon -->
            <div
              class="w-8 h-8 flex justify-center items-center rounded-tl-[1px] rounded-bl-[1px]"
              :class="[
                toast.type === 'warning' ? 'bg-[#febd11]' : '',
                toast.type === 'error' ? 'bg-[#ff3435]' : '',
                toast.type === 'success' ? 'bg-[#04ab53]' : ''
              ]"
            >
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-if="toast.type === 'warning'"
              >
                <!-- Warning Icon -->
                <path
                  d="M9.46372 5.58108C9.58364 5.582 9.69831 5.63393 9.78059 5.72666C9.86287 5.81938 9.90576 5.94364 9.89788 6.07067L9.62742 10.2127C9.61429 10.4565 9.42348 10.6466 9.1924 10.6476L7.80767 10.6466C7.57747 10.6466 7.38665 10.4565 7.37265 10.2127L7.10131 6.07066C7.09431 5.94363 7.13632 5.81938 7.2186 5.72666C7.29826 5.63671 7.40854 5.58478 7.52496 5.58478H7.52759L9.46372 5.58108ZM7.80941 11.7966L9.19414 11.7975C9.43397 11.7975 9.62916 12.0043 9.62916 12.2584V13.3989C9.62916 13.6539 9.43397 13.8607 9.19414 13.8607H7.80591C7.69037 13.8607 7.57921 13.8125 7.49781 13.7262C7.41553 13.6391 7.37001 13.5222 7.37001 13.3998V12.2584C7.37001 12.136 7.41553 12.0182 7.49781 11.932C7.57921 11.8457 7.6895 11.7966 7.80504 11.7966L7.80941 11.7966ZM8.50089 7.15366e-05C7.9722 7.15366e-05 7.51179 0.30515 7.26584 0.757641L0.189941 13.7365C0.0691502 13.9582 0 14.215 0 14.4904C0 15.3129 0.620581 15.9814 1.39259 16H15.5899C16.3698 15.9907 17 15.3185 17 14.4904C17 14.216 16.9309 13.9582 16.8101 13.7365L9.742 0.765C9.49691 0.305079 9.03564 0 8.50169 0L8.50089 7.15366e-05Z"
                  fill="white"
                />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-if="toast.type === 'error'"
              >
                <path
                  d="M12.6305 0L8 4.6305L3.3695 0L0 3.3695L4.6305 8L0 12.6305L3.3695 16L8 11.3695L12.6305 16L16 12.6305L11.3695 8L16 3.3695L12.6305 0Z"
                  fill="white"
                />
              </svg>
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                v-if="toast.type === 'success'"
              >
                <path
                  d="M15.4987 0.171926C15.4688 0.12684 15.4301 0.0886357 15.385 0.0597376C15.34 0.0308395 15.2896 0.0118794 15.237 0.00406133C15.1844 -0.0037567 15.1308 -0.000261855 15.0797 0.0143239C15.0285 0.0289096 14.9808 0.0542675 14.9397 0.0887874C10.7348 3.64186 6.84977 7.90873 5.53541 10.5387L2.13146 6.57834C1.9959 6.42062 1.80502 6.32451 1.60063 6.31104C1.39623 6.29758 1.19496 6.36785 1.0409 6.50648L0.264058 7.20552C0.112361 7.34202 0.0185042 7.53394 0.00245668 7.74044C-0.0135908 7.94694 0.0494374 8.15172 0.178132 8.31122L4.54586 13.7242C4.61548 13.8105 4.70276 13.88 4.80149 13.9276C4.90023 13.9753 5.00798 14 5.11707 14H6.17527C6.31137 13.9995 6.44474 13.9606 6.56088 13.8878C6.67703 13.8149 6.77153 13.7107 6.83412 13.5866C9.61489 8.10193 12.1201 4.99751 15.8797 1.33412C15.9458 1.26997 15.9876 1.18378 15.9977 1.09091C16.0077 0.998034 15.9853 0.904524 15.9344 0.827051L15.4987 0.171926Z"
                  fill="white"
                />
              </svg>
            </div>

            <!-- Toast Message -->
            <div
              class="left-[37px] top-[5px] opacity-60 text-[#d6b7b7] text-sm font-normal font-['Rubik'] leading-tight text-left"
            >
              {{ toast.message }}
            </div>
          </div>

          <!-- Close Button -->
          <button @click="removeToast(toast.id)" class="mr-2 text-[#d6b7b7] hover:text-white">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.01071L8.98929 0L5 3.98929L1.01071 0L0 1.01071L3.98929 5L0 8.98929L1.01071 10L5 6.01071L8.98929 10L10 8.98929L6.01071 5L10 1.01071Z"
                fill="#D7B7B7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { chat_opened, chat_position } from '@/chatStore'
export default {
  setup() {
    return {
      chat_opened,
      chat_position
    }
  },
  data() {
    return {
      toasts: []
    }
  },
  methods: {
    addToast(type, message) {
      const id = Date.now() // Unique ID for each toast
      this.toasts.push({ id, type, message })

      // Auto-remove toast after 5 seconds
      setTimeout(() => {
        this.removeToast(id)
      }, 5000)
    },
    removeToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id)
    }
  }
}
</script>

<style>
@keyframes slide-in {
  from {
    transform: translateY(10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-in-out;
}
</style>
