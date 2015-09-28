var app = require('../app');

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('/my/items', {
            url: '/my/items',
            templateUrl: '/partials/my/items.html',
            controller: 'MyItemsController',
            authRequired: true
        })
        .state('/my/wishes', {
            url: '/my/wishes',
            templateUrl: '/partials/my/wishes.html',
            controller: 'MyWishesController',
            authRequired: true
        })
        .state('/my/trades', {
            url: '/my/trades',
            templateUrl: '/partials/my/trades.html',
            controller: 'MyTradesController',
            authRequired: true
        })
        .state('/my/trades.details',{
            authRequired: true,
            url: '/:id',
            views: {
                '@': {
                    templateUrl: "/partials/my/trade.html",
                    controller: 'MyTradeController'
                }
            }
        });
}]);