const bcrypt = require('bcrypt-node');

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      // admin user
      {
        firstName: 'Default',
        lastName: 'User',
        email: 'admin@youdoc.com',
        username: 'admin',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // consultant 1
      {
        firstName: 'Celestine',
        lastName: 'Omin',
        email: 'celestine.omin@youdoc.com',
        username: 'cyberomin',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // facilitator 2
      {
        firstName: 'Kesiena',
        lastName: 'Akpobome',
        email: 'kes@youdoc.com',
        username: 'kes',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // fellow 3
      {
        firstName: 'Shalom',
        lastName: 'Ayidu',
        email: 'shalom.ayidu@youdoc.com',
        username: 'shalom',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Murphy',
        lastName: 'Enaho',
        email: 'enaho.murphy@youdoc.com',
        username: 'murphy',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync()),
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
