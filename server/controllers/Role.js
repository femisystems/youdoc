import Db from '../models/Index';
import Status from '../middleware/ActionStatus';

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
    let statusCode = 409;
    if (req.body.title === '') statusCode = 400;

    Db.Roles
      .create(req.body)
      .then(newRole => Status.postOk(res, 'role', newRole))
      .catch(err => Status.postFail(res, statusCode, 'role', err.errors[0].message));
  }

  /**
   * listRoles
   * This method fetches all existing roles
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static listRoles(req, res) {
    Db.Roles.findAll({ where: {} })
      .then((roles) => {
        if (!roles.length) return Status.notFound(res, 'role');
        Status.getOk(res, 'role', roles);
      });
  }

  /**
   * getRole
   * This method fetches one role
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getRole(req, res) {
    Db.Roles.findOne({ where: { id: req.params.id } })
      .then((role) => {
        if (!role) return Status.notFound(res, 'role');
        Status.getOk(res, 'role', role);
      })
      .catch(() => Status.getFail(res, 400, 'role', 'Invalid input.'));
  }

  /**
   * updateRole
   * This method updates one role
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static updateRole(req, res) {
    let statusCode = 409;
    if (req.body.title === '') statusCode = 400;

    req.role.update(req.body)
      .then((updatedRole) => {
        Status.putOk(res, 'role', updatedRole);
      })
      .catch(err => Status.putFail(res, statusCode, 'role', err.errors[0].message));
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
    req.role.destroy({ force: true })
      .then(() => Status.deleteOk(res, 'role'));
  }
}

export default RoleCtrl;
