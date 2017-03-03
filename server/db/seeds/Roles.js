const validRoles = [
  {
    id: 1,
    title: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: 'consultant',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: 'facilitator',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 4,
    title: 'fellow',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const invalidRoles = [
  // unique constraint
  {
    id: 6,
    title: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // null constraint
  {
    id: 6,
    title: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

export default {
  validRoles,
  invalidRoles
};
