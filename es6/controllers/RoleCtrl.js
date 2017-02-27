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
    const roleData = req.body;
    roleData.title = roleData.title.toLowerCase();

    Db.Roles
      .create(roleData)
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
    Db.Roles.findById(req.params.id)
      .then((role) => {
        if (!role) {
          return Status.notFound(res, 404, false, 'role');
        }
        Status.getOk(res, 200, true, 'role', role);
      })
      .catch(err => Status.getFail(res, 500, false, 'role', err));
  }
}

export default RoleCtrl;
