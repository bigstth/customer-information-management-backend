const { check } = require('express-validator');

module.exports.validateUser = [
  check('first_name').not().isEmpty().withMessage('Please Input Firstname'),
  check('last_name').not().isEmpty().withMessage('Please Input Lastname'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Please Input Email')
    .isEmail()
    .withMessage('Email is invalid format'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Please Input Password')
    .isLength({ min: 3 })
    .withMessage('Password can not less than 3 characters'),
];
