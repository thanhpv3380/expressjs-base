const authService = require('../services/auth');

const login = async (req) => authService.login(req.body);

module.exports = {
  login,
};
