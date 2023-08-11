const handleSequenceFunc = async (fn) => {
  return new Promise((resolve) => {
    resolve(fn);
  });
};

const asyncMiddleware =
  (...fns) =>
  async (req, res, next) => {
    try {
      req.hasUri = true;

      let result;
      for (const fn of fns) {
        result = await handleSequenceFunc(fn(req, res, next));
      }

      console.log('xxx');
      res.data = result;
      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = asyncMiddleware;
