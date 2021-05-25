const User = require('../models/User');

const getUserById = (id, callback) => {
    User.findOne({ "_id": id }, (err, doc) => {
        if (!err) {
            callback(doc);
            return true;
        } else {
            return false;
        }
    });
}

const getUserByName = (name, callback) => {
    User.findOne({ "name": name }, (err, doc) => {
        if (!err) {
            callback(doc);
            return true;
        } else {
            return false;
        }
    });
}

const findUserByInput = (req, res) => {
    User.find({ name: { '$regex': req.body.input, '$options': 'i' } }, (err, doc) => {
        if (!err) {
            return res.json({
                "status": "success",
                "data": {
                    "users": doc
                }
            });
        } else {
            return res.json({
                "status": "error",
                "data": {
                    "message": "Unable to find any users"
                }
            });
        }
    });
}

module.exports.getUserById = getUserById;
module.exports.getUserByName = getUserByName;
module.exports.findUserByInput = findUserByInput;