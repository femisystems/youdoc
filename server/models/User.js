const bcrypt = require('bcrypt-node');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 15],
          msg: 'Firstname must be 2 to 15 characters long.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 15],
          msg: 'Lastname must be 2 to 15 characters long.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Check that your email looks like this: someone@somewhere.com.'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [/^(.){8,32}$/igm],
          msg: 'Password must be at least 8 characters long.'
        }
      }
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 2
    }
  }, {
    classMethods: {
      associate(models) {
        Users.hasMany(models.Documents, {
          foreignKey: 'ownerId',
          as: 'documents'
        });
        Users.hasMany(models.Types, {
          foreignKey: 'ownerId',
          as: 'types'
        });
        Users.belongsTo(models.Roles, {
          foreignKey: 'roleId'
        });
      },
    },
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      },
      beforeUpdate(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      }
    }
  });
  return Users;
};
