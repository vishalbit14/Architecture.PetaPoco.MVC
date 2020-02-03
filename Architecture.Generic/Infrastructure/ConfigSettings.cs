using System;
using System.Configuration;

namespace Architecture.Generic.Infrastructure
{
    public class ConfigSettings
    {
        public static readonly string ConnectionStringName = ConfigurationManager.AppSettings["ConnectionString"];
        public static readonly string SiteBaseUrl = ConfigurationManager.AppSettings["SiteBaseUrl"];
        public static readonly bool EnableBundlingMinification = Convert.ToBoolean(ConfigurationManager.AppSettings["EnableBundlingMinification"]);

        public static readonly bool IsLocal = Convert.ToBoolean(ConfigurationManager.AppSettings["IsLocal"]);
    }
}
