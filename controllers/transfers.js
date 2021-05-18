const Transfer = require('../models/Transfer');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// GET transfers from user
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

// GET transfers by user id
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

const getBalance = (req, res) => {
    if (req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.substring(7, req.headers.authorization.length);
    } else {
        //Error
    }
    const decoded = jwt.verify(token, "MyVerySecretWord");
    var userId = decoded.uid;
    console.log(userId);

    User.findOne({ "_id": userId }, (err, doc) => {
        if(!err) {
             res.json({
                "status": "success",
                "data": {
                    "balance": doc.balance,
                }
            });
        }
    });
}

module.exports.getTransfersFromUser = getTransfersFromUser;
module.exports.getTransferById = getTransferById;
module.exports.createTransfer = createTransfer;
module.exports.getBalance = getBalance;
