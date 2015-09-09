var app = require('../app');

app.controller('SidemenuController', ['$scope', '$mdUtil', '$mdSidenav', '$rootScope', 'User', 'currentUser',
    function ($scope, $mdUtil, $mdSidenav, $rootScope, User, currentUser) {
        $rootScope.toggleMenu = $mdUtil.debounce(function () {
            $mdSidenav('left')
                .toggle()
                .then(function () {
                    console.log('done!');
                });
        }, 200);

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
