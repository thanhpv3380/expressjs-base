const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const authController = require('../controllers/auth');

router.get('/login', asyncMiddleware(authController.login));

module.exports = router;
