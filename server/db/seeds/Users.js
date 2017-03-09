import faker from 'faker';

const validUsers = [
  // admin user
  {
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@youdoc.com',
    username: 'admin',
    password: 'password',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // consultant 1
  {
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
    firstName: 'Shalom',
    lastName: 'Ayidu',
    email: 'shalom.ayidu@youdoc.com',
    username: 'shalom',
    password: 'password',
    role: 'fellow',
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
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
