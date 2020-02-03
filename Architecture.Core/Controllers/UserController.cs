using Architecture.Generic.Infrastructure;
using Architecture.Generic.Models.ViewModel;
using Architecture.Core.Infrastructure.Attributes;
using Architecture.Core.Infrastructure.DataProvider;
using Architecture.Core.Infrastructure.IDataProvider;
using System.Web.Mvc;

namespace Architecture.Core.Controllers
{
    public class UserController : BaseController
    {
        IUserDataProvider _userDataProvider;

        [HttpGet]
        [CustomAuthorize(Permissions = Constants.AuthorizedPermission)]
        public ActionResult List()
        {
            return View(new SearchUserModel());
        }

        [HttpPost]
        [CustomAuthorize(Permissions = Constants.AuthorizedPermission)]
        public JsonResult GetUserList(SearchUserModel searchParams, int pageSize = 10, int pageIndex = 1, string sortIndex = "ModifiedDate", string sortDirection = "DESC")
        {
            _userDataProvider = new UserDataProvider();
            return Json(_userDataProvider.GetUserList(searchParams, pageSize, pageIndex, sortIndex, sortDirection));
        }
    }
}
