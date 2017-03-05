const documentModel = (sequelize, DataTypes) => {
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
    ownerRole: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
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
          foreignKey: 'type'
        });
      }
    }
  });
  return Documents;
};

export default documentModel;
