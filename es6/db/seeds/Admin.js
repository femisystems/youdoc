import faker from 'faker';

const admin = [
  // admin 1
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: 'admin',
    password: 'password',
    roleId: 1
  },
];

export default admin;
