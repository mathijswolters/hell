<template>
  <div class="bg-[#430101] w-full flex flex-col items-center gap-4 relative h-full pb-[60px]">
    <div
      class="w-full flex justify-between 2xl:flex-row flex-col-reverse gap-2 mb-2 border-b border-b-[#ff343580]"
    >
      <div class="flex gap-2 items-center">
        <TableFilters
          :search="{ value: searchQuery, placeholder: 'SEARCH STEAM ID...' }"
          :filters="filterOptions"
          @search="searchQuery = $event"
          @update-filter="updateFilter"
        />
      </div>

      <div class="flex gap-2 items-center">
        <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] whitespace-nowrap bg-[#FF3435] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
        <router-link
          :to="{ name: 'CaseStatsAll' }"
          class="text-[16px] font-[800] whitespace-nowrap bg-[#FEBD11] px-[16px] py-3 text-white"
        >
          CASE STATS
        </router-link>
        <button class="text-[16px] font-[800] whitespace-nowrap bg-[#04AA53] px-[16px] py-3 text-white">
          REFRESH
        </button>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-[24px] w-full">
      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/case.svg"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">
          Reward Case (LvL 5)
        </p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/chest.png"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">Jackpot Case</p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/case.svg"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">
          Reward Case (LvL 5)
        </p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/chest.png"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">Jackpot Case</p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/case.svg"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">
          Reward Case (LvL 5)
        </p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/chest.png"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">Jackpot Case</p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/case.svg"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">
          Reward Case (LvL 5)
        </p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/chest.png"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">Jackpot Case</p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/case.svg"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">
          Reward Case (LvL 5)
        </p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/chest.png"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">Jackpot Case</p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/case.svg"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">
          Reward Case (LvL 5)
        </p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/chest.png"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">Jackpot Case</p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/case.svg"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">
          Reward Case (LvL 5)
        </p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/chest.png"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">Jackpot Case</p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/case.svg"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#FF3435]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">
          Reward Case (LvL 5)
        </p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>

      <div
        class="bg-[#690405] w-[172px] px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
      >
        <div class="flex justify-between items-center gap-2 flex-wrap">
          <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
          <p class="text-[14px] font-[600] text-white">
            <span class="text-[#04AA53] text-[14px] font-[600]">$</span>21.21
          </p>
        </div>

        <img
          src="/img/icons/chest.png"
          alt="img"
          width="80"
          height="80"
          class="mx-auto p-3"
        />

        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">12</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$21.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
        </div>
        <div
          class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
        >
          <p class="text-[14px] font-[600] text-white">110</p>
          <p class="text-[14px] font-[600] text-[#04AA53]">$121.21</p>
          <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
        </div>
        <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">Jackpot Case</p>
          <router-link
          :to="{ name: 'CaseEdit' }"
          class="text-center text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white"
        >
          EDIT CASE
        </router-link>
      </div>
    </div>

    <div class="w-full absolute bottom-0 left-0">
      <TablePagination :total-items="items.length" @page-changed="onPageChanged" />
    </div>
  </div>
</template>

<script>
import TableFilters from "@/components/table/TableFilters.vue";
import TablePagination from "@/components/table/TablePagination.vue";

export default {
  name: "CasesPage",
  components: {
    TableFilters,
    TablePagination,
  },
  data() {
    return {
      page: 1,
      rows: 10,
      searchQuery: "",
      filterOptions: {
        filter_by: {
          label: "FILTER",
          selected: "NAME",
          items: ["NAME", "SENDER STEAM ID", "FILTER #3", "FILTER #4", "FILTER #5"],
        },
        order: {
          label: "Order",
          selected: "DEFAULT",
          items: ["DEFAULT", "ASC", "DESC"],
        },
        order_by: {
          label: "ORDER BY",
          selected: "ASC",
          items: ["ASC", "DESC"],
        },
      },
      selectedItems: [],
      items: Array.from({ length: 60 }, (_, index) => {
        const templates = [
          { name: "WEAPON B...", image: "/img/ranks/21-25.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/hell.svg", price: 44 },
          { name: "WEAPON B...", image: "/img/ranks/16-19.png", price: 44 },
          { name: "WEAPON B...", image: "/img/coins/heaven.svg", price: 44 },
        ];

        const template = templates[index % templates.length];

        return {
          id: index + 1,
          ...template,
          is_banned: index % 2 === 0,
        };
      }),
    };
  },
  computed: {
    totalPrice() {
      return this.items
        .filter((item) => this.selectedItems.includes(item.id))
        .reduce((sum, item) => sum + Number(item.price), 0);
    },
  },
  methods: {
    updateFilter({ key, value }) {
      this.filterOptions[key].selected = value;
    },
    toggleItemSelection(itemId) {
      const item = this.items.find((i) => i.id === itemId);
      if (item.is_banned) return;

      const index = this.selectedItems.indexOf(itemId);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
      } else {
        this.selectedItems.push(itemId);
      }
    },
    onPageChanged({ page, rows }) {
      this.page = page;
      this.rows = rows;
    },
  },
};
</script>

<style scoped></style>
