﻿using PCABackendBL.APIEntity;
using PCABackendDA.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PCABackendBL.BLServices.Interfaces
{
    public interface IUserProfileService
    {
        bool IsUserAvailable(string userName);
        UserProfileServiceModel SaveNewUser(UserProfileServiceInsertModel userprofile);
        UserProfileServiceModel UpdateUserProfile(UserProfileServiceInsertModel userprofileObj);
        UserProfileServiceModel GetUserProfileData(int userProfileId);
        UserProfile GetUserForLogin(string username, string password);
    }
}
