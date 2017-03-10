module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      role: {
        type: Sequelize.STRING,
        references: {
          model: 'Roles',
          key: 'title',
          as: 'role'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      activeToken: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
