'use strict';
var app = require('../app');

app.directive('consoleLog', function () {
    return {
        restrict: 'E',
        transclude: true,
        template: '',
        scope: {
            log:'='
        },
        link: function (scope) {
            console.log( scope.log );
        }
    };
});