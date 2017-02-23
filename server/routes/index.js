'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RoleRoutes = require('./RoleRoutes');

var _RoleRoutes2 = _interopRequireDefault(_RoleRoutes);

var _UserRoutes = require('./UserRoutes');

var _UserRoutes2 = _interopRequireDefault(_UserRoutes);

var _TypeRoutes = require('./TypeRoutes');

var _TypeRoutes2 = _interopRequireDefault(_TypeRoutes);

var _DocRoutes = require('./DocRoutes');

var _DocRoutes2 = _interopRequireDefault(_DocRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  // Home route
  app.get('/', function (req, res) {
    res.send('Welcome!!');
  });

  // Use userRoutes
  app.use('/users', _UserRoutes2.default);

  // Use documentTypes
  app.use('/types', _TypeRoutes2.default);

  // Use DocRoutes
  app.use('/documents', _DocRoutes2.default);

  // Role routes
  app.use('/roles', _RoleRoutes2.default);
};