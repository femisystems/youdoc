const typeModel = (sequelize, DataTypes) => {
  const Types = sequelize.define('Types', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Type cannot be empty!'
        }
      }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        Types.hasMany(models.Documents, {
          foreignKey: 'type',
          as: 'documents'
        });
        Types.belongsTo(models.Users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Types;
};

export default typeModel;
