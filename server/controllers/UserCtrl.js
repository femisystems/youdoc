'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptNode = require('bcrypt-node');

var _bcryptNode2 = _interopRequireDefault(_bcryptNode);

var _Index = require('../models/Index');

var _Index2 = _interopRequireDefault(_Index);

var _ActionStatus = require('../middleware/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

var _AuthStatus = require('../middleware/AuthStatus');

var _AuthStatus2 = _interopRequireDefault(_AuthStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config({ silent: true });
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
      _Index2.default.Users.create(req.body).then(function (newUser) {
        var payload = {
          userId: newUser.id,
          username: newUser.username,
          roleId: newUser.roleId
        };

        var token = _jsonwebtoken2.default.sign(payload, secret, { expiresIn: '24h' });
        var credential = { token: token, expiresIn: '24 hours' };
        _ActionStatus2.default.postOk(res, 201, true, 'user', { credential: credential, newUser: newUser });
      }).catch(function (err) {
        return _ActionStatus2.default.postFail(res, 501, false, 'user', err);
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
          model: _Index2.default.Roles,
          attributes: details.role
        }]
      };

      _Index2.default.Users.findAll(query).then(function (users) {
        if (users.length < 1) {
          return _ActionStatus2.default.notFound(res, 404, false, 'user');
        }
        _ActionStatus2.default.getOk(res, 200, true, 'user', users);
      }).catch(function (err) {
        return _ActionStatus2.default.getFail(res, 500, false, 'user', err);
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
          model: _Index2.default.Roles,
          attributes: details.role
        }]
      };

      _Index2.default.Users.findOne(query).then(function (user) {
        if (!user) {
          return _ActionStatus2.default.notFound(res, 404, false, 'user');
        }
        _ActionStatus2.default.getOk(res, 200, true, 'user', user);
      }).catch(function (err) {
        return _ActionStatus2.default.getFail(res, 500, false, 'user', err);
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
      _Index2.default.Users.findById(req.params.id).then(function (user) {
        if (!user) return _ActionStatus2.default.notFound(res, 404, false, 'user');

        user.update(req.body).then(function (updatedUser) {
          if (updatedUser) {
            _ActionStatus2.default.putOk(res, 200, true, 'user', updatedUser);
          }
        }).catch(function (err) {
          return _ActionStatus2.default.putFail(res, 501, false, 'user', err);
        });
      }).catch(function (err) {
        return _ActionStatus2.default.getFail(res, 500, false, 'user', err);
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
      _Index2.default.Users.findById(req.params.id).then(function (user) {
        if (!user) return _ActionStatus2.default.notFound(res, 404, false, 'user');

        user.destroy({ force: true }).then(function () {
          return _ActionStatus2.default.deleteOk(res, true, 'user');
        });
      }).catch(function (err) {
        return _ActionStatus2.default.getFail(res, 500, false, 'user', err);
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

      _Index2.default.Users.findOne(query).then(function (user) {
        if (user && _bcryptNode2.default.compareSync(req.body.password, user.password)) {
          var payload = {
            userId: user.dataValues.id,
            username: user.dataValues.username,
            roleId: user.dataValues.roleId
          };

          var token = _jsonwebtoken2.default.sign(payload, secret, { expiresIn: '24h' });
          var credential = { token: token, expiresIn: '24 hours' };
          return _AuthStatus2.default.loginOk(res, 200, true, credential);
        }
        _AuthStatus2.default.ghostLogin(res, 400, false);
      }).catch(function (err) {
        return _AuthStatus2.default.loginFail(res, 500, false, err);
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
      _AuthStatus2.default.logoutOk(res, true);
    }
  }]);

  return UserCtrl;
}();

exports.default = UserCtrl;