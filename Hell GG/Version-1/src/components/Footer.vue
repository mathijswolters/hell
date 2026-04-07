<template>
  <div
    class="hidden lg:min-h-[14rem] w-full bg-[rgba(67,1,1,1)] md:flex items-center flex-wrap lg:flex-nowrap justify-center md:justify-between px-4 xl:px-11 2xl:px-16 gap-6 py-4"
  >
    <!-- left -->
    <div class="flex flex-col whitespace-nowrap">
      <img src="../assets/logo.svg" class="max-w-[207px]" />
      <span class="font-Rubik text-white opacity-35 font-medium text-sm"
        >Hell.gg is not affiliated, endorsed, or associated<br />
        with Rust, Facepunch Studios, Steam Powered,<br />
        Valve Corporation, or any of their respective <br />subsidiaries or affiliates.</span
      >
    </div>

    <!-- center -->
    <span class="lg:w-full flex items-start gap-[40px] justify-center">
      <div class="flex flex-col gap-y-2">
        <div class="text-white text-[15px] font-bold font-Rubik leading-normal">GAMES</div>
        <div class="flex items-center flex-col lg:flex-row lg:flex-wrap gap-4">
          <button
            @click="goTo('jackpot')"
            class=" text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap flex-nowrap"
          >
            <img src="../assets/img/coins/jackpot.png" />
            JACKPOT
          </button>

          <button
            @click="goTo('')"
            class="text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap flex-nowrap"
          >
            <img src="../assets/img/coins/coinflip.png" />
            COINFLIP
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-y-2">
        <div class="text-white text-[15px] font-bold font-Rubik leading-normal">INFO</div>
        <div class="flex lg:items-center gap-4 flex-col lg:flex-row lg:flex-wrap">
          <button
            @click="openModal('support', 'FAIRNESS')"
            class=" text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            PROVABLY FAIR
          </button>

          <button
            @click="openModal('support', 'PRIVACY POLICY')"
            class="text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            PRIIVACY POLICY
          </button>
          <button
            @click="openModal('support', 'SUPPORT')"
            class=" text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            SUPPORT
          </button>

          <button
            @click="openModal('support', 'FAQ')"
            class="text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            FAQ
          </button>
          <button
            @click="openModal('support', 'TOS')"
            class=" text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            TOS
          </button>
        </div>
      </div>
    </span>

    <!-- right -->
    <div class="flex flex-col gap-y-3">
      <div class="flex flex-col items-start max-w-[117px]">
        <div class="flex items-center -ml-2">
          <img
            src="https://armadaboost.com/images/trustpilot-logo.svg"
            alt="Trustpilot Logo"
            class="h-9"
          />
        </div>
        <div class="flex items-center space-x-1 mt-2">
          <!-- Stars -->
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-full absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-full absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-full absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-[90%] absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-0 absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="flex items-center justify-center bg-[rgba(98,1,1,1)] w-[30px] h-[30px] rounded-sm"
        >
          <img src="../assets/icons/red_discord.png" />
        </router-link>
        <router-link
          to="/"
          class="flex items-center justify-center bg-[rgba(98,1,1,1)] w-[30px] h-[30px] rounded-sm"
          ><img src="../assets/icons/youtube.png"
        /></router-link>
        <router-link
          to="/"
          class="flex items-center justify-center bg-[rgba(98,1,1,1)] w-[30px] h-[30px] rounded-sm"
          ><img src="../assets/icons/twitter.png"
        /></router-link>
      </div>
    </div>
  </div>
  <div
    class="md:hidden w-full bg-[rgba(67,1,1,1)] flex items-center flex-wrap flex-col justify-center px-4 gap-6 py-4"
  >
    <!-- left -->
    <div class="flex flex-col whitespace-nowrap">
      <img src="../assets/logo.svg" class="max-w-[207px]" />
    </div>

    <!-- center -->
    <span class="w-full flex items-start gap-[40px] justify-center">
      <div class="flex flex-col gap-y-2">
        <div class="text-white text-[15px] font-bold font-Rubik leading-normal">GAMES</div>
        <div class="flex items-center flex-row flex-wrap gap-4">
          <button
            @click="goTo('jackpot')"
            class=" text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap flex-nowrap"
          >
            <img src="../assets/img/coins/jackpot.png" />
            JACKPOT
          </button>

          <button
            @click="goTo('')"
            class="text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap flex-nowrap"
          >
            <img src="../assets/img/coins/coinflip.png" />
            COINFLIP
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-y-2">
        <div class="text-white text-[15px] font-bold font-Rubik leading-normal">INFO</div>
        <div class="flex items-center gap-4 flex-wrap">
          <button
            @click="openModal('support', 'FAIRNESS')"
            class=" text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            PROVABLY FAIR
          </button>

          <button
            @click="openModal('support', 'PRIVACY POLICY')"
            class="text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            PRIIVACY POLICY
          </button>
          <button
            @click="openModal('support', 'SUPPORT')"
            class=" text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            SUPPORT
          </button>

          <button
            @click="openModal('support', 'FAQ')"
            class="text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            FAQ
          </button>
          <button
            @click="openModal('support', 'TOS')"
            class=" text-[rgb(255,255,255,0.50)] text-[13px] font-bold font-Rubik leading-normal flex gap-x-1 items-center whitespace-nowrap"
          >
            TOS
          </button>
        </div>
      </div>
    </span>

    <!-- right -->
    <div class="flex flex-col w-full items-center gap-y-3">
      <div class="flex flex-col items-start max-w-[117px]">
        <div class="flex items-center -ml-2">
          <img
            src="https://armadaboost.com/images/trustpilot-logo.svg"
            alt="Trustpilot Logo"
            class="h-9"
          />
        </div>
        <div class="flex items-center space-x-1 mt-2">
          <!-- Stars -->
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-full absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-full absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-full absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-[90%] absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
          <div class="w-5 h-5 flex items-center justify-center relative bg-[#dcdbe6]">
            <div class="h-full w-0 absolute left-0 bg-[#00b67a]"></div>
            <img src="../assets/img/rating_star.png" class="w-3.5 z-10" />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between w-full max-w-[117px]">
        <router-link
          to="/"
          class="flex items-center justify-center bg-[rgba(98,1,1,1)] w-[30px] h-[30px] rounded-sm"
        >
          <img src="../assets/icons/red_discord.png" />
        </router-link>
        <router-link
          to="/"
          class="flex items-center justify-center bg-[rgba(98,1,1,1)] w-[30px] h-[30px] rounded-sm"
          ><img src="../assets/icons/youtube.png"
        /></router-link>
        <router-link
          to="/"
          class="flex items-center justify-center bg-[rgba(98,1,1,1)] w-[30px] h-[30px] rounded-sm"
          ><img src="../assets/icons/twitter.png"
        /></router-link>
      </div>
      <span class="font-Rubik text-white opacity-35 font-medium text-sm text-center"
        >Hell.gg is not affiliated, endorsed, or associated with Rust, Facepunch Studios, Steam
        Powered, Valve Corporation, or any of their respective subsidiaries or affiliates.</span
      >
    </div>
  </div>
</template>
<script>
import { openModal } from '@/modalStore'
import router from '@/router'
export default {
  methods: {
    openModal(modalName, props) {
      openModal(modalName, props)
    },
    goTo(link) {
      router.push(`/${link}`)
    }
  }
}
</script>
