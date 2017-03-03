import express from 'express';
import UserCtrl from '../controllers/User';
import DocCtrl from '../controllers/Document';
import Auth from '../middleware/Auth';

const Router = express.Router();

Router.route('/')
  .post(UserCtrl.createUser)
  .get(Auth.verifyUser, Auth.verifyAdmin, UserCtrl.listUsers);

// Single user
Router.route('/:id')
  .get(Auth.verifyUser, Auth.checkUserRouteAccess, UserCtrl.getUser)
  .put(Auth.verifyUser, Auth.checkUserRouteAccess, UserCtrl.updateUser)
  .delete(Auth.verifyUser, Auth.verifyAdmin, UserCtrl.deleteUser);

// All documents created by a single user
Router.get('/:id/documents', Auth.verifyUser, DocCtrl.getUserDocs);

// Login
Router.post('/login', Auth.login);

// Logout
Router.post('/logout', Auth.verifyUser, Auth.logout);

export default Router;
