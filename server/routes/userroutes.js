const Router = require('express').Router();
const UserCtrl = require('../controllers/UserCtrl');
const DocCtrl = require('../controllers/DocCtrl');
const Auth = require('../controllers/Auth');

// Users
Router.route('/')
  .get()
  .post();

// Single user
Router.route('/:id')
  .get()
  .put()
  .delete();

// All documents created by a single user
Router.get('/:id/documents');

// Login
Router.post('/login');

// Logout
Router.post('/logout');

module.exports = Router;
