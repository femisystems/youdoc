import Db from '../models/Index';
import Status from '../middleware/ActionStatus';
import AuthStatus from '../middleware/AuthStatus';

/**
 * RoleCtrl
 * Responsible for creating new roles and fetching existing roles.
 * All the methods of this class are static
 */
class RoleCtrl {
  /**
   * createRole
   * This method creates new role
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static createRole(req, res) {
    Db.Roles
      .create(req.body)
      .then(newRole => Status.postOk(res, 'role', newRole))
      .catch(err => Status.postFail(res, 400, 'role', err.errors[0].message));
  }

  /**
   * listRoles
   * This method fetches all existing roles
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static listRoles(req, res) {
    Db.Roles.findAll({})
      .then((roles) => {
        if (roles.length < 1) {
          return Status.notFound(res, 'role');
        }
        Status.getOk(res, 'role', roles);
      })
      .catch(() => Status.getFail(res, 500, 'role', 'Internal Server Error.'));
  }

  /**
   * getRole
   * This method fetches one role
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getRole(req, res) {
    const query = { where: { id: req.params.id } };
    Db.Roles.findOne(query)
      .then((role) => {
        if (!role) {
          return Status.notFound(res, 'role');
        }
        Status.getOk(res, 'role', role);
      })
      .catch(() => Status.getFail(res, 400, 'role', 'Invalid input.'));
  }

 /**
   * deleteRole
   * This method destroys a role object but disallows
   * the default admin role from being destroyed
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static deleteRole(req, res) {
    const query = { where: { id: req.params.id } };
    Db.Roles.findOne(query)
      .then((role) => {
        if (!role) return Status.notFound(res, 'role');
        if (role.title === 'admin') {
          return AuthStatus.forbid(res);
        }
        role.destroy({ force: true })
          .then(() => Status.deleteOk(res, 'role'))
          .catch(() => Status.deleteFail(res, 500, 'role', 'Internal Server Error.'));
      })
      .catch(() => Status.getFail(res, 400, 'role', 'Invalid input.'));
  }
}

export default RoleCtrl;
