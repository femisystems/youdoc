const roleModel = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
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
          msg: 'Title cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Roles.hasMany(models.Users, {
          foreignKey: 'role',
          as: 'users'
        });
      }
    }
  });
  return Roles;
};

export default roleModel;
