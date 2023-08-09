const { v4: uuidv4 } = require('uuid');
const codes = require('../errors/code');
const errorHandler = require('./errorHandler');

const logReq = (req, res, next) => {
  const requestId = uuidv4();

  req.requestId = requestId;
  req.requestTime = new Date().getTime();

  logger.info(
    `[REQ][${requestId}][${req.method}][${req.url}] data: ${JSON.stringify({
      headers: req.headers,
      params: req.params,
      query: req.query,
      body: req.body,
    })}`,
  );

  next();
};

// eslint-disable-next-line consistent-return
const logRes = (req, res, next) => {
  let { error, data } = res;
  const { requestId, requestTime, hasUri, method, url } = req;

  const responseTime = new Date().getTime();
  const tookTime = responseTime - requestTime;

  if (!hasUri) error = { code: codes.URI_NOT_FOUND };

  if (error) {
    const { statusCode, data: resData } = errorHandler(data);
    logger.info(
      `[RES][${requestId}][${method}][${url}] status: FAILED - statusCode: ${statusCode} - data: ${JSON.stringify(
        resData,
      )} - took: ${tookTime}`,
    );

    return res.status(statusCode).send(data);
  }

  const { data: resData } = errorHandler(data);
  logger.info(
    `[RES][${requestId}][${method}][${url}] status: SUCCESS - data: ${JSON.stringify(
      resData,
    )}`,
  );

  res.send(resData);
};

module.exports = { logReq, logRes };
