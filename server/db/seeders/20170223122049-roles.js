'use strict';

var _Role = require('../seeds/Role');

var _Role2 = _interopRequireDefault(_Role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Roles', _Role2.default, {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};