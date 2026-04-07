<template>
  <div
    class="w-full fixed top-0 left-0 h-[105px] sm:h-[9.9rem] nav px-[1rem] flex justify-center z-10"
  >
    <div class="relative w-full flex justify-center h-full">
      <div class="absolute top-0">
        <img
          @click="goToHome()"
          src="../assets/logo.svg"
          class="pt-2 xl:pt-2 2xl:pt-2 sm:pt-0 w-[149px] sm:w-auto xl:w-[240px] 2xl:w-auto select-none cursor-pointer"
        />
      </div>

      <div class="flex w-full justify-between items-center h-[50px] sm:h-[4.8rem] gap-[2rem]">
        <!-- Left -->
        <div class="w-full hidden xl:flex items-center gap-[1rem]">
          <button class="box_parent">
            <div
              class="box2 bg-[#04AB53] flex items-center text-white pl-[1rem] pr-[2rem] h-[40px] font-Rubik_One text-lg whitespace-nowrap"
              @click="openModal('freecoins')"
            >
              FREE COINS
            </div>

            <svg class="flt_svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
                </filter>
              </defs>
            </svg>
          </button>
          <!-- <router-link to="/" class="text-white font-Rubik_One text-lg ml-[-0.5rem]"
          >CHALLENGES</router-link
        > -->
          <router-link
            to="/leaderboard"
            class="text-white font-Rubik_One text-lg flex items-center gap-[1rem]"
            >LEADERBOARD
          </router-link>
          <router-link
            to=""
            @click="openModal('hall of fame')"
            class="relative flex items-center justify-center"
          >
            <img src="../assets/icons/cup.svg" class="w-[30px]" />
            <span
              class="absolute drop-shadow-2xl text-white z-10 font-Rubik font-bold"
              style="text-shadow: 0px 2px 2px rgb(0, 0, 0, 0.5)"
              >HOF</span
            >
          </router-link>
        </div>
        <!-- Start Mobile Menu Toggle -->
        <div class="relative">
          <div
            class="toggle xl:hidden flex items-center justify-center relative w-6 h-[2.5rem] rounded-[5px] overflow-hidden cursor-pointer"
            @click="toggleDropdown('mobile nav')"
            :class="{ active: toggled_dropdown == 'mobile nav' }"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            class="absolute top-full mt-2 left-0 -ml-px bg-[#420101] z-10 rounded-sm transition-all flex flex-col items-center gap-y-1"
            :class="{
              'py-0 h-0 w-0 border border-solid border-transparent invisible':
                toggled_dropdown != 'mobile nav',
              ' h-[230px] w-[183px] py-2 visible border-[0.5px] border-solid border-[#FF3435]':
                toggled_dropdown == 'mobile nav'
            }"
          >
            <router-link
              to="/"
              @click="toggleDropdown()"
              class="px-2 py-2 flex cursor-pointer text-left items-center w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity"
              :class="{
                'opacity-0 duration-75': toggled_dropdown != 'mobile nav',
                'opacity-100 duration-700': toggled_dropdown == 'mobile nav'
              }"
            >
              <img src="../assets/img/coins/coinflip.png" class="w-[16px]" />
              Coinflip
            </router-link>
            <router-link
              to="/jackpot"
              @click="toggleDropdown()"
              class="px-2 py-2 flex cursor-pointer text-left items-center w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity"
              :class="{
                'opacity-0 duration-75': toggled_dropdown != 'mobile nav',
                'opacity-100 duration-700': toggled_dropdown == 'mobile nav'
              }"
            >
              <img src="../assets/img/coins/jackpot.png" class="w-[16px]" />
              Jackpot
            </router-link>
            <div class="px-2 w-full">
              <div class="w-full mb-2 h-[0.5px] bg-[#ff3435]"></div>
            </div>
            <div class="w-full flex items-center justify-center px-1 pr-2">
              <div
                @click="toggleDropdown(), openModal('freecoins')"
                class="px-1 py-2 flex cursor-pointer text-left items-center w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700 bg-[rgba(4,171,83,0.5)] border-solid border border-[rgba(4,171,83,1)] rounded"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile nav',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile nav'
                }"
              >
                <img src="../assets/icons/freeCoins.png" class="w-[16px] fill-[#ff3435]" />
                Free Coins
              </div>
            </div>
            <div
              @click="openModal('hall of fame'), toggleDropdown()"
              class="px-2 py-2 flex cursor-pointer text-left items-center w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity"
              :class="{
                'opacity-0 duration-75': toggled_dropdown != 'mobile nav',
                'opacity-100 duration-700': toggled_dropdown == 'mobile nav'
              }"
            >
              <img src="../assets/img/cups/gold.png" class="w-4" />
              Hall of Fame
            </div>
            <router-link
              to="/leaderboard"
              @click="toggleDropdown()"
              class="px-2 py-2 flex cursor-pointer text-left items-center w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity"
              :class="{
                'opacity-0 duration-75': toggled_dropdown != 'mobile nav',
                'opacity-100 duration-700': toggled_dropdown == 'mobile nav'
              }"
            >
              <img src="../assets/img/coins/redDollar.png" />
              Leaderboard
            </router-link>
          </div>
        </div>

        <!--End Mobile Menu Toggle  -->
        <!-- End Left -->
        <!-- Center -->
        <div
          class="w-1/3 xl:w-full max-w-[600px] flex items-center justify-start xl:justify-between"
        >
          <router-link
            to="/jackpot"
            class="hidden xl:flex xl:-ml-6 2xl:-ml-2 flex-col gap-[0.2rem] items-center justify-center"
          >
            <div
              class="text-white font-Rubik font-black text-base 2xl:text-[20px] text-shadow leading-[20px]"
            >
              JACKPOT
            </div>
            <div
              class="text-[#FF3435] font-Rubik font-semibold text-shadow text-sm 2xl:text-[16px]"
            >
              $
              {{
                Number(jackpot).toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })
              }}
            </div>
          </router-link>
          <router-link
            to="/"
            class="hidden xl:flex -ml-6 flex-col gap-[0.2rem] items-center justify-center h-full"
          >
            <div
              class="text-white font-Rubik font-black text-base 2xl:text-[20px] text-shadow leading-[20px]"
            >
              COINFLIP
            </div>
            <div
              class="text-[#FF3435] font-Rubik font-semibold text-shadow text-sm 2xl:text-[16px]"
            >
              $
              {{
                Number(coinflip).toLocaleString(undefined, {
                  maximumFractionDigits: 2
                })
              }}
            </div>
          </router-link>
        </div>
        <!-- End Center -->
        <!-- Right -->
        <div
          class="w-2/3 xl:w-full flex items-center justify-end xl:justify-end h-[40px] gap-[1rem]"
        >
          <!-- Wallet -->
          <div
            class="hidden 2xl:flex items-center min-w-[14rem] bg-[#00000080] p-1 h-full backdrop-blur-[16px]"
          >
            <div class="w-full pl-[0.5rem] font-Rubik text-[16px] text-white font-bold">
              <span class="mr-0.5 font-bold text-[#04AB53]">$</span>
              {{
                Number(123).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })
              }}
            </div>
            <button
              class="bg-[#04AB53] h-full px-[0.75rem] rounded-sm text-white font-Rubik font-bold text-[16px]"
              @click="openModal('withdraw')"
            >
              WITHDRAW
            </button>
          </div>
          <!-- End Wallet -->
          <!-- User -->
          <div
            class="hidden lg:flex w-[268px] 2xl:w-fit items-center justify-between gap-[0.5rem] relative cursor-pointer select-none px-2 h-full z-50"
            @click="userDropdown = !userDropdown"
          >
            <div class="flex items-center gap-x-2 z-50">
              <img
                class="max-h-[28px] max-w-[28px] sm:max-h-[40px] sm:max-w-[40px] rounded-sm z-20"
                src="../assets/img/user/userImage.png"
              />
              <span
                class="hidden lg:flex items-center gap-[0.2rem] text-white font-Rubik font-bold text-[16px] z-20 h-full"
              >
                <img src="/img/ranks/1.png" class="max-w-6" />
                BREADISGAY
              </span>
            </div>

            <div class="text-black z-20">
              <ChevronDownIcon
                :class="{
                  '-rotate-180 stroke-[#D7B7B7]': userDropdown,
                  'stroke-[#FF3435]': !userDropdown
                }"
                class="w-[20px] stroke-2 cursor-pointer transition-all"
              />
            </div>
            <div
              class="absolute -top-2 left-0 right-0 w-[calc(100%+2px)] -ml-px bg-[#420101] z-10 rounded-sm transition-all flex flex-col items-center gap-y-1"
              :class="{
                'pt-0 h-0 border border-solid border-transparent invisible': !userDropdown,
                'pt-14 h-[29rem] 2xl:h-[26.2rem] visible border-[0.5px] border-solid border-[#FF3435]':
                  userDropdown
              }"
            >
              <div
                class="flex 2xl:hidden items-center w-[calc(100%-16px)] bg-[#00000080] p-1 h-10 backdrop-blur-[16px]"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <div
                  class="w-full pl-[0.5rem] font-Rubik text-base text-white font-semibold xl:font-bold"
                >
                  <span class="mr-0.5 font-bold text-[#04AB53]">$</span>
                  {{
                    Number(123).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })
                  }}
                </div>
                <button
                  class="bg-[#04AB53] h-full px-[0.75rem] rounded-sm text-white font-Rubik font-semibold xl:font-bold text-[16px]"
                  @click="openModal('withdraw')"
                >
                  WITHDRAW
                </button>
              </div>
              <div
                @click="openModal('profile', 'statistics')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <img src="../assets/icons/statistics.svg" class="w-[16px] stroke-white" />
                Statistics
              </div>
              <div
                @click="openModal('profile', 'settings')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <Cog8ToothIcon class="w-[16px] full-white" />
                Settings
              </div>
              <div
                @click="openModal('profile', 'game history')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <img src="../assets/icons/game_history.svg" class="w-[16px] stroke-white" />
                Game history
              </div>
              <div
                @click="openModal('profile', 'transactions')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <img src="../assets/icons/transactions.svg" class="w-[16px] stroke-white" />
                Transactions
              </div>
              <div
                @click="openModal('profile', 'affiliates')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <UserGroupIcon class="w-[16px] fill-white" />
                Affiliates
              </div>
              <div
                @click="openModal('profile', 'ban your skins')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <div class="flex items-center justify-center w-4 h-4 relative">
                  <NoSymbolIcon class="w-[16px] stroke-white absolute opacity-70" />
                  <img
                    src="https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f"
                    class="min-w-6 w-6"
                  />
                </div>

                Ban your skins
              </div>
              <div
                @click="openModal('profile', 'self ban')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <NoSymbolIcon class="w-[16px] stroke-white" />
                Self ban
              </div>
              <div
                @click="openModal('profile', 'sponsorship')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <CurrencyDollarIcon class="w-[16px] stroke-white" />
                Sponsorship
              </div>

              <div
                class="px-2"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <div class="h-[1px] bg-[#ff3435]"></div>
              </div>
              <div
                to="/"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:opacity-100 w-full text-[#ff3435] font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown
                }"
              >
                <img src="../assets/icons/log_out.svg" class="w-[16px] fill-[#ff3435]" />
                Log out
              </div>
            </div>
          </div>
          <!-- End User -->
          <!--Start User Mobile-->
          <div
            class="flex lg:hidden items-center gap-[0.5rem] relative cursor-pointer select-none h-full z-50"
            @click="toggleDropdown('mobile user')"
          >
            <img
              class="max-h-[28px] max-w-[28px] sm:max-h-[40px] sm:max-w-[40px] rounded-sm z-20"
              src="../assets/img/user/userImage.png"
            />

            <div class="text-black z-20">
              <ChevronDownIcon
                :class="{
                  '-rotate-180 stroke-[#D7B7B7]': toggled_dropdown == 'mobile user',
                  'stroke-[#FF3435]': toggled_dropdown != 'mobile user'
                }"
                class="w-[20px] stroke-2 cursor-pointer transition-all"
              />
            </div>
            <div
              class="absolute top-full mt-2 right-0 -ml-px bg-[#420101] z-40 rounded-sm transition-all flex flex-col items-center gap-y-1"
              :class="{
                'py-0 h-0 w-0 border border-solid border-transparent invisible':
                  toggled_dropdown != 'mobile user',
                ' h-[26.5rem] w-[268px] py-2 visible border-[0.5px] border-solid border-[#FF3435]':
                  toggled_dropdown == 'mobile user'
              }"
            >
              <!--wallet mobile-->
              <div
                class="flex items-center w-[calc(100%-16px)] bg-[#00000080] p-1 h-10 backdrop-blur-[16px]"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <div class="w-full pl-[0.5rem] font-Rubik text-[16px] text-white font-bold">
                  <span class="mr-0.5 font-bold text-[#04AB53]">$</span>
                  {{
                    Number(123).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2
                    })
                  }}
                </div>
                <button
                  class="bg-[#04AB53] h-full px-[0.75rem] rounded-sm text-white font-Rubik font-bold text-[16px]"
                  @click="openModal('withdraw')"
                >
                  WITHDRAW
                </button>
              </div>
              <div
                @click="openModal('profile', 'statistics')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <img src="../assets/icons/statistics.svg" class="w-[16px] stroke-white" />
                Statistics
              </div>
              <div
                @click="openModal('profile', 'settings')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <Cog8ToothIcon class="w-[16px] full-white" />
                Settings
              </div>
              <div
                @click="openModal('profile', 'game history')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <img src="../assets/icons/game_history.svg" class="w-[16px] stroke-white" />
                Game history
              </div>
              <div
                @click="openModal('profile', 'transactions')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <img src="../assets/icons/transactions.svg" class="w-[16px] stroke-white" />
                Transactions
              </div>

              <div
                @click="openModal('profile', 'affiliates')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <UserGroupIcon class="w-[16px] fill-white" />
                Affiliates
              </div>
              <div
                @click="openModal('profile', 'ban your skins')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <div class="flex items-center justify-center w-4 h-4 relative">
                  <NoSymbolIcon class="w-[16px] stroke-white absolute opacity-50" />
                  <img
                    src="https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f"
                    class="min-w-5 w-5"
                  />
                </div>
                Ban your skins
              </div>
              <div
                @click="openModal('profile', 'self ban')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <NoSymbolIcon class="w-[16px] stroke-white" />
                Self ban
              </div>
              <div
                @click="openModal('profile', 'sponsorship')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <CurrencyDollarIcon class="w-[16px] stroke-white" />
                Sponsorship
              </div>
              <div
                class="px-2"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <div class="h-[1px] bg-[#ff3435]"></div>
              </div>
              <div
                to="/"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:opacity-100 w-full text-[#ff3435] font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user'
                }"
              >
                <img src="../assets/icons/log_out.svg" class="w-[16px] fill-[#ff3435]" />
                Log out
              </div>
            </div>
          </div>
          <!--End User Mobile-->
        </div>
        <!-- End Right -->
      </div>
    </div>
  </div>
</template>
<script>
import { ChevronDownIcon, NoSymbolIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline'
import { openModal } from '@/modalStore'
import { UserGroupIcon, Cog8ToothIcon } from '@heroicons/vue/24/solid'
import router from '@/router'

export default {
  components: {
    ChevronDownIcon,
    UserGroupIcon,
    NoSymbolIcon,
    Cog8ToothIcon,
    CurrencyDollarIcon
  },
  data() {
    return {
      coinflip: 124.2,
      jackpot: 2524.06,
      mobileDropdown: false,
      activeModal: null,
      userDropdown: false,
      toggled_dropdown: null
    }
  },
  methods: {
    goToHome() {
      router.push('/')
    },
    openModal(modalName, props) {
      openModal(modalName, props)
    },
    toggleDropdown(name) {
      if (this.toggled_dropdown == null) {
        this.toggled_dropdown = name
      } else {
        this.toggled_dropdown = null
      }
    },
    closeModal() {
      this.activeModal = null
    }
  }
}
</script>
<style scoped>
.nav {
  background-image: url(../assets/img/HELLGG_HEADER_IMAGE.png);

  background-size: fill;
  background-repeat: repeat-x;
  background-position-x: center;
}
.box2 {
  clip-path: polygon(0 0, 100% 0%, 85% 100%, 0% 100%);
  margin: 0 auto;
}

.flt_svg {
  visibility: hidden;
  position: absolute;
  width: 0px;
  height: 0px;
}

.box_parent {
  filter: url('#flt_tag');
}

.toggle span {
  position: absolute;
  height: 3px;
  background: #ff3435;
  width: 100%;
  transition: 250ms;
}
.toggle span:nth-child(1) {
  transform: translateY(-0.5rem);
  max-width: 100%;
}
.toggle span:nth-child(2) {
  transform: translateY(0.5rem);
  max-width: 100%;
}
.toggle.active span:nth-child(3) {
  transform: translateX(-2.2rem);
}
.toggle.active span:nth-child(1) {
  transform: translateY(0) rotate(45deg);
  max-width: 100%;
  transition-delay: 0.05s;
}
.toggle.active span:nth-child(2) {
  transform: translateY(0) rotate(-45deg);
  max-width: 100%;
  transition-delay: 0.05s;
}
@media (max-width: 640px) {
  .nav {
    background-image: url(../assets/img/NavigationBg_mobile.png);
    background-position-y: no-repeat;
  }
}
</style>
