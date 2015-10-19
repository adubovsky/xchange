'use strict';
var app = require('../app');

app.factory('Category', ['$http', '$q', 'BasicModel', 'apiHelper', function ($http, $q, BasicModel, apiHelper) {
    var Category = BasicModel.new('Category');

    Category.prototype.save = function () {
        return $http.put('/api/category', this);
    };

    Category.prototype.isValid = function () {
        return !!(this.name);
    };

    Category.get = apiHelper.get('/api/category', 'categories');

    Category.prototype.getChildren = function () {
        return Category.get({parent: this.getId()});
    };

    return Category;
}]);