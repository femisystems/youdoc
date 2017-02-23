'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _RoleCtrl = require('../controllers/RoleCtrl');

var _RoleCtrl2 = _interopRequireDefault(_RoleCtrl);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

// Roles
Router.route('/').get(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _RoleCtrl2.default.listRoles).post(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _RoleCtrl2.default.createRole);

// Single role
Router.route('/:id').get(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _RoleCtrl2.default.getRole).put(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _RoleCtrl2.default.editRole).delete(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _RoleCtrl2.default.deleteRole);

exports.default = Router;