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

    requestPromise()
        .then(function (results) {
            var categories = [];
            //need to parse results to categories
            if (_.isArray(results.Categorys)) {
                results.Categorys.forEach(function (category) {
                    categories.push({
                        id: category.CategoryID,
                        parentId: category.CategoryID === category.CategoryParentID ? null : category.CategoryParentID,
                        name: category.CategoryName
                    });
                });
            }
            return categories;
        })
        .then(function (categories) {
            var findByEbayId = function (id) {
                    return new Promise(function (resolve, reject) {
                        EbayCategory
                            .findOne({
                                ebayId: id
                            })
                            .exec(function (error, foundItem) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve(foundItem);
                                }
                            });
                    });
                },
                addCat = function (category) {
                    return findByEbayId(category.id)
                        .then(function (foundItem) {
                            var newItem;
                            if (foundItem) {
                                //already in DB
                                if (category.parentId) {
                                    return findByEbayId(category.parentId)
                                        .then(function (foundParent) {
                                            foundParent.children.push(foundItem);
                                            foundItem.parent = foundParent;
                                            foundParent.save();
                                            foundItem.save();
                                            return foundItem;
                                        });
                                }
                                return foundItem;
                            } else {
                                //need to add to DB
                                return new Promise(function (resolve, reject) {
                                    newItem = new EbayCategory();
                                    newItem.name = category.name;
                                    newItem.ebayId = category.id;
                                    newItem.save(function (error, savedItem) {
                                        if (category.parentId) {
                                            findByEbayId(category.parentId)
                                                .then(function (foundParent) {
                                                    foundParent.children.push(savedItem);
                                                    savedItem.parent = foundParent;
                                                    foundParent.save();
                                                    savedItem.save(function (error, savedItem) {
                                                        resolve(savedItem);
                                                    });
                                                });
                                        }
                                        else {
                                            resolve(savedItem);
                                        }
                                    });
                                });
                            }
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
        .then(function (categories) {
            res.json({categories: categories});
        })
        .catch(function (error) {
            res.json({error: error});
        });
});

module.exports = router;