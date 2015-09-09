var app = require('../app');

app.controller('MainController', ['$scope', '$mdUtil', '$mdSidenav', '$rootScope', 'currentUser', '$http',
    function ($scope, $mdUtil, $mdSidenav, $rootScope, currentUser, $http) {
        $scope.currentUser = currentUser;

        $scope.items = [];

        $http.get('/api/items')
            .then(function (response) {
                if (response.data.success) {
                    $scope.items = response.data.items;
                }
            });
    }]);