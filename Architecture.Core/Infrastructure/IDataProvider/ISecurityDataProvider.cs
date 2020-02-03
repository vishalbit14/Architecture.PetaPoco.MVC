using Architecture.Generic.Models;
using Architecture.Generic.Models.ViewModel;

namespace Architecture.Core.Infrastructure.IDataProvider
{
    public interface ISecurityDataProvider
    {
        ServiceResponse AuthenticateUser(LoginModel loginModel, bool isRegenerateSession);
        ServiceResponse UserSignUp(RegistrationModel userModel);
    }
}
