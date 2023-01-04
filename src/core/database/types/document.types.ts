import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { Model } from 'sequelize-typescript';

export interface Document {
  id: string;
  title: string;
  content: string;
  ownerId: string;
  typeId: string;
  isPublic: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface DocumentAttributes
  extends Document,
    Model<
      InferAttributes<DocumentAttributes>,
      InferCreationAttributes<DocumentAttributes>
    > {
  id: CreationOptional<string>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date>;
}

export interface DocumentCreationDTO
  extends Optional<Document, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}
