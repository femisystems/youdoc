'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _DocCtrl = require('../controllers/DocCtrl');

var _DocCtrl2 = _interopRequireDefault(_DocCtrl);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

// Documents
Router.route('/').get(_Auth2.default.verifyUser, _DocCtrl2.default.listDocs).post(_Auth2.default.verifyUser, _DocCtrl2.default.createDoc);

// Search
Router.get('/search', _Auth2.default.verifyUser, _DocCtrl2.default.search);

// Single document
Router.route('/:id').get(_Auth2.default.verifyUser, _Auth2.default.checkUserRouteAccess, _DocCtrl2.default.getDoc).put(_Auth2.default.verifyUser, _Auth2.default.checkUserRouteAccess, _DocCtrl2.default.updateDoc).delete(_Auth2.default.verifyUser, _Auth2.default.checkUserRouteAccess, _DocCtrl2.default.deleteDoc);

exports.default = Router;