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
import { useEffect, useRef } from "react";
import "chartjs-adapter-date-fns";
import "./Graphs.css";

interface ILineChart {
  label:string, 
  color:string,
  rate: number, //ms
  range?: number, //seconds
}

function commonOptions(title: string,color:string, rate:number) {
  Chart.register(
    TimeScale,
    LineController,
    PointElement,
    LinearScale,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
  );

  const config = {
    type: "line",
    data: {
      labels:[new Date()],
      datasets: [
        {
          label: title,
          data: [0],
          fill: false,
          borderColor: color,
          borderWidth: 2,
          pointRadius: 1,
          cubicInterpolationMode: "monotone",
          beginAtZero: true
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
            enabled: false,
        }
      },
      animation: {
        duration: rate
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: 'minute',
          },
          grid: {
            display: false
          },
          ticks:{
            source: 'data',
            maxTicksLimit: 10
          }
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

function LineChart({label, color, rate, range}:Readonly<ILineChart>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const xAccelChart = canvasRef.current as HTMLCanvasElement;

    const xAccelChartInstance = new Chart(
      xAccelChart,
      commonOptions(label,color, rate)
    );

    
    setInterval(()=>{updateData(xAccelChartInstance)},rate)
  }, []);

  function updateData(chartInstance:Chart){//placeholder for visualization
    if (range && chartInstance.data.datasets[0].data.length>(range*1000/rate)){//limit the elements number to the time range chosen
      chartInstance.data.labels?.shift();
      chartInstance.data.datasets[0].data.shift();
    }

    chartInstance?.data?.labels?.push(new Date());
    chartInstance?.data.datasets[0].data.push(Math.random()*20);
    
    console.log(`${chartInstance.data.datasets[0].data.length}, ${(range*1000/rate)}`)
    chartInstance?.update(); 
  }

  return (
    <div className="chart">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default LineChart;
