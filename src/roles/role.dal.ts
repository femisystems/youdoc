import RoleModel from '../core/database/models/role.model';
import { Role, RoleCreationDTO } from '../core/database/types/role.types';

export const create = async (payload: RoleCreationDTO): Promise<Role> => {
  const user = await RoleModel.create(payload);
  return user.dataValues;
};

export const getById = async (id: string): Promise<Role | null> => {
  const role = await RoleModel.findByPk(id);
  return role ? role.dataValues : null;
};

// import { Request, Response } from 'express';
// import {
//   postOk,
//   postFail,
//   notFound,
//   getOk,
//   getFail,
//   putOk,
//   putFail,
//   deleteOk,
// } from '../core/middleware';

// /**
//  * createRole
//  * This method creates new role
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  * @return {Void} no return value
//  */
// export const createRole = (req: Request, res: Response) => {
//   let statusCode = 409;
//   if (req.body.title === '') statusCode = 400;

//   Roles.create(req.body)
//     .then((newRole) => postOk(res, 'role', newRole))
//     .catch((err) => postFail(res, statusCode, 'role', err.errors[0].message));
// };

// /**
//  * listRoles
//  * This method fetches all existing roles
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  * @return {Void} no return value
//  */
// export const listRoles = (req: Request, res: Response) => {
//   Roles.findAll({ where: {} }).then((roles) => {
//     if (!roles.length) return notFound(res, 'role');
//     getOk(res, 'role', roles);
//   });
// };

// /**
//  * getRole
//  * This method fetches one role
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  * @return {Void} no return value
//  */
// export const getRole = (req: Request, res: Response) => {
//   Roles.findOne({ where: { id: req.params.id } })
//     .then((role) => {
//       if (!role) return notFound(res, 'role');
//       getOk(res, 'role', role);
//     })
//     .catch(() => getFail(res, 400, 'role', 'Invalid input.'));
// };

// /**
//  * updateRole
//  * This method updates one role
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  * @return {Void} no return value
//  */
// export const updateRole = (req: Request, res: Response) => {
//   let statusCode = 409;
//   if (req.body.title === '') statusCode = 400;

//   req.role
//     .update(req.body)
//     .then((updatedRole) => {
//       putOk(res, 'role', updatedRole);
//     })
//     .catch((err) => putFail(res, statusCode, 'role', err.errors[0].message));
// };

// /**
//  * deleteRole
//  * This method destroys a role object but disallows
//  * the default admin role from being destroyed
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  * @return {Void} no return value
//  */
// export const deleteRole = (req: Request, res: Response) => {
//   req.role.destroy({ force: true }).then(() => deleteOk(res, 'role'));
// };
