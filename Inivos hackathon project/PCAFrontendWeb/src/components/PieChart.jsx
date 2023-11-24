// Chart.js
import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PieChart = () => {
  // Set up your Highcharts configuration here
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Consumption as Percentage",
    },
    series: [
      {
        name: "Devices",
        colorByPoint: true,
        data: [
          {
            name: "Device 1",
            y: 30,
          },
          {
            name: "Device 2",
            y: 50,
          },
          {
            name: "Device 3",
            y: 30,
          },
          {
            name: "Device 4",
            y: 20,
          },
          {
            name: "Device 5",
            y: 50,
          },
          {
            name: "Device 6",
            y: 50,
          },
        ],
      },
    ],
  };

  // useEffect to clean up chart when the component unmounts
//   useEffect(() => {
//     return () => {
//       // Clean up chart when the component is unmounted
//       // This is important to prevent memory leaks
//       Highcharts.charts.forEach((chart) => {
//         if (chart) {
//           chart.destroy();
//         }
//       });
//     };
//   }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChart;
