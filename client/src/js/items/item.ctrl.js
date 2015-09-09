var app = require('../app');

app.controller('ItemController', ['$scope', 'Item', '$stateParams', function ($scope, Item, $stateParams) {
    var item = new Item();

    item
        .getById($stateParams.id)
        .then(function (found) {
            $scope.item = found;
        });
}]);