var app = require('../app');

app.factory('Category', ['$http', '$q', 'BasicModel', function ($http, $q, BasicModel) {
    var Category = BasicModel.new('Category');

    Category.prototype.save = function () {
        return $http.put('/api/category', this);
    };

    Category.prototype.isValid = function () {
        return !!(this.name);
    };

    Category.get = BasicModel.get('/api/category', 'categories');

    return Category;
}]);