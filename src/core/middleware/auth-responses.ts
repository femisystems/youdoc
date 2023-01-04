import { Response } from 'express';

/**
 * unauthorizedRequest(401)
 * @param {Object} res - response object
 * @param {String} err - error msg
 * @return {Object} res - response object
 */
export const unauthorized = (res: Response, err: unknown) => {
  return res.status(401).send({
    success: false,
    msg: 'Unauthorized user! Signup or login to access resource.',
    error: err,
  });
};

/**
 * authFail
 * @param {Object} res - response object
 * @param {Number} code - status code
 * @param {Object} err - error object
 * @return {Object} res - response object
 */
export const authFail = (res: Response, code: number, err: unknown) => {
  return res.status(code).send({
    success: false,
    msg: 'Authentication Failed!',
    error: err,
  });
};

/**
 * forbid
 * @param {Object} res - response object
 * @return {Object} res - response object
 */
export const forbid = (res: Response) => {
  return res.status(403).send({
    success: false,
    msg: 'Forbidden! Restricted content.',
  });
};

/**
 * loginOk
 * @param {Object} res - response object
 * @param {String} user - username
 * @param {Object} token - credential
 * @return {Object} res - response object
 */
export const loginOk = (res: Response, user: any, token: string) => {
  return res.status(200).send({
    success: true,
    msg: `Welcome ${user}! You are now logged in.`,
    userToken: token,
  });
};

/**
 * loginFail
 * @param {Object} res - response object
 * @param {Number} code - status code
 * @param {Object} err - error object
 * @return {Object} res - response object
 */
export const loginFail = (res: Response, code: number, err: unknown) => {
  return res.status(code).send({
    success: false,
    msg: 'Unable to login at the moment. Try again.',
    error: err,
  });
};

/**
 * ghostLogin
 * @param {Object} res - response object
 * @return {Object} res - response object
 */
export const ghostLogin = (res: Response) => {
  return res.status(400).send({
    success: false,
    msg: 'Invalid userId or password',
  });
};

/**
 * logoutOk
 * @param {Object} res - response object
 * @return {Object} res - response object
 */
export const logoutOk = (res: Response) => {
  return res.status(200).send({
    success: true,
    msg: 'You are now logged out.',
  });
};
