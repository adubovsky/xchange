'use strict';
var app = require('../app'),
    angular = require('angular');

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
                    if (!append) {
                        $scope.subCategoriesArray = [];
                    }
                    //delete all subcategories upper than parent level
                    $scope.item.subCategory.slice(parent.level);
                    $scope.subCategoriesArray.slice(parent.level);
                    $scope.subCategoriesArray[parent.level - 1] = new Category(categories);
                });
        };

        $scope.map = {
            center: {latitude: 0, longitude: 0},
            zoom: 2,
            markers: [],
            events: {
                click: function (map, eventName, originalEventArgs) {
                    var $event = originalEventArgs[0],
                        latitude = $event.latLng.lat(),
                        longitude = $event.latLng.lng();
                    $scope.map.marker = {
                        id: Date.now(),
                        coords: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    };
                    angular.extend($scope.map, {
                        zoom:7,
                        center: {
                            latitude: latitude,
                            longitude: longitude
                        }
                    });
                    $scope.$apply();
                }
            }
        };

    }]);