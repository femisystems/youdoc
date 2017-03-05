import faker from 'faker';

const validDocs = [
  {
    id: 1,
    title: 'welcome',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'agenda',
    ownerRole: 'admin'
  }, {
    id: 2,
    title: 'meeting',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'memo',
    ownerRole: 'admin'
  },

  // consultant 1
  {
    id: 3,
    title: 'my article',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'note',
    ownerRole: 'consultant'
  },

  // facilitator 2
  {
    id: 4,
    title: 'basic schedule',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 3,
    type: 'proposal',
    ownerRole: 'facilitator'
  }, {
    id: 5,
    title: 'simulations',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 3,
    type: 'agenda',
    ownerRole: 'facilitator'
  },

  // fellow 3
  {
    id: 6,
    title: 'baseball perks',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    type: 'memo',
    ownerRole: 'fellow'
  }, {
    id: 7,
    title: 'holiday island',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    type: 'note',
    ownerRole: 'fellow'
  }, {
    id: 8,
    title: 'expressions',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'role',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 4,
    type: 'proposal',
    ownerRole: 'fellow'
  }, {
    id: 9,
    title: 'project management',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    type: 'agenda',
    ownerRole: 'fellow'
  }, {
    id: 10,
    title: 'managing expectations',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    accessLevel: 'private',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 5,
    type: 'memo',
    ownerRole: 'fellow'
  }, {
    id: 11,
    title: 'weakest link',
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
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
    id: 14,
    title: '',
    content: faker.lorem.paragraph(),
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'agenda',
    ownerRole: 'admin'
  }, {
    id: 14,
    title: faker.company.catchPhrase(),
    content: '',
    accessLevel: 'public',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'memo',
    ownerRole: 'admin'
  }, {
    id: 14,
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    accessLevel: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 1,
    type: 'memo',
    ownerRole: 'admin'
  }, {
    id: 14,
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
