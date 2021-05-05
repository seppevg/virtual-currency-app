const User = require('../models/User');

const signup = async (req, res, next) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    // Empty validator
    if(name == "" || email == "" || password == "") {
        return res.json({
            "status": "error",
            "message": "Please fill in all the required fields!",
        });
    }

    // @student.thomasmore.be validator
    if(!email.includes("@student.thomasmore.be")) {
        return res.json({
            "status": "error",
            "message": "A Thomas More student e-mail address is required!",
        });
    }

    const user = new User({ username: email, name: name });
    user.setPassword(password).then(() => {
        user.save().then(result => {
            res.json({
                "status": "success"
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
    if(email == "" || password == "") {
        return res.json({
            "status": "error",
            "message": "Please fill in all the required fields!",
        });
    }

    const user = await User.authenticate()(req.body.email, req.body.password).then(result => {
        
        if(!result.user) {
            res.json({
                "status": "failed",
                "message": "Login failed",
            })
        }
        
        res.json({
            "status": "success",
            "data": { "user": result }
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