// eslint-disable-next-line consistent-return
const asyncMiddleware =
  (...fns) =>
  // eslint-disable-next-line consistent-return
  async (req, res, next) => {
    try {
      req.hasUri = true;

      let result;
      for (const fn of fns) {
        result = await fn(req, res, next);
      }

      console.log('sdfsd');
      next(null, result);
    } catch (error) {
      console.log('sdfsd');
      next(error, null);
    }
  };

module.exports = asyncMiddleware;
