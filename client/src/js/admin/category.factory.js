var app = require('../app');

app.factory('Category', ['$http', '$q', function ($http, $q) {
    var Category = function () {
    };

    Category.prototype.save = function () {
        return $http.put('/api/category', this);
    };

    Category.prototype.isValid = function () {
        return !!(this.name);
    };

    Category.get = function () {
        var defer = $q.defer();

        $http.get('/api/category')
            .then(function (response) {
                if (response.data.success) {
                    defer.resolve(response.data.categories);
                }
                else {
                    defer.reject(response.data);
                }
            });
        return defer.promise;
    };

    return Category;
}]);