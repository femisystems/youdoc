import { QueryInterface, DataTypes } from 'sequelize';
import UserModel from '../models/user.model';
import { UserAttributes as User } from '../types/user.types';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const transaction = await queryInterface.sequelize.transaction();
    return await queryInterface.createTable<User>(
      UserModel.tableName,
      {
        id: {
          allowNull: false,
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        roleId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Role',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      { transaction }
    );
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    const transaction = await queryInterface.sequelize.transaction();
    return queryInterface.dropTable(UserModel.tableName, { transaction });
  },
};
