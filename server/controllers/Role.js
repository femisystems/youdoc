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
      .then(newRole => Status.postOk(res, 201, true, 'role', newRole))
      .catch(err => Status.postFail(res, 501, false, 'role', err));
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
          return Status.notFound(res, 404, false, 'role');
        }
        Status.getOk(res, 200, true, 'role', roles);
      })
      .catch(err => Status.getFail(res, 500, false, 'role', err));
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
          return Status.notFound(res, 404, false, 'role');
        }
        Status.getOk(res, 200, true, 'role', role);
      })
      .catch(err => Status.getFail(res, 500, false, 'role', err));
  }

  /**
   * editRole
   * This method edits a role object but disallows
   * the default admin role from being updated
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static updateRole(req, res) {
    const query = { where: { id: req.params.id } };
    Db.Roles.findOne(query)
      .then((role) => {
        if (!role) {
          return Status.notFound(res, 404, false, 'user');
        }
        if (role.title === 'admin') {
          return AuthStatus.forbid(res, 403, false);
        }
        role.update(req.body)
          .then((updatedUser) => {
            if (updatedUser) {
              Status.putOk(res, 200, true, 'role', updatedUser);
            }
          })
          .catch(err => Status.putFail(res, 501, false, 'role', err));
      })
     .catch(err => Status.getFail(res, 500, false, 'role', err));
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
        if (!role) return Status.notFound(res, 404, false, 'role');
        if (role.title === 'admin') {
          return AuthStatus.forbid(res, 403, false);
        }
        role.destroy({ force: true })
          .then(() => Status.deleteOk(res, true, 'role'));
      })
      .catch(err => Status.getFail(res, 500, false, 'role', err));
  }
}

export default RoleCtrl;
