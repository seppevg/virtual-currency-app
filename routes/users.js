var express = require('express');
var router = express.Router();
const authenticationController = require('../controllers/authentication');

router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);

module.exports = router;