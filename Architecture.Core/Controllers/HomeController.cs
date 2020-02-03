using Architecture.Generic.Infrastructure;
using Architecture.Core.Infrastructure.Attributes;
using System.Web.Mvc;

namespace Architecture.Core.Controllers
{
    public class HomeController : BaseController
    {
        [HttpGet]
        [CustomAuthorize(Permissions = Constants.AuthorizedPermission)]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [CustomAuthorize(Permissions = Constants.AuthorizedPermission)]
        public ActionResult About()
        {
            return View();
        }

        [HttpGet]
        [CustomAuthorize(Permissions = Constants.AuthorizedPermission)]
        public ActionResult Contact()
        {
            return View();
        }
    }
}
