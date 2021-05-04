var express = require('express');
var router = express.Router();
const transferController = require('../controllers/transfers');
const authenticationController = require('../controllers/authentication');

router.get('/', transferController.getLoggedIn);

router.get('/transfers', transferController.getTransfersFromUser);
router.get('/transfers/:id', transferController.getTransferById);
router.post('/transfers', transferController.createTransfer);

router.post('/signup', authenticationController.signup);
router.post('/login', authenticationController.login);

module.exports = router;