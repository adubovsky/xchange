var app = require('../app');

app.controller('SidemenuController', ['$scope', '$mdUtil', '$mdSidenav', '$rootScope', 'currentUser',
    function ($scope, $mdUtil, $mdSidenav, $rootScope, currentUser) {
        $rootScope.toggleMenu = $mdUtil.debounce(function () {
            $mdSidenav('left')
                .toggle()
                .then(function () {
                    console.log('done!');
                });
        }, 200);
        $scope.user = currentUser;
    }]);
