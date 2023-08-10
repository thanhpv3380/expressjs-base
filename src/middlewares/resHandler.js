/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
const errorHandler = require('./errorHandler');
const errorCodes = require('../errors/code');

const resHandler = (req, res) => {
  let { error, data: resData } = res;
  const { requestId, requestTime, hasUri, method, url } = req;

  const responseTime = new Date().getTime();
  const tookTime = responseTime - requestTime;

  if (!hasUri) error = { code: errorCodes.NOT_FOUND };

  if (error) {
    const { statusCode, data: errorData } = errorHandler(error);
    logger.info(
      `[RESPONSE][${method}][${url}] status: FAILED - statusCode: ${statusCode} - data: ${JSON.stringify(
        errorData,
      )} - took: ${tookTime}`,
      requestId,
    );

    return res.status(statusCode).send(errorData);
  }

  logger.info(
    `[RESPONSE][${method}][${url}] status: SUCCESS - data: ${JSON.stringify(
      resData,
    )}`,
    requestId,
  );

  return res.send({ status: 1, result: resData });
};

module.exports = resHandler;
