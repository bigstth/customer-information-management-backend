const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');
/* GET users listing. */
router.get(
  '/',
  [passportJWT.isLogin],
  checkAdmin.isAdmin,
  userController.index
);
router.get('/me', [passportJWT.isLogin], userController.me);
router.post(
  '/register',
  [
    body('first_name').not().isEmpty().withMessage('Please Input Firstname'),
    body('last_name').not().isEmpty().withMessage('Please Input Lastname'),
    body('email')
      .not()
      .isEmpty()
      .withMessage('Please Input Email')
      .isEmail()
      .withMessage('Email is invalid format'),
    body('password')
      .not()
      .isEmpty()
      .withMessage('Please Input Password')
      .isLength({ min: 3 })
      .withMessage('Password can not less than 3 characters'),
  ],
  userController.register
);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
