const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');
const {
  validateCustomer,
} = require('../middleware/validator/customerValidator');

router.get('/', [passportJWT.isLogin], customerController.index);
router.get('/admin', [passportJWT.isLogin], customerController.admin);
router.get('/:id', [passportJWT.isLogin], customerController.show);
router.post(
  '/submission',
  [passportJWT.isLogin],
  customerController.submission
);
router.post(
  '/changeStatus',
  [passportJWT.isLogin],
  checkAdmin.isAdmin,
  customerController.changeStatus
);
router.delete('/:id', [passportJWT.isLogin], customerController.destroy);
router.put(
  '/:id',
  [passportJWT.isLogin],
  validateCustomer,
  customerController.update
);
router.post(
  '/',
  [passportJWT.isLogin],
  validateCustomer,
  customerController.create
);
// router.post('/', validateCustomer, customerController.create);
module.exports = router;
