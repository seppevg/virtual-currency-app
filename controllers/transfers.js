const Transfer = require('../models/Transfer');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectId; 
const users = require('./users');

//JWT Converter
const getIdFromJWT = (req) => {
    if(req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.substring(7, req.headers.authorization.length);
    } else {
        return false;
    }
    
    const decoded = jwt.verify(token, "MyVerySecretWord");
    return decoded.uid;
}

// GET transfers from user
const getTransfersFromUser = (req, res, next) => {
    // JWT naar User ID
    let userId = getIdFromJWT(req);

    if(!userId) {
        return res.json({
            "status": "error",
            "message": "Please provide valid body elements.",
        });
    }

    // Omzetten naar MongoDB ID om één of andere reden
    userId = new ObjectId(userId);

    if (userId != undefined) {
        // get all transfers as sender
        Transfer.find({ $or: [{ "sender._id": userId }, { "receiver._id": userId }] }, (err, docs) => {
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
    let senderId = getIdFromJWT(req);
    if(!senderId) {
        return res.json({
            "status": "error",
            "message": "No valid JWT token has been given",
        });
    }

    users.getUserById(senderId, (result) => {
        let sender = result;

        if(!sender) {
            return res.json({
                "status": "error",
                "message": "A user was not found based on this sender ID",
            });
        }

        users.getUserByName(req.body.receiver, (result) => {
            let receiver = result;

            if(!receiver) {
                return res.json({
                    "status": "error",
                    "message": "A user was not found based on this receiver name",
                });
            }
                    
            let transfer = new Transfer();
            transfer.sender = { "_id": sender._id, "name": sender.name, };
            transfer.receiver =  { "_id": receiver._id, "name": receiver.name, };
            transfer.amount = req.body.amount;
            transfer.reason = req.body.reason;
            transfer.date = Date.now();

            if(req.body.comment)
                transfer.comment = req.body.comment;

            if (req.body && req.body.receiver && req.body.amount) {
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
        });
    });
}

const getBalance = (req, res) => {
    let userId = getIdFromJWT(req);

    if(!userId) {
        res.json({
            "status": "error",
            "message": "Please provide valid body elements.",
        });
    }

    User.findOne({ "_id": userId }, (err, doc) => {
        if(!err) {
            return res.json({
                "status": "success",
                "data": {
                    "balance": doc.balance,
                }
            });
        } else {
            return res.json({
                "status": "error",
                "message": "Error getting user balance",
            });
        }
    });
}

module.exports.getTransfersFromUser = getTransfersFromUser;
module.exports.getTransferById = getTransferById;
module.exports.createTransfer = createTransfer;
module.exports.getBalance = getBalance;