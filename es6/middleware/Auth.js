import dotenv from 'dotenv';
import bcrypt from 'bcrypt-node';
import jwt from 'jsonwebtoken';
import Db from '../models/Index';
import AuthStatus from './AuthStatus';

dotenv.config({ silent: true });
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

    if (!token) return AuthStatus.unauthorized(res, 401, false);
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return AuthStatus.authFail(res, 501, false, err);
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
    Db.Roles.findById(req.decoded.roleId)
      .then((role) => {
        if (role.dataValues.title !== 'admin') {
          return AuthStatus.forbid(res, 403, false);
        }
        next();
      });
  }

  /**
   * checkUserRouteAccess
   * checks if the user is authorised
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - run next func
   * @return {Null|Object} response object | no return value
   */
  static checkUserRouteAccess(req, res, next) {
    if ((String(req.decoded.userId) === req.params.id) ||
      req.decoded.roleId === 1) {
      next();
    } else {
      return AuthStatus.forbid(res, 403, false);
    }
  }

  /**
   * login
   * This method logs a user into the system
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static login(req, res) {
    let query = { where: { username: req.body.userIdentity } };
    if (/^[a-z0-9_.]+@[a-z]+\.[a-z]+$/i.test(req.body.userIdentity)) {
      query = { where: { email: req.body.userIdentity } };
    }

    Db.Users.findOne(query)
      .then((user) => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            userId: user.dataValues.id,
            username: user.dataValues.username,
            roleId: user.dataValues.roleId
          };

          const token = jwt.sign(payload, secret, { expiresIn: '24h' });
          const credential = { token, expiresIn: '24 hours' };
          return AuthStatus.loginOk(res, 200, true, credential);
        }
        AuthStatus.ghostLogin(res, 400, false);
      })
      .catch(err => AuthStatus.loginFail(res, 500, false, err));
  }

  /**
   * checkUserRouteAccess
   * checks if the user is an admin authorising
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - run next func
   * @return {Null|Object} response object | no return value
   */
  static logout(req, res) {
    const token = req.headers.authorization || req.headers['x-access-token'];
    const decoded = req.decoded;
    if (token) delete req.headers.authorization;
    if (req.headers['x-access-token']) delete req.headers['x-access-token'];
    if (decoded) delete req.decoded;
    AuthStatus.logoutOk(res, true);
  }
}

export default Authentication;
