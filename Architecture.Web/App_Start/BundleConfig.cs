using System.Web.Optimization;

namespace Architecture.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/assets/js/sitejs/modernizr-*"
            ));

            #region Login Layout

            bundles.Add(new StyleBundle("~/loginlayout/css").Include(
                "~/assets/css/sitecss/bootstrap.css",
                "~/assets/vendor/toastr/build/toastr.css",
                "~/assets/css/sitecss/site.css",
                "~/assets/css/sitecss/custom.css"
            ));

            bundles.Add(new ScriptBundle("~/loginlayout/js").Include(
                "~/assets/js/sitejs/jquery-{version}.js",
                "~/assets/js/sitejs/jquery.validate*",
                "~/assets/js/sitejs/bootstrap.js",
                "~/assets/vendor/js-cookie/src/js.cookie.js",
                "~/assets/vendor/moment/min/moment.min.js",
                "~/assets/vendor/select2/dist/js/select2.full.js",
                "~/assets/vendor/bootstrap-select/dist/js/bootstrap-select.js",
                "~/assets/vendor/toastr/build/toastr.min.js",
                "~/assets/vendor/sweetalert2/dist/sweetalert2.min.js",
                "~/assets/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js",
                "~/assets/js/siteJS/angular/angular.js",
                "~/assets/js/sitejs/angular/angular-filter.min.js",
                "~/assets/js/sitejs/angular/spin.js",
                "~/assets/js/sitejs/angular/angular-spinner.js",
                "~/assets/js/sitejs/angular/angular-loading-spinner.js",
                "~/assets/js/viewjs/loginapp/app.js",
                "~/assets/js/viewjs/infrastructure/common.js"
            ));

            bundles.Add(new ScriptBundle("~/security/loginjs").Include(
                "~/assets/js/viewjs/loginapp/security/login.js"
            ));

            bundles.Add(new ScriptBundle("~/security/signupjs").Include(
                "~/assets/js/viewjs/loginapp/security/signup.js"
            ));

            #endregion

            #region Site Layout

            bundles.Add(new StyleBundle("~/sitelayout/css").Include(
                "~/assets/css/sitecss/bootstrap.css",
                "~/assets/vendor/select2/dist/css/select2.css",
                "~/assets/vendor/bootstrap-select/dist/css/bootstrap-select.css",
                "~/assets/vendor/toastr/build/toastr.css",
                "~/assets/vendor/sweetalert2/dist/sweetalert2.css",
                "~/assets/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css",
                "~/assets/css/sitecss/site.css",
                "~/assets/css/sitecss/custom.css"
            ));

            bundles.Add(new ScriptBundle("~/sitelayout/js").Include(
                "~/assets/js/sitejs/jquery-{version}.js",
                "~/assets/js/sitejs/jquery.validate*",
                "~/assets/js/sitejs/bootstrap.js",
                "~/assets/vendor/js-cookie/src/js.cookie.js",
                "~/assets/vendor/moment/min/moment.min.js",
                "~/assets/vendor/select2/dist/js/select2.full.js",
                "~/assets/vendor/bootstrap-select/dist/js/bootstrap-select.js",
                "~/assets/vendor/toastr/build/toastr.min.js",
                "~/assets/vendor/sweetalert2/dist/sweetalert2.min.js",
                "~/assets/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js",
                "~/assets/js/siteJS/angular/angular.js",
                "~/assets/js/sitejs/angular/angular-filter.min.js",
                "~/assets/js/sitejs/angular/spin.js",
                "~/assets/js/sitejs/angular/angular-spinner.js",
                "~/assets/js/sitejs/angular/angular-loading-spinner.js",
                "~/assets/js/sitejs/angular/dirpagination.js",
                "~/assets/js/viewjs/siteapp/app.js",
                "~/assets/js/viewjs/infrastructure/resource.js",
                "~/assets/js/viewjs/infrastructure/common.js",
                "~/assets/js/viewjs/infrastructure/directive.js",
                "~/assets/js/viewjs/infrastructure/service/common-service.js",
                "~/assets/js/viewjs/infrastructure/helper.js",
                "~/assets/js/viewjs/siteapp/sitelayout.js"
            ));

            bundles.Add(new ScriptBundle("~/home/indexjs").Include(
                "~/assets/js/viewjs/siteapp/home/index.js"
            ));

            bundles.Add(new ScriptBundle("~/user/userlistjs").Include(
                "~/assets/js/viewjs/siteapp/user/userlist.js"
            ));

            #endregion
        }
    }
}
