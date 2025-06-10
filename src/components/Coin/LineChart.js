import React from 'react';
import { Line } from 'react-chartjs-2';
import './linechart.css';
import { convertNumbers } from '../../function/convertNumber';

// ✅ Import and register Chart.js components
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);



function LineChart({ chartData, mutliAxis, priceType }) {
  const options = {
    plugins: {
      legend: {
        display: mutliAxis,
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear', // ✅ explicitly use registered scale
        ticks:
          priceType === 'market_caps'
            ? {
                callback: function (value) {
                  return '$' + convertNumbers(value);
                },
              }
            : priceType === 'total_volumes'
            ? {
                callback: function (value) {
                  return convertNumbers(value);
                },
              }
            : {
                callback: function (value) {
                  return '$' + value.toLocaleString();
                },
              },
      },
      y1: mutliAxis
        ? {
            type: 'linear',
            display: true,
            position: 'right',
            ticks:
              priceType === 'market_caps'
                ? {
                    callback: function (value) {
                      return '$' + convertNumbers(value);
                    },
                  }
                : priceType === 'total_volumes'
                ? {
                    callback: function (value) {
                      return convertNumbers(value);
                    },
                  }
                : {
                    callback: function (value) {
                      return '$' + value.toLocaleString();
                    },
                  },
          }
        : { display: false },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
