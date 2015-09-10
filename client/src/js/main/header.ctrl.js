var app = require('../app');

app.controller('HeaderController', ['$scope', '$mdMedia',
    function ($scope, $mdMedia) {
        $scope.$mdMedia = $mdMedia;
    }]);