module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      // admin user
      {
        id: 1,
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@youdoc.com',
        username: 'admin',
        password: 'password',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // consultant 1
      {
        id: 2,
        firstName: 'Celestine',
        lastName: 'Omin',
        email: 'celestine.omin@youdoc.com',
        username: 'cyberomin',
        password: 'password',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // facilitator 2
      {
        id: 3,
        firstName: 'Kesiena',
        lastName: 'Akpobome',
        email: 'kes@youdoc.com',
        username: 'kes',
        password: 'password',
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // fellow 3
      {
        id: 4,
        firstName: 'Shalom',
        lastName: 'Ayidu',
        email: 'shalom.ayidu@youdoc.com',
        username: 'shalom',
        password: 'password',
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 5,
        firstName: 'Murphy',
        lastName: 'Enaho',
        email: 'enaho.murphy@youdoc.com',
        username: 'murphy',
        password: 'password',
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { individualHooks: true });
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
