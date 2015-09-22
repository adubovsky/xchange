"use strict";
var Tag = require('../models/tag');
class Tags extends Map{
    constructor(){
        super();
        this.index = 0;
    }
    add(type, tags){
        var map = this;
        if(typeof tags.length !== 'undefined') {
            tags.forEach(function (tag) {
                map.set(map.index++, new Tag(type, tag));
            });
        }
        else {
            map.set(map.index++, new Tag(type, tags));
        }
    }
    getAll(){
        var all = [];
        this.forEach(function (item) {
            all.push(item);
        });

        return all;
    }
}

module.exports = Tags;