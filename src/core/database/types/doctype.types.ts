import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { Model } from 'sequelize-typescript';

export interface Doctype {
  id: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface DoctypeAttributes
  extends Doctype,
    Model<
      InferAttributes<DoctypeAttributes>,
      InferCreationAttributes<DoctypeAttributes>
    > {
  id: CreationOptional<string>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date>;
}

export interface DoctypeCreationDTO
  extends Optional<Doctype, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}
