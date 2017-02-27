'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documents = [{
  id: 1,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 1,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 1
},

// consultant 1
{
  id: 2,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 2,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 2
},

// facilitator 2
{
  id: 3,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 3,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 3
}, {
  id: 4,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'role',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 4,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 3
}, {
  id: 5,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'private',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 4,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 3
},

// fellow 3
{
  id: 6,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 5,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  id: 7,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'private',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 5,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  id: 8,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'role',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 6,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  id: 9,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 6,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  id: 10,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'private',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 7,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  id: 11,
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'role',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 7,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}];

exports.default = documents;