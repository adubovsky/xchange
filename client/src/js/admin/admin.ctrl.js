var app = require('../app');

app.controller('AdminController', ['$scope', '$state', 'currentUser',
    function ($scope, $state, currentUser) {
        if (!currentUser.isAdmin()) {
            $state.go('/');
        }


    }]);

app.controller('AdminCategoriesController', ['$scope', '$state', 'currentUser', 'Category',
    function ($scope, $state, currentUser, Category) {
        var getCategories = function () {
            Category.get()
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

app.controller('AdminBrandsController', ['$scope', '$state', 'currentUser', 'Brand',
    function ($scope, $state, currentUser, Brand) {
        var getBrands = function () {
            Brand.get()
                .then(function (brands) {
                    $scope.brands = brands;
                });
        };

        $scope.newBrand = new Brand();

        $scope.save = function () {
            $scope.newBrand.save()
                .then(function () {
                    $scope.newBrand = new Brand();
                    console.log('Saved');
                    getBrands();
                });
        };

        getBrands();
    }]);