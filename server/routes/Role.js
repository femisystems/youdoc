import express from 'express';
import RoleCtrl from '../controllers/Role';
import Auth from '../middleware/Auth';

const Router = express.Router();

// Roles
Router.route('/')
  .get(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.listRoles)
  .post(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.createRole);

// Single role
Router.route('/:id')
  .get(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.getRole)
  .delete(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.deleteRole);

export default Router;
