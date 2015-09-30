'use strict';
var app = require('../app');

app.controller('AdminCategoriesController', ['$scope', '$state', 'currentUser', 'Category',
    function ($scope, $state, currentUser, Category) {
        var getCategories = function () {
            Category.get({parent: null})
                .then(function (categories) {
                    $scope.categories = categories;
                });
        };

        $scope.newCat = new Category();

        $scope.save = function () {
            $scope.newCat.save()
                .then(function () {
                    $scope.newCat = new Category();
                    console.log('Saved');
                    getCategories();
                });
        };

        getCategories();
    }]);
