const Router = require('express').Router();
const DocCtrl = require('../controllers/DocCtrl');
const Auth = require('../middlewares/Auth');

// Documents
Router.route('/')
  .get(Auth.verifyUser, Auth.verifyAdmin, DocCtrl.listDocs)
  .post(Auth.verifyUser, DocCtrl.createDoc);

// Single document
Router.route('/:id')
  .get(Auth.verifyUser, Auth.checkUserRouteAccess, DocCtrl.getDoc)
  .put(Auth.verifyUser, Auth.checkUserRouteAccess, DocCtrl.updateDoc)
  .delete(Auth.verifyUser, Auth.checkUserRouteAccess, DocCtrl.deleteDoc);

module.exports = Router;
