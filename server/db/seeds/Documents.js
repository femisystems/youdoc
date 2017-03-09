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
    ownerRole: 'admin'
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'memo',
    ownerRole: 'admin'
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
    ownerRole: 'consultant'
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
    ownerRole: 'facilitator'
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 3,
    type: 'agenda',
    ownerRole: 'facilitator'
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
    ownerRole: 'fellow'
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    type: 'note',
    ownerRole: 'fellow'
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    type: 'proposal',
    ownerRole: 'fellow'
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    type: 'agenda',
    ownerRole: 'fellow'
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    type: 'memo',
    ownerRole: 'fellow'
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    type: 'note',
    ownerRole: 'fellow'
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
    ownerRole: 'admin'
  },
  {
    title: faker.company.catchPhrase(),
    content: '',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'memo',
    ownerRole: 'admin'
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'memo',
    ownerRole: 'admin'
  },
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: '',
    ownerRole: 'admin'
  }
];

export default {
  validDocs,
  invalidDocs
};
