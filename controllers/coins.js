const Transfer = require('../models/Transfer');

const getLoggedIn = (req, res) => {
    if (req.query.user === 'admin') {
        res.json({
            "status": "success",
            "data": { "message": 'User is logged in' }
        });
    }
    else {
        res.json({
            "status": "failed",
            "data": { "message": 'Authentication failed' }
        });
    }
};

// GET transfers by by user id
const getTransfersFromUser = (req, res, next) => {
    if (req.query.user != undefined) {
        // get all transfers as sender
        Transfer.find({ $or: [{ "sender": req.query.user }, { "receiver": req.query.user }] }, (err, docs) => {
            if (!err) {
                res.json({
                    "status": "success",
                    "data": {
                        "transfers": docs,
                    }
                });
            }
        });
    } else {
        res.json({
            "status": "error",
            "message": "No user has been provided.",
        });
    }
};

// GET transfers by by user id
const getTransferById = (req, res) => {
    if (req.params.id != undefined) {
        // get all transfers as sender
        Transfer.findOne({ "_id": req.params.id }, (err, doc) => {
            if (!err) {
                res.json({
                    "status": "success",
                    "data": {
                        "transfer": doc,
                    }
                });
            }
        });
    } else {
        res.json({
            "status": "error",
            "message": "No id has been provided.",
        });
    }
};

const createTransfer = (req, res) => {
    let transfer = new Transfer();
    transfer.sender = req.body.sender;
    transfer.receiver = req.body.receiver;
    transfer.amount = req.body.amount;
    transfer.reason = req.body.reason;
    transfer.date = Date.now();

    if (req.body && req.body.sender && req.body.receiver && req.body.amount && req.body.amount) {
        transfer.save((err, doc) => {
            if (!err) {
                res.json({
                    "status": "success",
                    "data": {
                        "transfer": doc,
                    }
                });
            }
        });
    } else {
        res.json({
            "status": "error",
            "message": "Please provide valid body elements.",
        });
    }
}

module.exports.getLoggedIn = getLoggedIn;
module.exports.getTransfersFromUser = getTransfersFromUser;
module.exports.getTransferById = getTransferById;
module.exports.createTransfer = createTransfer;
