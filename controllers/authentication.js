const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    // Empty validator
    if (name == "" || email == "" || password == "") {
        return res.json({
            "status": "error",
            "message": "Please fill in all the required fields!",
        });
    }

    // @student.thomasmore.be validator
    if (!email.includes("@student.thomasmore.be")) {
        return res.json({
            "status": "error",
            "message": "A Thomas More student e-mail address is required!",
        });
    }

    const user = new User({ username: email, name: name, balance: '100.00' });
    user.setPassword(password).then(() => {
        user.save().then(result => {
            let token = jwt.sign({
                uid: result._id,
                username: result.username,
            }, "MyVerySecretWord");
            res.json({
                "status": "success",
                "data": { "token": token },
            });
        }).catch(error => {
            res.json({
                "status": "error",
                "message": "Something went wrong saving the user."
            });
        });
    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        });
    });
};

const login = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    // Empty validator
    if (email == "" || password == "") {
        return res.json({
            "status": "error",
            "message": "Please fill in all the required fields!",
        });
    }

    const user = await User.authenticate()(req.body.email, req.body.password).then(result => {

        if (!result.user) {
            return res.json({
                "status": "failed",
                "message": "Login failed",
            })
        }

        let token = jwt.sign({
            uid: result.user._id,
            username: result.user.username,
        }, "MyVerySecretWord");

        return res.json({
            "status": "success",
            "data": { "token": token }
        });

    }).catch(error => {
        return res.json({
            "status": "error",
            "message": error
        });
    });
};

module.exports.signup = signup;
module.exports.login = login;