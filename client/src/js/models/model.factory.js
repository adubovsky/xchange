'use strict';
var app = require('../app'),
    angular = require('angular');

app.factory('BasicModel', ['$http', '$q', function ($http, $q) {
    /**
     * BasicModel class factory
     * @param fieldsToBeSet {Object | Array} item fields json or collection of items
     * @param defaultFields {Object} fields that set by default
     * @param ConstructorFn {function}
     * @returns {*}
     * @constructor
     */
    var _init = function (ConstructorFn, fieldsToBeSet, defaultFields) {
        if (angular.isArray(fieldsToBeSet)) {
            return fieldsToBeSet.map(function (model) {
                return new ConstructorFn(model);
            });
        }
        else {
            this.set(defaultFields);
            this.set(fieldsToBeSet);
        }
    };
    var getNewClass = function (name, defaults) {
        /*jshint -W061 */
        var NewClass = eval('(function ' + name + '(options){' +
            'return _init.call(this, NewClass, options, defaults);' +
            '})');
        return NewClass;
    };

    var BasicModel = function () {
    };
    //Methods to inherit
    BasicModel.prototype.set = function (obj) {
        angular.extend(this, obj);
        return this;
    };

    BasicModel.prototype.getId = function () {
        return this._id;
    };

    return {
        /**
         * Generates class
         * @param name - class name
         * @param defaults - default values
         */
        new: function (name, defaults) {
            var NewClass = getNewClass(name, defaults);
            NewClass.prototype = angular.copy(BasicModel.prototype);
            return NewClass;
        }
    };
}]);