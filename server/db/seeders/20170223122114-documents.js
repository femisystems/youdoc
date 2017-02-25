'use strict';

var _Documents = require('../seeds/Documents');

var _Documents2 = _interopRequireDefault(_Documents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Documents', _Documents2.default, {});
  },
  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Documents', null, {});
  }
};