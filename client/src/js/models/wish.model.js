'use strict';
var app = require('../app');

app.factory('Wish', ['$http', '$q', 'BasicModel', 'currentUser', 'apiHelper', function ($http, $q, BasicModel, currentUser, apiHelper) {
    var Wish = BasicModel.new('Wish');

    Wish.prototype.save = function () {
        this.user = currentUser.getId();
        return $http.put('/api/wish', this);
    };

    Wish.prototype.isValid = function () {
        return !!(this.category);
    };
    Wish.getTags = apiHelper.get('/api/wish/search', 'tags');
    Wish.get = apiHelper.get('/api/wish', 'wishes');

    return Wish;
}]);