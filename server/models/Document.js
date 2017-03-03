module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Document title cannot be empty'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Content cannot be empty'
        }
      }
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
        isIn: {
          args: [['public', 'private', 'role']],
          msg: 'access level can only be public, private or role'
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Documents.belongsTo(models.Users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
        Documents.belongsTo(models.Types, {
          foreignKey: 'typeId'
        });
      }
    }
  });
  return Documents;
};
