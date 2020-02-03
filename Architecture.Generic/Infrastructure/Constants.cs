namespace Architecture.Generic.Infrastructure
{
    public class Constants
    {
        public const string ApplicationName = "Architecture.PetaPoco.MVC";

        public const string LoginUrl = "/security/login";
        public const string LogoutUrl = "/security/logout";
        public const string NotFoundUrl = "/security/notfound";
        public const string InternalServerUrl = "/security/internalerror";
        public const string AccessDeniedUrl = "/security/accessdenied";
        public const string SignUpUrl = "/security/registration";
        public const string UserListUrl = "/user/list";

        public const string HomeUrl = "/";
        public const string Culture_EN = "en-GB";
        public const string AnonymousPermission = "AnonymousPermission";
        public const string RememberMePermission = "RememberMePermission";
        public const string AuthorizedPermission = "AuthorizedPermission";

        public const string DataTypeString = "string";
        public const string DataTypeBoolean = "bool";
        public const string PaddingWith6Zero = "{0:000000}";

        public const string DateFormatDashed = "dd-MM-yyyy";
        public const string DateFormatSlash = "dd/MM/yyyy";
        public const string DbDateFormat = "yyyy-MM-dd";
        public const string TimeFormat = "HH:mm:ss";
        public const string DbTimeFormat = "HH:mm:ss";
        
        public const string FullDateTimeFormat = "ddMMyyyyhhmmssfff";
        public const string FullDateTimeDashedFormat = "yyyy-MM-dd hh:mm:ss.fff";

        public const string RegxEmail = @"^[\w-']+(\.[\w-']+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$";

        public const string NotAuthorized = "NotAuthorized";
        public const string EncryptedQueryString = "EncryptedQueryString";

        public static string ErrorCode_AccessDenied = "403";
        public static string ErrorCode_InternalError = "500";
        public static string ErrorCode_NotFound = "404";

        public const int PageSize = 10;
        public const int RememberMeDuration = 60;
    }
}
