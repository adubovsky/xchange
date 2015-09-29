var app = require('../app');

app.factory('BasicModel', ['$http', '$q', function ($http, $q) {
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
    //Methods to inherit
    BasicModel.prototype.set = function (obj) {
        angular.extend(this, obj);
        return this;
    };

    BasicModel.prototype.getId = function () {
        return this._id;
    };
    /**
     * Returns get function that does request to api on url and returns items at field
     * @param url {string} url to api
     * @param returnField {string} field where api returns data array
     * @returns {Function}
     */
    BasicModel.createGet = function (url, returnField) {
        var urlToApi = url;
        return function (options) {
            /**
             * Returns promise with request to api by options (options can be id)
             * options {object|string} options to search or id of item
             */
            var defer = $q.defer(),
                params = {params: options};

            if (angular.isString(options)) {
                //get by id
                urlToApi = [url, options].join('/');
                params = {};
            }

            $http.get(urlToApi, params)
                .then(function (response) {
                    if (response.data.success) {
                        defer.resolve(response.data[returnField]);
                    }
                    else {
                        defer.reject(response.data);
                    }
                });
            return defer.promise;
        };
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
        },
        /**
         * Generates get function to api
         */
        get: BasicModel.createGet
    };
}]);