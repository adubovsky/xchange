"use strict";

var angular = require('angular'),
    app;

require('angular-material');
require('angular-ui-router');
require('ng-file-upload');

app = angular.module('xchangeApp', ['ngMaterial', 'ui.router', 'ngFileUpload']);

module.exports = app;