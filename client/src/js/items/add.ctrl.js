'use strict';
var app = require('../app');

app.controller('ItemAddController', ['$scope', 'Item', 'Upload', '$state', '$stateParams', 'Category',
    function ($scope, Item, Upload, $state, $stateParams, Category) {
        var updating = false,
            itemId = $stateParams.id;

        if (itemId) {
            updating = true;
            Item.getById(itemId)
                .then(function (item) {
                    item = new Item(item);
                    item.photoUrl = item.getImageUrl();
                    $scope.item = item;
                });
        }
        else {
            $scope.item = new Item();
        }

        $scope.updating = updating;

        $scope.$watch('item.photo', function (newFile) {
            //Todo: need to remove temp file if user changes photo
            if (newFile) {
                Upload.upload({
                    url: 'upload/item/photo',
                    fields: {},
                    file: newFile
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function (data, status, headers, config) {
                    $scope.item.photoUrl = data.file.temp;
                }).error(function (data, status, headers, config) {
                });
            }
        });

        $scope.save = function (item) {
            item[!updating ? 'save' : 'update']()
                .then(function (response) {
                    $state.go(updating ? '^' : '/');
                });
        };

        $scope.getTags = function (query) {
            return Item.getTags({searchQuery: query});
        };

        $scope.categories = [];
        $scope.subCategoriesArray = [];
        Category.get()
            .then(function (categories) {
                $scope.categories = new Category(categories);
            });

        $scope.getSubCategories = function (parent, append) {
            parent.getChildren()
                .then(function (categories) {
                    if(!append){
                        $scope.subCategoriesArray = [];
                    }
                    //delete all subcategories upper than parent level
                    $scope.item.subCategory.slice(parent.level);
                    $scope.subCategoriesArray.slice(parent.level);
                    $scope.subCategoriesArray[parent.level-1] = new Category(categories);
                });
        };

    }]);