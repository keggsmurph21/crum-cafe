'use strict';

const params = require('./params');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');

const webRegister = new LocalStrategy(
  {

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,

  }, (req, username, password, next) => {

    console.log('got webRegister request')
    username = username.toLowerCase();

    if (req.body.REGISTER_SECRET !== params.REGISTER_SECRET) {

      console.log('invalid registration secret');
      return next(null, false, req.flash('register', 'Incorrect registration token'));

    }

    if (!username.match(/^[a-z0-9]\w{7,31}$/)) {

      console.log('username malformed');
      return next(null, false, req.flash('register', 'Username must be between 8 and 32 chars, starting with an alphanumeric chars, and only containing alphanumeric chars or underscores'));

    }

    if (!password.match(/^.{8,32}$/)) {

      console.log('password malformed');
      return next(null, false, req.flash('register', 'Password must be between 8 and 32 chars'));

    }

    Admin.findOne({ username: username }, (err, admin) => {

      if (err)
        return next(err);

      if (admin) {

        console.log('username exists');
        return next(null, false, req.flash('register', `Username "${username}" is already taken`));

      } else {

        var admin = new Admin();

        admin.username = username;
        admin.password = admin.generateHash(password);

        req.session.admin = admin;

        admin.save(err => {

          if (err)
            return next(err);

          console.log(`created new admin "${username}"`);
          return next(null, admin);

        })
      }
    });
  }
);

const webLogin = new LocalStrategy(
  {

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,

  }, (req, username, password, next) => {

    console.log('got webLogin request');
    username = username.toLowerCase();

    Admin.findOne({ username: username }, (err, admin) => {

      if (err)
        return next(err);

      if (!admin) {

        console.log('no admin found with that username');
        return next(null, false, req.flash('login', `Cannot find admin "${username}"`));

      } else if (admin.isValidPassword(password)) {

        console.log('validated', username);
        req.session.admin = admin;
        return next(null, admin);

      } else {

        console.log('invalid username/password');
        return next(null, false, req.flash('login', 'Invalid username/password'));

      }

    });
  }
);

passport.serializeUser((admin, next) => {
  next(null, admin.id);
});

passport.deserializeUser((username, next) => {
  Admin.findOne({ username: username }, (err, admin) => {
    next(err, admin);
  });
});

passport.use('web-register', webRegister);
passport.use('web-login', webLogin);
