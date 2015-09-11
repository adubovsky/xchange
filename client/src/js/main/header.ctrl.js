var app = require('../app');

app.controller('HeaderController', ['$scope', '$mdMedia', 'User', 'currentUser',
    function ($scope, $mdMedia, User, currentUser) {
        $scope.$mdMedia = $mdMedia;

        var user = new User();
        user.getDetails()
            .then(function (result) {
                var user = result.user;
                currentUser.setUser(user);
                currentUser.setLogged(true);
            },
            function () {
                currentUser.setLogged(false);
            });

        $scope.user = currentUser;
    }]);