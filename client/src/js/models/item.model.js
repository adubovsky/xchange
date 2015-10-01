'use strict';
var app = require('../app');

app.factory('Item', ['$http', 'currentUser', '$q', '$mdDialog', 'BasicModel', 'apiHelper',
    function ($http, currentUser, $q, $mdDialog, BasicModel, apiHelper) {
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
        return apiHelper.getImageUrl(this.imageId);
    };

    Item.getByIds = function (ids) {
        return Item.get({ids: ids});
    };

    Item.getByUserId = function (userId) {
        return Item.get({userId: userId});
    };

    Item.getTags = apiHelper.get('/api/tag', 'tags');

    Item.get = apiHelper.get('/api/item', 'items', function (items) {
        return new Item(items);
    });

    Item.getById = apiHelper.get('/api/item', 'item', function (item) {
        return new Item(item);
    });

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