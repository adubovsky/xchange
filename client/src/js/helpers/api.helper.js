var app = require('../app');

app.factory('apiHelper', ['$http', '$q', function ($http, $q) {
    var apiHelper = {};

    /**
     * Returns get function that does request to api on url and returns items at field
     * @param options {object} options can be passed by object
     * @param options.url {string} -> url
     * @param options.dataField {string} -> returnField
     * @param options.postProcess {function} -> postProcessFunction
     *
     * @param url {string} url to api
     * @param returnField {string} field where api returns data array
     * @param postProcessFunction {function} returns processed items (if items need to be processed somehow after response)
     * @returns {Function}
     *
     * @example     Item.get = apiHelper.get('/api/item', 'items', function (items) {
                        return new Item(items);
                    });

     Item.getById = apiHelper.get({
                        url: '/api/item',
                        dataField: 'item',
                        postProcess: function (item) {
                            return new Item(item);
                        }
                    });
     */
    apiHelper.get = function APIGet() {
        var url, returnField, postProcessFunction, urlToApi;
        if (arguments.length === 1 && angular.isObject(arguments[0])) {
            url = arguments[0].url;
            returnField = arguments[0].dataField;
            postProcessFunction = arguments[0].postProcess;
        } else {
            url = arguments[0];
            returnField = arguments[1];
            postProcessFunction = arguments[2];
        }
        urlToApi = url;
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
                        var items = response.data[returnField];
                        if (angular.isFunction(postProcessFunction)) {
                            items = postProcessFunction(items);
                        }
                        defer.resolve(items);
                    }
                    else {
                        defer.reject(response.data);
                    }
                });
            return defer.promise;
        };
    };

    return apiHelper;
}]);