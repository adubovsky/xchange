var app = require('../app');

app.controller('ItemController', ['$scope', 'Item', 'Upload', '$stateParams', function ($scope, Item, Upload, $stateParams) {
    var item = new Item();

    item
        .getById($stateParams.id)
        .then(function (found) {
            $scope.item = found;
        });
}]);