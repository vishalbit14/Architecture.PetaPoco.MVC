using System;
using System.Web;

namespace Architecture.Generic.Models
{
    public class SessionHelper
    {
        public static long UserId
        {
            get
            {
                return HttpContext.Current.Session != null ? Convert.ToInt64(HttpContext.Current.Session["UserId"]) : 0;
            }
            set { HttpContext.Current.Session["UserId"] = value; }
        }

        public static int UserRoleId
        {
            get
            {
                return HttpContext.Current.Session != null ? Convert.ToInt16(HttpContext.Current.Session["UserRoleId"]) : 0;
            }
            set { HttpContext.Current.Session["UserRoleId"] = value; }
        }

        public static UserSessionModel CurrentUser
        {
            get { return (UserSessionModel)HttpContext.Current.Session["CurrentUser"]; }
            set { HttpContext.Current.Session["CurrentUser"] = value; }
        }
    }
}
