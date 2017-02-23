'use strict';

var Router = require('express').Router();
var RoleCtrl = require('../controllers/RoleCtrl');
var Auth = require('../middleware/Auth');

// Roles
Router.route('/').get(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.listRoles).post(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.createRole);

// Single role
Router.route('/:id').get(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.getRole).put(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.editRole).delete(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.deleteRole);

module.exports = Router;