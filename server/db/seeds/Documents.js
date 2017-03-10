import faker from 'faker';

const validDocs = [
  {
    title: 'Youdoc guideline',
    content: 'This is a random content meant to fill up this space. Have you ever wondered...',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'agenda',
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'memo',
  },

  // consultant 1
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 2,
    type: 'note',
  },

  // facilitator 2
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 3,
    type: 'proposal',
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 3,
    type: 'agenda',
  },

  // fellow 3
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    type: 'memo',
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    type: 'note',
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    type: 'proposal',
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    type: 'agenda',
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    type: 'memo',
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    type: 'note',
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
    type: 'agenda',
  },
  {
    title: faker.company.catchPhrase(),
    content: '',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'memo',
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'memo',
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: '',
  }
];

export default {
  validDocs,
  invalidDocs
};
