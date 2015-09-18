var app = require('../app');

app.factory('BasicModel', [function () {
    /**
     * BasicModel class factory
     * @param fieldsToBeSet {Object | Array} item fields json or collection of items
     * @param defaultFields {Object} fields that set by default
     * @param constructorFn {function}
     * @returns {*}
     * @constructor
     */
    var _init = function (constructorFn, fieldsToBeSet, defaultFields) {
        if (angular.isArray(fieldsToBeSet)) {
            return fieldsToBeSet.map(function (model) {
                return new constructorFn(model);
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