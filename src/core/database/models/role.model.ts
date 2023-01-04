import { DataTypes } from 'sequelize';
import sequelize from '../connection';
import { RoleAttributes as Role } from '../types/role.types';
import UserEntity from './user.model';

const RoleModel = sequelize.define<Role>(
  'Role',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.ENUM,
      values: ['admin', 'member'],
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty.',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'roles',
    timestamps: true,
    paranoid: true,
  }
);

RoleModel.hasMany(UserEntity, {
  foreignKey: 'roleId',
});

export default RoleModel;
