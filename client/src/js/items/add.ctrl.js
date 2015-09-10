var app = require('../app');

app.controller('ItemAddController', ['$scope', 'Item', 'Upload', '$state', function ($scope, Item, Upload, $state) {
    $scope.item = new Item();

    $scope.$watch('item.photo', function (newFile) {
        if (newFile) {
            Upload.upload({
                url: 'upload/item/photo',
                fields: {},
                file: newFile
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
                $scope.item.imageId = data.file.temp;
            }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });
        }
    });

    $scope.save = function (item) {
        item.save()
            .then(function (response) {
                $state.go('/');
                console.log(response);
            });
    };
}]);