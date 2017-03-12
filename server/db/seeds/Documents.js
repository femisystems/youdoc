import faker from 'faker';

const validDocs = [
  {
    title: 'Youdoc guideline',
    content: 'This is a random content meant to fill up this space. Have you ever wondered...',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 1,
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 2,
  },

  // consultant 1
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 2,
    typeId: 3,
  },

  // facilitator 2
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 3,
    typeId: 4,
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 3,
    typeId: 1,
  },

  // fellow 3
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    typeId: 2,
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    typeId: 3,
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    typeId: 4,
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    typeId: 1,
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    typeId: 2,
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    typeId: 3,
  }
];

const invalidDocs = [
  {
    title: '',
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 1,
  },
  {
    title: faker.company.catchPhrase(),
    content: '',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 2,
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: 2,
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: '',
  }
];

export default {
  validDocs,
  invalidDocs
};
