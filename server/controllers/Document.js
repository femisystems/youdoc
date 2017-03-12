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
    Db.Documents.create(req.body)
      .then((document) => {
        Status.postOk(res, 'document', document);
      })
      .catch(err => Status.postFail(res, 400, 'document', err.errors[0].message));
  }


  /**
   * getDoc
   * find document by id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getDoc(req, res) {
    Db.sequelize.query(req.rawQuery, {
      type: Db.sequelize.QueryTypes.SELECT
    })
    .then((document) => {
      if (!document[0]) {
        return Status.notFound(res, 'document');
      }
      Status.getOk(res, 'document', document[0]);
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
    Db.sequelize.query(req.rawQuery, {
      types: Db.sequelize.QueryTypes.SELECT
    })
    .then((documents) => {
      if (!documents[0] || documents[0].length < 1) {
        return Status.notFound(res, 'document');
      }
      Status.getOk(res, 'document', { owner: req.ownerData, documents: documents[0] });
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
    Db.sequelize.query(req.rawQuery, {
      type: Db.sequelize.QueryTypes.SELECT
    })
    .then((documents) => {
      if (documents.length < 1) {
        return Status.notFound(res, 'document');
      }
      Status.getOk(res, 'document', documents);
    });
  }
}

export default DocCtrl;
