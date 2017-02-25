import types from '../seeds/Types';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Types', types, {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Types', null, {});
  }
};
