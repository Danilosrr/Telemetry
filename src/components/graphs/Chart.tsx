import {
  Chart,
  ChartConfiguration,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useRef } from "react";
import "chartjs-adapter-date-fns";
import "./Chart.css";

function commonOptions(title: string) {
  Chart.register(
    TimeScale,
    LineController,
    PointElement,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const config = {
    type: "line",
    data: {
      datasets: [
        {
          label: title,
          data: [0],
          fill: false,
          borderColor: "#343e9a",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: "time",
          time: {
            displayFormats: {
              hour: "HH:mm"
            }
          },
        },
        y: {
          display: true,
          beginAtZero: true,
          title: {
            display: true,
            text: title,
            font: { size: 16 },
          },
        },
      },
    },
  };

  return config as ChartConfiguration;
}

function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const xAccelChart = canvasRef.current as HTMLCanvasElement;
    console.log(xAccelChart);

    if (xAccelChart) {
      const xAccelChartInstance = new Chart(
        xAccelChart,
        commonOptions("X Acceleration")
      );
      function addData(data: number) {
        if (data) {
          xAccelChartInstance.data?.labels?.push(new Date());
          xAccelChartInstance.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
          });
          xAccelChartInstance.update();
        }
      }
    }
  }, []);

  return (
    <div id="accelContainer" className="container">
      <div id="xAccel" className="x">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default LineChart;
