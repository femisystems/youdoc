module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Documents', [
      {
        title: 'welcome',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'public',
        ownerId: 1,
        type: 'agenda',
        ownerRole: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'meeting',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'private',
        ownerId: 1,
        type: 'memo',
        ownerRole: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // consultant 1
      {
        title: 'my article',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'public',
        ownerId: 2,
        type: 'note',
        ownerRole: 'consultant',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // facilitator 2
      {
        title: 'basic schedule',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'private',
        ownerId: 3,
        type: 'proposal',
        ownerRole: 'facilitator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'simulations',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'role',
        ownerId: 3,
        type: 'agenda',
        ownerRole: 'facilitator',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // fellow 3
      {
        title: 'baseball perks',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'public',
        ownerId: 4,
        type: 'memo',
        ownerRole: 'fellow',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'holiday island',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'private',
        ownerId: 4,
        type: 'note',
        ownerRole: 'fellow',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'expressions',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'role',
        ownerId: 4,
        type: 'proposal',
        ownerRole: 'fellow',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'project management',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'public',
        ownerId: 5,
        type: 'agenda',
        ownerRole: 'fellow',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'managing expectations',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'private',
        ownerId: 5,
        type: 'memo',
        ownerRole: 'fellow',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'weakest link',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        accessLevel: 'role',
        ownerId: 5,
        type: 'note',
        ownerRole: 'fellow',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
