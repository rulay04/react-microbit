// LineChart.js

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length) {
      const labels = data.map((entry) => entry.time);
      const avgVelocity = data.map((entry) => entry.velocity);
  
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Velocity',
              data: avgVelocity,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows resizing
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Time',
                fontSize: 25, // Adjust font size
              },
              ticks: {
                fontSize: 25, // Adjust font size
              },
              stepSize: 1,
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Velocity',
                fontSize: 25, // Adjust font size
              },
              ticks: {
                fontSize: 25, // Adjust font size
              },
              stepSize: 1,
            },
          },
        },
      });
    }
  }, [data]);
  

  return <canvas ref={chartRef} />;
};

export default LineChart;
