"use strict";

var angular = require('angular'),
    app;

require('angular-material');
require('angular-ui-router');
require('ng-file-upload');
require('angular-google-maps');

app = angular.module('xchangeApp', ['ngMaterial', 'ui.router', 'ngFileUpload', 'uiGmapgoogle-maps']);

app.run(['$rootScope', '$state', 'currentUser', 'User', function ($rootScope, $state, currentUser, User) {
    var checked = currentUser.check();

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        checked.then(function () {
            if (toState.authRequired && !currentUser.isLogged ||
                toState.authRequired === 'admin' && !currentUser.isAdmin()) {

                event.preventDefault();
                $state.go('/');
            }
        });
    });

}]);

module.exports = app;