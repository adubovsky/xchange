var app = require('../app');

app.controller('MyWishesController', ['$scope', 'currentUser','Wish', function ($scope, currentUser, Wish) {
    var wishes = new Wish([{_id: 1}, {_id:2}]),
        wish = new Wish({_id: 12});
    console.log( wishes, wish );
}]);