require('dotenv').config();

const Db = require('../models/Index');
const UserStatus = require('./StatusResponse/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-node');

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
          roleId: newUser.roleId
        };

        const token = jwt.sign(payload, secret, { expiresIn: '24h' });
        res.status(201).send({
          status: UserStatus.POSTSUCCESS,
          token,
          expiresIn: '24 hours',
          data: newUser
        });
      })
      .catch(err => res.status(500).send({
        status: UserStatus.POSTFAIL,
        errors: err.message
      }));
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

    Db.Users.findAll(query)
      .then((users) => {
        if (!users.length) return res.status(404).send({ status: UserStatus.GETFAIL });
        res.status(200).send({
          status: UserStatus.GETSUCCESS,
          data: users
        });
      }).catch((err) => {
        res.status(500).send({ status: UserStatus.GETFAIL, error: err.errors });
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

    Db.Users.findOne(query)
      .then((user) => {
        if (!user) return res.status(404).send({ status: UserStatus.GETFAIL });
        res.status(200).send({
          status: UserStatus.GETSUCCESS,
          data: user
        });
      })
      .catch((err) => {
        res.status(500).send({ status: UserStatus.GETFAIL, error: err.errors });
      });
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

        user.update(req.body)
          .then(updatedUser => res.status(200).send({
            status: UserStatus.PUTSUCCESS,
            data: updatedUser
          }))
          .catch(err => res.status(501).send({
            status: UserStatus.PUTFAIL,
            error: err.errors
          }));
      })
      .catch(err => res.status(500).send({
        status: UserStatus.GETFAIL,
        error: err.errors
      }));
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
          .then(() => res.send({ status: UserStatus.DELSUCCESS }));
      })
      .catch(err => res.status(500).send({
        status: UserStatus.GETFAIL,
        error: err.errors
      }));
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
          return res.status(200).send({
            status: UserStatus.LOGINSUCCESS,
            token,
            expiresIn: '24 hours',
          });
        }
        res.status(501).send({ status: UserStatus.GHOSTLOGIN });
      })
      .catch((err) => {
        res.status(501).send({
          status: UserStatus.LOGINFAIL,
          error: err.errors
        });
      });
  }

  /**
   * logout
   * This method logs a user out of the system
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static logout(req, res) {
    res.send({
      status: UserStatus.LOGOUTSUCCESS
    });
  }
}

module.exports = UserCtrl;
