const Router = require('express').Router();
const UserCtrl = require('../controllers/UserCtrl');
const DocCtrl = require('../controllers/DocCtrl');
const Auth = require('../middlewares/Auth');

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

module.exports = Router;
