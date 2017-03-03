const validTypes = [
  {
    id: 1,
    title: 'agenda',
    ownerId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 2,
    title: 'memo',
    ownerId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 3,
    title: 'note',
    ownerId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 4,
    title: 'proposal',
    ownerId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    id: 5,
    title: 'report',
    ownerId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const invalidTypes = [
  // unique constraint
  {
    id: 7,
    title: 'agenda',
    ownerId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // null constraint
  {
    id: 7,
    title: '',
    ownerId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default {
  validTypes,
  invalidTypes
};
