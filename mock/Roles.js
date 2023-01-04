const validRoles = [
  {
    title: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'consultant',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'facilitator',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'fellow',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'regular',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const invalidRoles = [
  // unique constraint
  {
    title: 'admin',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // null constraint
  {
    title: '',
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

export default {
  validRoles,
  invalidRoles
};
