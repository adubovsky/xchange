var app = require('../app');

app.factory('User', ['$http', '$q', function ($http, $q) {

    var User = function (options) {
        options = options || {};
        this.new = options.new || false;
    };

    User.prototype.register = function () {
        if (!this.new) return;
        var deferred = $q.defer();
        $http.post('/user/register',
            {
                username: this.username,
                password: this.password
            })
            .then(function onUserRegisterSuccess(response) {
                deferred.resolve(response.data);
            }, function onUserRegisterError(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    User.prototype.login = function () {
        if (!this.isValid()) return;
        var deferred = $q.defer();
        $http.post('/user/login',
            {
                username: this.username,
                password: this.password
            })
            .then(function onUserLoginSuccess(response) {
                deferred.resolve(response.data);
            }, function onUserLoginError(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    User.prototype.getDetails = function () {
        var deferred = $q.defer();
        $http.get('/user/details')
            .then(function onUserCheckLogin(response) {
                deferred.resolve(response.data);
            }, function onUserCheckLoginError(response) {
                deferred.reject(response.data);
            });
        return deferred.promise;
    };

    User.prototype.getId = function () {
        return this._id;
    };

    User.prototype.isValid = function () {
        return !!(this.username && this.password);
    };

    User.prototype.isAdmin = function () {
        return this.role === 'admin' && this.isLogged;
    };

    return User;
}]);

app.factory('currentUser', ['User', '$http', function (User, $http) {
    var currentUser = new User();

    currentUser.setUser = function (user) {
        angular.extend(this, user);
    };

    currentUser.setLogged = function (logged) {
        this.isLogged = logged;
    };

    currentUser.logout = function () {
        $http.post('/user/logout')
            .then(function onUserLogoutSuccess(response) {
                currentUser.setLogged(false);
            }, function onUserLogoutError(response) {

            });
    };

    return currentUser;
}]);