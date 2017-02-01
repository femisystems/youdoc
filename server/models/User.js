const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Document, {
          foreignKey: 'userId',
          as: 'documents'
        });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId'
        });
      },
    },
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      },
      beforeUpdate(user) {
        user.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      }
    }
  });
  return User;
};
