'use strict';
var app = require('../app');

app.controller('AdminBrandsController', ['$scope', '$state', 'currentUser', 'Brand', 'Category',
    function ($scope, $state, currentUser, Brand, Category) {
        var getBrands = function () {
                Brand.get()
                    .then(function (brands) {
                        $scope.brands = brands;
                    });
            },
            getCategories = function () {
                Category.get()
                    .then(function (categories) {
                        $scope.categories = categories;
                    });
            };

        $scope.getSubCategories = function (parentId) {
            if (parentId) {
                Category.get({parent: parentId})
                    .then(function (categories) {
                        $scope.subCategories = categories;
                    });
            } else {
                $scope.subCategories = [];
            }
        };

        $scope.brand = new Brand();

        $scope.save = function () {
            $scope.brand.save()
                .then(function () {
                    $scope.brand = new Brand();
                    console.log('Saved');
                    getBrands();
                });
        };

        //getBrands();
        getCategories();
    }]);