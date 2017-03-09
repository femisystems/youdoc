import dotenv from 'dotenv';
import Db from '../models/Index';
import Status from '../middleware/ActionStatus';
import AuthStatus from '../middleware/AuthStatus';
import Utils from '../controllers/Utils';

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
      .then((user) => {
        const credential = Utils.generateToken(user, secret);
        user.update({ activeToken: credential.token })
          .then((data) => {
            delete data.dataValues.activeToken;
            Status.postOk(res, 'user', { credential, data });
          });
      })
      .catch(err => Status.postFail(res, 400, 'user', err.errors[0].message));
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
          return Status.notFound(res, 'user');
        }
        Status.getOk(res, 'user', users);
      });
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
          return Status.notFound(res, 'user');
        }
        Status.getOk(res, 'user', user);
      })
      .catch(() => Status.getFail(res, 400, 'user', 'Invalid input.'));
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
        delete updatedUser.dataValues.activeToken;
        delete updatedUser.dataValues.password;
        Status.putOk(res, 'user', updatedUser);
      })
      .catch(() => Status.putFail(res, 400, 'user', 'Invalid input.'));
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
        if (!user) return Status.notFound(res, 'user');
        if (user.role === 'admin') {
          return AuthStatus.forbid(res);
        }
        user.destroy({ force: true })
          .then(() => Status.deleteOk(res, 'user'));
      })
      .catch(() => Status.getFail(res, 400, 'user', 'Invalid input.'));
  }
}

export default UserCtrl;
