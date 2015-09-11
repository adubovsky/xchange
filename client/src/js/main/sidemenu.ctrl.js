var app = require('../app');

app.controller('SidemenuController', ['$scope', '$mdUtil', '$mdSidenav', '$rootScope',
    function ($scope, $mdUtil, $mdSidenav, $rootScope) {
        $rootScope.toggleMenu = $mdUtil.debounce(function () {
            $mdSidenav('left')
                .toggle()
                .then(function () {
                    console.log('done!');
                });
        }, 200);
    }]);
