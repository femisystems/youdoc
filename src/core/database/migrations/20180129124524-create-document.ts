import { DataTypes, QueryInterface } from 'sequelize';
import DocumentModel from '../models/document.model';
import { DocumentAttributes as Document } from '../types/document.types';

module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    const transaction = await queryInterface.sequelize.transaction();
    return await queryInterface.createTable<Document>(
      DocumentModel.tableName,
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
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        isPublic: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        ownerId: {
          type: DataTypes.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'User',
            key: 'id',
          },
        },
        typeId: {
          type: DataTypes.INTEGER,
          references: {
            model: 'Doctype',
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
    return await queryInterface.dropTable(DocumentModel.tableName, {
      transaction,
    });
  },
};
