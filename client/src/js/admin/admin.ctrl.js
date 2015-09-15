var app = require('../app');

app.controller('AdminController', ['$scope', '$state', 'currentUser',
    function ($scope, $state, currentUser) {
        if (!currentUser.isAdmin()) {
            $state.go('/');
        }


    }]);

app.controller('AdminCategoriesController', ['$scope', '$state', 'currentUser', 'Category',
    function ($scope, $state, currentUser, Category) {
        if (!currentUser.isAdmin()) {
            $state.go('/');
        }

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