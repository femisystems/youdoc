const validTypes = [
  {
    title: 'agenda',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'memo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'note',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'proposal',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'report',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const invalidTypes = [
  // unique constraint
  {
    title: 'agenda',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // null constraint
  {
    title: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default {
  validTypes,
  invalidTypes
};
