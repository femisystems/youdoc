import express from 'express';
import DocCtrl from '../controllers/DocCtrl';
import Auth from '../middleware/Auth';

const Router = express.Router();

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

export default Router;
