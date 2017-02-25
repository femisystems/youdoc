'use strict';

var _Users = require('../seeds/Users');

var _Users2 = _interopRequireDefault(_Users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Users', _Users2.default, {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};