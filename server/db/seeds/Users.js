import faker from 'faker';

const validUsers = [
  // admin user
  {
    id: 1,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'admin@youdoc.com',
    username: 'admin',
    password: 'password',
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // consultant 1
  {
    id: 2,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'uniqueuser@youdoc.com',
    username: 'uniqueuser',
    password: 'password',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // facilitator 2
  {
    id: 3,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: 'password',
    roleId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // fellow 3
  {
    id: 4,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: 'password',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 5,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: 'password',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const invalidUsers = [
  // null constraint
  {
    id: 6,
    firstName: '',
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: 'password',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // existing email
  {
    id: 6,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'admin@youdoc.com',
    username: faker.internet.userName(),
    password: 'password',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // existing username
  {
    id: 6,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: 'admin',
    password: 'password',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }

];

export default {
  validUsers,
  invalidUsers
};
