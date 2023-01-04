import { DataTypes, ModelDefined, Optional } from 'sequelize';
import sequelize from '../connection';
import UserEntity from './user.model';
import { DocumentAttributes as Document } from '../types/document.types';
import Doctype from './doctype.model';

const DocumentModel = sequelize.define<Document>(
  'Document',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title cannot be empty',
        },
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'content cannot be empty',
        },
      },
    },
    ownerId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'typeId cannot be empty',
        },
      },
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'documents',
    timestamps: true,
    paranoid: true,
  }
);

DocumentModel.belongsTo(UserEntity, {
  foreignKey: 'ownerId',
});

DocumentModel.belongsTo(Doctype, {
  foreignKey: 'doctypeId',
});

export default DocumentModel;
