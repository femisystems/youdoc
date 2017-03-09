import bcrypt from 'bcrypt-node';

const userModel = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'firstName cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'lastName cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email cannot be empty'
        },
        isEmail: {
          msg: 'Invalid email. Try formatting it like this: you@mail.com'
        },
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'username cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'password cannot be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'role cannot be empty'
        },
        isIn: {
          args: [['fellow', 'consultant', 'facilitator']],
          msg: 'can only be fellow, facilitator or consultant'
        }
      }
    },
    activeToken: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    classMethods: {
      associate(models) {
        Users.hasMany(models.Documents, {
          foreignKey: 'ownerId',
          as: 'documents'
        });
        Users.belongsTo(models.Roles, {
          foreignKey: 'role'
        });
      },
    },
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      },
      beforeUpdate(user) {
        if (user._changed.password) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
        }
      }
    }
  });
  return Users;
};

export default userModel;
