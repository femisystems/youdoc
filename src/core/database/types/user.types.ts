import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Optional,
} from 'sequelize';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roleId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserAttributes
  extends User,
    Model<
      InferAttributes<UserAttributes>,
      InferCreationAttributes<UserAttributes>
    > {
  id: CreationOptional<string>;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date>;
}

export interface UserCreationDTO
  extends Optional<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}
