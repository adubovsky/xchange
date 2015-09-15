var app = require('../app');

app.config(['$stateProvider', '$urlRouterProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('/item/add', {
            url: "/item/add",
            templateUrl: "/partials/items/add.html",
            controller: 'ItemAddController'
        })
        .state('/item/details', {
            url: "/item/:id",
            templateUrl: "/partials/items/details.html",
            controller: 'ItemController'
        });
}]);