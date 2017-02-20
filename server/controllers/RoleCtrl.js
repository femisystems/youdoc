const Db = require('../models/Index');
const RoleStatus = require('./StatusResponse/Role');

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
    Db.Roles.create({ title: req.body.title.toLowerCase() })
      .then((newRole) => {
        res.status(201).send({
          status: RoleStatus.POSTSUCCESS,
          role: newRole
        });
      }).catch((err) => {
        res.status(400).send({
          status: RoleStatus.POSTFAIL,
          error: err.errors
        });
      });
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
        if (!roles.length) return res.status(404).send({ status: RoleStatus.GETFAIL });
        res.status(200).send({
          status: RoleStatus.GETSUCCESS,
          data: roles
        });
      }).catch((err) => {
        res.status(500).send({ status: RoleStatus.GETFAIL, error: err.errors });
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
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Roles.findOne(query)
      .then((role) => {
        if (!role) return res.status(404).send(RoleStatus.GETFAIL);
        res.status(200).send({
          status: RoleStatus.GETSUCCESS,
          roleDetail: role
        });
      });
  }

  /**
   * editRole
   * This method edits a role
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static editRole(req, res) {
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Roles.findOne(query)
      .then((role) => {
        if (!role) return res.status(404).send(RoleStatus.GETFAIL);

        role.update(req.body)
          .then((updatedRole) => {
            if (!updatedRole) return res.status(501).send(RoleStatus.PUTFAIL);
            res.status(200).send({
              status: RoleStatus.PUTSUCCESS,
              role: updatedRole
            });
          });
      });
  }

  /**
   * deleteRole
   * This method deletes a role from the db
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static deleteRole(req, res) {
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Roles.findOne(query)
      .then((role) => {
        if (!role) return res.status(404).send(RoleStatus.GETFAIL);

        role.destroy()
          .then(() => res.status(200).send(RoleStatus.DELSUCCESS));
      });
  }

}

module.exports = RoleCtrl;
