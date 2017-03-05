import Db from '../models/Index';
import Status from '../middleware/ActionStatus';

/**
 * @class DocCtrl
 * @classdesc Create and manage documents
 */
class DocCtrl extends Status {
  /**
   * createDoc
   * create a new document
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static createDoc(req, res) {
    Db.Documents.create(req.body)
      .then((document) => {
        Status.postOk(res, 201, true, 'document', document);
      })
      .catch((err) => {
        Status.postFail(res, 500, false, 'document', err);
      });
  }

  /**
   * listDocs
   * fetch all from documents
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static listDocs(req, res) {
    Db.Documents.findAll(req.searchQuery)
      .then((documents) => {
        if (documents.length < 1) {
          return Status.notFound(res, 404, false, 'document');
        }
        Status.getOk(res, 200, true, 'document', documents);
      })
      .catch(err => Status.getFail(res, 500, false, 'document', err));
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
          return Status.notFound(res, 404, false, 'document');
        }
        Status.getOk(res, 200, true, 'document', document);
      })
      .catch(err => Status.getFail(res, 500, false, 'document', err));
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
          return Status.notFound(res, 404, false, 'document');
        }
        Status.getOk(res, 200, true, 'document', documents);
      })
      .catch(err => Status.getFail(res, 500, false, 'document', err));
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
        Status.putOk(res, 200, true, 'document', updatedDoc);
      })
    .catch(err => Status.putFail(res, 500, false, 'document', err));
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
      .then(() => Status.deleteOk(res, true, 'document'))
      .catch(err => Status.deleteFail(res, 500, false, 'document', err));
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
          Status.getOk(res, 200, true, 'document', documents);
        } else {
          Status.notFound(res, 404, false, 'document');
        }
      })
      .catch(err => Status.getFail(res, 500, false, 'document', err));
  }
}

export default DocCtrl;
