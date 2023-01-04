import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Optional,
} from 'sequelize';
import { Model } from 'sequelize-typescript';

export interface Role {
  id: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface RoleAttributes
  extends Role,
    Model<
      InferAttributes<RoleAttributes>,
      InferCreationAttributes<RoleAttributes>
    > {
  id: CreationOptional<string>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date>;
}

export interface RoleCreationDTO
  extends Optional<Role, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}
