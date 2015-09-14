var app = require('../app');

app.directive('menuItem', function () {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: '/partials/directives/menu-item.html'
    };
});