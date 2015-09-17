var app = require('../app');

app.controller('HeaderController', ['$scope', '$mdMedia', 'User', 'currentUser',
    function ($scope, $mdMedia, User, currentUser) {
        $scope.$mdMedia = $mdMedia;

        $scope.user = currentUser;

        $scope.toggleUserMenu = function ($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };
    }]);