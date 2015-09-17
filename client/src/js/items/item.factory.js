var app = require('../app');

app.factory('Item', ['$http', 'currentUser', '$q', function ($http, currentUser, $q) {
    var Item = function () {
        this.visible = true;
        this.tags = [];
    };

    Item.prototype.set = function (obj) {
        angular.extend(this, obj);
        return this;
    };

    Item.prototype.save = function () {
        this.userId = currentUser.getId();
        return $http.put('/api/item', this);
    };

    Item.prototype.update = function () {
        return $http.post('/api/item', this);
    };

    Item.prototype.isValid = function () {
        return !!(this.title && this.description && this.price && this.photoUrl);
    };

    Item.getById = function (id) {
        var deferred = $q.defer();
        $http.get(['/api/item', id].join('/'))
            .then(function (response) {
                var data = response.data,
                    item = new Item();
                if (data.success) {
                    item.set(data.item);
                    deferred.resolve(item);
                }
            });

        return deferred.promise;
    };

    Item.getTags = function (query) {
        var deferred = $q.defer();
        $http.get('/api/categories')
            .then(function (response) {
                if (response.data.success) {
                    deferred.resolve(response.data.categories);
                }
            });
        return deferred.promise;
    };

    Item.get = function (options) {
        var defer = $q.defer();

        $http.get('/api/items', options)
            .then(function (response) {
                if (response.data.success) {
                    defer.resolve(response.data.items);
                }
                else {
                    defer.reject(response.data);
                }
            });
        return defer.promise;
    };

    return Item;
}]);