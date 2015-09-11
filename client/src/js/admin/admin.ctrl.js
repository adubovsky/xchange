var app = require('../app');

app.controller('AdminController', ['$scope', '$state', 'currentUser',
    function ($scope, $state, currentUser) {
        if(!currentUser.isAdmin()) {
            $state.go('/');
        }


    }]);