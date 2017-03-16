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
      roleId: user.dataValues.roleId
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
    return parseInt(req.decoded.roleId, 10) === 1;
  }

  /**
   * isAdminRoleUpdate
   * checks if a user is an admin
   * @param {Object} req - request object
   * @return {Bool} true/false
   */
  static isAdminRoleField(req) {
    return req.body.roleId && (parseInt(req.params.id, 10) === 1);
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
        query.attributes.exclude = ['id', 'roleId', 'email', 'password', 'createdAt', 'updatedAt', 'activeToken'];
      }
    }

    req.searchQuery = query;
    next();
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
    const query = {
      where: {
        $and: [
          { ownerId: req.decoded.userId },
          { title: req.body.title },
          { content: req.body.content }
        ]
      }
    };

    Db.Documents.findOne(query)
      .then((document) => {
        if (document) {
          return Status.postFail(res, 409, 'document', 'Document with title and content already exists.');
        }

        req.body.ownerId = req.decoded.userId;
        next();
      });
  }

  /**
   * buildSingleDocQuery
   * build search query based on user input
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Object} next - next function
   * @return {Null} no return value
   */
  static buildSingleDocQuery(req, res, next) {
    let rawQuery;

    if (Utils.isAdmin(req)) {
      rawQuery = `
        SELECT "Documents".*, "Users"."firstName", "Users"."lastName", "Users"."username", "Users"."roleId"
        FROM "Documents"
        INNER JOIN "Users"
        ON "Documents"."ownerId" = "Users"."id"
        WHERE "Documents"."id" = ${req.params.id}
        ORDER BY id ASC`;
    } else {
      rawQuery = `
        SELECT "Documents".*, "Users"."firstName", "Users"."lastName", "Users"."username", "Users"."roleId"
        FROM "Documents"
        INNER JOIN "Users"
        ON "Documents"."ownerId" = "Users"."id"
        WHERE "Documents"."id" = ${req.params.id} AND
        ( "Documents"."ownerId" = ${req.decoded.userId} OR
          "Documents"."accessLevel" = 'public' OR
          (
            "Documents"."accessLevel" = 'role' AND "Users"."roleId" = '${req.decoded.roleId}'
          )
        )
        ORDER BY id ASC`;
    }

    req.rawQuery = rawQuery;
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

    Db.Users.findOne(userQuery)
      .then((user) => {
        if (!user) return Status.notFound(res, 'user');
        let rawQuery;

        if (Utils.isAdmin(req)) {
          rawQuery = `
            SELECT "Documents"."id", "Documents"."title", "Documents"."content",
            "Documents"."accessLevel", "Documents"."createdAt", "Documents"."updatedAt",
            "Documents"."typeId"
            FROM "Documents" WHERE "Documents"."ownerId" = ${req.params.id}
            ORDER BY id ASC;`;
        } else {
          rawQuery = `
            SELECT "Documents"."id", "Documents"."title", "Documents"."content",
            "Documents"."accessLevel", "Documents"."createdAt", "Documents"."updatedAt",
            "Documents"."typeId"
            FROM "Documents"
            INNER JOIN "Users"
            ON "Documents"."ownerId" = "Users"."id"
            WHERE "Documents"."ownerId" = ${req.params.id} AND
            (
              "Documents"."accessLevel" = 'public' OR
              (
                "Documents"."accessLevel" = 'role' AND "Users"."roleId" = '${req.decoded.roleId}'
              )
            )
            ORDER BY id ASC;`;
        }

        req.rawQuery = rawQuery;
        req.ownerData = user;
        next();
      })
      .catch(() => Status.getFail(res, 400, 'user', 'Invalid input.'));
  }

  /**
   * search
   * checks if document with title and content already exists
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Object} next - next function
   * @return {Object} Array of documents
   */
  static search(req, res, next) {
    /**
     * where: accessLevel = public ||
     * ownerId = req.decoded.userId ||
     * (accessLevel = role && onwer role = req.decoded.role)
     */
    let rawQuery;
    const keys = {
      queryString: req.query.q || '',
      docType: req.query.type || '',
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      orderBy: req.query.orderBy || 'id',
      order: req.query.order || 'ASC'
    };
    let offset = 0;

    // if limit exists, append to base query or use default limit
    if (keys.limit && keys.limit < 1) {
      return Status.getFail(res, 400, 'document', 'limit cannot be less than 1');
    }

    // if page exists, append to base query or use default page
    if (keys.page && keys.page >= 1) {
      offset = (keys.page - 1) * keys.limit;
    } else {
      return Status.getFail(res, 400, 'document', 'page cannot be less than 1');
    }

    if (Utils.isAdmin(req)) {
      rawQuery = `
        SELECT "Documents".*, "Users"."firstName", "Users"."lastName", "Users"."username", "Users"."roleId"
        FROM "Documents"
        INNER JOIN "Users"
        ON "Documents"."ownerId" = "Users"."id"
        INNER JOIN "Types"
        ON "Documents"."typeId" = "Types"."id"
        AND ("Documents"."title" ILIKE '%${keys.queryString}%' OR "Documents"."content" ILIKE '%${keys.queryString}%')
        AND ("Types"."title" ILIKE '%${keys.docType}%')
        ORDER BY id ASC
        LIMIT ${keys.limit} OFFSET ${offset};`;
    } else {
      rawQuery = `
        SELECT "Documents".*, "Users"."firstName", "Users"."lastName", "Users"."username", "Users"."roleId"
        FROM "Documents"
        INNER JOIN "Users"
        ON "Documents"."ownerId" = "Users"."id"
        INNER JOIN "Types"
        ON "Documents"."typeId" = "Types"."id"
        WHERE ("Documents"."accessLevel" = 'public'
        OR "Documents"."ownerId" = ${req.decoded.userId}
        OR ("Documents"."accessLevel" = 'role'  AND "Users"."roleId" = '${req.decoded.roleId}'))
        AND ("Documents"."title" ILIKE '%${keys.queryString}%' OR "Documents"."content" ILIKE '%${keys.queryString}%')
        AND ("Types"."title" ILIKE '%${keys.docType}%')
        ORDER BY id ASC
        LIMIT ${keys.limit} OFFSET ${offset};`;
    }
    req.rawQuery = rawQuery;
    next();
  }
}

export default Utils;
