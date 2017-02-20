const Db = require('../models/Index');
const DocStatus = require('./StatusResponse/Doc');

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
    const newDocument = {
      title: req.body.title,
      content: req.body.content,
      accessLevel: req.body.accessLevel,
      ownerId: req.decoded.userId,
      typeId: req.body.typeId,
      updatedBy: req.decoded.userId
    };

    Db.Documents.create(newDocument)
      .then((document) => {
        res.status(201).send({
          msg: 'document saved',
          doc: document
        });
      })
      .catch((err) => {
        res.status(501).send({
          msg: 'Process failed',
          error: err.errors
        });
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
    Db.Documents.findAll()
      .then((documents) => {
        if (!documents.length) return res.status(404).send({ msg: 'No docs yet' });
        res.send(documents);
      })
      .catch((err) => {
        res.status(501).send({
          msg: 'Process failed',
          error: err.errors
        });
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
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Documents.findOne(query)
      .then((document) => {
        res.send({
          status: 'success',
          document
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: 'fail',
          error: err.errors
        });
      });
  }

  /**
   * getDoc
   * find document by user id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getUserDocs(req, res) {
    const query = DocCtrl.queryBuilder(req);
    Db.Documents.find(query)
      .then((documents) => {
        if (!documents.length) {
          return res.status(404).send({
            message: 'No documents found for this user'
          });
        }
        res.send({
          status: 'success',
          documents
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: 'fail',
          error: err.errors
        });
      });
  }

  /**
   * getGenreDocs
   * find document by genre id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getTypeDocs(req, res) {
    const query = {
      where: {
        typeId: req.params.id
      }
    };

    Db.Documents.findAll(query)
      .then((documents) => {
        res.send({
          status: 'success',
          documents
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: 'fail',
          error: err.errors
        });
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
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Documents.update(query, req.body)
      .then((document) => {
        res.send({ status: 'success', document });
      })
      .catch((err) => {
        res.status(500).send({
          status: 'fail',
          error: err.errors
        });
      });
  }

  /**
   * deleteDoc
   * remove/destroy doc by id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static deleteDoc(req, res) {
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Documents.destroy(query)
      .then(() => {
        res.send(DocStatus.DELSUCCESS);
      })
      .catch((err) => {
        res.status(500).send({ status: 'fail', error: err.errors });
      });
  }

  /**
   * compareRoles
   * upon request, compares if requester role level === owner role level
   * @param {String} requesterRoleId - requester roleId
   * @param {String} ownerId - doc owner roleId
   * @return {Boolean} true/false
   */
  static compareRoles(requesterRoleId, ownerId) {
    const ree = Db.Users.findById(ownerId)
      .then((user) => {
        return user.dataValues.roleId === requesterRoleId;
      });
    console.log(ree);

  }

  /**
   * queryBuilder
   * builds document request query based on role and permission
   * @param {Object} req - request object
   * @return {Object} query - clean query
   */
  static queryBuilder(req) {
    Db.Users.findById(req.params.id)
      .then((user) => {
        if (parseInt(req.params.id, 10) === req.decoded.userId ||
          req.decoded.roleId === 1) {
          /**
           * if user or admin tries to view user documents
           * return all documents regardless of their access level
           */
          query = {
            where: {
              ownerId: req.params.id
            }
          };
        } else if (DocCtrl.compareRoles(req.decoded.roleId, req.params.id)) {
          /**
           * else if user shares the same role with requester
           * return all 'public' and 'role' level documents
           */
          query = {
            where: {
              $and: {
                ownerId: req.params.id,
                accessLevel: {
                  $like: {
                    $any: ['role', 'public']
                  }
                }
              }
            }
          };
        } else {
          /**
           * finally, if user shares no common attribute with requester
           * return public documents only.
           */
          query = {
            where: {
              $and: { ownerId: req.params.id, accessLevel: 'public' }
            }
          };
        }
      });
    return query;
  }

}

module.exports = DocCtrl;
