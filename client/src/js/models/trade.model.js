'use strict';
var app = require('../app');

app.factory('Trade', ['$http', '$q', 'BasicModel', 'currentUser','apiHelper', function ($http, $q, BasicModel, currentUser,apiHelper) {
    var Trade = BasicModel.new('Trade', {
        offered: []
    });

    Trade.prototype.send = function () {
        this.user = currentUser.getId();
        return $http.put('/api/trade', this);
    };

    Trade.prototype.isValid = function () {
        return !!(this.offered.length);
    };

    Trade.get = apiHelper.get('/api/trade', 'trades');

    Trade.getById = apiHelper.get('/api/trade', 'trade');

    Trade.getOffers = function () {
        return Trade.get({user: currentUser.getId()});
    };

    Trade.getRequests = function () {
        return Trade.get({tradeUser: currentUser.getId()});
    };

    Trade.prototype.has = function (item) {
        return this.offered.indexOf(item) > -1;
    };

    Trade.prototype.toggle = function (item) {
        var idx = this.offered.indexOf(item);
        if (idx > -1) {
            this.offered.splice(idx, 1);
        }
        else {
            this.offered.push(item);
        }
    };

    Trade.prototype.pending = function () {
        return this.status === 'pending';
    };
    Trade.prototype.confirmed = function () {
        return this.status === 'confirmed';
    };
    Trade.prototype.rejected = function () {
        return this.status === 'rejected';
    };

    Trade.prototype.confirm = function () {
        return $http.post('api/trade', {_id: this.getId(), confirm: true});
    };

    Trade.prototype.reject = function () {
        return $http.post('api/trade', {_id: this.getId(), reject: true});
    };

    return Trade;
}]);