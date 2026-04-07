<template>
  <Teleport to="body">
    <div
      v-show="modalState.visible"
      class="fixed inset-0 z-40 bg-[rgba(0,0,0,0.6)] flex items-center justify-center overflow-x-hidden overflow-y-auto px-2"
      @click.self="closingModal"
    >
      <Transition
        name="modal-content"
        appear
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="modalComponent" class="max-h-full backdrop-blur-3xl">
          <component
            :is="modalComponent"
            v-bind="modalProps"
            @close-modal="modalCloseHandler"
            @prevent-closing="preventClosing"
            @undo-prevent-closing="undoPreventClosing"
          />
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script>
import { ref, computed, defineAsyncComponent } from 'vue'
import { modalState, openModalFromModal, closeModal } from '@/modalStore'

// Lazy-loaded heavy components
const HOF = defineAsyncComponent({
  loader: () => import('./HOF.vue'),
  delay: 200,
  loadingComponent: {
    template: '<div class="text-white p-4">Loading...</div>'
  },
  timeout: 8000
})

const CoinflipGame = defineAsyncComponent(() => import('./coinflip/Game_Modal.vue'))
const Tournament_modal = defineAsyncComponent(() => import('./coinflip/Tournament_modal.vue'))
const Jackpot_Deposit = defineAsyncComponent(() => import('./jackpot/Jackpot_Deposit.vue'))

// Eager loaded lightweight components
import Withdraw from './modals/Withdraw.vue'
import CoinflipSettings from './coinflip/Settings.vue'
import SiteWideHistory from './SiteWideHistory.vue'
import CreateCoinflip from './coinflip/CreateCoinflip.vue'
import JoinCoinFlipConfirmationModal from './coinflip/JoinConfirmationModal.vue'
import CoinflipPlayerJoin from './coinflip/Player_Join_Modal.vue'
import SupportModal from './modals/SupportModal.vue'
import ProfileModal from './modals/ProfileModal.vue'
import Self_Ban from './modals/Self_Ban.vue'
import Jackpot_Results from './jackpot/ResultsModal.vue'
import FreeCoins from './modals/FreeCoins.vue'
import Promo_code from './modals/free_coins/promo_code.vue'
import Gift_modal from './modals/free_coins/Gift_modal.vue'
import Location_modal from './modals/free_coins/Gift_modal_steps/Location_modal.vue'
import Delivery_selection from './modals/free_coins/Gift_modal_steps/Delivery_selection.vue'
import Confirmation_modal from './modals/free_coins/Gift_modal_steps/Confirmation_modal.vue'
import Free_mula from './modals/free_coins/Free_mula.vue'
import Level_cases from './modals/free_coins/Level_cases.vue'
import Scam_prevention from './modals/Scam_prevention.vue'
import Security_warning from './modals/Security_warning.vue'
import KYC from './modals/KYC/KYC.vue'
import KYC_verification from './modals/KYC/KYC_verification.vue'
import Redeem_affiliate from './modals/free_coins/Redeem_affiliate.vue'
import ShowSkins from './modals/ShowSkins.vue'
import PopupInventory from './modals/PopupInventory.vue'
import ShowParticipants from './modals/ShowParticipants.vue'
import ShowTickets from './modals/ShowTickets.vue'
import ChangeBalance from './modals/ChangeBalance.vue'
import RemoveLeaderboard from './modals/RemoveLeaderboard.vue'
import ViewCase from './modals/ViewCase.vue'
import ConfirmDelete from './modals/ConfirmDelete.vue'
import ConfirmChanges from './modals/ConfirmChanges.vue'
import SponsorModal from './modals/SponsorModal.vue'
import SixDigitCode from './modals/SixDigitCode.vue'
import TwoFactorEnabled from './modals/TwoFactorEnabled.vue'
import BackupVerificationCode from './modals/BackupVerificationCode.vue'
import TwoFactorQRCode from './modals/TwoFactorQRCode.vue'
import DownloadAuthApp from './modals/DownloadAuthApp.vue'
import TwoFACode from './modals/TwoFACode.vue'
import DoubleDownCoin from './coinflip/DoubleDownCoin.vue'
import UnboxChat from './modals/chat/UnboxChat.vue'
import DoubleDownChat from './modals/chat/DoubleDownChat.vue'
import JackpotChat from './modals/chat/JackpotChat.vue'
import CoinflipChat from './modals/chat/CoinflipChat.vue'

export default {
  setup() {
    const prevention = ref(false)

    const getModalConfig = computed(() => {
      const type = modalState.modalType
      const data = modalState.propsData || {}

      const modals = {
        support: { component: SupportModal, props: { initialTab: data } },
        withdraw: { component: Withdraw },
        'coinflip settings': { component: CoinflipSettings, props: { filters: data } },
        'sitewide history': { component: SiteWideHistory },
        'create coinflip': { component: CreateCoinflip },
        'double down coins': { component: DoubleDownCoin },
        'coinflip confirmation': {
          component: JoinCoinFlipConfirmationModal,
          props: { battle: data.battle, selectedItems: data.selectedItems }
        },
        'join coinflip': {
          component: CoinflipPlayerJoin,
          props: { battle: data.battle, secondsLeft: data.secondsLeft }
        },
        'coinflip game': {
          component: CoinflipGame,
          props: { battle: data.battle, secondsLeft: data.secondsLeft }
        },
        profile: { component: ProfileModal, props: { initialTab: data } },
        'self-ban': { component: Self_Ban },
        'jackpot results': {
          component: Jackpot_Results,
          props: {
            jackpot: data.jackpot,
            winner: data.winner,
            pot_value: data.pot_value
          }
        },
        'show participants': {
          component: ShowParticipants,
          props: {
            jackpot: data.jackpot,
            winner: data.winner,
            pot_value: data.pot_value
          }
        },
        'promo code': { component: Promo_code },
        'redeem affiliate': { component: Redeem_affiliate },
        'gift modal': { component: Gift_modal },
        'location step': { component: Location_modal },
        'delivery selection': { component: Delivery_selection },
        'confirmation selection': {
          component: Confirmation_modal,
          props: { shop: data.name },
          onClose: () => {
            if (!prevention.value) openModalFromModal('freecoins')
          }
        },
        'free mula': { component: Free_mula },
        'level cases': { component: Level_cases },
        'scam prevention': { component: Scam_prevention },
        'security warning': { component: Security_warning, onClose: () => {} },
        KYC: { component: KYC },
        'kyc verification': { component: KYC_verification },
        'coinflip tournament': { component: Tournament_modal },
        'jackpot deposit': { component: Jackpot_Deposit },
        freecoins: { component: FreeCoins },
        'hall of fame': { component: HOF },
        'popup inventory': { component: PopupInventory },
        'show skins': { component: ShowSkins },
        'show tickets': { component: ShowTickets },
        'change balance': { component: ChangeBalance },
        'remove leaderboard': { component: RemoveLeaderboard },
        'sponsor modal': { component: SponsorModal },
        'view case': { component: ViewCase },
        'confirm delete': { component: ConfirmDelete },
        'confirm changes': { component: ConfirmChanges },
        '2fa code': { component: TwoFACode },
        '1st download authApp': { component: DownloadAuthApp },
        '2nd 2fa qrcode': { component: TwoFactorQRCode },
        '3rd six digit': { component: SixDigitCode },
        '4th backup verification': { component: BackupVerificationCode },
        '5th 2fa enabled': { component: TwoFactorEnabled },
        'chat unboxed': { component: UnboxChat },
        'chat doubledown': { component: DoubleDownChat },
        'chat jackpot': { component: JackpotChat },
        'chat coinflip': { component: CoinflipChat },
      }

      const config = modals[type] || { component: null }
      return {
        component: config.component || null,
        props: config.props || {},
        onClose: config.onClose || closeModal
      }
    })

    const modalComponent = computed(() => getModalConfig.value.component)
    const modalProps = computed(() => getModalConfig.value.props)
    const modalCloseHandler = () => getModalConfig.value.onClose?.()

    return {
      modalState,
      modalComponent,
      modalProps,
      modalCloseHandler,
      preventClosing: () => (prevention.value = true),
      undoPreventClosing: () => (prevention.value = false),
      closingModal: () => modalCloseHandler()
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #710101;
  border-radius: 4px;
}
</style>
