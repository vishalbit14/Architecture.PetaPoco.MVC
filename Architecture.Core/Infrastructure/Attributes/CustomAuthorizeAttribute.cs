using Architecture.Generic.Infrastructure;
using Architecture.Generic.Models;
using Architecture.Generic.Models.ViewModel;
using Architecture.Core.Infrastructure.DataProvider;
using Architecture.Core.Infrastructure.IDataProvider;
using System.Linq;
using System.Net;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Architecture.Core.Infrastructure.Attributes
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        readonly string _accessDeniedUrl = ConfigSettings.SiteBaseUrl + Constants.AccessDeniedUrl;
        readonly string _loginUrl = ConfigSettings.SiteBaseUrl + Constants.LoginUrl;
        readonly string _notFoundUrl = ConfigSettings.SiteBaseUrl + Constants.NotFoundUrl;
        public string Permissions { get; set; }
        public string[] PermissionList { get { return string.IsNullOrEmpty(Permissions) ? null : Permissions.Split(','); } set { Permissions = (value != null) ? string.Join(",", value) : ""; } }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            var isAjaxRequest = filterContext.HttpContext.Request.IsAjaxRequest();
            var currentUrl = filterContext.HttpContext.Request.RawUrl;

            //Check all allowed urls.
            if (CheckAllowedActions())
                return;

            string[] strPermissions = string.IsNullOrEmpty(Permissions) ? new string[] { } : Permissions.Split(',');

            #region Authentication

            if (filterContext.HttpContext.Request.CurrentExecutionFilePath != Constants.LoginUrl)
            {
                bool removeFormsAuthenticationTicket = true;
                bool isTimeOut = false;

                if (filterContext.HttpContext.Request.IsAuthenticated && SessionHelper.UserId == 0)
                {
                    HttpCookie decryptedCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
                    FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(decryptedCookie.Value);
                    if (ticket != null)
                    {
                        var identity = new GenericIdentity(ticket.Name);
                        if (identity.IsAuthenticated)
                        {
                            ISecurityDataProvider securityDataProvider = new SecurityDataProvider();
                            LoginModel loginModel = new LoginModel { Email = ticket.Name };
                            ServiceResponse response = new ServiceResponse();
                            response = securityDataProvider.AuthenticateUser(loginModel, true);
                            if (response.IsSuccess)
                            {
                                SessionValueData sessiondata = (SessionValueData)response.Data;

                                SessionHelper.UserId = sessiondata.UserId;
                                SessionHelper.UserRoleId = sessiondata.UserRoleId;
                                SessionHelper.CurrentUser = sessiondata.CurrentUser;

                                removeFormsAuthenticationTicket = false;
                            }
                            else
                                isTimeOut = true;
                        }
                        else
                            isTimeOut = true;
                    }
                    else
                        isTimeOut = true;

                    if (removeFormsAuthenticationTicket)
                    {
                        FormsAuthentication.SignOut();
                        if (filterContext.HttpContext.Request.CurrentExecutionFilePath != "/" && filterContext.HttpContext.Request.CurrentExecutionFilePath != Constants.LoginUrl)
                            RedirectToAction(filterContext, _loginUrl + GenerateReturnUrl(isAjaxRequest, filterContext), isAjaxRequest);
                        else
                            RedirectToAction(filterContext, _loginUrl, isAjaxRequest);
                    }
                }
                else if (SessionHelper.UserId == 0)
                {
                    if (filterContext.HttpContext.Request.CurrentExecutionFilePath != "/" && filterContext.HttpContext.Request.CurrentExecutionFilePath != Constants.LoginUrl)
                        RedirectToAction(filterContext, _loginUrl + GenerateReturnUrl(isAjaxRequest, filterContext), isAjaxRequest);
                    else
                        RedirectToAction(filterContext, _loginUrl, isAjaxRequest);
                }
            }

            #endregion

            #region Authorization

            if (SessionHelper.UserId > 0)
            {
                bool isAuthoized = strPermissions.Contains(Constants.AuthorizedPermission)
                                || strPermissions.Contains(Constants.RememberMePermission);

                if (!isAuthoized && !isAjaxRequest)
                    filterContext.Result = new RedirectResult(_accessDeniedUrl);
                else if (!isAuthoized)
                    RedirectToAction(filterContext, _accessDeniedUrl, isAjaxRequest);
                else
                {
                }
            }
            //else
            //{
            //TODO if some action has been performed for the unauthorized user.
            //}

            #endregion
        }

        public string GenerateReturnUrl(bool isAjaxRequest, AuthorizationContext filterContext)
        {
            string returnUrl = "?returnUrl=" +
                                             (isAjaxRequest
                                                  ? (filterContext.HttpContext.Request.UrlReferrer != null
                                                         ? filterContext.HttpContext.Request.UrlReferrer.LocalPath
                                                         : "")
                                                  : filterContext.HttpContext.Request.CurrentExecutionFilePath +
                                                    (filterContext.HttpContext.Request.QueryString.HasKeys()
                                                         ? "?" + filterContext.HttpContext.Request.QueryString
                                                         : ""));
            return returnUrl;
        }

        private void RedirectToAction(AuthorizationContext filterContext, string actionUrl, bool isAjaxRequest, int status = 403, string requestType = null)
        {

            if (isAjaxRequest)
            {
                filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                filterContext.Result = new JsonResult
                {
                    Data = new LinkResponse
                    {
                        Type = Constants.NotAuthorized,
                        Link = actionUrl,
                        RequestType = requestType
                    },
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            else
                filterContext.Result = new RedirectResult(actionUrl);
        }

        private bool CheckAllowedActions()
        {
            string[] strPermissions = string.IsNullOrEmpty(Permissions) ? new string[] { } : Permissions.Split(',');

            if (strPermissions.Contains(Constants.AnonymousPermission))
                return true;

            if (!strPermissions.Any())
                return true;

            return false;
        }
    }
}
