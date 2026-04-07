<template>
  <div
    class="relative max-w-[98vw] sm:max-w-full xl:min-w-[1122px] xl:max-w-[1122px] flex-col transform transition-all bg-[rgba(74,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] border overflow-hidden rounded-sm"
  >
    <!-- <XMarkIcon
      class="absolute right-2 top-2 w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 stroke-white"
      @click="closeModal()"
    /> -->
    <!-- header -->
    <div
      class="flex items-center justify-center h-[57px] w-full bg-[rgba(255,52,53,1)] text-white font-Rubik font-bold text-2xl gap-x-1"
    >
      Scam Prevention Guide
    </div>
    <div
      class="flex items-center flex-col gap-y-2.5 py-4 px-2 max-h-[60vh] overflow-y-auto overflow-x-hidden"
    >
      <div
        class="flex flex-col gap-y-4 py-2 px-2 w-full bg-[#620101] gap-x-1 border border-solid border-[#ff3435] rounded-sm"
      >
        <div class="text-white text-lg font-semibold font-Rubik leading-normal">
          The scammers sent a fake trade?
        </div>
        <div class="text-white text-sm font-medium font-Rubik leading-normal">
          Yes, what the scammers do is decline the trade offer we send to you, and then remake the
          trade offer to try and trick you into accepting it. That's why <br />we sent you this pop
          up. We noticed our trade to you got declined, and we wanted to warn you, as that's the
          best we can do.
        </div>
      </div>
      <div
        class="flex flex-col gap-y-4 py-2 px-2 w-full bg-[#620101] gap-x-1 border border-solid border-[#ff3435] rounded-sm"
      >
        <div class="text-white text-lg font-semibold font-Rubik leading-normal">
          How did this happen?
        </div>
        <div class="text-white text-sm font-medium font-Rubik leading-normal">
          We of course, don't know exactly, because we don't have access to your computer/account.
          However, the most common scenario is that your account <br />was hijacked through a
          phishing site. Most phishing sites are popular websites scammers recreate in order to
          trick people into logging in to gain account <br />login information. Follow steps below
          to secure your account from a phishing attack.
        </div>
      </div>
      <div
        class="flex flex-col gap-y-4 py-2 px-2 w-full bg-[#620101] gap-x-1 border border-solid border-[#ff3435] rounded-sm"
      >
        <div class="text-white text-lg font-semibold font-Rubik leading-normal">
          If it's still happening despite securing your steam account.
        </div>
        <div class="text-white text-sm font-medium font-Rubik leading-normal">
          Your computer/network is probably what's compromised. Please search on google on how to
          remove trojans/malware/rats from your computer. If this <br />doesn't fix the issue please
          contact an it professional.
        </div>
      </div>
      <div
        class="flex items-center justify-center sm:min-h-[54px] sm:h-[54px] w-full bg-[rgba(255,52,53,1)] text-white font-Rubik font-semibold text-lg gap-x-1 mt-2 text-center py-2"
      >
        Secure steam account from a phishing attack
      </div>
      <div class="text-center text-white text-sm font-medium font-Rubik leading-normal">
        Please follow ALL 3 steps (IN ORDER) to secure your steam account.
      </div>
      <div
        class="flex h-full sm:h-auto sm:min-h-[102px] gap-x-2 sm:gap-x-4 w-full bg-[#620101] border border-solid border-[#ff3435] rounded-sm"
      >
        <div
          class="flex items-center justify-center min-h-full min-w-[102px] bg-[#ff3435] text-white text-[50px] font-semibold font-Rubik leading-normal"
        >
          1
        </div>
        <div class="flex sm:gap-4 py-2 flex-col pr-1 w-full max-w-[calc(100%-110px)]">
          <div
            class="text-white text-lg sm:text-[22px] font-semibold font-Rubik leading-normal"
          >
            Change Your password:
          </div>
          <span
            class="text-white text-sm sm:text-base font-semibold font-Rubik leading-normal break-words text-wrap"
            >Go to
            <a
              target="blank"
              href="https://store.steampowered.com/account/"
              class="text-[#ff3435] text-sm font-semibold font-Rubik leading-normal break-words text-wrap"
              >store.steampowered.com/account/ </a
            >and click on “Change my password”</span
          >
        </div>
      </div>
      <div
        class="flex sm:h-auto sm:min-h-[102px] h-full gap-x-2 sm:gap-x-4 w-full bg-[#620101] border border-solid border-[#ff3435] rounded-sm"
      >
        <div
          class="flex items-center justify-center min-h-full min-w-[102px] bg-[#ff3435] text-white text-[50px] font-semibold font-Rubik leading-normal"
        >
          2
        </div>
        <div class="flex sm:gap-4 py-2 w-full flex-col pr-1 max-w-[calc(100%-110px)]">
          <div
            class="text-white text-lg sm:text-[22px] font-semibold font-Rubik leading-normal "
          >
            Revoke Your Steam API key:
          </div>

          <span
            class="text-white text-sm sm:text-base font-semibold font-Rubik leading-normal break-words"
            >Go to
            <a
              target="blank"
              href="https://steamcommunity.com/dev/apikey"
              class="text-[#ff3435] text-sm font-semibold font-Rubik leading-normal break-words"
              >steamcommunity.com/dev/apikey </a
            >and click on “Revoke My Steam Web API Key”</span
          >
        </div>
      </div>
      <div
        class="flex h-full sm:h-fit sm:min-h-[102px] gap-x-2 sm:gap-x-4 w-full bg-[#620101] border border-solid border-[#ff3435] rounded-sm"
      >
        <div
          class="flex items-center justify-center min-h-full min-w-[102px] bg-[#ff3435] text-white text-[50px] font-semibold font-Rubik leading-normal"
        >
          3
        </div>
        <div class="flex sm:gap-4 py-2 flex-col pr-1 w-full max-w-[calc(100%-110px)]">
          <div
            class="text-white text-lg sm:text-[22px] font-semibold font-Rubik leading-normal  "
          >
            Deauthorize All other Devices:
          </div>
          <span
            class="text-white text-sm sm:text-base font-semibold font-Rubik leading-normal break-words text-wrap"
            >Go to
            <a
              target="blank"
              href="https://steamcommunity.com/dev/apikey"
              class="text-[#ff3435] text-sm font-semibold font-Rubik leading-normal break-words text-wrap"
              >storesteampowered.com/twofactor/manage </a
            >and click on “Deauthorize all other devices”</span
          >
        </div>
      </div>
      <div
        class="flex items-center justify-center sm:min-h-[48px] p-2 w-full bg-[#620101] gap-x-1 border border-solid border-[#ff3435] rounded-sm"
      >
        <div class="text-[#ff3435] text-sm font-medium font-Rubik leading-normal text-center">
          If this this still persists your computer / network may be infected with Malware/Trojans
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { XMarkIcon } from '@heroicons/vue/24/outline'
import { openModalFromModal } from '@/modalStore'
export default {
  name: 'security_warning',

  components: {
    // XMarkIcon
  },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    openModal(name, props) {
      openModalFromModal(name, props)
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
  height: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #870000;
  border-radius: 4px;
}
</style>
