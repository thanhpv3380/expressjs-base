const asyncMiddleware =
  (...fns) =>
  async (req, res, next) => {
    try {
      req.hasUri = true;

      let result;
      for (const fn of fns) {
        result = await fn(req, res, next);
      }

      res.data = result;
    } catch (error) {
      res.error = error;
    }

    next();
  };

module.exports = asyncMiddleware;
