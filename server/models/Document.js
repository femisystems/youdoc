module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 32],
          msg: 'Document title should be 1 to 32 characters long.'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ownerRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accessLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        isIn: [['public', 'private', 'role']]
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Documents.belongsTo(models.Users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
        Documents.belongsTo(models.Types, {
          foreignKey: 'typeId'
        });
      }
    }
  });
  return Documents;
};
