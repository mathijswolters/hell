<template>
  <div>
    <div
      class="relative w-full pb-2 max-w-[98vw] xl:min-w-[1238px] xl:max-w-[1238px] flex-col transform sm:h-[700px] h-full transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#530000] border overflow-hidden max-h-[90vh]"
    >
      <!-- Header Start -->
      <div
        class="flex justify-between w-full h-[59px] items-center border-solid border-b-2 border-[#620101] px-4"
      >
        <div
          class="flex flex-wrap w-[80%] sm:w-auto items-center h-full gap-6 relative"
          :style="{ '--position': position }"
        >
          <div
            class="w-10 h-0.5 bg-[#FF3435] absolute -bottom-0.5 -ml-1 transition-all duration-300 sm:flex hidden"
            :class="{
              'w-36': selectedTab == 'PRIVACY POLICY',
              'w-20': selectedTab == 'SUPPORT',
              'w-32': selectedTab == 'FAIRNESS'
            }"
            :style="{
              left: `calc((100% / 5) * ${position})`
            }"
          ></div>
          <span
            v-for="(tab, index) in tabs"
            :key="index"
            @click="
              (selectedTab = tab),
                selectedTab == 'FAQ'
                  ? (position = 0)
                  : selectedTab == 'TOS'
                    ? (position = 0.6)
                    : selectedTab == 'PRIVACY POLICY'
                      ? (position = 1.1)
                      : selectedTab == 'SUPPORT'
                        ? (position = 2.75)
                        : (position = 3.8)
            "
            class="font-Rubik font-bold text-base cursor-pointer text-white transition-all duration-200 hover:scale-105"
            :class="{ 'opacity-50': selectedTab != tab }"
          >
            {{ tab == 'FAIRNESS' ? 'PROVABLY FAIR ' : tab }}
          </span>
        </div>
        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
          @click="closeModal()"
        />
      </div>
      <div class="pb-2 pt-2 md:pt-6 h-full max-h-[85vh] overflow-auto">
        <div
          v-if="selectedTab === 'FAQ'"
          class="flex flex-col px-4 gap-y-2 overflow-auto h-full min-h-full pb-14"
        >
          <div class="flex flex-col gap-y-2 mb-2">
            <span class="font-Rubik text-white font-bold text-lg">Frequently Asked Questions</span>
            <span class="font-Rubik text-base font-medium opacity-50 text-white"
              >Here are some answers to frequently asked questions we have collected for you. New
              content is added on a regular basis to <br />
              help you quickly overcome any difficulties. Of course you van also contact our support
              or ask questions directly in our Discord.</span
            >
          </div>
          <Accordion_Slider
            v-for="(accordion, index) in faq"
            :key="index"
            :title="accordion.title"
            :content="accordion.content"
          />
        </div>
        <div v-if="selectedTab === 'TOS'" class="flex flex-col gap-y-2 min-h-full pb-14">
          <div
            class="flex flex-col gap-y-2 mb-2 px-4 pb-4 border-b-[0.25px] border-solid border-[#620101]"
          >
            <span class="font-Rubik text-white font-bold text-2xl">TERMS OF SERVICES</span>
            <span class="font-Rubik text-sm font-normal opacity-50 text-white"
              >The following terms and conditions govern the use of any services provided by us
              under the brand name "Hell.gg," encompassing services accessible through any website
              with the domain name ending in "Hell.gg". These terms also apply to email and other
              communications between you and us regarding such services.
            </span>
          </div>
          <div class="flex flex-col gap-y-6 h-full px-4">
            <div class="flex flex-col gap-y-2">
              <span class="font-Rubik text-white font-bold text-lg">Bet Participation</span>
              <span class="font-Rubik text-sm font-normal opacity-50 text-white"
                >When you place a bet on Hell.gg, you acknowledge that you are 18 years of age or
                older, in sound mind, and capable of taking responsibility for your actions. Hell.gg
                provides the service "as is," with no guarantees, expressed or implied, and no
                warranty regarding its quality, completeness, or accuracy. Consequently, Hell.gg
                cannot be held accountable for any event, whether direct, indirect, or
                consequential, related to the use of the website. Hell.gg reserves the right to
                suspend and/or cancel any bet or wager at any time, with suspended platforms putting
                entered bets on hold. Hell.gg also retains the right to cease betting without
                notice. We encourage players to familiarize themselves with our rule system to
                prevent issues. For instance, after winning a coinflip, you have 10 minutes to
                accept the trade presented by the bot. Failure to do so within this time frame,
                especially during platform suspension, exempts you from a full refund, and only your
                deposit will be refunded. After 1 hour, contacting Customer Support is necessary to
                claim your winnings, and after 12 hours, your coinflip becomes invalid and
                unavailable for withdrawal. These rules are in place to ensure a smooth process, and
                we ask for your cooperation in accepting winnings promptly and avoiding AFK status
                during website use.
              </span>
            </div>
            <div class="flex flex-col gap-y-2">
              <span class="font-Rubik text-white font-bold text-lg"
                >Deposit, Withdrawal, or Lost Items</span
              >
              <span class="font-Rubik text-sm font-normal opacity-50 text-white"
                >If a loss occurs due to a software or network issue during a bet, you have a
                12-hour window to make a claim by emailing us at "contact@hell.gg" or contacting our
                Discord support. After this period, the items will be considered surrendered. Timely
                withdrawal of winnings is strongly recommended to prevent issues, although the total
                value won remains unchanged. A 0-5% commission is applied for each round played on
                Hell.gg, calculated from the total pot value and deducted from the item pool.
              </span>
            </div>
            <div class="flex flex-col gap-y-2 mb-2">
              <span class="font-Rubik text-white font-bold text-lg">Content</span>
              <span class="font-Rubik text-sm font-normal opacity-50 text-white"
                >The content on this website is for general information and personal use, subject to
                change without notice. All material on the website, including design, layout,
                appearance, and graphics, is owned by us. Reproduction is prohibited except in
                accordance with the copyright notice, which is an integral part of these terms and
                conditions.
              </span>
            </div>
          </div>
        </div>
        <div
          v-if="selectedTab === 'PRIVACY POLICY'"
          class="flex flex-col gap-y-2 overflow-auto h-full pb-14"
        >
          <div class="flex flex-col gap-y-8 px-4 pb-4">
            <span class="font-Rubik text-white font-bold text-2xl">PRIVACY POLICY</span>
            <span class="font-Rubik text-sm font-normal opacity-50 text-white"
              >By using the Site you acknowledge and consent to the Service provider processing your
              personal data for the purposes of allowing access and usage of the Site and in order
              to allow participating in activities provided at the Site.
              <br />
              <br />
              Your personal data will be used only to allow you to participate in the activities
              provided at the Site and for the purposes of carrying out verification procedures in
              relation to activities at the Site. The only personally identifiable information the
              Site collects is your Trade URL and Steam ID. Your personal data will not be disclosed
              to any third parties, unless such disclosure is necessary for processing your
              requests, to carry verification procedures or unless it is required by law. You have
              the right to access personal data held by the Service provider about you. You hereby
              consent and undertake to immediately inform the Service provider about changes of the
              personal data or other provided information.
              <br />
              <br />
              The Service provider collects a small piece of information sent from browser (cookies)
              which might be turned off. However, turning off cookies may restrict the use of the
              Site. By accepting the Terms, you consent to the Service provider informing you from
              time to time about changes on the Site, new services and promotions.
            </span>
          </div>
        </div>
        <div
          v-if="selectedTab === 'SUPPORT'"
          class="flex flex-col gap-y-2 overflow-auto h-full pb-14"
        >
          <div class="flex flex-col gap-y-6 h-full px-4">
            <div class="flex flex-col gap-y-2 h-full pb-3">
              <span
                class="font-Rubik text-base font-normal text-[rgb(255,255,255,0.5)] flex flex-col gap-y-1 custom-list"
              >
                <li class="flex gap-x-1 flex-wrap">
                  Before submitting a support ticket, first check if you find the answer to your
                  question here:
                  <p class="text-white font-bold">Frequently Asked Questions</p>
                </li>
                <li>
                  Please fill out the contact form below with your correct email address and a
                  detailed description of your request.
                </li>
                <li>
                  Our team will work to respond to your ticket within 24 hours. Responses may take
                  longer due to occasional heavy traffic.
                </li>
              </span>
              <form @submit.prevent="handleSubmit" class="h-full flex flex-col gap-y-4 mt-4">
                <div class="flex flex-col gap-y-1">
                  <span
                    class="font-Rubik font-extrabold text-base"
                    :class="{
                      'text-[#FF3435]': !emailValid && touched.email,
                      'text-white': emailValid || !touched.email
                    }"
                    >Email Address:</span
                  >
                  <input
                    type="email"
                    v-model="email"
                    class="bg-[#620101] h-10 rounded-sm px-4 outline-none text-white font-Rubik text-base"
                    @blur="(touched.email = true), validateEmail()"
                    required
                  />
                </div>
                <div class="flex flex-col gap-y-1 h-full">
                  <span
                    class="font-Rubik font-extrabold text-base"
                    :class="{
                      'text-[#FF3435]': !messageValid && touched.message,
                      'text-white': messageValid || !touched.message
                    }"
                    >Your Message:</span
                  >
                  <div class="h-full bg-[#620101] flex flex-col gap-y-2 rounded-sm">
                    <textarea
                      required
                      v-model="message"
                      @blur="(touched.message = true), validateMessage()"
                      class="rounded-sm py-2 px-4 outline-none text-white font-Rubik text-base w-full h-full bg-transparent"
                    />

                    <div class="flex items-center relative justify-end px-4 py-4">
                      <div
                        class="max-w-[1172px] w-full bg-[#420101] h-px absolute top-0 z-10"
                        :class="{
                          'bg-[#FF3435]': !messageValid && touched.message,
                          'bg-[#420101]': messageValid || !touched.message
                        }"
                      ></div>
                      <span
                        v-if="!messageValid && touched.message"
                        class="text-[#FF3435] text-base font-normal absolute left-4 opacity-100 z-10"
                        >This field is required</span
                      >
                      <button
                        type="submit"
                        class="bg-[#FF3435] px-4 h-9 rounded-sm font-Rubik text-base font-bold text-white cursor-pointer"
                        :disabled="!formValid"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div v-if="selectedTab === 'FAIRNESS'" class="flex flex-col gap-y-6 min-h-full h-full px-4">
          <div class="flex items-center gap-x-2 mt-1">
            <button
              class="sm:w-[106px] whitespace-nowrap px-2 h-9 rounded-sm text-white font-Rubik font-medium text-xs sm:text-sm border border-solid border-[#FF3435] transition-all"
              :class="{
                'bg-[#FF3435]': fairnessTab === 'how it works',
                ' bg-[#620101]': fairnessTab !== 'how it works'
              }"
              @click="fairnessTab = 'how it works'"
            >
              How it works
            </button>
            <button
              class="sm:w-[106px] px-2 h-9 rounded-sm text-white font-Rubik font-medium text-xs sm:text-sm border border-solid border-[#FF3435] transition-all"
              :class="{
                'bg-[#FF3435]': fairnessTab === 'EOS',
                ' bg-[#620101]': fairnessTab !== 'EOS'
              }"
              @click="fairnessTab = 'EOS'"
            >
              EOS
            </button>
            <div class="h-1/2 w-px bg-[#FF3435] mx-1"></div>
            <button
              class="sm:w-[106px] px-2 h-9 rounded-sm text-white font-Rubik font-medium text-xs sm:text-sm border border-solid border-[#FF3435] transition-all"
              :class="{
                'bg-[#FF3435]': fairnessTab === 'coinflip',
                ' bg-[#620101]': fairnessTab !== 'coinflip'
              }"
              @click="fairnessTab = 'coinflip'"
            >
              Coinflip
            </button>
            <button
              class="sm:w-[106px] px-2 h-9 rounded-sm text-white font-Rubik font-medium text-xs sm:text-sm border border-solid border-[#FF3435] transition-all"
              :class="{
                'bg-[#FF3435]': fairnessTab === 'jackpot',
                ' bg-[#620101]': fairnessTab !== 'jackpot'
              }"
              @click="fairnessTab = 'jackpot'"
            >
              Jackpot
            </button>
          </div>

          <div v-if="fairnessTab == 'how it works'" class="flex flex-col gap-y-6">
            <div class="flex flex-col gap-y-4 mb-2">
              <span class="font-Rubik text-white font-bold text-xl">What is Provably Fair?</span>
              <span class="font-Rubik text-sm font-medium text-white"
                >Provably Fair is a system allowing players to verify that the site operates
                legitimately and doesn't tamper game results. It leverages cryptography and third
                party input to generate random values. At the end of the game, players can verify
                that the outcome was indeed determined by the original seed and inputs, thus proving
                that the game was fair.</span
              >
            </div>
            <div class="flex flex-col gap-y-4 mb-2">
              <span class="font-Rubik text-white font-bold text-xl">Server Seed</span>
              <span class="font-Rubik text-sm font-medium text-white"
                >Server Seed is a randomly generated hexadecimal string created before each PvE game
                by the server. The seed is stored privately in our database, and its SHA256 hash is
                sent to the client. Every time a string is hashed, it produces the same result. The
                process cannot be reversed. This means that the client doesn't know the outcome, but
                can verify that the server is not changing the seed during the game.</span
              >
              <div class="flex items-center w-full gap-x-4">
                <span class="font-Rubik text-sm font-medium text-white whitespace-nowrap"
                  >Server Hash</span
                >
                <div
                  class="h-10 w-full bg-[rgb(255,52,53,0.35)] overflow-x-auto rounded-sm px-2 flex items-center text-[rgb(255,255,255,0.5)] text-sm font-Rubik font-medium"
                >
                  n1yn1fn15yuvd5657856s56e8y7b13d6ft4x1bs6af1dbxv52c8t7v15e9e59tb15b1v3dg141h44sr8y7ng1
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-y-4 mb-2">
              <span class="font-Rubik text-white font-bold text-xl">Client Seed</span>
              <span class="font-Rubik text-sm font-medium text-white"
                >Client Seed is a random string of characters generated by your browser. It is
                shared with the server the moment a PvE game takes place, after a Server Hash is
                shared and Server Seed is set in stone. It's possible to change the seed however you
                want, but we recommend enabling client seed rotation for increased security.</span
              >
              <div class="flex items-center w-full gap-x-2 sm:gap-x-4 relative">
                <span class="font-Rubik text-xs sm:text-sm font-medium text-white whitespace-nowrap"
                  >Client Seed (Randomize)</span
                >
                <div
                  class="h-10 w-full bg-[rgb(255,52,53,0.35)] rounded-sm px-2 flex items-center text-[rgb(255,255,255,0.5)] text-sm font-Rubik font-medium relative"
                >
                  <span class="text-[rgb(255,255,255,0.5)] text-sm font-Rubik font-medium"
                    >nhjgf56</span
                  >

                  <div class="absolute mt-2 flex items-center top-full left-0">
                    <label
                      class="flex items-center relative pl-6 cursor-pointer text-base select-none radio"
                    >
                      <input type="checkbox" v-model="autoRotation" :value="autoRotation" />
                      <span class="checkmark"></span>
                      <span class="text-xs font-Rubik text-white font-medium opacity-50 mt-0.5"
                        >Automatically rotate client seed after each bet placed
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  class="bg-[#FF3435] w-[141px] h-10 rounded-sm font-Rubik text-base font-bold text-white cursor-pointer"
                >
                  SAVE
                </button>
              </div>
              <div class="h-20"></div>
            </div>
          </div>

          <div v-if="fairnessTab == 'EOS'" class="flex flex-col gap-y-6">
            <div class="flex flex-col gap-y-4 mb-2">
              <span class="font-Rubik text-white font-bold text-xl">How Random.org works?</span>
              <span class="font-Rubik text-sm font-medium text-white"
                >While Client Seed and Server Seed are used to generate PvE results, Player vs
                Player games rely on a third party service Random.org to generate random
                outcomes.Random.org is a website that provides true randomness through atmospheric
                noise, which is captured and converted into random numbers. This source of
                randomness is considered highly unpredictable and unbiased.</span
              >
            </div>

            <div class="flex flex-col gap-y-4 mb-2">
              <span class="font-Rubik text-white font-bold text-xl"
                >Random.org Serial Verifier</span
              >
              <span class="font-Rubik text-sm font-medium text-white"
                >Random.org cryptographically signs their responses and assigns an incremental
                serial. This allows you to verify that all outcomes are indeed generated by
                random.org, and we don't cherry-pick a favorable outcome by requesting random values
                multiple times. By using the search option below, you can check each response by the
                Serial ID, and verify the signature on random.org:</span
              >
              <div class="flex items-center w-full gap-x-4 relative">
                <span class="font-Rubik text-sm font-medium text-white whitespace-nowrap"
                  >Serial ID</span
                >
                <input
                  type="email"
                  v-model="email"
                  class="bg-[#620101] w-full h-10 rounded-sm px-4 outline-none text-white font-Rubik text-base"
                  @blur="(touched.email = true), validateEmail()"
                  required
                />
                <button
                  class="bg-[#FF3435] w-[141px] h-10 rounded-sm font-Rubik text-sm font-bold text-white cursor-pointer whitespace-nowrap px-4"
                >
                  CHECK SERIAL
                </button>
              </div>
            </div>
          </div>

          <div v-if="fairnessTab == 'jackpot'" class="flex flex-col gap-y-6">
            <div class="flex flex-col gap-y-4 mb-2">
              <span class="font-Rubik text-white font-bold text-xl"
                >How Jackpot Results Are Generated?</span
              >
              <span class="font-Rubik text-sm font-medium text-white"
                >Jackpot tickets are generated by a third-party service random.org. To verify a game
                result do the following:
                <li>
                  First, determine the number of tickets - it's the total pot amount in gems times
                  100
                </li>
                <li>
                  Check your jackpot game history to find the Serial ID and verify it on this page
                </li>
                <li>
                  Open the random.org verification page and copy winning percent - a float number
                  between 0 and 1
                </li>
                <li>
                  Multiply winning number times the number of tickets and round the result to an
                  integer - this is the winning ticket
                </li>
                <li>Check if the winning ticket corresponds to the winners' ticket range</li>
              </span>
            </div>

            <div class="flex flex-col gap-y-4 mb-2">
              <span class="font-Rubik text-white font-bold text-xl"
                >Random.org Serial Verifier</span
              >
              <span class="font-Rubik text-sm font-medium text-white"
                >Random.org cryptographically signs their responses and assigns an incremental
                serial. This allows you to verify that all outcomes are indeed generated by
                random.org, and we don't cherry-pick a favorable outcome by requesting random values
                multiple times. By using the search option below, you can check each response by the
                Serial ID, and verify the signature on random.org:</span
              >
              <div class="flex items-center w-full gap-x-4 relative">
                <span class="font-Rubik text-sm font-medium text-white whitespace-nowrap"
                  >Serial ID</span
                >
                <input
                  type="email"
                  v-model="email"
                  class="bg-[#620101] w-full h-10 rounded-sm px-4 outline-none text-white font-Rubik text-base"
                  @blur="(touched.email = true), validateEmail()"
                  required
                />
                <button
                  class="bg-[#FF3435] w-[141px] h-10 rounded-sm font-Rubik text-sm font-bold text-white cursor-pointer whitespace-nowrap px-4"
                >
                  CHECK SERIAL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import Accordion_Slider from '../Accordion_Slider.vue'
export default {
  name: 'support_modal',
  props: {
    initialTab: { type: String, default: 'FAQ' }
  },
  components: {
    XMarkIcon,
    Accordion_Slider
  },
  data() {
    return {
      position: 0,
      autoRotation: false,
      openedDropdown: null,
      fairnessTab: 'how it works',
      tabs: ['FAQ', 'TOS', 'PRIVACY POLICY', 'SUPPORT', 'FAIRNESS'],
      selectedTab: 'FAQ',
      faq: [
        {
          title: 'What are tickets?',
          content:
            ' The ticket is the number chosen by EOS to be the winner. Whoever ever occupies that ticket number is the winner.'
        },
        {
          title: 'What is tournament mode?',
          content:
            "Much like tournaments in real life. We thought we'd create a winner takes all tournament of coinflips. Essentially whoever wins all their coinflip divisions wins everything. "
        },
        {
          title: 'How to cancel my Coinflip games?',
          content:
            "The easiest way is by going on the coinflip itself and clicking the 'Cancel' button. You can also cancel the Coinflip under game history."
        },
        {
          title: 'I didn’t get all my winnings.',
          content:
            "We take a 5% rake across all game modes. Due to the fact skins can't always be perfectly taxed. Sometimes, the rake we take will be greater or less than 5% to make up or return lost taxes. "
        },
        {
          title: 'Why do you tax game modes?',
          content:
            'We need to take a rake off all game modes in order to pay for the essential needs of the website. Like ensuring that users will get their items back in the event of Steam banning them, Ongoing development, Customer support, Advertising, player rewards, Hosting, all other misc costs that need to be paid somehow, and of course profit. '
        },
        {
          title: 'I never got my winnings.',
          content:
            "Navigate to the game history tab. Click on my profile top right, and click on game history. Look for the game which you didn't get your winnings from and click on 'resend' trade. If that doesn't work please contact support. "
        },
        {
          title: 'How do I level up?',
          content:
            'Every dollar you wager makes you level up. Pay attention to the experience bar that appears on the page every time a bet goes through. You can see how much more you need to wager in order to get to the next level. '
        },
        {
          title: 'What’s the difference between gambleable and withdrawable balance?',
          content:
            "We have two different balance types because with gambleable balance we require you to gamble the reward at least once, and with withdrawable we don't so that's why there are two different balance types. "
        }
      ],
      email: '',
      message: '',
      touched: { email: false, message: false }
    }
  },
  methods: {
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
    }
  },
  computed: {
    emailValid() {
      return /\S+@\S+\.\S+/.test(this.email)
    },
    messageValid() {
      return this.message.trim().length > 0
    },
    formValid() {
      return this.emailValid && this.messageValid
    }
  },
  mounted() {
    if (this.initialTab != '') {
      this.selectedTab = this.initialTab
    }

    this.position =
      this.selectedTab == 'FAQ'
        ? 0
        : this.selectedTab == 'TOS'
          ? 0.6
          : this.selectedTab == 'PRIVACY POLICY'
            ? 1.1
            : this.selectedTab == 'SUPPORT'
              ? 2.75
              : 3.8
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
  background: #d10d0d;
  border-radius: 4px;
}

.custom-list {
  list-style: none;
  padding-inline: 1rem;
}

.custom-list li {
  position: relative;
}

.custom-list li::before {
  content: '*'; /* Use an asterisk as the marker */
  position: absolute;
  margin-top: 3.5px;
  left: -20px; /* Position the marker */
  font-size: 25px; /* Adjust the size of the asterisk */
  color: rgb(255, 255, 255, 0.5); /* Set the color to match your style */
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
  background-image: url(../../assets/img/tick.png);
  background-size: contain;
  transition: opacity ease-in-out 100ms;
}

.radio input:checked ~ .checkmark::after {
  /* display: block; */
  opacity: 1;
}
</style>
