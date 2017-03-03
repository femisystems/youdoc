module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Types', [
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
    ], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Types', null, {});
  }
};
