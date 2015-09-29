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

    Model.get = BasicModel.get('/api/model', 'models');

    return Model;
}]);