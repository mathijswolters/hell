<template>
  <div class="container-class">
    <div
      class="flex justify-between items-center w-full gap-2 flex-wrap lg:pt-[22px] lg:pb-[42px] pb-5 border-b-[1px] border-b-[#620101]"
    >
      <div class="flex gap-2 items-center">
        <router-link
          :to="{ name: 'CaseCreator' }"
          class="text-[16px] flex items-center font-[800] bg-[#FF3435] px-[16px] py-3 text-white"
        >
          <ChevronLeftIcon class="w-[20px] me-2" /> BACK TO CASES
        </router-link>
        <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-3 text-white">
          SAVE
        </button>
        <button class="text-[16px] font-[800] bg-[#310000] px-[16px] py-3 text-white">
          DELETE
        </button>
      </div>
      <div class="text-[14px] flex lg:justify-end items-center flex-wrap gap-2">
        <router-link
          :to="{ name: 'CaseEdit' }"
          class="theme-btn"
          active-class="active"
        >
          Case Creator Tool
        </router-link>

        <router-link
          :to="{ name: 'CaseTesting' }"
          class="theme-btn"
          active-class="active"
        >
          Case Testing Tool
        </router-link>

        <router-link
          :to="{ name: 'CaseStatsAll' }"
          class="theme-btn"
          active-class="active"
        >
          Case Stats
        </router-link>
      </div>
    </div>

    <!-- FORM -->
    <div
      class="bg-[#62010180] border border-[#FF3435] rounded-[2px] p-[20px] mx-auto xl:max-w-[1331px] w-full mt-[25px]"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 border-b border-[#FF343580] pb-5">
        <div class="w-full">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
            <div>
              <label class="label">Case Name</label>
              <input class="input" placeholder="Test_Case_1" />
            </div>

            <div>
              <label class="label">Case Link</label>
              <input class="input" placeholder="testlink" />
            </div>

            <div>
              <label class="label">Price</label>
              <input type="number" class="input" placeholder="100" />
            </div>

            <div>
              <label class="label">Image</label>
              <input class="input" placeholder="https://hell.gg/case.png" />
            </div>

            <div>
              <label class="label">Tier</label>
              <input type="number" class="input" placeholder="5" />
            </div>

            <div>
              <label class="label">Category</label>
              <select class="select">
                <option>Category 1</option>
                <option>Category 2</option>
                <option>Category 3</option>
                <option>Category 4</option>
              </select>
            </div>
          </div>

          <div class="my-4">
            <label class="checkbox-wrapper">
              <input type="checkbox" checked />
              <span class="checkbox"></span>
              <span class="ps-2">Is Case Active ?</span>
            </label>
          </div>

          <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-2 text-white">
            SAVE
          </button>
        </div>
        <div class="w-full flex justify-center items-center">
          <div
            class="bg-[#690405] xl:w-[max-content] w-full px-[8px] py-3 rounded-[2px] flex flex-col gap-2"
          >
            <div class="flex justify-between items-center gap-2 flex-wrap">
              <span class="text-[#D7B7B7] text-[14px] font-[600]">Test_Case_1</span>
              <p class="text-[14px] font-[600] text-white">
                <span class="text-[#04AA53] text-[14px] font-[600]">$</span>100.00
              </p>
            </div>

            <img
              src="/img/icons/question.svg"
              alt="img"
              width="40"
              height="40"
              class="mx-auto my-4"
            />

            <div
              class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
            >
              <p class="text-[14px] font-[600] text-white">0</p>
              <p class="text-[14px] font-[600] text-white">$0.00</p>
              <span class="text-[#D7B7B7] text-[14px] font-[600]">24h</span>
            </div>
            <div
              class="bg-[#180A0D80] flex justify-between items-center gap-2 flex-wrap w-full px-[8px] py-2 rounded-[4px]"
            >
              <p class="text-[14px] font-[600] text-white">0</p>
              <p class="text-[14px] font-[600] text-white">$0.00</p>
              <span class="text-[#D7B7B7] text-[14px] font-[600]">All</span>
            </div>
            <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">Category # 1</p>
          </div>
        </div>
      </div>

      <!-- ITEMS -->
      <div class="flex w-full flex-col gap-5 mt-5">
        <div class="flex justify-between items-center gap-2 flex-wrap w-full">
          <div class="flex items-center gap-5 flex-wrap">
            <p class="text-[16px] font-[800] text-white">Case Price: $12</p>
            <p class="text-[16px] font-[800] text-white">House Edge: 10%</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <button class="text-[16px] font-[800] bg-[#72B5FF] px-[16px] py-2 text-white">
              ADD ITEM
            </button>
            <button class="text-[16px] font-[800] bg-[#FEBD11] px-[16px] py-2 text-white">
              FILL ODDS TO 100%
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
          <div class="bg-[#8F0E0E] w-full p-[8px] flex flex-col gap-2">
            <img
              src="/img/icons/gun.png"
              alt="img"
              width="64"
              height="64"
              class="mx-auto my-4"
            />
            <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">WEAPON B...</p>
            <p class="text-[16px] font-[800] text-white text-center">
              <span class="text-[#04AA53] text-[16px] font-[800]">$</span>1.12
            </p>

            <div class="flex justify-between items-center gap-2">
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Min
              </div>
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Max
              </div>
            </div>
            <div
              class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
            >
              Chance
            </div>
            <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-2 text-white">
              LOAD SKIN
            </button>
            <button @click="openModal('confirm delete')" class="text-[16px] font-[800] bg-[#FF3435] px-[16px] py-2 text-white">
              DELETE
            </button>
          </div>
          <div class="bg-[#8F0E0E] w-full p-[8px] flex flex-col gap-2">
            <img
              src="/img/icons/gun.png"
              alt="img"
              width="64"
              height="64"
              class="mx-auto my-4"
            />
            <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">WEAPON B...</p>
            <p class="text-[16px] font-[800] text-white text-center">
              <span class="text-[#04AA53] text-[16px] font-[800]">$</span>1.12
            </p>

            <div class="flex justify-between items-center gap-2">
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Min
              </div>
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Max
              </div>
            </div>
            <div
              class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
            >
              Chance
            </div>
            <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-2 text-white">
              LOAD SKIN
            </button>
            <button @click="openModal('confirm delete')" class="text-[16px] font-[800] bg-[#FF3435] px-[16px] py-2 text-white">
              DELETE
            </button>
          </div>
          <div class="bg-[#8F0E0E] w-full p-[8px] flex flex-col gap-2">
            <img
              src="/img/icons/gun.png"
              alt="img"
              width="64"
              height="64"
              class="mx-auto my-4"
            />
            <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">WEAPON B...</p>
            <p class="text-[16px] font-[800] text-white text-center">
              <span class="text-[#04AA53] text-[16px] font-[800]">$</span>1.12
            </p>

            <div class="flex justify-between items-center gap-2">
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Min
              </div>
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Max
              </div>
            </div>
            <div
              class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
            >
              Chance
            </div>
            <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-2 text-white">
              LOAD SKIN
            </button>
            <button @click="openModal('confirm delete')" class="text-[16px] font-[800] bg-[#FF3435] px-[16px] py-2 text-white">
              DELETE
            </button>
          </div>
          <div class="bg-[#8F0E0E] w-full p-[8px] flex flex-col gap-2">
            <img
              src="/img/icons/gun.png"
              alt="img"
              width="64"
              height="64"
              class="mx-auto my-4"
            />
            <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">WEAPON B...</p>
            <p class="text-[16px] font-[800] text-white text-center">
              <span class="text-[#04AA53] text-[16px] font-[800]">$</span>1.12
            </p>

            <div class="flex justify-between items-center gap-2">
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Min
              </div>
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Max
              </div>
            </div>
            <div
              class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
            >
              Chance
            </div>
            <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-2 text-white">
              LOAD SKIN
            </button>
            <button @click="openModal('confirm delete')" class="text-[16px] font-[800] bg-[#FF3435] px-[16px] py-2 text-white">
              DELETE
            </button>
          </div>
          <div class="bg-[#8F0E0E] w-full p-[8px] flex flex-col gap-2">
            <img
              src="/img/icons/gun.png"
              alt="img"
              width="64"
              height="64"
              class="mx-auto my-4"
            />
            <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">WEAPON B...</p>
            <p class="text-[16px] font-[800] text-white text-center">
              <span class="text-[#04AA53] text-[16px] font-[800]">$</span>1.12
            </p>

            <div class="flex justify-between items-center gap-2">
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Min
              </div>
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Max
              </div>
            </div>
            <div
              class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
            >
              Chance
            </div>
            <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-2 text-white">
              LOAD SKIN
            </button>
            <button @click="openModal('confirm delete')" class="text-[16px] font-[800] bg-[#FF3435] px-[16px] py-2 text-white">
              DELETE
            </button>
          </div>
          <div class="bg-[#8F0E0E] w-full p-[8px] flex flex-col gap-2">
            <img
              src="/img/icons/gun.png"
              alt="img"
              width="64"
              height="64"
              class="mx-auto my-4"
            />
            <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">WEAPON B...</p>
            <p class="text-[16px] font-[800] text-white text-center">
              <span class="text-[#04AA53] text-[16px] font-[800]">$</span>1.12
            </p>

            <div class="flex justify-between items-center gap-2">
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Min
              </div>
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Max
              </div>
            </div>
            <div
              class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
            >
              Chance
            </div>
            <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-2 text-white">
              LOAD SKIN
            </button>
            <button @click="openModal('confirm delete')" class="text-[16px] font-[800] bg-[#FF3435] px-[16px] py-2 text-white">
              DELETE
            </button>
          </div>
          <div class="bg-[#8F0E0E] w-full p-[8px] flex flex-col gap-2">
            <img
              src="/img/icons/gun.png"
              alt="img"
              width="64"
              height="64"
              class="mx-auto my-4"
            />
            <p class="text-[#D7B7B7] text-[14px] font-[600] text-center">WEAPON B...</p>
            <p class="text-[16px] font-[800] text-white text-center">
              <span class="text-[#04AA53] text-[16px] font-[800]">$</span>1.12
            </p>

            <div class="flex justify-between items-center gap-2">
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Min
              </div>
              <div
                class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
              >
                Max
              </div>
            </div>
            <div
              class="bg-[#180A0D80] w-full uppercase p-[8px] rounded-[4px] text-[#D7B7B7] font-[600] text-center"
            >
              Chance
            </div>
            <button class="text-[16px] font-[800] bg-[#04AA53] px-[16px] py-2 text-white">
              LOAD SKIN
            </button>
            <button @click="openModal('confirm delete')" class="text-[16px] font-[800] bg-[#FF3435] px-[16px] py-2 text-white">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { openModal } from '@/modalStore';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';
export default {
  name: "CreatorTool",
  components:{ChevronLeftIcon},
  data() {
    return {};
  },
  methods: {
    openModal(name, props) {
      openModal(name, props);
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
