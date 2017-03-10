import express from 'express';
import UserCtrl from '../controllers/User';
import DocCtrl from '../controllers/Document';
import Utils from '../controllers/Utils';
import Auth from '../middleware/Auth';

const Router = express.Router();

Router.route('/')
  .post(UserCtrl.createUser)
  .get(Auth.verifyUser, Utils.buildUserSearchQuery, UserCtrl.listUsers);

// Single user
Router.route('/:id')
  .get(Auth.verifyUser, Utils.buildUserSearchQuery, UserCtrl.getUser)
  .put(Auth.verifyUser, Auth.checkUserWriteAccess, UserCtrl.updateUser)
  .delete(Auth.verifyUser, Auth.verifyAdmin, UserCtrl.deleteUser);

// All documents created by a single user
Router.get('/:id/documents', Auth.verifyUser, Utils.fetchOwnerData, DocCtrl.getUserDocs);

// Login
Router.post('/login', Auth.login);

// Logout
Router.post('/logout', Auth.verifyUser, Auth.logout);

export default Router;
