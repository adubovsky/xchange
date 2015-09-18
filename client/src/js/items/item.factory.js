var app = require('../app');

app.factory('Item', ['$http', 'currentUser', '$q', '$mdDialog', 'BasicModel', function ($http, currentUser, $q, $mdDialog, BasicModel) {
    /**
     * Item class
     * @param options {Object | Array} item fields json or collection of items
     * @returns {*}
     * @constructor
     */
    var Item = BasicModel.new('Item', {
        visible: true,
        tags: []
    });

    Item.prototype.save = function () {
        this.userId = currentUser.getId();
        return $http.put('/api/item', this);
    };

    Item.prototype.update = function () {
        return $http.post('/api/item', this);
    };

    Item.prototype.delete = function () {
        return $http.delete('/api/item', this);
    };

    Item.prototype.isValid = function () {
        return !!(this.title && this.description && this.price && this.photoUrl);
    };

    Item.prototype.getImageUrl = function () {
        return ['/images', this.imageId].join('/');
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
        $http.get('/api/category')
            .then(function (response) {
                if (response.data.success) {
                    deferred.resolve(response.data.categories);
                }
            });
        return deferred.promise;
    };

    Item.get = function (options) {
        var defer = $q.defer();

        $http.get('/api/item', {params: options})
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

    Item.prototype.deleteConfirm = function (ev) {
        var item = this,
            confirm = $mdDialog.confirm()
                .title('Would you like to delete this item?')
                .content('It couldn\'t be undone!')
                .ariaLabel('Lucky day')
                .ok('Yes, Delete it')
                .cancel('No, please don\'t')
                .targetEvent(ev);
        $mdDialog.show(confirm).then(function () {
            console.log('Deleted!');
            item.delete();
        }, function () {
            console.log('Cancelled!');
        });
    };

    return Item;
}]);