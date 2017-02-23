'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UserCtrl = require('../controllers/UserCtrl');

var _UserCtrl2 = _interopRequireDefault(_UserCtrl);

var _DocCtrl = require('../controllers/DocCtrl');

var _DocCtrl2 = _interopRequireDefault(_DocCtrl);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

Router.route('/').get(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _UserCtrl2.default.listUsers).post(_UserCtrl2.default.createUser);

// Single user
Router.route('/:id').get(_Auth2.default.verifyUser, _Auth2.default.checkUserRouteAccess, _UserCtrl2.default.getUser).put(_Auth2.default.verifyUser, _Auth2.default.checkUserRouteAccess, _UserCtrl2.default.updateUser).delete(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _UserCtrl2.default.deleteUser);

// All documents created by a single user
Router.get('/:id/documents', _Auth2.default.verifyUser, _DocCtrl2.default.getUserDocs);

// Login
Router.post('/login', _UserCtrl2.default.login);

// Logout
Router.post('/logout', _Auth2.default.verifyUser, _Auth2.default.logout, _UserCtrl2.default.logout);

exports.default = Router;