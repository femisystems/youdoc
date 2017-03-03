module.exports = (sequelize, DataTypes) => {
  const Types = sequelize.define('Types', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
          foreignKey: 'typeId',
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
