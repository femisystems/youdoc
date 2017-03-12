module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [
      {
        title: 'welcome',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'public',
        ownerId: 1,
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'meeting',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'private',
        ownerId: 1,
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // consultant 1
      {
        title: 'my article',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'public',
        ownerId: 2,
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // facilitator 2
      {
        title: 'basic schedule',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'private',
        ownerId: 3,
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'simulations',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'role',
        ownerId: 3,
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // fellow 3
      {
        title: 'baseball perks',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'public',
        ownerId: 4,
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'holiday island',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'private',
        ownerId: 4,
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'expressions',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'role',
        ownerId: 4,
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'project management',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'public',
        ownerId: 5,
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'managing expectations',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'private',
        ownerId: 5,
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'weakest link',
        content: 'Lorem Ipsum is simply dummy text of the printing and typeIdsetting industry',
        accessLevel: 'role',
        ownerId: 5,
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
