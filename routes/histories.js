const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');

router.get(
  '/',
  [passportJWT.isLogin],
  checkAdmin.isAdmin,
  historyController.index
);

module.exports = router;
