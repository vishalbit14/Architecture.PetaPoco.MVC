var app = angular.module("loginApp", ['ngLoadingSpinner']);

var controllers = {};
app.controller(controllers);

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
                            $window.location = '/security/accessdenied';
                        }
                        break;
                    case 401:
                        ShowMessage("Access denied.", 'error');
                        $window.location = '/security/accessdenied';
                        break;
                    case 404:
                        ShowMessage("Not found.", 'error');
                        $window.location = '/security/notfound';
                        break;
                    case 500:
                        ShowMessage("Internal server error.", 'error');
                        $window.location = '/security/internalerror';
                        break;
                }
                return $q.reject(errorResponse);
            }
        };
    }]);
