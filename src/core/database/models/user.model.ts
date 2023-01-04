import bcrypt from 'bcrypt';
import { DataTypes } from 'sequelize';
import sequelize from '../connection';
import { UserAttributes as User } from '../types/user.types';
import DocumentModel from './document.model';

const User = sequelize.define<User>(
  'User',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'firstName cannot be empty',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'lastName cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty',
        },
        isEmail: {
          msg: 'Invalid email. Try formatting it like this: you@mail.com',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'username cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty',
        },
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
  }
);

// associations
User.hasMany(DocumentModel, {
  foreignKey: 'ownerId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

const hashPassword = (user: User) => {
  if (user.changed('password') || user.isNewRecord) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
  }
};

const appendAtSymbol = (user: User) => {
  if (user.changed('username') || user.isNewRecord) {
    user.dataValues.username = `@${user.dataValues.username}`;
  }
};

User.addHook('beforeCreate', appendAtSymbol);
User.addHook('beforeUpdate', appendAtSymbol);
User.addHook('beforeCreate', hashPassword);
User.addHook('beforeUpdate', hashPassword);

export default User;
