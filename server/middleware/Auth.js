'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _Index = require('../models/Index');

var _Index2 = _interopRequireDefault(_Index);

var _AuthStatus = require('./AuthStatus');

var _AuthStatus2 = _interopRequireDefault(_AuthStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config({ silent: true });
var secret = process.env.SECRET || '$3CRET AG3NT';

/**
 * Authentication
 * Authenticates and grants access based on usertype
 */

var Authentication = function () {
  function Authentication() {
    _classCallCheck(this, Authentication);
  }

  _createClass(Authentication, null, [{
    key: 'verifyUser',


    /**
     * verifyUser
     * checks if the user is valid before authorising
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @param {Function} next - run next func
     * @return {null} no return value
     */
    value: function verifyUser(req, res, next) {
      var token = req.headers.authorization || req.headers['x-access-token'];

      if (!token) return _AuthStatus2.default.unauthorized(res, 401, false);
      _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
        if (err) {
          return _AuthStatus2.default.authFail(res, 501, false, err);
        }

        req.decoded = decoded;
        next();
      });
    }

    /**
     * verifyAdmin
     * checks if the user is an admin authorising
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @param {Function} next - run next func
     * @return {null} no return value
     */

  }, {
    key: 'verifyAdmin',
    value: function verifyAdmin(req, res, next) {
      _Index2.default.Roles.findById(req.decoded.roleId).then(function (role) {
        if (role.dataValues.title !== 'admin') {
          return _AuthStatus2.default.forbid(res, 403, false);
        }
        next();
      });
    }

    /**
     * checkUserRouteAccess
     * checks if the user is authorised
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @param {Function} next - run next func
     * @return {Null|Object} response object | no return value
     */

  }, {
    key: 'checkUserRouteAccess',
    value: function checkUserRouteAccess(req, res, next) {
      if (String(req.decoded.userId) === req.params.id || req.decoded.roleId === 1) {
        next();
      } else {
        return _AuthStatus2.default.forbid(res, 403, false);
      }
    }

    /**
     * checkUserRouteAccess
     * checks if the user is an admin authorising
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @param {Function} next - run next func
     * @return {Null|Object} response object | no return value
     */

  }, {
    key: 'logout',
    value: function logout(req, res, next) {
      var token = req.headers.authorization || req.headers['x-access-token'];
      var decoded = req.decoded;

      if (token && decoded) {
        delete req.headers.authorization;
        delete req.headers['x-access-token'];
        delete req.decoded;
        next();
      }
    }
  }]);

  return Authentication;
}();

exports.default = Authentication;