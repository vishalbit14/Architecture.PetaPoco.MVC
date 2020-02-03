(function () {
    angular.module('ngLoadingSpinner', ['angularSpinner'])
    .directive('usSpinner', ['$http', '$rootScope', function ($http, $rootScope) {
        return {
            link: function (scope, elm, attrs) {
                $rootScope.spinnerActive = false;
                scope.isLoading = function () {
                    var showLoading = false;
                    angular.forEach($http.pendingRequests, function (value, index) {
                        if (value.showLoading) {
                            showLoading = true;
                        }
                    });
                    return showLoading || $rootScope.OpeningPopup > 0;// $.each $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (loading) {
                    $rootScope.spinnerActive = loading;
                    elm.addClass('ng-hide');
                    if (loading) {
                        //elm.removeClass('ng-hide');
                        myApp.showPleaseWait();
                    } else {
                        //elm.addClass('ng-hide');
                        myApp.hidePleaseWait();
                    }
                });
            }
        };

    }]);
}).call(this);