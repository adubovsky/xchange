'use strict';
/**
 * Parsing
 */
var express = require('express'),
    router = express.Router(),
    request = require('request'),
    cheerio = require('cheerio'),
//fs = require('fs'),
    config = require('../config'),
    path = require('path'),
    EbayCategory = require('../models/ebay-category'),
    _ = require('underscore');

router.get('/ebayCategories', function (req, res) {
    var url = 'https://api.ebay.com/wsapi?' +
            'callname=GetCategories' +
            '&siteid=0' +
            '&appid=Vladimir-4858-4e47-adb9-3c3ecf36c5d0' +
            'version=511&Routing=new',
        locale = 'en-US',
        parsing;

    /**
     * Returns promise that returns $ cheerio object with parsed response body in it
     * @param url
     * @returns {Promise}
     */

    function requestPromise(url) {
        return new Promise(function (resolve, reject) {
            var requestOptions = {
                url: url,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.99 Safari/537.36'
                },
                jar: j
            };
            request(requestOptions, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body));
                } else {
                    reject(error);
                }
            });
        });
    }

    parsing = new Promise(function (resolve, reject) {
        requestPromise(url)
            .then(function (json) {
                //should parse json to category: { id, subCategories }
                //when we get all second levels returned we should return array of categories
                Promise.all(secondLevelParses)
                    .then(function (categories) {
                        resolve(categories);
                    });
            })
            .catch(function (error) {
                reject(error);
            });
    });

    parsing
        .then(function (categories) {
            var addCat = function (category, parentItem) {
                    return new Promise(function (resolve, reject) {
                        EbayCategory
                            .findOne({
                                ebayId: category.id
                            })
                            .exec(function (err, foundCat) {
                                var addSubCats = function (parentItem) {
                                        var subPromises = [];
                                        if (category.subCategories) {
                                            category.subCategories.forEach(function (sub) {
                                                subPromises.push(addCat(sub, parentItem));
                                            });
                                        }
                                        Promise.all(subPromises).then(function (values) {
                                            parentItem.children = values;
                                            parentItem.save();
                                        });
                                    },
                                    newCat;
                                if (!foundCat) {
                                    //if we don't have this category we should add it
                                    newCat = new EbayCategory();
                                    newCat.ebayId = category.id;
                                    newCat.name = category.name;
                                    newCat.parent = parentItem ? parentItem._id : null;
                                    newCat.save(function (err, savedItem) {
                                        addSubCats(savedItem);
                                        resolve(savedItem);
                                    });
                                }
                                else {
                                    //if we have it we should check its children
                                    addSubCats(foundCat);
                                    resolve(foundCat);
                                }
                            });
                    });
                },
                promises = [];
            //need to save
            categories
                .forEach(function (category) {
                    promises.push(addCat(category));
                });

            Promise
                .all(promises)
                .then(function (categories) {
                    res.json({categories: categories});
                });
        })
        .catch(function (error) {
            res.json({error: error});
        });
});

module.exports = router;