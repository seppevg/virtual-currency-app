const User = require('../models/User');

const signup = async (req, res, next) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    const user = new User({ username: email, name: name });
    await user.setPassword(password);
    await user.save().then(result => {
        res.json({
            "status": "success"
        });
    }).catch(error => {
        console.log(error);
        res.json({
            "status": "error"
        });
    });
};

const login = async (req, res, next) => {
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