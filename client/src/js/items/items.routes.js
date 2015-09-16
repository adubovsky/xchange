var app = require('../app');

app.config(['$stateProvider', function ($stateProvider) {
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
        })
        .state('/item/edit', {
            url: "/item/:id/edit",
            templateUrl: "/partials/items/add.html",
            controller: 'ItemAddController'
        });
}]);