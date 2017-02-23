'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Db = require('../models/Index');
var Status = require('../middleware/ActionStatus');

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
      Db.Roles.create({ title: req.body.title.toLowerCase() }).then(function (newRole) {
        return Status.postOk(res, 201, true, 'role', newRole);
      }).catch(function (err) {
        return Status.postFail(res, 501, false, 'role', err);
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
      Db.Roles.findAll({}).then(function (roles) {
        if (roles.length < 1) {
          return Status.notFound(res, 404, false, 'role');
        }
        Status.getOk(res, 200, true, 'role', roles);
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'role', err);
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
      Db.Roles.findById(req.params.id).then(function (role) {
        if (!role) {
          return Status.notFound(res, 404, false, 'role');
        }
        Status.getOk(res, 200, true, 'role', role);
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'role', err);
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
      Db.Roles.findById(req.params.id).then(function (role) {
        if (!role) {
          return Status.notFound(res, 404, false, 'role');
        }

        role.update(req.body).then(function (updatedRole) {
          if (updatedRole) {
            return Status.putOk(res, 200, true, 'role', updatedRole);
          }
        }).catch(function (err) {
          return Status.putFail(res, 501, false, 'role', err);
        });
      }).catch(function (err) {
        return Status.putFail(res, 500, false, 'role', err);
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
      Db.Roles.findById(req.params.id).then(function (role) {
        if (!role) {
          return Status.notFound(res, 404, false, 'role');
        }

        role.destroy().then(function () {
          return Status.deleteOk(res, true, 'role');
        });
      });
    }
  }]);

  return RoleCtrl;
}();

module.exports = RoleCtrl;