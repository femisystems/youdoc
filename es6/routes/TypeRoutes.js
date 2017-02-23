import express from 'express';
import TypeCtrl from '../controllers/TypeCtrl';
import Auth from '../middleware/Auth';

const Router = express.Router();

Router.route('/')
  .get(Auth.verifyUser, TypeCtrl.listTypes)
  .post(Auth.verifyUser, Auth.verifyAdmin, TypeCtrl.createType);

Router.route('/:id')
  .get(Auth.verifyUser, TypeCtrl.getType)
  .put(Auth.verifyUser, Auth.verifyAdmin, TypeCtrl.updateType)
  .delete(Auth.verifyUser, Auth.verifyAdmin, TypeCtrl.deleteType);

export default Router;
