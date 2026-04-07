<template>
  <div>
    <div
      class="relative sm:w-[574px] w-full max-w-[574px] flex-col transform transition-all bg-[linear-gradient(180deg,rgba(83,0,0,0.8)_0%,rgba(46,1,1,0.8)_100%)] backdrop-blur-[200px] border-[#FF3435] border h-full"
    >
      <!-- Header Start -->
      <div
        class="flex justify-between w-full h-[59px] items-center px-4 border-b border-b-[rgb(255,255,255,0.2)] border-solid"
      >
        <span class="font-Rubik font-extrabold text-white text-base">JOIN COINFLIP </span>
        <XMarkIcon
          class="w-6 h-6 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
          @click="activeModal = ''"
        />
      </div>
      <div class="flex items-center justify-center flex-col gap-2 w-full py-6">
        <div
          class="flex items-center justify-center w-full gap-x-2 font-Rubik font-bold text-white text-base"
        >
          Offer is active
        </div>
        <div class="font-Rubik text-white font-semibold text-xs text-center">
          <span class="font-Rubik text-[#FF3435] font-semibold text-xs">Reference:</span>
          vnbt6yb5876b78t6y456r8ydnd
          <span class="font-Rubik text-[#FF3435] font-semibold text-xs">Security code:</span>
          vd158g76
        </div>
        <button
          class="w-2/3 bg-[#04ab53] flex items-center justify-center h-10 gap-2 font-Rubik font-extrabold text-white text-xs rounded-[2px]"
          @click="joinBattle()"
        >
          <img src="../../assets/icons/chrome.png" />
          OPEN IN BROWSER
        </button>
        <div class="font-Rubik text-white font-medium text-xs text-center max-w-[30rem]">
          Always use the links we provide to you or check the security code of your trade offer to
          defend against fake bots or scammers
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { openModalFromModal } from '@/modalStore'
import { mapActions } from 'vuex'
export default {
  name: 'coinFlip_Battle',
  props: {
    battle: Object,
    selectedItems: Array
  },
  components: {
    XMarkIcon
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['updateBattle', 'updateBattleState']),
    joinBattle() {
      let updatedBattle = this.battle
      let player = {
        name: 'qusai',
        _id: 23,
        avatar:
          'https://image.tensorartassets.com/cdn-cgi/image/anim=false,plain=false,w=500,q=85/model_showcase/690698035015003900/63b70cf5-54fc-3411-8bab-945aadd14633.jpeg',
        coin: this.battle.players[0].coin == 'hell' ? 'heaven' : 'hell',
        items: this.selectedItems
      }

      updatedBattle.players.push(player)

      this.$store.dispatch('updateBattle', {
        battleId: this.battle._id, // Pass the battle's unique ID
        updatedBattle: updatedBattle // Set the new state after the coin flip
      })
      this.$store.dispatch('updateBattleState', {
        battleId: this.battle._id, // Pass the battle's unique ID
        newState: 'in_progress' // Set the new state after the coin flip
      })
      this.updateBattleState({ battleIndex: this.battle.id, newState: updatedBattle.state })
      this.updateBattle({ battleIndex: this.battle.id, updatedBattle })
      openModalFromModal('coinflip game', { battle: updatedBattle })
    },

    closeModal() {
      this.$emit('close-modal')
    }
  },
  mounted() {},

  computed: {}
}
</script>
