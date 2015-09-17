var app = require('../app');

app.controller('ItemController', ['$scope', 'Item', '$stateParams', 'currentUser', function ($scope, Item, $stateParams, currentUser) {
    var itemId = $stateParams.id;

    Item.getById(itemId)
        .then(function (item) {
            $scope.item = item;
        });

    $scope.user = currentUser;
}]);