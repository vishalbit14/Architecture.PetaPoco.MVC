controllers.RegistrationController = ["$scope", "$http", "$element", "$filter", function ($scope, $http, $element, $filter) {
    var LoginUrl = "/security/login";
    var SignUpUrl = "/security/signup";
    $scope.ResetSignUpModel = function () {
        var modelJson = $.parseJSON($("#SignUpModel").val());
        $scope.SignUpModel = modelJson;

        if (!$scope.$root.$$phase) {
            $scope.$apply();
        }
    };
    $scope.ResetSignUpModel();

    $scope.SignUp = function () {
        var isvalid = CheckErrors($("#frmRegistraion"), true);
        if (isvalid) {
            var jsonData = angular.toJson($scope.SignUpModel);
            AngularAjaxCall($http, SignUpUrl, jsonData, "Post", "json", "application/json").
                success(function (response, status, headers, config) {
                    if (response.IsSuccess) {
                        window.location = LoginUrl;
                        SetMessageForPageLoad(response.Message, "ShowRegistrationSuccessMessage");
                    }
                    ShowMessages(response);
                });
        }
    };
}];