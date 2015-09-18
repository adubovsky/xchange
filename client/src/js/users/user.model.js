var app = require('../app');

app.factory('User', ['$http', '$q', 'BasicModel', function ($http, $q, BasicModel) {

    var User = BasicModel.new('User');

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

    User.prototype.isValid = function () {
        return !!(this.username && this.password);
    };

    User.prototype.isAdmin = function () {
        return this.role === 'admin' && this.isLogged;
    };

    User.prototype.hasPhoto = function () {
        return !!this.photo;
    };

    User.prototype.checkNotifications = function () {
        return true;
    };

    return User;
}]);

app.factory('currentUser', ['User', '$http','$q', function (User, $http, $q) {
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

    currentUser.check = function () {
        var deferred = $q.defer();
        currentUser.getDetails()
            .then(function (result) {
                var user = result.user;
                currentUser.setUser(user);
                currentUser.setLogged(true);
            },
            function () {
                currentUser.setLogged(false);
            }).then(function () {
                deferred.resolve();
            });

        return deferred.promise;
    };

    return currentUser;
}]);