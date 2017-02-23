require('dotenv').config();

const Db = require('../models/Index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-node');
const Status = require('../middlewares/ActionStatus');
const AuthStatus = require('../middlewares/AuthStatus');

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
    Db.Users
      .create(req.body)
      .then((newUser) => {
        const payload = {
          userId: newUser.id,
          username: newUser.username,
          roleId: newUser.roleId
        };

        const token = jwt.sign(payload, secret, { expiresIn: '24h' });
        const credential = { token, expiresIn: '24 hours' };
        Status.postOk(res, 201, true, 'user', { credential, newUser });
      })
      .catch(err => Status.postFail(res, 501, false, 'user', err));
  }

  /**
   * listUsers
   * This method retrieves the list of users
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static listUsers(req, res) {
    const details = {
      user: ['id', 'firstName', 'lastName', 'email', 'username'],
      role: ['id', 'title']
    };

    const query = {
      attributes: details.user,
      include: [
        {
          model: Db.Roles,
          attributes: details.role
        }
      ]
    };

    Db.Users
      .findAll(query)
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
    const details = {
      user: ['id', 'firstName', 'lastName', 'email', 'username'],
      role: ['id', 'title']
    };

    const query = {
      where: {
        id: req.params.id
      },
      attributes: details.user,
      include: [
        {
          model: Db.Roles,
          attributes: details.role
        }
      ]
    };

    Db.Users
      .findOne(query)
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
    Db.Users.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ status: UserStatus.GETFAIL });

        user
          .update(req.body)
          .then((updatedUser) => {
            if (updatedUser) {
              Status.putOk(res, 200, true, 'user', updatedUser);
            }
          })
          .catch(err => Status.putFail(res, 501, false, 'user', err));
      })
     .catch(err => Status.getFail(res, 500, false, 'user', err));
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
        if (!user) return res.status(404).send({ status: UserStatus.GETFAIL });

        user.destroy({ force: true })
          .then(() => Status.deleteOk(res, true, 'user'));
      })
      .catch(err => Status.getFail(res, 500, false, 'user', err));
  }

  /**
   * login
   * This method logs a user into the system
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static login(req, res) {
    let query = { where: { username: req.body.userIdentity } };
    if (/^[a-z0-9_.]+@[a-z]+\.[a-z]+$/i.test(req.body.userIdentity)) {
      query = { where: { email: req.body.userIdentity } };
    }

    Db.Users.findOne(query)
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            userId: user.dataValues.id,
            username: user.dataValues.username,
            roleId: user.dataValues.roleId
          };

          const token = jwt.sign(payload, secret, { expiresIn: '24h' });
          const credential = { token, expiresIn: '24 hours' };
          return AuthStatus.loginOk(res, 200, true, credential);
        }
        AuthStatus.ghostLogin(res, 400, false);
      })
      .catch(err => AuthStatus.loginFail(res, 500, false, err));
  }

  /**
   * logout
   * This method logs a user out of the system
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static logout(req, res) {
    AuthStatus.logoutOk(res, true);
  }
}

module.exports = UserCtrl;
