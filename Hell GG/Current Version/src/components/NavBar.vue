<template>
  <div
    class="w-full fixed top-0 left-0 h-[105px] sm:h-[9.9rem] nav px-[1rem] flex justify-center z-10"
  >
    <div class="relative w-full flex justify-center h-full">
      <div class="absolute top-0">
        <img
          @click="goToHome()"
          src="../assets/logo.svg"
          class="pt-2 relative z-[999] xl:pt-2 2xl:pt-2 sm:pt-0 w-[149px] sm:w-auto xl:w-[240px] 2xl:w-auto select-none cursor-pointer"
        />
      </div>

      <div
        class="flex w-full justify-between items-center h-[50px] sm:h-[4.8rem] gap-[1rem] desktop-links-wrap"
      >
        <div class="relative mobile-menu-toggle-wrap">
          <div
            class="toggle flex items-center justify-center relative w-6 min-h-[2.5rem] rounded-[5px] overflow-hidden cursor-pointer"
            @click="toggleDropdown('mobile nav')"
            :class="{ active: toggled_dropdown == 'mobile nav' }"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div
            class="absolute top-full mt-2 left-0 -ml-px bg-[#420101] z-10 rounded-sm flex flex-col items-start ps-3 gap-y-1"
            :class="{
              'py-0 h-0 w-0 border border-solid border-transparent invisible':
                toggled_dropdown != 'mobile nav',
              ' min-h-max min-w-[183px] py-2 visible border-[0.5px] border-solid border-[#FF3435]':
                toggled_dropdown == 'mobile nav',
            }"
          >
            <button
              v-for="link in navLinks"
              :key="link.id"
              class="navbar-link"
              :class="[`nav-link-${link.id}`, { active: $route.name === link.name }]"
              @click="handleNav(link)"
            >
              <span>{{ link.label }}</span>
              <div v-if="link.count" class="count-badge">{{ link.count }}</div>
            </button>
          </div>
        </div>

        <div class="w-full flex items-center gap-[14px]">
          <router-link
            v-for="link in leftMenuLinks"
            :key="link.id"
            :to="{ name: link.name }"
            class="navbar-link"
            :class="`nav-link-${link.id}`"
            active-class="active"
          >
            <span>{{ link.label }}</span>
            <div v-if="link.count" class="count-badge">{{ link.count }}</div>
          </router-link>
        </div>
        <!-- Start Mobile Menu Toggle -->

        <!--End Mobile Menu Toggle  -->
        <!-- End Left -->
        <!-- Center -->
        <div
          class="w-1/4 bg-blue-500 xl:w-full max-w-[350px] flex items-center justify-start xl:justify-between"
        ></div>
        <!-- End Center -->
        <!-- Right -->
        <div
          class="w-2/3 xl:w-full flex items-center justify-end xl:justify-end h-[40px] gap-[1rem]"
        >
          <div class="w-full flex items-center justify-end gap-[14px]">
            <template v-for="link in rightMenuLinks" :key="link.id">
              <router-link
                v-if="!link.modal"
                :to="{ name: link.name }"
                class="navbar-link"
                :class="`nav-link-${link.id}`"
                active-class="active"
              >
                <span>{{ link.label }}</span>
                <div v-if="link.count" class="count-badge">{{ link.count }}</div>
              </router-link>
              <div
                v-else
                class="navbar-link"
                :class="`nav-link-${link.id}`"
                @click="openModal(link.modal)"
              >
                <span>{{ link.label }}</span>
              </div>
            </template>
          </div>
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
                BreadYoutube
              </span>
            </div>

            <div class="text-black z-20">
              <ChevronDownIcon
                :class="{
                  '-rotate-180 stroke-[#D7B7B7]': userDropdown,
                  'stroke-[#FF3435]': !userDropdown,
                }"
                class="w-[20px] stroke-2 cursor-pointer transition-all"
              />
            </div>
            <div
              class="absolute -top-2 left-0 right-0 w-[calc(100%+2px)] -ml-px bg-[#420101] z-10 rounded-sm transition-all flex flex-col items-center gap-y-1"
              :class="{
                'pt-0 h-0 border border-solid border-transparent invisible': !userDropdown,
                'pt-14 h-[29rem] 2xl:h-[26.2rem] visible border-[0.5px] border-solid border-[#FF3435]': userDropdown,
              }"
            >
              <div
                class="flex 2xl:hidden items-center w-[calc(100%-16px)] bg-[#00000080] p-1 h-10 backdrop-blur-[16px]"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown,
                }"
              >
                <div
                  class="w-full pl-[0.5rem] font-Rubik text-base text-white font-semibold xl:font-bold"
                >
                  <span class="mr-0.5 font-bold text-[#04AB53]">$</span>
                  {{
                    Number(123).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
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
                  'opacity-100 duration-700': userDropdown,
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
                  'opacity-100 duration-700': userDropdown,
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
                  'opacity-100 duration-700': userDropdown,
                }"
              >
                <img
                  src="../assets/icons/game_history.svg"
                  class="w-[16px] stroke-white"
                />
                Game history
              </div>
              <div
                @click="openModal('profile', 'transactions')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown,
                }"
              >
                <img
                  src="../assets/icons/transactions.svg"
                  class="w-[16px] stroke-white"
                />
                Transactions
              </div>
              <div
                @click="openModal('profile', 'affiliates')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown,
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
                  'opacity-100 duration-700': userDropdown,
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
                  'opacity-100 duration-700': userDropdown,
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
                  'opacity-100 duration-700': userDropdown,
                }"
              >
                <CurrencyDollarIcon class="w-[16px] stroke-white" />
                Sponsorship
              </div>

              <div
                class="px-2"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown,
                }"
              >
                <div class="h-[1px] bg-[#ff3435]"></div>
              </div>
              <div
                to="/"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:opacity-100 w-full text-[#ff3435] font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': !userDropdown,
                  'opacity-100 duration-700': userDropdown,
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
                  'stroke-[#FF3435]': toggled_dropdown != 'mobile user',
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
                  toggled_dropdown == 'mobile user',
              }"
            >
              <!--wallet mobile-->
              <div
                class="flex items-center w-[calc(100%-16px)] bg-[#00000080] p-1 h-10 backdrop-blur-[16px]"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
                }"
              >
                <div
                  class="w-full pl-[0.5rem] font-Rubik text-[16px] text-white font-bold"
                >
                  <span class="mr-0.5 font-bold text-[#04AB53]">$</span>
                  {{
                    Number(123).toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
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
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
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
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
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
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
                }"
              >
                <img
                  src="../assets/icons/game_history.svg"
                  class="w-[16px] stroke-white"
                />
                Game history
              </div>
              <div
                @click="openModal('profile', 'transactions')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
                }"
              >
                <img
                  src="../assets/icons/transactions.svg"
                  class="w-[16px] stroke-white"
                />
                Transactions
              </div>

              <div
                @click="openModal('profile', 'affiliates')"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:bg-[#E82D2E] hover:text-white hover:opacity-100 w-full text-white font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
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
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
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
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
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
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
                }"
              >
                <CurrencyDollarIcon class="w-[16px] stroke-white" />
                Sponsorship
              </div>
              <div
                class="px-2"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
                }"
              >
                <div class="h-[1px] bg-[#ff3435]"></div>
              </div>
              <div
                to="/"
                class="px-2 py-2 flex cursor-pointer text-left items-center hover:opacity-100 w-full text-[#ff3435] font-medium text-sm font-Rubik gap-x-1 transition-opacity duration-700"
                :class="{
                  'opacity-0 duration-75': toggled_dropdown != 'mobile user',
                  'opacity-100 duration-700': toggled_dropdown == 'mobile user',
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
import {
  ChevronDownIcon,
  NoSymbolIcon,
  CurrencyDollarIcon,
} from "@heroicons/vue/24/outline";
import { openModal } from "@/modalStore";
import { UserGroupIcon, Cog8ToothIcon } from "@heroicons/vue/24/solid";
import router from "@/router";

export default {
  components: {
    ChevronDownIcon,
    UserGroupIcon,
    NoSymbolIcon,
    Cog8ToothIcon,
    CurrencyDollarIcon,
  },
  data() {
    return {
      coinflip: 124.2,
      jackpot: 2524.06,
      mobileDropdown: false,
      activeModal: null,
      userDropdown: false,
      toggled_dropdown: null,
      leftMenuLinks: [
        { id: 1, name: "dashboard", label: "Dashboard" },
        { id: 2, name: "users", label: "Users" },
        { id: 3, name: "SupportPanal", label: "Support", count: 9 },
        { id: 4, name: "prices", label: "Prices" },
        { id: 5, name: "games_coinflip", label: "Games" },
        { id: 6, name: "trades", label: "Trades" },
        { id: 7, name: "bots", label: "Bots" },
        { id: 8, name: "admin_shop", label: "Shop" },
        { id: 9, name: "affiliates", label: "Affiliates" },
      ],
      rightMenuLinks: [
        { id: 10, name: "banned_skins", label: "SKINS" },
        { id: 11, name: "filters", label: "Filters" },
        { id: 12, name: "logs", label: "Logs" },
        { id: 13, name: "rewards", label: "Rewards" },
        { id: 14, modal: "1st download authApp", label: "2FA" },
        { id: 15, modal: "sponsor modal", label: "Sponsor" },
        { id: 16, name: "CaseCreator", label: "Case Creator" },
        { id: 17, name: "HOF", label: "HOF" },
      ],
      navLinks: [
        { id: 1, name: "dashboard", label: "Dashboard" },
        { id: 2, name: "users", label: "Users" },
        { id: 3, name: "SupportPanal", label: "Support", count: 9 },
        { id: 4, name: "prices", label: "Prices" },
        { id: 5, name: "games_coinflip", label: "Games" },
        { id: 6, name: "trades", label: "Trades" },
        { id: 7, name: "bots", label: "Bots" },
        { id: 8, name: "admin_shop", label: "Shop" },
        { id: 9, name: "affiliates", label: "Affiliates" },
        { id: 10, name: "banned_skins", label: "SKINS" },
        { id: 11, name: "filters", label: "Filters" },
        { id: 12, name: "logs", label: "Logs" },
        { id: 13, name: "rewards", label: "Rewards" },
        { id: 14, modal: "1st download authApp", label: "2FA" },
        { id: 15, modal: "sponsor modal", label: "Sponsor" },
        { id: 16, name: "CaseCreator", label: "Case Creator" },
        { id: 17, name: "HOF", label: "HOF" },
      ],
    };
  },
  methods: {
    goToHome() {
      router.push("/");
    },
    handleNav(link) {
      if (link.modal) {
        this.openModal(link.modal);
      } else if (link.path) {
        this.$router.push(link.path);
      } else if (link.name) {
        this.$router.push({ name: link.name });
      }
      this.toggled_dropdown = null;
    },
    openModal(modalName) {
      openModal(modalName);
      this.toggled_dropdown = null; // close dropdown as well
    },
    toggleDropdown(name) {
      if (this.toggled_dropdown == null) {
        this.toggled_dropdown = name;
      } else {
        this.toggled_dropdown = null;
      }
    },
    closeModal() {
      this.activeModal = null;
    },
  },
};
</script>
<style scoped>
.navbar-link {
  display: flex;
  align-items: center;
  gap: 8px;
}
.navbar-link span {
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 700;
  color: white;
  opacity: 0.6;
  white-space: nowrap;
  font-family: "rubik";
  cursor: pointer;
}
.navbar-link .count-badge {
  background-color: #ff3435;
  font-size: 12px;
  color: white;
  border-radius: 100px;
  font-weight: 700;
  opacity: 1 !important;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}
.navbar-link .count-badge:hover {
  transform: unset !important;
}
.navbar-link.active span {
  opacity: 1;
}

.nav {
  background-image: url(../assets/img/HELLGG_HEADER_IMAGE.png);
  background-size: fill;
  background-repeat: repeat-x;
  background-position-x: center;

}
.mobile-menu-toggle-wrap {
  display: none;
}
.mobile-menu-toggle-wrap .navbar-link {
  display: none;
}
/* Media Query 1023px - Hide last 2 left menu items */
@media (max-width: 1023px) {
  /* to hide */
  .desktop-links-wrap .nav-link-1,
  .desktop-links-wrap .nav-link-3,
  .desktop-links-wrap .nav-link-10 {
    display: none;
  }
  /* to show */
  .mobile-menu-toggle-wrap .nav-link-1,
  .mobile-menu-toggle-wrap .nav-link-3,
  .mobile-menu-toggle-wrap .nav-link-10 {
    display: flex;
  }
}
/* Media Query 1100px - Hide last 2 left menu items */
@media (max-width: 1100px) {
  /* to hide */
  .desktop-links-wrap .nav-link-2,
  .desktop-links-wrap .nav-link-11 {
    display: none;
  }
  /* to show */
  .mobile-menu-toggle-wrap .nav-link-2,
  .mobile-menu-toggle-wrap .nav-link-11 {
    display: flex;
  }
}
/* Media Query 1199px - Hide last 2 left menu items */
@media (max-width: 1199px) {
  /* to hide */
  .desktop-links-wrap .nav-link-4,
  .desktop-links-wrap .nav-link-10,
  .desktop-links-wrap .nav-link-12 {
    display: none;
  }
  /* to show */
  .mobile-menu-toggle-wrap .nav-link-4,
  .mobile-menu-toggle-wrap .nav-link-10,
  .mobile-menu-toggle-wrap .nav-link-12 {
    display: flex;
  }
}

/* Media Query 1440px - Hide last 2 right menu items */
@media (max-width: 1440px) {
  /* to hide */
  .desktop-links-wrap .nav-link-5,
  .desktop-links-wrap .nav-link-13 {
    display: none;
  }
  /* to show */
  .mobile-menu-toggle-wrap .nav-link-5,
  .mobile-menu-toggle-wrap .nav-link-13 {
    display: flex;
  }
}

/* Media Query 1550px - Additional hiding */
@media (max-width: 1550px) {
  /* to hide */
  .desktop-links-wrap .nav-link-6,
  .desktop-links-wrap .nav-link-14 {
    display: none;
  }
  /* to show */
  .mobile-menu-toggle-wrap .nav-link-6,
  .mobile-menu-toggle-wrap .nav-link-14 {
    display: flex;
  }
}

/* Media Query 1800px - Show hidden items in toggle menu */
@media (max-width: 1800px) {
  /* to hide */
  .desktop-links-wrap .nav-link-7,
  .desktop-links-wrap .nav-link-8,
  .desktop-links-wrap .nav-link-15 {
    display: none;
  }
  /* to show */
  .mobile-menu-toggle-wrap .nav-link-7,
  .mobile-menu-toggle-wrap .nav-link-8,
  .mobile-menu-toggle-wrap .nav-link-15 {
    display: flex;
  }
}
/* Media Query 2100px - Show hidden items in toggle menu */
@media (max-width: 2100px) {
  .mobile-menu-toggle-wrap {
    display: flex;
  }
  /* to hide */
  .desktop-links-wrap .nav-link-17,
  .desktop-links-wrap .nav-link-16,
  .desktop-links-wrap .nav-link-9 {
    display: none;
  }
  /* to show */
  .mobile-menu-toggle-wrap .nav-link-17,
  .mobile-menu-toggle-wrap .nav-link-16,
  .mobile-menu-toggle-wrap .nav-link-9 {
    display: flex;
  }
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
  filter: url("#flt_tag");
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
