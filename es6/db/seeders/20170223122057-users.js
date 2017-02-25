import users from '../seeds/Users';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', users, {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
