const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const authService = require('../services/auth');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(errorCodes.UNAUTHORIZED);

  const [tokenType, accessToken] = authorization.split(' ');

  if (tokenType !== 'Bearer') throw new CustomError(errorCodes.UNAUTHORIZED);
  const user = await authService.verifyAccessToken(accessToken);

  req.user = user;
  req.accessToken = accessToken;

  return next();
};

const hasRole = (role) => (req, res, next) => {
  const userRoles = req.roles;

  const hasPermission = userRoles.includes(role);
  if (!hasPermission) throw new CustomError(errorCodes.FORBIDDEN);

  return next();
};

module.exports = {
  auth,
  hasRole,
};
