import Doctype from '../core/database/models/doctype.model';
import {
  Doctype,
  DoctypeCreationAttributes,
} from '../core/database/types/doctype.types';

export const create = async (
  payload: DoctypeCreationAttributes
): Promise<Doctype> => {
  const doctype = await Doctype.create(payload);
  return doctype.dataValues;
};

export const getById = async (id: string): Promise<Doctype | null> => {
  const doctype = await Doctype.findByPk(id);
  return doctype ? doctype.dataValues : null;
};

// import { Request, Response } from 'express';
// import {
//   deleteOk,
//   getFail,
//   getOk,
//   notFound,
//   postFail,
//   postOk,
// } from '../core/middleware/response-statuses';

// /**
//  * createType
//  * creates a new type
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  * @return {Null} no return value
//  */
// export const createType = (req: Request, res: Response) => {
//   let statusCode = 409;
//   if (req.body.title === '') statusCode = 400;

//   Doctypes.create(req.body)
//     .then((type) => postOk(res, 'type', type))
//     .catch((err) => postFail(res, statusCode, 'type', err.errors[0].message));
// };

// /**
//  * listTypes
//  * fetch all from types
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  * @return {Null} no return value
//  */
// export const listTypes = (req: Request, res: Response) => {
//   Doctypes.findAll({ where: {} }).then((types) => {
//     if (types.length < 1) return notFound(res, 'type');
//     getOk(res, 'type', types);
//   });
// };

// /**
//  * getType
//  * find type by id
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  * @return {Void} no return value
//  */
// export const getType = (req: Request, res: Response) => {
//   Doctypes.findOne({ where: { id: parseInt(req.params.id, 10) } })
//     .then((type) => {
//       if (!type) return notFound(res, 'type');
//       getOk(res, 'type', type);
//     })
//     .catch(() => getFail(res, 400, 'type', 'Invalid input.'));
// };

// /**
//  * deleteType
//  * remove/destroy type
//  * @param {Object} req - request object
//  * @param {Object} res - response object
//  * @return {Void} no return value
//  */
// export const deleteType = (req: Request, res: Response) => {
//   Doctypes.findOne({ where: { id: req.params.id } })
//     .then((type) => {
//       if (!type) return notFound(res, 'type');
//       type.destroy().then(() => deleteOk(res, 'type'));
//     })
//     .catch(() => getFail(res, 400, 'type', 'Invalid input.'));
// };
