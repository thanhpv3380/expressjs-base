const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const authController = require('../controllers/auth');

router.post('/login', asyncMiddleware(authController.login));
router.post('/register', asyncMiddleware(authController.register));

module.exports = router;
