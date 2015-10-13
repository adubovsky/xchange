'use strict';
var app = require('../app');

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('/admin/dashboard', {
            url: "/admin/dashboard",
            authRequired: "admin",
            templateUrl: "/partials/admin/dashboard.html",
            controller: 'AdminController'
        })
        .state('/admin/categories', {
            url: "/admin/categories",
            authRequired: "admin",
            templateUrl: "/partials/admin/categories.html",
            controller: 'AdminCategoriesController'
        })
        .state('/admin/brands', {
            url: "/admin/brands",
            authRequired: "admin",
            templateUrl: "/partials/admin/brands.html",
            controller: 'AdminBrandsController'
        })
        .state('/admin/models', {
            url: "/admin/models",
            authRequired: "admin",
            templateUrl: "/partials/admin/models.html",
            controller: 'AdminModelsController'
        })
        .state('/admin/ebay/categories', {
            url: "/admin/ebay/categories",
            authRequired: "admin",
            templateUrl: "/partials/admin/ebay-categories.html",
            controller: 'AdminEbayCategoriesController'
        });
}]);