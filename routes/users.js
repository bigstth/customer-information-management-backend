const express = require('express');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const userController = require('../controllers/userController');
const checkAdmin = require('../middleware/checkAdmin');
const { validateUser } = require('../middleware/validator/userValidator');

router.get(
  '/',
  [passportJWT.isLogin],
  checkAdmin.isAdmin,
  userController.index
);
router.get('/me', [passportJWT.isLogin], userController.me);
router.post('/register', validateUser, userController.register);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
