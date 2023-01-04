import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { isAdmin, isAdminRoleField } from '../utils';
import { forbid, unauthorized } from './auth-responses';
import { getFail, notFound, putFail } from './response-statuses';

const secret = process.env.SECRET;

/**
 * verifyUser
 * checks if the user is valid before authorising
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - run next func
 * @return {null} no return value
 */
// export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization || req.headers['x-access-token'];

//   if (!token) return unauthorized(res, 'No authorization header set');
//   jwt.verify(token, secret, (err, decoded) => {
//     if (err) {
//       return unauthorized(res, 'Invalid token');
//     }

//     const query = {
//       where: {
//         id: decoded.userId,
//       },
//     };

//     Users.findOne(query).then((user) => {
//       if (!user) return notFound(res, 'user');
//       req.decoded = decoded;
//       next();
//     });
//   });
// };

/**
 * verifyAdmin
 * checks if the user is an admin authorising
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - run next func
 * @return {null} no return value
 */
// export const verifyAdmin = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!isAdmin(req)) {
//     return forbid(res);
//   }
//   next();
// };

/**
 * permitRoleEdit
 * checks if the user is an admin authorising
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - run next func
 * @return {null} no return value
 */
// export const checkRoleWriteAccess = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (parseInt(req.params.id, 10) === 1) return forbid(res);
//   Roles.findOne({ where: { id: parseInt(req.params.id, 10) } })
//     .then((role) => {
//       if (!role) return notFound(res, 'role');
//       req.role = role;
//       next();
//     })
//     .catch(() => getFail(res, 400, 'role', 'Invalid input.'));
// };

/**
 * checkUserWriteAccess
 * checks if the user is authorised to access user route
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - run next func
 * @return {Null|Object} response object | no return value
 */
// export const checkUserWriteAccess = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (isAdminRoleField(req)) return forbid(res);
//   if (req.decoded.userId === parseInt(req.params.id, 10) || isAdmin(req)) {
//     Users.findById(req.params.id)
//       .then((user) => {
//         if (!user) return notFound(res, 'user');

//         // disallow role update if client is not admin
//         if (req.body.roleId && !isAdmin(req)) {
//           return forbid(res);
//         }

//         req.user = user;
//         next();
//       })
//       .catch(() => getFail(res, 400, 'user', 'Invalid Input'));
//   } else {
//     return forbid(res);
//   }
// };

/**
 * checkDocWriteAccess
 * checks if the user is authorised to make changes to doc
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - run next func
 * @return {Null|Object} response object | no return value
 */
// export const checkDocWriteAccess = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   Documents.findById(req.params.id)
//     .then((document) => {
//       if (!document) return notFound(res, 'document');
//       if (document.ownerId === req.decoded.userId || isAdmin(req)) {
//         if (
//           req.method.toLowerCase() === 'put' &&
//           Object.keys(req.body).length < 1
//         ) {
//           return putFail(
//             res,
//             400,
//             'document',
//             'Cannot update document with null data'
//           );
//         }
//         req.document = document;
//         next();
//       } else {
//         forbid(res);
//       }
//     })
//     .catch(() => getFail(res, 400, 'document', 'Invalid input.'));
// };

/**
 * login
 * This method logs a user into the system
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @return {Void} no return value
 */
export const login = (req: Request, res: Response) => {
  let query = { where: { username: req.body.userIdentity } };
  if (/^[a-z0-9_.]+@[a-z]+\.[a-z]+$/i.test(req.body.userIdentity)) {
    query = { where: { email: req.body.userIdentity } };
  }
  Users.findOne(query)
    .then((user) => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const credential = generateToken(user, secret);
        user
          .update({ activeToken: credential.token })
          .then(() => loginOk(res, `${user.username}`, credential))
          .catch(() => loginFail(res, 500, 'Internal Server Error.'));
      } else {
        ghostLogin(res);
      }
    })
    .catch(() => loginFail(res, 400, 'Invalid Details'));
};

/**
 * logout
 * logs a user out
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - run next func
 * @return {Null|Object} response object | no return value
 */
export const logout = (req: Request, res: Response) => {
  // Users.findById(req.decoded.userId)
  //   .then((user) => {
  //     if (user) {
  //       user
  //         .update({ activeToken: null })
  //         .then(() => {
  //           logoutOk(res);
  //         })
  //         .catch(() =>
  //           getFail(
  //             res,
  //             500,
  //             'user',
  //             'Unable to log you out. Please try again.'
  //           )
  //         );
  //     } else {
  //       notFound(res, 'user');
  //     }
  //   })
  //   .catch(() => getFail(res, 500, 'user', 'Unable to find user.'));
};
