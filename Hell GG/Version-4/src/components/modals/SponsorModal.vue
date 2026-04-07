<template>
  <div
    class="relative max-w-[98vw] 2xl:max-w-[1466px] 2xl:w-[1466px] w-full flex-col transform transition-all bg-[rgba(66,1,1,1)] backdrop-blur-[200px] border-[#530000] border max-h-[93vh] 2xl:max-h-full h-full"
  >
    <!-- Header Start -->
    <div
      class="flex w-full flex-wrap py-4 sm:py-0 sm:h-[50px] items-center px-4 border-b border-[hsl(0,98%,19%)] gap-x-4"
    >
      <span
        class="font-Rubik font-bold text-white text-[16px] flex items-center gap-2 h-full"
      >
        Create Your Promocode
      </span>

      <XMarkIcon
        class="w-6 h-6 absolute right-4 cursor-pointer hover:scale-110 transition-transform ease-linear duration-150 fill-[#d7b7b7]"
        @click="closeModal()"
      />
    </div>
    <!-- Header End -->

    <!-- Body Start -->
    <div class="flex pt-4 flex-col gap-4 p-4 h-full overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full ps-1">
        <!-- LEFT FORM -->
        <div class="lg:col-span-2 overflow-y-auto pr-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label">Amount</label>
              <input type="number" class="input" placeholder="0" />
            </div>

            <div>
              <label class="label">
                Promo Code
                <span class="text-xs opacity-60">(leave blank to random)</span>
              </label>
              <input class="input" placeholder="Enter Promo Code..." />
            </div>

            <div>
              <label class="label">Link</label>
              <input class="input" placeholder="https://hell.gg/p/" />
            </div>

            <div>
              <label class="label">Uses</label>
              <input type="number" class="input" placeholder="1" />
            </div>

            <div>
              <label class="label">Min Level</label>
              <input type="number" class="input" placeholder="0" />
            </div>

            <div>
              <label class="label">Referred Time</label>
              <select class="select">
                <option>User Must Be My Affiliate For 1 Week</option>
                <option>User Must Be My Affiliate For 1 Day</option>
                <option>This code for everyone</option>
              </select>
            </div>
          </div>

          <!-- Checkboxes -->
          <div class="mt-4 space-y-2">
            <label class="checkbox-wrapper">
              <input type="checkbox" />
              <span class="checkbox"></span>
              <span class="ps-2">Exclude Muted Users</span>
            </label>

            <label class="checkbox-wrapper">
              <input type="checkbox" checked />
              <span class="checkbox"></span>
              <span class="ps-2">Exclude Bonus Banned Users</span>
            </label>

            <label class="checkbox-wrapper">
              <input type="checkbox" />
              <span class="checkbox"></span>
              <span class="ps-2">User must have placed a bet recently</span>
            </label>
          </div>
        </div>

        <!-- RIGHT INFO PANEL -->
        <div class="border-l border-[#5a0000] pl-6 flex items-center">
          <p class="text-sm leading-relaxed text-white w-full text-center">
            Code will pay out
            <span class="text-green-400 font-bold">$100</span> in total,
            <br />
            <span class="text-green-400 font-bold">$1</span> to
            <span class="text-green-400 font-bold">100 users</span>
          </p>
        </div>
      </div>
    </div>
    <!-- Body End -->
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/solid';

export default {
  name: "SponsorModal",
  components: {
    XMarkIcon,
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>

<style scoped>
/* INPUTS */
.label {
  font-size: 14px;
  font-weight: 600;
  color: white;
}

.input,
.select {
  margin-top: 4px;
  width: 100%;
  padding: 8px 10px;
  background: #8f1313;
  color: white;
  font-size: 14px;
  outline: none;
}
select{
  padding: 9.5px !important;
}

.select:focus {
  background-color: #7f1d1d;
}

.select option {
  background-color: #8f1313;
  color: white;
}

.select option:checked,
.select option:hover {
  background-color: #ff3435;
}

/* CUSTOM CHECKBOX */
.checkbox-wrapper {
  width: max-content;
  align-self: flex-end;
  display: flex;
  align-items: center;
}

.checkbox-wrapper input {
  display: none;
}

.checkbox {
  width: 16px;
  height: 16px;
  border: 2px solid #ff3435;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.checkbox-wrapper input:checked + .checkbox {
  background-image: url("/img/icons/tick.png");
}
</style>
