import { Role, RoleCreationDTO } from '../core/database/types/role.types';
import * as roleDAL from './role.dal';

export const create = async (payload: RoleCreationDTO): Promise<Role> => {
  let role = await roleDAL.create(payload);
  return role;
};
