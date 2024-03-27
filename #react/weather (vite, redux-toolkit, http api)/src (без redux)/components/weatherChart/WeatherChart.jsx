import { useState, useEffect } from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const pluginHoverLine = {
  id: 'hoverLine',
  defaults: {
    width: 1,
    color: '#ffffff',
    dash: [0, 0],
  },
  afterInit: (chart) => {
    chart.hoverLine = { x: 0 };
  },
  afterEvent: (chart, args) => {
    const { inChartArea } = args;
    const x = chart.tooltip.$animations?.caretX?._to || chart.tooltip.caretX;
    chart.hoverLine = { x, draw: inChartArea };
    chart.draw();
  },
  beforeDatasetsDraw: (chart, args, opts) => {
    const { ctx } = chart;
    const { top, bottom } = chart.chartArea;
    const { x, draw } = chart.hoverLine;
    if (!draw) return;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = opts.width;
    ctx.strokeStyle = opts.color;
    ctx.setLineDash(opts.dash);
    ctx.moveTo(x, bottom);
    ctx.lineTo(x, top);
    ctx.stroke();
    ctx.restore();
  }
};

const WeatherChart = ({data}) => {
  const [chartLabelsX, setChartLabelsX] = useState(null);
  const [chartLabelsY, setChartLabelsY] = useState(null);

  useEffect(() => {
    const labelsX = data.map(item => item.time);
    const labelsY = data.map(item => Number(item.temperature));

    setChartLabelsX(labelsX);
    setChartLabelsY(labelsY);
  }, []);

  if(!chartLabelsX && !chartLabelsY) {
    return 'No chart...';
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: false,
      title: false,
      tooltip: {
        callbacks: {
          title: function (context) {
            const title = 'Time: ' + (context[0].label || '...');
            return title;
          },
          label: function (context) {
            const label = `${context.dataset.label}: ${context.formattedValue} °C`;
            return label;
          }
        }
      },
      hoverLine: {
        width: 1,
        color: '#FFDE17',
        animations: {
          opacity: {
            duration: 500,
            easing: 'ease',
            from: 0,
            to: 1,
          }
        },
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(130, 130, 130, 0.2)'
        },
        ticks: {
          padding: 10,
          color: '#eeeeee',
          font: {
            size: 8
          }
        }
      },
      y: {
        suggestedMin: Math.min(...chartLabelsY) - 3,
        suggestedMax: Math.max(...chartLabelsY) + 3,
        grid: {
          color: 'rgba(130, 130, 130, 0.2)'
        },
        ticks: {
          color: '#eeeeee',
          font: {
            size: 8
          }
        },
        title: {
          display: true,
          text: 'Temperature °C',
          color: '#eeeeee',
          font: {
            family: 'Arial',
            size: 12,
            weight: '700',
            lineHeight: 1,
          },
        }
      },
    },
  };

  const chartData = {
    labels: chartLabelsX,
    datasets: [
      {
        id: 1,
        label: 'Temperature',
        data: chartLabelsY,
        borderColor: '#00C6E0',
        backgroundColor: (context) => {
          if(!context.chart.chartArea) {
            return;
          }
          const { ctx, chartArea: {top, bottom} } = context.chart;
          const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
          gradientBg.addColorStop(0, 'rgba(0, 198, 224, 1)');
          gradientBg.addColorStop(1, 'rgba(0, 198, 224, 0)');
          return gradientBg;
        },
        borderWidth: 3,
        pointBackgroundColor: '#00C6E0',
        pointStyle: 'circle',
        pointRadius: 3,
        hoverRadius: 3,
        fill: true
      }
    ],
  };

  return (
    <Line
      options={chartOptions}
      data={chartData}
      plugins={[pluginHoverLine]}
    />
  );
};
export default WeatherChart;