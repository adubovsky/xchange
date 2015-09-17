var app = require('../app');

app.controller('MyItemsController', ['$scope', 'Item', 'currentUser', function ($scope, Item, currentUser) {
    Item.get({userId: currentUser.getId()})
        .then(function (items) {
            $scope.items = new Item(items);
        });
    $scope.user = currentUser;
}]);