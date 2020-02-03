using Newtonsoft.Json;
using Architecture.Generic.Models;

namespace Architecture.Generic.Infrastructure
{
    public class Common
    {
        #region Serialize/Deserialize Object

        public static string SerializeObject<T>(T objectData)
        {
            string defaultJson = JsonConvert.SerializeObject(objectData);
            return defaultJson;
        }

        public static T DeserializeObject<T>(string json)
        {
            T obj = default(T);
            obj = JsonConvert.DeserializeObject<T>(json, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
            return obj;
        }

        #endregion

        #region Generate Response

        public static string MessageWithTitle(string title, string messaage)
        {
            return string.Format("<div><h4 style='font-size:17px !important;'>{0}</h4><p>{1}</p></div>", title, messaage);
        }

        public static ServiceResponse GenerateResponseWithTitle(string title, string messaage, bool isSuccess = false)
        {
            ServiceResponse response = new ServiceResponse
            {
                Message = $"<div><h4>{title}</h4><p>{messaage}</p></div>",
                IsSuccess = isSuccess
            };
            return response;
        }

        public static ServiceResponse GenerateResponse(string message = "", bool isSuccess = false)
        {
            ServiceResponse response = new ServiceResponse();
            response.Message = message;
            response.IsSuccess = isSuccess;
            return response;
        }

        #endregion
    }
}
