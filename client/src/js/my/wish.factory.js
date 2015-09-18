var app = require('../app');

app.factory('Wish', ['$http', 'BasicModel', function ($http, BasicModel) {
    var Wish = BasicModel.new('Wish');

    return Wish;
}]);