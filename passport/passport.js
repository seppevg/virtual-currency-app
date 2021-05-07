const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy());

//optioneel
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Webtoken strategie (met jwt)
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'MyVerySecretWord';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.userid }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));