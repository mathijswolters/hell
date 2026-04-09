<template>
  <div class="relative w-[803px] max-w-[95vw] h-96 bg-[#4a0101] border border-[#530000] overflow-hidden">
    <button type="button" class="absolute left-[771px] top-[23px] w-3 h-3" @click="$emit('close-modal')">
      X
    </button>

    <div class="absolute left-0 top-[58px] w-full h-0 outline outline-2 outline-offset-[-1px] outline-red-950"></div>
    <div class="absolute left-[20px] top-[58px] w-36 h-0 outline outline-2 outline-offset-[-1px] outline-red-500"></div>

    <div class="absolute left-[20px] top-[16px] inline-flex justify-start items-center gap-1">
      <div class="justify-start text-white text-base font-extrabold font-['Rubik'] leading-6">WEEKLY CASES</div>
      <div class="w-4 h-4 relative overflow-hidden">
        <div class="w-3.5 h-3.5 left-[1.33px] top-[1.33px] absolute bg-stone-300"></div>
        <div class="w-[1.67px] h-[1.67px] left-[7.17px] top-[4.09px] absolute bg-red-950"></div>
        <div class="w-0.5 h-1.5 left-[6.67px] top-[6.59px] absolute bg-red-950"></div>
        <div class="w-[2.67px] h-[1.33px] left-[6.67px] top-[10.59px] absolute bg-red-950"></div>
      </div>
    </div>
    <div class="absolute left-[179px] top-[16px] justify-start text-white text-base font-extrabold font-['Rubik'] leading-6">
      HISTORY
    </div>

    <div class="absolute left-[80px] top-[108px] inline-flex justify-start items-start gap-16">
      <div class="w-28 h-40 relative">
        <div class="w-24 h-24 left-0 top-[24px] absolute overflow-hidden">
          <img class="w-24 h-24 left-0 top-0 absolute" src="../../../assets/img/weekly-case.png" />
          <div class="left-[16px] top-[38px] absolute justify-start">
            <span
              class="text-green-600 text-base font-extrabold font-['Rubik'] uppercase leading-6 [text-shadow:_-2px_-2px_6px_rgb(0_0_0_/_1.00)]"
              >$</span
            ><span
              class="text-white text-base font-extrabold font-['Rubik'] uppercase leading-6 [text-shadow:_-2px_-2px_6px_rgb(0_0_0_/_1.00)]"
              >{{ formatMoney(weeklyCases[0].value) }}</span
            >
          </div>
        </div>
        <div class="top-0 absolute justify-start text-white text-sm font-semibold font-['Rubik'] leading-6">
          {{ weeklyCases[0].range }}
        </div>
        <div
          class="px-3.5 left-[20px] top-[132px] absolute bg-green-600 rounded-[1px] inline-flex justify-center items-center gap-2.5 overflow-hidden"
        >
          <div class="justify-start text-white text-xs font-semibold font-['Rubik'] leading-6">
            {{ weeklyCases[0].statusLabel }}
          </div>
        </div>
      </div>

      <div class="w-28 h-40 relative">
        <div class="w-24 h-24 left-0 top-[24px] absolute overflow-hidden">
          <img class="w-24 h-24 left-0 top-0 absolute" src="../../../assets/img/weekly-case.png" />
          <div class="left-[16px] top-[38px] absolute justify-start">
            <span
              class="text-green-600 text-base font-extrabold font-['Rubik'] uppercase leading-6 [text-shadow:_-2px_-2px_6px_rgb(0_0_0_/_1.00)]"
              >$</span
            ><span
              class="text-white text-base font-extrabold font-['Rubik'] uppercase leading-6 [text-shadow:_-2px_-2px_6px_rgb(0_0_0_/_1.00)]"
              >{{ formatMoney(weeklyCases[1].value) }}</span
            >
          </div>
        </div>
        <div class="left-[2px] top-0 absolute justify-start text-white text-sm font-semibold font-['Rubik'] leading-6">
          {{ weeklyCases[1].range }}
        </div>
        <div
          class="px-3.5 left-[20px] top-[132px] absolute bg-green-600 rounded-[1px] inline-flex justify-center items-center gap-2.5 overflow-hidden"
        >
          <div class="justify-start text-white text-xs font-semibold font-['Rubik'] leading-6">
            {{ weeklyCases[1].statusLabel }}
          </div>
        </div>
      </div>

      <div class="w-28 h-40 relative">
        <div class="w-24 h-24 left-0 top-[24px] absolute overflow-hidden">
          <img class="w-24 h-24 left-0 top-0 absolute" src="../../../assets/img/weekly-case.png" />
          <div class="left-[16px] top-[38px] absolute justify-start">
            <span
              class="text-green-600 text-base font-extrabold font-['Rubik'] uppercase leading-6 [text-shadow:_-2px_-2px_6px_rgb(0_0_0_/_1.00)]"
              >$</span
            ><span
              class="text-white text-base font-extrabold font-['Rubik'] uppercase leading-6 [text-shadow:_-2px_-2px_6px_rgb(0_0_0_/_1.00)]"
              >{{ formatMoney(weeklyCases[2].value) }}</span
            >
          </div>
        </div>
        <div class="left-[2px] top-0 absolute justify-start text-white text-sm font-semibold font-['Rubik'] leading-6">
          {{ weeklyCases[2].range }}
        </div>
        <div
          class="px-3.5 left-[20px] top-[132px] absolute bg-green-600 rounded-[1px] inline-flex justify-center items-center gap-2.5 overflow-hidden"
        >
          <div class="justify-start text-white text-xs font-semibold font-['Rubik'] leading-6">
            {{ weeklyCases[2].statusLabel }}
          </div>
        </div>
      </div>

      <div class="w-28 h-44 relative">
        <div class="w-24 h-24 left-[5px] top-[24px] absolute">
          <img class="w-24 h-24 left-0 top-0 absolute" src="../../../assets/img/weekly-case.png" />
          <div class="left-[16px] top-[38px] absolute justify-start">
            <span
              class="text-green-600 text-base font-extrabold font-['Rubik'] uppercase leading-6 [text-shadow:_-2px_-2px_6px_rgb(0_0_0_/_1.00)]"
              >$</span
            ><span
              class="text-white text-base font-extrabold font-['Rubik'] uppercase leading-6 [text-shadow:_-2px_-2px_6px_rgb(0_0_0_/_1.00)]"
              >{{ formatMoney(weeklyCases[3].value) }}</span
            >
          </div>
        </div>
        <div class="px-3.5 left-[0.50px] top-[132px] absolute bg-green-600/50 rounded-[1px] inline-flex justify-center items-center gap-2.5">
          <div class="justify-start text-white text-xs font-semibold font-['Rubik'] leading-6">
            {{ weeklyCases[3].timeLeft }}
          </div>
        </div>
        <div class="left-[1px] top-0 absolute justify-start text-white text-sm font-semibold font-['Rubik'] leading-6">
          {{ weeklyCases[3].range }}
        </div>
        <div class="left-[29px] top-[160px] absolute justify-start text-white/70 text-sm font-semibold font-['Rubik'] leading-6">
          {{ weeklyCases[3].statusLabel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeeklyCases',
  data() {
    return {
      weeklyCases: [
        {
          range: 'Feb 20 - Feb 27',
          value: 96.35,
          statusLabel: 'OPEN'
        },
        {
          range: 'Feb 28 - Mar 6',
          value: 141.82,
          statusLabel: 'OPEN'
        },
        {
          range: 'Mar 7 - Mar 14',
          value: 118.47,
          statusLabel: 'OPEN'
        },
        {
          range: 'Mar 15 - Mar 21',
          value: 167.29,
          timeLeft: '3d 14h 25m',
          statusLabel: 'Current'
        }
      ]
    }
  },
  methods: {
    formatMoney(value) {
      return Number(value).toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
      })
    }
  }
}
</script>
