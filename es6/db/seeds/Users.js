import faker from 'faker';

const users = [
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
  }, {
    id: 4,
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
    id: 5,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: 'password',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 6,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: 'password',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 7,
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

export default users;
