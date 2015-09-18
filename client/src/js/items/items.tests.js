require('../users/user.factory.js');
require('../main/model.factory.js');
require('./item.factory.js');
require('./add.ctrl.js');

describe('Items', function() {

    beforeEach(angular.mock.module('xchangeApp'));

    var $controller, Item, $scope;

    beforeEach(angular.mock.inject(function(_$controller_,_$rootScope_,_Item_){
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        Item = _Item_;
    }));

    describe('Item Factory', function() {
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
});