'use strict';

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      firstName: _faker2.default.name.firstName(),
      lastName: _faker2.default.name.lastName(),
      email: 'admin@youdoc.com',
      username: 'admin',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      roleId: 1
    }], {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};