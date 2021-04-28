const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transferSchema = new Schema({
    sender: String,
    receiver: String,
    amount: Number,
    date: Date,
    reason: String,
});
const Transfer = mongoose.model('Transfer', transferSchema);

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
    if(req.query.user != undefined) {
        // get all transfers as sender
        Transfer.find({$or:[{"sender" : req.query.user},{"receiver" : req.query.user}]}, (err, docs) => {
            if(!err) {
                res.json({
                    "status" : "success",
                    "data" : {
                        "transfers" : docs,
                    }
                });
            }
        });
    }
};

// GET transfers by by user id
const getTransferById = (req, res) => {
    if(req.params.id != undefined) {
        // get all transfers as sender
        Transfer.findOne({"_id" : req.params.id}, (err, doc) => {
            if(!err) {
                res.json({
                    "status" : "success",
                    "data" : {
                        "transfer" : doc,
                    }
                });
            }
        });
    }
};

const createTransfer = (req, res) => {
    let transfer = new Transfer();
    transfer.sender = "Robbe";
    transfer.receiver = "Seppe";
    transfer.amount = 100.00;
    transfer.reason = "Development help";
    transfer.date = Date.now();
    transfer.save( (err, doc) => {
        if(!err) {
            res.json({
                "status" : "success",
                "data" : {
                    "todo" : doc,
                }
            });
        }
    });
}

module.exports.getLoggedIn = getLoggedIn;
module.exports.getTransfersFromUser = getTransfersFromUser;
module.exports.getTransferById = getTransferById;
module.exports.createTransfer = createTransfer;
