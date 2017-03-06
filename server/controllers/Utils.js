import Db from '../models/Index';

/**
 * @class Utils
 * @classdesc a helper class for most generally used
 * methods
 */
class Utils {

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
        exclude: ['password']
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
        query.attributes.exclude = ['email', 'password', 'createdAt', 'updatedAt'];
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
          attributes: ['id', 'username', 'role']
        }
      ]
    };

    // query keys
    const keys = {
      queryString: req.query.q || null,
      docType: req.query.type || null,
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
            title: { $ilike: `%${req.query.q}%` }
          },
          {
            content: { $ilike: `%${req.query.q}%` }
          }
        ]
      });
    }

    // if limit exists, append to base query or use default limit
    if (keys.limit && keys.limit > 0) {
      query.limit = keys.limit;
    } else {
      res.send({ msg: 'limit cannot be null' });
    }

    // if page exists, append to base query or use default page
    if (keys.page && keys.page > 0) {
      query.offset = (keys.page - 1) * keys.limit;
    } else {
      res.send({ msg: 'page cannot be 0' });
    }

    // if type exists, append to base query
    if (keys.docType) {
      query.where.$and.push({ type: keys.docType });
      query.include.push({
        model: Db.Types,
        attributes: ['title']
      });
    }

    // append sorting and ordering
    query.order = [[keys.sortBy, keys.order]];
    req.searchQuery = query;
    next();
  }
}

export default Utils;
