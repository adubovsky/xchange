var app = require('../app');

app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('/admin/dashboard', {
            url: "/admin/dashboard",
            templateUrl: "/partials/admin/dashboard.html",
            controller: 'AdminController'
        });
}]);