'use strict';
var app = require('../app');

app.controller('ItemTradeController', ['$scope', 'Item', '$state', '$stateParams', 'currentUser', 'Trade',
    function ($scope, Item, $state, $stateParams, currentUser, Trade) {
        var requested = [$stateParams.id],
            userId = currentUser.getId();

        $scope.trade = new Trade();

        Item
            .getByIds(requested)
            .then(function (items) {
                $scope.trade.set({
                    requested: items,
                    tradeUser: items[0].userId
                });
            });

        Item
            .getByUserId(userId)
            .then(function (items) {
                $scope.items = items;
            });

        $scope.send = function (trade) {
            trade.send()
                .then(function () {
                    $state.go('^');
                });
        };
    }]);
