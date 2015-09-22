var app = require('../app');

app.factory('Wish', ['$http', 'BasicModel', function ($http, BasicModel) {
    var Wish = BasicModel.new('Wish');

    Wish.prototype.save = function () {
        console.log('123');
    };

    return Wish;
}]);