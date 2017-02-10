const Router = require('express').Router();
const RoleCtrl = require('../controllers/RoleCtrl');
const Auth = require('../middlewares/Auth');

// Roles
Router.route('/')
  // .get(Auth.verifyUser, RoleCtrl.listRoles)
  // .post(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.createRole);
  .get(RoleCtrl.listRoles)
  .post(RoleCtrl.createRole);

// Single role
Router.route('/:id')
  .get(Auth.verifyUser, RoleCtrl.getRole)
  .put(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.editRole)
  .delete(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.deleteRole);

module.exports = Router;
