'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = [
// consultant 1
{
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 2
},

// facilitator 2
{
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 3
}, {
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 3
},

// fellow 3
{
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 4
}, {
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 4
}, {
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 4
}];

exports.default = users;