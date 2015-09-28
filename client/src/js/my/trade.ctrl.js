var app = require('../app');

app.controller('MyTradeController', ['$scope', 'currentUser', 'Trade', '$stateParams', function ($scope, currentUser, Trade, $stateParams) {
    var id = $stateParams.id;
    Trade
        .getById(id)
        .then(function (trade) {
            $scope.trade = new Trade(trade);
        });
}]);