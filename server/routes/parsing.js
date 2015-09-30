'use strict';
/**
 * Parsing
 */
var express = require('express'),
    router = express.Router(),
    request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    config = require('../config'),
    path = require('path');

router.get('/ebayCategories', function (req, res) {
    var j = request.jar(),
        url = 'http://www.ebay.com/sch/allcategories/all-categories',
        locale = 'en-US',
        parsing;

    parsing = new Promise(function (resolve, reject) {
        j.setCookie(request.cookie('dp1=bidm/1560d0012^u1p/QEBfX0BAX19AQA**57ece350^bl/BY'+locale+'59ce16d0^pbf/#04000000000000000000000059ce16d4^cq/0^'), url);
        request({
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.99 Safari/537.36'
            },
            jar: j
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body);
                var categories = [];
                $('a.clh').each(function (index, item) {
                    var $item = $(item);
                    var category = {
                        id: $item.attr('href'),
                        name: $item.text(),
                        subCategories: []
                    };

                    var $nextUl = $item.next(),
                        subItemIterate = function (i, subitem) {
                            var $subitem = $(subitem);
                            category.subCategories.push({
                                id: $subitem.attr('href'),
                                name: $subitem.text()
                            });
                        };
                    while ($nextUl.is('ul')) {
                        $nextUl.find('a').each(subItemIterate);
                        $nextUl = $nextUl.next();
                    }

                    categories.push(category);
                });

                resolve(categories);
            } else {
                reject(error);
            }
        });
    });


    parsing
        .then(function (categories) {
            //need to save
            res.json({categories: categories});
            fs.writeFile(path.join(config.parsedResources,"ebayCategories.json"), JSON.stringify({categories: categories}), function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        })
        .catch(function (error) {
            res.json({error: error});
        });
});

module.exports = router;