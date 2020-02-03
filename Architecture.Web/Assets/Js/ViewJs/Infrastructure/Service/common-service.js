app.service('$modalPopup', ["$rootScope", "$templateCache", "$controller", "$compile", "$templateRequest", "$timeout",
    function ($rootScope, $templateCache, $controller, $compile, $templateRequest, $timeout) {
        this.ModelPopup = function (templateUrl, controller) {
            var ModelElement = "";
            var ReturnObj = {
                IsReady: false,
                IsOpening: false
            };

            var OnReady = null;
            if (angular.isFunction(templateUrl)) {
                templateUrl(function (html) {
                    ModelElement = $(html);
                    ReturnObj.IsReady = true;
                    if (OnReady)
                        OnReady();
                });
            }
            else if (!$templateCache.get(templateUrl)) {

                $templateRequest(templateUrl).then(function (html) {
                    ModelElement = $(html);
                    ReturnObj.IsReady = true;
                    if (OnReady)
                        OnReady();
                });
            } else {
                ModelElement = $($templateCache.get(templateUrl));
                if (ModelElement.length > 0 && angular.isFunction(ModelElement[0].then)) {
                    ModelElement[0].then(function (html) {
                        ModelElement = $(html.data);
                        ReturnObj.IsReady = true;
                        if (OnReady)
                            OnReady();
                    });
                } else {
                    ReturnObj.IsReady = true;
                    if (OnReady)
                        OnReady();
                }
            }

            var ModelScope = null;
            var ClosePopup = function (onlyCloseModel) {
                $(ModelElement).modal('hide');
                if (!onlyCloseModel) {

                    $timeout(function () {
                        ModelScope.$destroy();
                        $(ModelElement).remove();
                        if (!angular.isFunction(templateUrl))
                            ModelElement = $($templateCache.get(templateUrl));
                        ModelScope = null;
                    }, 200);
                }

            };

            var OpenPopup = function (modelData, success, fail) {
                ReturnObj.IsOpening = true;
                if (ReturnObj.IsReady) {
                    //myApp.hidePleaseWait();
                    $rootScope.OpeningPopup = $rootScope.OpeningPopup == undefined ? 0 : $rootScope.OpeningPopup - 1;
                    ModelScope = $rootScope.$new(true);
                    ModelScope.ModelData = modelData;
                    ModelScope.CloseWithSuccess = function (data) {
                        if (success) {
                            success(data);
                        }
                        ClosePopup();
                    };
                    ModelScope.ClosePopup = function (data) {
                        if (fail) {
                            fail(data);
                        }
                        ClosePopup(data);
                    };
                    $controller(controller, { $scope: ModelScope, $element: ModelElement });
                    ModelElement = $(ModelElement).modal('show');
                    $compile(ModelElement)(ModelScope);
                    ReturnObj.IsOpening = false;
                }
                else {
                    //myApp.showPleaseWait();
                    $rootScope.OpeningPopup = $rootScope.OpeningPopup == undefined ? 1 : $rootScope.OpeningPopup + 1;
                    OnReady = function () {
                        OpenPopup(modelData, success, fail);
                        OnReady = null;
                    };
                }
            };

            ReturnObj.OpenPopup = OpenPopup;
            ReturnObj.ClosePopup = ClosePopup;

            return ReturnObj;
        };

    }]);
