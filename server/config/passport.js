const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// models
let User = require("../models/users");

// entities 
let Response = require("../entities/response");

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, next) => {
  User.findOne({ email })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return next(Response(false, "Email or password is not correct"), false);
      }
      console.log("authenticated !!");
      return next(null, user);
    }).catch(next);
}));

