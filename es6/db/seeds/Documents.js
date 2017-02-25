import faker from 'faker';

const documents = [
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    ownerId: 1,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 1
  },

  // consultant 1
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    ownerId: 2,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 2
  },

  // facilitator 2
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    ownerId: 3,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 3
  }, {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    ownerId: 4,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 3
  }, {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    ownerId: 4,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 3
  },

  // fellow 3
  {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    ownerId: 5,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    ownerId: 5,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    ownerId: 6,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    ownerId: 6,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'private',
    ownerId: 7,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }, {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: 'role',
    ownerId: 7,
    typeId: Math.floor(Math.random() * 6),
    ownerRoleId: 4
  }
];

export default documents;
