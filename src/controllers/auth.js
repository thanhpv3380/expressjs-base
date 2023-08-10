const authService = require('../services/auth');

const login = async (req) => authService.login(req.body);
const register = async (req) => authService.register(req.body);

module.exports = {
  login,
  register,
};
