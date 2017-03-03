module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
          foreignKey: 'roleId',
          as: 'users'
        });
      }
    }
  });
  return Roles;
};
