const authService = require('../services/auth');

const login = async (req) => {
  const result = await authService.login(req.body);
  return result;
};

module.exports = {
  login,
};
