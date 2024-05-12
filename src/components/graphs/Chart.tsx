import {
  Chart,
  ChartConfiguration,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartStreaming from "chartjs-plugin-streaming";
import { useEffect, useRef, useState } from "react";
import "chartjs-adapter-date-fns";

import "./Graphs.css";

interface ILineChart {
  label: string;
  color: string;
  rate: number; //ms
  range?: number; //seconds
}

function LineChart({ label, color }: Readonly<ILineChart>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  Chart.register(
    TimeScale,
    LineController,
    PointElement,
    LinearScale,
    LineElement,
    ChartStreaming,
    Filler,
    Title,
    Tooltip,
    Legend
  );

  function commonOptions(title: string, color: string) {
    const config = {
      type: "line",
      data: {
        labels: [new Date()],
        datasets: [
          {
            label: title,
            data: [0],
            fill: false,
            borderColor: color,
            borderWidth: 2,
            pointRadius: 1,
            cubicInterpolationMode: "monotone",
            beginAtZero: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          x: {
            type: "realtime",
            realtime: {
              duration: 20000,
              refresh: 1000,
              delay: 2000,
              onRefresh: (chart: Chart) => {
                chart.data.labels?.push(new Date());
                chart.data.datasets[0].data.push(Math.random() * 20);
                chart.update();
              },
            },
          },
          y: {
            display: true,
            beginAtZero: true,
            ticks: {
              autoSkip: true,
            },
          },
        },
      },
    };

    return config as ChartConfiguration;
  }

  useEffect(() => {
    const chart = canvasRef.current as HTMLCanvasElement;

    new Chart(chart, commonOptions(label, color));
  }, []);


  return (
    <div className="chart">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default LineChart;
