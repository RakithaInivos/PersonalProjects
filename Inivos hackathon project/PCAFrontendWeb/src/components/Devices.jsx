import React, { useState, useEffect } from "react";

function Devices(props) {
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

  return (
    <div>
      <h3 className="mt-4">Device List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Device Serial Key</th>
            <th>Device Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Address</th>
            <th>Threshold </th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <tr key={device.deviceId}>
              <td>{device.deviceSerialKey}</td>
              <td>{device.applianceName}</td>
              <td>{device.deviceType}</td>
              <td>{device.internalLocation}</td>
              <td>{device.address}</td>
              <td>{device.powerThresholdValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Devices;
