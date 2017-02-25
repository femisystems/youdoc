'use strict';

var _Types = require('../seeds/Types');

var _Types2 = _interopRequireDefault(_Types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Types', _Types2.default, {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Types', null, {});
  }
};