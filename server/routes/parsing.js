'use strict';
/**
 * Parsing
 */
var express = require('express'),
    router = express.Router(),
    cheerio = require('cheerio'),
    config = require('../config'),
    path = require('path'),
    EbayCategory = require('../models/ebay-category'),
    _ = require('underscore'),
    ebayAPI = require('ebay-api'),
    privateConfig = require('../private');

router.get('/ebayCategories', function (req, res) {
    function requestPromise() {
        return new Promise(function (resolve, reject) {
            ebayAPI.xmlRequest({
                serviceName: 'Trading',
                opType: 'GetCategories',

                // app/environment
                devId: privateConfig.ebay.devId,
                certId: privateConfig.ebay.certId,
                appName: privateConfig.ebay.appName,
                sandbox: false,

                // per user
                authToken: privateConfig.ebay.authToken,

                params: {
                    'DetailLevel': 'ReturnAll',
                    'WarningLevel': 'High',
                    //'LevelLimit': 2,
                    'CategorySiteID': 0
                }
            }, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    function findByEbayId(id) {
        return new Promise(function (resolve, reject) {
            EbayCategory
                .findOne({
                    ebayId: id
                })
                .exec(function (error, foundItem) {
                    resolve(foundItem);
                });
        });
    }

    requestPromise()
        .then(function (results) {
            //parse response
            var categories = [];
            //need to parse results to categories
            if (_.isArray(results.Categorys)) {
                results.Categorys.forEach(function (category) {
                    var item = {
                        id: category.CategoryID,
                        parentId: category.CategoryID === category.CategoryParentID ? null : category.CategoryParentID,
                        name: category.CategoryName,
                        level: category.CategoryLevel
                    };
                    categories.push(item);
                });
            }
            return categories;
        })
        .then(function (categories) {
            //add to db
            var addCat = function (category) {
                    return findByEbayId(category.id)
                        .then(function (foundItem) {
                            var newItem;
                            if (foundItem) {
                                //already in DB
                                newItem = foundItem;
                            }
                            else {
                                newItem = new EbayCategory();
                            }
                            return new Promise(function (resolve, reject) {
                                newItem.name = category.name;
                                newItem.ebayId = category.id;
                                newItem.level = category.level;
                                newItem.parentEbayId = category.parentId;
                                newItem.save(function (error, savedItem) {
                                    resolve(savedItem);
                                });
                            });
                        });
                },
                promises = [];
            //need to save
            categories
                .forEach(function (category) {
                    promises.push(addCat(category));
                });

            return Promise.all(promises);
        })
        .then(function (documents) {
            //need to add dependencies to DB
            var promises = [];
            documents.forEach(function (document) {
                if (document.parentEbayId) {
                    promises.push(findByEbayId(document.parentEbayId)
                        .then(function (foundParent) {
                            if (foundParent.children.indexOf(document._id) === -1) {
                                foundParent.children.push(document._id);
                                document.parent = foundParent._id;
                                foundParent.save();
                                document.save();
                            }
                            return document;
                        }));
                }
            });
            return Promise.all(promises);
        })
        .then(function (categories) {
            res.json({categories: categories});
        })
        .catch(function (error) {
            res.json({error: error});
        });
});

module.exports = router;