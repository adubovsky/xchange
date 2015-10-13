'use strict';
var app = require('../app');

app.controller('AdminEbayCategoriesController', ['$scope', '$state', 'currentUser', 'EbayCategory',
    function ($scope, $state, currentUser, EbayCategory) {
        var getCategories = function () {
            EbayCategory.get({parent: null})
                .then(function (categories) {
                    $scope.categories = categories;
                });
        };

        getCategories();
    }]);
