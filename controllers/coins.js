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
    let data = {}
  
    if(req.query.id == undefined) {
        data = {
            success: false,
            message: 'A user id was not provided.',
        };
    } else {
        data = {
            success: true,
            message: `Getting all transfers from user with id: ${req.query.id}`,
            transfers: [
                {
                    transferId: 1,
                    sender: 1,
                    receiver: 5,
                    amount: 10.00,
                }
            ],
        };
    }
    res.send(data);
};

// GET transfers by by user id
const getTransferById = (req, res, next) => {
    let data = {};
    
    if(req.params.id < 0) {
        data = {
            success: false,
            message: 'Please provide a valid id.',
        }
    } else {
        data = {
            success: true,
            message: `Getting message with id ${req.params.id}`,
            transfer: {
                transferId: 1,
                sender: 1,
                receiver: 5,
                amount: 10.00,
            }
        }
    }
    
    res.send(data);
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
