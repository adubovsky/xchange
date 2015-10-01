'use strict';
var app = require('../app');

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('/user/register', {
            url: "/user/register",
            templateUrl: "/partials/user/register.html",
            controller: 'UserRegisterController'
        })
        .state('/user/login', {
            url: "/user/login",
            templateUrl: "/partials/user/login.html",
            controller: 'UserLoginController'
        })
        .state('/user/settings', {
            url: "/user/settings",
            templateUrl: "/partials/user/settings.html",
            controller: 'UserSettingsController'
        });
}]);