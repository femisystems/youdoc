import faker from 'faker';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'admin@youdoc.com',
        username: 'admin',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1
      }
    ], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
