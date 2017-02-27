'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _chai = require('chai');

var _Index = require('../../models/Index');

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

var _Roles = require('../../db/seeds/Roles');

var _Roles2 = _interopRequireDefault(_Roles);

var _Admin = require('../../db/seeds/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _supertest2.default)(_app2.default);

before(function () {
  _Index.Roles.create(_Roles2.default[0]).then(function () {
    _Index.Users.create(_Admin2.default);
  }).then(function () {
    _supertest2.default.post('/users/login').send(_Admin2.default).end(function (err, res) {
      console.log(res);
    });
  });
});