var app = require('../app');

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('/my/items', {
            url: "/my/items",
            templateUrl: "/partials/my/items.html",
            controller: 'MyItemsController'
        });
}]);