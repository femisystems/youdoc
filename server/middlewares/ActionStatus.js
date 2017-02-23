/**
 * @class ActionStatus
 * @classdesc CRUD action responses
 */
class ActionStatus {
  // Documents, user, role, types

  /**
   * postFail(501)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {Object} err - error object
   * @return {Object} res - response object
   */
  static postFail(res, code, status, scope, err) {
    return res.status(code).send({
      success: status,
      msg: `Oops! Unable to create ${scope}(s). Please try again.`,
      error: err
    });
  }

  /**
   * postOk(201)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {String} scopeData - data returned
   * @return {Object} res - response object
   */
  static postOk(res, code, status, scope, scopeData) {
    return res.status(code).send({
      success: status,
      msg: `${scope}(s) successfully created.`,
      data: scopeData
    });
  }

  /**
   * getFail(500)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {Object} err - error object
   * @return {Object} res - response object
   */
  static getFail(res, code, status, scope, err) {
    return res.status(code).send({
      success: status,
      msg: `Sorry! Unable to reach ${scope}(s). Please try again.`,
      error: err
    });
  }

  /**
   * notFound(404)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @return {Object} res - response object
   */
  static notFound(res, code, status, scope) {
    return res.status(code).send({
      success: status,
      msg: `Sorry! ${scope}(s) not found.`,
    });
  }

  /**
   * getOk(200)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {String} scopeData - data returned
   * @return {Object} res - response object
   */
  static getOk(res, code, status, scope, scopeData) {
    return res.status(code).send({
      success: status,
      msg: `${scope}(s) successfully retrieved.`,
      data: scopeData
    });
  }

  /**
   * putFail(501)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {Object} err - error object
   * @return {Object} res - response object
   */
  static putFail(res, code, status, scope, err) {
    return res.status(code).send({
      success: status,
      msg: `Oops! Unable to update ${scope}(s). Please try again.`,
      error: err
    });
  }

  /**
   * putOk(200)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {String} scopeData - data returned
   * @return {Object} res - response object
   */
  static putOk(res, code, status, scope, scopeData) {
    return res.status(code).send({
      success: status,
      msg: `${scope}(s) successfully updated.`,
      data: scopeData
    });
  }

  /**
   * deleteFail(500)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {Object} err - error object
   * @return {Object} res - response object
   */
  static deleteFail(res, code, status, scope, err) {
    return res.status(code).send({
      success: status,
      msg: `Oops! Unable to delete ${scope}(s). Please try again.`,
      error: err
    });
  }

  /**
   * deleteOk
   * @param {Object} res - response object
   * @param {Boolean} status - true/false
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @return {Object} res - response object
   */
  static deleteOk(res, status, scope) {
    return res.send({
      success: status,
      msg: `${scope}(s) successfully deleted.`,
    });
  }

  /**
   * queryFail(400)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @return {Object} res - response object
   */
  static queryFail(res, code, status) {
    return res.send({
      success: status,
      msg: 'Query not properly formatted',
    });
  }
}

module.exports = ActionStatus;
