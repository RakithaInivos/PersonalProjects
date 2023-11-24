// VerticalBarChart.js
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarChart = () => {
  // Set up your Highcharts configuration for the vertical bar chart
  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Device Consumptions (units)',
    },
    xAxis: {
      categories: ['Device 1', 'Device 2', 'Device 3', 'Device 4', 'Device 5'],
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    series: [
      {
        name: 'Values',
        data: [10, 20, 30, 60, 40],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
