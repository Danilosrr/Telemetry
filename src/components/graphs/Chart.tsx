import {
  Chart,
  ChartConfiguration,
  Filler,
  Interaction,
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
import useBuffer from "../../hooks/UseBuffer";
import { useEffect, useRef } from "react";
import "chartjs-adapter-date-fns";
import "./Graphs.css";

interface ILineChart {
  label: string;
  color: string;
  rate: number; //ms
  delay: number;
  range: number; //seconds
}

function LineChart({ label, color, rate, delay, range }: Readonly<ILineChart>) {
  const { accessKey, clearKey } = useBuffer();
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

  function onRefresh(chart: Chart){
    const data = accessKey(label);
    for (const value of data) {
      chart.data.labels?.push(new Date())
      chart.data.datasets[0].data.push(value); // get from a data context;
    }
    clearKey(label);
    chart.update();
  }

  function commonOptions(title: string, color: string) {
    const hoverLine = {
      id: 'hoverline'
    };

    const config = {
      type: "line",
      animation: false,
      data: {
        labels: [],
        datasets: [
          {
            label: title,
            data: [],
            fill: false,
            borderColor: color,
            borderWidth: 2,
            pointRadius: 0,
            cubicInterpolationMode: "monotone",
            spanGaps: true,
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
              duration: range,
              ttl: range+delay,
              refresh: rate,
              delay: delay,
              framerate: 5,
              onRefresh: onRefresh,
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
      <canvas ref={canvasRef} ></canvas>
    </div>
  );
}

export default LineChart;
