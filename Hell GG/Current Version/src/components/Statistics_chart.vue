<template>
  <div style="width: 100%; height: 220px; position: relative">
    <Line :data="chartData" :options="chartOptions" />
    <div id="stat-chartjs-tooltip" class="custom-tooltip"></div>
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
            borderColor: (ctx) => {
              const colors = [];
              for (let i = 0; i < dataPoints.length - 1; i++) {
                const currentType = dataPoints[i].type;
                const nextType = dataPoints[i + 1].type;
                colors.push(currentType === nextType ? "red" : "green");
              }
              colors.push(colors[colors.length - 1]);
              return colors;
            },
            segment: {
              borderColor: (ctx) => {
                if (!ctx.p0 || !ctx.p1) return "green";
                const curr = dataPoints[ctx.p0DataIndex]?.value;
                const next = dataPoints[ctx.p1DataIndex]?.value;

                return curr > next ? "rgba(255, 52, 53, 1)" : "rgba(4, 171, 83, 1)";
              },
            },
            borderWidth: 2,
            pointBorderColor: (ctx) =>
              dataPoints[ctx.dataIndex]?.type === "C" ? "yellow" : "green",
            pointBackgroundColor: (ctx) =>
              dataPoints[ctx.dataIndex]?.type === "C" ? "yellow" : "green",
            pointRadius: 12,
            pointHoverRadius: 15,
            pointStyle: (ctx) => {
              if (!ctx || ctx.dataIndex === undefined) return;
              const type = dataPoints[ctx.dataIndex]?.type;
              const img = new Image();
              img.src =
                type === "C"
                  ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjkiIHZpZXdCb3g9IjAgMCAyOCAyOSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfaV8yNDI1XzEyOTYwKSI+CjxlbGxpcHNlIGN4PSIxNC4zMzgzIiBjeT0iMTMuNTg5NSIgcng9IjEzLjM2MTMiIHJ5PSIxMy4xNjIzIiBmaWxsPSIjRkVCRDExIi8+CjwvZz4KPHBhdGggZD0iTTI2LjY5OTYgMTMuNTg5NUMyNi42OTk2IDIwLjI5MjUgMjEuMTc5NCAyNS43NTE4IDE0LjMzODMgMjUuNzUxOEM3LjQ5NzE4IDI1Ljc1MTggMS45NzcwNSAyMC4yOTI1IDEuOTc3MDUgMTMuNTg5NUMxLjk3NzA1IDYuODg2NTIgNy40OTcxOCAxLjQyNzE5IDE0LjMzODMgMS40MjcxOUMyMS4xNzk0IDEuNDI3MTkgMjYuNjk5NiA2Ljg4NjUyIDI2LjY5OTYgMTMuNTg5NVoiIHN0cm9rZT0iI0U0QUEwRSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xNC4wOTYgMTguMTRDMTMuMjA5MyAxOC4xNCAxMi40MzQ3IDE4LjAwNDcgMTEuNzcyIDE3LjczNEMxMS4xMDkzIDE3LjQ1NCAxMC41ODY3IDE3LjAzNCAxMC4yMDQgMTYuNDc0QzkuODMwNjcgMTUuOTE0IDkuNjI1MzMgMTUuMjA0NyA5LjU4OCAxNC4zNDZDOS41Nzg2NyAxMy45NjMzIDkuNTc0IDEzLjU1MjcgOS41NzQgMTMuMTE0QzkuNTc0IDEyLjY3NTMgOS41Nzg2NyAxMi4yNTUzIDkuNTg4IDExLjg1NEM5LjYyNTMzIDExLjAxNCA5LjgzNTMzIDEwLjMxNCAxMC4yMTggOS43NTRDMTAuNjEgOS4xODQ2NyAxMS4xMzczIDguNzYgMTEuOCA4LjQ4QzEyLjQ3MiA4LjIgMTMuMjM3MyA4LjA2IDE0LjA5NiA4LjA2QzE0LjcxMiA4LjA2IDE1LjI4NiA4LjEzNDY3IDE1LjgxOCA4LjI4NEMxNi4zNTkzIDguNDI0IDE2Ljg0IDguNjQzMzMgMTcuMjYgOC45NDJDMTcuNjggOS4yMzEzMyAxOC4wMTEzIDkuNTk1MzMgMTguMjU0IDEwLjAzNEMxOC40OTY3IDEwLjQ2MzMgMTguNjIyNyAxMC45NjczIDE4LjYzMiAxMS41NDZDMTguNjMyIDExLjYzIDE4LjU5OTMgMTEuNyAxOC41MzQgMTEuNzU2QzE4LjQ3OCAxMS44MTIgMTguNDA4IDExLjg0IDE4LjMyNCAxMS44NEgxNS45NThDMTUuODE4IDExLjg0IDE1LjcxNTMgMTEuODEyIDE1LjY1IDExLjc1NkMxNS41ODQ3IDExLjcgMTUuNTI4NyAxMS42MDIgMTUuNDgyIDExLjQ2MkMxNS4zNjA3IDExLjA2MDcgMTUuMTgzMyAxMC43OSAxNC45NSAxMC42NUMxNC43MTY3IDEwLjUxIDE0LjQzMiAxMC40NCAxNC4wOTYgMTAuNDRDMTMuNjg1MyAxMC40NCAxMy4zNTg3IDEwLjU1MiAxMy4xMTYgMTAuNzc2QzEyLjg3MzMgMTAuOTkwNyAxMi43NDI3IDExLjM3MzMgMTIuNzI0IDExLjkyNEMxMi42OTYgMTIuNjg5MyAxMi42OTYgMTMuNDczMyAxMi43MjQgMTQuMjc2QzEyLjc0MjcgMTQuODI2NyAxMi44NzMzIDE1LjIxNCAxMy4xMTYgMTUuNDM4QzEzLjM1ODcgMTUuNjUyNyAxMy42ODUzIDE1Ljc2IDE0LjA5NiAxNS43NkMxNC40MzIgMTUuNzYgMTQuNzE2NyAxNS42ODUzIDE0Ljk1IDE1LjUzNkMxNS4xOTI3IDE1LjM4NjcgMTUuMzcgMTUuMTIwNyAxNS40ODIgMTQuNzM4QzE1LjUxOTMgMTQuNTg4NyAxNS41NzA3IDE0LjQ5MDcgMTUuNjM2IDE0LjQ0NEMxNS43MTA3IDE0LjM4OCAxNS44MTggMTQuMzYgMTUuOTU4IDE0LjM2SDE4LjMyNEMxOC40MDggMTQuMzYgMTguNDc4IDE0LjM4OCAxOC41MzQgMTQuNDQ0QzE4LjU5OTMgMTQuNSAxOC42MzIgMTQuNTcgMTguNjMyIDE0LjY1NEMxOC42MjI3IDE1LjIzMjcgMTguNDk2NyAxNS43NDEzIDE4LjI1NCAxNi4xOEMxOC4wMTEzIDE2LjYwOTMgMTcuNjggMTYuOTczMyAxNy4yNiAxNy4yNzJDMTYuODQgMTcuNTYxMyAxNi4zNTkzIDE3Ljc4MDcgMTUuODE4IDE3LjkzQzE1LjI4NiAxOC4wNyAxNC43MTIgMTguMTQgMTQuMDk2IDE4LjE0WiIgZmlsbD0id2hpdGUiLz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaV8yNDI1XzEyOTYwIiB4PSIwLjk3NzA1MSIgeT0iMC40MjcxODUiIHdpZHRoPSIyNi43MjI3IiBoZWlnaHQ9IjMwLjMyNDYiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvd18yNDI1XzEyOTYwIi8+CjwvZmlsdGVyPgo8L2RlZnM+Cjwvc3ZnPg=="
                  : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyOCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfaV8yNDI1XzEyOTU0KSI+CjxlbGxpcHNlIGN4PSIxNC4zMDM2IiBjeT0iMTMuMzMzIiByeD0iMTMuMzYxMyIgcnk9IjEzLjE2MjMiIGZpbGw9IiMwNEFCNTMiLz4KPC9nPgo8cGF0aCBkPSJNMjYuNjY0OSAxMy4zMzNDMjYuNjY0OSAyMC4wMzU5IDIxLjE0NDggMjUuNDk1MyAxNC4zMDM2IDI1LjQ5NTNDNy40NjI1MSAyNS40OTUzIDEuOTQyMzggMjAuMDM1OSAxLjk0MjM4IDEzLjMzM0MxLjk0MjM4IDYuNjI5OTkgNy40NjI1MSAxLjE3MDY1IDE0LjMwMzYgMS4xNzA2NUMyMS4xNDQ4IDEuMTcwNjUgMjYuNjY0OSA2LjYyOTk5IDI2LjY2NDkgMTMuMzMzWiIgc3Ryb2tlPSIjMDA4RjQ0IiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTE0LjQ4IDE5LjE0QzEzLjkyIDE5LjE0IDEzLjM4OCAxOS4wNyAxMi44ODQgMTguOTNDMTIuMzggMTguNzgwNyAxMS45MjczIDE4LjU2NiAxMS41MjYgMTguMjg2QzExLjEzNCAxOC4wMDYgMTAuODIxMyAxNy42NjA3IDEwLjU4OCAxNy4yNUMxMC4zNjQgMTYuODM5MyAxMC4yNDczIDE2LjM2MzMgMTAuMjM4IDE1LjgyMkMxMC4yMzggMTUuNzM4IDEwLjI2NiAxNS42NjggMTAuMzIyIDE1LjYxMkMxMC4zNzggMTUuNTQ2NyAxMC40NDggMTUuNTE0IDEwLjUzMiAxNS41MTRIMTIuOTEyQzEzLjA2MTMgMTUuNTE0IDEzLjE2ODcgMTUuNTQ2NyAxMy4yMzQgMTUuNjEyQzEzLjMwODcgMTUuNjc3MyAxMy4zNzQgMTUuNzg0NyAxMy40MyAxNS45MzRDMTMuNDk1MyAxNi4xMjA3IDEzLjU3NDcgMTYuMjc5MyAxMy42NjggMTYuNDFDMTMuNzcwNyAxNi41MzEzIDEzLjg5NjcgMTYuNjIgMTQuMDQ2IDE2LjY3NkMxNC4xOTUzIDE2LjczMiAxNC4zNjggMTYuNzYgMTQuNTY0IDE2Ljc2QzE0LjkyOCAxNi43NiAxNS4yMDggMTYuNjQzMyAxNS40MDQgMTYuNDFDMTUuNjA5MyAxNi4xNzY3IDE1LjcxMiAxNS44MDggMTUuNzEyIDE1LjMwNFYxMS42NjRIMTEuMzU4QzExLjI1NTMgMTEuNjY0IDExLjE2NjcgMTEuNjMxMyAxMS4wOTIgMTEuNTY2QzExLjAyNjcgMTEuNDkxMyAxMC45OTQgMTEuNDAyNyAxMC45OTQgMTEuM1Y5LjU2NEMxMC45OTQgOS40NjEzMyAxMS4wMjY3IDkuMzc3MzMgMTEuMDkyIDkuMzEyQzExLjE2NjcgOS4yMzczMyAxMS4yNTUzIDkuMiAxMS4zNTggOS4ySDE4LjQ1NkMxOC41NTg3IDkuMiAxOC42NDI3IDkuMjM3MzMgMTguNzA4IDkuMzEyQzE4Ljc4MjcgOS4zNzczMyAxOC44MiA5LjQ2MTMzIDE4LjgyIDkuNTY0VjE1LjQwMkMxOC44MiAxNi4yMzI3IDE4LjYyODcgMTYuOTI4IDE4LjI0NiAxNy40ODhDMTcuODcyNyAxOC4wMzg3IDE3LjM1NDcgMTguNDU0IDE2LjY5MiAxOC43MzRDMTYuMDM4NyAxOS4wMDQ3IDE1LjMwMTMgMTkuMTQgMTQuNDggMTkuMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8ZGVmcz4KPGZpbHRlciBpZD0iZmlsdGVyMF9pXzI0MjVfMTI5NTQiIHg9IjAuOTQyMzgzIiB5PSIwLjE3MDY0NyIgd2lkdGg9IjI2LjcyMjciIGhlaWdodD0iMzAuMzI0NiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJzaGFwZSIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIgcmVzdWx0PSJoYXJkQWxwaGEiLz4KPGZlT2Zmc2V0IGR5PSI0Ii8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29tcG9zaXRlIGluMj0iaGFyZEFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJzaGFwZSIgcmVzdWx0PSJlZmZlY3QxX2lubmVyU2hhZG93XzI0MjVfMTI5NTQiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+";
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
        plugins: {
          legend: { display: false },
          tooltip: {
            interaction: {
              mode: "index",
              intersect: false,
            },
            plugins: {
              tooltip: {
                enabled: false,
                external: this.externalTooltipHandler,
              },
            },
            enabled: false,
            external: function (context) {
              const { chart, tooltip } = context;
              let tooltipEl = document.getElementById("stat-chartjs-tooltip");

              if (tooltip.opacity === 0) {
                if (!tooltipEl.matches(":hover")) {
                  tooltipEl.style.opacity = 0;
                }
                return;
              }

              if (tooltip.body) {
                const tooltipData = tooltip.dataPoints[0];
                const dataIndex = tooltipData.dataIndex;
                const currentPoint = dataPoints[dataIndex];
                const value = currentPoint.value;

                const prevValue = dataIndex > 0 ? dataPoints[dataIndex - 1].value : value;
                const isUp = value >= prevValue;

                tooltipEl.innerHTML = `
      <div class='bg-[rgba(98,1,1,1)] p-2 rounded-sm flex flex-col gap-y-2 w-[168px] border border-solid border-[rgba(255,52,53,0.5)] shadow-xl'>
          <div class='flex items-center justify-between text-white opacity-50 font-Rubik font-normal text-[8px]'>
              <span>SUN 25/10/2024</span>
              <span>18:45</span>
          </div>
          
          <div class='flex items-center justify-between text-white font-Rubik font-normal text-[8px] border-b-dotted border-b border-b-[rgba(255,52,53,0.15)] py-1'>
              <span>${currentPoint.type === "C" ? "Coinflip" : "Jackpot"}</span>
              <span class='flex items-center gap-x-0.5 h-full ${
                isUp ? "text-[rgba(4,171,83,1)]" : "text-[#FF3435]"
              }'>
                  <svg class='${
                    isUp ? "" : "rotate-180"
                  }' width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.8515 3.24307L4.35154 0.131931C4.25267 0.0439527 4.1355 0 4 0C3.8645 0 3.74735 0.0439527 3.64838 0.131931L0.148419 3.24307C0.0494455 3.33105 0 3.4352 0 3.55556C0 3.67591 0.0494455 3.78014 0.148419 3.86804C0.247501 3.95602 0.364644 4 0.500038 4L7.49994 4C7.63536 4 7.75258 3.95602 7.8515 3.86804C7.95036 3.78016 8 3.67594 8 3.55556C8 3.43518 7.95036 3.33105 7.8515 3.24307Z" fill="currentColor"/>
                  </svg>
                  $${Number(value).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </span>
          </div>

          <div class='flex items-center justify-between text-white font-Rubik font-normal text-[8px] border-b-dotted border-b border-b-[rgba(255,52,53,0.15)] h-8 pb-1.5'>
              <span class='text-white font-Rubik font-medium text-lg flex items-center'>
                <p class='font-Rubik font-medium ${
                  isUp ? "text-[rgba(4,171,83,1)]" : "text-[#FF3435]"
                }'>$</p>
                ${Number(value).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span class='flex items-end gap-x-0.5 h-full text-white font-Rubik font-medium text-[8px] opacity-50'>
                  Total lost
              </span>
          </div>
          
          <button class='w-full h-[21px] rounded-sm bg-[rgba(255,52,53,1)] text-white font-Rubik text-xs font-bold pointer-events-auto cursor-pointer'>VIEW</button>
      </div>
    `;
              }

              const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

              tooltipEl.style.opacity = 1;
              tooltipEl.style.position = "absolute";

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
            grid: { color: "rgba(98, 1, 1, 1)" },
            ticks: {
              font: {
                family: "rubik",
                weight: "medium",
                size: 12,
              },
              callback: function (value) {
                return `$${value.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`;
              },
              color: "rgba(255, 255, 255, 0.6)",
              stepSize: 500,
              padding: 10,
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

<style>
.custom-tooltip {
  position: absolute;
  pointer-events: auto;
  transition: opacity 0.2s ease;
  z-index: 100;
  opacity: 0;
}
#stat-chartjs-tooltip:hover {
  opacity: 1 !important;
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
