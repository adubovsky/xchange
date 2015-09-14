var app = require('../app');

app.directive('menuItem', function () {
    return {
        restrict: 'E',
        transclude: true,
        template: '<md-button class="menu-item__button"><ng-transclude></ng-transclude></md-button>'
    };
});