using Elmah;
using Architecture.Generic.Infrastructure;
using Architecture.Generic.Models;
using Architecture.Generic.Resources;
using System;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Architecture.Core.Controllers
{
    public class BaseController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            var request = HttpContext.Request;
            var baseUrl = string.Format("{0}://{1}{2}", request.Url.Scheme, request.Url.Authority, HttpRuntime.AppDomainAppVirtualPath == "/" ? "" : HttpRuntime.AppDomainAppVirtualPath);
            ViewBag.BasePath = baseUrl;
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            try
            {
                var httpContext = filterContext.HttpContext.ApplicationInstance.Context;
                var signal = ErrorSignal.FromContext(httpContext);
                signal.Raise(filterContext.Exception, httpContext);
                filterContext.ExceptionHandled = true;
                filterContext.HttpContext.Response.Clear();
                filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;

                if (filterContext.HttpContext.Request.IsAjaxRequest() || Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    filterContext.Result = new JsonResult
                    {
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                        Data = new ServiceResponse
                        {
                            Message = Resource.ErrorMessage,
                            Data = Common.SerializeObject(filterContext.Exception)
                        }
                    };
                }
                else
                {
                    System.Web.HttpContext.Current.Response.Redirect(Constants.InternalServerUrl);
                }

                if (filterContext.Exception.GetType() == typeof(HttpException))
                {
                    HttpException exception = filterContext.Exception as HttpException;
                    filterContext.HttpContext.Response.StatusCode = exception.GetHttpCode();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
