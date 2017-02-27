import express from 'express';
import RoleCtrl from '../controllers/RoleCtrl';
import Auth from '../middleware/Auth';

const Router = express.Router();

// Roles
Router.route('/')
  .get(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.listRoles)
  .post(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.createRole);

// Single role
Router.route('/:id')
  .get(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.getRole);

export default Router;
