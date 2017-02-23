import Router from 'express';
import RoleCtrl from '../controllers/RoleCtrl';
import Auth from '../middleware/Auth';

Router = Router.Router();

// Roles
Router.route('/')
  .get(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.listRoles)
  .post(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.createRole);

// Single role
Router.route('/:id')
  .get(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.getRole)
  .put(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.editRole)
  .delete(Auth.verifyUser, Auth.verifyAdmin, RoleCtrl.deleteRole);

export default Router;
