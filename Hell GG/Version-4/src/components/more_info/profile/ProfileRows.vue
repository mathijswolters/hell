<template>
  <div class="container-class">
    <div class="flex flex-col gap-2">
      <div class="flex items-center flex-wrap gap-2">
        <img src="/img/icons/clever-boy.png" width="20" alt="img" />
        <img src="/img/icons/clever-rank.png" width="20" alt="img" />
        <span class="text-white text-[10px] font-[700]">DeanCortez</span>
        <h2 class="text-[10px] font-[800] text-white">
            <span class="text-[10px] font-[800] text-[#04AB53]">$</span>
            15,005.00
          </h2>
        <button class="bg-[#04AB53] text-white py-2 px-4 text-[10px] font-[800]">
          Make VIP
        </button>
        <button class="bg-[#04AB53] text-white py-2 px-4 text-[10px] font-[800]">
          Make Mod
        </button>
        <button
          @click="toggleSponsor"
          class="bg-[#04AB53] text-white py-2 px-4 text-[10px] font-[800]"
          :class="isSponsor ? 'bg-[#FF3435]' : ''"
        >
          {{ isSponsor ? "Remove Sponsor" : "Add Sponsor" }}
        </button>

        <button
          @click="openModal('show tickets')"
          class="bg-[#FEBD11] text-white py-2 px-4 text-[10px] font-[800]"
        >
          Show Tickets
        </button>
        <button
          @click="openModal('change balance')"
          class="bg-[#FEBD11] text-white py-2 px-4 text-[10px] font-[800]"
        >
          Change Balance
        </button>
        <button @click="openModal('2fa code')" class="bg-[#FF3435] text-white py-2 px-4 text-[10px] font-[800]">
          Remove 2FA
        </button>
      </div>
      <div class="flex items-center flex-wrap gap-2">
        <img src="/img/icons/clever-boy.png" width="16" alt="img" />
        <button class="bg-[#620101] text-white py-2 px-4 text-[10px] font-[800]">
          Copy SteamID
        </button>
        <button class="bg-[#620101] text-white py-2 px-4 text-[10px] font-[800]">
          Copy Steam Trade URL
        </button>
      </div>
      <div class="flex items-center flex-wrap gap-2">
        <img src="/img/icons/clever-boy.png" width="16" alt="img" />
        <div class="bg-[#240101] flex gap-3 py-2 px-4 text-white text-[10px] font-[700]">
          <span class="text-[10px] font-[800] text-[#D7B7B7]">#5,125</span>
          <h2 class="text-[10px] font-[800] text-white">
            <span class="text-[10px] font-[800] text-[#04AB53]">$</span>
            15,005.00
          </h2>
        </div>
        <button
          @click="openModal('remove leaderboard')"
          class="bg-[#FF3435] text-white py-2 px-4 text-[10px] font-[800]"
        >
          Remove Wager From Leaderboard
        </button>
        <button
          @click="toggleSelfExclude"
          :class="[
            'text-white py-2 px-4 text-[10px] font-[800] transition',
            selfExcluded ? 'bg-[#04AB53]' : 'bg-[#FF3435]',
          ]"
        >
          {{ selfExcluded ? "Rewards Enabled" : "Self Excluded From Rewards" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { openModal } from "@/modalStore";
export default {
  name: "ProfileRows",
  data() {
    return {
      isSponsor: false,
      selfExcluded: false,
    };
  },
  methods: {
    openModal(name, props) {
      openModal(name, props);
    },
    toggleSponsor() {
      this.isSponsor = !this.isSponsor;
    },
    toggleSelfExclude() {
      this.selfExcluded = !this.selfExcluded;
    },
  },
};
</script>

<style scoped></style>
