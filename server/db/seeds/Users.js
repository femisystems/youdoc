import faker from 'faker';

const validUsers = [
  // admin user
  {
    id: 1,
    firstName: 'Default',
    lastName: 'User',
    email: 'admin@youdoc.com',
    username: 'admin',
    password: 'password',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // consultant 1
  {
    id: 2,
    firstName: 'Celestine',
    lastName: 'Omin',
    email: 'celestine.omin@youdoc.com',
    username: 'cyberomin',
    password: 'password',
    role: 'consultant',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // facilitator 2
  {
    id: 3,
    firstName: 'Kesiena',
    lastName: 'Akpobome',
    email: 'kes@youdoc.com',
    username: 'kes',
    password: 'password',
    role: 'facilitator',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // fellow 3
  {
    id: 4,
    firstName: 'Shalom',
    lastName: 'Ayidu',
    email: 'shalom.ayidu@youdoc.com',
    username: 'shalom',
    password: 'password',
    role: 'fellow',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 5,
    firstName: 'Murphy',
    lastName: 'Enaho',
    email: 'enaho.murphy@youdoc.com',
    username: 'murphy',
    password: 'password',
    role: 'fellow',
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
    role: 'fellow',
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
    role: 'fellow',
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
    role: 'fellow',
    createdAt: new Date(),
    updatedAt: new Date()
  }

];

export default {
  validUsers,
  invalidUsers
};
