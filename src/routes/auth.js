const router = require('express').Router();

const asyncMiddleware = require('../middlewares/async');
const authController = require('../controllers/auth');
const { auth } = require('../middlewares/auth');

const { loginValidate, registerValidate } = require('../validations/auth');

router.post('/login', loginValidate, asyncMiddleware(authController.login));
router.post(
  '/register',
  registerValidate,
  asyncMiddleware(authController.register),
);
router.post(
  '/verifyAccessToken',
  asyncMiddleware(auth, authController.verifyAccessToken),
);

module.exports = router;
