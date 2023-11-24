
import React, { useState, useEffect }  from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = () => {
    const userData = JSON.parse(localStorage.getItem("userdata"))

    const token = userData.token
    const userId = userData.userId;
    const [devices, setDevices] = useState([]);

    const url = `/api/v1/DeviceByUserProfileId/${userId}`;

    useEffect(() => {
        fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        })
        .then((response) => {
        return response.json();
        })
        .then((resData) => {
        setDevices(resData.deviceData);
        })
        .catch((error) => {
        window.location.href = '/login';
        });
    }, []);


  // Set up your Highcharts configuration for the line chart with a threshold line
  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Monthly consumption per device',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    //   plotLines: [
    //     {
    //       value: 80, // Set the threshold value
    //       color: 'red', // Set the color of the threshold line
    //       dashStyle: 'dash', // Set the style of the threshold line (optional)
    //       width: 2, // Set the width of the threshold line (optional)
    //       label: {
    //         text: 'Threshold', // Set the label for the threshold line (optional)
    //         align: 'right',
    //         x: -10,
    //       },
    //     },
    //   ],
    },
    series: [
      {
        name: 'Values',
        data: [90, 85, 88, 92, 78, 83, 75, 80, 95, 89, 91, 87],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
