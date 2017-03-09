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
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {Object|String} err - error object
   * @return {Object} res - response object
   */
  static postFail(res, code, scope, err) {
    return res.status(code).send({
      success: false,
      msg: `Oops! Unable to create ${scope}(s). Please try again.`,
      error: err
    });
  }

  /**
   * postOk(201)
   * @param {Object} res - response object
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {String} scopeData - data returned
   * @return {Object} res - response object
   */
  static postOk(res, scope, scopeData) {
    return res.status(201).send({
      success: true,
      msg: `${scope}(s) successfully created.`,
      data: scopeData
    });
  }

  /**
   * getFail
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {Object|String} err - error object
   * @return {Object} res - response object
   */
  static getFail(res, code, scope, err) {
    return res.status(code).send({
      success: false,
      msg: `Sorry! Unable to reach ${scope}(s). Please try again.`,
      error: err
    });
  }

  /**
   * notFound(404)
   * @param {Object} res - response object
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @return {Object} res - response object
   */
  static notFound(res, scope) {
    return res.status(404).send({
      success: false,
      msg: `Sorry! ${scope}(s) not found.`,
    });
  }

  /**
   * getOk(200)
   * @param {Object} res - response object
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {String} scopeData - data returned
   * @return {Object} res - response object
   */
  static getOk(res, scope, scopeData) {
    return res.status(200).send({
      success: true,
      msg: `${scope}(s) successfully retrieved.`,
      data: scopeData
    });
  }

  /**
   * putFail(501)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {Object|String} err - error object
   * @return {Object} res - response object
   */
  static putFail(res, code, scope, err) {
    return res.status(code).send({
      success: false,
      msg: `Oops! Unable to update ${scope}(s). Please try again.`,
      error: err
    });
  }

  /**
   * putOk(200)
   * @param {Object} res - response object
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {String} scopeData - data returned
   * @return {Object} res - response object
   */
  static putOk(res, scope, scopeData) {
    return res.status(200).send({
      success: true,
      msg: `${scope}(s) successfully updated.`,
      data: scopeData
    });
  }

  /**
   * deleteFail
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @param {Object|String} err - error object
   * @return {Object} res - response object
   */
  static deleteFail(res, code, scope, err) {
    return res.status(code).send({
      success: false,
      msg: `Oops! Unable to delete ${scope}(s). Please try again.`,
      error: err
    });
  }

  /**
   * deleteOk(200)
   * @param {Object} res - response object
   * @param {String} scope - ['document', 'user', 'role', 'type']
   * @return {Object} res - response object
   */
  static deleteOk(res, scope) {
    return res.status(200).send({
      success: true,
      msg: `${scope}(s) successfully deleted.`,
    });
  }
}

export default ActionStatus;
