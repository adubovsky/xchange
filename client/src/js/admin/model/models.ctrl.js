var app = require('../../app');

app.controller('AdminModelsController', ['$scope', '$state', 'currentUser', 'Model', 'Brand', 'Category',
    function ($scope, $state, currentUser, Model, Brand, Category) {
        var getCategories = function () {
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

        $scope.getBrands = function (subCategoryId) {
            Brand.get({subCategoryId: subCategoryId})
                .then(function (brands) {
                    $scope.brands = brands;
                });
        };


        $scope.model = new Model();

        $scope.save = function () {
            $scope.model.save()
                .then(function () {
                    $scope.model = new Model();
                    console.log('Saved');
                });
        };

        getCategories();
    }]);