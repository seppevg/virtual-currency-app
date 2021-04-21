const getLoggedIn = (req, res) => {
    if (req.user === 'admin') {
        res.json({
            "status": "succes",
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

module.exports.getLoggedIn = getLoggedIn;
