import faker from 'faker';

const validDocs = [
  {
    id: 1,
    title: 'welcome',
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 1,
    ownerRoleId: 1
  }, {
    id: 2,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 2,
    ownerRoleId: 1
  },

  // consultant 1
  {
    id: 3,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 3,
    ownerRoleId: 2
  },

  // facilitator 2
  {
    id: 4,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 3,
    typeId: 4,
    ownerRoleId: 3
  }, {
    id: 5,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    typeId: 1,
    ownerRoleId: 3
  },

  // fellow 3
  {
    id: 6,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    typeId: 2,
    ownerRoleId: 4
  }, {
    id: 7,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    typeId: 3,
    ownerRoleId: 4
  }, {
    id: 8,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    typeId: 4,
    ownerRoleId: 4
  }, {
    id: 9,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    typeId: 1,
    ownerRoleId: 4
  }, {
    id: 10,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    typeId: 2,
    ownerRoleId: 4
  }, {
    id: 11,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    typeId: 3,
    ownerRoleId: 4
  }
];

const invalidDocs = [
  {
    id: 14,
    title: '',
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 1,
    ownerRoleId: 1
  }, {
    id: 14,
    title: faker.company.catchPhrase(),
    content: '',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 2,
    ownerRoleId: 1
  }, {
    id: 14,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 2,
    ownerRoleId: 1
  }, {
    id: 14,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: null,
    ownerRoleId: 1
  }
];

export default {
  validDocs,
  invalidDocs
};
