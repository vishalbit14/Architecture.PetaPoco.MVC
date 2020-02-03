using Architecture.Generic.Infrastructure;
using Architecture.Generic.Models;
using Architecture.Generic.Models.ViewModel;
using Architecture.Core.Infrastructure.Attributes;
using Architecture.Core.Infrastructure.DataProvider;
using Architecture.Core.Infrastructure.IDataProvider;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Architecture.Core.Controllers
{
    public class SecurityController : BaseController
    {
        ISecurityDataProvider _securityDataProvider;

        #region Login

        [HttpGet]
        [CustomAuthorize(Permissions = Constants.AnonymousPermission)]
        public ActionResult Login()
        {
            if (SessionHelper.UserId == 0)
            {
                return View(new LoginModel());
            }

            return RedirectToAction("index", "home");
        }

        [HttpPost]
        [CustomAuthorize(Permissions = Constants.AnonymousPermission)]
        public JsonResult AuthenticateUser(LoginModel loginModel)
        {
            _securityDataProvider = new SecurityDataProvider();
            ServiceResponse response = _securityDataProvider.AuthenticateUser(loginModel, false);
            if (response.IsSuccess)
            {
                FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                                                        loginModel.Email,
                                                        DateTime.Now,
                                                        DateTime.Now.AddMinutes(Constants.RememberMeDuration),
                                                        true,
                                                        loginModel.Email,
                                                        FormsAuthentication.FormsCookiePath
                                                    );

                string encTicket = FormsAuthentication.Encrypt(ticket);
                // Create the cookie.
                HttpCookie httpCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket)
                {
                    Expires = ticket.Expiration
                };
                Response.Cookies.Add(httpCookie);

                SessionValueData sessiondata = (SessionValueData)response.Data;
                SessionHelper.UserId = sessiondata.UserId;
                SessionHelper.UserRoleId = sessiondata.UserRoleId;
                SessionHelper.CurrentUser = sessiondata.CurrentUser;
            };

            return Json(response);
        }

        [HttpGet]
        public ActionResult LogOut()
        {
            Session.Abandon();
            FormsAuthentication.SignOut();
            const string loggedOutPageUrl = "/security/logout";
            Response.Write("<script language='javascript'>");
            Response.Write("function ClearHistory()");
            Response.Write("{");
            Response.Write(" var backlen=history.length;");
            Response.Write(" history.go(-backlen);");
            Response.Write(" window.location.href='" + loggedOutPageUrl + "'; ");
            Response.Write("}");
            Response.Write("</script>");
            return Redirect("login");
        }

        #endregion

        #region Register

        [HttpGet]
        [CustomAuthorize(Permissions = Constants.AnonymousPermission)]
        public ActionResult Registration()
        {
            return View(new RegistrationModel());
        }

        [HttpPost]
        [CustomAuthorize(Permissions = Constants.AnonymousPermission)]
        public JsonResult SignUp(RegistrationModel model)
        {
            _securityDataProvider = new SecurityDataProvider();
            return Json(_securityDataProvider.UserSignUp(model));
        }

        #endregion
    }
}
