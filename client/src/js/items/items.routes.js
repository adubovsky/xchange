var app = require('../app');

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('/item/add', {
            url: "/item/add",
            templateUrl: "/partials/items/add.html",
            controller: 'ItemAddController',
            authRequired: true
        })
        .state('/item/details', {
            url: "/item/:id",
            templateUrl: "/partials/items/details.html",
            controller: 'ItemDetailsController'
        })
        .state('/item/details.edit', {
            authRequired: true,
            url: "/edit",
            views: {
                '@': {
                    templateUrl: "/partials/items/add.html",
                    controller: 'ItemAddController'
                }
            }
        });
}]);