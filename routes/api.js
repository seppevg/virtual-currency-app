var express = require('express');
var router = express.Router();
const coinController = require('../controllers/coins');

router.get('/', coinController.getLoggedIn);

router.get('/transfers', coinController.getTransfersFromUser);

router.get('/transfers/:id', coinController.getTransferById);

router.post('/transfers', coinController.createTransfer);

module.exports = router;