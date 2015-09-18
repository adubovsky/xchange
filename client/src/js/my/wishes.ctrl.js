var app = require('../app');

app.controller('MyWishesController', ['$scope', 'currentUser', 'Wish', function ($scope, currentUser, Wish) {
    $scope.newWish = new Wish();

    $scope.save = function (wish) {
        console.log(wish);
        $scope.wishes.push(wish);
        $scope.newWish = new Wish();
        $scope.selectedItem = null;
    };

    $scope.wishes = [];
}]);