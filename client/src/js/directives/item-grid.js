'use strict';
var app = require('../app'),
    angular = require('angular');

app.directive('itemGrid', function () {
    return {
        restrict: 'E',
        templateUrl: '/partials/directives/item-grid.html',
        scope: {
            items: '='
        },
        compile: function ($element, $attrs) {
            var gridEl = $element.children();
            //Passing md attributes
            $element.addClass('item-grid-container');
            angular.forEach($attrs.$attr, function (value, key) {
                if (key.slice(0, 2) === 'md') {
                    gridEl.attr(value, $attrs[key]);
                }
            });
        },
        controller: ['$element',function ($element) {

        }]
    };
});