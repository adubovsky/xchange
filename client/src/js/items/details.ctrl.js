var app = require('../app');

app.controller('ItemDetailsController', ['$scope', 'Item', '$stateParams', 'currentUser', '$mdDialog',
    function ($scope, Item, $stateParams, currentUser, $mdDialog) {
        var itemId = $stateParams.id;

        Item.getById(itemId)
            .then(function (item) {
                $scope.item = item;
            });

        $scope.user = currentUser;
    }]);