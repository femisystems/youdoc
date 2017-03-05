import express from 'express';
import DocCtrl from '../controllers/Document';
import Auth from '../middleware/Auth';
import Utils from '../controllers/Utils';

const Router = express.Router();

// Documents
Router.route('/')
  .get(Auth.verifyUser, Utils.buildQuery, DocCtrl.listDocs)
  .post(Auth.verifyUser, DocCtrl.createDoc);

// Search
Router.get('/search', Auth.verifyUser, Utils.buildQuery, DocCtrl.search);

// Single document
Router.route('/:id')
  .get(Auth.verifyUser, Utils.buildQuery, DocCtrl.getDoc)
  .put(Auth.verifyUser, Auth.checkDocWriteAccess, DocCtrl.updateDoc)
  .delete(Auth.verifyUser, Auth.checkDocWriteAccess, DocCtrl.deleteDoc);

export default Router;
