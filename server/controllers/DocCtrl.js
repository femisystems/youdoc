'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Db = require('../models/Index');
var Status = require('../middleware/ActionStatus');

/**
 * @class DocCtrl
 * @classdesc Create and manage documents
 */

var DocCtrl = function (_Status) {
  _inherits(DocCtrl, _Status);

  function DocCtrl() {
    _classCallCheck(this, DocCtrl);

    return _possibleConstructorReturn(this, (DocCtrl.__proto__ || Object.getPrototypeOf(DocCtrl)).apply(this, arguments));
  }

  _createClass(DocCtrl, null, [{
    key: 'createDoc',

    /**
     * createDoc
     * create a new document
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */
    value: function createDoc(req, res) {
      var newDocument = {
        title: req.body.title,
        content: req.body.content,
        accessLevel: req.body.accessLevel || 'private',
        ownerId: req.decoded.userId,
        ownerRoleId: req.decoded.roleId,
        typeId: req.body.typeId
      };

      Db.Documents.create(newDocument).then(function (document) {
        Status.postOk(res, 201, true, 'document', document);
      }).catch(function (err) {
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

  }, {
    key: 'listDocs',
    value: function listDocs(req, res) {
      Db.Documents.findAll().then(function (documents) {
        if (documents.length < 1) {
          return Status.notFound(res, 404, false, 'document');
        }
        Status.getOk(res, 200, true, 'document', documents);
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'document', err);
      });
    }

    /**
     * getDoc
     * find document by id
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'getDoc',
    value: function getDoc(req, res) {
      Db.Documents.findById(req.params.id).then(function (document) {
        Status.getOk(res, 200, true, 'document', document);
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'document', err);
      });
    }

    /**
     * getUserDocs
     * find document by user id
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'getUserDocs',
    value: function getUserDocs(req, res) {
      Db.Users.findById(req.params.id).then(function (user) {
        var query = {
          attributes: { exclude: ['ownerRoleId'] },
          include: [{
            model: Db.Users,
            attributes: ['id', 'username', 'roleId']
          }]
        };

        // if user is self or admin => return all docs
        if (req.decoded.roleId === 1 || parseInt(req.params.id, 10) === req.decoded.userId) {
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

        Db.Documents.findAll(query).then(function (documents) {
          if (documents.length < 1) {
            return Status.notFound(res, 404, false, 'document');
          }
          Status.getOk(res, 200, true, 'document', documents);
        }).catch(function (err) {
          return Status.getFail(res, 500, false, 'document', err);
        });
      }).catch(function (err) {
        return Status.getFail(res, 500, false, 'document', err);
      });
    }

    /**
     * updateDoc
     * update document by id
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'updateDoc',
    value: function updateDoc(req, res) {
      var query = {
        where: {
          id: req.params.id
        }
      };

      Db.Documents.update(query, req.body).then(function (document) {
        Status.putOk(res, 200, true, 'document', document);
      }).catch(function (err) {
        return Status.putFail(res, 500, false, 'document', err);
      });
    }

    /**
     * deleteDoc
     * remove/destroy doc by id
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'deleteDoc',
    value: function deleteDoc(req, res) {
      var query = {
        where: {
          id: req.params.id
        }
      };

      Db.Documents.destroy(query).then(function () {
        return Status.deleteOk(res, 200, true, 'document');
      }).catch(function (err) {
        return Status.deleteFail(res, 500, false, 'document', err);
      });
    }

    /**
     * search
     * search documents table based on query params
     * @param {Object} req - request object
     * @param {Object} res - response object
     * @return {Void} no return value
     */

  }, {
    key: 'search',
    value: function search(req, res) {
      var query = DocCtrl.buildQuery(req, res);

      if (query) {
        Db.Documents.findAll(query).then(function (documents) {
          if (documents.length > 0) {
            return Status.getOk(res, 200, true, 'document', documents);
          }
          Status.notFound(res, 404, false, 'document');
        }).catch(function (err) {
          return Status.getFail(res, 500, false, 'document', err);
        });
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

  }, {
    key: 'buildQuery',
    value: function buildQuery(req, res) {
      var query = {};
      var keys = {
        queryString: req.query.q,
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
            $or: [{ accessLevel: 'public' }, {
              $and: [{
                ownerRoleId: req.decoded.roleId,
                $not: { accessLevel: 'private' }
              }]
            }]
          }]
        };
      }

      // if queryString != null, append to base query
      if (keys.queryString) {
        query.where.$and.push({
          $or: [{ title: { $ilike: '%' + keys.queryString + '%' } }, { content: { $ilike: '%' + keys.queryString + '%' } }]
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
        query.include = [{
          model: Db.Types,
          attributes: ['id', 'title']
        }];
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
  }]);

  return DocCtrl;
}(Status);

module.exports = DocCtrl;