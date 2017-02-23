'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ActionStatus
 * @classdesc CRUD action responses
 */
var ActionStatus = function () {
  function ActionStatus() {
    _classCallCheck(this, ActionStatus);
  }

  _createClass(ActionStatus, null, [{
    key: 'postFail',

    // Documents, user, role, types

    /**
     * postFail(501)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {String} scope - ['document', 'user', 'role', 'type']
     * @param {Object} err - error object
     * @return {Object} res - response object
     */
    value: function postFail(res, code, status, scope, err) {
      return res.status(code).send({
        success: status,
        msg: 'Oops! Unable to create ' + scope + '(s). Please try again.',
        error: err
      });
    }

    /**
     * postOk(201)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {String} scope - ['document', 'user', 'role', 'type']
     * @param {String} scopeData - data returned
     * @return {Object} res - response object
     */

  }, {
    key: 'postOk',
    value: function postOk(res, code, status, scope, scopeData) {
      return res.status(code).send({
        success: status,
        msg: scope + '(s) successfully created.',
        data: scopeData
      });
    }

    /**
     * getFail(500)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {String} scope - ['document', 'user', 'role', 'type']
     * @param {Object} err - error object
     * @return {Object} res - response object
     */

  }, {
    key: 'getFail',
    value: function getFail(res, code, status, scope, err) {
      return res.status(code).send({
        success: status,
        msg: 'Sorry! Unable to reach ' + scope + '(s). Please try again.',
        error: err
      });
    }

    /**
     * notFound(404)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {String} scope - ['document', 'user', 'role', 'type']
     * @return {Object} res - response object
     */

  }, {
    key: 'notFound',
    value: function notFound(res, code, status, scope) {
      return res.status(code).send({
        success: status,
        msg: 'Sorry! ' + scope + '(s) not found.'
      });
    }

    /**
     * getOk(200)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {String} scope - ['document', 'user', 'role', 'type']
     * @param {String} scopeData - data returned
     * @return {Object} res - response object
     */

  }, {
    key: 'getOk',
    value: function getOk(res, code, status, scope, scopeData) {
      return res.status(code).send({
        success: status,
        msg: scope + '(s) successfully retrieved.',
        data: scopeData
      });
    }

    /**
     * putFail(501)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {String} scope - ['document', 'user', 'role', 'type']
     * @param {Object} err - error object
     * @return {Object} res - response object
     */

  }, {
    key: 'putFail',
    value: function putFail(res, code, status, scope, err) {
      return res.status(code).send({
        success: status,
        msg: 'Oops! Unable to update ' + scope + '(s). Please try again.',
        error: err
      });
    }

    /**
     * putOk(200)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {String} scope - ['document', 'user', 'role', 'type']
     * @param {String} scopeData - data returned
     * @return {Object} res - response object
     */

  }, {
    key: 'putOk',
    value: function putOk(res, code, status, scope, scopeData) {
      return res.status(code).send({
        success: status,
        msg: scope + '(s) successfully updated.',
        data: scopeData
      });
    }

    /**
     * deleteFail(500)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @param {String} scope - ['document', 'user', 'role', 'type']
     * @param {Object} err - error object
     * @return {Object} res - response object
     */

  }, {
    key: 'deleteFail',
    value: function deleteFail(res, code, status, scope, err) {
      return res.status(code).send({
        success: status,
        msg: 'Oops! Unable to delete ' + scope + '(s). Please try again.',
        error: err
      });
    }

    /**
     * deleteOk
     * @param {Object} res - response object
     * @param {Boolean} status - true/false
     * @param {String} scope - ['document', 'user', 'role', 'type']
     * @return {Object} res - response object
     */

  }, {
    key: 'deleteOk',
    value: function deleteOk(res, status, scope) {
      return res.send({
        success: status,
        msg: scope + '(s) successfully deleted.'
      });
    }

    /**
     * queryFail(400)
     * @param {Object} res - response object
     * @param {Number} code - status code
     * @param {Boolean} status - true/false
     * @return {Object} res - response object
     */

  }, {
    key: 'queryFail',
    value: function queryFail(res, code, status) {
      return res.send({
        success: status,
        msg: 'Query not properly formatted'
      });
    }
  }]);

  return ActionStatus;
}();

exports.default = ActionStatus;