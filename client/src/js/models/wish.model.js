var app = require('../app');

app.factory('Wish', ['$http', '$q', 'BasicModel', 'currentUser', function ($http, $q, BasicModel, currentUser) {
    var Wish = BasicModel.new('Wish');

    Wish.prototype.save = function () {
        this.user = currentUser.getId();
        return $http.put('/api/wish', this);
    };

    Wish.prototype.isValid = function () {
        return !!(this.tag);
    };

    Wish.get = BasicModel.get('/api/wish', 'wishes');

    return Wish;
}]);