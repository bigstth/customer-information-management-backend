const express = require('express');
const router = express.Router();
const userController = require('../controllers/historyController');
const passportJWT = require('../middleware/passportJWT');
const checkAdmin = require('../middleware/checkAdmin');

/* GET home page. */
router.get('/', [passportJWT.isLogin], historyController.index);

module.exports = router;
