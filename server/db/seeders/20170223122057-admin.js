'use strict';

var _Admin = require('../seeds/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Users', _Admin2.default, {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};