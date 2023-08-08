const { v4: uuidv4 } = require('uuid');

const logReq = (req, res, next) => {
  const requestId = uuidv4();
  req.requestId = requestId;

  logger.info(
    `[REQ][${requestId}] headers: ${JSON.stringify(
      req.headers,
    )} - params: ${JSON.stringify(req.params)} - query: ${JSON.stringify(
      req.query,
    )} - body: ${JSON.stringify(req.body)}`,
  );

  next();
};

module.exports = { logReq };
