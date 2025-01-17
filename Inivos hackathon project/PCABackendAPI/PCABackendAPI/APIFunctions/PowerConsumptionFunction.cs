using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;
using PCABackendBL.APIEntity;
using PCABackendBL.BLServices.Interfaces;
using PCABackendBL.Helper;
using PCABackendDA.DataModels;

namespace PCABackendAPI
{
    public class PowerConsumptionFunction
    {
        private readonly ILogger<PowerConsumptionFunction> _logger;
        private IPowerConsumptionService _consumptionService;
        private IDeviceService _deviceService;
        BasicAuthManager _basicAuthManager;
        JWTTokenManager _jwtTokenManager;


        public PowerConsumptionFunction(ILogger<PowerConsumptionFunction> log, IPowerConsumptionService consumptionService,IDeviceService deviceService)
        {
            _logger = log;
            _deviceService = deviceService;
            _consumptionService = consumptionService;
            _basicAuthManager = new BasicAuthManager();
            _jwtTokenManager = new JWTTokenManager();
        }

        #region InsertConsumption
        [FunctionName("InsertConsumption")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "PowerConsumptionManagement" })]
        [OpenApiSecurity("basic_auth", SecuritySchemeType.Http, Scheme = OpenApiSecuritySchemeType.Basic)]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(ConsumptionServiceModel), Description = "Parameters", Required = true)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> InsertConsumption([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "v1/PowerConsumption/")] HttpRequest req)
        {
            try
            {
                _logger.LogInformation("C# HTTP trigger InsertConsumption function processed a request.");

                if (!_basicAuthManager.ValidateToken(req.Headers.Authorization)) { return new UnauthorizedResult(); }

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                dynamic data = JsonConvert.DeserializeObject(requestBody);
                ConsumptionServiceModel consumptionInfor = JsonConvert.DeserializeObject<ConsumptionServiceModel>(requestBody);

                string msg = "";
                PowerConsumptionInfo savedobj = new PowerConsumptionInfo();

                if (consumptionInfor?.DeviceSerialKey == null) { return new BadRequestObjectResult("DeviceSerialKey is required"); }
                if (_deviceService.IsDeviceSerialKeyAvailable(consumptionInfor.DeviceSerialKey))
                {
                    savedobj = _consumptionService.InsertConsumption(consumptionInfor);
                    msg = $"The consumed unites {savedobj.ConsumedUnits} for device {savedobj.DeviceSerialKey} is saved successfully.";
                    return new OkObjectResult(new { msg = msg, consumptionData = savedobj });
                }
                else
                {
                    msg = $"The Device {consumptionInfor.DeviceSerialKey} is unavailable in the system. Please register your device {consumptionInfor.DeviceSerialKey}";
                    return new BadRequestObjectResult(msg);
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Argument error: {ex.Message}");
                return new BadRequestObjectResult(ex.Message);
            }
        }
        #endregion

        #region GetConsumptionBySerialKey
        [FunctionName("GetConsumptionBySerialKey")]
        [OpenApiOperation(operationId: "GetConsumptionBySerialKey", tags: new[] { "PowerConsumptionManagement" })]
        [OpenApiSecurity("bearer_auth", SecuritySchemeType.Http, Scheme = OpenApiSecuritySchemeType.Bearer, BearerFormat = "JWT")]
        [OpenApiParameter(name: "DeviceSerialKey", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "The **DeviceSerialKey** parameter")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> GetConsumptionBySerialKey([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "v1/PowerConsumption/{DeviceSerialKey}")] HttpRequest req, string DeviceSerialKey)
        {
            try
            {
                _logger.LogInformation("C# HTTP trigger GetConsumptionBySerialKey function processed a request.");

                if (!_jwtTokenManager.ValidateJWTToken(req)) { return new UnauthorizedResult(); }
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                string msg = "";

                if (string.IsNullOrWhiteSpace(DeviceSerialKey) == true) { return new BadRequestObjectResult("DeviceSerialKey is required"); }
                else
                {
                    List<ConsumptionServiceModel> consumption = _consumptionService.GetConsumptionBySerialKey(DeviceSerialKey);
                    if (consumption.Count == 0)
                    {
                        msg = "Consumption data not found.";
                    }
                    else
                    {
                        msg = "Consumption data found.";
                    }
                    return new OkObjectResult(new { msg = msg, consumptionData = consumption });
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Argument error: {ex.Message}");
                return new BadRequestObjectResult(ex.Message);
            }
        }
        #endregion

        #region GetConsumptionByDeviceId
        [FunctionName("GetConsumptionByDeviceId")]
        [OpenApiOperation(operationId: "GetConsumptionByDeviceId", tags: new[] { "PowerConsumptionManagement" })]
        [OpenApiSecurity("bearer_auth", SecuritySchemeType.Http, Scheme = OpenApiSecuritySchemeType.Bearer, BearerFormat = "JWT")]
        [OpenApiParameter(name: "DeviceId", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "The **DeviceId** parameter")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> GetConsumptionByDeviceId([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "v1/PowerConsumptionByDeviceId/{DeviceId}")] HttpRequest req, int DeviceId)
        {
            try
            {
                _logger.LogInformation("C# HTTP trigger GetConsumptionByDeviceId function processed a request.");

                if (!_jwtTokenManager.ValidateJWTToken(req)) { return new UnauthorizedResult(); }
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                string msg = "";

                if (DeviceId == 0) { return new BadRequestObjectResult("DeviceId is required"); }
                else
                {
                    List<ConsumptionServiceModel> consumption = _consumptionService.GetConsumptionByDeviceId(DeviceId);
                    if (consumption?.Count > 0) { msg = "Consumption data found."; }
                    else 
                    {
                        msg = "Consumption data not found.";
                        return new NotFoundObjectResult(new { msg = msg }); 
                    }
                    return new OkObjectResult(new { msg = msg, consumptionData = consumption });
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Argument error: {ex.Message}");
                return new BadRequestObjectResult(ex.Message);
            }
        }
        #endregion

        #region GetConsumptionByUserProfileId
        [FunctionName("GetConsumptionByUserProfileId")]
        [OpenApiOperation(operationId: "GetConsumptionByUserProfileId", tags: new[] { "PowerConsumptionManagement" })]
        [OpenApiSecurity("bearer_auth", SecuritySchemeType.Http, Scheme = OpenApiSecuritySchemeType.Bearer, BearerFormat = "JWT")]
        [OpenApiParameter(name: "UserProfileId", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "The **UserProfileId** parameter")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> GetConsumptionByUserProfileId([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "v1/PowerConsumptionByUserProfileId/{UserProfileId}")] HttpRequest req, int UserProfileId)
        {
            try
            {
                _logger.LogInformation("C# HTTP trigger GetConsumptionByUserProfileId function processed a request.");

                if (!_jwtTokenManager.ValidateJWTToken(req)) { return new UnauthorizedResult(); }
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                string msg = "";

                if (UserProfileId == 0) { return new BadRequestObjectResult("UserProfileId is required"); }
                else
                {
                    List<ConsumptionServiceModel> consumption = _consumptionService.GetConsumptionByUserProfileId(UserProfileId);

                    if (consumption.Count == 0)
                    {
                        msg = "Not found Consumption Data";
                    }
                    else
                    {
                        msg = "Consumption data found.";
                    }
                    
                    return new OkObjectResult(new { msg = msg, consumptionData = consumption });
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Argument error: {ex.Message}");
                return new BadRequestObjectResult(ex.Message);
            }
        }
        #endregion

        #region GetThresholdExceededDevices
        [FunctionName("GetThresholdExceededDevices")]
        [OpenApiOperation(operationId: "GetThresholdExceededDevices", tags: new[] { "PowerConsumptionManagement" })]
        [OpenApiSecurity("bearer_auth", SecuritySchemeType.Http, Scheme = OpenApiSecuritySchemeType.Bearer, BearerFormat = "JWT")]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(DateRangeConsumptionServiceModel), Description = "Parameters", Required = true)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> GetThresholdExceededDevices([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "v1/PowerConsumptionExceededDevices/")] HttpRequest req)
        {
            try
            {
                _logger.LogInformation("C# HTTP trigger GetThresholdExceededDevices function processed a request.");

                if (!_jwtTokenManager.ValidateJWTToken(req)) { return new UnauthorizedResult(); }
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                DateRangeConsumptionServiceModel userDeviceDateInterval  = JsonConvert.DeserializeObject<DateRangeConsumptionServiceModel>(requestBody);
                string msg = "";

                if (userDeviceDateInterval.UserProfileId == 0) { return new BadRequestObjectResult("UserProfileId is required"); }
                if (userDeviceDateInterval.DeviceId == 0) { return new BadRequestObjectResult("DeviceId is required"); }

                else
                {
                    var consumption = _consumptionService.GetExceededConsumptionForDateRange(userDeviceDateInterval.UserProfileId, userDeviceDateInterval.DeviceId, userDeviceDateInterval.FromDate, userDeviceDateInterval.ToDate);

                    if (consumption.Count == 0)
                    {
                        msg = "Not found Power Consumption Exceeded Devices";
                    }
                    else
                    {
                        msg = "Discovered devices exceeding power consumption limits.";
                    }

                    return new OkObjectResult(new { msg = msg, consumptionData = consumption });
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Argument error: {ex.Message}");
                return new BadRequestObjectResult(ex.Message);
            }
        }
        #endregion

        #region GetConsumptionTotalByDateRange
        [FunctionName("GetConsumptionTotalByDateRange")]
        [OpenApiOperation(operationId: "GetConsumptionTotalByDateRange", tags: new[] { "PowerConsumptionManagement" })]
        [OpenApiSecurity("bearer_auth", SecuritySchemeType.Http, Scheme = OpenApiSecuritySchemeType.Bearer, BearerFormat = "JWT")]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(DateRangeConsumptionServiceModel), Description = "Parameters", Required = true)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> GetConsumptionTotalByDateRange([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "v1/GetConsumptionTotalByDateRange/")] HttpRequest req)
        {
            try
            {
                _logger.LogInformation("C# HTTP trigger GetConsumptionTotalByDateRange function processed a request.");

                if (!_jwtTokenManager.ValidateJWTToken(req)) { return new UnauthorizedResult(); }
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                DateRangeConsumptionServiceModel dateRangeConsumptionServiceModel = JsonConvert.DeserializeObject<DateRangeConsumptionServiceModel>(requestBody);
                string msg = "";
                if (dateRangeConsumptionServiceModel.DeviceId == 0) 
                {
                    dateRangeConsumptionServiceModel.DeviceId = -99;
                }

                List<ConsumptionExceededThresholdServiceModel> consumption = _consumptionService.GetConsumptionTotalByDateRange(dateRangeConsumptionServiceModel.UserProfileId, dateRangeConsumptionServiceModel.DeviceId, dateRangeConsumptionServiceModel.FromDate, dateRangeConsumptionServiceModel.ToDate);
                if (consumption.Count == 0)
                {
                    msg = "Consumption data not found.";
                }
                else { msg = "Consumption data found."; }
                return new OkObjectResult(new { msg = msg, consumptionData = consumption });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Argument error: {ex.Message}");
                return new BadRequestObjectResult(ex.Message);
            }
        }
        #endregion

        #region GetConsumptionInidividualValuesByDateRange
        [FunctionName("GetConsumptionInidividualValuesByDateRange")]
        [OpenApiOperation(operationId: "GetConsumptionInidividualValuesByDateRange", tags: new[] { "PowerConsumptionManagement" })]
        [OpenApiSecurity("bearer_auth", SecuritySchemeType.Http, Scheme = OpenApiSecuritySchemeType.Bearer, BearerFormat = "JWT")]
        [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(DateRangeConsumptionServiceModel), Description = "Parameters", Required = true)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> GetConsumptionInidividualValuesByDateRange([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "v1/GetConsumptionInidividualValuesByDateRange/")] HttpRequest req)
        {
            try
            {
                _logger.LogInformation("C# HTTP trigger GetConsumptionInidividualValuesByDateRange function processed a request.");

                if (!_jwtTokenManager.ValidateJWTToken(req)) { return new UnauthorizedResult(); }
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                DateRangeConsumptionServiceModel dateRangeConsumptionServiceModel = JsonConvert.DeserializeObject<DateRangeConsumptionServiceModel>(requestBody);
                string msg = "";
                if (dateRangeConsumptionServiceModel.DeviceId == 0)
                {
                    dateRangeConsumptionServiceModel.DeviceId = -99;
                }

                List<ConsumptionIndividualDetailsServiceModel> consumption = _consumptionService.GetConsumptionInidividualValuesByDateRange(dateRangeConsumptionServiceModel.UserProfileId, dateRangeConsumptionServiceModel.DeviceId, dateRangeConsumptionServiceModel.FromDate, dateRangeConsumptionServiceModel.ToDate);
                if (consumption.Count == 0)
                {
                    msg = "Consumption data not found.";
                }
                else { msg = "Consumption data found."; }
                return new OkObjectResult(new { msg = msg, consumptionData = consumption });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Argument error: {ex.Message}");
                return new BadRequestObjectResult(ex.Message);
            }
        }
        #endregion

    }
}

