var express = require('express');
var router = express.Router();
const coinController = require('../controllers/coins');

router.get('/', coinController.getLoggedIn);

module.exports = router;
