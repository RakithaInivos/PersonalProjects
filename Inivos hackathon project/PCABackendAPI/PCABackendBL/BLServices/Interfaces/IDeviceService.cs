﻿using PCABackendBL.APIEntity;
using PCABackendDA.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCABackendBL.BLServices.Interfaces
{
    public interface IDeviceService
    {
        DeviceInfo RegisterDevice(DeviceInfoServiceInsertModel device);
        DeviceInfo UpdateDevice(DeviceInfoServiceInsertModel device);
        DeviceInfo GetDeviceById(int deviceId);
        DeviceInfo GetDeviceBySerialKey(string serialKey);
        List<DeviceInfoServiceModel> GetDeviceByUserProfileId(int userProfileId);
        bool IsDeviceSerialKeyAvailable(string serialKey);
    }
}
