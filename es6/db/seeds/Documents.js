import faker from 'faker';

const documents = [
  {
    id: 1,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 1
  },

  // consultant 1
  {
    id: 2,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 2,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 2
  },

  // facilitator 2
  {
    id: 3,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 3,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 3
  }, {
    id: 4,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 3
  }, {
    id: 5,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    typeId: Math.floor(Math.random() * 6),
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
    ownerId: 5,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    id: 7,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    id: 8,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 6,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    id: 9,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 6,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    id: 10,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 7,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    id: 11,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 7,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }
];

export default documents;
