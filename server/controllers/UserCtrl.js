'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('dotenv').config();

var Db = require('../models/Index');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-node');
var Status = require('../middleware/ActionStatus');
var AuthStatus = require('../middleware/AuthStatus');

var secret = process.env.SECRET || '$3CRET AG3NT';

/**
 * @class UserCtrl
 * @classdesc create and manage user operations
 */

var UserCtrl = function () {
  function UserCtrl() {
    _classCallCheck(this, UserCtrl);
  }

  _createClass(UserCtrl, null, [{
    key: 'createUser',


    /**
     * createUser
     * This method creates a new user
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */
    value: function createUser(req, res) {
      Db.Users.create(req.body).then(function (newUser) {
        var payload = {
          userId: newUser.id,
          username: newUser.username,
          roleId: newUser.roleId
        };

        var token = jwt.sign(payload, secret, { expiresIn: '24h' });
        var credential = { token: token, expiresIn: '24 hours' };
        Status.postOk(res, 201, true, 'user', { credential: credential, newUser: newUser });
      }).catch(function (err) {
        return Status.postFail(res, 501, false, 'user', err);
      });
    }

    /**
     * listUsers
     * This method retrieves the list of users
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'listUsers',
    value: function listUsers(req, res) {
      var details = {
        user: ['id', 'firstName', 'lastName', 'email', 'username'],
        role: ['id', 'title']
      };

      var query = {
        attributes: details.user,
        include: [{
          model: Db.Roles,
          attributes: details.role
        }]
      };

      Db.Users.findAll(query).then(function (users) {
        if (users.length < 1) {
          return Status.notFound(res, 404, false, 'user');
        }
        Status.getOk(res, 200, true, 'user', users);
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'user', err);
      });
    }

    /**
     * getUser
     * This method retrieves a single user by Id
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'getUser',
    value: function getUser(req, res) {
      var details = {
        user: ['id', 'firstName', 'lastName', 'email', 'username'],
        role: ['id', 'title']
      };

      var query = {
        where: {
          id: req.params.id
        },
        attributes: details.user,
        include: [{
          model: Db.Roles,
          attributes: details.role
        }]
      };

      Db.Users.findOne(query).then(function (user) {
        if (!user) {
          return Status.notFound(res, 404, false, 'user');
        }
        Status.getOk(res, 200, true, 'user', user);
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'user', err);
      });
    }

    /**
     * editUser
     * This method edits a user object
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'updateUser',
    value: function updateUser(req, res) {
      Db.Users.findById(req.params.id).then(function (user) {
        if (!user) return res.status(404).send({ status: UserStatus.GETFAIL });

        user.update(req.body).then(function (updatedUser) {
          if (updatedUser) {
            Status.putOk(res, 200, true, 'user', updatedUser);
          }
        }).catch(function (err) {
          return Status.putFail(res, 501, false, 'user', err);
        });
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'user', err);
      });
    }

    /**
     * deleteUser
     * This method destroys a user object
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'deleteUser',
    value: function deleteUser(req, res) {
      Db.Users.findById(req.params.id).then(function (user) {
        if (!user) return res.status(404).send({ status: UserStatus.GETFAIL });

        user.destroy({ force: true }).then(function () {
          return Status.deleteOk(res, true, 'user');
        });
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'user', err);
      });
    }

    /**
     * login
     * This method logs a user into the system
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'login',
    value: function login(req, res) {
      var query = { where: { username: req.body.userIdentity } };
      if (/^[a-z0-9_.]+@[a-z]+\.[a-z]+$/i.test(req.body.userIdentity)) {
        query = { where: { email: req.body.userIdentity } };
      }

      Db.Users.findOne(query).then(function (user) {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          var payload = {
            userId: user.dataValues.id,
            username: user.dataValues.username,
            roleId: user.dataValues.roleId
          };

          var token = jwt.sign(payload, secret, { expiresIn: '24h' });
          var credential = { token: token, expiresIn: '24 hours' };
          return AuthStatus.loginOk(res, 200, true, credential);
        }
        AuthStatus.ghostLogin(res, 400, false);
      }).catch(function (err) {
        return AuthStatus.loginFail(res, 500, false, err);
      });
    }

    /**
     * logout
     * This method logs a user out of the system
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'logout',
    value: function logout(req, res) {
      AuthStatus.logoutOk(res, true);
    }
  }]);

  return UserCtrl;
}();

module.exports = UserCtrl;