'use strict';
var app = require('../app');

app.controller('MyWishesController', ['$scope', 'currentUser', 'Wish', 'Item', function ($scope, currentUser, Wish, Item) {
    var getWishes = function () {
            Wish.get({user: currentUser.getId()})
                .then(function (wishes) {
                    $scope.wishes = wishes;
                });
        },
        clearForm = function () {
            $scope.newWish = new Wish();
            $scope.query = '';
        };

    $scope.newWish = new Wish();

    $scope.getTags = function (query) {
        return Item.getTags({searchQuery: query});
    };

    $scope.save = function (wish) {
        if (!wish.isValid()) {
            return;
        }

        wish.save()
            .then(function () {
                console.log('Saved!');
                clearForm();
                getWishes();
            },
            function (error) {
                clearForm();
                console.error(error.data);
            });
    };

    getWishes();


}]);