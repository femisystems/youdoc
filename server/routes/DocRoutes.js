const Router = require('express').Router();
const docCtrl = require('../controllers/DocCtrl');
const Auth = require('../controllers/Auth');

// Documents
Router.route('/')
  .get()
  .post();

// Single document
Router.route('/:d')
  .get()
  .put()
  .delete();
