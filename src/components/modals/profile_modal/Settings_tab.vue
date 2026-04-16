<template>
  <Transition
    name="modal"
    enter-active-class="transition-opacity duration-100"
    leave-active-class="transition-opacity duration-100"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    v-if="activeModal"
  >
    <div>
      <div
        v-if="activeModal == 'verification' && verfification_type != null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[#21010163] bg-opacity-50"
        @click.self="
          proceed_to_otp
            ? ''
            : ((verfification_type = null), (proceed_to_otp = false), (activeModal = null))
        "
      >
        <div class="backdrop-blur-xl">
          <div
            class="relative md:min-w-[684px] max-w-[684px] flex-col min-h-10 bg-[rgba(98,1,1,1)] backdrop-blur-[10px] border-[rgba(255,52,53,1)] rounded border overflow-hidden shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)]"
          >
            <XMarkIcon
              class="absolute w-5 fill-white top-2 right-2 cursor-pointer"
              @click="(activeModal = null), (verfification_type = null), (proceed_to_otp = false)"
            />
            <div v-if="proceed_to_otp" class="flex items-center flex-col gap-y-2 w-full p-4">
              <span class="capitalize font-Rubik text-xl font-semibold text-white text-center">
                Verify your {{ verfification_type }}
              </span>
              <span class="text-center font-Rubik text-base font-medium text-white"
                >Enter the 6 digit code we sent to your
                {{ verfification_type == 'email' ? 'email' : 'phone' }}.</span
              >
              <otp :digit-count="6" @update:otp="otpValue = $event"></otp>
              <span class="invisible -mt-1 mb-4 h-2 text-[rgba(255,52,53,1)] text-xs font-medium">
                incorrect code
              </span>
              <span class="cursor-pointer text-xs font-medium"> Resend Code</span>
            </div>
            <div v-else class="flex items-center flex-col gap-y-2 w-full p-4">
              <span class="text-center font-Rubik text-base font-medium text-white"
                >Are you sure that the
                {{ verfification_type == 'email' ? 'Email ' : 'Phone Number ' }}below is yours</span
              >

              <span class="cursor-pointer text-base font-bold text-[rgb(255,255,255,0.5)]">
                {{ verfification_type == 'email' ? email : phoneNumber }}</span
              >

              <div class="flex items-center gap-x-2 mt-4">
                <button
                  class="bg-[rgba(255,52,53,1)] h-8 px-4 flex items-center justify-center w-[122px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize"
                  @click="verfification_type = null"
                >
                  CANCEL
                </button>
                <button
                  class="bg-[rgba(4,171,83,1)] h-8 px-4 flex items-center justify-center w-[122px] rounded-sm text-[rgb(255,255,255,1)] font-Rubik font-medium text-base capitalize"
                  @click="proceed_to_otp = true"
                >
                  VERIFY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="activeModal == 'reduce tax rate'"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[#21010163] bg-opacity-50"
        @click.self="activeModal = null"
      >
        <div class="backdrop-blur-xl">
          <div
            class="relative md:min-w-[684px] max-w-[684px] flex-col transform min-h-10 transition-all bg-[rgba(98,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] rounded border overflow-hidden shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)]"
          >
            <XMarkIcon
              class="absolute w-5 fill-white top-2 right-2 cursor-pointer"
              @click="activeModal = null"
            />
            <div class="flex items-center flex-col gap-y-2 w-full p-4">
              <span class="text-white font-bold font-Rubik text-[28px]">REDUCE TAX RATE</span>
              <span class="flex items-center gap-2">
                <p class="text-[rgba(255,52,53,1)] font-bold font-Rubik text-[60px]">5%</p>
                <ArrowLongRightIcon class="w-16 fill-white" />
                <p class="text-[rgba(4,171,83,1)] font-bold font-Rubik text-[60px]">3%</p>
              </span>
              <span class="text-white font-bold font-Rubik text-sm opacity-50 text-center"
                >This will change your tax rate from 5% to 3% but not allow you to receive any
                rewards. <br />
                If you enable or/disable this setting you'll start from zero.</span
              >
              <button
                class="bg-[rgba(4,171,83,1)] h-9 text-white w-[130px] rounded-sm font-Rubik font-bold text-base"
                @click="(opt_out_rewards = true), (activeModal = null)"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="activeModal == 'choose items'"
        class="fixed inset-0 z-50 flex items-center justify-center bg-[#21010163] bg-opacity-50"
        @click.self="(activeModal = null), (selectedItems = [])"
      >
        <div class="backdrop-blur-xl">
          <div
            class="relative lg:min-w-[980px] xl:min-w-[1080px] max-w-[1080px] flex-col transform min-h-10 transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[rgba(255,52,53,1)] rounded border overflow-hidden shadow-[0_4px_4px_0px_rgba(0,0,0,0.5)]"
          >
            <XMarkIcon
              class="absolute w-5 fill-white top-4 right-4 cursor-pointer"
              @click="(activeModal = null), (selectedItems = [])"
            />
            <div
              class="flex items-center p-4 text-white font-Rubik text-base font-bold border-b border-b-solid border-b-[rgb(255,255,255,0.2)]"
            >
              SELECT ITEMS
            </div>
            <div class="flex flex-col gap-2 px-2">
              <div class="flex items-center justify-between w-full flex-wrap gap-2 mt-3">
                <div class="relative w-full sm:w-[300px] flex items-center">
                  <MagnifyingGlassIcon class="absolute left-2 w-[14.6px] stroke-[#d7b7b7]" />
                  <input
                    type="text"
                    class="h-[40px] bg-[#2f0101] pr-2 pl-8 w-full font-Rubik placeholder:font-Rubik placeholder:text-[#d7b7b7] text-white placeholder:text-sm text-sm focus:outline-none"
                    placeholder="Search for items..."
                    v-model="searchQuery"
                  />
                </div>
                <div class="flex items-center w-full sm:w-fit justify-end gap-x-2 relative">
                  <div
                    class="flex w-full sm:w-fit items-center gap-x-2 relative font-Rubik font-semibold text-sm text-white cursor-pointer select-none px-3 bg-[#770303CC] h-[40px] uppercase"
                    @click="toggleDropdown('sorting')"
                  >
                    <span class="font-Rubik font-semibold text-sm text-[#d7b7b7] whitespace-nowrap"
                      >SORT BY:</span
                    >
                    <div
                      class="flex w-full sm:w-[12.5rem] font-Rubik font-semibold text-sm text-white items-center justify-between"
                    >
                      {{ sort }}
                      <ChevronDownIcon
                        class="w-[12px] stroke-[#ff3435] transition-transform fill-[#ff3435]"
                        :class="{ '-rotate-180': openedDropdown == 'sorting' }"
                      />
                    </div>
                  </div>
                  <div
                    class="absolute w-full top-full left-0 bg-[#620101] flex flex-col gap-2 items-start dropdown_menu dropdown_menu-1 transition-all text-white"
                    :class="{
                      'h-[11.2rem] z-20': openedDropdown == 'sorting',
                      'h-0 z-0 opacity-0': openedDropdown != 'sorting'
                    }"
                  >
                    <div
                      class="p-2 cursor-pointer text-left hover:bg-[#E82D2E] w-full uppercase font-bold font-Rubik"
                      v-for="(item, index) in sorting"
                      :key="index"
                      @click="sort == item ? '' : (sort = item), (openedDropdown = null)"
                      :class="{ 'opacity-60 bg-[#e82d2e] cursor-default': item == sort }"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- Items Selection Start -->
              <div class="h-[20rem] sm:h-[30.5rem] w-full relative">
                <!-- <div
                  class="absolute h-10 -bottom-2.5 z-10 w-full max-w-[calc(100%)] opacity-90 bg-[linear-gradient(180deg,rgba(83,1,1,0)0%,#530101_100%)]"
                ></div> -->
                <div
                  class="overflow-auto grid w-full mt-2 pt-1 justify-center item gap-2 relative min-h-[17.6rem] h-auto max-h-full"
                  style="grid-template-columns: repeat(auto-fill, 120.5px)"
                >
                  <div
                    v-for="item in filteredItems"
                    :key="item._id"
                    @click="selectItem(item)"
                    class="w-[125.5px] h-[134px] flex flex-col items-center justify-center px-4 cursor-pointer hover:scale-[1.02] transition-all relative card"
                    :class="{
                      'bg-[#8F0E0E] ': isSelected(item),
                      'bg-[#690405]  ': !isSelected(item)
                    }"
                  >
                    <div class="relative w-[76px] h-[75px] flex items-center justify-center">
                      <img :src="item.image" class="max-w-[64px]" />
                    </div>

                    <span
                      class="w-full truncate text-center font-Rubik font-semibold text-[#d7b7b7] text-sm"
                      >{{ item.name }}</span
                    >
                    <span class="font-Rubik text-white text-base font-semibold"
                      >${{
                        Number(item.price).toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2
                        })
                      }}</span
                    >
                  </div>
                </div>
              </div>
              <!-- Items Selection End -->
              <div class="flex px-2 py-4 w-full justify-between items-center">
                <span class="font-Rubik font-bold text-white text-base"
                  >{{ selectedItems.length }}/50 Skins</span
                >
                <div class="flex items-center gap-x-2">
                  <PhoneIcon
                    :color="selectedItemsNotifications.phoneNumber ? '' : '#8F0E0E'"
                    @click="
                      () => {
                        selectedItemsNotifications.phoneNumber =
                          !selectedItemsNotifications.phoneNumber
                        updateSelectedNotifications(selectedItemsNotifications)
                      }
                    "
                    class="cursor-pointer mt-1"
                  />

                  <EnvelopeDynamiceIcon
                    :color="selectedItemsNotifications.message ? '' : '#8F0E0E'"
                    @click="
                      () => {
                        selectedItemsNotifications.message = !selectedItemsNotifications.message
                        updateSelectedNotifications(selectedItemsNotifications)
                      }
                    "
                    class="cursor-pointer mt-1"
                  />
                  <DiscordIcon
                    :color="selectedItemsNotifications.discord ? '' : '#8F0E0E'"
                    @click="
                      () => {
                        selectedItemsNotifications.discord = !selectedItemsNotifications.discord
                        updateSelectedNotifications(selectedItemsNotifications)
                      }
                    "
                    class="cursor-pointer mt-1"
                  />
                  <span
                    class="w-3.5 h-3.5 relative border border-solid border-white rounded-sm mb-1"
                    @click="
                      () => {
                        const newValue = !(
                          selectedItemsNotifications.discord ||
                          selectedItemsNotifications.message ||
                          selectedItemsNotifications.phoneNumber
                        )
                        selectedItemsNotifications.discord = newValue
                        selectedItemsNotifications.message = newValue
                        selectedItemsNotifications.phoneNumber = newValue
                        updateSelectedNotifications(selectedItemsNotifications)
                      }
                    "
                  >
                    <img
                      v-if="
                        selectedItemsNotifications.discord ||
                        selectedItemsNotifications.message ||
                        selectedItemsNotifications.phoneNumber
                      "
                      src="../../../assets/img/tick.png"
                      class="h-3.5 min-w-4 absolute bottom-0 select-none cursor-pointer"
                    />
                  </span>
                </div>
                <button
                  class="h-10 px-4 bg-[rgba(4,171,83,1)] font-Rubik text-base font-extrabold text-white"
                  @click="(finalSelectedItems = selectedItems), (activeModal = null)"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <div class="flex flex-col w-full gap-y-2 h-full min-h-full">
    <div class="grid lg:grid-cols-2 gap-y-4 w-full h-full">
      <!-- left settings -->

      <div class="flex flex-col gap-y-4 w-full lg:pr-4 relative h-full justify-start">
        <div
          class="hidden lg:flex absolute right-0 h-[95%] w-[0.5px] bg-[rgba(255,52,53,1)] opacity-50"
        ></div>
        <span class="font-Rubik font-bold text-2xl text-white">ACCOUNT</span>
        <div class="flex flex-col items-start w-full">
          <span class="font-Rubik font-bold text-white text-base">STEAM TRADE URL</span>
          <span class="font-medium font-Rubik text-[rgb(255,255,255,0.5)] text-sm"
            >Your trade URL is required to send you items. You can find it
            <a
              href="https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url"
              class="text-[rgba(255,52,53,1)] font-medium font-Rubik text-sm underline"
              target="_blank"
              rel="noopener noreferrer"
              >here.</a
            ></span
          >
          <div class="flex items-center gap-x-2 w-full mt-1">
            <input
              type="text"
              v-model="tradeUrlInput"
              placeholder="https://steamcommunity.com/..."
              autocomplete="off"
              class="w-full h-9 rounded-sm bg-[rgba(255,52,53,0.35)] outline-none px-2 font-Rubik font-medium text-sm text-white placeholder:text-white placeholder:opacity-50"
            />
            <button
              type="button"
              :disabled="savingTradeUrl"
              class="bg-[rgba(4,171,83,1)] h-9 min-h-[2.25rem] text-white w-[105px] rounded-sm font-Rubik font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
              @click="saveTradeUrl"
            >
              {{ savingTradeUrl ? '…' : 'Save' }}
            </button>
          </div>
          <span class="text-[rgba(255,52,53,1)] font-Rubik font-medium text-xs">Required</span>
        </div>
        <div class="flex flex-col items-start w-full">
          <span class="font-Rubik font-bold text-white text-base uppercase">muted users</span>
          <span class="font-medium font-Rubik text-white opacity-50 text-sm"
            >Chat messages from these users will not be shown to you.</span
          >
          <div class="flex items-center gap-x-2 w-full mt-1">
            <div
              class="bg-[rgba(255,52,53,0.35)] min-h-9 rounded-sm px-2 w-full flex flex-wrap gap-1.5 items-center"
            >
              <div class="flex flex-wrap gap-1.5 max-w-full overflow-x-auto py-1">
                <span
                  v-for="(user, index) in mutedUsers"
                  :key="index"
                  class="flex items-center whitespace-nowrap px-1 min-h-6 h-6 bg-[rgba(66,1,1,1)] rounded border border-solid border-[rgba(255,52,53,1)] gap-x-1 justify-between w-[119px]"
                >
                  <div
                    class="flex items-center gap-x-0.5 h-[16px] text-xs text-[rgb(255,255,255,0.5)] font-medium font-Rubik"
                  >
                    <div
                      class="w-[16px] h-[16px] rounded-sm bg-no-repeat bg-center bg-cover"
                      :style="{
                        backgroundImage: `url(${user.avatar})`
                      }"
                    ></div>
                    <img src="/img/ranks/15.png" class="h-3" />
                    {{ user.name }}
                  </div>

                  <button
                    class="text-[rgba(215,183,183,1)] text-base h-4 items-center flex mb-1"
                    @click="removeMutedUser(index)"
                  >
                    ×
                  </button>
                </span>
              </div>
              <div class="relative">
                <input
                  type="text"
                  v-model="usersQuery"
                  placeholder="@username..."
                  @input="filterSuggestions"
                  @keydown.down="highlightNext"
                  @keydown.up="highlightPrev"
                  @keydown.enter="addFromDropdown"
                  class="h-9 outline-none bg-transparent font-Rubik font-medium text-sm text-white placeholder:text-white placeholder:opacity-50 flex-1 max-w-full"
                />
                <div
                  class="absolute w-full left-0 top-full transition-all flex flex-col gap-y-1"
                  :class="{
                    ' h-0 bg-transparent  mt-0 ': !filteredSuggestions.length,
                    'w-full h-36  overflow-y-auto bg-[rgba(98,1,1,1)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.50)] mt-1 rounded pr-1 z-10 ':
                      filteredSuggestions.length
                  }"
                >
                  <div
                    v-for="suggestion in filteredSuggestions"
                    :key="suggestion"
                    @click="addMutedUser(suggestion)"
                    class="flex items-center w-full h-7 gap-x-1 text-white text-xs font-Rubik font-medium hover:bg-[rgba(255,52,53,1)] cursor-pointer px-2"
                  >
                    <!-- :class="{ highlighted: index === highlightedIndex }" -->
                    <div
                      class="w-[20px] h-[20px] rounded-sm bg-no-repeat bg-center bg-cover"
                      :style="{
                        backgroundImage: `url(${suggestion.avatar})`
                      }"
                    ></div>
                    <img src="/img/ranks/15.png" class="h-4" />
                    {{ suggestion.name }}
                  </div>
                </div>
              </div>
            </div>

            <button
              class="bg-[rgba(4,171,83,1)] h-9 text-white w-[105px] rounded-sm font-Rubik font-bold text-base"
              @click="addMutedUser(usersQuery)"
            >
              ADD
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between flex-wrap w-full">
          <span class="font-Rubik font-medium text-2xl text-white">LINKED ACCOUNTS</span>
          <!-- <label
            class="flex items-center relative pl-6 cursor-pointer text-base select-none radio mt-2"
          >
            <span class="checkmark" @click="promo = !promo">
              <img src="../../../assets/img/tick.png" v-if="promo" class="ml-[3px] -mt-[2px]"
            /></span>

            <span class="text-sm font-Rubik text-white font-medium opacity-50"
              >I want to receive promo codes & updates in the future
            </span>
          </label> -->
        </div>
        <span class="font-Rubik font-normal text-base text-white"
          >Receive free promo codes, important account updates and other rewards. We don't
          spam!</span
        >
        <div
          class="px-2 py-4 w-full flex items-center justify-between bg-[rgba(98,1,1,1)] rounded-sm border border-solid border-[rgba(255,52,53,1)]"
        >
          <div class="flex items-center gap-x-2">
            <img src="../../../assets/icons/discord.png" class="w-5" />
            <span class="font-Rubik font-bold text-base text-white">DISCORD</span>
          </div>
          <button
            class="bg-[rgba(4,171,83,1)] text-white w-[105px] rounded-sm font-Rubik font-bold text-base h-9"
          >
            LINK
          </button>
        </div>
        <div
          class="px-2 py-4 w-full flex flex-col gap-y-2 bg-[rgba(98,1,1,1)] rounded-sm border border-solid border-[rgba(255,52,53,1)]"
        >
          <div class="flex items-center flex-wrap justify-between">
            <div class="flex items-center gap-x-2">
              <EnvelopeIcon class="w-5 fill-[rgba(255,52,53,0.5)]" />
              <span class="font-Rubik font-bold text-base text-white">EMAIL</span>
            </div>
            <span class="font-Rubik text-sm text-white opacity-50 font-medium"
              >You will receive an email with a verification code</span
            >
          </div>
          <div class="flex items-center gap-x-2 w-full">
            <input
              type="email"
              v-model="email"
              placeholder="Type in your email"
              class="w-full h-9 rounded-sm bg-[rgba(255,52,53,0.35)] outline-none px-2 font-Rubik font-medium text-sm text-white placeholder:text-white placeholder:opacity-50"
            />
            <button
              class="bg-[rgba(4,171,83,1)] h-full text-white w-[105px] rounded-sm font-Rubik font-bold text-base"
              @click="
                email != '' ? ((verfification_type = 'email'), (activeModal = 'verification')) : ''
              "
            >
              VERIFY
            </button>
          </div>
        </div>
        <div
          class="px-2 py-4 w-full flex flex-col gap-y-2 bg-[rgba(98,1,1,1)] rounded-sm border border-solid border-[rgba(255,52,53,1)]"
        >
          <div class="flex items-center flex-wrap justify-between">
            <div class="flex items-center gap-x-2">
              <img src="../../../assets/icons/phone.png" class="w-4" />
              <span class="font-Rubik font-bold text-base text-white">PHONE NUMBER</span>
            </div>
            <span class="font-Rubik text-sm text-white opacity-50 font-medium"
              >You will receive a text message with a verification code</span
            >
          </div>
          <div class="flex items-center gap-x-2 w-full">
            <div class="relative h-full">
              <div
                class="h-full w-[79px] flex items-center justify-center gap-x-1 bg-[rgba(255,52,53,1)] px-2 text-base font-Rubik font-extrabold text-[rgb(255,255,255,1)] select-none cursor-pointer rounded-sm relative z-20"
                @click="
                  activeDropdown == 'country_codes'
                    ? (activeDropdown = null)
                    : (activeDropdown = 'country_codes')
                "
              >
                {{ selectedCountryCode }}
                <ChevronUpDownIcon
                  class="fill-white -rotate-180 stroke-white w-5 transition-all"
                  :class="{
                    '-rotate-0': activeDropdown == 'country_codes'
                  }"
                />
              </div>
              <div
                class="absolute w-full bg-[#620101] left-0 transition-all z-10 bottom-0 overflow-hidden rounded-b-sm search border border-solid border-[rgba(255,52,53,1)] rounded-t border-b-transparent"
                :class="{
                  ' h-0    mt-0 ': activeDropdown != 'country_codes',
                  'w-full h-56  mb-[36px]   ': activeDropdown == 'country_codes'
                }"
              >
                <div>
                  <input
                    placeholder="Search..."
                    v-model="countryCode_search"
                    @input="filterCountrycodesNumbers"
                    class="w-full h-9 rounded-sm bg-[rgba(255,52,53,0.35)] outline-none px-2 font-Rubik font-medium text-sm text-white placeholder:text-white placeholder:opacity-50"
                  />
                </div>
                <div class="h-full overflow-auto">
                  <div
                    v-for="(item, index) in filteredCountries"
                    :key="index"
                    class="rounded-sm hover:bg-[#E82D2E] min-h-[46px] h-[46px] px-2 flex items-center cursor-pointer gap-x-2 capitalize text-white font-Rubik font-extrabold text-base"
                    @click="(selectedCountryCode = item.dial_code), (activeDropdown = null)"
                  >
                    {{ item.dial_code }}
                  </div>
                </div>
              </div>
            </div>
            <input
              type="text"
              v-model="phoneNumber"
              @input="filterNumbers"
              max-length="10"
              placeholder="00 000 000"
              class="w-full h-9 rounded-sm bg-[rgba(255,52,53,0.35)] outline-none px-2 font-Rubik font-medium text-sm text-white placeholder:text-white placeholder:opacity-50"
            />
            <button
              class="bg-[rgba(4,171,83,1)] h-full text-white w-[105px] rounded-sm font-Rubik font-bold text-base"
              @click="
                phoneNumber != ''
                  ? ((verfification_type = 'number'), (activeModal = 'verification'))
                  : ''
              "
            >
              VERIFY
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-y-2 items-start w-full">
          <span
            class="font-Rubik flex font-bold text-white text-sm sm:text-base items-center gap-x-2 whitespace-nowrap"
            >OPT OUT OF REWARDS.
            <span class="opacity-50 text-[10px] sm:text-sm"> (Reduce tax rate to 3%)</span>
            <label
              class="flex items-center relative pl-6 cursor-pointer text-base select-none radio -mt-5"
            >
              <span
                class="checkmark"
                @click="
                  opt_out_rewards ? (opt_out_rewards = false) : (activeModal = 'reduce tax rate')
                "
              >
                <img
                  src="../../../assets/img/tick.png"
                  v-if="opt_out_rewards"
                  class="ml-[3px] -mt-[2px]"
              /></span>
            </label>
          </span>
          <span class="font-medium font-Rubik text-white opacity-50 text-sm"
            >This will change your tax rate from 5% to 3% but not allow you to receive any rewards.
            If you enable or/disable this setting you'll start from zero.</span
          >
        </div>
      </div>
      <!-- right settings -->
      <div class="flex flex-col gap-y-4 w-full lg:pl-4 relative h-full justify-start">
        <span class="font-Rubik font-bold text-2xl text-white">USER INTERFACE</span>
        <div class="relative">
          <div
            class="h-9 w-full flex items-center justify-between gap-x-1 bg-[rgba(98,1,1,1)] px-2 text-base font-Rubik font-extrabold text-[rgb(255,255,255,1)] select-none cursor-pointer rounded-sm relative z-20 border border-solid border-[rgba(255,52,53,1)] uppercase"
            @click="
              activeDropdown == 'chat_position'
                ? (activeDropdown = null)
                : (activeDropdown = 'chat_position')
            "
            :class="{
              'border-b-transparent hover:bg-[#E82D2E]': activeDropdown == 'chat_position'
            }"
          >
            CHAT ON THE {{ chat }} SIDE
            <ChevronDownIcon
              class="fill-white stroke-white w-5 transition-all"
              :class="{
                '-rotate-180': activeDropdown == 'chat_position'
              }"
            />
          </div>
          <div
            class="absolute w-full bg-[#620101] left-0 transition-all z-10 top-0 overflow-hidden rounded-b-sm search border border-solid border-[rgba(255,52,53,1)] rounded-t border-t-transparent"
            :class="{
              ' h-0    mt-0 ': activeDropdown != 'chat_position',
              'w-full h-22  pt-[36px]   ': activeDropdown == 'chat_position'
            }"
          >
            <div class="h-full overflow-auto">
              <div
                class="rounded-sm hover:bg-[#E82D2E] min-h-[36px] h-[36px] px-2 flex items-center cursor-pointer gap-x-2 text-white font-Rubik font-extrabold text-base uppercase"
                @click="
                  (activeDropdown = null),
                    chat_position.position == 'left' ? chatPosition('right') : chatPosition('left')
                "
              >
                CHAT ON THE {{ chat == 'left' ? 'right' : 'left' }} SIDE
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-y-3">
          <div
            class="font-Rubik font-bold flex items-center justify-between flex-wrap text-2xl text-white"
          >
            NOTIFICATIONS
            <span class="font-Rubik text-xs font-medium text-[rgba(255,52,53,1)]"
              >Link your Discord, email, or phone number in order to get notifications</span
            >
          </div>
          <div
            class="p-3 w-full flex flex-col gap-y-3 bg-[rgba(98,1,1,1)] rounded-sm border border-solid border-[rgba(255,52,53,1)]"
          >
            <!--- coinflip notification -->
            <div class="flex gap-y-2 flex-col">
              <div
                class="font-Rubik font-semibold flex items-center justify-between text-xs sm:text-sm text-white"
              >
                Get notified if coinflips over this amount are happening
                <Switch
                  v-model="coinflipNotification"
                  :class="[
                    coinflipNotification ? 'bg-[#04AB53]' : 'bg-[#FF3435]',
                    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none hover:translate-y-0'
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      coinflipNotification ? 'translate-x-4' : 'translate-x-0',
                      'pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out '
                    ]"
                  />
                </Switch>
              </div>

              <div class="relative">
                <div
                  class="h-9 w-full flex items-center justify-between gap-x-1 px-2 text-base font-Rubik font-extrabold text-[rgb(255,255,255,1)] select-none rounded-sm relative z-40 uppercase backdrop-blur-3xl border border-solid"
                  :class="{
                    'border-[rgba(255,52,53,1)] bg-[rgba(153,19,19,1)]    border-b-transparent ':
                      activeDropdown == 'coinflip notofications',
                    'border-transparent bg-[rgba(255,52,53,0.35)] ':
                      activeDropdown != 'coinflip notofications'
                  }"
                >
                  <div class="flex py-1 h-full w-full overflow-x-auto gap-x-2">
                    <div
                      class="h-full bg-[rgba(66,1,1,1)] border border-solid border-[rgba(255,52,53,1)] rounded-sm px-1 flex items-center gap-x-3 whitespace-nowrap"
                      v-for="item in selectedNotifications"
                      :key="item"
                    >
                      <span class="text-white opacity-50 text-[10px] font-Rubik font-medium">{{
                        item.title
                      }}</span>

                      <XMarkIcon
                        class="fill-[rgba(215,183,183,1)] cursor-pointer w-2.5"
                        @click="
                          (item.discord = false),
                            (item.message = false),
                            (item.phoneNumber = false),
                            updateSelectedNotifications(item)
                        "
                      />
                    </div>
                  </div>
                  <ChevronDownIcon
                    class="fill-white cursor-pointer stroke-white w-5 transition-all"
                    :class="{
                      '-rotate-180 z-50': activeDropdown == 'coinflip notofications'
                    }"
                    @click="
                      activeDropdown == 'coinflip notofications'
                        ? (activeDropdown = null)
                        : (activeDropdown = 'coinflip notofications')
                    "
                  />
                </div>
                <div
                  class="absolute w-full bg-[rgba(153,19,19,1)] backdrop-blur-3xl left-0 transition-all z-10 top-0 overflow-hidden rounded-b-sm search border border-solid border-[rgba(255,52,53,1)] rounded-t border-t-transparent"
                  :class="{
                    ' h-0    mt-0 border-transparent': activeDropdown != 'coinflip notofications',
                    'w-full h-[200px]  pt-[36px]  z-30 ': activeDropdown == 'coinflip notofications'
                  }"
                >
                  <div class="h-full overflow-auto">
                    <div
                      class="rounded-sm min-h-[36px] h-[36px] px-2 flex items-center gap-x-2 text-white font-Rubik font-medium text-sm uppercase justify-between"
                      v-for="(item, index) in notifications"
                      :key="index"
                    >
                      {{ item.title }}
                      <div class="flex items-center gap-x-2 h-full">
                        <PhoneIcon
                          :color="item.phoneNumber ? '' : 'rgba(66,1,1,1)'"
                          @click="
                            () => {
                              item.phoneNumber = !item.phoneNumber
                              updateSelectedNotifications(item)
                            }
                          "
                          class="cursor-pointer mt-1"
                        />

                        <EnvelopeDynamiceIcon
                          :color="item.message ? '' : 'rgba(66,1,1,1)'"
                          @click="
                            () => {
                              item.message = !item.message
                              updateSelectedNotifications(item)
                            }
                          "
                          class="cursor-pointer mt-1"
                        />
                        <DiscordIcon
                          :color="item.discord ? '' : 'rgba(66,1,1,1)'"
                          @click="
                            () => {
                              item.discord = !item.discord
                              updateSelectedNotifications(item)
                            }
                          "
                          class="cursor-pointer mt-1"
                        />
                        <span
                          class="w-3.5 h-3.5 relative border border-solid border-white rounded-sm mb-1"
                          @click="
                            () => {
                              const newValue = !(item.discord || item.message || item.phoneNumber)
                              item.discord = newValue
                              item.message = newValue
                              item.phoneNumber = newValue
                              updateSelectedNotifications(item)
                            }
                          "
                        >
                          <img
                            v-if="item.discord || item.message || item.phoneNumber"
                            src="../../../assets/img/tick.png"
                            class="h-3.5 min-w-4 absolute bottom-0 select-none cursor-pointer"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- items notification -->
            <div class="flex gap-y-2 flex-col">
              <div
                class="font-Rubik font-semibold flex items-center justify-between text-xs sm:text-sm text-white"
              >
                Get notified if these items are being gambled
                <Switch
                  v-model="itemsNotification"
                  :class="[
                    itemsNotification ? 'bg-[#04AB53]' : 'bg-[#FF3435]',
                    'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none hover:translate-y-0'
                  ]"
                >
                  <span
                    aria-hidden="true"
                    :class="[
                      itemsNotification ? 'translate-x-4' : 'translate-x-0',
                      'pointer-events-none inline-block size-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out '
                    ]"
                  />
                </Switch>
              </div>
              <div class="relative">
                <div
                  class="h-16 w-full max-w-[80vw] lg:max-w-full flex items-center gap-x-1 bg-[rgba(255,52,53,0.35)] px-2 text-base font-Rubik font-extrabold text-[rgb(255,255,255,1)] select-none cursor-pointer rounded-sm relative z-20 uppercase backdrop-blur-3xl border border-solid whitespace-nowrap border-transparent overflow-hidden"
                >
                  <img
                    v-for="item in finalSelectedItems"
                    :key="item._id"
                    :src="item.image"
                    class="max-w-[65px]"
                  />
                  <div
                    class="absolute h-full w-[50%] right-0 bg-[linear-gradient(90deg,rgba(153,19,19,0)_0%,#991313_70%)]"
                  ></div>
                  <button
                    class="bg-[rgba(4,171,83,1)] text-white w-[130px] absolute right-2 rounded-sm font-Rubik font-bold text-base h-9"
                    @click="(activeModal = 'choose items'), (selectedItems = finalSelectedItems)"
                  >
                    SELECT ITEMS
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-y-2 mt-2 mb-4">
            <div class="font-Rubik font-bold flex flex-col text-2xl text-white">
              FAIRNESS
              <span class="font-Rubik text-xs font-medium text-white"
                >Your server and client secret pair is what makes your games provably fair.</span
              >
            </div>
          </div>
          <div class="flex flex-col items-start w-full">
            <span class="font-medium font-Rubik text-white text-sm"
              >Current server seed(hashed)</span
            >
            <div class="flex items-center gap-x-2 w-full mt-1">
              <input
                type="text"
                placeholder="1J97PKZjDuZ91Vd3gP3bTdEBtaJ"
                class="w-full h-9 rounded-sm bg-[rgba(255,52,53,0.35)] outline-none px-2 font-Rubik font-medium text-sm text-white placeholder:text-white placeholder:opacity-50"
              />
            </div>
          </div>
          <div class="flex flex-col items-start w-full">
            <span class="font-medium font-Rubik text-white text-sm">Current client seed</span>
            <div class="flex items-center gap-x-2 w-full mt-1">
              <input
                type="text"
                placeholder="b1f56ty7n13tdr4n "
                class="w-full h-9 rounded-sm bg-[rgba(255,52,53,0.35)] outline-none px-2 font-Rubik font-medium text-sm text-white placeholder:text-white placeholder:opacity-50"
              />
            </div>
          </div>
          <div class="flex flex-col items-start w-full">
            <span class="font-medium font-Rubik text-white text-sm"
              >Amount of bets with this pair</span
            >
            <div class="flex items-center gap-x-2 w-full mt-1">
              <input
                type="text"
                v-model="amount_of_bets"
                @input="filterNumbersAmount"
                placeholder="0"
                class="w-full h-9 rounded-sm bg-[rgba(255,52,53,0.35)] outline-none px-2 font-Rubik font-medium text-sm text-white placeholder:text-white placeholder:opacity-50"
              />
            </div>
          </div>

          <div class="flex flex-col items-start w-full">
            <span class="font-Rubik font-bold text-white text-base uppercase"
              >new client secret
            </span>
            <span class="font-medium font-Rubik text-white opacity-50 text-sm"
              >Use this to change the outcome of rolls generated with your server seed.</span
            >
            <div class="flex items-center gap-x-2 w-full mt-1">
              <div class="flex items-center justify-center relative w-full">
                <input
                  type="text"
                  placeholder="Random words or characters"
                  class="w-full h-9 rounded-sm bg-[rgba(255,52,53,0.35)] outline-none px-2 pr-5 font-Rubik font-medium text-sm text-white placeholder:text-white placeholder:opacity-50"
                />
                <span
                  class="text-xs font-medium font-Rubik text-white cursor-pointer absolute right-0 px-2 flex items-center justify-center bg-[#7c1414] h-full"
                  >Generate</span
                >
              </div>

              <button
                class="bg-[rgba(255,52,53,1)] h-full text-white w-[105px] rounded-sm font-Rubik font-bold text-base"
              >
                CHANGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Switch } from '@headlessui/vue'
import otp from '../../OTP.vue'
import {
  XMarkIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  ChevronUpDownIcon,
  ArrowLongRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/vue/24/solid'
import { chatPosition, chat_position } from '@/chatStore'
import { countryCodes } from '@/assets/countryCodes'
import { openModalFromModal } from '@/modalStore'
import { getAuth, getSteamId, mergeAuth } from '@/auth/session'
import { updateTradeURL } from '@/services/jackpotClient'
import DiscordIcon from '../../icons/Discord.vue'
import PhoneIcon from '../../icons/Phone.vue'
import EnvelopeDynamiceIcon from '../../icons/Envelope.vue'
export default {
  setup() {
    return {
      chat_position
    }
  },
  name: 'support_modal',

  components: {
    XMarkIcon,
    EnvelopeIcon,
    ChevronDownIcon,
    ChevronUpDownIcon,
    Switch,
    otp,
    ArrowLongRightIcon,
    DiscordIcon,
    PhoneIcon,
    EnvelopeDynamiceIcon,
    MagnifyingGlassIcon
  },
  data() {
    return {
      selectedItemsNotifications: {
        phone: false,
        message: false,
        discord: false
      },
      proceed_to_otp: false,
      email: '',
      otpValue: '',
      verfification_type: null,
      opt_out_rewards: false,
      amount_of_bets: 0,
      itemsNotification: false,
      coinflipNotification: false,
      chat: 'left',
      countries: countryCodes,
      selectedCountryCode: countryCodes[0].dial_code,
      phoneNumber: '',
      promo: false,
      activeModal: null,
      activeDropdown: null,
      openedDropdown: null,
      notifications: [
        { title: '$0.01 - $5.00', phone: false, message: false, discord: false },
        { title: '$5.00 - $15.00', phone: false, message: false, discord: false },
        { title: '$15.00 - $45.00', phone: false, message: false, discord: false },
        { title: '$100 - $250', phone: false, message: false, discord: false },
        { title: '$250 - $750', phone: false, message: false, discord: false },
        { title: '$750 - $2,000', phone: false, message: false, discord: false },
        { title: '$2,000 - $5,000', phone: false, message: false, discord: false },
        { title: '$5,000 - $10,000', phone: false, message: false, discord: false },
        { title: '$10,000 +', phone: false, message: false, discord: false }
      ],
      inventory: [
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 900,
          _id: 1
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 10,
          _id: 11
        },

        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 40,
          _id: 10
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 9
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 1,
          _id: 8
        },
        {
          name: 'AK-47s',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 46,
          _id: 7
        },
        {
          name: 'AK-47t',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 90,
          _id: 6
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 5
        },
        {
          name: 'AK-47',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 130,
          _id: 4
        },
        {
          name: 'AK-47 banned ',
          image:
            'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
          price: 30,
          _id: 2,
          banned: true
        }
      ],
      sort: 'highest amount first',
      sorting: ['newest first', 'oldest first', 'highest amount first', 'lowest amount first'],
      searchQuery: '',
      selectedItems: [],
      finalSelectedItems: [],
      selectedNotifications: [],
      users: [
        {
          _id: 1,
          name: 'tester ',
          avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg'
        },
        {
          _id: 2,
          name: 'Bread ',
          avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg'
        },
        {
          _id: 3,
          name: 'Goku ',
          avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg'
        },
        {
          _id: 4,
          name: 'Vegita ',
          avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg'
        },
        {
          _id: 5,
          name: 'Gohan ',
          avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg'
        },
        {
          _id: 6,
          name: 'Piccolo ',
          avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg'
        }
      ],
      usersQuery: '',
      mutedUsers: [],
      highlightedIndex: -1,
      countryCode_search: '',
      tradeUrlInput: '',
      savingTradeUrl: false
    }
  },
  methods: {
    async saveTradeUrl() {
      const steamid = getSteamId()
      if (!steamid) {
        this.$toaster.error('You must be logged in with Steam.')
        return
      }
      const trade_url = String(this.tradeUrlInput ?? '').trim()
      if (!trade_url) {
        this.$toaster.error('Enter your Steam trade URL.')
        return
      }
      this.savingTradeUrl = true
      try {
        await updateTradeURL({ steamid, trade_url })
        mergeAuth({ trade_url })
        this.$toaster.success('Trade URL saved.')
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Could not save trade URL.'
        this.$toaster.error(msg)
      } finally {
        this.savingTradeUrl = false
      }
    },
    filterNumbers(event) {
      this.phoneNumber = event.target.value.replace(/\D/g, '').slice(0, 10)
    },
    filterCountrycodesNumbers(event) {
      let input = event.target.value

      input = input.replace(/[^+\d]/g, '')

      if (input.includes('+')) {
        input = '+' + input.replace(/\+/g, '')
      }

      input = input.startsWith('+')
        ? '+' + input.slice(1).replace(/\D/g, '').slice(0, 3)
        : input.replace(/\D/g, '').slice(0, 3)

      this.countryCode_search = input
    },
    filterNumbersAmount(event) {
      this.amount_of_bets = event.target.value.replace(/\D/g, '').slice(0, 3)
    },
    openModalFromModal(name, props) {
      openModalFromModal(name, props)
    },
    chatPosition(position) {
      this.chat = position
      chatPosition(this.chat)
    },
    toggleModal(name) {
      this.activeModal = name
    },

    setDuration(item) {
      this.ban_duration = item
      this.activeDropdown = null
    },
    validateField(field) {
      this.touched[field] = true
    },
    handleSubmit() {
      this.touched.email = true
      this.touched.message = true

      if (this.formValid) {
        console.log('Form submitted:', {
          email: this.email,
          message: this.message
        })
      }
    },
    toggleDropdown(dropdown) {
      if (this.openedDropdown == dropdown) {
        this.openedDropdown = null
      } else {
        this.openedDropdown = dropdown
      }
    },

    closeModal() {
      this.$emit('close-modal')
    },
    selectItem(item) {
      if (this.selectedItems.includes(item)) {
        this.selectedItems = this.selectedItems.filter((selectedItem) => selectedItem !== item)
      } else {
        this.selectedItems.push(item)
      }
    },
    isSelected(item) {
      return this.selectedItems.includes(item)
    },

    updateSelectedNotifications(item) {
      const index = this.selectedNotifications.findIndex(
        (notification) => notification.title === item.title
      )

      if (item.discord || item.message || item.phoneNumber) {
        // If the item has any true attributes, add it to selectedNotifications
        if (index === -1) {
          this.selectedNotifications.push(item)
        }
      } else {
        // If all attributes are false, remove it from selectedNotifications
        if (index !== -1) {
          this.selectedNotifications.splice(index, 1)
        }
      }
    },
    addMutedUser(user) {
      if (typeof user === 'string') {
        // If the input is text, search for a matching user in suggestions
        const matchedUser = this.filteredSuggestions.find(
          (u) => u.name.toLowerCase() === user.toLowerCase()
        )
        if (matchedUser) this.mutedUsers.push(matchedUser)
      } else if (!this.mutedUsers.some((u) => u._id === user._id)) {
        // Add user object directly if not already muted
        this.mutedUsers.push(user)
      }

      // Clear search query and reset highlighting
      this.usersQuery = ''
      this.highlightedIndex = -1
    },
    removeMutedUser(index) {
      this.mutedUsers.splice(index, 1)
    },
    filterSuggestions() {
      this.highlightedIndex = -1
    },
    highlightNext() {
      if (this.filteredSuggestions.length > 0) {
        this.highlightedIndex = (this.highlightedIndex + 1) % this.filteredSuggestions.length
      }
    },
    highlightPrev() {
      if (this.filteredSuggestions.length > 0) {
        this.highlightedIndex =
          (this.highlightedIndex - 1 + this.filteredSuggestions.length) %
          this.filteredSuggestions.length
      }
    },
    addFromDropdown() {
      if (this.highlightedIndex >= 0) {
        this.addMutedUser(this.filteredSuggestions[this.highlightedIndex])
      } else {
        this.addMutedUser(this.usersQuery)
      }
    }
  },
  mounted() {
    this.chat = chat_position.position
    const auth = getAuth()
    if (auth?.trade_url) this.tradeUrlInput = String(auth.trade_url)
    if (this.initialTab != '') {
      this.selectedTab = this.initialTab
    }

    this.position =
      this.selectedTab == 'statistics'
        ? 0
        : this.selectedTab == 'game history'
          ? 0.95
          : this.selectedTab == 'self ban'
            ? 2.1
            : this.selectedTab == 'settings'
              ? 2.9
              : this.selectedTab == 'transactions'
                ? 3.75
                : this.selectedTab == 'affiliates'
                  ? 4.9
                  : this.selectedTab == 'ban your skins'
                    ? 5.8
                    : 7.1
  },
  computed: {
    filteredCountries() {
      let search = this.countryCode_search.replace(/\D/g, '') // Remove non-numeric characters
      if (!search) return this.uniqueCountries

      return this.uniqueCountries.filter((item) => item.dial_code.includes(search))
    },
    uniqueCountries() {
      // Remove duplicate dial codes
      const seen = new Set()
      return this.countries.filter((item) => {
        if (seen.has(item.dial_code)) return false
        seen.add(item.dial_code)
        return true
      })
    },
    fullPhoneNumber() {
      return this.selectedCountryCode + this.phoneNumber
    },
    emailValid() {
      return /\S+@\S+\.\S+/.test(this.email)
    },
    messageValid() {
      return this.message.trim().length > 0
    },
    formValid() {
      return this.emailValid && this.messageValid
    },
    filteredItems() {
      const lowercaseQuery = this.searchQuery.toLowerCase()

      // Filter the items by the search query
      let filteredItems = this.inventory.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(lowercaseQuery)
        return matchesSearch
      })

      if (this.sort === 'newest first') {
        filteredItems = filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else if (this.sort === 'oldest first') {
        filteredItems = filteredItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      } else if (this.sort === 'highest amount first') {
        filteredItems = filteredItems.sort((a, b) => b.price - a.price) //
      } else if (this.sort === 'lowest amount first') {
        filteredItems = filteredItems.sort((a, b) => a.price - b.price) //
      }

      return filteredItems
    },
    filteredSuggestions() {
      if (this.usersQuery === '@') {
        return this.users.filter(
          (user) => !this.mutedUsers.some((mutedUser) => mutedUser._id === user._id)
        )
      }

      return this.usersQuery
        ? this.users.filter(
            (user) =>
              user.name.toLowerCase().includes(this.usersQuery.toLowerCase()) &&
              !this.mutedUsers.some((mutedUser) => mutedUser._id === user._id)
          )
        : []
    }
  }
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

.radio input {
  position: absolute;
  opacity: 0; /* Hide the default radio button */
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 2px solid #ff3435;
}

.checkmark::after {
  content: '';
  position: absolute;
  /* display: none; */
  opacity: 0;
  left: 3px;
  top: -2px;
  height: 14px;
  width: 16px;
  /* width: 5px;
    height: 10px; */
  /* border: solid white; */
  /* border-width: 0 2px 2px 0;
    transform: rotate(45deg); */
  z-index: 2;
  background-image: url(../../../assets/img/tick.png);
  background-size: contain;
  transition: opacity ease-in-out 100ms;
}

.radio input:checked ~ .checkmark::after {
  /* display: block; */
  opacity: 1;
}
</style>
