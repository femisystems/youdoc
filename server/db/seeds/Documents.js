'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documents = [{
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  ownerId: 1,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 1
},

// consultant 1
{
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  ownerId: 2,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 2
},

// facilitator 2
{
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  ownerId: 3,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 3
}, {
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'role',
  ownerId: 4,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 3
}, {
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'private',
  ownerId: 4,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 3
},

// fellow 3
{
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  ownerId: 5,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'private',
  ownerId: 5,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'role',
  ownerId: 6,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'public',
  ownerId: 6,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'private',
  ownerId: 7,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}, {
  title: _faker2.default.company.catchPhrase(),
  content: _faker2.default.lorem.paragraph(),
  accessLevel: 'role',
  ownerId: 7,
  typeId: Math.floor(Math.random() * 6),
  ownerRoleId: 4
}];

exports.default = documents;