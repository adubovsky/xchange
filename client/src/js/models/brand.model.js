var app = require('../app');
/**
 * Model for brand (manufacturer, author, etc.)
 * e.g. iPhone, Tesla, Stephen King, etc.
 */
app.factory('Brand', ['$http', '$q', 'BasicModel', function ($http, $q, BasicModel) {
    var Brand = BasicModel.new('Brand');

    Brand.prototype.save = function () {
        return $http.put('/api/brand', this);
    };

    Brand.prototype.isValid = function () {
        return !!(this.name && this.category && this.subCategory);
    };

    Brand.get = BasicModel.get('/api/brand', 'brands');

    return Brand;
}]);