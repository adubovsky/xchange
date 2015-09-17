var app = require('../app');

app.controller('MyItemsController', ['$scope', 'Item', 'currentUser', function ($scope, Item, currentUser) {
    Item.get({userId: currentUser.getId()})
        .then(function (items) {
            $scope.items = items.map(function (item) {
                return new Item(item);
            });
        });
    $scope.user = currentUser;
}]);