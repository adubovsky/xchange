require('./user.model.js');
require('../main/model.factory.js');

describe('Users:', function () {

    beforeEach(angular.mock.module('xchangeApp'));

    var $controller, User, $scope, tbt;

    beforeEach(angular.mock.inject(function (_$controller_, _$rootScope_, _User_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        User = _User_;
    }));

    describe('User Factory', function () {
        it('should clears fields', function () {
            var currentUser = new User();

            currentUser.setLogged(true);
            expect(currentUser.isLogged).to.be.true;

            currentUser.set({
                name: 'Vladimir',
                role: 'admin'
            });
            expect(currentUser.name).to.equal('Vladimir');
            expect(currentUser.isAdmin()).to.be.true;

            currentUser.clearFields();
            expect(currentUser.name).is.empty;
            expect(currentUser.isAdmin()).to.be.false;
        });
    });
});