"use strict";
class Tag {
    /**
     * @param type may be 'model', 'brand' or 'category'
     * @param instance may be Model, Brand or Category object
     */
    constructor(type, instance) {
        this.type = type;
        this._id = instance._id;
        this.tag = this.getTag(type, instance);
        this.parents = this.getParents(type, instance);
    }

    getTag(type, instance) {
        return instance.name;
    }

    getParents(type, instance) {
        var parents = {
            category: type === 'category' ? instance.parent : instance.categoryId,
            subCategory: instance.subCategoryId,
            brand: instance.brandId
        };
        return parents;
    }
}

module.exports = Tag;