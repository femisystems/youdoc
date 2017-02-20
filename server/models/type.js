module.exports = (sequelize, DataTypes) => {
  const Types = sequelize.define('Types', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
          foreignKey: {
            as: 'ownerId',
            notNull: true
          },
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Types;
};
