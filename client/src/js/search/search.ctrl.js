var app = require('../app');

app.controller('SearchController', ['$scope', function ($scope) {
    $scope.hello = "Hello Search!";

    $scope.$watch('query', function (newValue, oldValue) {
        console.log(newValue, oldValue);
    });
}]);