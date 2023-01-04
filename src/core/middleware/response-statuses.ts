import { Request, Response } from 'express';

/**
 * returnInvalidRoute
 * checks if the user is an admin authorising
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Function} next - run next func
 * @return {null} no return value
 */
export const invalidRoute = (req: Request, res: Response) => {
  return res.status(404).send({
    success: false,
    msg: 'Unable to complete action',
    error: 'This route either does not exist or the parameter is not specified',
  });
};

/**
 * postFail(501)
 * @param {Object} res - response object
 * @param {Number} code - status code
 * @param {String} scope - ['document', 'user', 'role', 'type']
 * @param {Object|String} err - error object
 * @return {Object} res - response object
 */
export const postFail = (
  res: Response,
  code: number,
  scope: string,
  err: unknown
) => {
  return res.status(code).send({
    success: false,
    msg: `Oops! Unable to create ${scope}(s). Please try again.`,
    error: err,
  });
};

/**
 * postOk(201)
 * @param {Object} res - response object
 * @param {String} scope - ['document', 'user', 'role', 'type']
 * @param {String} scopeData - data returned
 * @return {Object} res - response object
 */
export const postOk = (res: Response, scope: string, scopeData: unknown) => {
  return res.status(201).send({
    success: true,
    msg: `${scope}(s) successfully created.`,
    data: scopeData,
  });
};

/**
 * getFail
 * @param {Object} res - response object
 * @param {Number} code - status code
 * @param {String} scope - ['document', 'user', 'role', 'type']
 * @param {Object|String} err - error object
 * @return {Object} res - response object
 */
export const getFail = (
  res: Response,
  code: number,
  scope: string,
  err: unknown
) => {
  return res.status(code).send({
    success: false,
    msg: `Sorry! Unable to reach ${scope}(s). Please try again.`,
    error: err,
  });
};

/**
 * notFound(404)
 * @param {Object} res - response object
 * @param {String} scope - ['document', 'user', 'role', 'type']
 * @return {Object} res - response object
 */
export const notFound = (res: Response, scope: string) => {
  return res.status(404).send({
    success: false,
    msg: `Sorry! ${scope}(s) not found.`,
  });
};

/**
 * getOk(200)
 * @param {Object} res - response object
 * @param {String} scope - ['document', 'user', 'role', 'type']
 * @param {String} scopeData - data returned
 * @return {Object} res - response object
 */
export const getOk = (res: Response, scope: string, scopeData: unknown) => {
  return res.status(200).send({
    success: true,
    msg: `${scope}(s) successfully retrieved.`,
    data: scopeData,
  });
};

/**
 * putFail(501)
 * @param {Object} res - response object
 * @param {Number} code - status code
 * @param {String} scope - ['document', 'user', 'role', 'type']
 * @param {Object|String} err - error object
 * @return {Object} res - response object
 */
export const putFail = (
  res: Response,
  code: number,
  scope: string,
  err: unknown
) => {
  return res.status(code).send({
    success: false,
    msg: `Oops! Unable to update ${scope}(s). Please try again.`,
    error: err,
  });
};

/**
 * putOk(200)
 * @param {Object} res - response object
 * @param {String} scope - ['document', 'user', 'role', 'type']
 * @param {String} scopeData - data returned
 * @return {Object} res - response object
 */
export const putOk = (res: Response, scope: string, scopeData: unknown) => {
  return res.status(200).send({
    success: true,
    msg: `${scope}(s) successfully updated.`,
    data: scopeData,
  });
};

/**
 * deleteFail
 * @param {Object} res - response object
 * @param {Number} code - status code
 * @param {String} scope - ['document', 'user', 'role', 'type']
 * @param {Object|String} err - error object
 * @return {Object} res - response object
 */
export const deleteFail = (
  res: Response,
  code: number,
  scope: string,
  err: unknown
) => {
  return res.status(code).send({
    success: false,
    msg: `Oops! Unable to delete ${scope}(s). Please try again.`,
    error: err,
  });
};

/**
 * deleteOk(200)
 * @param {Object} res - response object
 * @param {String} scope - ['document', 'user', 'role', 'type']
 * @return {Object} res - response object
 */
export const deleteOk = (res: Response, scope: string) => {
  return res.status(200).send({
    success: true,
    msg: `${scope}(s) successfully deleted.`,
  });
};
