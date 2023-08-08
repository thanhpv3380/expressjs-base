const jwt = require('jsonwebtoken');
const camelCaseKeys = require('camelcase-keys');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');

const { IAM_VALID_CLIENT_IDS } = require('../configs');

const verifyAccessToken = async (accessToken) => {
  let data;
  let userId;
  let clientId;
  try {
    const publicKey = IAM_PUBLIC_KEY;

    data = jwt.verify(accessToken, publicKey);

    ({ sub: userId, azp: clientId } = data);
    if (!userId) throw new Error();
  } catch (error) {
    throw new CustomError(errorCodes.UNAUTHORIZED);
  }

  if (!IAM_VALID_CLIENT_IDS.includes(clientId))
    throw new CustomError(errorCodes.FORBIDDEN);

  return camelCaseKeys(data);
};

const login = async () => {
  return 1;
};

module.exports = {
  verifyAccessToken,
  login,
};
