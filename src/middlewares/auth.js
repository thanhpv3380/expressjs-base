const URL = require('url');
const asyncMiddleware = require('./async');
const { getClientAddress } = require('../utils/request');
const { IAM_CLIENT_ID, IAM_CLIENT_ID_PORTAL } = require('../configs');

const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const authService = require('../services/auth');
const portalService = require('../services/portal');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new CustomError(errorCodes.UNAUTHORIZED);

  const [tokenType, accessToken] = authorization.split(' ');

  if (tokenType !== 'Bearer') throw new CustomError(errorCodes.UNAUTHORIZED);
  const data = await authService.verifyAccessToken(accessToken);

  const { sub: userId, email, name, phoneNumber, resourceAccess } = data;
  const roles = resourceAccess[IAM_CLIENT_ID]?.roles || [];

  req.user = { userId, email, name, phoneNumber };
  req.accessToken = accessToken;
  req.resourceAccess = resourceAccess;
  req.roles = roles;

  return next();
};

const portalAuthorize = async (req, res, next) => {
  const { resourceAccess } = req;
  const portalUserRoles = authService.getUserRoles(
    resourceAccess,
    IAM_CLIENT_ID_PORTAL,
  );

  const address = getClientAddress(req);
  let hostname;
  try {
    ({ hostname } = URL.parse(address, true));
    if (!hostname) throw new Error();
  } catch (error) {
    throw new CustomError(errorCodes.CLIENT_URL_NOT_FOUND);
  }

  const [subDomain] = hostname.split('.');

  const checkDomainExist = portalUserRoles.find((role) => {
    const [subDomainRole] = role.split(':');
    return subDomain === subDomainRole;
  });
  if (!checkDomainExist) throw new CustomError(errorCodes.UNAUTHORIZED);

  const portal = await portalService.getPortalBySubDomain(
    subDomain,
    req.accessToken,
  );
  if (!portal) throw new CustomError(errorCodes.PORTAL_NOT_FOUND);

  req.portal = portal.result;

  return next();
};

const hasRole = (role) => (req, res, next) => {
  const userRoles = req.roles;

  const hasPermission = userRoles.includes(role);
  if (!hasPermission) throw new CustomError(errorCodes.FORBIDDEN);

  return next();
};

module.exports = {
  auth: asyncMiddleware(auth),
  portalAuthorize: asyncMiddleware(portalAuthorize),
  hasRole,
};
