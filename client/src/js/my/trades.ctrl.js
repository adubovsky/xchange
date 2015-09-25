var app = require('../app');

app.controller('MyTradesController', ['$scope', 'currentUser', 'Trade', function ($scope, currentUser, Trade) {
    Trade
        .getOffers()
        .then(function (trades) {
            $scope.offers = trades;
        });

    Trade
        .getRequests()
        .then(function (trades) {
            $scope.requests = trades;
        });
}]);