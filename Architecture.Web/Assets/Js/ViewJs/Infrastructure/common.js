function getParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}

function CheckErrors(currentForm, isDynamic) {
    var form = jQuery(currentForm);
    if (isDynamic) {
        form = $(currentForm)
            .removeData("validator") /* added by the raw jquery.validate plugin */
            .removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse(form);
    }

    if (!form.valid()) {
        //$('.field-validation-error.tooltip-danger').tooltip('hide');
        //$('.select-validatethis.tooltip-danger').tooltip('hide');
        //$('.jcf-class-validatethis.tooltip-danger').tooltip('hide');
        return false;
    }
    return true;
}

function HideErrors(currentForm) {
    $(currentForm).validate().resetForm();
    //$(currentForm).find('.tooltip-danger').tooltip('dispose');
    //$(currentForm).find('.tooltip-danger').removeClass('tooltip-danger');
}

$.validator.setDefaults({
    //ignore: ".ignore-validation-true, .ignore-element",
    ignore: ":not(.validatealways):hidden , .ignorevalidation",
    showErrors: function (errorMap, errorList) {
        this.defaultShowErrors();
        var allValidation = this.elements();

        // dispose tooltips on valid elements --remove erro from parent row-block
        var validElement = $("." + this.settings.validClass + ",.replaceErrorSource");
        $.each(validElement, function (i, val) {
            if ($(val).hasClass("is-invalid")) {
                $(val).removeClass("is-invalid");
            }
        });

        // add/update tooltips 
        for (var i = 0; i < errorList.length; i++) {
            var error = errorList[i];

            if ($(error.element).is('select')) {
                $(error.element).parent().addClass("is-invalid");
            } else {
                $(error.element).addClass("is-invalid");
            }
        }
    }
});

function AngularAjaxCall($angularHttpObejct, url, postData, httpMethod, callDataType, contentType, showLoading, headers) {
    //myApp.showPleaseWait();

    if (contentType == undefined)
        contentType = "application/json";

    if (callDataType == undefined)
        callDataType = "json";

    if (showLoading == undefined)
        showLoading = true;

    var header = {
        'Content-Type': contentType
    };
    angular.extend(header, headers);

    return $angularHttpObejct({
        method: httpMethod,
        responseType: callDataType,
        url: url,
        data: postData,
        headers: header,
        showLoading: showLoading
    }).error(function (data, error, a, b) {
        if (error != null) {
            if (error == 500) {
                //window.location = "/security/internalerror";
            }
            else if (error == 401) {
                SetMessageForPageLoad("Your session has expired please login again.", "SessionExpiredMessage");
                window.location = "/security/login";
            }
        }
    });
}

// code for show toaster messages
function ShowMessages(data) {
    if (data.IsSuccess != undefined && data.Message != undefined) {
        if (data.IsSuccess && data.ErrorCode == 'warning') {
            ShowMessage(data.Message, 'warning');
        }
        else if (data.IsSuccess) {
            ShowMessage(data.Message);
        } else {
            ShowMessage(data.Message, "error");
        }
    }
}

function ShowMessage(message, type) {
    toastr.clear();
    toastr.options.closeButton = true;
    toastr.options.timeOut = 10000;


    if (type != undefined && type == 'error')
        toastr.error(message);
    else if (type != undefined && type == 'warning')
        toastr.warning(message);
    else if (type != undefined && type == 'info')
        toastr.info(message);
    else
        toastr.success(message);
}

function ShowFullWidthMessage(message, type) {
    toastr.clear();
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-full-width",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "0",
        "hideDuration": "0",
        "timeOut": "0",
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    if (type != undefined && type == 'error')
        toastr.error(message);
    else if (type != undefined && type == 'warning')
        toastr.warning(message);
    else if (type != undefined && type == 'info')
        toastr.info(message);
    else
        toastr.success(message);
}

function ShowToaster(type, message, options, callback) {

    toastr.clear();
    toastr.options.closeButton = true;
    toastr.options.timeOut = 1500;
    toastr.options.positionClass = 'toast-top-right';
    if (callback != undefined)
        toastr.options.onHidden = callback;

    if (type == 'success' && message != undefined && message != '') {
        toastr.success(message, '', options);
    }
    else if (type == 'warning' && message != undefined && message != '') {
        toastr.warning(message);
    }
    else if (type == 'error' && message != undefined && message != '') {
        toastr.error(message);
        //if (options == undefined) {
        //    toastr.error(message, '', { timeOut: 0, positionClass: 'toast-top-center', extendedTimeOut: 0, closeButton: true });
        //  //  toastr.success('hi', '', { timeOut: 0000, positionClass: 'toast-top-left', extendedTimeOut: 0, closeButton: true })
        //} else {
        //    toastr.error(message, '', options);
        //}
    }
    else if (type == 'errorDialog' && message != undefined && message != '') {
        //toastr.error(message);
        //if (options == undefined) {
        //    toastr.error(message, '', { timeOut: 0, positionClass: 'toast-top-center', extendedTimeOut: 0, closeButton: true });
        //  //  toastr.success('hi', '', { timeOut: 0000, positionClass: 'toast-top-left', extendedTimeOut: 0, closeButton: true })
        //} else {
        //    toastr.error(message, '', options);
        //}
        ShowDialogMessage(window.Oops, BootstrapDialog.TYPE_DANGER, message);
    }
}

var myApp;
myApp = myApp || (function () {
    window.pleaseWaitDiv = ['<div class="loading-overlay">',
        '<div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
        '</div>'].join('');

    return {
        showPleaseWait: function () {
            $('body').css('height', '100%');
            document.getElementById('loader').innerHTML = window.pleaseWaitDiv;
        },
        hidePleaseWait: function () {
            $('#loader').empty();
        }
    };
})();

function SetMessageForPageLoad(data, cookieName) {
    Cookies.set(cookieName, data);
}

function ShowPageLoadMessage(cookieName, type) {
    var tCookie = Cookies.get(cookieName);
    if (tCookie != undefined && tCookie != null) {
        if (type != undefined && type == 'error')
            toastr.error(tCookie);
        else if (type != undefined && type == 'warning')
            toastr.warning(tCookie);
        else
            toastr.success(tCookie);

        Cookies.remove(cookieName);
    }
}

function ShowSwalConfirmModel(title, message, callback, btnCancelLabel, btnOkLabel, type, closable, draggable, btnCancelClass, btnOkClass) {
    if (title == undefined)
        title = 'Are you sure?';

    if (message == undefined)
        message = "";

    if (type == undefined)
        type = SwalDialog.TYPE_WARNING;

    if (btnCancelLabel == undefined)
        btnCancelLabel = "Cancel";

    if (btnOkLabel == undefined)
        btnOkLabel = "Ok";

    if (callback == undefined)
        callback = function () {
        };

    swal.fire({
        title: title,
        text: message,
        type: type,
        showCancelButton: true,
        confirmButtonText: btnOkLabel
    }).then(function (result) {
        callback(result.value);
    });
}

function SetCookie(data, cookieName) {
    Cookies.set(cookieName, data);
}

function ClearCookie(cookieName) {
    Cookies.remove(cookieName);
}

function GetCookie(cookieName, isPersist) {
    var tCookie = Cookies.get(cookieName);
    if (tCookie != null) {
        var data = tCookie;
        if (isPersist)
            ClearCookie(cookieName);
        return data;
    }
}

function GetCookieWithoutRemoving(cookieName) {
    var tCookie = Cookies.get(cookieName);
    if (tCookie != null) {
        var data = tCookie;
        return data;
    }
}

// code for save scope and location
function Redirect(location, url) {
    location.path(url);
}

$(document).ready(function () {
    //For What child popup close it remove class from body
    $(document).on("click", ".modal-dialog", function () {
        if ($(".modal.in").length > 0) {
            $('body').addClass('modal-open');
        }
    });
});

//Common Pager

var PagerModule = function (sortIndex, sortType, pageSize) {
    var $scope = this;

    $scope.getDataCallback = function () {
        alert("Not Implemented GetDataCallback Function");
    };
    $scope.currentPage = 1;

    if (pageSize != undefined)
        $scope.pageSize = pageSize;
    else
        $scope.pageSize = window.PageSize ? window.PageSize : 5;

    $scope.totalRecords = 0;
    $scope.currentPageSize = 0;
    $scope.sortIndex = sortIndex;
    $scope.PagerId = '0';
    if (sortType != undefined) {
        $scope.sortDirection = sortType;
        $scope.reverse = $scope.sortDirection == "DESC" ? true : false; // asc and desc
    }
    else {
        $scope.sortDirection = "DESC";
        $scope.reverse = false; // asc and desc
    }

    $scope.pageChanged = function (newPage, data) {
        $scope.currentPage = newPage;
        $scope.getDataCallback(data);
    };

    $scope.TotalPages = function () {
        return parseInt($scope.totalRecords / $scope.pageSize) + 1;
    };

    $scope.TotalPages = function () {
        return parseInt($scope.totalRecords / $scope.pageSize) + 1;
    };

    $scope.nextPage = function () {
        $scope.currentPage = parseInt($scope.currentPage);
        var numberOfPages = Math.floor($scope.totalRecords / $scope.pageSize);
        if ($scope.totalRecords % $scope.pageSize != 0) {
            numberOfPages = numberOfPages + 1;
        }
        if ($scope.currentPage < numberOfPages) {
            $scope.currentPage = $scope.currentPage + 1;
            $scope.getDataCallback();
        }
    };

    //-----------------------------------------CODE FOR SORT-------------------------------------------

    $scope.sortColumn = function (newPredicate, data) {
        $scope.reverse = ($scope.sortIndex === newPredicate) ? !$scope.reverse : false;
        //$scope.predicate = newPredicate;
        $scope.sortIndex = newPredicate != undefined ? newPredicate : sortIndex;
        $scope.sortDirection = $scope.reverse === true ? "DESC" : "ASC";
        $scope.getDataCallback(data);
    };

    //-----------------------------------------End CODE FOR SORT-------------------------------------------
};

Array.prototype.remove = function (i) {
    var index = this.indexOf(i);
    if (index > -1) {
        this.splice(index, 1);
    }
};

String.format = function (str) {
    var args = arguments;
    return str.replace(/{[0-9]}/g, (matched) => args[parseInt(matched.replace(/[{}]/g, '')) + 1]);
};

function htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    //return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};

function toJson(data) {
    return JSON.parse(data.replace(/&quot;/g, '"'));
}

function getDynamicPartialHtml(actionUrl, controllerName, jsonData) {
    if (jsonData) {
        return new $modalPopup.ModelPopup(function (onHtmlLoad) {
            AngularAjaxCall($http, actionUrl, jsonData, "Post", "text", "application/json", false).
                success(function (response) {
                    onHtmlLoad(response);
                });
        }, controllerName);
    } else {
        return new $modalPopup.ModelPopup(actionUrl, controllerName);
    }
}

