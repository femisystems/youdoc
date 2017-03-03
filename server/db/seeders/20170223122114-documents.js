module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [
      {
        id: 1,
        title: 'welcome',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 1,
        typeId: 1,
        ownerRoleId: 1
      }, {
        id: 2,
        title: 'meeting',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 1,
        typeId: 2,
        ownerRoleId: 1
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
        typeId: 3,
        ownerRoleId: 2
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
        typeId: 4,
        ownerRoleId: 3
      }, {
        id: 5,
        title: 'simulations',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'role',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 4,
        typeId: 1,
        ownerRoleId: 3
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
        typeId: 2,
        ownerRoleId: 4
      }, {
        id: 7,
        title: 'holiday island',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 4,
        typeId: 3,
        ownerRoleId: 4
      }, {
        id: 8,
        title: 'expressions',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'role',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 4,
        typeId: 4,
        ownerRoleId: 4
      }, {
        id: 9,
        title: 'project management',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 5,
        typeId: 1,
        ownerRoleId: 4
      }, {
        id: 10,
        title: 'managing expectations',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'private',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 5,
        typeId: 2,
        ownerRoleId: 4
      }, {
        id: 11,
        title: 'weakest link',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'role',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 5,
        typeId: 3,
        ownerRoleId: 4
      }
    ], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
