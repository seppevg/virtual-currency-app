var express = require('express');
var router = express.Router();
const transferController = require('../controllers/transfers');

router.get('/', transferController.getLoggedIn);

router.get('/transfers', transferController.getTransfersFromUser);
router.get('/transfers/:id', transferController.getTransferById);
router.post('/transfers', transferController.createTransfer);

module.exports = router;