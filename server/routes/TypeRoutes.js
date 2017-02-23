const Router = require('express').Router();
const TypeCtrl = require('../controllers/TypeCtrl');
const Auth = require('../middlewares/Auth');

Router.route('/')
  .get(Auth.verifyUser, TypeCtrl.listTypes)
  .post(Auth.verifyUser, Auth.verifyAdmin, TypeCtrl.createType);

Router.route('/:id')
  .get(Auth.verifyUser, TypeCtrl.getType)
  .put(Auth.verifyUser, Auth.verifyAdmin, TypeCtrl.updateType)
  .delete(Auth.verifyUser, Auth.verifyAdmin, TypeCtrl.deleteType);

module.exports = Router;
