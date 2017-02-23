const Router = require('express').Router();
const DocCtrl = require('../controllers/DocCtrl');
const Auth = require('../middlewares/Auth');

// Documents
Router.route('/')
  .get(Auth.verifyUser, DocCtrl.listDocs)
  .post(Auth.verifyUser, DocCtrl.createDoc);

// Search
Router.get('/search', Auth.verifyUser, DocCtrl.search);

// Single document
Router.route('/:id')
  .get(Auth.verifyUser, Auth.checkUserRouteAccess, DocCtrl.getDoc)
  .put(Auth.verifyUser, Auth.checkUserRouteAccess, DocCtrl.updateDoc)
  .delete(Auth.verifyUser, Auth.checkUserRouteAccess, DocCtrl.deleteDoc);



module.exports = Router;
