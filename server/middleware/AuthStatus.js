'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class AuthStatus
 * @classdesc auth request response
 */
var AuthStatus = function () {
  function AuthStatus() {
    _classCallCheck(this, AuthStatus);
  }

  _createClass(AuthStatus, null, [{
    key: 'unauthorized',

    // routes

    /**
     * unauthorizedRequest(401)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @return {Object} res - response object
     */
    value: function unauthorized(res, code, status) {
      return res.status(code).send({
        success: status,
        msg: 'Unauthorized! Signup or login to access this content.'
      });
    }

    /**
     * authFail(501)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {Object} err - error object
     * @return {Object} res - response object
     */

  }, {
    key: 'authFail',
    value: function authFail(res, code, status, err) {
      return res.status(code).send({
        success: status,
        msg: 'Authentication Failed!',
        error: err
      });
    }

    /**
     * forbid(403)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {Object} err - error object
     * @return {Object} res - response object
     */

  }, {
    key: 'forbid',
    value: function forbid(res, code, status) {
      return res.status(code).send({
        success: status,
        msg: 'Forbidden! This is a restricted content'
      });
    }

    /**
     * loginOk(200)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {Object} token - credential
     * @return {Object} res - response object
     */

  }, {
    key: 'loginOk',
    value: function loginOk(res, code, status, token) {
      return res.status(code).send({
        success: status,
        msg: 'You are now logged in.',
        userToken: token
      });
    }

    /**
     * loginFail(501)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {Object} err - error object
     * @return {Object} res - response object
     */

  }, {
    key: 'loginFail',
    value: function loginFail(res, code, status, err) {
      return res.status(code).send({
        success: status,
        msg: 'Unable to login at the moment. Try again.',
        error: err
      });
    }

    /**
     * ghostLogin(400)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @return {Object} res - response object
     */

  }, {
    key: 'ghostLogin',
    value: function ghostLogin(res, code, status) {
      return res.status(code).send({
        success: status,
        msg: 'Invalid username or password'
      });
    }

    /**
     * logoutOk
     * @param {Object} res - response object
     * @param {Boolean} status - true/false
     * @return {Object} res - response object
     */

  }, {
    key: 'logoutOk',
    value: function logoutOk(res, status) {
      return res.send({
        success: status,
        msg: 'You are now logged out.'
      });
    }
  }]);

  return AuthStatus;
}();

module.exports = AuthStatus;