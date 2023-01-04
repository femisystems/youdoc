import { DataTypes, QueryInterface } from 'sequelize';
import DoctypeModel from '../models/doctype.model';
import { DoctypeAttributes as Doctype } from '../types/doctype.types';

export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const transaction = await queryInterface.sequelize.transaction();
    return queryInterface.createTable<Doctype>(
      DoctypeModel.tableName,
      {
        id: {
          allowNull: false,
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
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
    return await queryInterface.dropTable(DoctypeModel.tableName, {
      transaction,
    });
  },
};
