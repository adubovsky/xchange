'use strict';
var app = require('../app'),
    angular = require('angular');

app.controller('SidemenuController', ['$scope', '$mdUtil', '$mdSidenav', '$rootScope', 'currentUser',
    function ($scope, $mdUtil, $mdSidenav, $rootScope, currentUser) {
        $rootScope.toggleMenu = $mdUtil.debounce(function (toggle) {
            var action = angular.isUndefined(toggle) ? 'toggle' : (toggle ? 'open' : 'close'),
                sideBar = $mdSidenav('left');

            sideBar[action]()
                .then(function () {
                    console.log(action, 'done!');
                });
        }, 200);
        $scope.user = currentUser;
    }]);
