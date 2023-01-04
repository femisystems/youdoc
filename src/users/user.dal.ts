import {
  User,
  UserCreationAttributes,
} from '../core/database/types/user.types';
import UserEntity from '../core/database/models/user.model';

export const create = async (
  payload: UserCreationAttributes
): Promise<User> => {
  const user = await UserEntity.create(payload);
  return user.dataValues;
};

export const getById = async (id: string): Promise<User | null> => {
  const user = await UserEntity.findByPk(id);
  return user ? user.dataValues : null;
};

// import AuthStatus from '../core/middleware/auth-responses';
// import { generateToken } from '../core/utils';
// import userModel, { User } from './user.model';

// const secret = process.env.SECRET || '$3CRET AG3NT';

// /**
//  * @class UserCtrl
//  * @classdesc create and manage user operations
//  */
// class UserController {
//   /**
//    * createUser
//    * This method creates a new user
//    * @param {Object} req - request object
//    * @param {Object} res - response object
//    * @return {Void} no return value
//    */
//   static createUser(req, res) {
//     Db.Users.create(req.body)
//       .then((user) => {
//         const credential = generateToken(user, secret);
//         user.update({ activeToken: credential.token }).then((data) => {
//           delete data.dataValues.activeToken;
//           postOk(res, 'user', { credential, data });
//         });
//       })
//       .catch((err) => {
//         if (/unique violation/.test(err.errors[0].type)) {
//           return postFail(res, 409, 'user', err.errors[0].message);
//         }
//         return postFail(res, 400, 'user', err.errors[0].message);
//       });
//   }

//   /**
//    * listUsers
//    * This method retrieves the list of users
//    * @param {Object} req - request object
//    * @param {Object} res - response object
//    * @return {Void} no return value
//    */
//   static listUsers(req, res) {
//     Db.Users.findAll(req.searchQuery).then((users) => {
//       if (users.length < 1) return notFound(res, 'user');
//       getOk(res, 'user', users);
//     });
//   }

//   /**
//    * getUser
//    * This method retrieves a single user by Id
//    * @param {Object} req - request object
//    * @param {Object} res - response object
//    * @return {Void} no return value
//    */
//   static getUser(req, res) {
//     Db.Users.findOne(req.searchQuery)
//       .then((user) => {
//         if (!user) return notFound(res, 'user');
//         getOk(res, 'user', user);
//       })
//       .catch(() => getFail(res, 400, 'user', 'Invalid input.'));
//   }

//   /**
//    * editUser
//    * This method edits a user object
//    * @param {Object} req - request object
//    * @param {Object} res - response object
//    * @return {Void} no return value
//    */
//   static updateUser(req, res) {
//     req.user
//       .update(req.body)
//       .then((updatedUser) => {
//         delete updatedUser.dataValues.activeToken;
//         delete updatedUser.dataValues.password;
//         putOk(res, 'user', updatedUser);
//       })
//       .catch((err) => {
//         if (/unique violation/.test(err.errors[0].type)) {
//           return putFail(res, 409, 'user', err.errors[0].message);
//         }
//         return putFail(res, 400, 'user', err.errors[0].message);
//       });
//   }

//   /**
//    * deleteUser
//    * This method destroys a user object
//    * @param {Object} req - request object
//    * @param {Object} res - response object
//    * @return {Void} no return value
//    */
//   static deleteUser(req, res) {
//     Db.Users.findById(req.params.id)
//       .then((user) => {
//         if (!user) return notFound(res, 'user');
//         if (user.roleId === 1) {
//           return AuthStatus.forbid(res);
//         }
//         user.destroy({ force: true }).then(() => deleteOk(res, 'user'));
//       })
//       .catch(() => getFail(res, 400, 'user', 'Invalid input.'));
//   }
// }

// export default UserController;
