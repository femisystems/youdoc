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
  id: 2,
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: 'uniqueuser@youdoc.com',
  username: 'uniqueuser',
  password: 'password',
  roleId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},

// facilitator 2
{
  id: 3,
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 4,
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},

// fellow 3
{
  id: 5,
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 6,
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 7,
  firstName: _faker2.default.name.firstName(),
  lastName: _faker2.default.name.lastName(),
  email: _faker2.default.internet.email(),
  username: _faker2.default.internet.userName(),
  password: 'password',
  roleId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
}];

exports.default = users;