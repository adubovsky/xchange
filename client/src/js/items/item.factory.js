var app = require('../app');

app.factory('Item', ['$http', 'currentUser', '$q', function ($http, currentUser, $q) {
    var Item = function () {
        this.visible = true;
        this.tags = [];
    };

    Item.prototype.save = function () {
        this.userId = currentUser.getId();
        return $http.put('/api/item', this);
    };

    Item.prototype.isValid = function () {
        return !!(this.title && this.description && this.price && this.imageId);
    };

    Item.prototype.getById = function (id) {
        var deferred = $q.defer();
        $http.get(['/api/item', id].join('/'))
            .then(function (response) {
                var data = response.data;
                if (data.success) {
                    deferred.resolve(data.item);
                }
            });

        return deferred.promise;
    };

    Item.prototype.getTags = function (query) {
        var deferred = $q.defer();
        setTimeout(function () {
            deferred.resolve([
                {name: 'Computers'},
                {name: 'Electronics'},
                {name: 'Smart phones'}
            ]);
        }, Math.floor(2000 * Math.random()));
        return deferred.promise;
    };

    return Item;
}]);