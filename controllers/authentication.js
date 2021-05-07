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

    const user = new User({ username: email, name: name });
    user.setPassword(password).then(() => {
        user.save().then(result => {
            let token = jwt.sign({
                userid: result._id,
                email: result.username,
                name: result.name
            }, "MyVerySecretWord");
            res.json({
                "status": "success",
                "data": { "token": token }
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
            res.json({
                "status": "failed",
                "message": "Login failed",
            })
        }

        let token = jwt.sign({
            userid: result.user._id,
            email: result.user.username,
            name: result.user.name
        }, "MyVerySecretWord");

        res.json({
            "status": "success",
            "data": { "token": token }
        });

    }).catch(error => {
        res.json({
            "status": "error",
            "message": error
        });
    });
};

module.exports.signup = signup;
module.exports.login = login;