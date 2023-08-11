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
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = asyncMiddleware;
