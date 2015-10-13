'use strict';
var app = require('../app');

app.factory('EbayCategory', ['$http', '$q', 'BasicModel','apiHelper', function ($http, $q, BasicModel,apiHelper) {
    var Category = BasicModel.new('EbayCategory');

    Category.prototype.isValid = function () {
        return !!(this.name);
    };

    Category.get = apiHelper.get('/api/category/ebay', 'categories');

    return Category;
}]);