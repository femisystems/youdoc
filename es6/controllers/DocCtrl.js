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
    const newDocument = {
      title: req.body.title,
      content: req.body.content,
      accessLevel: req.body.accessLevel || 'private',
      ownerId: req.decoded.userId,
      ownerRoleId: req.decoded.roleId,
      typeId: req.body.typeId
    };

    Db.Documents
      .create(newDocument)
      .then((document) => {
        Status.postOk(res, 201, true, 'document', document);
      })
      .catch((err) => {
        Status.postFail(res, 501, false, 'document', err);
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
    Db.Documents
      .findAll()
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
    Db.Documents
      .findById(req.params.id)
      .then((document) => {
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
    Db.Users
      .findById(req.params.id)
      .then((user) => {
        const query = {
          attributes: { exclude: ['ownerRoleId'] },
          include: [
            {
              model: Db.Users,
              attributes: ['id', 'username', 'roleId']
            }
          ]
        };

        // if user is self or admin => return all docs
        if ((req.decoded.roleId === 1) || (parseInt(req.params.id, 10) === req.decoded.userId)) {
          query.where = {
            ownerId: parseInt(req.params.id, 10)
          };
        } else if (req.decoded.roleId === user.dataValues.roleId) {
          // if user shares same role => send public and rolebased docs
          query.where = {
            ownerId: parseInt(req.params.id, 10),
            $not: { accessLevel: 'private' },
            ownerRoleId: req.decoded.roleId
          };
        } else {
          // default => send public docs
          query.where = {
            ownerId: parseInt(req.params.id, 10),
            accessLevel: 'public'
          };
        }

        Db.Documents
          .findAll(query)
          .then((documents) => {
            if (documents.length < 1) {
              return Status.notFound(res, 404, false, 'document');
            }
            Status.getOk(res, 200, true, 'document', documents);
          })
          .catch(err => Status.getFail(res, 500, false, 'document', err));
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
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Documents
      .update(query, req.body)
      .then((document) => {
        Status.putOk(res, 200, true, 'document', document);
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
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Documents
      .destroy(query)
      .then(() => Status.deleteOk(res, 200, true, 'document'))
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
    const query = DocCtrl.buildQuery(req, res);

    if (query) {
      Db.Documents
        .findAll(query)
        .then((documents) => {
          if (documents.length > 0) {
            return Status.getOk(res, 200, true, 'document', documents);
          }
          Status.notFound(res, 404, false, 'document');
        })
        .catch(err => Status.getFail(res, 500, false, 'document', err));
    } else {
      Status.queryFail(res, 400, false);
    }
  }

  /**
   * buildQuery
   * build search query based on user input
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Object} query - a clean usable query
   */
  static buildQuery(req, res) {
    const query = {};
    const keys = {
      queryString: req.query.q.match(/\w+/g),
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      ownerId: req.query.ownerId || req.decoded.userId,
      sortBy: req.query.sortBy || 'createdAt',
      order: req.query.order || 'ASC',
      typeId: req.query.type
    };

    if (Object.keys(req.query).length < 1) {
      res.status(400).send({ msg: 'Search parameters cannot be empty' });
    }

    // if requester is an admin
    if (req.decoded.roleId === 1) {
      query.where = {
        $and: [{ ownerId: keys.ownerId }]
      };
    } else if (parseInt(keys.ownerId, 10) === req.decoded.userId) {
      query.where = {
        $and: [{
          $or: [{ accessLevel: 'public' }, { ownerId: req.decoded.userId }]
        }]
      };
    } else {
      query.where = {
        $and: [{
          $or: [
            { accessLevel: 'public' },
            {
              $and: [{
                ownerRoleId: req.decoded.roleId,
                $not: { accessLevel: 'private' }
              }]
            }
          ]
        }]
      };
    }

    // if queryString != null, append to base query
    if (keys.queryString) {
      query.where.$and.push({
        $or: [
          { title: { $ilike: { $any: `%${keys.queryString}%` } } },
          { content: { $ilike: { $any: `%${keys.queryString}%` } } }
        ]
      });
    }

    // if limit exists, append to base query
    if (keys.page && keys.page > 0) {
      query.limit = keys.limit;
    } else {
      res.send({ msg: 'limit cannot be null' });
    }

    // if page exists, append to base query
    if (keys.page > 0) {
      query.offset = (keys.page - 1) * keys.limit;
    }

    // if type exists, append to base query
    if (keys.typeId) {
      query.where.$and.push({
        typeId: keys.typeId
      });
      query.include = [
        {
          model: Db.Types,
          attributes: ['id', 'title']
        }
      ];
    }

    // append sorting and ordering
    query.order = [[keys.sortBy, keys.order]];

    // append owner details
    query.include.push({
      model: Db.Users,
      attributes: ['id', 'firstName', 'lastName', 'email', 'username']
    });

    return query;
  }
}

export default DocCtrl;
