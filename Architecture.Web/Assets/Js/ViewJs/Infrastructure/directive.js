app.directive('selectpicker', ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            ngModel: "=",
            liveSearch: "@",
            isDynamic: "@"
        },
        link: function (scope, element, attrs) {
            //live_search = "true",

            $(element).selectpicker({ showTick: true });

            function ngModelStr(value) {
                if (isNaN(value))
                    return value;
                else
                    return value.toString();
            }

            if (scope.ngModel != undefined) {
                $(element).val(ngModelStr(scope.ngModel));
                $(element).selectpicker('refresh');

                if (attrs.isDynamic == "true") {
                    $timeout(function () {
                        $(element).selectpicker('refresh');
                    });
                }
            }

            $(element).on("changed.bs.select",
                function (e, clickedIndex, newValue, oldValue) {
                    scope.ngModel = this.value;
                    if (!scope.$root.$$phase) {
                        scope.$apply();
                    }
                });

            scope.$watch('ngModel', function (newValue, oldValue) {
                if (newValue != null && newValue != undefined) {
                    $(element).parent().removeClass('is-invalid');
                    $(element).parent().next("span.field-validation-error").find("span").remove();

                    scope.ngModel = ngModelStr(newValue);
                    if (!scope.$root.$$phase) {
                        scope.$apply();
                    }
                }
            });
        }
    };
}]);

app.directive('ngSelect2', function () {
    return {
        restrict: 'A',
        scope: {
            ngModel: "=",
            isMultiple: "@"
        },
        link: function (scope, element, attrs) {
            var dropDownParent = $(element).closest("div");
            //is_multiple = "true",
            //multiple = "multiple",
            //maximumSelectionLength = 3

            if (scope.isMultiple) {
                //$(element).attr("multiple", "multiple");
            }

            $(element).select2({
                dropdownAutoWidth: true,
                width: '100%',
                dropdownParent: dropDownParent,
                placeholder: "Select"
            }).on('select2:open', function () {
                var container = $('.select2-container').last();
            });

            $(element).on("change", function (e) {
                scope.ngModel = $(element).val();
                if (!scope.$root.$$phase) {
                    scope.$apply();
                }
            });

            scope.$watch('ngModel', function (newValue) {
                if (newValue != null && newValue != 0 && newValue != undefined) {
                    $(element).removeClass('is-invalid');
                    $(element).parent().find(".select2").removeClass('errorBorder');//("tooltip-danger").tooltip("dispose").closest('.row-block').removeClass('error');
                    $(element).parent().find(".select2").next("span.field-validation-error").find("span").remove();
                }
                $(element).trigger('change.select2');
            });
        }
    };
});

app.directive('datepicker', function () {
    return {
        restrict: 'A',
        scope: {
            ngDateval: "=",
            ngMaxdate: "=?",
            ngMindate: "=?"
        },
        link: function (scope, element, attrs) {
            if (!isValidTimeStamp(scope.ngDateval)) {
                scope.ngDateval = '';
                $(element).find('input').val("");
            }
            if (scope.ngMaxdate != undefined && !isValidTimeStamp(scope.ngMaxdate)) {
                scope.ngMaxdate = undefined;
            }
            if (scope.ngMindate != undefined && !isValidTimeStamp(scope.ngMindate)) {
                scope.ngMindate = undefined;
            }

            var options = {
                maxDate: scope.ngMaxdate,
                locale: moment.locale(),
                format: 'DD/MM/YYYY',
                useCurrent: false,
                minDate: scope.ngMindate,
                showTodayButton: true,
            };
            $(element).datetimepicker(options);

            //$(element).children("input").inputmask("99/99/9999", {
            //    placeholder: "dd/mm/yyyy",
            //    forceParse: true
            //});

            if (!$(element).is('input')) {
                $(element).find('input').on("focusin", function () {
                    $(element).data("DateTimePicker").show();
                });

                $(element).find('input').on("focusout", function () {
                    //$(element).data("DateTimePicker").show();
                });
            } else {
                $(element).on("focusin", function () {
                    $(element).data("DateTimePicker").show();
                });

                $(element).on("focusout", function () {
                    //$(element).data("DateTimePicker").show();
                });
            }

            $(element).on("dp.change", function (e) {
                if (e.date) {
                    var date = new Date(e.date.format());
                    scope.ngDateval = toUnixTime(date);
                } else {
                    scope.ngDateval = '';
                }
                if (!scope.$root.$$phase) {
                    scope.$apply();
                }
            });

            scope.$watch('ngMaxdate', function (value, oldvalue) {
                if (value != undefined && isValidTimeStamp(value)) {
                    $(element).data("DateTimePicker").maxDate(value);
                }
                else {
                    $(element).data("DateTimePicker").maxDate(false);
                }
            });

            scope.$watch('ngMindate', function (value, oldvalue) {
                if (value != undefined && isValidTimeStamp(value)) {
                    $(element).data("DateTimePicker").minDate(value);
                }
                else {
                    $(element).data("DateTimePicker").minDate(false);
                }
            });

            scope.$watch(function () { return scope.ngDateval; }, function (value, oldvalue) {
                if (value != undefined && isValidTimeStamp(value)) {
                    $(element).data("DateTimePicker").date(fromUnixTime(value));
                } else {
                    $(element).data("DateTimePicker").date(null);
                }
            });

            if (scope.ngDateval) {
                $(element).data("DateTimePicker").date(fromUnixTime(scope.ngDateval));
            }
        }
    };
});

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                if (!inputValue) return ''
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput !== inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();

                    if (!$(element).is(':animated')) {
                        var oldbg = $(element).css('background-color');
                        $(element).css('background-color', '#fd397a');
                        $(element).animate({ backgroundColor: oldbg }, "fast");
                    }
                }

                return transformedInput;
            });
        }
    };
});