var express = require('express');
var router = express.Router();
const authenticationController = require('../controllers/authentication');
const usersController = require('../controllers/users');

router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);
router.post('/findusers', usersController.findUserByInput);

module.exports = router;