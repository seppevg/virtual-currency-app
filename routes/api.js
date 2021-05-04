var express = require('express');
var router = express.Router();
const coinController = require('../controllers/coins');
const authenticationController = require('../controllers/authentication');

router.get('/', coinController.getLoggedIn);

router.get('/transfers', coinController.getTransfersFromUser);
router.get('/transfers/:id', coinController.getTransferById);
router.post('/transfers', coinController.createTransfer);

router.post('/signup', authenticationController.signup);
//router.post('/login', authenticationController.login);

module.exports = router;