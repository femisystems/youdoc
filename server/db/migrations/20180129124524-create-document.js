module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      accessLevel: {
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
      ownerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'ownerId'
        }
      },
      type: {
        type: Sequelize.STRING,
        references: {
          model: 'Types',
          key: 'title',
          as: 'type'
        }
      },
      ownerRole: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Documents');
  }
};
