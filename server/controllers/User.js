import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Db from '../models/Index';
import Status from '../middleware/ActionStatus';
import AuthStatus from '../middleware/AuthStatus';

dotenv.config({ silent: true });
const secret = process.env.SECRET || '$3CRET AG3NT';

/**
 * @class UserCtrl
 * @classdesc create and manage user operations
 */
class UserCtrl {

  /**
   * createUser
   * This method creates a new user
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static createUser(req, res) {
    Db.Users.create(req.body)
      .then((newUser) => {
        const payload = {
          userId: newUser.id,
          username: newUser.username,
          role: newUser.role
        };

        const token = jwt.sign(payload, secret, { expiresIn: '24h' });
        const credential = { token, expiresIn: '24 hours' };
        Status.postOk(res, 201, true, 'user', { credential, newUser });
      })
      .catch(err => Status.postFail(res, 500, false, 'user', err));
  }

  /**
   * listUsers
   * This method retrieves the list of users
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static listUsers(req, res) {
    Db.Users.findAll(req.searchQuery)
      .then((users) => {
        if (users.length < 1) {
          return Status.notFound(res, 404, false, 'user');
        }
        Status.getOk(res, 200, true, 'user', users);
      })
      .catch(err => Status.getFail(res, 500, false, 'user', err));
  }

  /**
   * getUser
   * This method retrieves a single user by Id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getUser(req, res) {
    Db.Users.findOne(req.searchQuery)
      .then((user) => {
        if (!user) {
          return Status.notFound(res, 404, false, 'user');
        }
        Status.getOk(res, 200, true, 'user', user);
      })
      .catch(err => Status.getFail(res, 500, false, 'user', err));
  }

  /**
   * editUser
   * This method edits a user object
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static updateUser(req, res) {
    req.user.update(req.body)
      .then((updatedUser) => {
        Status.putOk(res, 200, true, 'user', updatedUser);
      })
      .catch(err => Status.putFail(res, 500, false, 'user', err));
  }

  /**
   * deleteUser
   * This method destroys a user object
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static deleteUser(req, res) {
    Db.Users.findById(req.params.id)
      .then((user) => {
        if (!user) return Status.notFound(res, 404, false, 'user');
        if (user.role === 'admin') {
          return AuthStatus.forbid(res, 403, false);
        }
        user.destroy({ force: true })
          .then(() => Status.deleteOk(res, true, 'user'));
      })
      .catch(err => Status.getFail(res, 500, false, 'user', err));
  }
}

export default UserCtrl;
