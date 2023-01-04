import { DataTypes, QueryInterface } from 'sequelize';
import RoleModel from '../models/role.model';
import { RoleAttributes as Role } from '../types/role.types';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const transaction = await queryInterface.sequelize.transaction();
    return await queryInterface.createTable<Role>(
      RoleModel.tableName,
      {
        id: {
          allowNull: false,
          type: DataTypes.UUIDV4,
          primaryKey: true,
          unique: true,
        },
        title: {
          type: DataTypes.STRING,
          unique: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      { transaction }
    );
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    const transaction = await queryInterface.sequelize.transaction();
    return await queryInterface.dropTable(RoleModel.tableName, { transaction });
  },
};
