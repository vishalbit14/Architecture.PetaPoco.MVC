using Architecture.Generic.Infrastructure;
using Architecture.Generic.Models;
using Architecture.Generic.Models.ViewModel;
using Architecture.Generic.Resources;
using Architecture.Core.Infrastructure.IDataProvider;
using Architecture.Data.Entity;
using Architecture.Data.Infrastructure.DataProvider;
using System.Collections.Generic;

namespace Architecture.Core.Infrastructure.DataProvider
{
    public class SecurityDataProvider : BaseDataProvider, ISecurityDataProvider
    {
        public SecurityDataProvider() : base(ConfigSettings.ConnectionStringName)
        {
        }

        public ServiceResponse AuthenticateUser(LoginModel loginModel, bool isRegenerateSession)
        {
            ServiceResponse response = new ServiceResponse();
            if (loginModel != null)
            {
                UserTable dbUserModel = GetEntity<UserTable>(new List<SearchValueData> { new SearchValueData { Name = "UserName", Value = loginModel.Email } });
                if (dbUserModel == null)
                {
                    response.Message = Common.MessageWithTitle(Resource.LoginFailed, Resource.NotRegisteredAccount);
                    return response;
                }
                if (!dbUserModel.IsActive)
                {
                    response.Message = Common.MessageWithTitle(Resource.LoginFailed, Resource.InactiveAccount);
                    return response;
                }

                UserSessionModel dbLoginModel = GetEntity<UserSessionModel>(StoredProcedures.GetUserSessionDetailByUserId,
                    new List<SearchValueData>
                    {
                        new SearchValueData { Name = "UserId", Value = dbUserModel.UserId.ToString() }
                    });

                if (dbLoginModel != null && dbLoginModel.UserId > 0
                    && (isRegenerateSession || dbUserModel.Password == Crypto.Encrypt(loginModel.Password)))
                {
                    var sessionData = new SessionValueData
                    {
                        UserId = dbLoginModel.UserId,
                        UserRoleId = dbUserModel.UserRoleId,
                        CurrentUser = dbLoginModel
                    };
                    response = Common.GenerateResponseWithTitle(Resource.LoginSuccess, Resource.LoginSuccessMessage, true);
                    response.Data = sessionData;
                    return response;
                }
                else
                {
                    response.Message = Common.MessageWithTitle(Resource.LoginFailed, Resource.UsernamePasswordIncorrect);
                    return response;
                }
            }

            response.Message = Common.MessageWithTitle(Resource.LoginFailed, Resource.ExceptionMessage);
            return response;
        }

        public ServiceResponse UserSignUp(RegistrationModel userModel)
        {
            ServiceResponse response = new ServiceResponse();
            var emailExistModel = GetEntity<UserTable>(new List<SearchValueData>
            {
                new SearchValueData{ Name="Email", Value = userModel.Email, IsEqual = true }
            });
            if(emailExistModel != null)
            {
                response = Common.GenerateResponse(Resource.UserAlreadyExists);
                return response;
            }

            UserTable dbUserTable = new UserTable();
            dbUserTable.FirstName = userModel.FirstName;
            dbUserTable.LastName = userModel.LastName;
            dbUserTable.Email = userModel.Email;
            dbUserTable.Password = Crypto.Encrypt(userModel.Password);
            SaveEntity<UserTable>(dbUserTable);

            response = Common.GenerateResponse(Resource.RegistrationProcessCompleted);
            return response;
        }
    }
}
