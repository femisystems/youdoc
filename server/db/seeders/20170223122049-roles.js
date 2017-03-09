module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Roles', [
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
    ], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
