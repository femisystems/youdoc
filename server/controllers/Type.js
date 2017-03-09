import Db from '../models/Index';
import Status from '../middleware/ActionStatus';

/**
 * @class TypeCtrl
 * @classdesc Creates and manages document types
 */
class TypeCtrl {
  /**
   * createType
   * creates a new type
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Null} no return value
   */
  static createType(req, res) {
    Db.Types.create(req.body)
      .then(type => Status.postOk(res, 'type', type))
      .catch(err => Status.postFail(res, 400, 'type', err.errors[0].message));
  }

  /**
   * listTypes
   * fetch all from types
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Null} no return value
   */
  static listTypes(req, res) {
    Db.Types.findAll({})
      .then((types) => {
        if (types.length < 1) {
          return Status.notFound(res, 'type');
        }
        Status.getOk(res, 'type', types);
      })
      .catch(() => Status.getFail(res, 500, 'type', 'Internal Server Error.'));
  }

  /**
   * getType
   * find type by id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static getType(req, res) {
    const query = {
      where: { id: parseInt(req.params.id, 10) }
    };
    Db.Types.findOne(query)
      .then((type) => {
        if (!type) {
          return Status.notFound(res, 'type');
        }
        Status.getOk(res, 'type', type);
      })
      .catch(() => Status.getFail(res, 400, 'type', 'Invalid input.'));
  }

  /**
   * deleteType
   * remove/destroy type
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static deleteType(req, res) {
    Db.Types.findOne({ where: { id: req.params.id } })
      .then((type) => {
        if (!type) return Status.notFound(res, 'type');
        type.destroy().then(() => Status.deleteOk(res, 'type'));
      })
      .catch(() => Status.getFail(res, 400, 'type', 'Invalid input.'));
  }
}

export default TypeCtrl;
