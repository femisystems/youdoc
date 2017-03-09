import jwt from 'jsonwebtoken';
import Db from '../models/Index';
import Status from '../middleware/ActionStatus';

/**
 * @class Utils
 * @classdesc a helper class for most generally used
 * methods
 */
class Utils {

  /**
   * generateToken
   * generates jwt
   * @param {Object} user - userData
   * @param {String} secret - token secret
   * @return {Object} token
   */
  static generateToken(user, secret) {
    const payload = {
      userId: user.dataValues.id,
      username: user.dataValues.username,
      role: user.dataValues.role
    };

    const token = jwt.sign(payload, secret, { expiresIn: '24h' });
    return { token, expiresIn: '24 hours' };
  }

  /**
   * isAdmin
   * checks if a user is an admin
   * @param {Object} req - request object
   * @return {Bool} true/false
   */
  static isAdmin(req) {
    return req.decoded.role === 'admin';
  }

  /**
   * isAdminRoleUpdate
   * checks if a user is an admin
   * @param {Object} req - request object
   * @return {Bool} true/false
   */
  static isAdminRoleField(req) {
    return req.body.role && (parseInt(req.params.id, 10) === 1);
  }

  /**
   * buildUserSearchQuery
   * builds query for user search based on access levels
   * @param {Object} req - request object
   * @param {Object} res - request object
   * @param {Function} next - run next func
   * @return {Bool} true/false
   */
  static buildUserSearchQuery(req, res, next) {
    // base query to include user's attributes
    const query = {
      attributes: {
        exclude: ['password', 'activeToken']
      }
    };

    // if request is coming from /users route use custom query
    if (`${req.baseUrl}` === '/users') {
      if (Utils.isAdmin(req)) {
        query.where = {};
      } else {
        query.where = {
          id: req.decoded.userId
        };
      }
    }

    // request is coming from /users/:id route, use custom query
    if (`${req.baseUrl}${req.route.path}` === '/users/:id') {
      query.where = {
        id: parseInt(req.params.id, 10)
      };

      if (!Utils.isAdmin(req) && !(req.decoded.userId === parseInt(req.params.id, 10))) {
        query.attributes.exclude = ['id', 'role', 'email', 'password', 'createdAt', 'updatedAt', 'activeToken'];
      }
    }

    req.searchQuery = query;
    next();
  }

  /**
   * addPublicAccess
   * returns a partial query that adds public access to the base query
   * @param {Object} req - request object
   * @return {Object} public access
   */
  static addPublicAccess(req) {
    return {
      $or: [
        { accessLevel: 'public' },
        {
          $and: [
            { ownerRole: req.decoded.role },
            { accessLevel: 'role' }
          ]
        }
      ]
    };
  }

  /**
   * buildQuery
   * build search query based on user input
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Object} next - next function
   * @return {Null} no return value
   */
  static buildQuery(req, res, next) {
    // base query to include user's attributes
    const query = {
      where: {
        $and: []
      },
      include: [
        {
          model: Db.Users,
          attributes: ['firstName', 'lastName', 'username', 'role']
        }
      ]
    };

    // query keys
    const keys = {
      queryString: req.query.q || null,
      docType: req.query.type || null,
      role: req.query.role || null,
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      sortBy: req.query.sortBy || 'createdAt',
      order: req.query.order || 'ASC'
    };

    // if request is coming from document/search route use custom query
    if (`${req.baseUrl}${req.route.path}` === '/documents/search') {
      if (Utils.isAdmin(req)) {
        query.where = {
          $and: []
        };
      } else {
        query.where = {
          $and: [
            { $or: [
              { ownerId: req.decoded.userId },
              { accessLevel: 'public' },
              { $and: [
                { ownerRole: req.decoded.role },
                { accessLevel: 'role' }
              ] }
            ] }
          ]
        };
      }
    }

    // if request is coming from /users/:id/documents use custom query
    if (`${req.baseUrl}${req.route.path}` === '/users/:id/documents') {
      if (Utils.isAdmin(req) || (parseInt(req.params.id, 10) === req.decoded.userId)) {
        query.where = {
          $and: [
            { ownerId: parseInt(req.params.id, 10) }
          ]
        };
      } else {
        query.where = {
          $and: [
            { ownerId: parseInt(req.params.id, 10) },
            Utils.addPublicAccess(req)
          ]
        };
      }
      delete query.include;
    }

    // if request is coming from /documents/:id use custom query
    if (`${req.baseUrl}${req.route.path}` === '/documents/:id') {
      if (Utils.isAdmin(req)) {
        query.where = {
          id: req.params.id
        };
      } else {
        query.where = {
          $and: [
            { id: parseInt(req.params.id, 10) },
            Utils.addPublicAccess(req)
          ]
        };
      }
    }

    // if request is coming from /documents/ use custom query
    if (`${req.baseUrl}${req.route.path}` === '/documents/') {
      if (Utils.isAdmin(req)) {
        query.where = {
          $and: []
        };
      } else {
        query.where = {
          ownerId: req.decoded.userId
        };
      }
    }

    // if query string exists, append to base query
    if (req.query.q) {
      query.where.$and.push({
        $or: [
          {
            title: { $ilike: `%${req.query.q.replace(/[^a-z0-9]+/gi, '')}%` }
          },
          {
            content: { $ilike: `%${req.query.q.replace(/[^a-z0-9]+/gi, '')}%` }
          }
        ]
      });
    }

    // if limit exists, append to base query or use default limit
    if (keys.limit && keys.limit >= 1) {
      query.limit = keys.limit;
    } else {
      return Status.getFail(res, 400, 'document', 'limit cannot be less than 1');
    }

    // if page exists, append to base query or use default page
    if (keys.page && keys.page >= 1) {
      query.offset = (keys.page - 1) * keys.limit;
    } else {
      return Status.getFail(res, 400, 'document', 'page cannot be less than 1');
    }

    // if type exists, append to base query
    if (keys.docType) {
      query.where.$and.push({ type: keys.docType });
    }

    // if type exists, append to base query
    if (keys.role) {
      query.where.$and.push({ ownerRole: keys.role });
    }

    // append sorting and ordering
    query.order = [[keys.sortBy, keys.order]];
    req.searchQuery = query;
    next();
  }

  /**
   * fetchOwnerData
   * checks if document with title and content already exists
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - next func
   * @return {Null} no return value
   */
  static fetchOwnerData(req, res, next) {
    const userQuery = {
      where: {
        id: parseInt(req.params.id, 10)
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password', 'email', 'activeToken']
      }
    };

    return Db.Users.findOne(userQuery)
      .then((user) => {
        if (!user) return Status.notFound(res, 'user');
        req.ownerData = user;
        next();
      })
      .catch(() => Status.getFail(res, 400, 'user', 'Invalid input.'));
  }

  /**
   * docExists
   * checks if document with title and content already exists
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Object} next - next function
   * @return {Null} no return value
   */
  static docExists(req, res, next) {
    const docData = {
      title: req.body.title,
      content: req.body.content,
      type: req.body.type,
      accessLevel: req.body.accessLevel,
      ownerId: req.decoded.userId,
      ownerRole: req.decoded.role
    };

    const query = {
      where: {
        $and: [
          { ownerId: req.decoded.userId },
          { title: docData.title },
          { content: docData.content }
        ]
      }
    };

    Db.Documents.findOne(query)
      .then((doc) => {
        if (doc) {
          return Status.postFail(res, 400, 'document', 'Document with title and content already exists.');
        }
        req.docData = docData;
        next();
      })
      .catch(() => Status.getFail(res, 400, 'document', 'Invalid input'));
  }
}

export default Utils;
