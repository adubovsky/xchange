require('../helpers/api.helper.js');
require('../models/brand.model.js');
require('../models/category.model.js');
require('../models/item.model.js');
require('../models/model.model.js');
require('../models/trade.model.js');
require('../models/user.model.js');
require('../models/wish.model.js');

describe('Models', function () {

    beforeEach(angular.mock.module('xchangeApp'));

    var $controller, Item, $scope, Brand, Category, Model, Trade, User, Wish;

    beforeEach(angular.mock.inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
    }));

    describe('Item', function () {
        beforeEach(angular.mock.inject(function (_Item_) {
            Item = _Item_;
        }));

        it('should works', function () {
            var item = new Item();
            expect(item).to.be.an('object');
        });

        it('should be valid', function () {
            var item = new Item();

            item.title = 'Mug';
            expect(item.isValid()).to.be.false;

            item.description = 'Cool mug';
            expect(item.isValid()).to.be.false;

            item.photoUrl = 'H!GG#JH!G#H#H!';
            expect(item.isValid()).to.be.false;

            item.price = 20;
            expect(item.isValid()).to.be.true;
        });
    });

    describe('Brand', function () {
        beforeEach(angular.mock.inject(function (_Brand_) {
            Brand = _Brand_;
        }));

        it('should works', function () {
            var brand = new Brand();
            expect(brand).to.be.an('object');
        });
    });

    describe('Category', function () {
        beforeEach(angular.mock.inject(function (_Category_) {
            Category = _Category_;
        }));

        it('should works', function () {
            var category = new Category();
            expect(category).to.be.an('object');
        });
    });

    describe('Model', function () {
        beforeEach(angular.mock.inject(function (_Model_) {
            Model = _Model_;
        }));

        it('should works', function () {
            var model = new Model();
            expect(model).to.be.an('object');
        });
    });

    describe('Trade', function () {
        beforeEach(angular.mock.inject(function (_Trade_) {
            Trade = _Trade_;
        }));

        it('should works', function () {
            var trade = new Trade();
            expect(trade).to.be.an('object');
        });
    });

    describe('User', function () {
        beforeEach(angular.mock.inject(function (_User_) {
            User = _User_;
        }));

        it('should works', function () {
            var user = new User();
            expect(user).to.be.an('object');
        });
    });

    describe('Wish', function () {
        beforeEach(angular.mock.inject(function (_Wish_) {
            Wish = _Wish_;
        }));

        it('should works', function () {
            var wish = new Wish();
            expect(wish).to.be.an('object');
        });
    });
});