'use strict';
var app = require('../app');

app.controller('MyTradesController', ['$scope', 'currentUser', 'Trade', function ($scope, currentUser, Trade) {
    Trade
        .getOffers()
        .then(function (trades) {
            $scope.offers = new Trade(trades);
        });

    Trade
        .getRequests()
        .then(function (trades) {
            $scope.requests = new Trade(trades);
        });

    $scope.confirm = function (trade) {
        trade.confirm()
            .then(function (response) {
                if(response.data.success){
                    trade.set({status: response.data.trade.status});
                }
            });
    };
    $scope.reject = function (trade) {
        trade.reject()
            .then(function (response) {
                if(response.data.success){
                    trade.set({status: response.data.trade.status});
                }
            });
    };
}]);