'use strict';

var _chai = require('chai');

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _Index = require('../../models/Index');

var _Roles = require('../../db/seeds/Roles');

var _Roles2 = _interopRequireDefault(_Roles);

var _Admin = require('../../db/seeds/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _Users = require('../../db/seeds/Users');

var _Users2 = _interopRequireDefault(_Users);

var _Types = require('../../db/seeds/Types');

var _Types2 = _interopRequireDefault(_Types);

var _Documents = require('../../db/seeds/Documents');

var _Documents2 = _interopRequireDefault(_Documents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DOCUMENT MODEL TEST', function () {
  before(function () {
    return _Index.Roles.bulkCreate(_Roles2.default);
  });
  before(function () {
    return _Index.Users.create(_Admin2.default);
  });
  before(function () {
    return _Index.Users.bulkCreate(_Users2.default, { individualHooks: true });
  });
  var userPromise = new Promise(function (resolve, reject) {
    _Index.Types.bulkCreate(_Types2.default).then(function () {
      return resolve();
    }).catch(function () {
      return reject();
    });
  });
  userPromise.then(function () {
    return _Index.Documents.bulkCreate(_Documents2.default).then(function () {
      return console.log('docs created');
    });
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
  after(function () {
    return _Index.Documents.sequelize.sync({ force: true });
  });

  describe('#Create', function () {
    var dummyDoc = {
      id: 12,
      title: '',
      content: _faker2.default.lorem.paragraph(),
      accessLevel: 'public',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 2,
      typeId: 1,
      ownerRoleId: 2
    };

    it('1. Should not allow null data persistence', function () {
      _Index.Documents.create(dummyDoc).then().catch(function (err) {
        (0, _chai.expect)(err.message).to.equal('Validation error: Document title should be 1 to 32 characters long.');
      });
    });
    it('2. ', function () {
      var docId = 1;

      _Index.Documents.findById(docId).then(function (doc) {
        return console.log(doc);
      });
    });
  });

  xdescribe('#Read', function () {
    it('1. Documents should exist with a properties: title, content', function () {
      _Index.Documents.findAll({}).then(function (docs) {
        // console.log('documents are: ', docs);
        // expect(documents).to.have.length.above(1);
        // expect(docs[0]).to.have.property('title');
        // expect(documents[0]).to.have.property('content');
      });
    });
  });

  xdescribe('#Update', function () {
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

  xdescribe('#Delete', function () {
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