/**
 * @class AuthStatus
 * @classdesc auth request response
 */
class AuthStatus {
  // routes

  /**
   * unauthorizedRequest(401)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @return {Object} res - response object
   */
  static unauthorized(res, code, status) {
    return res.status(code).send({
      success: status,
      msg: 'Unauthorized! Signup or login to access this content.',
    });
  }

  /**
   * authFail(501)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {Object} err - error object
   * @return {Object} res - response object
   */
  static authFail(res, code, status, err) {
    return res.status(code).send({
      success: status,
      msg: 'Authentication Failed!',
      error: err
    });
  }

  /**
   * forbid(403)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {Object} err - error object
   * @return {Object} res - response object
   */
  static forbid(res, code, status) {
    return res.status(code).send({
      success: status,
      msg: 'Forbidden! This is a restricted content',
    });
  }

  /**
   * loginOk(200)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {Object} token - credential
   * @return {Object} res - response object
   */
  static loginOk(res, code, status, token) {
    return res.status(code).send({
      success: status,
      msg: 'You are now logged in.',
      userToken: token
    });
  }

  /**
   * loginFail(501)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @param {Object} err - error object
   * @return {Object} res - response object
   */
  static loginFail(res, code, status, err) {
    return res.status(code).send({
      success: status,
      msg: 'Unable to login at the moment. Try again.',
      error: err
    });
  }

  /**
   * ghostLogin(400)
   * @param {Object} res - response object
   * @param {Number} code - status code
   * @param {Boolean} status - true/false
   * @return {Object} res - response object
   */
  static ghostLogin(res, code, status) {
    return res.status(code).send({
      success: status,
      msg: 'Invalid username or password'
    });
  }

  /**
   * logoutOk
   * @param {Object} res - response object
   * @param {Boolean} status - true/false
   * @return {Object} res - response object
   */
  static logoutOk(res, status) {
    return res.send({
      success: status,
      msg: 'You are now logged out.',
    });
  }
}

export default AuthStatus;
