const Db = require('../models/Index');
const Status = require('../middlewares/ActionStatus');

const details = {
  owner: ['id', 'username'],
  role: ['id', 'title']
};

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
    const body = {
      title: req.body.title.toLowerCase(),
      ownerId: 1
    };

    Db.Types
      .create(body)
      .then(type => Status.postOk(res, 201, true, 'type', type))
      .catch(err => Status.postFail(res, 500, false, 'type', err));
  }

  /**
   * listTypes
   * fetch all from types
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Null} no return value
   */
  static listTypes(req, res) {
    const query = {
      include: [
        {
          model: Db.Users,
          attributes: details.owner,
          include: [
            {
              model: Db.Roles,
              attributes: details.role
            }
          ]
        }
      ]
    };

    Db.Types
      .findAll(query)
      .then((types) => {
        if (types.length < 1) {
          return Status.notFound(res, 404, false, 'type');
        }
        Status.getOk(res, 200, true, 'type', types);
      })
      .catch(err => Status.postFail(res, 500, false, 'type', err));
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
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Db.Users,
          attributes: details.owner,
          include: [
            {
              model: Db.Roles,
              attributes: details.role
            }
          ]
        }
      ]
    };

    Db.Types
      .findOne(query)
      .then((type) => {
        if (!type) {
          return Status.notFound(res, 404, false, 'type');
        }
        Status.getOk(res, 200, true, 'type', type);
      })
      .catch(err => Status.getFail(res, 500, false, 'type', err));
  }

  /**
   * updateType
   * update type by id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static updateType(req, res) {
    Db.Types
      .findById(req.params.id)
      .then((type) => {
        if (type) {
          type.update(req.body)
            .then((updatedType) => {
              if (updatedType) {
                return Status.putOk(res, 200, true, 'type', updatedType);
              }
            })
            .catch(err => Status.putFail(res, 500, false, 'type', err));
        } else {
          Status.notFound(res, 404, false, 'type');
        }
      })
      .catch(err => Status.getFail(res, 500, false, 'type', err));
  }

  /**
   * deleteType
   * remove/destroy type
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static deleteType(req, res) {
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Types
      .destroy(query)
      .then(() => Status.deleteOk(res, true, 'type'))
      .catch(err => Status.deleteFail(res, 500, false, 'type', err));
  }
}

module.exports = TypeCtrl;
