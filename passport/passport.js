const passport = require('passport');
const User = require('../models/User');

passport.use(User.createStrategy());

//optioneel
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());