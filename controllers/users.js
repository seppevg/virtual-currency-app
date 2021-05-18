const User = require('../models/User');

const getUserById = (id, callback) => {
    User.findOne({ "_id": id }, (err, doc) => {
        if(!err) {
            callback(doc);
            return true;
        } else { 
            return false;
        }
    });
}

const getUserByName = (name, callback) => {
    User.findOne({ "name": name }, (err, doc) => {
        if(!err) {
            callback(doc);
            return true;
        } else { 
            return false;
        }
    });
}

module.exports.getUserById = getUserById;
module.exports.getUserByName = getUserByName;