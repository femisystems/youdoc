import documents from '../seeds/Documents';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', documents, {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
