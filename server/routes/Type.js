import express from 'express';
import TypeCtrl from '../controllers/Type';
import Auth from '../middleware/Auth';

const Router = express.Router();

Router.route('/')
  .post(Auth.verifyUser, Auth.verifyAdmin, TypeCtrl.createType)
  .get(Auth.verifyUser, TypeCtrl.listTypes);

Router.route('/:id')
  .get(Auth.verifyUser, TypeCtrl.getType)
  .put(Auth.verifyUser, Auth.verifyAdmin, TypeCtrl.updateType)
  .delete(Auth.verifyUser, Auth.verifyAdmin, TypeCtrl.deleteType);

export default Router;
