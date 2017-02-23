'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _TypeCtrl = require('../controllers/TypeCtrl');

var _TypeCtrl2 = _interopRequireDefault(_TypeCtrl);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

Router.route('/').get(_Auth2.default.verifyUser, _TypeCtrl2.default.listTypes).post(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _TypeCtrl2.default.createType);

Router.route('/:id').get(_Auth2.default.verifyUser, _TypeCtrl2.default.getType).put(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _TypeCtrl2.default.updateType).delete(_Auth2.default.verifyUser, _Auth2.default.verifyAdmin, _TypeCtrl2.default.deleteType);

exports.default = Router;