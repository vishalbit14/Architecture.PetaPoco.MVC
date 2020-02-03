controllers.LoginController = ['$scope', '$http', function ($scope, $http) {
    var AuthenticateUserUrl = "/security/authenticateuser";
    var HomePageUrl = "/user/list";

    $scope.ResetLoginModel = function () {
        var modelJson = $.parseJSON($("#LoginModel").val());
        $scope.LoginModel = modelJson;

        if (!$scope.$root.$$phase) {
            $scope.$apply();
        }
    };
    $scope.ResetLoginModel();

    $scope.AuthenticateUser = function () {
        var isValid = CheckErrors($("#frmLogin"), true);
        if (isValid) {
            var jsonData = angular.toJson($scope.LoginModel);
            var retrunUrl = getParam('returnUrl');
            AngularAjaxCall($http, AuthenticateUserUrl, jsonData, "Post", "json", "application/json").
                success(function (response, status, headers, config) {
                    if (response.IsSuccess) {
                        SetMessageForPageLoad(response.Message, "ShowLoginSuccessMessage");
                        window.location = (retrunUrl !== null && retrunUrl !== "") ? retrunUrl : HomePageUrl;
                    } else {
                        $scope.ResetLoginModel();
                        ShowMessages(response);
                    }
                });
        }
    };
}];

$(document).ready(function () {
    ShowPageLoadMessage("ShowRegistrationSuccessMessage");
});