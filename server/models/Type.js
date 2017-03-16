const typeModel = (sequelize, DataTypes) => {
  const Types = sequelize.define('Types', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty.'
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Types.hasMany(models.Documents, {
          foreignKey: 'typeId',
          as: 'documents'
        });
      }
    }
  });
  return Types;
};

export default typeModel;
