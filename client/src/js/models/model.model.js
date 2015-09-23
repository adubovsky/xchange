var app = require('../app');
/**
 * Model for item model (model name, item name, book title etc.)
 * e.g. [iPhone] 6s plus, [Tesla] Model 3, [Stephen King's] The dark tower, etc.
 */
app.factory('Model', ['$http', '$q', 'BasicModel', function ($http, $q, BasicModel) {
    var Model = BasicModel.new('Model');

    Model.prototype.save = function () {
        return $http.put('/api/model', this);
    };

    Model.prototype.isValid = function () {
        return !!(this.name && this.category && this.subCategory && this.brand);
    };

    Model.get = function () {
        var defer = $q.defer();

        $http.get('/api/model')
            .then(function (response) {
                if (response.data.success) {
                    defer.resolve(response.data.models);
                }
                else {
                    defer.reject(response.data);
                }
            });
        return defer.promise;
    };

    return Model;
}]);