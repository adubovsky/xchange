'use strict';
var app = require('../app');

app.controller('ItemAddController', ['$scope', 'Item', 'Upload', '$state', '$stateParams', function ($scope, Item, Upload, $state, $stateParams) {
    var updating = false,
        itemId = $stateParams.id;

    if (itemId) {
        updating = true;
        Item.getById(itemId)
            .then(function (item) {
                item = new Item(item);
                item.photoUrl = item.getImageUrl();
                $scope.item = item;
            });
    }
    else {
        $scope.item = new Item();
    }

    $scope.updating = updating;

    $scope.$watch('item.photo', function (newFile) {
        //Todo: need to remove temp file if user changes photo
        if (newFile) {
            Upload.upload({
                url: 'upload/item/photo',
                fields: {},
                file: newFile
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
                $scope.item.photoUrl = data.file.temp;
            }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });
        }
    });

    $scope.save = function (item) {
        item[!updating ? 'save' : 'update']()
            .then(function (response) {
                $state.go(updating ? '^' : '/');
            });
    };

    $scope.getTags = function (query) {
        return Item.getTags({searchQuery: query});
    };
}]);