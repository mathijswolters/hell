<template>
  <div
    :class="[
      'bg-[#5F0303] h-screen flex flex-col py-[20px] transition-all duration-300 overflow-x-hidden overflow-y-scroll',
      isSidebarOpen ? 'min-w-[240px] w-[240px] px-[10px]' : 'w-[50px] px-[5px]',
    ]"
  >
    <div class="flex justify-between w-full items-center mb-[30px]">
      <h2
        v-if="isSidebarOpen"
        class="text-white text-[16px] font-[800] uppercase truncate"
      >
        More Info
      </h2>

      <button
        @click="isSidebarOpen = !isSidebarOpen"
        class="text-[#D7B7B7] hover:text-white transition-colors text-lg"
        :class="isSidebarOpen ? '' : 'mx-auto'"
      >
        {{ isSidebarOpen ? "✕" : "☰" }}
      </button>
    </div>

    <nav class="flex flex-col gap-1">
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="{ name: item.defaultRoute || item.routeNames[0] }"
        class="flex items-center gap-3 px-[5px] py-[8px] rounded-[4px] transition-colors"
        :class="[
          isSidebarOpen ? '' : 'mx-auto px-6',
          item.routeNames.includes($route.name)
            ? 'bg-[#04AB5380] border border-[#04AB53]'
            : 'border border-transparent hover:bg-white/5',
        ]"
      >
        <img :src="item.icon" class="w-[13px] h-[13px]" />
        <span v-if="isSidebarOpen" class="text-[14px] font-[500] text-white">
          {{ item.name }}
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isSidebarOpen: false,
      menuItems: [
        {
          name: "Profile",
          icon: "/img/icons/profile.svg",
          routeNames: ["MoreInfoProfile"],
          defaultRoute: "MoreInfoProfile",
        },
        {
          name: "Game History",
          icon: "/img/icons/history.svg",
          routeNames: ["GameHistoryCoinflip", "GameHistoryJackpot"],
          defaultRoute: "GameHistoryCoinflip",
        },
        {
          name: "Wager History",
          icon: "/img/icons/wager.svg",
          routeNames: ["WagerHistory"],
          defaultRoute: "WagerHistory",
        },
        {
          name: "Withdraws",
          icon: "/img/icons/withdraw.svg",
          routeNames: ["MoreInfoWithdraw"],
          defaultRoute: "MoreInfoWithdraw",
        },
        {
          name: "Trades",
          icon: "/img/icons/trades.svg",
          routeNames: ["MoreInfoTrades"],
          defaultRoute: "MoreInfoTrades",
        },
        {
          name: "Banned Skins",
          icon: "/img/icons/banned.svg",
          routeNames: ["BannedSkins"],
          defaultRoute: "BannedSkins",
        },
        {
          name: "Affiliate History",
          icon: "/img/icons/affiliate.svg",
          routeNames: ["MoreInfoAffiliates"],
          defaultRoute: "MoreInfoAffiliates",
        },
        {
          name: "Rewards History",
          icon: "/img/icons/reward.svg",
          routeNames: ["MoreInfoRewards"],
          defaultRoute: "MoreInfoRewards",
        },
        {
          name: "Stats",
          icon: "/img/icons/stats.svg",
          routeNames: ["MoreInfoStats"],
          defaultRoute: "MoreInfoStats",
        },
        {
          name: "Logs",
          icon: "/img/icons/logs.svg",
          routeNames: ["MoreInfoLogs"],
          defaultRoute: "MoreInfoLogs",
        },
        {
          name: "Chat History",
          icon: "/img/icons/chat.svg",
          routeNames: ["MoreInfoChats"],
          defaultRoute: "MoreInfoChats",
        },
        {
          name: "Transaction History",
          icon: "/img/icons/transaction.svg",
          routeNames: ["MoreInfoTransaction"],
          defaultRoute: "MoreInfoTransaction",
        },
      ],
    };
  },
};
</script>
