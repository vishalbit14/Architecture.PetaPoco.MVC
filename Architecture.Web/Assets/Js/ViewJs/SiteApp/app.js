var app = angular.module("siteApp", ['ngLoadingSpinner', 'angularUtils.directives.dirPagination']);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('responseObserver');
}]);

app.factory('responseObserver', ["$q", "$window", "$injector",
    function responseObserver($q, $window, $injector) {
        return {
            'responseError': function (errorResponse) {
                switch (errorResponse.status) {
                    case 403:
                        if (errorResponse.data && errorResponse.data.Link)
                            $window.location = errorResponse.data.Link;
                        else {
                            ShowMessage("Access denied.", 'error');
                            $window.location = '/security/AccessDenied';
                        }
                        break;
                    case 401:
                        ShowMessage("Access denied.", 'error');
                        $window.location = '/security/AccessDenied';
                        break;
                    case 500:
                        toastr.error(errorResponse.data.Message, "Oops, something went wrong.");
                        break;
                }
                return $q.reject(errorResponse);
            }
        };
    }]);

var controllers = {};
app.controller(controllers);