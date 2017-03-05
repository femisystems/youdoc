const bcrypt = require('bcrypt-node');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      // admin user
      {
        id: 1,
        firstName: 'Default',
        lastName: 'User',
        email: 'admin@youdoc.com',
        username: 'admin',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
        role: 'admin',
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
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
        role: 'consultant',
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
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
        role: 'facilitator',
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
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
        role: 'fellow',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        id: 5,
        firstName: 'Murphy',
        lastName: 'Enaho',
        email: 'enaho.murphy@youdoc.com',
        username: 'murphy',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
        role: 'fellow',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { individualHooks: true });
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
