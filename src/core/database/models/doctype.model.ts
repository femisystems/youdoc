import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '../connection';
import { DoctypeAttributes as Doctype } from '../types/doctype.types';
import DocumentModel from './document.model';

const DoctypeModel = sequelize.define<Doctype>(
  'Doctype',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
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
    tableName: 'doctypes',
    timestamps: true,
    paranoid: true,
  }
);

DoctypeModel.hasMany(DocumentModel, {
  foreignKey: 'doctypeId',
});

export default DoctypeModel;
