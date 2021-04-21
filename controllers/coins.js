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

module.exports.getLoggedIn = getLoggedIn;
