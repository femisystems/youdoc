import dotenv from 'dotenv';
import bcrypt from 'bcrypt-node';
import jwt from 'jsonwebtoken';
import Db from '../models/Index';
import AuthStatus from './AuthStatus';
import Status from './ActionStatus';
import Utils from '../controllers/Utils';

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

    if (!token) return AuthStatus.unauthorized(res, 'No authorization header set');
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return AuthStatus.unauthorized(res, 'Invalid token');
      }

      const query = {
        where: {
          id: decoded.userId,
        },
        attributes: {
          include: ['activeToken']
        }
      };

      Db.Users.findOne(query)
        .then((user) => {
          if (!user) return Status.notFound(res, 'user');
          if (token !== user.activeToken) return AuthStatus.unauthorized(res, 'Expired token');
          req.decoded = decoded;
          next();
        });
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
    if (!Utils.isAdmin(req)) {
      return AuthStatus.forbid(res);
    }
    next();
  }

  /**
   * permitRoleEdit
   * checks if the user is an admin authorising
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - run next func
   * @return {null} no return value
   */
  static checkRoleWriteAccess(req, res, next) {
    if (parseInt(req.params.id, 10) === 1) return AuthStatus.forbid(res);
    Db.Roles.findOne({ where: { id: parseInt(req.params.id, 10) } })
      .then((role) => {
        if (!role) return Status.notFound(res, 'role');
        req.role = role;
        next();
      })
      .catch(() => Status.getFail(res, 400, 'role', 'Invalid input.'));
  }

  /**
   * checkUserWriteAccess
   * checks if the user is authorised to access user route
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - run next func
   * @return {Null|Object} response object | no return value
   */
  static checkUserWriteAccess(req, res, next) {
    if (Utils.isAdminRoleField(req)) return AuthStatus.forbid(res);
    if ((req.decoded.userId === parseInt(req.params.id, 10)) || Utils.isAdmin(req)) {
      Db.Users.findById(req.params.id)
        .then((user) => {
          if (!user) return Status.notFound(res, 'user');

          // disallow role update if client is not admin
          if (req.body.roleId && !Utils.isAdmin(req)) {
            return AuthStatus.forbid(res);
          }

          req.user = user;
          next();
        })
        .catch(() => Status.getFail(res, 400, 'user', 'Invalid Input'));
    } else {
      return AuthStatus.forbid(res);
    }
  }

  /**
   * checkDocWriteAccess
   * checks if the user is authorised to make changes to doc
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - run next func
   * @return {Null|Object} response object | no return value
   */
  static checkDocWriteAccess(req, res, next) {
    Db.Documents
      .findById(req.params.id)
      .then((document) => {
        if (!document) return Status.notFound(res, 'document');
        if ((document.ownerId === req.decoded.userId) || Utils.isAdmin(req)) {
          if ((req.method.toLowerCase() === 'put') && Object.keys(req.body).length < 1) {
            return Status.putFail(res, 400, 'document', 'Cannot update document with null data');
          }
          req.document = document;
          next();
        } else {
          AuthStatus.forbid(res);
        }
      })
      .catch(() => Status.getFail(res, 400, 'document', 'Invalid input.'));
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
          const credential = Utils.generateToken(user, secret);
          user.update({ activeToken: credential.token })
            .then(() => AuthStatus.loginOk(res, `${user.username}`, credential))
            .catch(() => AuthStatus.loginFail(res, 500, 'Internal Server Error.'));
        } else {
          AuthStatus.ghostLogin(res);
        }
      })
      .catch(() => AuthStatus.loginFail(res, 400, 'Invalid Details'));
  }

  /**
   * logout
   * logs a user out
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - run next func
   * @return {Null|Object} response object | no return value
   */
  static logout(req, res) {
    Db.Users.findById(req.decoded.userId)
      .then((user) => {
        if (user) {
          user.update({ activeToken: null })
            .then(() => {
              AuthStatus.logoutOk(res);
            })
            .catch(() => Status.getFail(res, 500, 'user', 'Unable to log you out. Please try again.'));
        } else {
          Status.notFound(res, 'user');
        }
      })
      .catch(() => Status.getFail(res, 500, 'user', 'Unable to find user.'));
  }
}

export default Authentication;
