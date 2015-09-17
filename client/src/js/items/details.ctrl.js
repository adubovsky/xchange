var app = require('../app');

app.controller('ItemDetailsController', ['$scope', 'Item', '$stateParams', 'currentUser', '$mdDialog',
    function ($scope, Item, $stateParams, currentUser, $mdDialog) {
        var itemId = $stateParams.id;

        Item.getById(itemId)
            .then(function (item) {
                $scope.item = item;
            });

        $scope.user = currentUser;

        $scope.delete = function (item, ev) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this item?')
                .content('It couldn\'t be undone!')
                .ariaLabel('Lucky day')
                .ok('Yes, Delete it')
                .cancel('No, please don\'t')
                .targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                console.log( 'Deleted!' );
                $scope.item.delete();
            }, function() {
                console.log( 'Cancelled!' );
            });
        };
    }]);