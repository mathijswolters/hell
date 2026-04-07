<template>
  <div class="relative w-[2.25rem] min-w-[2.25rem] h-[2.25rem] rounded-[4px]">
    <img
      :src="user.avatar"
      alt="User Avatar"
      class="object-cover w-[2.25rem] h-[2.25rem] min-h-[2.25rem] min-w-[2.25rem] rounded-[4px]"
      loading="lazy"
    />

    <div
      class="absolute flex -bottom-2 items-center"
      :class="{ '-left-1': user.dominating && user.target && user.win_streak }"
    >
      <img
        v-if="user.win_streak > 0"
        class="w-fit max-w-4 h-4 mt-1"
        src="../assets/icons/win_streak.png"
        loading="lazy"
      />
      <Dominating_icon
        v-if="user.dominating"
        class="w-fit min-w-4"
        :number="user.dominating"
        loading="lazy"
      />
      <Target_icon v-if="user.target" class="w-fit min-w-4" :number="user.target" loading="lazy" />
    </div>
  </div>
</template>

<script>
import Dominating_icon from './icons/Dominating_icon.vue'
import Target_icon from './icons/Target_icon.vue'
export default {
  data() {
    return {}
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {},

  components: { Dominating_icon, Target_icon },
  computed: {}
}
</script>
