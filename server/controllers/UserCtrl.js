require('dotenv').config();

const Db = require('../models/Index');
const UserStatus = require('./StatusResponse/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-node');

const secret = process.env.SECRET || '$3CRET AG3NT';

/**
 * UserCtrl
 * Responsible for creating new, modifying and removing users
 * All the methods of this class are static
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
    Db.User.create(req.body)
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
        errors: err.errors
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
    const userDetails = [
      'id',
      'firstName',
      'lastName',
      'email',
      'username',
      'roleId'
    ];

    Db.User.findAll({ attributes: userDetails })
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
    const query = {
      where: {
        id: req.params.id
      },
      attributes: ['firstName', 'lastName', 'username', 'email']
    };

    Db.User.findOne(query)
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
   * getUserDocs
   * This method retries documents belong to specific user
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getUserDocs(req, res) {
    Db.User.findById(req.params.id)
      .then((user) => {
        if (!user) return res.status(404).send({ status: UserStatus.GETFAIL });

        // query the document db
        const query = {
          where: {
            userId: user.id
          }
        };

        Db.Document.findAll(query)
          .then((documents) => {
            if (!documents.length) {
              return res.status(404).send({
                msg: `User ${user.username} has no documents yet.`,
              });
            }
            res.send({ msg: 'Document(s) successfully retrieved' });
          })
          .catch((err) => {
            res.status(500).send({ msg: 'Process failed', error: err.errors });
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
  static editUser(req, res) {
    Db.User.findById(req.params.id)
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
    Db.User.findById(req.params.id)
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

    Db.User.findOne(query)
      .then((user) => {
        console.log('user information: ', user.password, req.body.password);
        console.log('compare result', bcrypt.compareSync(req.body.password, user.password));
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

  /**
   * verifyPassword
   * This method checks for the validity of the password of a user
   * @param {Object} user - user object
   * @param {String} password - password
   * @return {Boolean} true/false
   */
  static verifyPassword(user, password) {
    console.log('user is: ', user)
    bcrypt.compare(password, user.dataValues.password, (err, res) => {
      if (!err) console.log(res);
      return res;
    });
  }

}

module.exports = UserCtrl;
