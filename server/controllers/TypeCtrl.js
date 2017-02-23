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

      _Index2.default.Types.create(body).then(function (type) {
        return _ActionStatus2.default.postOk(res, 201, true, 'type', type);
      }).catch(function (err) {
        return _ActionStatus2.default.postFail(res, 500, false, 'type', err);
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
          model: _Index2.default.Users,
          attributes: details.owner,
          include: [{
            model: _Index2.default.Roles,
            attributes: details.role
          }]
        }]
      };

      _Index2.default.Types.findAll(query).then(function (types) {
        if (types.length < 1) {
          return _ActionStatus2.default.notFound(res, 404, false, 'type');
        }
        _ActionStatus2.default.getOk(res, 200, true, 'type', types);
      }).catch(function (err) {
        return _ActionStatus2.default.postFail(res, 500, false, 'type', err);
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
          model: _Index2.default.Users,
          attributes: details.owner,
          include: [{
            model: _Index2.default.Roles,
            attributes: details.role
          }]
        }]
      };

      _Index2.default.Types.findOne(query).then(function (type) {
        if (!type) {
          return _ActionStatus2.default.notFound(res, 404, false, 'type');
        }
        _ActionStatus2.default.getOk(res, 200, true, 'type', type);
      }).catch(function (err) {
        return _ActionStatus2.default.getFail(res, 500, false, 'type', err);
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
      _Index2.default.Types.findById(req.params.id).then(function (type) {
        if (type) {
          type.update(req.body).then(function (updatedType) {
            if (updatedType) {
              return _ActionStatus2.default.putOk(res, 200, true, 'type', updatedType);
            }
          }).catch(function (err) {
            return _ActionStatus2.default.putFail(res, 500, false, 'type', err);
          });
        } else {
          _ActionStatus2.default.notFound(res, 404, false, 'type');
        }
      }).catch(function (err) {
        return _ActionStatus2.default.getFail(res, 500, false, 'type', err);
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

      _Index2.default.Types.destroy(query).then(function () {
        return _ActionStatus2.default.deleteOk(res, true, 'type');
      }).catch(function (err) {
        return _ActionStatus2.default.deleteFail(res, 500, false, 'type', err);
      });
    }
  }]);

  return TypeCtrl;
}();

exports.default = TypeCtrl;