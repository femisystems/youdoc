require('dotenv').config();
const Db = require('../models/Index');
const jwt = require('jsonwebtoken');
const AuthStatus = require('./AuthStatus');

const secret = process.env.SECRET || '$3CRET AG3NT';

/**
 * Authentication
 * Authenticates and grants access based on usertype
 */
class Authentication {

  /**
   * verifyUser
   * checks if the user is valid before authorising
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - run next func
   * @return {null} no return value
   */
  static verifyUser(req, res, next) {
    const token = req.headers.authorization || req.headers['x-access-token'];

    if (!token) return res.status(401).send(AuthStatus.UNAUTHORIZED);

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(501).send({
          status: AuthStatus.FAIL,
          error: err.errors
        });
      }
      req.decoded = decoded;
      next();
    });
  }

  /**
   * verifyAdmin
   * checks if the user is an admin authorising
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - run next func
   * @return {null} no return value
   */
  static verifyAdmin(req, res, next) {
    const roleId = req.decoded.roleId;
    Db.Role.findById(roleId)
      .then((role) => {
        if (role.title !== 'admin') {
          return res.status(403).send(AuthStatus.FORBIDDEN);
        }
        next();
      });
  }
}

module.exports = Authentication;
