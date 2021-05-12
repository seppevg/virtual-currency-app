var express = require('express');
var router = express.Router();
const passport = require('../passport/passport');
const transferController = require('../controllers/transfers');

router.get('/transfers', transferController.getTransfersFromUser);
router.get('/transfers/:id', transferController.getTransferById);
router.post('/transfers', transferController.createTransfer);

router.get('/balance', passport.authenticate('jwt', { session: false }), transferController.getBalance)

module.exports = router;