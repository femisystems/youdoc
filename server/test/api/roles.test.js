'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _Index = require('../../models/Index');

var _server = require('../../server');

var _server2 = _interopRequireDefault(_server);

var _Roles = require('../../db/seeds/Roles');

var _Roles2 = _interopRequireDefault(_Roles);

var _Admin = require('../../db/seeds/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = (0, _supertest2.default)(_server2.default);
var token = void 0;

describe('ROLES API', function () {
  before(function (done) {
    _Index.Roles.create(_Roles2.default[0]).then(function (role) {
      console.log('role is:', role.dataValues.title);
      request.post('/users').send(_Admin2.default).end(function (err, res) {
        if (!err) {
          token = res.body.data.credential.token;
        }
        done();
      });
    });
  });

  after(function () {
    return _Index.Users.sequelize.sync({ force: true });
  });

  describe('#Post', function () {
    it('1. Should allow admin user to create role', function (done) {
      request.post('/roles').set('authorization', token).send(_Roles2.default[2]).end(function (err, res) {
        console.log(res.body);
        (0, _chai.expect)(res.success).to.be.true;
        (0, _chai.expect)(res.msg).to.equal('role(s) successfully created.');
        done();
      });
    });
  });
});