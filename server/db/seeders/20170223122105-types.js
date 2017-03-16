module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Types', [
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
    ], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Types', null, {});
  }
};
