import express from 'express';
import DocCtrl from '../controllers/Document';
import Auth from '../middleware/Auth';
import Utils from '../controllers/Utils';

const Router = express.Router();

// Documents
Router.route('/')
  .get(Auth.verifyUser, Utils.search, DocCtrl.search)
  .post(Auth.verifyUser, Utils.docExists, DocCtrl.createDoc);

// Search
Router.get('/search', Auth.verifyUser, Utils.search, DocCtrl.search);

// Single document
Router.route('/:id')
  .get(Auth.verifyUser, Utils.buildSingleDocQuery, DocCtrl.getDoc)
  .put(Auth.verifyUser, Auth.checkDocWriteAccess, Utils.docExists, DocCtrl.updateDoc)
  .delete(Auth.verifyUser, Auth.checkDocWriteAccess, DocCtrl.deleteDoc);

export default Router;
