'use strict';

var _chai = require('chai');

var _Index = require('../../models/Index');

var _Roles = require('../../db/seeds/Roles');

var _Roles2 = _interopRequireDefault(_Roles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ROLE MODEL TEST', function () {
  // setup
  beforeEach(function () {
    return _Index.Roles.bulkCreate(_Roles2.default);
  });

  // teardown
  afterEach(function () {
    return _Index.Roles.sequelize.sync({ force: true });
  });

  // read a role
  describe('#Read', function () {
    it('1. Admin role was successfully created', function () {
      _Index.Roles.findOne({ title: 'admin' }).then(function (role) {
        return (0, _chai.expect)(role.id).to.equal(1);
      });
    });
    it('2. Other roles(consultant, facilitator, fellow) were successfully created', function () {
      _Index.Roles.findAll().then(function (allRoles) {
        (0, _chai.expect)(allRoles.length).to.equal(4);
        (0, _chai.expect)(allRoles[1].title).to.equal('consultant');
        (0, _chai.expect)(allRoles[2].title).to.equal('facilitator');
        (0, _chai.expect)(allRoles[3].title).to.equal('fellow');
      });
    });
  });

  // validate create role input
  describe('#Validate', function () {
    it('1. Should not recreate an existing role', function () {
      var role5 = {
        id: 5,
        title: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      _Index.Roles.create(role5).then(function (role) {
        return (0, _chai.expect)(role).to.not.exist;
      }).catch(function (err) {
        (0, _chai.expect)(err.errors[0].type).to.equal('unique violation');
        (0, _chai.expect)(err.errors[0].message).to.equal('title must be unique');
      });
    });
    it('2. Should not create a role with null data', function () {
      var role6 = {};

      _Index.Roles.create(role6).then(function (role) {
        return (0, _chai.expect)(role).to.not.exist;
      }).catch(function (err) {
        (0, _chai.expect)(err.message).to.equal('notNull Violation: title cannot be null');
      });
    });
    it('3. Should not create a role with wrong data type', function () {
      var role7 = {
        id: 7,
        title: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      _Index.Roles.create(role7).then().catch(function (err) {
        (0, _chai.expect)(err.message).to.equal('notNull Violation: title cannot be null');
      });
    });
  });

  // update role
  describe('#Update', function () {
    it('1. Should update role by id', function () {
      var adminRoleId = 1;
      var update = { title: 'superAdmin' };

      _Index.Roles.findById(adminRoleId).then(function (role) {
        role.update(update).then(function (updatedRole) {
          return (0, _chai.expect)(updatedRole.dataValues.title).to.equal('superAdmin');
        });
      });
    });
  });

  // delete role
  describe('#Delete', function () {
    it('1. Should delete role by id', function () {
      var consultantRoleId = 2;

      _Index.Roles.findById(consultantRoleId).then(function (role) {
        role.destroy().then(function () {
          _Index.Roles.findById(consultantRoleId).then().catch(function (err) {
            return (0, _chai.expect)(err.message).to.equal('relation "Roles" does not exist');
          });
        });
      });
    });
  });
});