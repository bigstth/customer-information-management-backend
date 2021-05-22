const { check } = require('express-validator');

module.exports.validateCustomer = [
  check('first_name').not().isEmpty().withMessage('Please Input Firstname'),
  check('last_name').not().isEmpty().withMessage('Please Input Lastname'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Please Input Email')
    .isEmail()
    .withMessage('Email is invalid format'),
  check('phone_number')
    .not()
    .isEmpty()
    .withMessage('Please Input Phone Number')
    .isLength({ max: 10 }),
  check('date_of_birth')
    .not()
    .isEmpty()
    .withMessage('Please Input Date of Birth'),
  check('weight').not().isEmpty().withMessage('Please Input Weight'),
];
