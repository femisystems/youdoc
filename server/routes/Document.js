import express from 'express';
import DocCtrl from '../controllers/Document';
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
  .get(Auth.verifyUser, Auth.checkDocReadAccess, DocCtrl.getDoc)
  .put(Auth.verifyUser, Auth.checkDocWriteAccess, DocCtrl.updateDoc)
  .delete(Auth.verifyUser, Auth.checkDocWriteAccess, DocCtrl.deleteDoc);

export default Router;
