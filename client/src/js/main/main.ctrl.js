var app = require('../app');

app.controller('MainController', ['$scope', '$mdUtil', '$mdSidenav', '$rootScope', 'currentUser', 'Item',
    function ($scope, $mdUtil, $mdSidenav, $rootScope, currentUser, Item) {
        $scope.currentUser = currentUser;

        $scope.items = [];

        Item.get()
            .then(function (items) {
                $scope.items = items;
            });
    }]);