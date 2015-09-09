var app = require('../app');

app.controller('UserController', ['$scope', 'User', 'currentUser', function ($scope, User, currentUser) {

}]);

app.controller('UserLoginController',
    ['$scope', '$state', 'User', 'currentUser', '$mdToast',
        function ($scope, $state, User, currentUser, $mdToast) {

            $scope.user = new User();

            $scope.login = function (user) {
                var login = user.login();
                login
                    .then(function (result) {
                        var user = result.user;
                        currentUser.setUser(user);
                        currentUser.setLogged(true);
                        $state.go('/');
                    }, function (result) {
                        if (result.status === 401) {
                            $mdToast.showSimple('Wrong login-password pair');
                        }
                    });
            }
        }]);

app.controller('UserRegisterController', ['$scope', '$state', 'User', 'currentUser', '$mdToast', function ($scope, $state, User, currentUser, $mdToast) {
    $scope.newUser = new User({new: true});
    $scope.random = String(Math.floor(Math.random() * 10000));

    $scope.register = function (user) {
        user.register()
            .then(function (result) {
                if (result.success) {
                    var user = result.user;
                    currentUser.setUser(user);
                    currentUser.setLogged(true);
                    $state.go('/');
                }
                else {
                    $mdToast.showSimple(result.error.message);
                }
            }, function (result) {
                console.warn(result);
            });
    }
}]);