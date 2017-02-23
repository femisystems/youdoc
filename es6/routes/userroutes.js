import Router from 'express';
import UserCtrl from '../controllers/UserCtrl';
import DocCtrl from '../controllers/DocCtrl';
import Auth from '../middleware/Auth';

Router = Router.Router();

Router.route('/')
  .get(Auth.verifyUser, Auth.verifyAdmin, UserCtrl.listUsers)
  .post(UserCtrl.createUser);

// Single user
Router.route('/:id')
  .get(Auth.verifyUser, Auth.checkUserRouteAccess, UserCtrl.getUser)
  .put(Auth.verifyUser, Auth.checkUserRouteAccess, UserCtrl.updateUser)
  .delete(Auth.verifyUser, Auth.verifyAdmin, UserCtrl.deleteUser);

// All documents created by a single user
Router.get('/:id/documents', Auth.verifyUser, DocCtrl.getUserDocs);

// Login
Router.post('/login', UserCtrl.login);

// Logout
Router.post('/logout', Auth.verifyUser, Auth.logout, UserCtrl.logout);

export default Router;
