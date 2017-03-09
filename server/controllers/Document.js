import Db from '../models/Index';
import Status from '../middleware/ActionStatus';

/**
 * @class DocCtrl
 * @classdesc Create and manage documents
 */
class DocCtrl {
  /**
   * createDoc
   * create a new document
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static createDoc(req, res) {
    Db.Documents.create(req.docData)
      .then((document) => {
        Status.postOk(res, 'document', document);
      })
      .catch(err => Status.postFail(res, 400, 'document', err.errors[0].message));
  }

  /**
   * listDocs
   * fetch all from documents
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static listDocs(req, res) {
    // return console.log(req.searchQuery);
    Db.Documents.findAll(req.searchQuery)
      .then((documents) => {
        if (documents.length < 1) {
          return Status.notFound(res, 'document');
        }
        Status.getOk(res, 'document', documents);
      });
  }

  /**
   * getDoc
   * find document by id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getDoc(req, res) {
    Db.Documents.findOne(req.searchQuery)
      .then((document) => {
        if (!document) {
          return Status.notFound(res, 'document');
        }
        Status.getOk(res, 'document', document);
      })
      .catch(() => Status.getFail(res, 400, 'document', 'Invalid input'));
  }

  /**
   * getUserDocs
   * find document by user id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getUserDocs(req, res) {
    Db.Documents.findAll(req.searchQuery)
      .then((documents) => {
        if (!documents || documents.length < 1) {
          return Status.notFound(res, 'document');
        }
        Status.getOk(res, 'document', { owner: req.ownerData, documents });
      });
  }

  /**
   * updateDoc
   * update document by id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static updateDoc(req, res) {
    req.document.update(req.body)
      .then((updatedDoc) => {
        Status.putOk(res, 'document', updatedDoc);
      })
      .catch(err => Status.putFail(res, 400, 'document', err.errors[0].message));
  }

  /**
   * deleteDoc
   * remove/destroy doc by id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static deleteDoc(req, res) {
    req.document.destroy()
      .then(() => Status.deleteOk(res, 'document'));
  }

  /**
   * search
   * search documents table based on query params
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static search(req, res) {
    Db.Documents.findAll(req.searchQuery)
      .then((documents) => {
        if (documents && documents.length > 0) {
          Status.getOk(res, 'document', documents);
        } else {
          Status.notFound(res, 'document');
        }
      });
  }
}

export default DocCtrl;
