'use strict';

var _chai = require('chai');

var _Index = require('../../models/Index');

var _Roles = require('../../db/seeds/Roles');

var _Roles2 = _interopRequireDefault(_Roles);

var _Users = require('../../db/seeds/Users');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('USER MODEL TEST', function () {
  // setup
  beforeEach(function () {
    return _Index.Roles.bulkCreate(_Roles2.default);
  });
  beforeEach(function () {
    return _Index.Users.bulkCreate(_Users2.default);
  });

  // teardown
  afterEach(function () {
    return _Index.Roles.sequelize.sync({ force: true });
  });
  afterEach(function () {
    return _Index.Users.destroy({ where: {} });
  });

  // validate user data
  describe('#Validate', function () {
    var nonUniqueUser = {
      id: 8,
      firstName: 'John',
      lastName: 'Doe',
      email: 'uniqueuser@youdoc.com',
      username: 'uniqueuser',
      password: 'password',
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    var nullDataUser = {
      id: 9,
      firstName: '',
      lastName: 'doe',
      email: 'johndoe@youdoc.com',
      username: 'johndoe',
      password: 'password',
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('1. Should not allow unique data violation', function () {
      _Index.Users.create(nonUniqueUser).then().catch(function (err) {
        (0, _chai.expect)(err.errors[0].type).to.equal('unique violation');
        (0, _chai.expect)(err.errors[0].message).to.equal('email must be unique');
      });
    });
    it('2. Should not allow null data persistence', function () {
      _Index.Users.create(nullDataUser).then().catch(function (err) {
        (0, _chai.expect)(err.errors[0].type).to.equal('Validation error');
        (0, _chai.expect)(err.errors[0].message).to.equal('Firstname must be alphabets only');
      });
    });
  });

  // Read user data
  describe('#Read', function () {
    it('1. When users are created, they should exist', function () {
      _Index.Users.findAll().then(function (allUsers) {
        (0, _chai.expect)(Array.isArray(allUsers)).to.be.true;
        (0, _chai.expect)(allUsers).to.have.length.above(0);
      });
    });
    it('2. Users should have valid details', function () {
      _Index.Users.findAll().then(function (allUsers) {
        var singleUser = void 0;
        allUsers.forEach(function (user) {
          singleUser = user;
          (0, _chai.expect)(singleUser.firstName).to.exist;
          (0, _chai.expect)(singleUser.lastName).to.exist;
          (0, _chai.expect)(singleUser.email).to.exist;
          (0, _chai.expect)(singleUser.username).to.exist;
          (0, _chai.expect)(singleUser.password).to.exist;
          (0, _chai.expect)(singleUser.roleId).to.exist;
        });
      });
    });
  });

  // update user data
  describe('#Update', function () {
    var userId = 2;
    var update = { firstName: 'Wilson' };
    it('1. Should allow user data update', function () {
      _Index.Users.findById(userId).then(function (user) {
        user.update(update).then(function (updatedUser) {
          (0, _chai.expect)(updatedUser.firstName).to.equal(update.firstName);
        });
      });
    });
    it('2. Should ensure that updated password is hashed', function () {
      update.password = 'newpassword';
      _Index.Users.findById(userId).then(function (user) {
        user.update(update).then(function (updatedUser) {
          (0, _chai.expect)(updatedUser.firstName).to.equal(update.firstName);
          (0, _chai.expect)(updatedUser.password).to.not.equal(update.password);
        });
      });
    });
  });

  // delete user data
  describe('#Delete', function () {
    it('1. Should delete user data given a user id', function () {
      var userId = 2;

      _Index.Roles.findById(userId).then(function (role) {
        role.destroy().then(function () {
          _Index.Roles.findById(userId).then().catch(function (err) {
            return (0, _chai.expect)(err.message).to.equal('relation "Users" does not exist');
          });
        });
      });
    });
  });
});