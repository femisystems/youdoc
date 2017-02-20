const Db = require('../models/Index');

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
      ownerId: parseInt(req.decoded.userId, 10)
    };

    Db.Types.create(body)
      .then((type) => {
        res.status(201).send({ status: 'success', type });
      })
      .catch((err) => {
        res.status(500).send({ status: 'fail', error: err.errors });
      });
  }

  /**
   * listTypes
   * fetch all from types
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Null} no return value
   */
  static listTypes(req, res) {
    Db.Types.findAll()
      .then((types) => {
        if (!types.length) return res.status(404).send({ status: 'fail', message: 'No types yet' });
        res.send({ status: 'success', types });
      })
      .catch((err) => {
        res.status(500).send({ status: 'fail', error: err.errors });
      });
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
      }
    };

    Db.Types.findOne(query)
      .then((type) => {
        if (!type) return res.status(404).send({ status: 'fail', message: 'Type not found' });
        res.send({ status: 'success', type });
      })
      .catch((err) => {
        res.status(500).send({ status: 'fail', error: err.errors });
      });
  }

  /**
   * updateType
   * update type by id
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @return {Void} no return value
   */
  static updateType(req, res) {
    const query = {
      where: {
        id: req.params.id
      }
    };

    Db.Types.update(query, req.body)
      .then((role) => {
        res.send({ status: 'success', role });
      })
      .catch((err) => {
        res.status(500).send({ status: 'fail', error: err.errors });
      });
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

    Db.Types.destroy(query)
      .then(() => {
        res.send({ status: 'success', message: 'Successfully deleted' });
      })
      .catch((err) => {
        res.status(500).send({ status: 'fail', error: err.errors });
      });
  }
}

module.exports = TypeCtrl;
