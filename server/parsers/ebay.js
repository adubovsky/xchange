'use strict';
/**
 * Parsing. Just for learning, should use ebay api for that.
 */
var request = require('request'),
    cheerio = require('cheerio'),
    config = require('../config'),
    path = require('path'),
    Category = require('../models/category'),
    _ = require('underscore');

(function parseEbayCategories() {
    const REQUESTS_LIMIT = 5;
    var j = request.jar(),
        url = 'http://www.ebay.com/sch/allcategories/all-categories',
        locale = 'en-US',
        requestOptions,
        parsing,
        requestQueue = [],
        requestsInProgress = false,
        requestQueueTimer;

    /**
     * Returns promise that returns $ cheerio object with parsed response body in it
     * @param url
     * @returns {Promise}
     */
    function requestPromise(url) {
        return new Promise(function (resolve, reject) {
            var setRequestTimeout = function () {
                    if (requestQueue.length) {
                        return setTimeout(function () {
                            requestFunction(requestQueue.shift());
                        }, 100);
                    }
                },
                requestFunction;
            j.setCookie(request.cookie('dp1=bidm/1560d0012^u1p/QEBfX0BAX19AQA**57ece350^bl/BY' + locale + '59ce16d0^pbf/#04000000000000000000000059ce16d4^cq/0^'), url);
            requestOptions = {
                url: url,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.99 Safari/537.36'
                },
                jar: j
            };

            requestFunction = function (requestOptions) {
                if (requestsInProgress >= REQUESTS_LIMIT) {
                    requestQueue.push(requestOptions);
                }
                else {
                    requestsInProgress++;
                    request(requestOptions, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            resolve(cheerio.load(body));
                        }
                        requestsInProgress--;
                        if (error) {
                            reject(error);
                        }
                    });
                }
                clearTimeout(requestQueueTimer);
                requestQueueTimer = setRequestTimeout();
                console.log( requestQueue.length );
            };

            requestFunction(requestOptions);
        });
    }

    parsing = new Promise(function (resolve, reject) {
        requestPromise(url)
            .then(function ($) {
                var secondLevelParses = [],
                //checking other levels of subcategories
                    checkForSubCategories = function (category) {
                        return requestPromise(category.id)
                            .then(function ($) {
                                //if category has subCategories then we parsed them and return to category above
                                var $links = $('.cat-link a'),
                                    newSubPromises = [];
                                if ($links.length) {
                                    $links.each(function (index, link) {
                                        var $link = $(link),
                                            newSubItem = {
                                                id: $link.attr('href'),
                                                name: $link.text()
                                            };
                                        newSubPromises.push(checkForSubCategories(newSubItem)
                                            .then(function (items) {
                                                newSubItem.subCategories = items;
                                                return newSubItem;
                                            }));
                                    });
                                    return Promise.all(newSubPromises);
                                } else {
                                    return [];
                                }
                            })
                            .then(function (subCategories) {
                                category.subCategories = subCategories;
                                return category;
                            });
                    };
                //parse categories first level
                $('a.clh').each(function (index, item) {
                    var $item = $(item),
                        category = {
                            id: $item.attr('href'),
                            name: $item.text(),
                            subCategories: []
                        },
                        $nextUl = $item.next(),
                        secondLevelParse = function (subitem) {
                            var $subitem = $(subitem),
                                newSubCategory = {
                                    id: $subitem.attr('href'),
                                    name: $subitem.text()
                                };
                            return checkForSubCategories(newSubCategory)
                                .then(function (items) {
                                    newSubCategory.subCategories = items;
                                    category.subCategories.push(newSubCategory);
                                    return category;
                                });
                        },
                        iterate = function (i, subitem) {
                            //returns promise that returns category with all subCategories parsed
                            secondLevelParses.push(secondLevelParse(subitem));
                        };
                    //parse second level of categories
                    while ($nextUl.is('ul')) {
                        $nextUl.find('a').each(iterate);
                        $nextUl = $nextUl.next();
                    }
                });

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
                        Category
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
                                    newCat = new Category();
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
                .then(function (values) {
                    console.log(values.length);
                    //res.json({categories: categories});
                });
        })
        .catch(function (error) {
            console.log({error: error});
        });
})();