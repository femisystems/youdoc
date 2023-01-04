import jwt from 'jsonwebtoken';

/**
 * generateToken
 * generates jwt
 * @param {Object} user - userData
 * @param {String} secret - token secret
 * @return {Object} token
 */
export const generateToken = (user: any, secret: any) => {
  const payload = {
    userId: user.dataValues.id,
    username: user.dataValues.username,
    email: user.dataValues.email,
    roleId: user.dataValues.roleId,
  };

  const token = jwt.sign(payload, secret, { expiresIn: '24h' });
  return { token, expiresIn: '24 hours' };
};
