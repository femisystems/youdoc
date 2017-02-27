'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var admin = {
  id: 1,
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: 'admin',
  password: 'password',
  roleId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};

exports.default = admin;