var app = require('../app');

app.controller('ItemController', ['$scope', 'Item', '$stateParams', 'currentUser', function ($scope, Item, $stateParams, currentUser) {
    var item = new Item();

    item
        .getById($stateParams.id)
        .then(function (found) {
            $scope.item = found;
        });

    $scope.user = currentUser;
}]);