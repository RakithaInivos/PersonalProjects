import React, { useState } from "react";
import Devices from "../components/Devices";


const DeviceManagementPage = () => {
  const userData = JSON.parse(localStorage.getItem("userdata"))

  if (userData === null) {
    window.location.href = '/login';
  } 

  const token = userData.token
  const userId = userData.userId;
  
  let isAdded = false;

  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    serial: "",
    location: "",
    address: "",
    threshold: 999,
  });

  // const [sliderValue, setSliderValue] = useState(999); // Initial value

  const handleInputChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  const handleAddDevice = () => {
    
    setDevices([...devices, newDevice]);
    console.log(newDevice);

    const apiUrl = "/api/v1/DeviceInfo";

    const postData = {
      deviceId: "0",
      userProfileId: userId,
      deviceSerialKey: newDevice.serial,
      deviceType: newDevice.type,
      applianceName: newDevice.name,
      internalLocation: newDevice.location,
      address: newDevice.address,
      powerThresholdValue: newDevice.threshold,
    };

    // Make a POST request with fetch
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData), // Convert the data to JSON format
    })
      .then((response) => response.json())
      .then((data) => {
        isAdded = true;
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setNewDevice({
      name: "",
      type: "",
      serial: "",
      location: "",
      address: "",
      threshold: 999,
    });
  };

  // const handleSliderChange = (event) => {
  //   console.log(event.target);
  //   setSliderValue(event.target.value);
  // };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Device Management</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">Device Management</li>
              </ol>
            </div>
          </div>

          <section className="mt-3">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-outline card-info">
                  <div className="card-header">
                    <h3 className="card-title">Device Information</h3>
                  </div>
                  <div className="card-body">
                    <div>
                      <form>
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="deviceType">
                              Device Serial Key:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="deviceSerial"
                              name="serial"
                              value={newDevice.serial}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <label htmlFor="deviceName">Device Name:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="deviceName"
                              name="name"
                              value={newDevice.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="deviceType">Device Type:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="deviceType"
                              name="type"
                              value={newDevice.type}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <label htmlFor="deviceType">
                              Internal Location:
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="internalLocation"
                              name="location"
                              value={newDevice.location}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="form-group col-md-8">
                            <label htmlFor="deviceType">Address:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="address"
                              name="address"
                              value={newDevice.address}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="form-group col-md-4">
                            <div>
                              <label htmlFor="slider">
                                Power Threshold (Units): {newDevice.threshold}
                              </label>
                              <input
                                className="custom-range"
                                type="range"
                                id="slider"
                                name="threshold"
                                min={0}
                                max={999}
                                value={newDevice.threshold}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleAddDevice}
                        >
                          Add Device
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="card-footer"></div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <Devices isAdded={isAdded} newDevice={newDevice} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeviceManagementPage;
