const Router = require('express').Router();
const DocCtrl = require('../controllers/DocCtrl');
const Auth = require('../middlewares/Auth');

// // Documents
// Router.route('/')
//   .get(Auth.verifyUser, DocCtrl.listDocs)
//   .post(Auth.verifyUser, DocCtrl.createDoc);
//
// // Single document
// Router.route('/:d')
//   .get(Auth.verifyUser, DocCtrl.getDoc)
//   .put(Auth.verifyUser, DocCtrl.updateDoc)
//   .delete(Auth.verifyUser, DocCtrl.deleteDoc);

// Documents
Router.route('/')
  .get((req, res) => {
    res.send('get documents');
  })
  .post((req, res) => {
    res.send('create document');
  });

// Single document
Router.route('/:d')
  .get((req, res) => {
    res.send('get a doc');
  })
  .put((req, res) => {
    res.send('edit document');
  })
  .delete((req, res) => {
    res.send('delete doc');
  });

module.exports = Router;
