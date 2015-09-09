var app = require('./app');

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
        .otherwise('/');

    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'partials/main/main.html',
            controller: 'MainController'
        })
}]);