'use strict';

var _chai = require('chai');

var _Index = require('../../models/Index');

var _Roles = require('../../db/seeds/Roles');

var _Roles2 = _interopRequireDefault(_Roles);

var _Admin = require('../../db/seeds/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _Types = require('../../db/seeds/Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TYPE MODEL TEST', function () {
  before(function () {
    return _Index.Roles.bulkCreate(_Roles2.default);
  });
  before(function () {
    return _Index.Users.create(_Admin2.default);
  });
  before(function () {
    return _Index.Types.bulkCreate(_Types2.default);
  });

  after(function () {
    return _Index.Roles.sequelize.sync({ force: true });
  });
  after(function () {
    return _Index.Users.sequelize.sync({ force: true });
  });
  after(function () {
    return _Index.Types.sequelize.sync({ force: true });
  });

  describe('#Create', function () {
    var typeOne = _Index.Types.build({
      id: 6,
      title: 'agenda',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    var typeTwo = {
      id: 7,
      title: '',
      ownerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    it('1. Should not allow duplication of record', function () {
      typeOne.save().then().catch(function (err) {
        (0, _chai.expect)(err.errors[0].type).to.equal('unique violation');
        (0, _chai.expect)(err.errors[0].message).to.equal('title must be unique');
      });
    });
    it('2. Should not allow null data persistence', function () {
      _Index.Types.create(typeTwo).then().catch(function (err) {
        (0, _chai.expect)(err.errors[0].type).to.equal('notNull Violation');
        (0, _chai.expect)(err.errors[0].message).to.equal('title cannot be null');
      });
    });
  });

  describe('#Read', function () {
    it('1. Type should exist with a property title', function () {
      _Index.Types.findAll().then(function (type) {
        (0, _chai.expect)(type).to.have.length.above(1);
        (0, _chai.expect)(type[0]).to.have.property('title');
      });
    });
  });

  describe('#Update', function () {
    it('1. Should be able to update type title', function () {
      var typeId = 1;
      var update = { title: 'my agenda' };

      _Index.Types.findById(typeId).then(function (agenda) {
        agenda.update(update).then(function (updatedType) {
          return (0, _chai.expect)(updatedType.title).to.equal(update.title);
        });
      });
    });
  });

  describe('#Delete', function () {
    it('1. Should be able to delete type', function () {
      var typeId = 1;

      _Index.Types.findById(typeId).then(function (type) {
        type.destroy().then(function () {
          _Index.Types.findById(typeId).then().catch(function (err) {
            return (0, _chai.expect)(err.message).to.equal('relation "Types" does not exist');
          });
        });
      });
    });
  });
});