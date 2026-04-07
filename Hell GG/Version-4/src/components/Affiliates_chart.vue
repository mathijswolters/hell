<template>
  <div style="width: 100%; height: 270px" class="relative">
    <Line :data="chartData" :options="chartOptions" />
    <div id="aff-chartjs-tooltip" class="custom-tooltip"></div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default {
  name: "CustomChartPage",
  components: { Line },
  data() {
    const dataPoints = [
      { value: 500, type: "J" },
      { value: 300, type: "C" },
      { value: 800, type: "J" },
      { value: 400, type: "C" },
      { value: 700, type: "J" },
      { value: 600, type: "J" },
      { value: 1200, type: "C" },
      { value: 1500, type: "J" },
      { value: 1100, type: "C" },
      { value: 900, type: "C" },
      { value: 1400, type: "J" },
      { value: 1800, type: "J" },
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
            data: dataPoints.map((dp) => dp.value),
            borderColor: "rgba(255, 52, 53, 1)",
            segment: {},
            borderWidth: 2,
            pointBorderColor: (ctx) =>
              dataPoints[ctx.dataIndex]?.type === "C" ? "yellow" : "green",
            pointBackgroundColor: (ctx) =>
              dataPoints[ctx.dataIndex]?.type === "C" ? "yellow" : "green",
            pointRadius: 12,
            pointStyle: (ctx) => {
              if (!ctx || ctx.dataIndex === undefined) return;
              const img = new Image();
              img.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMSAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfaV8yNDAxXzE5MTMxKSI+CjxlbGxpcHNlIGN4PSIxMC4xNTEyIiBjeT0iMTIiIHJ4PSIxMC4xNTEyIiByeT0iMTAiIGZpbGw9IiMwNEFCNTMiLz4KPC9nPgo8cGF0aCBkPSJNMTkuMzAyMyAxMkMxOS4zMDIzIDE2Ljk1NjUgMTUuMjE5NCAyMSAxMC4xNTEyIDIxQzUuMDgyOTEgMjEgMSAxNi45NTY1IDEgMTJDMSA3LjA0MzUzIDUuMDgyOTEgMyAxMC4xNTEyIDNDMTUuMjE5NCAzIDE5LjMwMjMgNy4wNDM1MyAxOS4zMDIzIDEyWiIgc3Ryb2tlPSIjMDA4RjQ0IiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTkuMDc0IDE4LjRDOC45ODA2NyAxOC40IDguODk2NjcgMTguMzYyNyA4LjgyMiAxOC4yODhDOC43NDczMyAxOC4yMjI3IDguNzEgMTguMTM4NyA4LjcxIDE4LjAzNlYxNy4wN0M3Ljk4MiAxNi45NjczIDcuMzc1MzMgMTYuNzc2IDYuODkgMTYuNDk2QzYuNDA0NjcgMTYuMjE2IDYuMDM2IDE1Ljg4IDUuNzg0IDE1LjQ4OEM1LjU0MTMzIDE1LjA4NjcgNS40MTUzMyAxNC42NzEzIDUuNDA2IDE0LjI0MkM1LjQwNiAxNC4xNTggNS40MzQgMTQuMDg4IDUuNDkgMTQuMDMyQzUuNTQ2IDEzLjk3NiA1LjYxNiAxMy45NDggNS43IDEzLjk0OEg3LjkyNkM4LjA1NjY3IDEzLjk0OCA4LjE1OTMzIDEzLjk3MTMgOC4yMzQgMTQuMDE4QzguMzA4NjcgMTQuMDU1MyA4LjM4OCAxNC4xMTEzIDguNDcyIDE0LjE4NkM4LjU0NjY3IDE0LjI4ODcgOC42NCAxNC4zODY3IDguNzUyIDE0LjQ4QzguODczMzMgMTQuNTY0IDkuMDIyNjcgMTQuNjM0IDkuMiAxNC42OUM5LjM3NzMzIDE0LjczNjcgOS41ODI2NyAxNC43NiA5LjgxNiAxNC43NkMxMC4yNDUzIDE0Ljc2IDEwLjU3NjcgMTQuNzA0IDEwLjgxIDE0LjU5MkMxMS4wNDMzIDE0LjQ3MDcgMTEuMTYgMTQuMzA3MyAxMS4xNiAxNC4xMDJDMTEuMTYgMTMuOTQzMyAxMS4wOTQ3IDEzLjgxMjcgMTAuOTY0IDEzLjcxQzEwLjg0MjcgMTMuNjA3MyAxMC42MzI3IDEzLjUxNCAxMC4zMzQgMTMuNDNDMTAuMDM1MyAxMy4zNDYgOS42MjkzMyAxMy4yNTczIDkuMTE2IDEzLjE2NEM4LjM5NzMzIDEzLjA0MjcgNy43NzY2NyAxMi44NjUzIDcuMjU0IDEyLjYzMkM2LjczMTMzIDEyLjM4OTMgNi4zMyAxMi4wNjczIDYuMDUgMTEuNjY2QzUuNzc5MzMgMTEuMjU1MyA1LjY0NCAxMC43NTEzIDUuNjQ0IDEwLjE1NEM1LjY0NCA5LjM3IDUuOTE5MzMgOC43MTIgNi40NyA4LjE4QzcuMDIwNjcgNy42Mzg2NyA3Ljc2NzMzIDcuMjkzMzMgOC43MSA3LjE0NFY2LjE2NEM4LjcxIDYuMDYxMzMgOC43NDczMyA1Ljk3NzMzIDguODIyIDUuOTEyQzguODk2NjcgNS44MzczMyA4Ljk4MDY3IDUuOCA5LjA3NCA1LjhIMTAuNTAyQzEwLjYwNDcgNS44IDEwLjY4ODcgNS44MzczMyAxMC43NTQgNS45MTJDMTAuODI4NyA1Ljk3NzMzIDEwLjg2NiA2LjA2MTMzIDEwLjg2NiA2LjE2NFY3LjE4NkMxMS41Mjg3IDcuMzA3MzMgMTIuMDc5MyA3LjUxNzMzIDEyLjUxOCA3LjgxNkMxMi45NjYgOC4xMTQ2NyAxMy4zMDY3IDguNDUwNjcgMTMuNTQgOC44MjRDMTMuNzgyNyA5LjE4OCAxMy45MDg3IDkuNTM4IDEzLjkxOCA5Ljg3NEMxMy45MTggOS45NTggMTMuODg1MyAxMC4wMzI3IDEzLjgyIDEwLjA5OEMxMy43NjQgMTAuMTU0IDEzLjY5ODcgMTAuMTgyIDEzLjYyNCAxMC4xODJIMTEuMjg2QzExLjE3NCAxMC4xODIgMTEuMDc2IDEwLjE2MzMgMTAuOTkyIDEwLjEyNkMxMC45MTczIDEwLjA4ODcgMTAuODQ3MyAxMC4wMjggMTAuNzgyIDkuOTQ0QzEwLjczNTMgOS44MTMzMyAxMC42MTg3IDkuNjk2NjcgMTAuNDMyIDkuNTk0QzEwLjI0NTMgOS40OTEzMyAxMC4wMDczIDkuNDQgOS43MTggOS40NEM5LjQwMDY3IDkuNDQgOS4xNTggOS40OTYgOC45OSA5LjYwOEM4LjgyMiA5LjcxMDY3IDguNzM4IDkuODY0NjcgOC43MzggMTAuMDdDOC43MzggMTAuMjEgOC43ODkzMyAxMC4zMzEzIDguODkyIDEwLjQzNEM4Ljk5NDY3IDEwLjUzNjcgOS4xNzY2NyAxMC42MyA5LjQzOCAxMC43MTRDOS42OTkzMyAxMC43ODg3IDEwLjA2MzMgMTAuODcyNyAxMC41MyAxMC45NjZDMTEuNDE2NyAxMS4wOTY3IDEyLjEzMDcgMTEuMjgzMyAxMi42NzIgMTEuNTI2QzEzLjIyMjcgMTEuNzY4NyAxMy42MjQgMTIuMDg2IDEzLjg3NiAxMi40NzhDMTQuMTI4IDEyLjg3IDE0LjI1NCAxMy4zNiAxNC4yNTQgMTMuOTQ4QzE0LjI1NCAxNC41MDggMTQuMTA5MyAxNS4wMDczIDEzLjgyIDE1LjQ0NkMxMy41NCAxNS44NzUzIDEzLjE0MzMgMTYuMjI1MyAxMi42MyAxNi40OTZDMTIuMTI2IDE2Ljc2NjcgMTEuNTM4IDE2Ljk1MzMgMTAuODY2IDE3LjA1NlYxOC4wMzZDMTAuODY2IDE4LjEzODcgMTAuODI4NyAxOC4yMjI3IDEwLjc1NCAxOC4yODhDMTAuNjg4NyAxOC4zNjI3IDEwLjYwNDcgMTguNCAxMC41MDIgMTguNEg5LjA3NFoiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2lfMjQwMV8xOTEzMSIgeD0iMCIgeT0iMiIgd2lkdGg9IjIwLjMwMjIiIGhlaWdodD0iMjQiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvd18yNDAxXzE5MTMxIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPgo=";
              return img;
            },
            fill: false,
            tension: 0.4,
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
              let tooltipEl = document.getElementById("aff-chartjs-tooltip");

              if (tooltip.opacity === 0) {
                if (!tooltipEl?.matches(":hover")) {
                  tooltipEl.style.opacity = 0;
                }
                return;
              }

              if (tooltip.body) {
                const dataIndex = tooltip.dataPoints[0].dataIndex;
                const value = chart.data.datasets[0].data[dataIndex];

                tooltipEl.innerHTML = `
            <div class='bg-[rgba(98,1,1,1)] p-2 rounded-sm flex flex-col gap-y-2 w-[168px] border border-solid border-[rgba(255,52,53,0.5)] shadow-2xl'>
                <div class='flex items-center justify-between text-white opacity-50 font-Rubik font-normal text-[8px]'>
                    <span>SUN 25/10/2024</span>
                    <span>18:45</span>
                </div>
                
                <div class='flex items-center justify-between text-white font-Rubik font-normal text-[8px] border-b-dotted border-b border-b-[rgba(255,52,53,0.15)] py-1'>
                    <span>TOTAL PURCHASED</span>
                    <span class='flex items-center gap-x-0.5 h-full'>
                        <img src='/img/dollarCoin.png' class='-mt-0.5 w-[10px] h-[10px]'/>
                        ${Number(value).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                    </span>
                </div>

                <div class='flex items-center justify-between text-white font-Rubik font-normal text-[8px] border-b-dotted border-b border-b-[rgba(255,52,53,0.15)] py-1'>
                    <span>COMMISSION PAID</span>
                    <span class='flex items-center gap-x-0.5 h-full'>
                        <img src='/img/dollarCoin.png' class='-mt-0.5 w-[10px] h-[10px]'/>
                        ${Number(value).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                    </span>
                </div>
                
                <div class='flex items-center justify-between text-white font-Rubik font-normal text-[8px] py-1'>
                    <span>ALL REFEREES!</span>
                    <span class='font-bold'>12</span>
                </div>
            </div>`;
              }

              const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

              tooltipEl.style.opacity = 1;

              const tooltipWidth = tooltipEl.offsetWidth;
              const tooltipHeight = tooltipEl.offsetHeight;

              let left = positionX + tooltip.caretX - tooltipWidth / 2;
              let top = positionY + tooltip.caretY - tooltipHeight - 15;

              if (left < 10) left = 10;
              if (left + tooltipWidth > window.innerWidth) {
                left = window.innerWidth - tooltipWidth - 10;
              }

              if (top < 0) {
                top = positionY + tooltip.caretY + 15;
              }

              tooltipEl.style.left = left + "px";
              tooltipEl.style.top = top + "px";
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: {
                family: "rubik",
                weight: "medium",
                size: 12,
              },
              color: "rgba(255, 255, 255, 0.6)",
              stepSize: 500,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(98, 1, 1, 1)",
            },
            ticks: {
              font: {
                family: "rubik",
                weight: "medium",
                size: 12,
              },
              color: "rgba(255, 255, 255, 0.6)",
              stepSize: 500,
              padding: 10,
              callback: function (value) {
                return `$${value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`;
              },
              maxTicksLimit: 5,
            },
            position: "left",
            offset: true,
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.custom-tooltip {
  position: absolute;
  pointer-events: auto !important;
  transition: opacity 0.15s ease;
  z-index: 50;
  opacity: 0;
}

.custom-tooltip::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
  height: 20px;
  background: transparent;
}
</style>
