app.filter('capitalize', function () {
    return function (input) {
        return (!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
});

app.filter('stringsubstring', function () {
    return function (value, length) {
        var str = value ? (value.length > length ? value.substring(0, length) + "<b>...</b>" : value) : 'N/A';
        return $("<div/>").html(str).text();
    };
});

app.filter('datetimeformat', function () {
    return function (dateString, format) {
        return dateString != null ? moment(dateString).format(format ? format : 'DD/MM/YYYY H:mm') : '';
    };
});


app.filter('monthnameformat', function () {
    return function (monthNo) {
        return getMonthName(monthNo);
    };
});

app.filter('moneyformat', function () {
    return function (input, currencySymbol) {
        return input != undefined && input != null && input.toString() != '' ? (currencySymbol ? currencySymbol + parseFloat(input).toFixed(0) : "$" + parseFloat(input).toFixed(0)) : '';
    };
});