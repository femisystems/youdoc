'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Db = require('../models/Index');
var Status = require('../middleware/ActionStatus');

var details = {
  owner: ['id', 'username'],
  role: ['id', 'title']
};

/**
 * @class TypeCtrl
 * @classdesc Creates and manages document types
 */

var TypeCtrl = function () {
  function TypeCtrl() {
    _classCallCheck(this, TypeCtrl);
  }

  _createClass(TypeCtrl, null, [{
    key: 'createType',

    /**
     * createType
     * creates a new type
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Null} no return value
     */
    value: function createType(req, res) {
      var body = {
        title: req.body.title.toLowerCase(),
        ownerId: 1
      };

      Db.Types.create(body).then(function (type) {
        return Status.postOk(res, 201, true, 'type', type);
      }).catch(function (err) {
        return Status.postFail(res, 500, false, 'type', err);
      });
    }

    /**
     * listTypes
     * fetch all from types
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Null} no return value
     */

  }, {
    key: 'listTypes',
    value: function listTypes(req, res) {
      var query = {
        include: [{
          model: Db.Users,
          attributes: details.owner,
          include: [{
            model: Db.Roles,
            attributes: details.role
          }]
        }]
      };

      Db.Types.findAll(query).then(function (types) {
        if (types.length < 1) {
          return Status.notFound(res, 404, false, 'type');
        }
        Status.getOk(res, 200, true, 'type', types);
      }).catch(function (err) {
        return Status.postFail(res, 500, false, 'type', err);
      });
    }

    /**
     * getType
     * find type by id
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'getType',
    value: function getType(req, res) {
      var query = {
        where: {
          id: req.params.id
        },
        include: [{
          model: Db.Users,
          attributes: details.owner,
          include: [{
            model: Db.Roles,
            attributes: details.role
          }]
        }]
      };

      Db.Types.findOne(query).then(function (type) {
        if (!type) {
          return Status.notFound(res, 404, false, 'type');
        }
        Status.getOk(res, 200, true, 'type', type);
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'type', err);
      });
    }

    /**
     * updateType
     * update type by id
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'updateType',
    value: function updateType(req, res) {
      Db.Types.findById(req.params.id).then(function (type) {
        if (type) {
          type.update(req.body).then(function (updatedType) {
            if (updatedType) {
              return Status.putOk(res, 200, true, 'type', updatedType);
            }
          }).catch(function (err) {
            return Status.putFail(res, 500, false, 'type', err);
          });
        } else {
          Status.notFound(res, 404, false, 'type');
        }
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'type', err);
      });
    }

    /**
     * deleteType
     * remove/destroy type
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'deleteType',
    value: function deleteType(req, res) {
      var query = {
        where: {
          id: req.params.id
        }
      };

      Db.Types.destroy(query).then(function () {
        return Status.deleteOk(res, true, 'type');
      }).catch(function (err) {
        return Status.deleteFail(res, 500, false, 'type', err);
      });
    }
  }]);

  return TypeCtrl;
}();

module.exports = TypeCtrl;