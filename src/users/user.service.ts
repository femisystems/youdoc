import { User, UserCreationDTO } from '../core/database/types/user.types';
import * as userDAL from './user.dal';

export const create = async (payload: UserCreationDTO): Promise<User> => {
  let user = await userDAL.create(payload);
  return user;
};
