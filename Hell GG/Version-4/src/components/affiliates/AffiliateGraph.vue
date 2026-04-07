<template>
  <div class="h-[300px] w-full my-5 relative">
    <Line :data="chartData" :options="chartOptions" />
    <div id="aff-chartjs-tooltip" class="custom-tooltip"></div>
  </div>
</template>
<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default {
  components: { Line },
  data() {
    const coinImg = new Image(18, 18);
    coinImg.src = "/img/icons/dollar-icon.png";

    const dataValues = [
      1000,
      500,
      1200,
      200,
      1300,
      1800,
      3800,
      1800,
      1300,
      1000,
      1500,
      4800,
    ];

    return {
      chartData: {
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
        datasets: [
          {
            label: "Wagered",
            data: dataValues,
            borderColor: "#ff3435",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointStyle: coinImg,
            pointRadius: 8,
            pointHoverRadius: 12,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        datasets: {
          line: {
            pointHitRadius: 25,
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: (context) => {
              const { chart, tooltip } = context;
              const tooltipEl = document.getElementById("aff-chartjs-tooltip");

              if (tooltip.opacity === 0) {
                if (tooltipEl && tooltipEl.matches(":hover")) {
                  tooltipEl.style.opacity = 1;
                  return;
                }
                tooltipEl.style.opacity = 0;
                return;
              }

              if (tooltip.body) {
                const index = tooltip.dataPoints[0].dataIndex;
                const value = dataValues[index];

                tooltipEl.innerHTML = `
                  <div class='bg-[#620101] p-3 rounded-sm flex flex-col w-max border border-solid border-[rgba(255,52,53,0.4)] shadow-2xl'>
                      <div class='flex items-center justify-between text-white opacity-40 font-Rubik text-[9px] pb-2'>
                          <span>TUE 18/11/2025</span>
                          <span>16:18</span>
                      </div>
                      <div class='flex items-center justify-between text-white gap-2 font-Rubik text-[10px] border-b border-white/10 py-2'>
                          <span class='text-white font-[400]'>TOTAL EARNED</span>
                          <span class='text-white font-[800] flex items-center gap-1'>
                            <img src="/img/dollarCoin.png" alt="dollar" width="16" />
                            ${value.toLocaleString()}</span>
                      </div>
                      <div class='flex items-center justify-between text-white gap-2 font-Rubik text-[10px] border-b border-white/10 py-2'>
                          <span class='text-white font-[400]'>TOTAL CLAIMED</span>
                          <span class='text-white font-[800] flex items-center gap-1'>
                            <img src="/img/dollarCoin.png" alt="dollar" width="16" />
                            13,231.54</span>
                      </div>
                      <div class='flex items-center justify-between text-white gap-2 font-Rubik text-[10px] border-b border-white/10 py-2'>
                          <span class='text-white font-[400]'>TOTAL AFFILIATES</span>
                          <span class='text-white font-[800]'>12</span>
                      </div>
                      <div class='flex items-center justify-between text-white gap-2 font-Rubik text-[10px] pt-2'>
                          <span class='text-white font-[400]'>TOTAL USERS</span>
                          <span class='text-white font-[800]'>12</span>
                      </div>
                  </div>`;
              }

              const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
              tooltipEl.style.opacity = 1;

              const tw = tooltipEl.offsetWidth;
              const th = tooltipEl.offsetHeight;

              let left = positionX + tooltip.caretX - tw / 2;
              let top = positionY + tooltip.caretY - th - 15;

              if (left < 10) left = 10;
              if (left + tw > window.innerWidth) left = window.innerWidth - tw - 10;
              if (top < 0) top = positionY + tooltip.caretY + 15;
              tooltipEl.style.left = left + "px";
              tooltipEl.style.top = top + "px";
            },
          },
        },
        scales: {
          y: {
            min: 0,
            max: 5000,
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: {
              color: "#666",
              font: { family: "rubik", size: 10 },
              callback: (val) => "$" + val.toLocaleString(),
            },
          },
          x: {
            grid: { display: false },
            ticks: {
              color: "rgba(255,255,255,0.6)",
              font: { family: "rubik", size: 10 },
            },
          },
        },
      },
    };
  },
};
</script>
<style scoped>
.custom-tooltip::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  height: 25px;
  background: transparent;
}
.custom-tooltip {
  position: absolute;
  pointer-events: auto !important;
  z-index: 999;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.custom-tooltip::before {
  content: "";
  position: absolute;
  top: -15px;
  bottom: -15px;
  left: -15px;
  right: -15px;
  z-index: -1;
}
</style>
