const documentModel = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'title cannot be empty'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'content cannot be empty'
        }
      }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'type cannot be empty'
        }
      }
    },
    accessLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        notEmpty: {
          args: true,
          msg: 'accessLevel cannot be empty'
        },
        isIn: {
          args: [['public', 'private', 'role']],
          msg: 'Invalid access type: Access type can be public, private or role.'
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
