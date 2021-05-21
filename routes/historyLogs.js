const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', [passportJWT.isLogin], historyController.index);

module.exports = router;
