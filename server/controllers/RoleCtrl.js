'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Index = require('../models/Index');

var _Index2 = _interopRequireDefault(_Index);

var _ActionStatus = require('../middleware/ActionStatus');

var _ActionStatus2 = _interopRequireDefault(_ActionStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * RoleCtrl
 * Responsible for creating new roles and fetching existing roles.
 * All the methods of this class are static
 */
var RoleCtrl = function () {
  function RoleCtrl() {
    _classCallCheck(this, RoleCtrl);
  }

  _createClass(RoleCtrl, null, [{
    key: 'createRole',


    /**
     * createRole
     * This method creates new role
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */
    value: function createRole(req, res) {
      _Index2.default.Roles.create({ title: req.body.title.toLowerCase() }).then(function (newRole) {
        return _ActionStatus2.default.postOk(res, 201, true, 'role', newRole);
      }).catch(function (err) {
        return _ActionStatus2.default.postFail(res, 501, false, 'role', err);
      });
    }

    /**
     * listRoles
     * This method fetches all existing roles
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'listRoles',
    value: function listRoles(req, res) {
      _Index2.default.Roles.findAll({}).then(function (roles) {
        if (roles.length < 1) {
          return _ActionStatus2.default.notFound(res, 404, false, 'role');
        }
        _ActionStatus2.default.getOk(res, 200, true, 'role', roles);
      }).catch(function (err) {
        return _ActionStatus2.default.getFail(res, 500, false, 'role', err);
      });
    }

    /**
     * getRole
     * This method fetches one role
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'getRole',
    value: function getRole(req, res) {
      _Index2.default.Roles.findById(req.params.id).then(function (role) {
        if (!role) {
          return _ActionStatus2.default.notFound(res, 404, false, 'role');
        }
        _ActionStatus2.default.getOk(res, 200, true, 'role', role);
      }).catch(function (err) {
        return _ActionStatus2.default.getFail(res, 500, false, 'role', err);
      });
    }

    /**
     * editRole
     * This method edits a role
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'editRole',
    value: function editRole(req, res) {
      _Index2.default.Roles.findById(req.params.id).then(function (role) {
        if (!role) {
          return _ActionStatus2.default.notFound(res, 404, false, 'role');
        }

        role.update(req.body).then(function (updatedRole) {
          if (updatedRole) {
            return _ActionStatus2.default.putOk(res, 200, true, 'role', updatedRole);
          }
        }).catch(function (err) {
          return _ActionStatus2.default.putFail(res, 501, false, 'role', err);
        });
      }).catch(function (err) {
        return _ActionStatus2.default.putFail(res, 500, false, 'role', err);
      });
    }

    /**
     * deleteRole
     * This method deletes a role from the db
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'deleteRole',
    value: function deleteRole(req, res) {
      _Index2.default.Roles.findById(req.params.id).then(function (role) {
        if (!role) {
          return _ActionStatus2.default.notFound(res, 404, false, 'role');
        }

        role.destroy().then(function () {
          return _ActionStatus2.default.deleteOk(res, true, 'role');
        });
      });
    }
  }]);

  return RoleCtrl;
}();

exports.default = RoleCtrl;