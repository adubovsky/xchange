'use strict';
var app = require('../app');

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('/user/register', {
            url: "/user/register",
            templateUrl: "/partials/users/register.html",
            controller: 'UserRegisterController'
        })
        .state('/user/login', {
            url: "/user/login",
            templateUrl: "/partials/users/login.html",
            controller: 'UserLoginController'
        });
}]);