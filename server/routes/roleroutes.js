const Router = require('express').Router();
const RoleCtrl = require('../controllers/RoleCtrl');
const Auth = require('../controllers/Auth');

// Roles
Router.route('/')
  .get()
  .post();

// Single role
Router.route('/:id')
  .get()
  .put()
  .delete();
