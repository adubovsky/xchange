'use strict';
var app = require('../app');

app.controller('UserSettingsController', ['$scope', 'User', 'currentUser', 'Upload', function ($scope, User, currentUser, Upload) {

    $scope.user = currentUser;
    $scope.user.photoUrl = currentUser.getImageUrl();

    $scope.saveSettings = function (user) {
        user.saveSettings()
            .then(function (response) {
                console.log('User settings have been saved!');
            });
    };

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
                $scope.user.photoUrl = data.file.temp;
            }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
            });
        }
    });

}]);