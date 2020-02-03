controllers.UserListController = ['$scope', '$http', '$element', '$filter',
    function ($scope, $http, $element, $filter) {
        $scope.ResetSearchUserModel = function () {
            var modelJson = $.parseJSON($("#SearchUserModel").val());
            $scope.SearchUserModel = modelJson;

            if (!$scope.$root.$$phase) {
                $scope.$apply();
            }
        };
        $scope.ResetSearchUserModel();

        $scope.UserListPager = new PagerModule("ModifiedDate", "DESC", 10);
        $scope.GetUserList = function () {
            var pagermodel = {
                searchParams: $scope.SearchUserModel,
                pageSize: $scope.UserListPager.pageSize,
                pageIndex: $scope.UserListPager.currentPage,
                sortIndex: $scope.UserListPager.sortIndex,
                sortDirection: $scope.UserListPager.sortDirection
            };
            var jsonData = angular.toJson(pagermodel);
            AngularAjaxCall($http, PageUrl.GetUserListUrl, jsonData, "Post", "json", "application/json").
                success(function (response, status, headers, config) {
                    if (response.IsSuccess) {
                        $scope.UserList = response.Data.Items;
                        $scope.UserListPager.currentPageSize = response.Data.Items.length;
                        $scope.UserListPager.totalRecords = response.Data.TotalItems;
                    } else {
                        ShowMessages(response);
                    }
                });
        };

        $scope.UserListPager.getDataCallback = $scope.GetUserList;
        $scope.UserListPager.getDataCallback();
    }];

$(document).ready(function () {
});
